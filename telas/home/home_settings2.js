_['telas/home/home_settings'] = function initSettingsHandler (ele) {

    const newEle = _['tools/myLib'].newEle
    const tryCall = _['tools/myLib'].tryCall
    const settingsIco = _['img/myIcos'].settingsBlue
    const myTime = _['tools/myTime']

    let homeEle = undefined
    let myTimeId = undefined
            
    ele.addEventListener('mousedown', touchStart1, {passive: true})
    ele.addEventListener('touchstart', touchStart1, {passive: true})

    
        
        ele.removeEventListener('touchstart', touchStart1)
        ele.removeEventListener('mousedown', touchStart1)
        
        let pointer = undefined
        if(e.constructor.name === 'MouseEvent')
            pointer = 'mouse'
        else 
            pointer = 'touch'
        //




        ele.addEventListener(pointer == 'mouse'? 'mousemove': 'touchmove', touchMove, {passive: true})
        ele.addEventListener(pointer == 'mouse'? 'mouseup': 'touchend', touchEnd1)
        if(pointer == 'mouse'){
            ele.addEventListener('mouseleave', touchEnd1)
        }



        
        function touchMove(e) { 
           
        }
        
        function touchEnd1 (e) {
            ele.removeEventListener(pointer == 'mouse'? 'mouseup': 'touchend', touchEnd1)
            if(pointer == 'mouse'){
                ele.removeEventListener('mouseleave', touchEnd1)
            }
            
        }

        function touchStart2 (e) {
            firstValue = (pointer == 'mouse'? e.clientY: e.touches[0].clientY) + paneHeight
            
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
            

        }


        
       
}