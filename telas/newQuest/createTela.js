_['telas/newQuest/createTela'] = function createNewQuestionTela () {
    
    const createNewQuestView = _['telas/newQuest/view']
    const createChooseTagView = _['telas/newQuest/chooseTagView']
    const createNewQuestModel = _['telas/newQuest/model']
    const getThisService = _['WSAPI'].newQuestService
    const goBackInTime = _['tools/myTime'].goBack
    

    const thisService = getThisService()




    let thisView = createNewQuestView()

    thisView.listeners = {
        onChooseTag () {
            initChooseTagView()
        },

        onRemoveTag (tagIndex) {
            thisModel.removeTag(tagIndex)
        },

        onTitleInput (value) {
            thisModel.updateTitle(value)
        },
        
        onBodyInput (value)  {
            thisModel.updateBody(value)
        },

        onSend () {
            let data = thisModel.get()
            thisService.sendQuest(data)
            goBackInTime()  
        }
    }





 
    let thisModel = createNewQuestModel()

    thisModel.listeners = {
        onStateUpdate (state)  {
            thisView.setSendButton(state)
        }
    }







    ///////////////////// external Flow Functions

    const initChooseTagView = () => {

        let chooseTagView = createChooseTagView()
        
        chooseTagView.listeners = {
            
            onSearchTag (value) {
                thisService.searchTag(value, reciveSearch)

                function reciveSearch (data) {
                    chooseTagView.showTags(data)
                }
            },

            onChooseTag  (tag) {
                const index = thisModel.addTag(tag)
                thisView.addTag(tag, index)
            }

        }

        thisView.appendTela(chooseTagView.tela)
    
    }


    return thisView.tela
}
