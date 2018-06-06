/*
    module(data)

    module.listeners.

        onSend(value)

        onOut()

    //

*/



_['telas/quest/writeAnswerView'] = function createWriteAnswerView (data) {  

    const newTela = _['tools/myTelas'].new
    const newEle = _['tools/myLib'].newEle
    const makeEleGlow = _['tools/myLib'].makeEleGlow
    const responsiveInputEl = _['tools/myLib'].responsiveInputEl
    const responsiveSendButton = _['tools/myLib'].responsiveSendButton
    const myIcos = _['img/myIcos']
    
    let module = {}

    




////////////// handling DOM
    let thisEle = newEle(`<div class="quest-write background item">
        
        <style>

            .quest-write{
                margin: 3%;
                margin-bottom: 20px;
                margin-top: 32px;
                padding: 5px;
                font-size: 1rem;
                position: relative;
            }

                .quest-write_x{
                    height: 30px;
                    width: 30px;
                    position: absolute;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    right: 3px;
                    top: -12px;
                }

                    .quest-write_x *{
                        pointer-events: none;
                    }                    

                    .quest-write_x svg{
                        height: 1.1rem;
                        width: 1.1rem;
                        background: ${myIcos.color};
                        border-radius: 40px;
                        padding: 3.2px;
                    } 

                /**/

                .quest-write_body{
                    margin-top: 10px;
                    margin-bottom: 10px;
                    height: 100px;      
                    width: 100%;
                    
                    padding: 0 5px;

                    font-family: 'Roboto', sans-serif;
                
                    resize: none;
                    outline: none;
                    border: none;
                    overflow: hidden;
                    background: none;                    
                }


                .quest-write_bot {
                    display: flex;
                }

                    .quest-write_send {
                        margin-left: auto;
                        margin-right: 10px;
                        margin-bottom: 5px;
                        background: ${myIcos.color};
                        padding: 6px 20px;
                        flex-grow: 0;
                        color: white;
                        border-radius: 21px;
                    }

                    .quest-write_send_disabled {
                        background-color: ${myIcos.color}85;    
                    }

                /**/

            /**/

        </style> 
            
        <div class="quest-write_x" data-act="answerWriteGoBack">
            ${myIcos.x}
        </div>

        <textarea id="title" class="quest-write_body" placeholder="Escreva sua reposta ..."></textarea>
        
        <div class="quest-write_bot">                     

            <div class="quest-write_send quest-write_send_disabled" data-act="tapSend">
                Publicar
            </div>

        </div>

    </div>`)
 
    const sendEle = thisEle.querySelector('.quest-write_send')
    const textAreaEle = thisEle.querySelector('textarea')
    const writeXEle = thisEle.querySelector('.quest-write_x')




    makeEleGlow(sendEle)

    const responsiveInputEl_module = responsiveInputEl({el: textAreaEle, minHeight: 100})
    
    const responsiveSendButton_module = 
        responsiveSendButton(sendEle, textAreaEle, 'quest-write_send_disabled')
    //





    let thisTela = newTela(thisEle)

    thisTela.addListeners({
        in() {
            textAreaEle.focus()
            writeXEle.scrollIntoView({block: 'start', inline: 'start'})

        }
    })


    thisTela.addActions({

        'tapSend' () {
            let text = textAreaEle.value
            let cleanText = text.trim()

            if(cleanText) {
                textAreaEle.value = ''
                responsiveInputEl_module.reset()
                responsiveSendButton_module.reset()
                module.listeners.onSend(cleanText)
            }
        },

        'answerWriteGoBack' () {
            module.listeners.onOut()
        }

    })







    module.tela = thisTela




    return module



}