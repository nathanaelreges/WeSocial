_['telas/feed/createTela'] = function createFeedTela (home) {
     
    const createFeedView = _['telas/feed/view']
    const createPostsView = _['telas/feed/postsView']
    const createChooseRoomView = _['telas/feed/chooseRoomView']
    const createNoRoomsView = _['telas/feed/noRoomsView']
    const getFeedService = _['WSAPI'].feedService
    const createPostTela = _['telas/post/createTela']
    const createNewRoomTela = _['telas/newRoom/createTela']
    const createNewPostTela = _['telas/newPost/createTela']
    const createRoomTela = _['telas/room/createTela']
    const app = _['app']


    const thisService = getFeedService()
    let thisData = thisService.data
    
    if(thisData.noRooms === true){
        thisData = {
            getPosts () {},
            activeRoom: undefined,
            rooms: []
        }
    }






    const thisView = createFeedView(thisData.activeRoom)

    thisView.listeners = {

        onClickRoom() { 
            const roomTela = createRoomTela(thisData.activeRoom.id)
            app.nextTela(roomTela)
        },
        onChooseRoom() {
            initChooseRoomView()
        },
        onClickTool() {
            var newPostTela = createNewPostTela(thisData.activeRoom.id)
            app.nextTela(newPostTela)
        },
        onIn() {
            thisService.start()
        },
        onOut() {
            thisService.end()
        }
        
    }
    




    const postsView = createPostsView(thisData.getPosts())
    
    postsView.listeners = {
        onOpenPost (id) {
            const postTela = createPostTela(id)
            app.nextTela(postTela)
        },
        onTapLike (id) {
            id = parseInt(id)
            thisService.sendLike(id)
        },
        onTapComment (id) {
            const postTela = createPostTela(id, {initOnChat: true})
            app.nextTela(postTela)
        }
    }
    
    postsView.user = {
        update() {
            return thisService.getNewPosts()
        },
        more() {
            return thisService.getOlderPosts()
        }
    }
    
    thisService.listenForNewPosts(postsView.addNewPosts)

    thisView.setPostsTela(postsView.tela)







    thisService.listenForStatsUpdate((updateObj)=>{
        const {type} = updateObj

        if(type ==  'post') {
            postsView.updateStats(updateObj.array)
        }
        else
        if(type == 'changeRoom') {
            let newData = updateObj.data

            if(newData.noRooms === true){ 
                newData = {
                    getPosts () {},
                    activeRoom: undefined,
                    rooms: []
                }
            }

            postsView.changePosts(newData.getPosts())
            thisView.updateRoom(newData.activeRoom)
            
            thisData = newData
        }

    })




    return thisView.tela
    



    function changeRoom (id) {
        thisService.changeRoom(id)

        if(thisData.noRooms === true){
            thisData = {
                getPosts () {},
                activeRoom: {},
                rooms: []
            }
        }

        postsView.changePosts(thisData.getPosts())
        thisView.updateRoom(thisData.activeRoom)
    }



    
    function initChooseRoomView () {

        const chooseRoomView = createChooseRoomView({activeRoom: thisData.activeRoom, rooms: thisData.rooms})

        chooseRoomView.listeners = {
            onChooseRoom(id) { 
                thisService.changeRoom(id)
            },
            onAddRoom(id) { 
                const newRoomTela = createNewRoomTela()
                app.nextTela(newRoomTela)
            }
        }

        thisView.appendOnTop(chooseRoomView.tela)
    
    }


    function initNoRoomsView () {
        const noRoomsView = createNoRoomsView()

        noRoomsView.listeners = {
            onClickNewRoom () {
                const newRoomTela = createNewRoomTela()
                app.nextTela(newRoomTela)
            }
        }

        return noRoomsView
    }




}

/*
    feedService.
        
        data.
            getPosts()
            activeRoom.
                name
                imgSrc
            rooms [{
                name
                imgSrc
                id
            }]
        //


        listenForNewPosts(fun) 
        //call this listener when new posts arrive

        getNewPosts()
        //check if there are new posts, promise

        getOlderPosts()
        //more posts then passed on the array, promise

        changeRoom()
        //change the active room

        start()
        //for now start the eventListener

        end()
        //for now end the eventListener

    //
*/