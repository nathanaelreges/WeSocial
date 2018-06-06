_['telas/home/home_settings'] = function initSettingsHandler (ele) {

    const newEle = _['tools/myLib'].newEle
    const tryCall = _['tools/myLib'].tryCall
    const settingsIco = _['img/myIcos'].settingsBlue
    const myTime = _['tools/myTime']

    let homeEle = undefined
    let myTimeId = undefined
            
    ele.addEventListener('mousedown', touchStart1, {passive: true})
    ele.addEventListener('touchstart', touchStart1, {passive: true})

    function touchStart1 (e) {
        
        ele.removeEventListener('touchstart', touchStart1)
        ele.removeEventListener('mousedown', touchStart1)
        
        let pointer = undefined
        if(e.constructor.name === 'MouseEvent')
            pointer = 'mouse'
        else 
            pointer = 'touch'
        //

        
        
    
        //////////////Elements
            var style = newEle(
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
            
            var newButtom = newEle(
                `<div class="foot_button settings_button">
                    ${settingsIco}
                </div>`
            )

            var settingsPane = newEle(
                `<div class="settings_pane">
                    <div class="settings_message">
                        Nada aqui ainda.
                    </div>
                </div>`
            )

            var background = newEle(
                `<div class="settings_background">
                </div>`
            )

            var theseActs = {}

            ele.append(background)
            ele.append(newButtom)
            ele.append(style)
            ele.append(settingsPane)
            
        //////////////Elements

        ///Moving logic
        var goingDown = false
        var paneHeight = 200
        var firstValue = pointer == 'mouse'? e.clientY: e.touches[0].clientY
        var value = 0
        var previusValue = 'nao mexeu'
        var clicking = true
        var moveCount = 0


        ele.addEventListener(pointer == 'mouse'? 'mousemove': 'touchmove', touchMove, {passive: true})
        ele.addEventListener(pointer == 'mouse'? 'mouseup': 'touchend', touchEnd1)
        if(pointer == 'mouse'){
            ele.addEventListener('mouseleave', touchEnd1)
        }



        
        function touchMove(e) { 
            if(!clicking) return
            moveCount++
            
            previusValue = value
            value = (pointer == 'mouse'? e.clientY: e.touches[0].clientY) - firstValue;

            if (value > 0) {
                value = 0
            }
            else 
            if (value < -paneHeight) {
                value = -paneHeight
            }
            
            background.style.opacity  = `${-value/400}`
            newButtom.style.transform = `translateY(${value}px)`
            settingsPane.style.transform = `translateY(${value}px)`
        }


        
        function touchEnd1 (e) {
            ele.removeEventListener(pointer == 'mouse'? 'mouseup': 'touchend', touchEnd1)
            if(pointer == 'mouse'){
                ele.removeEventListener('mouseleave', touchEnd1)
            }

            clicking = false
            var jogou = ((value - previusValue) * -1) > 5
            var passouDoMeio = value < -50
            var clicou = moveCount < 2
            moveCount = 0
            
            
            if (passouDoMeio || jogou || clicou) {
                transitionTo('up', () =>{                    
                    ele.addEventListener(pointer == 'mouse'? 'mousedown': 'touchstart', touchStart2, {passive: true, once: true})
                    myTimeId = myTime.addFun(closeController.bind(undefined, 'timeClick'))
                    value = 200
                })
            }
            else{
                closeController('normal')
            } 
        }

        function touchStart2 (e) {
            firstValue = (pointer == 'mouse'? e.clientY: e.touches[0].clientY) + paneHeight
            goingDown = true
            previusValue = 'nao mexeu'
            clicking = true
            
            ele.addEventListener(pointer == 'mouse'? 'mouseup': 'touchend', touchEnd2)
            if(pointer == 'mouse'){
                ele.addEventListener('mouseleave', touchEnd2)
            }
        }

        function touchEnd2 (e) { 
            ele.removeEventListener(pointer == 'mouse'? 'mouseup': 'touchend', touchEnd2)
            if(pointer == 'mouse'){
                ele.removeEventListener('mouseleave', touchEnd2)
            }
            clicking = false
            var jogou = (value - previusValue) > 5
            var passouDoMeio = value > -150
            var clicked = moveCount < 2
            moveCount = 0


            if (passouDoMeio || jogou || clicked) {
                
                closeController('normal')
            }
            else{
                transitionTo('up', () => {
                    ele.addEventListener(pointer == 'mouse'? 'mousedown': 'touchstart', touchStart2, {passive: true, once: true})
                })
            }
        }


        function closeController (type) {
            if(type !== 'timeClick') {
                myTime.remove(myTimeId)
            }
            else {
                ele.removeEventListener(pointer == 'mouse'? 'mousedown': 'touchstart', touchStart2)
            }

            ele.removeEventListener(pointer == 'mouse'? 'mousemove': 'touchmove', touchMove)
            
            transitionTo('down', ()=> {
                removeEles()
                ele.addEventListener('mousedown', touchStart1, {passive: true})
                ele.addEventListener('touchstart', touchStart1, {passive: true})
            })
        }
       

        function removeEles () {
            newButtom.remove()
            style.remove()
            settingsPane.remove()
            background.remove()
        }

        function transitionTo (dir, callback) {
            
            //If the ele is already in its destination, don't trasition it
            if (dir == 'up' && value == -paneHeight || dir == 'down' && value == 0) { 
                tryCall(callback)
                return
            }
            
            newButtom.classList.add('transition')
            settingsPane.classList.add('transition')
            background.classList.add('.settings_background-transition')

            newButtom.style.transform = ``
            settingsPane.style.transform = ``
            background.style.opacity  = ``
    
            if (dir == 'up') {
                newButtom.style.transform = `translateY(-${paneHeight}px)`
                settingsPane.style.transform = `translateY(-${paneHeight}px)`
                background.style.opacity  = `0.5`
            }
            else {
                newButtom.style.transform = `translateY(0px)`
                settingsPane.style.transform = `translateY(0px)`
                background.style.opacity  = `0`
            }
    
            newButtom.addEventListener('transitionend', function settingsButtomTransitionend() {
                newButtom.classList.remove('transition')
                settingsPane.classList.remove('transition')
                background.classList.remove('.settings_background-transition')
                tryCall(callback)
            }, { once: true })
        }

        
        
        //////////////////////////////
        
       
    }    
}