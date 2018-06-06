

/*
    module()

    module.listeners.

        onGoBack()

        onSearch(text)
            //text = the text tha user typed, already tested for empty
    //

    module.appendTela(tela)
        //appends a Tela to this Tela

*/

_['telas/findForum/view'] = function createFindForumView (data) {  

    const newTela = _['tools/myTelas'].new
    const newEle = _['tools/myLib'].newEle
    const time = _['tools/myTime']
    const makeEleGlow = _['tools/myLib'].makeEleGlow
    const myIcos = _['img/myIcos']
    
    let module = {}

    




////////////// handling DOM
    let thisEle = newEle(`<div id="findForum" class="tela background findForum">
        
        <style>

            .findForum-head {
                display: flex;
                align-items: center;
                flex-wrap: wrap;
            }

                .findForum-head_arrow {
                    height: 100%;
                    padding-left: 12px;
                    display: flex;
                    align-items: center;
                }

                .findForum-head_arrow svg {
                    pointer-events: none;
                    height: 15px;
                    width: 30px;
                    margin-right: 3px;
                }

                .findForum-search_form {
                    border-bottom: 1px solid white;
                    margin-left: 10px;
                    margin-right: 50px;
                    padding: 7px 8px 4px 8px;
                    flex-grow: 1;
                }

                    .findForum-search_input {
                        padding: 0px;
                        font-size: 1rem;
                        outline: none;
                        border: none;
                        font-family: 'Roboto', sans-serif;
                        background-color: unset;
                        color: white;
                        width: 100%
                    }

                    .findForum-search_input::placeholder {
                        color: rgba(255,255,255,0.7);
                    }

                /**/

            /**/

        </style> 

        <div class="findForum-head head">
            
            <div class="findForum-head_arrow" data-act="findForumGoBack">
                ${myIcos.arrow}
            </div>

            <form class="findForum-search_form" action="#">
                <input class="findForum-search_input" type="text" placeholder="Qual é a sua duvida?"></input>
            </form>
            
        </div>
        
    </div>`)



    const inputEle = thisEle.querySelector('input')
    const headEle = thisEle.querySelector('.head')
                




    thisEle.addEventListener('submit', submitListener)




    //No spces at the start
    inputEle.addEventListener('keydown', () => {
        requestAnimationFrame(() =>{
            if(inputEle.value === ' '){
               inputEle.value = ''
            }
        })
    })









    


    let thisTela = newTela(thisEle)

    thisTela.addActions({

        'findForumGoBack' () {
            module.listeners.onGoBack()
        }     

    })

    thisTela.addListeners({

        in () {
            inputEle.focus()
            module.listeners.onIn()
        },
        out () {
            module.listeners.onOut()
        }

    })





    module.appendTela = (tela) => {
        thisTela.prepend(tela)
    }
    

    module.tela = thisTela


    
    return module







    
    function submitListener (e) {
        e.preventDefault()

        inputEle.blur() 

        let text = inputEle.value
        let cleanText = text.trim()
        
        inputEle.value = cleanText


        if(!cleanText) {
            inputEle.value = ''
            return
        }


        module.listeners.onSearch(cleanText)
    }        
        
        

}
