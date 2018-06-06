_['telas/post/createTela'] = function createPostTela(postId, {initOnChat = false} = {}) {

    const createPostView = _['telas/post/view']
    const createBodyView = _['telas/post/bodyView']
    const createChatView = _['telas/post/chatView']
    const getPostService = _['WSAPI'].postService
    const time = _['tools/myTime']
    const app = _['app']
    






    const thisService = getPostService(postId)
    const thisData = thisService.data




    let thisView = createPostView({initialTab: initOnChat? "chat" : "post", bellState: thisData.post.alertOn})

    thisView.listeners = {
        
        onChangeTab (tab) {
            if(tab == 'chat'){
                bodyView.remove()
                chatView.removeBlur()
            }
            else{
                initBodyView()
                chatView.addBlur()
            }
        },

        onChangeAlert (state) {
            thisService.changeAlertState(state)
        },

        onInForLoading () {
            
        },


        onIn () {
            initChatView()
        },


        onOut () {
            
        },

        onGoBack () {
            time.goBack()
        }

    }




    let chatView = undefined // initChatView will set it

    let bodyView = undefined // initBodyView will set it
    


    if(!initOnChat){
        initBodyView()
    }
    
    



 


    return thisView.tela





    function initChatView () {
        
        chatView = createChatView(thisData.chat, thisData.userImgSrc, {blurState: !initOnChat})

        chatView.listeners = {
            onSendComment (txt) {
                thisService.sendComment(txt)
                thisView.turnBellOn()
            }
        }

        chatView.user = {
            more() {
                return thisService.getOlderComments()
            }
        }

        thisService.listenForNewComments(chatView.addNewComments)

        thisView.prependTela(chatView.tela)
    }



    function initBodyView () {

        bodyView = createBodyView(thisData.post)


        bodyView.listeners = {
            onClosedPost () {
                thisView.changeTabToChat()
                chatView.removeBlur()
            },
            
            onTapLike (id) {
                id = parseInt(id)
                thisService.sendLike(id)
            }
        }
           
        thisView.appendTela(bodyView.tela)
    
    }









}



