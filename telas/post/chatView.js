/*
    module(data, imgSrc)
        //  data: [{
                name: '',
                content: '',
            }]

            imgSrc: user image


        
    module.listeners.

        onSendComment(txt)
            txt => body of the comment


    //

    module.user.

        more()
            //recives a promise to be resolved with older comments then the prior ones, if there are any
            //.then(data) data is the same as the initial

    //

    module.

        module.addNewComment(comentsData)
            //add comments bottom 
            //commentData data is the same as the initial

    //


*/

_['telas/post/chatView'] = function createChatView (data, myImgSrc, {blurState = true} = {}) {  

    const newTela = _['tools/myTelas'].new
    const newEle = _['tools/myLib'].newEle
    const myIcos = _['img/myIcos']
    const createRenderedListView = _['tools/renderedList']
    const responsiveInputEl = _['tools/myLib'].responsiveInputEl
    const responsiveSendButton = _['tools/myLib'].responsiveSendButton

    let module = {}

    
    
    


////////////// handling DOM
    let thisEle = newEle(`<div class="post-chat tela headspace">

        <style>

            .post-chat {
                display: flex;
                flex-direction: column;
            }

            .post-chat_blur{
                filter: blur(2.2px);
            }



            .post-chat_comment {
                background-color: white;
                margin: 20px 7px 0px 7px;

                padding: 7px;

                max-width: 85%;

                overflow-wrap: break-word;
            }

                .post-chat_comment_name{
                    font-weight: 600;
                }

                .post-chat_comment_content{
                    margin-top: 3px;
                }


            /**/

            .post-chat_comment_sent {
                background: lightgrey;
                padding: 7px;
                margin: 0px 7px;
                max-width: 85%;

                display: inline-block;
                margin-left: auto;
                
                overflow-wrap: break-word;
            }
            
                .post-chat_comment_sent_box {
                    margin-top: 20px;
                    
                    width: 100%;
                    display: flex;
                }

            /**/



            .post-chat_compose {
                width: 100%;
                padding: 5px 7px;
            }

                .post-chat_compose_box{
                    padding-left: 10px;
                    
                    display: flex;
                    align-items: center;
                    overflow: hidden;
                }

                .post-chat_compose_write {
                    resize: none;
                    outline: none;
                    width: 100%;
                    border: none;
                    margin: 5px 10px 5px 0px;
                    padding: 0;
                    font: 400 1rem Roboto;
                    /*overflow: hidden;*/
                    height: 1.188rem;
                    
                }
                
                .post-chat_compose_button {
                    width: 45px;
                    height: 40px;
                    flex-shrink: 0;
                    align-self: flex-end;
                    padding: 10px;
                    transition: 0.25s opacity;
                    
                    background: ${myIcos.color};
                    text-align: center;
                }

                    .post-chat_compose_button_hide {
                        opacity: 0;
                        pointer-events: none;
                    }

                    .post-chat_compose_button svg{
                        height: 100%;
                        pointer-events: none;
                    }

                /**/

            /**/


            .post-chat .scroller {
                flex-grow: 1;
                position: unset;
            }



        </style>
        


        <div class="post-chat_compose">
            <div class="post-chat_compose_box item" data-act="tapWriteBox">
                <textarea class="post-chat_compose_write"></textarea>
                <div class="post-chat_compose_button item post-chat_compose_button_hide" data-act="postSendComment">
                    ${myIcos.send}
                </div>
            </div>
        </div>
        
    </div>`)
    
    
    function renderComment (item)  {
        if(!item.sent){
                
            var contentEle = document.createElement('div')
            contentEle.className = 'post-chat_comment_content'
            contentEle.innerText = item.content
            
            var nameEle = document.createElement('div')
            nameEle.className = 'post-chat_comment_name'
            nameEle.innerText = item.name

            var div = document.createElement('div')
            div.className = `post-chat_comment item`
            div.append(nameEle)
            div.append(contentEle)
            
            return div
        
        }
        else{
        
            var contentEle = document.createElement('div')
            contentEle.className = 'post-chat_comment_content'
            contentEle.innerText = item.content
            

            var commentEle = document.createElement('div')
            commentEle.className = `item post-chat_comment_sent`

            commentEle.append(contentEle)

            var commentBoxEle = document.createElement('div')
            commentBoxEle.className = `post-chat_comment_sent_box`
            commentBoxEle.append(commentEle)
            
            return commentBoxEle
        }

        
        
    }


    
    const writeEle = thisEle.querySelector('.post-chat_compose_write')
    const sendEle = thisEle.querySelector('.post-chat_compose_button')
    

    if(blurState){
        thisEle.classList.add('post-chat_blur')
    }
    
    const responsiveInput_module = responsiveInputEl({el: writeEle, maxHeight: 95})
    
    const responsiveSendButton_module = 
        responsiveSendButton(sendEle, writeEle, 'post-chat_compose_button_hide')
    //

    
    const checkKeyboard = getCheckKeyboard()





    let thisTela = newTela(thisEle)

    thisTela.addActions({
        'postSendComment' () {
            let text = writeEle.value
            let cleanText = text.trim()
            
            if(cleanText){
                writeEle.value = ''
                responsiveInput_module.reset()
                responsiveSendButton_module.reset()
                module.listeners.onSendComment(cleanText)
            }
        },

        'tapWriteBox' () {
            writeEle.focus()
        }
    })

    thisTela.addListeners({
        in() {
            window.addEventListener('resize', checkKeyboard.check)
        },
        out () {
            window.removeEventListener('resize', checkKeyboard.check)
        }
    })







    let arrayOfComments = mapRenderComments(data)
    let renderedListView = getRenderedList(arrayOfComments)
    thisTela.prepend(renderedListView.tela)

    const scrollerEle = thisEle.querySelector('.post-chat .scroller')
    
    checkKeyboard.init(scrollerEle)




    module.addNewComments = x => { 
        renderedListView.addPostsUnder(mapRenderComments(x))
    }

    module.addBlur = x => { 
        thisEle.classList.add('post-chat_blur')        
    }

    module.removeBlur = x => { 
        thisEle.classList.remove('post-chat_blur')
    }

    module.tela = thisTela




    

    return module



    function getCheckKeyboard () {
         /*
            this page is rendered so when the bottom of the screen goes up
            (do to the entrace of the keyboard or the user typing more than one line)
            the scrollerElement, instead of shrinking in size and by default
            hiding the content that is bottom, it is pushed up and doesn't shirink
            
        */

        /*
            if this calculation doesn't work you may get the height from the parent ele, 
            wich is the main postTela
        */

        const module = {}
        let saveWindowHeight = undefined
        let ele = undefined

        module.init = (element)=>{
            ele = element
        }

        module.check = function () {
            const thisWindowHeight = window.innerHeight
            
            if(saveWindowHeight < thisWindowHeight) return
            saveWindowHeight = thisWindowHeight
            
            if((scrollerEle.scrollHeight - scrollerEle.offsetHeight) - scrollerEle.scrollTop < 550) {
                scrollerEle.scrollTop += 550
            }
        }

        return module


       

    }






    function mapRenderComments (x) {
        return x.map(renderComment)
    }




    function getRenderedList (arrayOfComments) {

        let renderedListView = createRenderedListView(arrayOfComments, {reverse: true, optimizeReturn: false})

        renderedListView.setCloserToTheEdge(() => 
            module.user.more().then(response => {
                
                if(response){
                    return mapRenderComments(response)
                } 
                else{
                    renderedListView.setCloserToTheEdge('disable')
                    return []
                } 

            })
        )
        
        return renderedListView
    }

}
