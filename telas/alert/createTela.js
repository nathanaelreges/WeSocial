_['telas/alert/createTela'] = function createAlertTela () {
     
    const createAlertView = _['telas/alert/view']
    const createScrollerView = _['telas/alert/scrollerView']
    const createPostTela = _['telas/post/createTela']
    const createQuestTela = _['telas/quest/createTela']
    const getFeedService = _['WSAPI'].alertService
    const app = _['app'] 


    const thisService = getFeedService()
    const thisData = thisService.data
    let requestedNextTela = undefined




    const thisView = createAlertView()
    
    thisView.listeners = {

        onIn() {
            requestedNextTela = false
            thisService.start()
        },

        onOut() {
            if(!requestedNextTela) {
                scrollerView.clearSaveScroll()
            }
            thisService.end()
        }
    }
    




    const scrollerView = createScrollerView(thisData)

    scrollerView.listeners = {
        onTapQuest(questId) {
            questId = parseInt(questId)
            var questTela = createQuestTela(questId)
            app.nextTela(questTela)
            requestedNextTela = true
        },
        onTapPost(postId) {
            postId = parseInt(postId)
            const postTela = createPostTela(postId, {initOnChat: true})
            app.nextTela(postTela)
            requestedNextTela = true
        }
    }

    scrollerView.user = {
        more() {
            return thisService.getOlderItems()
        }
    }

    thisService.listenUpdates(scrollerView.processUpdate)
    

    thisView.setScrollerTela(scrollerView.tela)
    





    return thisView.tela
    



    


}
