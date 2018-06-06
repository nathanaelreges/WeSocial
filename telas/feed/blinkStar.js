_['telas/feed/blinkStar'] = async function blinkStar ({ele, onClass}) {
       
    /*
        ele // must be an element with two suns, first the star svg and last the number
        onClass // the class that indicates that the star has already been liked
        If the star is going to blink, a Promise is returned and will be resolved when the transition ends,
        if not, undefined is returned instead.
    */

    const newEle = _['tools/myLib'].newEle
    const myIcos = _['img/myIcos']

    const oldStarEle = ele.firstElementChild
    const numberEle = ele.lastElementChild
    let promise = undefined





    const alreadyLiked = ele.classList.contains(onClass)
    
    if(alreadyLiked){
    
        ele.classList.remove(onClass)
        const newStar = newEle(myIcos.like)
        oldStarEle.replaceWith(newStar)
    
    }

    else {
        let resolvePromise  = undefined
        promise = new Promise(x => resolvePromise = x)
    
        const newStar = newEle(myIcos.likePurple)
        newStar.classList.add('transition')
        newStar.style.willChange = 'transform'
        newStar.style.transform = 'scale(1.5)'
        
        oldStarEle.replaceWith(newStar)

        await new Promise(requestAnimationFrame)
        const aa = newStar.scrollHeight
        newStar.style.transform = ''

        await new Promise(resolve => newStar.addEventListener('transitionend', resolve, {once: true}))

        newStar.style.willChange = ''
        ele.classList.add(onClass)
        
        resolvePromise()
    }

    const oldNumber = parseInt(numberEle.innerText)
    numberEle.innerText = oldNumber + (alreadyLiked? -1 : 1)

    if(promise !== undefined)
        return promise
    else 
        return undefined
    //
}

