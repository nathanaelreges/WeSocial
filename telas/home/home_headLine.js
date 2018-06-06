_['telas/home/home_headLine'] = function initHeadLineHandler (tabsEle, fTab) {

    const responseFrame = _['tools/myFrame'].response
    const nextFrame = _['tools/myFrame'].next
    
    var numberOfTabs = 4
    var sizeOfButton = 65
    var tabsChildren = tabsEle.children
    var headlineEle = tabsChildren[numberOfTabs]; 
    var lastNum = 1
    if(!fTab) fTab = 0


    //////////Caculate position
    var windowWidth = 0
    var posArr = []
    var calculatePos = function sendHeadLineTo_calculatePos () {
        posArr = []
        windowWidth = window.innerWidth
        const entireWidth = tabsEle.offsetWidth
        var xSpaceBetween = (entireWidth - numberOfTabs * sizeOfButton) / (numberOfTabs * 2)
        var xPasso = sizeOfButton + xSpaceBetween * 2 
        var xPosition = xSpaceBetween
        posArr.push(xPosition)
        
        while(posArr.length < numberOfTabs){
            posArr.push(xPosition += xPasso)
        }
    }
    calculatePos()


    tabsChildren[fTab].style.borderTop = "2px solid white"
    headlineEle.style.transform = `translateX(${posArr[fTab]}px)`
    lastNum = fTab


    return function home_sendHeadLineTo (num) {
        
        if(lastNum == num) return
        
        if(windowWidth != window.innerWidth){
            calculatePos()
            headlineEle.style.transform = `translateX(${posArr[lastNum]}px)`
        }
        
        tabsChildren[lastNum].style.borderTop = ""
        lastNum = num
        headlineEle.style.display = 'block'
        
        responseFrame( function sendHeadLineTo_animate () {
            headlineEle.style.transform = `translateX(${posArr[num]}px)` 
        }, 'write')
        
        tabsEle.addEventListener('transitionend', function sendHeadLineTo_transitionend () {
            nextFrame( function sendHeadLineTo_animate () {
                headlineEle.style.display = ''
                tabsChildren[num].style.borderTop = "2px solid white"
            }, 'write')
        }, {once: true})
    }
}