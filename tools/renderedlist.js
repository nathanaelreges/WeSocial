/*
renderedList
    (array, opts) 
        pass array of DOM elements
        opts.reverse
            reverse the direction
        opts.optimizeReturn
            default true
            reduce the number of elements to only the visible ones when removed
    //


    setPushUpdate(fun) 
        Activate pushUpdate, pass fun to request new items
            fun needs to return a promise to be resolved with the new Items in a array
        //   
    //
    
    setCloserToTheEdge(fun||'disable') 
        Activate closerToTheEdge
            pass fun to request lower items
                fun needs to return a promise to be resolved with the lower Items in a array
            pass 'disable' to deactivate
        //   
    //

    addpostsUnder(array)
        array of DOM Elements 
    addpostsAbove(array)
        array of DOM Elements


    reRender({addedItem, removedItem})
        desenvolved for the alert Tela
        if you changed the array you call this function to update it
            you need to tell if you had added or removed something


    obs: 
        Use only marginTop in the elements of the array, dont use marginBottom
        All elements must gave the same margin
*/




_['tools/renderedList'] = function initRenderedList (arrayOfItems, {reverse, optimizeReturn = true} = {}) {
    


    const newTela = _['tools/myTelas'].new
    const responseFrame = _['tools/myFrame'].response
    const nextFrame = _['tools/myFrame'].next
    const lastFrame = _['tools/myFrame'].last

    const amountOfItems = reverse? 15: 11,//always odd numbers
        maxGoDownOrUpBy = (amountOfItems-1)/2,
        dontReverse = !reverse
    


    let middleItemBottomY = 0, 
    middleItemTopY = 0, 
    container0EleHeight = reverse? 3000 : 6000, 
    goingDown = true, 
    transformTop = 0, 
    transformBot = 0, 
    indexOfHighestItem = reverse? amountOfItems-1 :arrayOfItems.length -1,    
    indexOfMiddleItem =  indexOfHighestItem - (amountOfItems-1)/2,
    indexOfLowestItem =  indexOfHighestItem - (amountOfItems-1),
    itemMargin = 0,
    scrollerEleHeight = 0,
    telaIsIn = false,
    telaIsInPromise = undefined,
    fewItems = false


    if(arrayOfItems.length < amountOfItems) {
        reverse = false
        optimizeReturn = false
        fewItems = true
    }

    if(reverse){
        arrayOfItems.reverse()
    }

    ////////////////////////Criando a estrutura de elementos
        let container0Ele = document.createElement('div')
        container0Ele.className = 'render_container0'
        container0Ele.style = "will-change: transform; margin-bottom: 10px; width: 100%"
        container0Ele.style.height = container0EleHeight + 'px'
        
        let container1Ele = document.createElement('div')
        container1Ele.className = 'render_container1'
        container1Ele.style = "will-change: transform; height: 0; overflow: visible; width: 100%"

        let container2Ele = document.createElement('div')
        container2Ele.className = 'render_container2'
        container2Ele.style = "will-change: transform; position: fixed; padding: 0px; width: 100%" //padding to fix children margin

        let scrollerEle = document.createElement('div')
        scrollerEle.className = "scroller"

        if(fewItems){
            container0Ele.style.height = ''
            
            container1Ele.style.height = ''
            container2Ele.style.position = ''
            container2Ele.style.paddingTop = '0.1px'
        }

        if(reverse){
            container2Ele.style.bottom = 0
            container1Ele.style.transform = `translateY(${container0EleHeight}px)`
            transformBot = container0EleHeight 
            goingDown = false
        }

        container1Ele.appendChild(container2Ele)
        container0Ele.appendChild(container1Ele)
        scrollerEle.appendChild(container0Ele)
        
        //Appending the first 10 itens to the container
        for(let i = indexOfHighestItem; i >= indexOfLowestItem; i--){
            if(arrayOfItems[i] !== undefined) {
                container2Ele.append(arrayOfItems[i])
            }
        }


        


        let scrollerTela = newTela(scrollerEle)

        scrollerTela.addListeners(getTelaListeners())


        function getTelaListeners () {
            let resolveTelaIsInPromise = undefined
            let firstIn = true
            var listeners = {}
            let windowWasResized = false


            listeners.inForLoading = ()=>{
                if(fewItems) return
                let response = resize.inn()
                windowWasResized = response.windowWasResized
            }

            listeners.in = ()=>{
                telaIsIn = true

                if(firstIn){
                    firstIn = false
                    mesure()
                }
                else {
                    resolveTelaIsInPromise()
                    
                    if(windowWasResized) {
                        reducer.reset()
                    }
                    
                    if(optimizeReturn & !windowWasResized) {
                        reducer.inn()
                    }
                }

                scrollerEle.addEventListener('scroll', checkScroll, {passive: true})
            }
            
            listeners.out = ()=>{
                if(!fewItems) {
                    resize.out()
                }
                
                
                telaIsIn = false
                telaIsInPromise = new Promise(x=>{resolveTelaIsInPromise=x})

                scrollerEle.removeEventListener('scroll', checkScroll)
            }

            if(optimizeReturn){
                listeners.outForReading = ()=>{
                    reducer.out()
                }
            }

            return listeners
        }
    ////////////////////////Criando a estrutura de elementos




    

/////////////////////Logica para renderizar enquanto o usuario scrolla  


    if(reverse) scrollerTela._scroll.scrlVal = container0EleHeight

    //Mesure at the begining to save some variables, start scroll listener...
    let mesure = function myRenderedList_mesure () {

        if(fewItems) {
            pushUpdate.gotToTheTop()
            return    
        }
            
        scrollerEleHeight = scrollerEle.offsetHeight
        const middleItem = arrayOfItems[indexOfMiddleItem]
        
        itemMargin = parseInt(window.getComputedStyle(middleItem).marginTop)

        middleItemTopY = transformBot + container2Ele.offsetTop + middleItem.offsetTop - scrollerEleHeight/2
        middleItemBottomY = middleItemTopY + middleItem.offsetHeight + itemMargin


        pushUpdate.gotToTheTop()
    }


    //Check scroll to see if it needs rendering
    let checkScroll = function myRenderedList_checkScroll () { 

        const scrollY = scrollerEle.scrollTop
        let again = false,
            goDownBy = 0,
            goUpBy = 0
        //

        while(scrollY > middleItemBottomY){
            if(indexOfLowestItem - goDownBy <= 0){ 
                ///////////////external
                    if(dontReverse){
                        edgeLimit.gotToTheEdge()
                    }
                ///////////////external
                break;
            }

            let _newMiddleItemHeight = arrayOfItems[indexOfMiddleItem - goDownBy - 1].offsetHeight + itemMargin
            middleItemTopY = middleItemBottomY
            middleItemBottomY += _newMiddleItemHeight
            
            goDownBy++
            
            if(goDownBy >= maxGoDownOrUpBy) {
                again = true //Para gerar outra passagem por check scroll e tentar renderizar mais
                break;
            }
        }

        while(scrollY < middleItemTopY){
            if(indexOfHighestItem + goUpBy >= arrayOfItems.length -1) {
                ///////////////external
                    if(reverse){
                        edgeLimit.gotToTheEdge()
                    }
                    else{
                        pushUpdate.gotToTheTop()
                    }
                ///////////////external
                break;
            }

            let _newMiddleItemHeight = arrayOfItems[indexOfMiddleItem + goUpBy + 1].offsetHeight + itemMargin
            middleItemBottomY = middleItemTopY
            middleItemTopY -= _newMiddleItemHeight
            
            goUpBy++
            
            if(goUpBy >= maxGoDownOrUpBy){
                again = true //Para gerar outra passagem por check scroll e tentar renderizar mais
                break;
            }
        } 

        if(goDownBy){
            let docFrag = document.createDocumentFragment()
            
            let _lastItemToBeRemoved = arrayOfItems[indexOfHighestItem - goDownBy + 1]
            
            if(!goingDown){
                goingDown = true
                transformTop = transformBot + container2Ele.offsetTop + _lastItemToBeRemoved.offsetTop + _lastItemToBeRemoved.offsetHeight
                container1Ele.style.transform = ''  
                container2Ele.style.bottom = 'unset';
            }
            else{
                transformTop = transformTop + _lastItemToBeRemoved.offsetTop + _lastItemToBeRemoved.offsetHeight 
            }
            

            for(let index = 1; index <= goDownBy; index++){
                docFrag.appendChild(arrayOfItems[indexOfLowestItem - index]) 
                arrayOfItems[indexOfHighestItem - index + 1].remove()
            }

            container2Ele.appendChild(docFrag)
            container2Ele.style.transform = `translateY(${transformTop}px)`

            indexOfHighestItem -= goDownBy
            indexOfLowestItem -= goDownBy
            indexOfMiddleItem -= goDownBy
            
            //Paints the middle item in red
            ///{arrayOfItems[indexOfMiddleItem + 1].style.background = '';arrayOfItems[indexOfMiddleItem].style.background = 'red'}


            goDownBy = 0

            ///////////////external
                if(dontReverse){
                    ///////////////closerToTheEdge
                    if(indexOfLowestItem < closerToTheEdge.limit){
                        closerToTheEdge()
                    }
                    ///////////////edgeLimit
                    if(scrollY > edgeLimit.val){
                        edgeLimit.expandBot()
                    }
                }
            ///////////////external
            
        }

        if(goUpBy){
            let docFrag = document.createDocumentFragment()
            
            let _lastItemToBeRemoved = arrayOfItems[indexOfLowestItem + goUpBy - 1]
            
            if(goingDown){
                goingDown = false
                transformBot = transformTop + _lastItemToBeRemoved.offsetTop - itemMargin
                container2Ele.style.transform = ''
                container2Ele.style.bottom = '0';
            }
            else{
                transformBot = transformBot + container2Ele.offsetTop + _lastItemToBeRemoved.offsetTop - itemMargin
            }            

            for(let index = 1; index <= goUpBy; index++){
                docFrag.prepend(arrayOfItems[indexOfHighestItem + index])
                arrayOfItems[indexOfLowestItem + index - 1].remove()
            }

            container2Ele.prepend(docFrag)
            container1Ele.style.transform = `translateY(${transformBot}px)`

            indexOfHighestItem += goUpBy
            indexOfLowestItem += goUpBy
            indexOfMiddleItem += goUpBy

    
            //Paints the middle item in red
            ///{arrayOfItems[indexOfMiddleItem - 1].style.background = ''; arrayOfItems[indexOfMiddleItem].style.background = 'red'}
            

            goUpBy = 0

            ///////////////external
                if(reverse){
                    ///////////////closerToTheEdge
                    if(indexOfHighestItem > closerToTheEdge.limit){
                        closerToTheEdge()
                    }
                    ///////////////edgeLimit
                    if(scrollY < edgeLimit.val){
                        edgeLimit.expandTop()
                    }
                }
            ///////////////external
        }

        if(again){
            checkScroll()
        }


    }
/////////////////////Logica para renderizar enquanto o usuario scrolla  

   
    ///////////////// resize
    const resize = (function () {
        const module = {}
        let saveWindowWidth = undefined
        let reseting = false
        let scheduleReset = false
        let scheduleWidth = undefined
        let firstIn = true

        module.inn = () =>{
            const response = {windowWasResized: false}
            
            if(firstIn) {
                firstIn = false
                saveWindowWidth = window.innerWidth
            }
            else {
                const widthChanged = checkWidthChanged()
                if(widthChanged) {
                    reset({direct: true, alreadyCheked: true})
                    response.windowWasResized = true
                }
                
            }
            
            window.addEventListener('resize', reset)

            return response
        }
        
        
        module.out = () =>{
            window.removeEventListener('resize', reset)
        }

        
        
        return module



        function checkWidthChanged () {
            const currentWindowWidth = window.innerWidth
            if(currentWindowWidth === saveWindowWidth) 
                return false
            //
            saveWindowWidth = currentWindowWidth
            return true
        }

        
        async function reset (opts = {}) {
            if(reseting) {
                scheduleReset = true
                return
            }

            if(!opts.alreadyCheked){
                const widthChanged = checkWidthChanged()
                if(!widthChanged)
                    return
                //
            }
            

            reseting = true

            container2Ele.innerHTML = "" 
            
            if(!opts.direct){
                await getAnimationPromise()
                await getAnimationPromise()
            }
                

            if(reverse){
                transformTop = 0
                transformBot = container0EleHeight
                container1Ele.style.transform = `translateY(${transformBot}px)`
                container2Ele.style.transform = ``
                    
                if(goingDown){
                    container2Ele.style.bottom = 0;
                    goingDown = false
                }
            }
            else {
                transformTop = 0
                transformBot = 0
                container1Ele.style.transform = ''
                container2Ele.style.transform = ''
                    
                if(!goingDown){
                    container2Ele.style.bottom = 'unset';
                    goingDown = true
                }    
            }
            
        
    
            indexOfHighestItem = reverse? amountOfItems-1 :arrayOfItems.length -1
            indexOfMiddleItem =  indexOfHighestItem - (amountOfItems-1)/2
            indexOfLowestItem =  indexOfHighestItem - (amountOfItems-1)
            
            for(let i = indexOfHighestItem; i >= indexOfLowestItem; i--){
                if(arrayOfItems[i] !== undefined) {
                    container2Ele.append(arrayOfItems[i])
                }
            }
    
        
            await getAnimationPromise()
            
            if(opts.direct){
                await getAnimationPromise()
            }
            
            scrollerEleHeight = scrollerEle.offsetHeight
            const middleItem = arrayOfItems[indexOfMiddleItem]
            
            middleItemTopY = transformBot + container2Ele.offsetTop + middleItem.offsetTop - scrollerEleHeight/2
            middleItemBottomY = middleItemTopY + middleItem.offsetHeight + itemMargin

            edgeLimit.unlock()
            

            checkScroll()

            if(scheduleReset){
                await getAnimationPromise()
                
                reseting = false               
                scheduleReset = false

                reset()
            }
            else {
                reseting = false
            }

            

            function getAnimationPromise () {
                return new Promise(requestAnimationFrame)
            }
            
        }
    })()

    

    
    ///////////////// resize

    
    
    
    ///////////////// edgeLimit
    const edgeLimit = (function () {
        
        let edgeLimitLocked = false;
        const edgeLimitStep = 2000;
        const edgeLimitDistance = 1500;
        let val = reverse? edgeLimitDistance : container0EleHeight - edgeLimitDistance - scrollerEleHeight

        
        function expandTop (height, {dontScroll} = {}) { 
            if(reverse) height = edgeLimitStep
            else obj.val += height

            addToContainer0Height(height)
            moveContainer2(height)
            if(!dontScroll){
                scrollerEle.scrollTop += height
            }
            else {
                scrollerEle.scrollTop = 0
                checkScroll()
            }
        }

        function expandBot (height) {//throw 'expandBot'
            if(dontReverse) {
                height = edgeLimitStep
                obj.val += height
            }

            addToContainer0Height(height)
            restoreScrollBar()
        }


        function gotToTheEdge (){
            if(!edgeLimitLocked) {
                edgeLimitLocked = true
                requestAnimationFrame(() => {requestAnimationFrame(
                    reverse? () => {
                        const space = transformBot + container2Ele.offsetTop
                        obj.val = 0
                        addToContainer0Height(-space)
                        moveContainer2(-space)
                        scrollerEle.scrollTop += -space
                    }
                    :() => {
                        const newHeight = 
                            transformTop + arrayOfItems[0].offsetTop + arrayOfItems[0].offsetHeight
                        obj.val = newHeight
                        addToContainer0Height(newHeight - container0EleHeight)
                        restoreScrollBar()
                    }
                )}) 
            }
        }

        function unlock (){
            if(!edgeLimitLocked) return
            edgeLimitLocked = false

            const scrollY = scrollerEle.scrollTop

            if(reverse) {
                obj.val = edgeLimitStep

                if(scrollY < edgeLimit.val){
                    edgeLimit.expandTop()
                }
            }
            else{
                obj.val -= edgeLimitStep

                if(scrollY > edgeLimit.val){
                    edgeLimit.expandBot()
                }
            } 
        }
        
    
        let obj =  {val, expandTop, expandBot, gotToTheEdge, unlock}

        return obj
    })()
    ///////////////// edgeLimit

    
    
    
    
    
    ///////////////// addPosts
    const addPosts = (function () {
        if(fewItems){
            return {
                above (arrayOfNewPosts) {
                    arrayOfNewPosts.forEach((x)=>{
                        container2Ele.prepend(x)
                        arrayOfItems.push(x)
                    }) 
                },
                
                under (arrayOfNewPosts) {
                    const array = arrayOfNewPosts.slice().reverse()
                    array.forEach((x)=>{
                        container2Ele.append(x)
                        arrayOfItems.unshift(x)
                    }) 
                }
            }
        }
        
        function calculate (arrayOfNewPosts) {
            let wrapper = document.createElement('div')
            wrapper.style.width = "100%"
            wrapper.style.visibility = "hidden"
            wrapper.style.position = "fixed"
    
            for(let i = 0; i < arrayOfNewPosts.length; i++){
                wrapper.append(arrayOfNewPosts[i]) 
            }   
    
            container0Ele.appendChild(wrapper)
            const height = wrapper.offsetHeight
        
            wrapper.remove()
        
            return height
        }

        
        if(reverse){
            function addPostsAbove (arrayOfNewPosts) {
                
                for(let i = arrayOfNewPosts.length - 1; i >= 0; i--){
                    arrayOfItems.push(arrayOfNewPosts[i])
                }
                
                edgeLimit.unlock()

            }
    
            function addPostsUnder (arrayOfNewPosts) {
                const scrollY = scrollerEle.scrollTop
                
                const length = arrayOfNewPosts.length
                indexOfHighestItem += length
                indexOfLowestItem += length
                indexOfMiddleItem += length
                
               
                const height = calculate(arrayOfNewPosts)

                for(let i = length - 1; i >= 0; i--){
                    arrayOfItems.unshift(arrayOfNewPosts[i])
                }                 
                

                
                if(scrollY >= container0EleHeight - scrollerEleHeight){
                    requestAnimationFrame(()=>{
                        addToContainer0Height(height)
                        scrollerEle.scrollTop = scrollY + height + 1000
                        checkScroll()
                    })
                    
                }
                else{
                    edgeLimit.expandBot(height)
                }   
            }
        }

        else{
            function addPostsAbove (arrayOfNewPosts, {scrollToTop} = {}) {

                const height = calculate(arrayOfNewPosts)
                for(let i = 0; i < arrayOfNewPosts.length; i++){
                    arrayOfItems.push(arrayOfNewPosts[i])
                } 
                requestAnimationFrame(()=>{
                    edgeLimit.expandTop(height, {dontScroll: scrollToTop})
                })
            }
    
            function addPostsUnder (arrayOfNewPosts) {
                const length = arrayOfNewPosts.length
                indexOfHighestItem += length
                indexOfLowestItem += length
                indexOfMiddleItem += length
                
                for(let i = length - 1; i >= 0; i--){
                    arrayOfItems.unshift(arrayOfNewPosts[i])
                }           
                edgeLimit.unlock()

            }
        }
    
        return {above: addPostsAbove, under: addPostsUnder}
    })()
    ///////////////// addPosts
    
    


    
    
    ///////////////// closerToTheEdge
    const disabledCloserToTheEdge = {limit: reverse? arrayOfItems.length + 1000: 0}
    let closerToTheEdge = disabledCloserToTheEdge
        
    const createCloserToTheEdge = function (requestLowerItems) {

        //////Elemento de feedBack
        let ele = document.createElement('div')
        ele.style = "will-change: transform; text-align: center; width: 100%; font-weight: 300; letter-spacing: 1.2px; font-size: 1.1rem;"
        if(reverse){
            ele.style.marginTop = '12px'
        }
        else{
            ele.style.marginBottom = '12px'
        }
        ele.innerText = "Carregando..."
        
        
    
        async function closerToTheEdge () {
            closerToTheEdge.limit =  disabledCloserToTheEdge.limit

            if(reverse){
                restoreScrollBar()
                scrollerEle.prepend(ele)
            }
            else{
                restoreScrollBar()
                scrollerEle.append(ele)
            }

    
            const lowerItems = await requestLowerItems()

            if(!telaIsIn) {
                await telaIsInPromise
                await new Promise(resolve => setTimeout(resolve, 300))
            }

            if(reverse){
                addPosts.above(lowerItems)
                closerToTheEdge.limit  = arrayOfItems.length -1 -5
            }
            else{
                addPosts.under(lowerItems)
                closerToTheEdge.limit = 5                        
            }
            

            requestAnimationFrame(()=>{
                ele.remove()
                restoreScrollBar()
            })

        }
    
    
        closerToTheEdge.limit = reverse? arrayOfItems.length -1 -5 : 5

        return closerToTheEdge
    }
    ///////////////// closerToTheEdge
    
    
    
    
    
    /////////////// pushUpdate
    let pushUpdate = {gotToTheTop: function () {}}

    const createPushUpdate = function (requestUpdate) {
    
        const limit = 50
        let pushUpdateIsOn = false
        let startY = 0
        let firstMove = true
        let touching = false
        let mov = 0
        let updating = false
        let transitioning = false
        let textIsSolte = false
        const eleHeight = 28
    
        //////Elemento de feedBack
        let ele = document.createElement('div')
        ele.style = `willChange: transform; text-align: center; height: ${eleHeight};
            width: 100%; padding-top: 7px; position: fixed; top:0; font-weight: 300; letter-spacing: 1.2px; font-size: 1.1rem;`
        ele.style.transform = `translateY(-${eleHeight}px)`
    
        const touchStart = function (e) {
            if(updating || transitioning) return
            touching = true
            firstMove = true
    
            startY = e.touches[0].clientY
            mov = 0
        }
    
    
        const touchMove = function (e) {
            if(!touching) return
    
            if(firstMove) {
                if(e.touches[0].clientY < startY) return 
                firstMove = false
                ele.innerText = "puxe"
                textIsSolte = false
                container0Ele.append(ele)
            }
    
            mov = (e.touches[0].clientY - startY) / 3
            
            if(mov<0) mov = 0
    
            container0Ele.style.transform = `translateY(${mov}px)`
            
            if(mov > limit && !textIsSolte){
                textIsSolte = true
                ele.innerText = 'solte'
            }
    
            if(mov <= limit && textIsSolte) {
                textIsSolte = false
                ele.innerText = 'puxe'
            }
        }
    
    
        const touchEnd = async function () {
            if(!touching || firstMove) return
            touching = false
            transitioning = true
            

            const transitionendPromise = new Promise(resolve => {
                container0Ele.addEventListener('transitionend', resolve, {once: true})
            })

            let requestUpdatePromise 
            
            const wantsToUpdate = mov > limit
    



            container0Ele.style.transition = "0.5s transform"
        
            if(wantsToUpdate){

                requestUpdatePromise = requestUpdate()

                container0Ele.style.transform = `translateY(${eleHeight}px)`
                ele.innerText = 'Atualizando'
                textIsSolte = false
                updating = true

            }
            else{

                container0Ele.style.transform = ""

            }

            restoreScrollBar()
            


            //////////////////
            await transitionendPromise
            

            transitioning = false

            container0Ele.style.transition = ""
            
            if(!wantsToUpdate){
                ele.remove()
                container0Ele.style.transform = ""
                return
            }
    
         

            ///////// updating
            const response = await requestUpdatePromise

            if(!telaIsIn) {
                await telaIsInPromise
                await new Promise(resolve => setTimeout(resolve, 300))
            }


            if(response){
                updating = false
                addPosts.above(response)
                ele.remove()
                container0Ele.style.transform = ""    
                strongScroll(-eleHeight)    
            
            }
            else {
                ele.innerText = "Atualizado"
                setTimeout(() => {

                    updating = false
                    if(scrollerEle.scrollTop == 0){
                        restoreScrollBar()
                    }
                    else{
                        strongScroll(-eleHeight)
                    }
                    ele.remove()
                    container0Ele.style.transform = ""

                }, 500)
            }
            ///////// updating
        }
    
        const scrolled = function () {
            if(scrollerEle.scrollTop != 0) stopPushUpdate()
        }
    
    
        const startPushUpdate = function () {
            scrollerEle.addEventListener('touchstart', touchStart, {passive: true})
            scrollerEle.addEventListener('touchmove', touchMove, {passive: true})    
            scrollerEle.addEventListener('touchend', touchEnd, {passive: true})
            scrollerEle.addEventListener('scroll', scrolled, {passive: true})
            pushUpdateIsOn = true
        }
        
        const stopPushUpdate = function () {
            scrollerEle.removeEventListener('touchstart', touchStart)
            scrollerEle.removeEventListener('touchmove', touchMove)    
            scrollerEle.removeEventListener('touchend', touchEnd)
            scrollerEle.removeEventListener('scroll', scrolled)
            pushUpdateIsOn = false
            touching = false
        }
    
        let gotToTheTop = function () {
    
            if(!pushUpdateIsOn){
                if(scrollerEle.scrollTop == 0) startPushUpdate()
            }
    
        }
    
        return {gotToTheTop}
    }
    /////////////// pushUpdate
    

    
    
    /////////////// reducer
    const createReducer = function () {
        const module = {

        }

        module.out = function renderList_reducer_out () {
            
            var container2Rect = container2Ele.getBoundingClientRect()
            var minTop = -container2Rect.top + scrollerEle.getBoundingClientRect().top
            var maxBot = minTop + scrollerEle.offsetHeight
            
            var ele1Index = indexOfHighestItem
            while(arrayOfItems[ele1Index - 1].offsetTop - itemMargin <= minTop){
                ele1Index--
            } 
            
            var ele2Index = indexOfLowestItem
            while(arrayOfItems[ele2Index].offsetTop - itemMargin >  maxBot){
                ele2Index++
            } 
            

            
            var ele1 = arrayOfItems[ele1Index]
            var ele2 = arrayOfItems[ele2Index]
            var newTransform = goingDown? 
                transformTop + ele1.offsetTop - itemMargin
                :transformBot - container2Rect.height + ele2.offsetTop + ele2.offsetHeight
            //     
            
            lastFrame(function renderedList_reducer_shirink() {
                //////////WRITING
                if(goingDown){
                    container2Ele.style.transform = `translateY(${newTransform}px)`
                }
                else{
                    container1Ele.style.transform = `translateY(${newTransform}px)`
                }


                var docFrag1 = document.createDocumentFragment()
                var index = indexOfHighestItem
                while(index > ele1Index){
                    docFrag1.append(arrayOfItems[index])
                    index--
                }

                var docFrag2 = document.createDocumentFragment()
                index = ele2Index - 1 
                while(index >= indexOfLowestItem){
                    docFrag2.append(arrayOfItems[index])
                    index--
                }


                //Show the number of items on the container
                ////console.log(container2Ele.children.length)
                

            //After first out we get this function to append those elements again when needed    
                module.inn = function renderedList_reducer_in () {
                    if(goingDown){
                        container2Ele.style.transform = `translateY(${transformTop}px)`
                    }
                    else{
                        container1Ele.style.transform = `translateY(${transformBot}px)`
                    }
                    container2Ele.prepend(docFrag1)
                    container2Ele.append(docFrag2)                    
                    
                    scrollerEle.addEventListener('scroll', checkScroll, {passive: true})

                    module.inn = function () {}
                    
                    //Show the number of items on the container
                    ////console.log(container2Ele.children.length)
                }
            })

            module.reset = ()=>{
                module.inn = function () {}   
            }

            
        
        }
        
        return module
    }


    var reducer = optimizeReturn? createReducer() : undefined
    /////////////// reducer

    



    /////////////////Helpers

        ///////////////// strongScroll
            //put the scroll update inside a requestAnimationFrame
            const strongScroll = (function () { 
                let value = 0
                let requested = false
            
                function strongScroll (val) {
                    if(requested){
                        value += val
                        return
                    }
            
                    value = val
                    
                    requestAnimationFrame(function strongScroll (){
                        requested = false
                        
                        scrollerEle.scrollTop += value
                    }) 
            
                    requested = true
                }
            
                return strongScroll
            
            })()
        ///////////////// strongScroll
            
            
        
        ///////////////addToContainer0Height
            const addToContainer0Height = function (val) {
                container0EleHeight += val
                container0Ele.style.height = container0EleHeight + 'px'

            }
        ///////////////addToContainer0Height
        


        ///////////////addToContainer0Height
            const moveContainer2 = function (val) {                
                middleItemBottomY += val
                middleItemTopY += val

                if(goingDown){    
                    transformTop += val
                    container2Ele.style.transform = `translateY(${transformTop}px)`
                }
                else{
                    transformBot += val
                    container1Ele.style.transform = `translateY(${transformBot}px)`
                }
            }
        ///////////////addToContainer0Height
        

        
        //////////////// restoreScrollBar
            const restoreScrollBar = (function () {
                let requested = false
            
                function restoreScrollBar () {
                    if(requested){
                        return
                    }
            
                    requestAnimationFrame(function restoreScrollBar () {
                        scrollerEle.scrollTop++
                        scrollerEle.scrollTop--
                        requested = false
                    })
                    requested = true
                }
            
                return restoreScrollBar
            })()
        //////////////// restoreScrollBar

    /////////////////Helpers



    


    
    //////////////////Module
        let module = {}
        

        module.setPushUpdate = function (requestUpdate) {
            if(reverse) return

            pushUpdate = createPushUpdate(requestUpdate)
        }

        module.setCloserToTheEdge = function (requestLowerItems) {
            if(requestLowerItems === 'disable'){
                closerToTheEdge = disabledCloserToTheEdge
                return
            }

            closerToTheEdge = createCloserToTheEdge(requestLowerItems)
        }

        module.addPostsAbove = addPosts.above
        module.addPostsUnder = addPosts.under
        module.tela = scrollerTela
    //////////////////Module


    return module
}






/*
16/03/18
before:
    when addpost under was called at the end of its routine it called edgeLimt.expandTop to create space for 
    the new content. But if it was called to frequently too much space is created because the scroller was 
    expandend al times but user never got to the bottom.

solution:
    now when the edgeLimit is unloked it tests for the need to expand, only if the scrollTop passed the 
    edgeLimit.val. when addPosts runs it calls endgeLimt.unlock and the scroller is expanded automaticly

*/ 