_['telas/newRoom/createTela'] = function createNewRoomTela (roomId) {
    
    const createNewRoomView = _['telas/newRoom/view']
    const createModalView = _['telas/utils/modalView']
    const getNewRoomService = _['WSAPI'].newRoomService
    const createAllValid = _['tools/myLib'].createAllValid
    const time = _['tools/myTime']

    
    const thisService = getNewRoomService()
    






    let thisView = createNewRoomView()

    thisView.listeners = {
        
        onSend (data) {
            const dataOk = testData(data)
            
            if(!dataOk) return

            thisService.create(data)
            time.goBack()
        },
        
        onGoBack (data) {
            time.goBack()
        },

        onClickPhoto () {
            initModalView('Esta função ainda não foi implementada.')
        }

    }






    return thisView.tela
    






    function initModalView (text) {
        const modalView = createModalView({text})

        thisView.appendTela(modalView.tela)
    }



    function testData (data) {
        const nameOk = !!data.name.trim()
        const descriptionOk = !!data.description.trim()
        
        return (nameOk && descriptionOk)
    }
}
