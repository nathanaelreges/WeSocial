_['telas/newRoom/view'] = function createNewRoomView (data) {  

    const newTela = _['tools/myTelas'].new
    const newEle = _['tools/myLib'].newEle
    const time = _['tools/myTime']
    const makeEleGlow = _['tools/myLib'].makeEleGlow
    const myIcos = _['img/myIcos']
    
    let module = {}

    




////////////// handling DOM
    let thisEle = newEle(`<div id="newRoom" class="tela background newroom scroller">
        
        <style>

            .newroom {
                display: flex;
                flex-direction: column;
            }

            .newroom-head {
                display: flex;
                align-items: center;
                flex-shrink: 0;
            }

                .newroom-head_title {
                    font-size: 1.13rem;        
                }

            /**/
            
            
            .newroom-box {
                padding: 0px 0px 20px 0px;
                flex-grow: 1;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                
                max-height: 550px;
            }

                .newroom-box > div{
                    flex-shrink: 0;
                }

                .newroom-spacebox {
                    flex-grow: 1;
                }

                .newroom-img_box{
                    display: flex;
                    justify-content: center;
                    margin-top: 15px;
                }
                    
                    .newroom-img {                    
                        height: 200px;
                        width: 200px;
                        border-radius: 100%;
                        background: white;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }

                /**/

                .newroom-fill_box {
                    margin-top: 15px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }

                    .newroom-fill_title {
                        font-weight: 300;
                    }
                    
                    .newroom-fill_form{
                        display: inline-flex;
                        align-items: center;
                        margin-top: 8px;
                        width: 80%;
                    }

                        .newroom-fill_input{
                            font-size: 1.1rem;
                            padding: 10px;
                            outline: none;
                            border: none;
                            font-family: 'Roboto', sans-serif;
                            background: none;
                            flex-grow: 1;
                        }

                        
                        .newroom-fill_button{
                            display: inline;
                            height: 20px;
                            width: 25px;
                        }
                        
                            .newroom-fill_button * {
                                pointer-events: none;
                            }
                            
                            .newroom-fill_button svg{
                                height: 18px;
                                width: 18px;
                            }
                    
                        /**/
                    
                    /**/

                /**/
            
                .newroom-create_box {
                    margin-top: 15px;
                    text-align: center;
                }

                    .newroom-create{
                        display: inline-block;
                        background: ${myIcos.color};
                        padding: 6px 23px;
                        flex-grow: 0;
                        color: white;
                        border-radius: 21px;
                        margin-left: 6px;
                        letter-spacing: 0.4px;
                        font-weight: 300;
                    }
                
                /**/
            
            /**/
        
        </style> 

        <div class="newroom-box scroller headspace">

            <div class="newroom-spacebox">
            </div>

            <div class="newroom-img_box"> 
                <div class="newroom-img" data-act="newRoom_photo">
                    Adicionar imagem
                </div>
            </div>

            <div class="newroom-spacebox">
            </div>
            
            <div class="newroom-fill_box"> 
                
                <div class="newroom-fill_title">
                    Nome do grupo
                </div> 

                <div class="newroom-fill_form item">
                    <input class="newroom-fill_input newroom-name_input" type="text" placeholder="Preencher..." maxlength="30">
                    <div class="newroom-fill_button"></div>
                </div>
            
            </div>

            <div class="newroom-spacebox">
            </div>

            <div class="newroom-fill_box"> 

                <div class="newroom-fill_title">
                    Descrição
                </div>

                <div class="newroom-fill_form item">
                    <input class="newroom-fill_input newroom-course_input" type="text"  placeholder="Preencher..." maxlength="50">
                    <div class="newroom-fill_button"></div>
                </div>
            
            </div>

            <div class="newroom-spacebox">
            </div>
            
            <div class="newroom-create_box" > 
                <div class="newroom-create item" data-act="newRoom_send"> 
                    Criar
                </div>
            </div>
                
            <div class="newroom-spacebox">
            </div>

        </div>

        <div class="newroom-head head"> 
            <span class="arrow" data-act="newRoom_GoBack">${myIcos.arrow}</span>
            <span class="newroom-head_title">Nova sala</span>
        </div>
        
    </div>`)

   
    const nameInputEle = thisEle.querySelector('.newroom-name_input')
    const courseInputEle = thisEle.querySelector('.newroom-course_input')
    const sendEle = thisEle.querySelector('.newroom-create')

    animateButton(nameInputEle)
    animateButton(courseInputEle)
    makeEleGlow(sendEle)




    let thisTela = newTela(thisEle)

    thisTela.addActions({
        
        'newRoom_send' () {    
            data = {
                name: nameInputEle.value,
                description: courseInputEle.value
            }

            module.listeners.onSend(data)
        },

        'newRoom_GoBack' () {
            module.listeners.onGoBack()
        },

        'newRoom_photo' () {
            module.listeners.onClickPhoto()
        }


    })



    module.tela = thisTela
    
    module.appendTela = (tela) => {
        thisTela.append(tela)
    }

    

    return module







    function animateButton (inputEle) {
        const butEle = inputEle.parentElement.querySelector('.newroom-fill_button')
        let isValid = false
        let butIsEdit = false

        inputEle.addEventListener('keydown', () => {
            requestAnimationFrame(test)
        })

        inputEle.addEventListener('blur', ()=>{
            if(isValid){
                changeButton('edit')
            }

            inputEle.value = inputEle.value.trim()
        })

        inputEle.addEventListener('focus', () => {
            
            setTimeout(() => {
                inputEle.scrollIntoView({block: 'center'})
            }, 250); 

            test({force: true})
        })

        butEle.addEventListener('click', (e)=>{
            if(butIsEdit){
                inputEle.focus()
            }   
        })


        function test ({force}) {
            let value = inputEle.value

            if(value === ' '){
                inputEle.value = ''
            }

            const nowIsValid = !!value.trim()




            if(nowIsValid != isValid || force){
                
               const newState = nowIsValid? 'send' : 'none'
                changeButton(newState)
                
                isValid = nowIsValid
            }

        }

        
        function changeButton (state) {

            if(state == 'send') {
                butEle.innerHTML = myIcos.correct
            }

            else if(state == 'edit') {
                butEle.innerHTML = myIcos.pencil
                    //Do this because the blus event fires before the click envent
                    //  so the edit flag goes true before the click event reads it
                requestAnimationFrame(()=>butIsEdit = true)
                inputEle.parentElement.style.background = 'none'
            }

            else if(state == 'none') {
                butEle.innerHTML = ''
            }

            if(state!= 'edit' && butIsEdit){
                butIsEdit = false
                inputEle.parentElement.style.background = ''
            }
    
        }

        function focusInput () {
            inputEle.focus()
        }

    }





}
