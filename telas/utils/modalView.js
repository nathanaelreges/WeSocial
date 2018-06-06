_['telas/utils/modalView'] = function createModalView ({text}) {  

    const newTela = _['tools/myTelas'].new
    const newEle = _['tools/myLib'].newEle
    const time = _['tools/myTime']
    const myIcos = _['img/myIcos']
    const makeEleGlow = _['tools/myLib'].makeEleGlow
    
    let module = {}

    




////////////// handling DOM
    let thisEle = newEle(`<div class="modal" data-act="leaveModal">
        
        <style>
            .modal {
                position: fixed;
                top:0;
                
                height: 100%;
                width: 100%;
                
                background-color: rgba(0,0,0,0.7);
                
                display: flex;
                align-items: center;
                justify-content: center;
                
                will-change: opacity;
                transition: opacity 0.2s;
            }

                .modal_box {
                    display: inline-flex;
                    flex-direction: column;
                                        
                    background-color: white;
                    max-width: 85%;

                    will-change: transform;
                    transition: transform 0.2s;
                }
                
                    .modal_text {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        
                        height: 150px;
                        padding: 15px;

                        color: black;
                        font-size: 1.3rem;
                        font-weight: 300;
                        text-align: center;
                    }

                    .modal_butbox{
                        display: flex;
                        justify-content: space-evenly;
                        padding-bottom: 9px;

                    }
                    
                        .modal_but {
                            background: ${myIcos.color};
                            padding: 6px 20px;
                            flex-grow: 0;
                            color: white;
                            border-radius: 21px;
                        }

                    }

                /**/

            /**/
            
        </style> 


        <div class="modal_box item">
            <div class="modal_text">${text}</div>
            
            <div class="modal_butbox">
                <div class="modal_but" data-act="leaveModal">OK</div>
            </div>
        </div>

        
    </div>`)

   
    let buttomEles = thisEle.querySelectorAll(".modal_but")
    let boxEle = thisEle.querySelector(".modal_box")
    
    
    
    
    
    makeEleGlow(buttomEles[0])
    
    

    //intro animation set up
    boxEle.style.transform = "scale(0.2)"
    thisEle.style.opacity = "0"


    


    time.addFun(close)




    let thisTela = newTela(thisEle)

    thisTela.addActions({
        'leaveModal'() {
            time.goBack()
        }
    })

    thisTela.addListeners({
        in () {
            //intro animation start
            boxEle.style.transform = ""
            thisEle.style.opacity = ""
        }
    })







    module.tela = thisTela

    return module






    function close () {
        thisEle.style.opacity = "0"
        boxEle.style.transform = "scale(0.2)"
        
        boxEle.addEventListener('transitionend', () =>{
            thisEle.remove()
        }, {once: true})
    }

}
