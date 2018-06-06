_['tools/myMove'] = function getMyMove (renderMove, {maxValue}) {
    const module = {}
            
    let startMoveY = 0
    let moveRef = 0
    

    const trowModule = getTrow(maxValue, 0, renderMove)


    module.move = function (value) {
        if(!startMoveY){
            startMoveY = value
            module.listeners.startMove()

            if(trowModule.trowRuning()) {
                moveRef = trowModule.stopTrow()
            }
        } 
        
        let moveValue = value - startMoveY + moveRef
        
        if(moveValue > maxValue){
            moveValue = maxValue
        }
        else if(moveValue < 0){
            moveValue = 0
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
        const acel = -0.001
        
        const moveValue = value - startMoveY + moveRef

        if(moveValue >= maxValue){
            module.listeners.endMove('reachedMax')
        }
        else if(moveValue <= 0){
            module.listeners.endMove('reachedMin')
        }
        else {
            trowModule.trow({acel}).then((x)=>{
                if (x == 'reachedMax') {
                    module.listeners.endMove('reachedMax')
                }
                else if (x == 'reachedMin') {
                    module.listeners.endMove('reachedMin')
                }
            })
        }
        
        moveRef = 0
        startMoveY = 0
    }


    module.moveJump = function () {
        const nowTime = Date.now()

        trowModule.trow({acel: -0.001, velo: 0.6}).then((x)=>{
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

    return module



    ////////Move utils

    


    function getTrow (maxValue, minValue, render) { 
        const module = {}
        let endTrowLoop = undefined
        let trowRuning = false
        let resolvePromise = undefined
        let saveVelo = undefined
        let saveValue = 0
        let saveTime = undefined
    



        module.trow = (time, value, velo, acel) => {
            if(typeof time == 'object') {
                const obj = time
                time = saveTime
                value = saveValue
                velo = obj.velo || saveVelo
                acel = obj.acel

                if(Date.now() - time > 200) {
                    velo = 0
                    time = Date.now()
                }
            }

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
                const newVelo = velo + (nowTime - time) * acel
                let newValue = value + (nowTime - time) * newVelo

                callBack(newValue)
                requestAnimationFrame(()=>{
                    _trow(nowTime, newValue, newVelo, acel, callBack)
                })
                
            }                        
        }
    }
}