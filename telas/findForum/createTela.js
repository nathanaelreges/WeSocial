_['telas/findForum/createTela'] = function createFindForumTela(findForumId) {

    const createFindForumView = _['telas/findForum/view']
    const createResultsView = _['telas/findForum/resultsView']
    const getFindForumService = _['WSAPI'].findForumService
    const createQuestTela = _['telas/quest/createTela']
    const createTagTela = _['telas/tag/createTela']
    const time = _['tools/myTime']
    const app = _['app']
    

    const thisService = getFindForumService(findForumId)



    let thisView = createFindForumView()

    thisView.listeners = {
        
        onSearch (text) {
            
            thisService.search(text).then(results => {

                initResultsView(results)

            })

        },

        onGoBack () {
            time.goBack()
        }, 

        onIn() {
            thisService.start()
        },

        onOut() {
            thisService.end()
        }

    }


    
    
    let resultsView



    
    return thisView.tela





    function initResultsView (results) {
        let replaceViews = false

        if(resultsView !== undefined){
            replaceViews = true
            var oldResultsView = resultsView
        }

        resultsView = createResultsView(results)
        
        resultsView.listeners = {
            
            onTapQuest (questId) {
                var questTela = createQuestTela(questId)
                app.nextTela(questTela)
            },

            onTapTag (tagId) {
                var tagTela = createTagTela(tagId)
                app.nextTela(tagTela)
            }

        }

        resultsView.user = {
            more () {
                return thisService.getMore()
            }
        }


        if(replaceViews){
            oldResultsView.tela.replace(resultsView.tela)
        }
        else {
            thisView.appendTela(resultsView.tela)
        }
        
        thisService.listenForStatsUpdate(resultsView.updateStats)

    }
    
}



