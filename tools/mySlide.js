_['tools/mySlide'] = (function init_mySlide () {
    
    const responseFrame = _['tools/myFrame'].response
    const nextFrame = _['tools/myFrame'].next
    const lastFrame = _['tools/myFrame'].next
    const myTime = _['tools/myTime']

    let widthValue = undefined
    let heightValue = undefined

    let mySlide = function mySlide (nextEle, lastEle,  dir, opts) {
        blockScroll(true)
        if(dir == 'left' || dir == 'right') {
            if (widthValue === undefined){
                widthValue = lastEle.offsetWidth
            }
            var width = widthValue
        }
        else {
            if (heightValue === undefined){
                heightValue = lastEle.offsetHeight
            }
            var height = heightValue
        }
        
        var n1, n2, l1, l2
        switch(dir){
            case 'left':
                n1 = `transform: translateX(${width/3}px); opacity: 0;`
                l1 = ""
                n2 = ""
                l2 = ""//`transform: translateX(-${width}px)`
            break;
            case 'right':
                n1 = `transform: translateX(-${width/3}px); opacity: 0;`
                l1 = ""
                n2 = ""
                l2 = ""//`transform: translateX(${width}px)`
            break;
            case 'downin':
                n1 = `transform: translateY(-${height/3}px); opacity: 0;`
                l1 = ""
                n2 = ""
                l2 = ""
            break;
            case 'upout':
                n1 = ""
                l1 = ""
                n2 = ""
                l2 = `transform: translateY(-${height/3}px); opacity: 0;`
            break;
        }

        //nextEle.classList.add('transition')
        //lastEle.classList.add('transition')
        if(dir == 'upout'){
            lastEle.classList.add('transition_opacity')
            //lastEle.style = l1
        }
        else {
            nextEle.classList.add('transition_opacity')
            nextEle.style = n1
        }
        
        //console.log(dir, l2, lastEle)
        var positionToInsertTheNextEle = dir == 'upout'? 'beforebegin' : 'afterend'
        lastEle.insertAdjacentElement(positionToInsertTheNextEle, nextEle)
        
        
        responseFrame(function mySlide_animateee () {
            const aa = nextEle.scrollHeight
            if(dir == 'upout'){
                lastEle.style = l2
            }
            else {
                nextEle.style = n2
            }
        }, 'write')

            
        var transitionedElement = dir == 'upout'? lastEle : nextEle

        transitionedElement.addEventListener('transitionend', mySlide_transitionend)
        
        function mySlide_transitionend (e) {
            if(e.target !== e.currentTarget) return
    
            if(opts.callBack){
                opts.callBack()
                nextFrame(mySlide_finish)
            }
            else {
                mySlide_finish() 
            }
    
            function mySlide_finish () {            
                lastEle.remove() 
                if(dir == 'upout'){
                    lastEle.style = ""
                }
                else {
                    nextEle.style = ""
                }
    
                lastFrame(blockScroll.bind(undefined, false))
            }
    
            transitionedElement.removeEventListener('transitionend', mySlide_transitionend)
        }
    }

    return mySlide





    


    function blockScroll (state) {
        if(blockScroll.inited === undefined) {
            blockScroll.counter = 0
            blockScroll.inited = true
        }

        if(state) {
            blockScroll.counter++
        }
        else {
            blockScroll.counter--
        }

        if(blockScroll.counter === 0 && state === false) {
            blockScroll.div.remove()
            blockScroll.div = undefined
            myTime.block(state)
        }
        else 
        if(blockScroll.counter === 1 && state === true) {
            var div = document.createElement('div') 
            div.className = "blockScroll"
            blockScroll.div = div
            document.body.append(blockScroll.div)
            myTime.block(state)
        }
        
    
    }
 
})()