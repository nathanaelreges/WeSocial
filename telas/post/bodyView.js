


/*
    module(data)
        //data {
            name: '',
            time: '',
            content: '',
            imgSrc: path,
            like: 123,
            liked:  bit,
            comment: 123,
        }
        
    module.listeners.

        onClosedPost()

        onTapLike(state)
        
    //

    module.

        remove()

    //


*/

_['telas/post/bodyView'] = function createbodyView (data) {  

    const newTela = _['tools/myTelas'].new
    const newEle = _['tools/myLib'].newEle
    const getMyMove = _['tools/myMove']
    const blinkStar = _['telas/feed/blinkStar']
    const myIcos = _['img/myIcos']

    let module = {}

    





    let thisEle = newEle(`<div class="post-body tela headspace"  data-act="remove">
        
        <style>

            .post-body {
                background-color: rgba(0,0,0,0.4);
                display: flex;
                align-items: center;
            }

            .post-body_box1 {
                max-height: 100%;
                overflow: auto;
                width: 100%;
            }

                .post-body_puxe {
                    height: 35px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    visibility: hidden;
                }
                
                .post-body_puxe_text{
                    background-color: white;
                    border-radius: 31px;
                    padding: 1px 11px 3px;
                }

                .post-body_post {
                    background-color: white;
                    margin: 0px 7px 80px 7px;
                    padding: 7px 7px 0px 7px;
                    border-radius: 5px;
                    position: relative;
                }
                    
                    .post-body_img {
                        width: 50px;
                        height: 50px;
                        border-radius: 25px;
                        position: absolute;
                        top: -20px;
                    }

                    .post-body_name {
                        margin-left: 55px;
                        font-weight: bold;
                    }

                    .post-body_time {
                        margin-left: 5px;
                        color: grey;
                    }

                    .post-body_content {
                        margin: 15px 0px 0px 0px;
                        white-space: pre-line;
                    }

                    .post-body_botbar {
                        display: flex;
                        justify-content: space-evenly;
                        margin-top: 8px;
                    }
                    
                        .post-body_like, .post-body_comment{
                            color: grey;
                            padding: 10px 0;
                            pointer-events: all;
                            width: 30px;
                            overflow: visible;
                            white-space: nowrap;
                        }
                        
                        .post-body_like_liked{
                            color: ${myIcos.color};
                        }

                        .post-body_like *, .post-body_comment * {
                            pointer-events: none;
                            vertical-align: bottom;
                        }

                        .post-body_botbar svg{
                            margin-right: 8px;
                            height: 1.25rem;
                            width: 1.25rem;
                        }
                    
                    /**/
                /**/
            /**/



        </style> 

        <div class="post-body_box1">
            <div class="post-body_box2">
                <div class="post-body_puxe">
                    <div class="post-body_puxe_text">puxe</div>
                </div>
                <div class="post-body_post">
                    <img class="post-body_img" src="${data.user.imgSrc}">
                    <span class="post-body_name">${data.user.name}</span>
                    <span class="post-body_time">${data.time}</span>
                    <p class="post-body_content"></p>
                    <div class="post-body_botbar">
                        <span class="post-body_like ${data.liked? "post-body_like_liked" : ""}"
                            data-act="tapStar" data-liked="${data.liked}">
                            ${data.liked? myIcos.likePurple : myIcos.like}
                            <span>${data.likes}</span>
                        </span>
                        <span class="post-body_comment" data-act="remove">
                            ${myIcos.comment}
                            <span>${data.comments}</span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
        
    </div>`)

    const scrollerEle = thisEle.querySelector('.post-body_box1')
    const postBoxEle = scrollerEle.querySelector('.post-body_box2')
    const postEle = postBoxEle.querySelector('.post-body_post')
    const puxeEle = postBoxEle.querySelector('.post-body_puxe')
    const postTextEle = postEle.querySelector('.post-body_content')
    
    postTextEle.innerText = data.content

    






    let thisTela = newTela(thisEle)

    thisTela.addActions({
        'tapStar' (dataset, ele) {
            const blinkingPromise = blinkStar({ele, onClass: 'post-body_like_liked'})
            
            if(blinkingPromise !== undefined){
                ele.dataset.act = ''
                blinkingPromise.then(()=>ele.dataset.act = 'tapStar')
            }
            
            module.listeners.onTapLike(data.id)
        },
        'remove' () {
            //module.remove()
            //module.listeners.onClosedPost()
        }

    })


    thisTela.addListeners({
        inForLoading () {
            //Ajust post ele margin
            if(scrollerEle.offsetHeight < scrollerEle.scrollHeight){
                postEle.style.marginBottom = '20px'
            }
        },
        in () {
          pullModule = initPull()

          pullModule.listeners = {
              onPullComplete () {
                thisTela.remove()
                module.listeners.onClosedPost()
              }
          }
        }
    })



    let pullModule = undefined




    




    module.tela = thisTela


    let removing = false
    
    module.remove = async function () {
        if(removing) return
        removing = true
        pullModule.stop()
        thisEle.style.willChange = 'opacity'
        postBoxEle.style.willChange = 'transform'
        thisEle.style.transition = 'opacity 0.2s'
        postBoxEle.style.transition = 'transform 0.2s'

        await new Promise(requestAnimationFrame)
    
        thisEle.style.opacity = '0'
        postBoxEle.style.transform = 'scale(0.5)'
    
        await new Promise(resolve => thisEle.addEventListener('transitionend', resolve, {once: true}))

        thisTela.remove()
    }


    return module





    


    function initPull () {
        const module = {}
        let startY = undefined
        let state = 'undefined'
        let touchStartTime = 0
        let touchedPost =  false
        let syncEvents = 'startPhase'
        const maxValue = scrollerEle.offsetHeight

        

        const moveModule = getMyMove(renderMove, {maxValue})

        moveModule.listeners = {
            startMove () {
                postBoxEle.style.willChange = 'transform'
                thisEle.style.willChange = 'opacity'
            },
            endMove (arg) {
                if(arg === 'reachedMax') {
                    module.listeners.onPullComplete()
                    return
                }
                else if(arg === 'reachedMin') {
                    if(state == 'moving'){
                        state = 'undefined'
                        scrollerEle.style.overflow = 'auto'
                        puxeEle.style.visibility = 'hidden'
                    }
                }

                postBoxEle.style.willChange = ''
                thisEle.style.willChange = ''
            }
        }


        thisEle.addEventListener('touchstart', (e) => {
            if(syncEvents != 'startPhase') return
            syncEvents = 'endPhase'
            const touchY = e.touches[0].pageY

            if(state == 'scrolling' && scrollerEle.scrollTop === 0){
                state = 'undefined'
            } 

            touchStartTime = Date.now()
            touchedPost = postEle.contains(e.target)


            if(state != 'scrolling') {
                moveModule.move(touchY)
            }

            startY = touchY
        
        }, {passive: true})



        thisEle.addEventListener('touchmove', (e) => {
            if(syncEvents != 'endPhase') return
            const touchY = e.touches[0].pageY

            
            if (state == 'undefined') {
                const scrolling = touchY < startY
                if (scrolling) {
                    state = 'scrolling'
                    moveModule.cancelMove()
                }
                else {
                    state = 'moving'
                    scrollerEle.style.overflow = 'hidden'
                }
            }

            if(state == 'moving') {
                moveModule.move(touchY)
            }

        }, {passive: true})



        thisEle.addEventListener('touchend', (e) => {
            if(syncEvents != 'endPhase') return
            syncEvents = 'startPhase'
            const touchY = e.changedTouches[0].pageY
            const clicked = (Date.now() - touchStartTime) < 300
            const clickOk = clicked && !touchedPost && state == 'undefined'
            
            if(clickOk){
                state = 'moving'
                scrollerEle.style.overflow = 'hidden'
                moveModule.moveJump(touchY)
                puxeEle.style.visibility = 'visible'
            }
            else if(state == 'moving') {
                moveModule.endMove(touchY)
            }

            touchStartTime = 0
            touchedPost = false
            startY = undefined
        }, {passive: true})


        module.stop = ()=>{
            moveModule.cancelMove()
        }
        
        return module


        function renderMove (moveValue) {
            //translate
            var scaleValue = 1.5 - (moveValue/(maxValue*2) + 0.5)
            postBoxEle.style.transform = `scale(${scaleValue})`

            //opacity
            const opacityValue = 1 - moveValue/maxValue
            thisEle.style.opacity = opacityValue
        }

    }




}
