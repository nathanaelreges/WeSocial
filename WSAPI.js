
window.log = x => console.log(x)


_['WSAPI'] = (function init_WSAPI() {

	///////////////////We Study API
	let WSAPI = {}

	const feedUpdates = []
	WSAPI.feedService = function () {
		let module = {}
		let callBackForUpdates = undefined
		let callBackForNewPosts = undefined
		let activeRoomId = 0
		
		
			
		
		let data = {
			getPosts() {
				return getPosts(activeRoomId)
			},
			activeRoom: getById(activeRoomId, roomsDATA),
			rooms: roomsDATA.filter(x => x.id != activeRoomId)
		}


		module.listenForNewPosts = (callBack) => {
			callBackForNewPosts = callBack
		}

		
		module.listenForStatsUpdate = (callBack) => {
			callBackForUpdates = callBack
			return
			setTimeout(() => {
				const posts = getPosts(activeRoomId)
				const length = posts.length

				posts[length - 1].likes += 2
				
				const data = {
					type: 'post', 
					array: [{index: length - 1, likes: posts[length - 1].likes}]
				}

				callBack(data)
			}, 3000);
			
			setTimeout(() => {
				const posts = getPosts(activeRoomId)
				const length = posts.length

				posts[length - 2].likes += 2
				posts[length - 2].comments += 2
				
				
				const data = {
					type: 'post', 
					array: [{
						index: length - 2, 
						likes: posts[length - 2].likes,
						comments: posts[length - 2].comments
					}]
				}

				callBack(data)
			}, 3500);
			
			setTimeout(() => {
				const posts = getPosts(activeRoomId)
				const length = posts.length

				posts[length - 3].likes += 1
				
				
				const data = {
					type: 'post', 
					array: [{index: length - 3, likes: posts[length - 3].likes}]
				}
				

				callBack(data)
			}, 5000);

			setTimeout(() => {
				const posts = getPosts(activeRoomId)
				const length = posts.length

				posts[length - 1].likes += 2
				
				const data = {
					type: 'post', 
					array: [{index: length - 1, likes: posts[length - 1].likes}]
				}

				callBack(data)
			}, 6000);
		}

		
		module.getNewPosts = () => {
			const promise = new Promise(resolve => {
				setTimeout(() => {
					const newPosts = getMorePosts(activeRoomId, 3, 'top')
					resolve(newPosts)
				}, 1400);
			})

			return promise
		}

		module.getOlderPosts = () => {
			const promise = new Promise(resolve => {
				setTimeout(() => {
					const newPosts = getMorePosts(activeRoomId, 25, 'end')
					resolve(newPosts)
				}, 1400);
			})

			return promise
		}

		module.changeRoom = (id) => {
			const data = changeRoom(id)
			callBackForUpdates({type: 'changeRoom', data})
		}

		module.sendLike = (id) => {
			sendLikeForPost(id)

			console.log('Sending like for post:' + id)
		}

		module.start = () => {
			console.log('feedServiceStart')
			processFeedUpdates()
		}
		module.end = () => {
			console.log('feedServiceEnd')
		}

		module.data = data

		

		return module




		function getPosts (roomId) {
			return getById(roomId, feedsDATA).posts
		}

		function changeRoom (id) {
			if(id === undefined){
				return {noRooms: true}
			}

			activeRoomId = parseInt(id)

			let copy = roomsDATA.slice()
			const index = findIndexForId(activeRoomId, roomsDATA)
			
			data.activeRoom = copy.splice(index, 1)[0]
			data.rooms = copy

			return data
		}

		function processFeedUpdates () {
			if(feedUpdates.length == 0)
				return
			//

			const arrayOfPostUpdates = []

			feedUpdates.map((updateObj)=>{
				const {type, id} = updateObj
				
				
				if(type ==	'removeRoom') {
					const room = roomsDATA[0]
					let roomId = room? room.id : undefined

					const data = changeRoom(roomId)
					callBackForUpdates({type: 'changeRoom', data})
				}
				else 
				if(type ==	'postLike') {
					const posts = getPosts(activeRoomId)
					const indexOfPost = findIndexForId(id, posts)
					
					if(indexOfPost !== -1){
						const post = posts[indexOfPost]

						arrayOfPostUpdates.push({
							index: indexOfPost,
							likes: post.likes,
							liked: post.liked
						})
					}											
				}
				else 
				if(type ==	'newPost') {
					const post = getById(id, postsDATA)
					const inTheActiveRoom = getPosts(activeRoomId).includes(post)
					if(inTheActiveRoom){
						callBackForNewPosts([post])
					}					
				}
				else 
				if(type ==	'newRoom') {
					const data = changeRoom(id)
					callBackForUpdates({type: 'changeRoom', data})

				}
			})

			if(arrayOfPostUpdates.length)
			
				callBackForUpdates({type: 'post', array: arrayOfPostUpdates})
			//

			

			feedUpdates.splice(0, feedUpdates.length)
		}
	}




	const forumUpdates = []
	WSAPI.forumService = function getForumService() {
		let module = {}
		let callBackForNewQuests = undefined
		let callBackForUpdates = undefined

		forumUpdates.splice(0, forumUpdates.length)

		module.data = {quests: questsDATA}

		module.listenForNewQuests = (callBack) => {
			callBackForNewQuests = callBack
		}

		module.listenForStatsUpdate = (callBack) => {
			callBackForUpdates = callBack
			/*
				callBack([{index: , votes: , answers: }])
			*/
		}

		module.getOlderQuests = () => {
			return Promise.resolve()
			/*module.getOlderQuests = () => {
				return Promise.resolve()
			}

			const promise = new Promise(resolve => {
				setTimeout(() => {
					const olderQuests = questsDATA
					resolve(olderQuests)
				}, 2000);
			})

			return promise
			*/
		}

		
		module.start = () => {
			processForumUpdates()
			console.log('forumServiceStart')
		}
		module.end = () => {
			console.log('forumServiceEnd')
		}


		return module

		function processForumUpdates () {
			if(forumUpdates.length == 0)
				return
			//

			const arrayOfQuesUpdates = []

			forumUpdates.forEach((updateObj)=>{
				const {type, id} = updateObj
				
				
				if(type == 'newQuest') { 
					callBackForNewQuests(
						[updateObj.data]
					)
				}
				else
				if(type == 'questVote') {
					const index = findIndexForId(id, questsDATA)
					arrayOfQuesUpdates.push(
						{index, votes: updateObj.number}
					)
				}
				else 
				if(type == 'questAnswer') {
					const index = findIndexForId(id, questsDATA)
					arrayOfQuesUpdates.push(
						{index, answers: updateObj.number}
					)	
				}
			})	
			
			if(arrayOfQuesUpdates.length != 0)
				callBackForUpdates(arrayOfQuesUpdates)
			//

			forumUpdates.splice(0, forumUpdates.length)
		}
	}




	const alertUpdates = []
	WSAPI.alertService = function () {
		let module = {}
		let callBackForUpdates = undefined
		const idsOnTheList = alertsDATA.map(x=>{return{id: x.alert.id}})

		alertUpdates.splice(0, alertUpdates.length)
		

		module.data = alertsDATA

		module.getOlderItems = () => {
			return Promise.resolve()
		}

		
		module.listenUpdates = (x) => {
			callBackForUpdates = x

			//("removeItem", {index})
			//("sendItemToTop", {index, unseenNumber, time})
			//("addItemToTop", item)
			
		}

		module.start = (x) => { 
			processAlertUpdates()
		}
		
		module.end = (x) => {

		}

		return module


		function processAlertUpdates () {
			if(alertUpdates.length == 0) 
				return
			//

			alertUpdates.map((updateObj)=>{
				const {type, id} = updateObj
				const itemIndex = findIndexForId(id, idsOnTheList)
				
				if(type == 'toggleAlert') { 
					const item = alertsDATA.find(x=>x.alert.id == id)
					const itemAlertOn = item !== undefined

					
					const itemIsInTheCurrentList = itemIndex !== -1

					
					if(!itemIsInTheCurrentList && itemAlertOn) {
						callBackForUpdates('addItemToTop', item)
						idsOnTheList.push({id: item.alert.id})
					}
					else
					if(!itemIsInTheCurrentList && !itemAlertOn){

					}
					else
					if(itemIsInTheCurrentList && itemAlertOn){
						callBackForUpdates('sendItemToTop', {
							itemIndex,
							unseenNumber: item.alert.unseenNumber,
							time: item.alert.time
						})
						idsOnTheList.splice(itemIndex, 1)
						idsOnTheList.push({id: item.alert.id})
					}
					else
					if(itemIsInTheCurrentList && !itemAlertOn){
						callBackForUpdates('removeItem', itemIndex)
						idsOnTheList.splice(itemIndex, 1)
					}
				}
				else 
				if(type == 'clearUnseen') {
					const index = findIndexForId(id, questsDATA)
					callBackForUpdates('clearUnseen', itemIndex)
				}
			})

			alertUpdates.splice(0, alertUpdates.length)
		}

	}




	WSAPI.newPostService = function (roomId) {
		const module = {}

		module.send = ({text}) => {
			
			const postData = {
				content: text,
				likes: 0,
				liked: false,
				comments: 0,
				time: "12:10",
				user: thisUserData,
				type: 'post',
				alertOn: false
			}
			
			const realPost = sendNewPost(roomId, postData)
			notify('feed', {type: 'newPost', id: realPost.id})
		
			const alertId = toggleAlertForItem(realPost)
			notify('alert', {type: 'toggleAlert', id: alertId})
			
			console.log('New post was sended to the server: ' + text)
		}


		return module
	}




	WSAPI.postService = function postService(id) {

		//////////////// Chat
		let alreadyCalledMore = false
		let newCommentsCallback
		const postData = getById(id, postsDATA)

		shuffle(chatDATA)

		const module = {

			data: {
				chat: chatDATA,
				post: postData,
				userImgSrc: WSAPI.myImgSrc,
				bellState: false
			}

		}


		module.sendLike = (id) => {
			sendLikeForPost(id)
			notify('feed', {id, type: 'postLike'})
			console.log('Sending like for the post that you are on')
		}


		
		module.sendComment = (txt) => {
			console.log('Sending comment for the post that you are on')

			newCommentsCallback([{
				content: txt,
				sent: true
			}])
		}

		module.changeAlertState = (state) => {
			const alertId = toggleAlertForItem(postData)
			notify('alert', {type: 'toggleAlert', id: alertId})
			console.log('Change if the user recives alerts for this post: ' + state)

		}


		module.getOlderComments = () => {
			return new Promise(resolve => {
				setTimeout(() => {
					let oldComments = chatDATA.slice()
					shuffle(oldComments)
					resolve(oldComments)   
				}, 1000)
			})

		}


		module.listenForNewComments = (callBack) => {
			newCommentsCallback = callBack
		}

		if(postData.alertOn && postData.alert.unseen) {
			const alertId = postData.alert.id
			sendClearUnseenAlerts(alertId)
			notify('alert', {type: 'clearUnseen', id: alertId})
		}


		return module
	}


	

	WSAPI.newQuestService = function () {
		const module = {}
		

		module.searchTag = (it, answer) => {
			answer([
				{name: it + ' Tag', id: 101},
				{name: 'TAG ' + it.toUpperCase(), id: 102},
				{name: it.toLowerCase() + ' tag', id: 103},
				{name: 'tag ' + it.toLowerCase(), id: 104},
				{name: it.toUpperCase() + ' TAG', id: 105},
				{name: 'TAg ' + it, id: 106}
			])
		}

		module.sendQuest = (data) => {
			const questData = {
				title: data.title,
				votes: 0,
				answers: [],
				answersNumber: 0,
				time: "12:10",
				body: data.body,
				tags: data.tags,
				user: thisUserData,
				type: 'quest',
				alertOn: false
			}

			const realQuest = sendNewQuest(questData)
			notify('forum', {type: 'newQuest', id: realQuest.id, data: realQuest})

			const alertId = toggleAlertForItem(realQuest)
			notify('alert', {type: 'toggleAlert', id: alertId})

		}

		return module
	}



	WSAPI.roomService = function (id) {
		let module = {}


		const room = getById(id, roomsDATA)

		module.data = room

		module.leaveRoom = () => {

			sendRemoveRoom(id)
			
			notify('feed', {type: 'removeRoom', id})

			console.log('Taking you out of this room.')
		}

		return module
	}



	WSAPI.findForumService = function () {
		let module = {}
		const tagsData = getRandomItems(6, tagsDATA)
		let callBackForUpdates = undefined
		const myQuestsData = questsDATA.slice()

		shuffle(myQuestsData)

		const data = {
			tags: tagsData,
			questions: myQuestsData
		}

		module.getMore = () => Promise.resolve()

		module.search = text => {
			shuffle(myQuestsData)
			return Promise.resolve(data)
		}
		
		module.listenForStatsUpdate = (callBack) => {
			callBackForUpdates = callBack
			/*
				callBack([{index: , votes: , answers: }])
			*/
		}

		module.getOlderQuests = () => {
			return Promise.resolve()
			/*module.getOlderQuests = () => {
				return Promise.resolve()
			}

			const promise = new Promise(resolve => {
				setTimeout(() => {
					const olderQuests = questsDATA
					resolve(olderQuests)
				}, 2000);
			})

			return promise
			*/
		}

		
		module.start = () => {
			processFindForumUpdates()
			console.log('findForumServiceStart')
		}
		module.end = () => {
			console.log('fubdForumServiceEnd')
		}


		return module

		function processFindForumUpdates () {
			if(forumUpdates.length == 0)
				return
			//

			const arrayOfQuesUpdates = []

			forumUpdates.forEach((updateObj)=>{
				const {type, id} = updateObj
				const index = findIndexForId(id, myQuestsData)
				
				if(type == 'questVote') {
					arrayOfQuesUpdates.push(
						{index,  votes: updateObj.number}
					)
				}
				else 
				if(type == 'questAnswer') {
					arrayOfQuesUpdates.push(
						{index, answers: updateObj.number}
					)	
				}
			})	
			
			if(arrayOfQuesUpdates.length != 0)
				callBackForUpdates(arrayOfQuesUpdates)
			//
		}
		
	}



	WSAPI.questService = function (id) { 
		const module = {}
		const data = {}
		const questData = getById(id, questsDATA)
		let callBackForNewAnswers = undefined
		
		
		data.quest = questData
		data.answers = questData.answers

		module.data = data

		module.questVote = (state) => {
			const votesNumber = sendVoteForQuest(id)
			notify('forum', {type: 'questVote', id, number: votesNumber})
			console.log(`Saving vote for question: ${id}, state: ${state}`)
		}

		module.answerVote = (answerId, state) => {
			sendVoteForAnswer(answerId)
			console.log(`Saving vote for answer: ${answerId} of question: ${id}, state: ${state}`)
		}

		module.sendAnswer = (text) => {
			const newAnswerData = {
				time: '12:10',
				voted: false,
				votes: 0,
				body: text,
				user: thisUserData,
				type: 'answer'
			}

			const answerData = sendNewAnswer(newAnswerData, id)

			callBackForNewAnswers([answerData])
			
			notify('forum', {type: 'questAnswer', id, number: questData.answersNumber})


			console.log(`Saving new answer: ${text} for question: ${id}`)
		}

		module.changeAlertState = (state) => {
			const alertId = toggleAlertForItem(questData)
			notify('alert', {type: 'toggleAlert', id: alertId})
			console.log('Change if the user recives alerts for this quest: ' + state)

		}

		module.listenForNewAnswers = (callBack)=> {
			callBackForNewAnswers = callBack
		}


		if(questData.alertOn && questData.alert.unseen) {
			const alertId = questData.alert.id
			sendClearUnseenAlerts(alertId)
			notify('alert', {type: 'clearUnseen', id: alertId})
		}

		return module

		
	}


	
	WSAPI.newRoomService = function () {
		let module

		module = {
			create(data) {
				const newRoom = {
					name: data.name,
					description: data.description,
					imgSrc: 'img/newRoom.jpg',
					members: [thisUserData] 
				}

				const realNewRoom = sendNewRoom(newRoom)

				notify('feed', {type: 'newRoom', id: realNewRoom.id, data: realNewRoom})
				console.log('Creating a new room with: ', data)
			}
		}

		return module
	}



	WSAPI.tagService = function (id) {
		let module = {}
		const tagData = getById(id, tagsDATA)
		let callBackForUpdates = undefined
		const myQuestsData = questsDATA.filter(x=>x.tags.includes(tagData))
		
		shuffle(myQuestsData)
		
		module.data = {
			tag: tagData,
			questions: myQuestsData
		}
		
		module.listenForStatsUpdate = (callBack) => {
			callBackForUpdates = callBack
			/*
				callBack([{index: , votes: , answers: }])
			*/
		}

		module.getMore = () => Promise.resolve()
			
		module.start = () => {
			processFindForumUpdates()
			console.log('findForumServiceStart')
		}
		module.end = () => {
			console.log('fubdForumServiceEnd')
		}


		return module

		function processFindForumUpdates () {
			if(forumUpdates.length == 0)
				return
			//

			const arrayOfQuesUpdates = []

			forumUpdates.forEach((updateObj)=>{
				const {type, id} = updateObj
				const index = findIndexForId(id, myQuestsData)
				
				if(index < 0)
					return
				//
				
				if(type == 'questVote') {
					arrayOfQuesUpdates.push(
						{index,  votes: updateObj.number}
					)
				}
				else 
				if(type == 'questAnswer') {
					arrayOfQuesUpdates.push(
						{index, answers: updateObj.number}
					)	
				}
			})	
			
			if(arrayOfQuesUpdates.length != 0)
				callBackForUpdates(arrayOfQuesUpdates)
			//
		}
		
	}













	const usersDATA = [
		{id: 0, imgSrc: "img/avatar1.jpg", name: "Davide Sommerscales"},
		{id: 1, imgSrc: "img/avatar2.jpg", name: "Lizzie Grey"},
		{id: 2, imgSrc: "img/avatar3.jpg", name: "Durant Rubro"},
		{id: 3, imgSrc: "img/avatar4.jpg", name: "Isabelle Stinton"},
		{id: 4, imgSrc: "img/avatar5.jpg", name: "Ricard Godbert"},
		{id: 5, imgSrc: "img/avatar6.jpg", name: "Sebastien Royal"},
		{id: 6, imgSrc: "img/avatar7.jpg", name: "Wendy Clout"},
		{id: 7, imgSrc: "img/avatar8.jpg", name: "Niko Holttom"},
		{id: 8, imgSrc: "img/avatar9.jpg", name: "Franciska Bysaker"},
		{id: 9, imgSrc: "img/avatar10.jpg", name: "Darius Fuke"},
		{id: 10, imgSrc: "img/avatar11.jpg", name: "Ian Shevell"},
		{id: 11, imgSrc: "img/avatar12.jpg", name: "Rodrique Bottomley"},
		{id: 12, imgSrc: "img/avatar13.jpg", name: "Osborn Stump"},
		{id: 13, imgSrc: "img/avatar14.jpg", name: "Emmanuel Siveyer"},
		{id: 14, imgSrc: "img/avatar15.jpg", name: "Ludwig Shaddick"},
		{id: 15, imgSrc: "img/avatar16.jpg", name: "Homer Stockall"},
		{id: 16, imgSrc: "img/avatar17.jpg", name: "Frances Handley"},
		{id: 17, imgSrc: "img/avatar18.jpg", name: "Arlana Adamo"},
		{id: 18, imgSrc: "img/avatar19.jpg", name: "Stefano Liddyard"},
		{id: 19, imgSrc: "img/avatar20.jpg", name: "Nichole Rowntree"},
		{id: 20, imgSrc: "img/avatar21.jpg", name: "Gustavo Raunds"},
		{id: 21, imgSrc: "img/avatar22.jpg", name: "Malena Boch"},
		{id: 22, imgSrc: "img/avatar23.jpg", name: "Lizbeth Lonnon"},
		{id: 23, imgSrc: "img/avatar24.jpg", name: "Antonino Brandts"},
		{id: 24, imgSrc: "img/avatar25.jpg", name: "Karry Cathesyed"},
		{id: 25, imgSrc: "img/avatar26.jpg", name: "Nicky Pettis"},
		{id: 26, imgSrc: "img/avatar27.jpg", name: "Joell Gatchel"},
		{id: 27, imgSrc: "img/avatar28.jpg", name: "Killian Marfield"},
		{id: 28, imgSrc: "img/avatar29.jpg", name: "Vincenz Lurriman"},
		{id: 29, imgSrc: "img/avatar30.jpg", name: "Alidia Sommer"},
		{id: 30, imgSrc: "img/avatar31.jpg", name: "Trevor Djordjevic"},
		{id: 31, imgSrc: "img/avatar32.jpg", name: "Philippe Valentino"},
		{id: 32, imgSrc: "img/avatar33.jpg", name: "Wood Davsley"},
		{id: 33, imgSrc: "img/avatar35.jpg", name: "Derron Woolard"}
	]


	const thisUserData = usersDATA[0]


	const roomsDATA = [
		{imgSrc: 'img/bikeRoom.jpg', name: 'Pedal', members: [thisUserData].concat(usersDATA.slice(1, 8))},
		{imgSrc: 'img/computerRoom.jpg', name: 'Café com Código', members: [thisUserData].concat(usersDATA.slice(8, 23))},
		{imgSrc: 'img/booksRoom.jpg', name: 'Semana do Livro', members: [thisUserData].concat(usersDATA.slice(23))},
	]


	const chatDATA = [
		{content: "In hac habitasse platea dictumst.", sent: true}, 
		{content: "Etiam faucibus cursus urna.", sent: true}, 
		{content: "Pellentesque ultrices mattis odio.", sent: true}, 
		{content: "Mauris lacinia sapien quis libero.", sent: true}, 
		{content: "Nulla tempus.", sent: true}, 
		{content: "Cras in purus eu magna vulputate luctus.", sent: true}, 
		{content: "Nulla justo.", sent: true}, 
		{content: "Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue.", name: "Jobye Tonna"}, 
		{content: "Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.", name: "Emmet Andries"}, 
		{content: "Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis.", name: "Fidelia Piens"}, 
		{content: "Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.", name: "Milt Skillen"}, 
		{content: "Proin at turpis a pede posuere nonummy.", name: "Tierney Sowthcote"}, 
		{content: "Duis mattis egestas metus.", sent: true}, 
		{content: "Vivamus tortor.", sent: true},
		{content: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit.", sent: true},
		{content: "Aliquam erat volutpat.", sent: true},
		{content: "Nulla mollis molestie lorem.", sent: true},
		{content: "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi.", sent: true},
		{content: "Quisque ut erat.", sent: true},
		{content: "Phasellus in felis.", sent: true},
		{content: "Ut tellus.", sent: true},
		{content: "Donec quis orci eget orci vehicula condimentum.", sent: true},
		{content: "Vestibulum ac est lacinia nisi venenatis tristique.", sent: true},
		{content: "Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci.", sent: true},
		{content: "Curabitur gravida nisi at nibh.", sent: true},
		{content: "Morbi non lectus.", sent: true},
		{content: "In eleifend quam a odio.", sent: true},
		{content: "Aliquam non mauris.", sent: true},
		{content: "Phasellus sit amet erat.", sent: true},
		{content: "Nam dui.", sent: true},
		{content: "Pellentesque at nulla.", sent: true},
		{content: "Vestibulum quam sapien, varius ut, blandit non, interdum in, ante.", name: "Philippine Thompsett"}, 
		{content: "Nam nulla.", name: "Wendy Clout"}, 
		{content: "Phasellus id sapien in sapien iaculis congue.", name: "Glyn Hemphrey"}, 
		{content: "Morbi quis tortor id nulla ultrices aliquet.", name: "Skye Duce"}, 
		{content: "Praesent blandit lacinia erat.", name: "Korney Lasselle"}, 
		{content: "Cras non velit nec nisi vulputate nonummy.", name: "Eleonore Dehmel"}, 
		{content: "Nam tristique tortor eu pede.", name: "Jewel Dugmore"}, 
		{content: "Nam tristique tortor eu pede.", name: "Wendi Du Fray"}, 
		{content: "Integer ac leo.", name: "Baxter Woolsey"}, 
		{content: "Phasellus in felis.", name: "Merridie Dungay"}, 
		{content: "Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis.", name: "Sue Stodart"}, 
		{content: "Vestibulum sed magna at nunc commodo placerat.", name: "Ninetta Stobbart"}, 
		{content: "In congue.", name: "Noell Betancourt"}, 
		{content: "Vivamus vestibulum sagittis sapien.", name: "Gael Osler"}, 
		{content: "Mauris sit amet eros.", name: "Berty Usborn"}, 
		{content: "Donec dapibus.", name: "Gayler Corzon"}, 
		{content: "Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.", name: "Liam Gransden"}, 
		{content: "Aliquam sit amet diam in magna bibendum imperdiet.", name: "Park Peirpoint"}, 
		{content: "Maecenas pulvinar lobortis est.", name: "Dyana Scamerdine"}, 
		{content: "Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa.", name: "Letta Aslam"}, 
		{content: "Nullam sit amet turpis elementum ligula vehicula consequat.", name: "Molly Orman"}, 
		{content: "Nulla suscipit ligula in lacus.", name: "Zena Maplestone"}, 
		{content: "Vestibulum rutrum rutrum neque.", name: "Panchito Bremeyer"}, 
		{content: "Ut at dolor quis odio consequat varius.", name: "Bronny Hubner"}, 
		{content: "Morbi quis tortor id nulla ultrices aliquet.", name: "Sylvester Hollingshead"}, 
		{content: "Cras non velit nec nisi vulputate nonummy.", name: "Franciska Bysaker"}, 
		{content: "Mauris sit amet eros.", name: "Tomlin Ruppele"}, 
		{content: "Aenean auctor gravida sem.", name: "Genevra Willmont"}, 
		{content: "Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.", name: "Obidiah Stent"}, 
		{content: "Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo.", name: "Nicoli Braunstein"}, 
		{content: "Duis consequat dui nec nisi volutpat eleifend.", name: "Nicolina Battershall"}, 
		{content: "Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.", name: "Kipp Norvill"}, 
		{content: "Morbi vel lectus in quam fringilla rhoncus.", name: "Penrod Thrower"}, 
		{content: "Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa.", name: "Jocko Yurocjhin"}, 
		{content: "Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo.", name: "Kyrstin Coneybeare"}, 
		{content: "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi.", name: "Dunstan Drydale"}, 
		{content: "Nullam molestie nibh in lectus.", sent: true}, 
		{content: "Suspendisse potenti.", sent: true}, 
		{content: "Vestibulum ac est lacinia nisi venenatis tristique.", sent: true}, 
		{content: "Vivamus in felis eu sapien cursus vestibulum.", name: "Davon Bantick"}, 
		{content: "Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.", name: "Antonina Correa"}, 
		{content: "Duis aliquam convallis nunc.", name: "Ezri Brenard"}, 
		{content: "Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo.", name: "Katrina Braganca"}, 
		{content: "Pellentesque eget nunc.", name: "Pavla Dorrity"}, 
		{content: "Nulla ut erat id mauris vulputate elementum.", name: "Homere Heningham"}, 
		{content: "Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.", name: "Jason Girke"}, 
		{content: "Vestibulum rutrum rutrum neque.", name: "Gretta Abelevitz"}, 
		{content: "Maecenas ut massa quis augue luctus tincidunt.", name: "Giraud Charsley"}, 
		{content: "Duis bibendum.", name: "Eve Tetford"}, 
		{content: "Vestibulum sed magna at nunc commodo placerat.", name: "Rebekkah Jeannot"}, 
		{content: "Nullam porttitor lacus at turpis.", name: "Fidel Troni"}, 
		{content: "Donec vitae nisi.", name: "Dick Kenney"}, 
		{content: "Suspendisse potenti.", name: "Gustie Fried"}, 
		{content: "Nullam sit amet turpis elementum ligula vehicula consequat.", name: "Jacques Incogna"}, 
		{content: "Proin interdum mauris non ligula pellentesque ultrices.", name: "Romola MacIllrick"},
		{content: "Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.",sent: true}, 
		{content: "Morbi non lectus.", name: "Darius Fuke"}, 
		{content: "Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci.", name: "Agretha Lampard"}, 
		{content: "Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.", name: "Queenie Willment"}, 
		{content: "Fusce consequat.", name: "Lari MacAlpyne"}, 
		{content: "In sagittis dui vel nisl.", name: "Mag Simonnet"}, 
		{content: "Quisque porta volutpat erat.", name: "Carmelita Tidball"}, 
		{content: "Duis bibendum.", sent: true}, 
		{content: "Cras in purus eu magna vulputate luctus.", name: "Lolita Garralts"}, 
		{content: "Praesent blandit.", sent: true}, 
		{content: "Mauris ullamcorper purus sit amet nulla.", name: "Rurik Scotney"}, 
		{content: "Praesent id massa id nisl venenatis lacinia.", name: "Ruth Gonzalvo"}, 
		{content: "Maecenas tincidunt lacus at velit.", name: "Therese Degoix"}, 
		{content: "Etiam faucibus cursus urna.", sent: true}
	]


	const questsDATA = [
		{votes: 56, answersNumber: 1, time: "23/1", body: "Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.", title: "Sit amet nulla quisque arcu libero rutrum ac lobortis vel dapibus?"}, 
		{votes: 27, answersNumber: 8, time: "4/1", body: "Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.\n\nInteger ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.", title: "Aliquam augue quam sollicitudin vitae consectetuer eget rutrum at lorem integer tincidunt?"}, 
		{votes: 7, answersNumber: 5, time: "9/1", body: "Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.\n\nCurabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.", title: "Nam dui proin leo odio porttitor id consequat in consequat ut?"}, 
		{votes: 15, answersNumber: 5, time: "4/1", body: "Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.\n\nVestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.", title: "Nec euismod scelerisque quam turpis adipiscing lorem vitae mattis nibh ligula nec sem duis?"}, 
		{votes: 6, answersNumber: 1, time: "13/1", body: "Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.\n\nIn hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.", title: "Luctus et ultrices posuere cubilia curae mauris viverra diam vitae quam?"}, 
		{votes: 12, answersNumber: 3, time: "13/1", body: "In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.\n\nMaecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.", title: "Mi pede malesuada in imperdiet et commodo vulputate justo in blandit ultrices?"}, 
		{votes: 37, answersNumber: 0, time: "10/1", body: "Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.", title: "Non mattis pulvinar nulla pede ullamcorper augue a suscipit nulla elit ac?"}, 
		{votes: 36, answersNumber: 10, time: "10/1", body: "Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.\n\nCurabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.", title: "Mauris laoreet ut rhoncus aliquet pulvinar sed nisl nunc rhoncus dui?"}, 
		{votes: 48, answersNumber: 7, time: "23/1", body: "In congue. Etiam justo. Etiam pretium iaculis justo.", title: "Praesent id massa id nisl venenatis lacinia aenean sit amet justo morbi ut odio cras?"}, 
		{votes: 19, answersNumber: 6, time: "8/1", body: "Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.\n\nCurabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.", title: "Condimentum id luctus nec molestie sed justo pellentesque viverra pede ac diam cras pellentesque?"}, 
		{votes: 30, answersNumber: 0, time: "29/1", body: "Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.\n\nInteger tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.", title: "Faucibus orci luctus et ultrices posuere cubilia curae mauris viverra?"}, 
		{votes: 45, answersNumber: 1, time: "26/1", body: "In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.", title: "Venenatis non sodales sed tincidunt eu felis fusce posuere felis?"}, 
		{votes: 3, answersNumber: 2, time: "23/1", body: "Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.\n\nPhasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.", title: "Erat tortor sollicitudin mi sit amet lobortis sapien sapien non?"}, 
		{votes: 56, answersNumber: 1, time: "9/1", body: "Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.", title: "Consequat varius integer ac leo pellentesque ultrices mattis odio donec?"}, 
		{votes: 34, answersNumber: 10, time: "7/1", body: "Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.\n\nPhasellus in felis. Donec semper sapien a libero. Nam dui.", title: "Eleifend luctus ultricies eu nibh quisque id justo sit amet sapien?"}, 
		{votes: 4, answersNumber: 0, time: "25/1", body: "Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.", title: "Nullam sit amet turpis elementum ligula vehicula consequat morbi a ipsum integer a?"}, 
		{votes: 12, answersNumber: 10, time: "15/1", body: "Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.\n\nDonec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.", title: "Ultrices mattis odio donec vitae nisi nam ultrices libero non mattis pulvinar?"}, 
		{votes: 29, answersNumber: 3, time: "24/1", body: "Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.\n\nNullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.", title: "Donec diam neque vestibulum eget vulputate ut ultrices vel augue vestibulum ante ipsum primis in?"}, 
		{votes: 2, answersNumber: 3, time: "18/1", body: "Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.", title: "Viverra diam vitae quam suspendisse potenti nullam porttitor lacus at turpis donec posuere metus vitae?"}, 
		{votes: 49, answersNumber: 0, time: "19/1", body: "Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.\n\nMaecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.", title: "Convallis morbi odio odio elementum eu interdum eu tincidunt in leo maecenas pulvinar?"}, 
		{votes: 7, answersNumber: 6, time: "31/1", body: "Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.\n\nProin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.", title: "Et commodo vulputate justo in blandit ultrices enim lorem ipsum dolor sit amet?"}, 
		{votes: 3, answersNumber: 2, time: "12/1", body: "Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.\n\nPraesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.", title: "A feugiat et eros vestibulum ac est lacinia nisi venenatis tristique fusce?"}, 
		{votes: 46, answersNumber: 5, time: "3/1", body: "Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.", title: "Libero ut massa volutpat convallis morbi odio odio elementum eu interdum?"}, 
		{votes: 32, answersNumber: 1, time: "10/2", body: "Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.", title: "In porttitor pede justo eu massa donec dapibus duis at velit eu est congue?"}, 
		{votes: 55, answersNumber: 9, time: "17/2", body: "In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.\n\nSuspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.", title: "Odio justo sollicitudin ut suscipit a feugiat et eros vestibulum ac est lacinia nisi?"}, 
		{votes: 34, answersNumber: 8, time: "11/2", body: "In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.\n\nNulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.", title: "Elit proin interdum mauris non ligula pellentesque ultrices phasellus id?"}, 
		{votes: 8, answersNumber: 9, time: "31/2", body: "Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.\n\nAenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.", title: "Massa tempor convallis nulla neque libero convallis eget eleifend luctus ultricies eu nibh?"}, 
		{votes: 8, answersNumber: 3, time: "11/2", body: "Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.", title: "Vel ipsum praesent blandit lacinia erat vestibulum sed magna at nunc commodo placerat?"}, 
		{votes: 37, answersNumber: 1, time: "16/2", body: "Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.", title: "Justo pellentesque viverra pede ac diam cras pellentesque volutpat dui maecenas tristique est?"}, 
		{votes: 2, answersNumber: 7, time: "2/2", body: "Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.\n\nCurabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.", title: "Pede justo eu massa donec dapibus duis at velit eu est congue?"}, 
		{votes: 16, answersNumber: 4, time: "17/2", body: "Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.\n\nProin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.", title: "Velit vivamus vel nulla eget eros elementum pellentesque quisque porta volutpat erat quisque erat?"}, 
		{votes: 2, answersNumber: 2, time: "11/2", body: "Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.\n\nPhasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.", title: "Nulla tellus in sagittis dui vel nisl duis ac nibh fusce lacus?"}, 
		{votes: 7, answersNumber: 5, time: "17/2", body: "Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.\n\nQuisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.", title: "Velit nec nisi vulputate nonummy maecenas tincidunt lacus at velit vivamus?"}, 
		{votes: 56, answersNumber: 5, time: "31/2", body: "Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.\n\nMauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.", title: "Potenti nullam porttitor lacus at turpis donec posuere metus vitae ipsum aliquam non mauris morbi?"}, 
		{votes: 54, answersNumber: 7, time: "30/2", body: "Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.\n\nPraesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.", title: "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices?"}, 
		{votes: 3, answersNumber: 6, time: "1/2", body: "Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.", title: "Pede morbi porttitor lorem id ligula suspendisse ornare consequat lectus in est?"}, 
		{votes: 55, answersNumber: 4, time: "29/2", body: "Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.", title: "Nulla sed vel enim sit amet nunc viverra dapibus nulla suscipit ligula in lacus?"}, 
		{votes: 19, answersNumber: 6, time: "29/2", body: "Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.\n\nPraesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.", title: "Molestie sed justo pellentesque viverra pede ac diam cras pellentesque?"}, 
		{votes: 36, answersNumber: 1, time: "27/2", body: "Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.", title: "Non sodales sed tincidunt eu felis fusce posuere felis sed lacus?"}, 
		{votes: 16, answersNumber: 2, time: "8/2", body: "Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.\n\nVestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.", title: "Aliquet ultrices erat tortor sollicitudin mi sit amet lobortis sapien sapien?"}, 
		{votes: 30, answersNumber: 3, time: "18/2", body: "Phasellus in felis. Donec semper sapien a libero. Nam dui.", title: "Aenean sit amet justo morbi ut odio cras mi pede?"}, 
		{votes: 11, answersNumber: 2, time: "26/2", body: "Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.\n\nIn hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.", title: "Sodales sed tincidunt eu felis fusce posuere felis sed lacus morbi sem mauris?"}, 
		{votes: 54, answersNumber: 5, time: "5/2", body: "Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.", title: "Vitae quam suspendisse potenti nullam porttitor lacus at turpis donec posuere metus vitae?"}, 
		{votes: 28, answersNumber: 2, time: "10/2", body: "Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.", title: "Sed augue aliquam erat volutpat in congue etiam justo etiam pretium iaculis justo in?"}, 
		{votes: 20, answersNumber: 5, time: "27/1", body: "Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.\n\nIn quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.", title: "Proin risus praesent lectus vestibulum quam sapien varius ut blandit non?"}, 
		{votes: 33, answersNumber: 3, time: "20/2", body: "Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.\n\nDuis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.", title: "Donec dapibus duis at velit eu est congue elementum in hac habitasse platea?"}, 
		{votes: 7, answersNumber: 5, time: "6/2", body: "Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.\n\nPraesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.", title: "Felis donec semper sapien a libero nam dui proin leo odio porttitor id?"}, 
		{votes: 4, answersNumber: 7, time: "5/1", body: "In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.\n\nNulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.", title: "Interdum mauris ullamcorper purus sit amet nulla quisque arcu libero rutrum?"}, 
		{votes: 51, answersNumber: 5, time: "2/1", body: "Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.", title: "Venenatis turpis enim blandit mi in porttitor pede justo eu massa?"}, 
		{votes: 58, answersNumber: 10, time: "21/1", body: "Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.", title: "Magnis dis parturient montes nascetur ridiculus mus etiam vel augue vestibulum rutrum rutrum neq?"}
	]
	
	shuffle(questsDATA)

	
	const mockPostsDATA = [
		{content: "Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.\n\nCras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.\n\nQuisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.", likes: 1, liked: false, comments: 19, time: "5:32"}, 
		{content: "Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.\n\nCurabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.", likes: 8, liked: false, comments: 16, time: "5:51"}, 
		{content: "Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.\n\nCras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.\n\nQuisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.", likes: 11, liked: false, comments: 29, time: "8:31"}, 
		{content: "Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.\n\nQuisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.\n\nPhasellus in felis. Donec semper sapien a libero. Nam dui.", likes: 9, liked: false, comments: 25, time: "11:42"}, 
		{content: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.\n\nVestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.", likes: 5, liked: false, comments: 21, time: "8:00"}, 
		{content: "Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.\n\nInteger ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.\n\nNam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.", likes: 9, liked: false, comments: 23, time: "7:05"}, 
		{content: "Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.\n\nIn congue. Etiam justo. Etiam pretium iaculis justo.", likes: 1, liked: true, comments: 21, time: "1:07"}, 
		{content: "Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.", likes: 3, liked: true, comments: 9, time: "6:29"}, 
		{content: "Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.", likes: 11, liked: true, comments: 18, time: "23:45"}, 
		{content: "Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.\n\nMorbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.\n\nFusce consequat. Nulla nisl. Nunc nisl.", likes: 2, liked: false, comments: 5, time: "6:39"}, 
		{content: "Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.\n\nSed ante. Vivamus tortor. Duis mattis egestas metus.\n\nAenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.", likes: 13, liked: false, comments: 30, time: "13:46"}, 
		{content: "Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.\n\nSed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.", likes: 10, liked: false, comments: 10, time: "23:54"}, 
		{content: "Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.", likes: 1, liked: false, comments: 17, time: "18:09"}, 
		{content: "In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.\n\nSuspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.\n\nMaecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.", likes: 8, liked: true, comments: 17, time: "2:15"}, 
		{content: "Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.\n\nDuis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.\n\nMauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.", likes: 5, liked: false, comments: 16, time: "0:34"}, 
		{content: "Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.\n\nMorbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.\n\nFusce consequat. Nulla nisl. Nunc nisl.", likes: 7, liked: false, comments: 18, time: "18:49"}, 
		{content: "Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.\n\nCras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.", likes: 2, liked: true, comments: 30, time: "10:10"}, 
		{content: "Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.", likes: 9, liked: true, comments: 14, time: "21:11"}, 
		{content: "Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.\n\nMauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.", likes: 13, liked: false, comments: 10, time: "5:08"}, 
		{content: "Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.\n\nSed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.", likes: 13, liked: true, comments: 15, time: "8:59"}, 
		{content: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.", likes: 10, liked: true, comments: 2, time: "19:42"}, 
		{content: "Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.", likes: 4, liked: true, comments: 19, time: "5:06"}, 
		{content: "Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.\n\nFusce consequat. Nulla nisl. Nunc nisl.\n\nDuis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.", likes: 13, liked: true, comments: 15, time: "20:40"}, 
		{content: "Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.\n\nCum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.\n\nEtiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.", likes: 14, liked: false, comments: 21, time: "7:57"}, 
		{content: "Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.", likes: 10, liked: false, comments: 17, time: "16:47"}, 
		{content: "Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.\n\nNullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.\n\nIn quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.", likes: 8, liked: false, comments: 10, time: "18:41"}, 
		{content: "Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.\n\nMorbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.", likes: 12, liked: false, comments: 10, time: "8:24"}, 
		{content: "In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.", likes: 7, liked: false, comments: 1, time: "17:30"}, 
		{content: "Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.", likes: 4, liked: true, comments: 2, time: "7:44"}, 
		{content: "Etiam vel augue. Vestibulum rutrum rutrum neque. Morbi porttitor lorem id ligula.", likes: 4, liked: false, comments: 26, time: "6:42"}, 
		{content: "Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.\n\nInteger ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.", likes: 1, liked: true, comments: 7, time: "23:41"}, 
		{content: "Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.\n\nIn hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.", likes: 3, liked: false, comments: 30, time: "6:24"}, 
		{content: "Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.\n\nDonec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.\n\nDuis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.", likes: 14, liked: false, comments: 29, time: "14:40"}, 
		{content: "Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.", likes: 1, liked: false, comments: 18, time: "0:27"}, 
		{content: "Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.\n\nCum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.\n\nEtiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.", likes: 9, liked: false, comments: 10, time: "17:27"}, 
		{content: "Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.\n\nProin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.", likes: 3, liked: true, comments: 29, time: "10:38"}, 
		{content: "Etiam vel augue. Vestibulum rutrum rutrum neque.Praesent blandit.\n\nPraesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.", likes: 8, liked: false, comments: 9, time: "5:10"}, 
		{content: "Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.", likes: 13, liked: false, comments: 30, time: "4:34"}, 
		{content: "Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.\n\nMorbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.\n\nFusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.", likes: 2, liked: true, comments: 24, time: "18:02"}, 
		{content: "Sed ante. Vivamus tortor. Duis mattis egestas metus.\n\nAenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.", likes: 1, liked: false, comments: 11, time: "22:13"}, 
		{content: "Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.\n\nMorbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.\n\nFusce consequat. Nulla nisl. Nunc nisl.", likes: 13, liked: false, comments: 25, time: "19:37"}, 
		{content: "Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.\n\nDonec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.\n\nDuis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.", likes: 4, liked: false, comments: 8, time: "10:41"}, 
		{content: "Fusce consequat. Nulla nisl. Duis bibendum, felis sed interdu nunc nisl.", likes: 6, liked: true, comments: 10, time: "5:05"}, 
		{content: "Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.\n\nCum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.", likes: 11, liked: false, comments: 11, time: "16:30"}, 
		{content: "Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.\n\nPhasellus in felis. Donec semper sapien a libero. Nam dui.\n\nProin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.", likes: 9, liked: false, comments: 24, time: "0:36"}, 
		{content: "Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.\n\nEtiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.\n\nPraesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.", likes: 7, liked: true, comments: 27, time: "2:45"}, 
		{content: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.", likes: 9, liked: false, comments: 2, time: "7:19"}, 
		{content: "Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.", likes: 5, liked: true, comments: 6, time: "14:58"}, 
		{content: "Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.", likes: 9, liked: false, comments: 26, time: "18:12"}, 
		{content: "Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.\n\nNullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.\n\nMorbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.", likes: 8, liked: true, comments: 5, time: "18:59"}
	]
	

	const mockAnswersDATA = [
		{time: "7/4", voted: false, votes: 11, body: "Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat."}, 
		{time: "8/4", voted: false, votes: 14, body: "Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque."}, 
		{time: "7/4", voted: false, votes: 11, body: "Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis."}, 
		{time: "1/4", voted: false, votes: 16, body: "Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl."}, 
		{time: "10/4", voted: false, votes: 4, body: "Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.\n\nNam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus."}, 
		{time: "12/4", voted: false, votes: 12, body: "Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.\n\nCras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque."}, 
		{time: "1/4", voted: false, votes: 5, body: "Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.\n\nMaecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti."}, 
		{time: "3/3", voted: false, votes: 16, body: "Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio."}, 
		{time: "11/3", voted: false, votes: 16, body: "Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."}, 
		{time: "1/3", voted: false, votes: 4, body: "Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.\n\nProin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl."}, 
		{time: "2/3", voted: false, votes: 17, body: "Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.\n\nInteger ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi."}, 
		{time: "11/4", voted: false, votes: 15, body: "Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus."}, 
		{time: "2/5", voted: false, votes: 7, body: "Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum."}, 
		{time: "3/5", voted: false, votes: 14, body: "Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem."}, 
		{time: "2/5", voted: false, votes: 17, body: "Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus."}, 
		{time: "8/5", voted: false, votes: 15, body: "Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.\n\nNam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus."}, 
		{time: "9/5", voted: false, votes: 8, body: "Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.\n\nVestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat."}, 
		{time: "4/5", voted: false, votes: 11, body: "Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero."}, 
		{time: "11/5", voted: false, votes: 14, body: "Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.\n\nSed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus."}, 
		{time: "5/5", voted: false, votes: 5, body: "Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus."}
	]


	const mockAlertsDATA = [
		{unseenNumber: 4, unseen: true, time: "11:03"}, 
		{unseenNumber: 2, unseen: true, time: "10:43"}, 
		{unseenNumber: 4, unseen: true, time: "9:12"}, 
		{unseenNumber: 1, unseen: true, time: "8:19"}, 
		{unseenNumber: 0, unseen: false, time: "6:36"}, 
		{unseenNumber: 0, unseen: false, time: "22/05"}, 
		{unseenNumber: 0, unseen: false, time: "22/05"}, 
		{unseenNumber: 0, unseen: false, time: "21/05"}, 
		{unseenNumber: 0, unseen: false, time: "21/05"}, 
		{unseenNumber: 0, unseen: false, time: "15/05"}, 
		{unseenNumber: 0, unseen: false, time: "14/05"}, 
		{unseenNumber: 0, unseen: false, time: "12/05"}, 
		{unseenNumber: 0, unseen: false, time: "11/05"}, 
		{unseenNumber: 0, unseen: false, time: "2/05"}, 
		{unseenNumber: 0, unseen: false, time: "1/05"}, 
	].reverse()


	const tagsDATA = [	
		{id: 1, name: "dynamic"}, 
		{id: 2, name: "Universal"}, 
		{id: 3, name: "workforce"}, 
		{id: 4, name: "Optimized"}, 
		{id: 5, name: "bi-directional"}, 
		{id: 6, name: "help-desk"}, 
		{id: 7, name: "Implemented"}, 
		{id: 8, name: "moderator"}, 
		{id: 9, name: "Re-contextualized"}, 
		{id: 10, name: "impactful"}, 
		{id: 11, name: "Assimilated"}, 
		{id: 12, name: "Future-proofed"}, 
		{id: 13, name: "definition"}, 
		{id: 14, name: "time-frame"}, 
		{id: 15, name: "Robust"}, 
		{id: 16, name: "contingency"}, 
		{id: 17, name: "Enterprise-wide"}, 
		{id: 18, name: "portal"}, 
		{id: 19, name: "24 hour"}, 
		{id: 20, name: "Cloned"}, 
	]



	/////////////////////////postsDATA & feedsDATA
	const {postsDATA, feedsDATA, sendRemoveRoom, sendNewRoom, sendNewPost, sendLikeForPost, getMorePosts} = (function () {	
		const module = {}
		const postsDATA = []
		const feedsDATA = []
		const morePosts = []
		let freeId = 0	
		let freeRoomId = 0

		roomsDATA.forEach((x)=> {
			x.id = freeRoomId++

			const posts = makePosts(x.members)
			posts.forEach(x=>postsDATA.push(x))
			feedsDATA.push({id: x.id, posts})

			morePosts[x.id] = 'ableToReciveMorePosts'
		})

		
		module.sendNewPost = (roomId, postData) => {
			postData.id = freeId++
			postsDATA.push(postData)
			getById(roomId, feedsDATA).posts.push(postData)
			return postData
		}

		module.sendLikeForPost = (id) => {
			const post = getById(id, postsDATA)
			const {liked} = post
			post.likes += liked? -1 : 1
	
			post.liked = !liked
		}

		module.sendNewRoom = (data) => {
			data.id = freeRoomId++
			roomsDATA.push(data)
			feedsDATA.push({id: data.id, posts: []})
			return data
		}
		
		module.sendRemoveRoom = (id) => {
			const roomsIndex = findIndexForId(id, roomsDATA)
			roomsDATA.splice(roomsIndex, 1)
			const feedsIndex = findIndexForId(id, feedsDATA)

			const posts = feedsDATA.splice(feedsIndex, 1)[0].posts
			
			posts.forEach((x)=>{
				if(x.alertOn) {
					const alertId = toggleAlertForItem(x)
					notify('alert', {type: 'toggleAlert', id: alertId})
				}
			})

		}
		
		module.getMorePosts = (roomId, number, position) => {
			if(morePosts[roomId] === undefined) {
				return
			}
			else
			if(morePosts[roomId] === 'ableToReciveMorePosts') {
				const room = getById(roomId, roomsDATA)
				const morePostsArray = makePosts(room.members)
				morePosts[roomId] = morePostsArray
			}
			else
			if(morePosts[roomId].length == 0) {
				return
			}

			const posts = morePosts[roomId].splice(0, number)

			
			const feedData = getById(roomId, feedsDATA).posts			
			if(position == 'top'){
				const length = feedData.length
				feedData.splice(length, length, ...posts)
			}
			else
			if(position == 'end'){
				feedData.splice(0, 0, ...posts)
			}
			else{
				error
			}
			
			postsDATA.splice(0,0, ...posts)

			return posts

		}
		

		module.postsDATA = postsDATA
		
		module.feedsDATA = feedsDATA

		return module



		function makePosts (members) {
			return pureShuffle(mockPostsDATA).map(x => {
				const newProps = {id: freeId++, user: getRandomItem(members)}
				const copyOfX = Object.assign(newProps, x)
				copyOfX.type = 'post'
				copyOfX.alertOn = false
				
				return copyOfX
			})
		}


	
	})()
	/////////////////////////postsDATA & feedsDATA


	/////////////////////////questsDATA & answersDATA
	const {sendNewQuest, sendVoteForQuest, sendVoteForAnswer, sendNewAnswer, answersDATA} = (function () {
		const answersDATA = []
		const module = {}
		let freeQuestId = 0
		let freeAnswerId = 0





		questsDATA.forEach(x=> {
			x.type = 'quest'
			x.user = getRandomItem(usersDATA)
			x.tags = getRandomItems(getRandomItem([1,2,3,4]), tagsDATA)
			x.alertOn = false
			x.id = freeQuestId++
			x.answers = getAnswers(x.answersNumber, x.user)
		})





		module.answersDATA = answersDATA

		module.sendNewQuest = (questData) => {
			questData.id = freeQuestId++
			questsDATA.push(questData)
			return questData
		}

		module.sendNewAnswer =  (answerData, questId) => {
			const questData = getById(questId, questsDATA)

			answerData.id = freeAnswerId++
			
			answersDATA.push(answerData)
			questData.answersNumber++
			questData.answers.push(answerData)

			return answerData
		}

		module.sendVoteForQuest = (id) => {
			const quest = getById(id, questsDATA)
			const {voted} = quest
			quest.votes += voted? -1 : 1
	
			quest.voted = !voted
			
			return quest.votes
		}

		module.sendVoteForAnswer = (id) => {
			const answer = getById(id, answersDATA)
			const {voted} = answer
			answer.votes += voted? -1 : 1
	
			answer.voted = !voted
			
			return answer.votes
		}

		return module


		function getAnswers (number, questUser) {
			const answersArray = getRandomItems(number, mockAnswersDATA)

			const usersArray = getRandomItems(number, usersDATA, {filter: randomFilter})

			answersArray.forEach((item, index) => {
				item.type = 'answer'
				item.id = freeAnswerId++
				item.user = usersArray[index]
				
				answersDATA.push(item)
			})

			answersArray.sort((x, y)=> y.votes - x.votes)
			
			return answersArray
			
			function randomFilter (item) {
				const fromTHEuser = item == questUser
				
				if(fromTHEuser)
					return false
				//
	
				return true
			}
		}

	})()
	/////////////////////////questsDATA & answersDATA


	/////////////////////////alertDATA
	const{alertsDATA, toggleAlertForItem, sendClearUnseenAlerts} = (function () {	
		const module = {}
		const alertsDATA = [].concat(getRandomItems(9, questsDATA), getRandomItems(6, postsDATA) )
		let freeId = 0
		shuffle(alertsDATA)

		alertsDATA.map((item, index)=>{
			const alertObj = mockAlertsDATA[index]
			alertObj.id = freeId++

			item.alert = alertObj
			item.alertOn = true
			
		})
		
		
		makeUserQuests(alertsDATA)

		module.alertsDATA = alertsDATA

		module.toggleAlertForItem = (item) => {
			let alertId = undefined

			if(item.alertOn === false) {
				const alertObj = {
					time : "12:10",
					unseen : false,
					unseenNumber : 0,
					id : freeId++,
				}
				
				item.alertOn = true
				item.alert = alertObj
				
				alertId = alertObj.id
				alertsDATA.push(item)
			}
			else 
			if(item.alertOn === true) {
				alertId = item.alert.id

				item.alertOn = false
				item.alert = undefined
				
				const index = alertsDATA.findIndex(x =>x===item)
				alertsDATA.splice(index, 1)
			}

			return alertId
		}

		module.sendClearUnseenAlerts = (id) => {
			const data = alertsDATA.find(x=>x.alert.id==id)
			data.alert.unseen = false
			data.alert.unseenNumber = 0
		}

		return module


		function makeUserQuests(array) {
			const questItems = array.filter(x => x.type == 'quest')
			questItems[questItems.length - 1].user = thisUserData
			questItems[questItems.length - 3].user = thisUserData
		}


	})()
	/////////////////////////alertDATA



	WSAPI.user = thisUserData
	
	WSAPI.myImgSrc = thisUserData.imgSrc


	return WSAPI




	function notify (who, what) {
		if(who == 'feed')
			var updateArray = feedUpdates
		else 
		if(who == 'alert')
			var updateArray = alertUpdates
		else 
		if(who == 'forum')
			var updateArray = forumUpdates
		else 
			return
		//

		const indexOfPreviousEqualUpdate = updateArray.findIndex(({id, type})=>{
			return id == what.id && type == what.type
		})		

		if(indexOfPreviousEqualUpdate === -1) {
			updateArray.push(what)
		}
		else{
			updateArray[indexOfPreviousEqualUpdate] = what
		}

	}







	function shuffle(a) {
		var j, x, i;
		for (i = a.length - 1; i > 0; i--) {
			j = Math.floor(Math.random() * (i + 1));
			x = a[i];
			a[i] = a[j];
			a[j] = x;
		}
	}

	function pureShuffle(a) {
		const ar = a.map(x=>x)
		var j, x, i;
		for (i = ar.length - 1; i > 0; i--) {
			j = Math.floor(Math.random() * (i + 1));
			x = ar[i];
			ar[i] = ar[j];
			ar[j] = x;
		}
		return ar
	}



	function getRandomItem (array) {
		return array[Math.floor(Math.random()*array.length)]
	} 

	function getRandomItems (number, array, {filter} = {}) {
		const items = []
		const noFilter = typeof filter != 'function'
		
		while(items.length < number) {
			const item = getRandomItem(array)
			
			if(!items.find(x=>x===item)){
				if(noFilter || filter(item, items)){
					items.push(item)
				}
			}	
		}

		return items

		function getRandomItem (array) {
			return array[Math.floor(Math.random()*array.length)]
		} 
	}

	function getById (id, array) {
		return array.find(x => x.id == id)
	} 

	function findIndexForId (id, array) {
		return array.findIndex(x => x.id == id)
	} 

})()








