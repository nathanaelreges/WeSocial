_['telas/quest/createTela'] = function createQuestTela (questId) {
    
    const createQuestView = _['telas/quest/view']
    const createAnswersView = _['telas/quest/answersView']
    const createWriteAnswerView = _['telas/quest/writeAnswerView']
    const getQuestService = _['WSAPI'].questService
    const time = _['tools/myTime']

    
    const thisService = getQuestService(questId)
    const thisData = thisService.data



    let thisView = createQuestView(thisData.quest, thisData.quest.alertOn)
    
    thisView.listeners = {
        
        onGoBack () {
            time.goBack()
        },

        onWriteAnswer() {
            initWriteAnswer()
        },

        onChangeAlert (state) {
            thisService.changeAlertState(state)
        },

        onVote(state) {
            thisService.questVote(state)
        }

    }

    
    
    
    let answersView = createAnswersView(thisData.answers)
    
    answersView.listeners = {

        onVote(id, state) {
            thisService.answerVote(id, state)
        }

    }

    thisView.setAnswersTela(answersView.tela)

    thisService.listenForNewAnswers(answersView.addAnswer)
    
    
    let writeAnswerView //Place fo writeAnswersView



    return thisView.tela



    function initWriteAnswer () {

        if(!writeAnswerView){
            writeAnswerView = createWriteAnswerView()
        }

        thisView.toggleButtons()
        thisView.setWriteAnswerTela(writeAnswerView.tela)


        writeAnswerView.listeners = {

            onOut() {
                thisView.resetWriteAnswerTela()
                thisView.toggleButtons()
            },

            onSend(text) {
                thisService.sendAnswer(text)
                thisView.resetWriteAnswerTela()
                thisView.toggleButtons()
            }
        }

    }
}
