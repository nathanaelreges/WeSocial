_['telas/newPost/view'] = function createNewQuestView (user) {  

    const newTela = _['tools/myTelas'].new
    const newEle = _['tools/myLib'].newEle
    const makeEleGlow = _['tools/myLib'].makeEleGlow
    const responsiveInputEl = _['tools/myLib'].responsiveInputEl
    const responsiveSendButton = _['tools/myLib'].responsiveSendButton
    const myIcos = _['img/myIcos']

    let module = {}

    




    let thisEle = newEle(`<div id="newPost" class="tela background hidescrollbar scroller newpost" >
        
        <style>  

            .newpost-x{
                position: absolute;
                height: 40px;
                width: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                top: -5px;
                right: -5px;
            }

                .newpost-x *{
                    pointer-events: none;
                }                    

                .newpost-x svg{
                    height: 1rem;
                    width: 1rem;
                    background: ${myIcos.color};
                    border-radius: 40px;
                    padding: 3.4px;
                } 

            /**/    
            

            .newpost-post {
                margin: 26px 7px 7px 7px;                
                position: relative;
            }
        

                .newpost-post_box {
                    background-color: white;
                    padding: 7px 7px 0px 7px;
                    border-radius: 5px;
                }
            
                    .newpost-post_img {
                        width: 50px;
                        height: 50px;
                        border-radius: 25px;
                        position: absolute;
                        top: -20px;
                    }

                    .newpost-post_name {
                        margin-left: 55px;
                        font-weight: bold;
                    }

                    
                    .newpost-post_botbar {
                        padding: 17px 17px 11px 10px; 
                        display: flex;
                        flex-direction: row-reverse;       
                    }

                        .newpost-send {
                            background-color: ${myIcos.color};
                            padding: 4.45px 17px;
                            color: white;
                            display: inline;
                            font-size: 1rem;
                            border-radius: 30px;
                            letter-spacing: 0.5px;
                        }
                        
                        .newpost-send_disabled {
                            background-color: ${myIcos.color}85;
                        }
                    /**/
                    

                    .newpost-write{
                        font-size: 1rem;
                        resize: none;
                        outline: none;
                        width: 100%;
                        border: none;
                        margin: 0;
                        padding: 0px 5px;
                        margin-top: 17px;
                        font-family: 'Roboto', sans-serif;
                        overflow: hidden;
                        height: 100px;
                    }

                /**/

            /**/

            
            
        

        </style> 
        
        
        
        
        <div class="newpost-post">            
            <div class="newpost-post_box">
                <img class="newpost-post_img" src="${user.imgSrc}">                
                <span class="newpost-post_name">${user.name}</span>                
                                
                <textarea id="title" class="newpost-write" placeholder="Escreva sua postagem"></textarea>                
                <div class="newpost-post_botbar">                
                    <div class="newpost-send newpost-send_disabled" data-act="tapSendPost">
                        Publicar
                    </div>                
                </div>
            </div>
            <div class="newpost-x" data-act="newPostGoBack">
                ${myIcos.x}
            </div>
        </div>
        
        
    </div>`)

    let writeEle = thisEle.querySelector('.newpost-write')
    let sendEle = thisEle.querySelector('.newpost-send')
    





    makeEleGlow(sendEle)

    const responsiveInputEl_module = responsiveInputEl({el: writeEle, minHeight: 100})

    responsiveInputEl_module.scrollToBottom = () => {
        thisEle.scrollTop = 1000
    }


    responsiveSendButton(sendEle, writeEle, 'newpost-send_disabled')



    


    const thisTela = newTela(thisEle)

    thisTela.addActions({
        'newPostGoBack' () {
            module.listeners.onGoBack()
        },

        'tapSendPost' () {
            let text = writeEle.value
            let cleanText = text.trim()
            
            if(cleanText){
                module.listeners.onSend({text: cleanText})
            }
        }
    })


    thisTela.addListeners({
        in () {
            writeEle.focus()
        }
    })




 






    module.appendTela = (tela) => {
        thisTela.append(tela)
    }

    module.tela = thisTela



    return module
}



/*O Orem Ips um é um texto modelo da indústria tipográfica e de impressão. O Orem Ips um tem vindo a ser o texto padrão usado por estas indústrias desde o ano de 1500, quando uma misturou os caracteres de um texto para criar um espécime de livro. Este texto não só sobreviveu 5 séculos, mas também o salto para a tipografia electro nica, mantendo-se essencialmente inalterada. Foi popularizada nos anos 60 com a disponibilização das folhas de Letra set, que continham passagens com Orem Ips um, e mais recentemente com os programas de publicação como o Alus Page Maker que incluem versões do Orem Ips um. */