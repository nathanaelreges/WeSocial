_['telas/tag/createTela'] = function createTagTela(tagId) {

    const createTagView = _['telas/tag/view']
    const getTagService = _['WSAPI'].tagService
    const createQuestTela = _['telas/quest/createTela']
    const time = _['tools/myTime']
    const app = _['app']
    

    const thisService = getTagService(tagId)
    const thisData = thisService.data


    let thisView = createTagView(thisData)

    thisView.listeners = {
        
        onTapQuest (questId) {
            
            var questTela = createQuestTela(questId)
            app.nextTela(questTela)

        },

        onGoBack () {
            time.goBack()
        },

        onIn () {
            thisService.start()
        },

        onOut () {
            thisService.end()
        }

    }

    thisView.user = {

        more () {
            return thisService.getMore()
        }

    }



    thisService.listenForStatsUpdate(thisView.updateStats)

    
    
    return thisView.tela
}



