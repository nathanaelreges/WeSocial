_['telas/newQuest/chooseTagView'] = function createChooseTagView () {


    const newTela = _['tools/myTelas'].new
    const newEle = _['tools/myLib'].newEle
    const myIcos = _['img/myIcos']
    const addTimeFun = _['tools/myTime'].addFun
    const goBackInTime = _['tools/myTime'].goBack

    let module = {}
//



    
/////////////////////DOM
    let thisEle = newEle(`<div class="newquest-choose tela">
        
        <style>  

            .newquest-choose {
                background-color: rgba(0,0,0,0.9);
                padding-left: 10px;
                padding-right: 10px;
            }
            
                .newquest-choose_x{
                    position: fixed;
                    right: 0;
                    margin: 10px
                }

                .newquest-choose_x *{
                    pointer-events: none;
                }                    

                .newquest-choose_x svg{
                    height: 15px;
                }                           
        

                .newquest-choose_bar{
                    margin-right: 30px;
                    margin-top: 20px;
                    border-radius: 5px;
                    display: flex;
                    align-items: center;
                }                  
        
                    .newquest-choose_bar input{
                        font-size: 1rem;
                        padding: 10px;
                        outline: none;
                        border: none;
                        font-family: 'Roboto', sans-serif;
                        background: none;
                        flex-grow: 1;
                    }
                    
                    .newquest-choose_bar svg{
                        width: 25px;
                    }
                    
                    .newquest-choose_bar button{
                        padding-right: 7px;
                        background: none;
                        border: none;
                        outline: none;
                        height: 100%;
                    }
                    
                    .newquest-choose_bar button * {
                        pointer-events: none;
                        resize: none;
                    }
            
                /**/
            
                .newquest-choose_box{
                    margin-top: 5px;
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                }
        
                    .newquest-choose_box div{
                        padding: 7px;
                        margin: 10px;
                        display: inline-block;
                        font-weight: 500;
                    }
            
                /**/
            
            /**/

        </style> 
        
        <div class="newquest-choose_x" data-act="goBack">
            ${myIcos.x}
        </div>
        
        <form class="newquest-choose_bar item" action="#">
            <input type="text" placeholder="Qual TAG?"></input>
            <button type="submit">${myIcos.lupaBlack}</button>
        </form>

        <div class="newquest-choose_box">
        </div>

    </div>`)


    let inputEle = thisEle.querySelector('input')
    let chooseBoxEle = thisEle.querySelector('.newquest-choose_box')
/////////////////////DOM  
    






    
/////////////////////Tela

    let thisTela = newTela(thisEle)

    thisTela.addActions({
        'chooseThis' (dataset) {
            module.listeners.onChooseTag({id: parseInt(dataset.id), name: dataset.name})
            goBackInTime()
        }
    })

    thisTela.addListeners({
        in() {
            inputEle.focus()
        }
    })

/////////////////////Tela


/////////////////////module

    module.showTags = data => {
                
        chooseBoxEle.innerHTML = ""

        data.forEach(x => {
            const ele = newEle(`<div class="newquest-choose_box_item item" 
                data-act="chooseThis" data-id="${x.id}" data-name="${x.name}">
            </div>`)

            ele.innerText = x.name

            chooseBoxEle.append(ele)
        })

    }


    module.tela = thisTela

/////////////////////module




/////////////////////Others

    addTimeFun(function () {
        thisTela.remove()
    })




    //No spces at the start
    inputEle.addEventListener('keydown', () => {
        requestAnimationFrame(() =>{
            if(inputEle.value === ' '){
                inputEle.value = ''
            }
        })
    })

    thisEle.addEventListener('submit', e => {
        e.preventDefault()

        inputEle.blur() 

        let text = inputEle.value
        let cleanText = text.trim()
        
        inputEle.value = cleanText


        if(!cleanText) {
            inputEle.value = ''
            return
        }


        module.listeners.onSearchTag(cleanText)
    })

        





    return module

}
