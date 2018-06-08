_['telas/home/home_settings'] = function initSettingsHandler (thisEle) {

    const newEle = _['tools/myLib'].newEle
    const settingsIco = _['img/myIcos'].settingsBlue
    const myTime = _['tools/myTime']
    const getMyMove = _['tools/myMove']


    thisEle.addEventListener('mousedown', startListener, {passive: true})
    thisEle.addEventListener('touchstart', startListener, {passive: true})

    
    
    function startListener (e)  {

        const clickBugFixPromise = new Promise (x=>setTimeout(x,800))
        /*  
            When cliking, the browser (on developr tools) may fire events in this sequence:
                touchstart, touchend, mousedown, mouseup
            Thus breaking the logic, so we wait until the browser finishes this madness
                to protect our logic.
        */
        
        thisEle.removeEventListener('mousedown', startListener)
        thisEle.removeEventListener('touchstart', startListener)
 
        const {eles, removeEles} = initEles(thisEle)
        
        
        const pointerType = e.constructor.name === 'MouseEvent' ? 'mouse' : 'touch'

        initMoviment(thisEle, eles, pointerType).then(()=>{

            removeEles()
            clickBugFixPromise.then(()=>{
                thisEle.addEventListener('mousedown', startListener, {passive: true})
                thisEle.addEventListener('touchstart', startListener, {passive: true})
            })
            
        })
        
    }


    
    





    function initMoviment (eleToListen, elesToAnimate, pointerType) {
    
        
        let myTimeId = undefined
        let resolvePromise = undefined
        let syncEvents = 'endPhase'
        
        let clickTime = Date.now()
        let moves = 0
        
        const paneHeight = 200
        const minValue = -paneHeight
        const maxValue = 0
        let phase = 'opening'

        const moveModule = getMyMove(renderMove, {maxValue, minValue, acelTimes: 1.1})

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
    

        const touchListeners = { 
            startListener (e)  {
                if(syncEvents != 'startPhase') return
                syncEvents = 'endPhase'
                const touchY = pointerType == 'mouse'? e.clientY: e.touches[0].pageY

                moveModule.move(touchY)

                moves = 0
                clickTime = Date.now()
            },
            moveListener (e) {
                if(syncEvents != 'endPhase') return
                const touchY = pointerType == 'mouse'? e.clientY: e.touches[0].pageY
            
                moves++

                moveModule.move(touchY)
            },
            endListener (e) {
                if(syncEvents != 'endPhase') return
                syncEvents = 'startPhase'

                const cliked = Date.now() - clickTime < 300
                if(cliked && moves < 4) { 
                    moveModule.goTo('switch')
                }
                else{
                    const touchY = pointerType == 'mouse'? e.clientY : e.changedTouches[0].pageY
                    moveModule.endMove(touchY)    
                }
                
            }
        }
        
        const removeListeners = addListeners(eleToListen, touchListeners, pointerType)



        const thisPromise = new Promise (x=> resolvePromise = x)

        return thisPromise



        function renderMove (moveValue) {
            elesToAnimate.background.style.opacity  = `${-moveValue/400}`
            elesToAnimate.newButtom.style.transform = `translateY(${moveValue}px)`
            elesToAnimate.settingsPane.style.transform = `translateY(${moveValue}px)`
        }


        function closeController (type) {
            if(type !== 'timeClick') {
                myTime.remove(myTimeId)
            }
            removeListeners()
            resolvePromise()
        }

    }


    
    
    function addListeners (ele, {startListener, moveListener, endListener}, pointerType) {
    

        ele.addEventListener(pointerType == 'mouse'? 'mousedown' : 'touchstart' , startListener, {passive: true})
        ele.addEventListener(pointerType == 'mouse'? 'mousemove': 'touchmove', moveListener, {passive: true})
        ele.addEventListener(pointerType == 'mouse'? 'mouseup': 'touchend', endListener, {passive: true})
        if(pointerType == 'mouse'){
            ele.addEventListener('mouseleave', endListener, {passive: true})
        }
        
        return resetListeners
        
        function resetListeners (pointerType) {
            ele.removeEventListener(pointerType == 'mouse'? 'mousedown' : 'touchstart' , startListener)
            ele.removeEventListener(pointerType == 'mouse'? 'mousemove': 'touchmove', moveListener)
            ele.removeEventListener(pointerType == 'mouse'? 'mouseup': 'touchend', endListener)
            if(pointerType == 'mouse'){
                ele.removeEventListener('mouseleave', endListener)
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
        ele.append(newButtom)
        ele.append(style)
        ele.append(settingsPane)

        return {eles : {newButtom, settingsPane, background} , removeEles}

        function removeEles () {
            newButtom.remove()
            style.remove()
            settingsPane.remove()
            background.remove()
    
        }
    }


}


