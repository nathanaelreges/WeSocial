_['tools/myTime'] = (function init_myTime () {
    const module = {}
    let __timeLine = []
    let alreadyPushedState = false
    let ignorePopState = false
    let freeId = 0
    let block = false

    if(history.state !== null && history.state.myApp === true) {
        alreadyPushedState = true
    }

    
    window.addEventListener('popstate', function myTime_popstate (e) {
        if(ignorePopState) {
            ignorePopState = false
            return
        }

        if(__timeLine.length > 0){
            goBack()
            history.forward()
            ignorePopState = true
        }
        else{
            history.back()
        }
    })




    

    module.addFun = function myTimeAddFun (fun) {  
        if(!alreadyPushedState){
            history.pushState({myApp: true}, '')
        }

        const id = freeId++

        __timeLine.push({fun, id})
        return id
    }

    module.goBack = () =>{
        goBack()
    }

    module.remove = (id) => {
        const index = __timeLine.findIndex(x => x.id===id)
        if (index === -1) {return}
        __timeLine.splice(index, 1)
    }
    
    module.block = (state) => {
        block = state
    }

    return module




    function goBack () { 
        if(__timeLine.length && !block){
            __timeLine.pop().fun()
        }
    }

})()