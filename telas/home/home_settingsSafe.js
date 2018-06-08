_['telas/home/home_settings'] = function initSettingsHandler (ele) {

    const newEle = _['tools/myLib'].newEle
    const settingsIco = _['img/myIcos'].settingsBlue
    const myTime = _['tools/myTime']
    const getMyMove = _['tools/myMove']


    let moveModule = undefined
    let inited = false
    let syncEvents = 'startPhase'





    ele.addEventListener('mousedown', startListener, {passive: true})
    ele.addEventListener('touchstart', startListener, {passive: true})

    
    
    function startListener (e)  {
        if(syncEvents != 'startPhase') return
        syncEvents = 'endPhase'
        const touchY = e.touches[0].pageY

        if(!inited) {
            inited = true
            init(e)
        }

        moveModule.move(touchY)
    }

    function moveListener (e) {
        if(syncEvents != 'endPhase') return
        const touchY = e.touches[0].pageY

        moveModule.move(touchY)
    }

    function endListener (e) {
        if(syncEvents != 'endPhase') return
        syncEvents = 'startPhase'
        const touchY = e.changedTouches[0].pageY
    
        moveModule.endMove(touchY)
    }





    function init (e) {

        const pointer = e.constructor.name === 'MouseEvent' ? 'mouse' : 'touch'
        addListeners(pointer)

        
        const paneHeight = 200
        const minValue = -paneHeight
        const maxValue = 0
        let phase = 'opening'
        let myTimeId = undefined
    



        const {newButtom, settingsPane, background, removeEles} = initEles()

        moveModule = getMyMove(renderMove, {maxValue, minValue})

        moveModule.listeners = {
            startMove () {
                
            },
            endMove (arg) {
                if(phase == 'opening') {

                    if(arg == 'reachedMin') {
                        phase = 'closing'
                        myTimeId = myTime.addFun(closeController.bind(undefined, 'timeClick'))
                    }
                    else if(arg == 'reachedMax') {
                        closeController('normal')
                    }

                }
                else if(phase == 'closing') {

                    if(arg == 'reachedMax') {
                        phase = 'opening'
                        closeController('normal')
                    }
                    else if(arg == 'reachedMin') {
                    }

                }
            }
        }
    


        function renderMove (moveValue) {
            background.style.opacity  = `${-moveValue/400}`
            newButtom.style.transform = `translateY(${moveValue}px)`
            settingsPane.style.transform = `translateY(${moveValue}px)`
        }


        function closeController (type) {
            if(type !== 'timeClick') {
                myTime.remove(myTimeId)
            }
           
            resetListeners()
            removeEles()
            inited = false
            moveModule = undefined
            
        }


        function addListeners (pointer) {
            ele.addEventListener(pointer == 'mouse'? 'mousemove': 'touchmove', moveListener, {passive: true})
            ele.addEventListener(pointer == 'mouse'? 'mouseup': 'touchend', endListener, {passive: true})

            if(pointer == 'mouse'){
                ele.removeEventListener('touchstart', startListener)
                ele.addEventListener('mouseleave', endListener, {passive: true})
            }
            else {
                ele.removeEventListener('mousedown', startListener)
            }
        }
        
        function resetListeners (pointer) {
            ele.removeEventListener(pointer == 'mouse'? 'mousemove': 'touchmove', moveListener)
            ele.removeEventListener(pointer == 'mouse'? 'mouseup': 'touchend', endListener)

            if(pointer == 'mouse'){
                ele.removeEventListener('mouseleave', endListener)
                ele.addEventListener('touchstart', startListener, {passive: true})
            }
            else {
                ele.addEventListener('touchstart', startListener, {passive: true})
            }
        }

        
    
    }


    
    



    function initEles () {
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
        ele.append(newButtom)
        ele.append(style)
        ele.append(settingsPane)

        return { newButtom, settingsPane, background, removeEles }

        function removeEles () {
            newButtom.remove()
            style.remove()
            settingsPane.remove()
            background.remove()
    
        }
    }


}


