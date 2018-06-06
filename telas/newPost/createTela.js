_['telas/newPost/createTela'] = function createNewPostTela (roomId) {
    
    const createNewPostView = _['telas/newPost/view']
    const getNewPostService = _['WSAPI'].newPostService
    const userData = _['WSAPI'].user
    const goBackInTime = _['tools/myTime'].goBack
    
    
    const thisService = getNewPostService(roomId)
    
    
    let thisView = createNewPostView(userData)

    thisView.listeners = {
        
        onGoBack (){
            goBackInTime()
        },

        onSend (data) {
            thisService.send(data)
            goBackInTime()
        }

    }





    return thisView.tela

}
