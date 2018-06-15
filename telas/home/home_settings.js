_['telas/home/home_settings'] = function initSettingsHandler (thisEle) {

    const newEle = _['tools/myLib'].newEle
    const settingsIco = _['img/myIcos'].settingsBlue
    const myTime = _['tools/myTime']
    const getMyMove = _['tools/myMove/init.js']

    let pullModule = undefined



    thisEle.addEventListener('mousedown', startListener, {passive: true})
    thisEle.addEventListener('touchstart', startListener, {passive: true})

    

    let boxEle = undefined
    setBoxEle()

    
    function startListener (e)  {

        thisEle.removeEventListener('mousedown', startListener)
        thisEle.removeEventListener('touchstart', startListener)
        

        const {eles} = initEles(boxEle)
        

        pullModule = initMoviment(boxEle, eles, e)
        
        pullModule.onEnd = () => {
            boxEle.remove()
            setBoxEle()
            thisEle.addEventListener('mousedown', startListener, {passive: true})
            thisEle.addEventListener('touchstart', startListener, {passive: true})  
        }
        
    }







    function setBoxEle () {
        boxEle = newEle(`<div
            style="position: absolute; top:0; height: 50px; width: 60px;">
        </div>`)
        thisEle.append(boxEle)
    }



    function initMoviment (eleToListen, elesToAnimate, startEvent) {
    
        const module = {}
        let myTimeId = undefined
        let clickTime = undefined
        


        const paneHeight = 200
        const maxValue = -paneHeight
        let phase = 'opening'

        const moveModule = getMyMove(renderMove, maxValue, eleToListen, {acelTimes: 1.05})

        moveModule.onStartMove = () => {
            clickTime = Date.now()
        }

        moveModule.onEndMove = (arg) => {
            if(phase == 'opening') {
                if(arg == 'max') {
                    
                    phase = 'closing'
                    myTimeId = myTime.addFun(closeController.bind(undefined, 'timeClick'))

                }
                else if(arg == 'zero') {
                    
                    const clicked = Date.now() - clickTime < 300
                    if(clicked){
                        moveModule.switch()
                    }
                    else{
                        closeController('normal')
                    }

                }
            }
            else if(phase == 'closing') {
                if(arg == 'zero') {
                    
                    phase = 'opening'
                    closeController('normal')

                }
                else if(arg == 'max') {

                    const clicked = Date.now() - clickTime < 300
                    if(clicked){
                        moveModule.switch()
                    }

                }
            }
        }
    
        moveModule.moveAlreadyStarted({startEvent})
        

        
        return module



        function renderMove (moveValue) {
            elesToAnimate.background.style.opacity  = `${-moveValue/400}`
            elesToAnimate.newButtom.style.transform = `translateY(${moveValue}px)`
            elesToAnimate.settingsPane.style.transform = `translateY(${moveValue}px)`
        }


        function closeController (type) {
            if(type == 'timeClick') {
                moveModule.switch()
            }
            else {
                myTime.remove(myTimeId)
                module.onEnd()
            }
            
        }

    }


    function initEles (ele) {
        const style = newEle(
            `<style>
                .settings_button {
                    position: absolute;
                    top:0;
                    background: white;
                    will-change: transform;
                    border-top-left-radius: 10px;
                    border-top-right-radius: 10px;
                    height: 50px;
                    width: 60px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                
                .settings_button * {
                    pointer-events: none;
                }

                .settings_pane {
                    will-change: transform;
                    color: black;
                    background: white;
                    position: fixed;
                    left: 0;
                    height: 200px;
                    width: 100%;
                    bottom: -200px;
                    border-radius: 5px 5px 0px 0px;
                    
                    display: flex; 
                }

                    .settings_message {
                        margin: auto;
                        color: black;
                        font-size: 1.35rem;
                        font-weight: 300;
                        letter-spacing: 1px;
                        word-spacing: 3px;
                    }
                
                /**/
                
                .settings_background {
                    will-change: opacity;
                    background: black;
                    position: fixed;
                    left: 0;
                    height: 100%;
                    width: 100%;
                    bottom: 0;
                    opacity: 0;                  
                }

                .settings_background-transition {
                    transition: 0.25s opacity;
                }
            </style>`
        )
        
        const newButtom = newEle(
            `<div class="foot_button settings_button">
                ${settingsIco}
            </div>`
        )

        const settingsPane = newEle(
            `<div class="settings_pane">
                <div class="settings_message">
                    Nada aqui ainda.
                </div>
            </div>`
        )

        const background = newEle(
            `<div class="settings_background">
            </div>`
        )


        

        
        
        ele.append(background)
        ele.append(style)
        ele.append(newButtom)
        ele.append(settingsPane)

        return {eles: {newButtom, settingsPane, background}}

    }


}