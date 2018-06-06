_['telas/forum/createTela'] = function createForumTela (home) {
     
    const createForumView = _['telas/forum/view']
    const createScrollerView = _['telas/forum/scrollerView']
    const getForumService = _['WSAPI'].forumService
    const createQuestTela = _['telas/quest/createTela']
    const createNewQuestTela = _['telas/newQuest/createTela']
    const createFindForumTela = _['telas/findForum/createTela'] 
    const app = _['app'] 


    const thisService = getForumService()
    const thisData = thisService.data




    

    const thisView = createForumView()
    
    thisView.listeners = {

        onTapSearch() {
            let tela = createFindForumTela()
            app.nextTela(tela)
        },
        onTapTool() {
            const tela = createNewQuestTela()
            app.nextTela(tela)
        },
        onIn() {
            thisService.start()
        },
        onOut() {
            thisService.end()
        }
        
    }
    




    const scrollerView = createScrollerView(thisData.quests)
    
    scrollerView.listeners = {
        onOpenQuest (id) {
            const questTela = createQuestTela(id)
            app.nextTela(questTela)
        }
    }
    
    scrollerView.user = {
        more() {
            return thisService.getOlderQuests()
        }
    }
    
    thisService.listenForNewQuests(scrollerView.addNewQuests)
    thisService.listenForStatsUpdate(scrollerView.updateStats)

    thisView.setScrollerTela(scrollerView.tela)


    




    return thisView.tela
    







    
    function initChooseRoomView () {

        const chooseRoomView = createChooseRoomView({activeRoom: thisData.activeRoom, rooms: thisData.rooms})

        chooseRoomView.listeners = {
            onChooseRoom(id) { 
                thisService.changeRoom(id)
                thisView.updateRoom({room: thisData.activeRoom})
                postsView.changePosts(thisData.getPosts())
            },
            onAddRoom(id) { 
                const addRoomTela = createNewRoomTela()
                app.nextTela(addRoomTela)
            }
        }

        home.appendOnTop(chooseRoomView.tela)
    
    }



}