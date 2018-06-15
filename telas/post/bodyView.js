


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
    const getMyMove = _['tools/myMove/init.js']
    const blinkStar = _['telas/feed/blinkStar']
    const myIcos = _['img/myIcos']

    let module = {}

    





    let thisEle = newEle(`<div class="post-body tela headspace"  data-act="jump">
        
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

                .post-body_box1::-webkit-scrollbar {
                    display: none;
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

        <div class="post-body_box1 my_scrollbar"  data-act="jump">
            <div class="post-body_box2"  data-act="jump">
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
            if(!pullModule.isClickAllowed()) {return}
            
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
        },
        'jump' () {
            if(!pullModule.isClickAllowed()) {return}
            pullModule.jump()
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
                thisEle.remove()//Temoporary fix
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
        pullModule.close()
    }


    return module





    


    function initPull () {
        const module = {}
        const maxValue = scrollerEle.offsetHeight
        let puxeEleVisible = false
        let clickAllowed = true



        const moveModule = getMyMove(renderMove, maxValue, thisEle)

        moveModule.onStartMove = () => {
            if(state.value == 'scrolling'){ 
                moveModule.cancelMove()
                return
            }
            
            postBoxEle.style.willChange = 'transform'
            thisEle.style.willChange = 'opacity'
        }

        moveModule.onEndMove = (arg) => {
            if(arg === 'max') {
                module.listeners.onPullComplete()
            }
            else if(arg === 'zero') {
                if(state.value == 'moving'){
                    state.resetMoving()
                }

                if(puxeEleVisible){
                    puxeEleVisible = false
                    puxeEle.style.visibility = 'hidden'
                }
                
                postBoxEle.style.willChange = ''
                thisEle.style.willChange = ''
            }
        }
  


        scrollerEle.addEventListener('scroll', () => {
            if(state.value == 'undefined') { 
                if(scrollerEle.scrollTop != 0) {
                    state.setScrolling()
                }
            }
            else if(state.value == 'scrolling') { 
                if(scrollerEle.scrollTop == 0) { 
                    state.resetScrolling()
                }
            }
        }, {passive: true})




        const state = {
            value: 'undefined',
            setScrolling () { 
                moveModule.cancelMove()
                this.value = 'scrolling'
            },
            setMoving () {
                scrollerEle.style.overflow = 'hidden'
                clickAllowed = false
                this.value = 'moving'
            },
            resetScrolling () { 
                this.value = 'undefined'
            },
            resetMoving () {
                scrollerEle.style.overflow = 'auto'
                setTimeout(() => {
                    clickAllowed = true
                }, 300)
                this.value = 'undefined'
            }
        }





        module.jump = () => {
            if(state.value == 'scrolling') {return}

            puxeEle.style.visibility = 'visible'
            puxeEleVisible = true
            
            moveModule.jump()
        }

        module.close = () => {
            if(state.value == 'scrolling') {
                state.resetScrolling()
            }
            
            moveModule.switch()
        }

        module.isClickAllowed = () => {
            return clickAllowed
        }

        return module



        

        function renderMove (moveValue) {
            if(state.value == 'undefined') {
                if(moveValue != 0){
                    state.setMoving()
                }
            }
           


            //translate
            var scaleValue = 1.5 - (moveValue/(maxValue*2) + 0.5)
            postBoxEle.style.transform = `scale(${scaleValue})`

            //opacity
            const opacityValue = 1 - moveValue/maxValue
            thisEle.style.opacity = opacityValue
        }

    }




}



