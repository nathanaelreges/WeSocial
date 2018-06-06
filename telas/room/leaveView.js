_['telas/room/leaveView'] = function createLeaveView (data) {  

    const newTela = _['tools/myTelas'].new
    const newEle = _['tools/myLib'].newEle
    const time = _['tools/myTime']
    const myIcos = _['img/myIcos']
    const makeEleGlow = _['tools/myLib'].makeEleGlow
    
    let module = {}
    let confirmed = false

    




////////////// handling DOM
    let thisEle = newEle(`<div class="room-check" data-act="leavecheck_no">
        
        <style>
            .room-check {
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

                .room-check_box {
                    display: inline-flex;
                    flex-direction: column;
                                        
                    background-color: white;
                    margin: 15px;
                    
                    will-change: transform;
                    transition: transform 0.2s;
                }
                
                    .room-check_text {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        
                        height: 150px;
                        padding: 25px;

                        color: black;
                        font-size: 1.3rem;
                        font-weight: 300;
                    }

                    .room-check_butbox{
                        display: flex;
                        justify-content: space-evenly;
                        padding-bottom: 9px;

                    }
                    
                        .room-check_but {
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


        <div class="room-check_box item">
            <div class="room-check_text">Tem certeza que deseja sair?</div>
            
            <div class="room-check_butbox">
                <div class="room-check_but" data-act="leavecheck_yes">Sim</div>
                <div class="room-check_but" data-act="leavecheck_no">Não</div>
            </div>
        </div>

        
    </div>`)

   
    let buttomEles = thisEle.querySelectorAll(".room-check_but")
    let boxEle = thisEle.querySelector(".room-check_box")
    
    
    
    
    
    makeEleGlow(buttomEles[0])
    makeEleGlow(buttomEles[1])
    

    //intro animation set up
    boxEle.style.transform = "scale(0.2)"
    thisEle.style.opacity = "0"


    


    time.addFun(close)




    let thisTela = newTela(thisEle)

    thisTela.addActions({
        'leavecheck_yes'() {
            confirmed = true
            time.goBack()
        },
        'leavecheck_no'() {
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
        if(confirmed){
            thisEle.remove()
            module.listeners.onYes()
            return
        }

        thisEle.style.opacity = "0"
        boxEle.style.transform = "scale(0.2)"
        
        boxEle.addEventListener('transitionend', () =>{
            thisEle.remove()
        }, {once: true})
    }

}
