_['telas/room/createTela'] = function createRoomTela (roomId) {
    
    const createRoomView = _['telas/room/view']
    const createCheckLeaveView = _['telas/room/leaveView']
    const createModalView = _['telas/utils/modalView']
    const getRoomService = _['WSAPI'].roomService
    const time = _['tools/myTime']

    
    const thisService = getRoomService(roomId)
    const thisData = thisService.data


    let thisView = createRoomView(thisData)

    thisView.listeners = {
        onLeaveRoom () {
            initCheckLeaveRoom()
        },
        onInvite () {
            initModalView('Esta função ainda não foi implementada.')
        }
    }





    return thisView.tela



    function initCheckLeaveRoom () {
        
        const checkView = createCheckLeaveView()

        thisView.appendTela(checkView.tela)

        checkView.listeners = {
            onYes() {
                thisService.leaveRoom()
                time.goBack()
            }
        }


    }



    function initModalView (text) {
        
        const modalView = createModalView({text})

        thisView.appendTela(modalView.tela)

    }
}
