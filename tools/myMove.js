_['tools/myMove'] = function getMyMove (renderMove, {maxValue, minValue = 0, startValue = 0, acelTimes = 1}) {
    const module = {}
    if(acelTimes < 0){acelTimes = 1}        
    let startMoveY = 0
    let moveRef = 0
    

    let trowModule = getTrow(renderMove)


    module.move = function (value) {
        if(!startMoveY){
            startMoveY = value
            module.listeners.startMove()

            if(trowModule.trowRuning()) {
                moveRef = trowModule.stopTrow()
            }
        } 
        
        let moveValue = value - startMoveY + (moveRef || startValue)
        moveValue = moveValue
        if(moveValue > maxValue){
            moveValue = maxValue
        }
        else if(moveValue < minValue){
            moveValue = minValue
        }

        renderMove(moveValue)

        trowModule.mesure(moveValue)
    }

    module.cancelMove = function (value) {
        moveRef = 0
        startMoveY = 0
        trowModule.mesure({clear: true})
        if(trowModule.trowRuning()) {
            trowModule.stopTrow()
        }
        module.listeners.endMove()
    }


    module.endMove = function (value) { 
        let  moveValue = value - startMoveY + (moveRef || startValue)
        moveValue = moveValue

        if(moveValue >= maxValue) {
            module.listeners.endMove('reachedMax')
            startValue = maxValue
        }
        else if(moveValue <= minValue) {
            module.listeners.endMove('reachedMin')
            startValue = minValue
        }
        else if(moveValue == startValue) {
            module.listeners.endMove('reachedStart')
        }
        else {

            if(moveValue > startValue) {
                const acel = -0.001 * acelTimes
                trowPromise = trowModule.trow({acel, maxValue, minValue: startValue}).then((x)=>{
                    if (x == 'reachedMax') {
                        module.listeners.endMove('reachedMax')
                        startValue = maxValue
                    }
                    else if (x == 'reachedMin') {
                        module.listeners.endMove(startValue == minValue? 'reachedMin' : 'reachedStart')
                    }
                })
            }
            else {
                const acel = 0.001 * acelTimes
                trowPromise = trowModule.trow({acel, maxValue: startValue, minValue}).then((x)=>{
                    if (x == 'reachedMax') {
                        module.listeners.endMove(startValue == maxValue? 'reachedMax' : 'reachedStart')
                    }
                    else if (x == 'reachedMin') {
                        module.listeners.endMove('reachedMin')
                        startValue = minValue
                    }
                })
            }
        }
        
        moveRef = 0
        startMoveY = 0
    }


    module.moveJump = function () {
        const nowTime = Date.now()

        trowModule.trow({acel: -0.001 * acelTimes, velo: 0.6, time: nowTime, maxValue, minValue: startValue}).then((x)=>{
            if (x == 'reachedMax') {
                module.listeners.endMove('reachedMax')
            }
            else if (x == 'reachedMin') {
                module.listeners.endMove('reachedMin')
            }
        })
        
        moveRef = 0
        startMoveY = 0
    }

    module.goTo = function (to = 'max') {
        if(to != 'max' && to != 'min' && to != 'switch') return

        if(to = 'switch'){
            if(startValue == minValue){
                to = 'max'
            }
            else if(startValue == maxValue){
                to = 'min'
            }
        }

        const nowTime = Date.now()
        const thisMaxValue = to == 'max'? maxValue : startValue
        const thisMinValue = to == 'max'? startValue : minValue
        const deltaValue = to == 'max'? thisMaxValue - thisMinValue : thisMinValue - thisMaxValue
        const acel = (2 * deltaValue) / (200 * 200) //Yeah physics, bitch!
        const velo = 0

        trowModule.trow({acel, velo, time: nowTime, maxValue: thisMaxValue, minValue: thisMinValue}).then((x)=>{
            if(to == 'max') {
                module.listeners.endMove('reachedMax')
                startValue = maxValue
            }
            else {
                module.listeners.endMove('reachedMin')
                startValue = minValue
            }
        })

        
        
        moveRef = 0
        startMoveY = 0
    }

    return module



    ////////Move utils

    


    function getTrow (render) { 
        const module = {}
        let maxValue = undefined
        let minValue = undefined
        let endTrowLoop = undefined
        let trowRuning = false
        let resolvePromise = undefined
        let saveVelo = undefined
        let saveValue = 0
        let saveTime = undefined
    



        module.trow = (time, value, velo, acel, theMaxValue, theMinValue) => {
            if(typeof time == 'object') {
                const obj = time
                value = typeof obj.value === 'number' ?  obj.value : saveValue
                time = typeof obj.time === 'number' ?  obj.time : saveTime
                velo = typeof obj.velo === 'number' ?  obj.velo : saveVelo
                acel = obj.acel
                theMaxValue = obj.maxValue
                theMinValue = obj.minValue

                if(Date.now() - time > 200) {
                    velo = 0
                    time = Date.now()
                }
            }

            maxValue = theMaxValue
            minValue = theMinValue

            trowRuning = true
            endTrowLoop = trow(time, value, velo, acel, callBack)

            module.mesure({clear: true})

            return new Promise(x => resolvePromise = x)
        }

        module.trowRuning = () => trowRuning

        module.stopTrow = () => {
            return endTrow()
        }

        module.mesure = (arg) => {
            if(typeof arg == 'number'){
                const nowValue = arg
                const nowTime = Date.now()
                let nowVelo = undefined
                
                if(saveValue === undefined){
                    nowVelo = 0
                }
                else { 
                    nowVelo = (nowValue - saveValue) / (nowTime - saveTime)
                }

                saveVelo = nowVelo
                saveValue = nowValue
                saveTime = nowTime                    
            }
            else {
                const {clear} = arg
                
                if(clear){
                    saveTime = saveVelo = saveValue = undefined
                }
            }
        }


        
        return module
        

        function endTrow (resolveValue) {
            if(!trowRuning) return
            
            endTrowLoop()
            endTrowLoop = undefined
            trowRuning = false

            const returnValue = saveValue
            saveValue = undefined

            if(resolveValue) resolvePromise(resolveValue)
            resolvePromise = undefined

            return returnValue
        }



        function callBack (value) {
            
            if(value > maxValue){
                value = maxValue 
                endWith('reachedMax')
            }
            else if(value < minValue){
                value = minValue
                endWith('reachedMin')
            }

            saveValue = value
            render(value)

            function endWith (value) {
                requestAnimationFrame(()=>{
                    endTrow(value)
                })
            }
        }

        

        function trow (time, value, velo, acel, callBack) { 
            let endTrow = false
            
            _trow(time, value, velo, acel, callBack)
            
            return ()=> endTrow = true


            function _trow (time, value, velo, acel, callBack) { 
                if(endTrow) return

                const nowTime = Date.now()
                const deltaTime = nowTime - time
                const newValue = value + velo * deltaTime + (acel * deltaTime * deltaTime) / 2

                callBack(newValue)
                requestAnimationFrame(()=>{
                    _trow(time, value, velo, acel, callBack)
                })
                
            }                        
        }
    }
}



//// trow(min, max) min vai ser o start e max vai min ou maz dependendo da direção do trow