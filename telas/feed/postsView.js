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
            id: 123
        }

    module.user.

        update()
            //recives a promise to be resolved with new posts if there are any
            //.then(data) data is the same as the initial

        more()
            //recives a promise to be resolved with older posts then the prior ones, if there are any
            //.then(data) data is the same as the initial

    //

    module.listeners.

        onOpenPost(postId)

        onTapLike(postId)

        onTapComment(postId)

        onGoBack()

    //
    
    module.addNewPosts(postsData)
        //add posts to top 
        //postsData data is the same as the initial

    module.changePosts(postsData)
        //replace all the posts being displayed
        //postsData is the same as the initial


    module.updateStats(updateArray)
        //updateArray[
            index: 123, likes: 123, comments: 123
        ]

*/




_['telas/feed/postsView'] = function createPostsView (postsData) {
    
    const createRenderedList = _['tools/renderedList']
    const newTela = _['tools/myTelas'].new
    const newEle = _['tools/myLib'].newEle
    const myIcos = _['img/myIcos']
    const getIcoEle = _['img/myIcos'].getEle
    const blinkStar = _['telas/feed/blinkStar']
    const isMobile = _['tools/myLib'].isMobile
    const nextFrame = _['tools/myFrame'].next


    let module = {}
    let firstIn = false


    let thisEle = newEle(`<div class="feed-posts tela">
        
        <style>
        
            .feed-post {
                background-color: white;
                margin: 30px 7px 0px 7px;
                padding: 7px 7px 0px 7px;
                border-radius: 5px;
                position: relative;
            }

                .feed-post * {
                    pointer-events: none;
                }

                .feed-post_img {
                    width: 50px;
                    height: 50px;
                    border-radius: 25px;
                    position: absolute;
                    top: -20px;
                }

                .feed-post_name {
                    margin-left: 55px;
                    font-weight: bold;
                }

                .feed-post_time {
                    margin-left: 5px;
                    color: grey;
                }

                .feed-post_content {
                    margin: 8px 0px 0px 0px;
                }

                .feed-post_botbar {
                    display: flex;
                    justify-content: space-evenly;
                    margin-top: 3px;
                }
                
                    .feed-post_like, .feed-post_comment{
                        color: grey;
                        padding: 10px 0;
                        pointer-events: all;
                        width: 30px;
                        overflow: visible;
                        white-space: nowrap;
                    }
                    
                    .feed-post_like_liked{
                        color: ${myIcos.color};
                    }

                    .feed-post_like *, .feed-post_comment * {
                        pointer-events: none;
                        vertical-align: bottom;
                    }

                    .feed-post_botbar svg{
                        margin-right: 8px;
                        height: 1.25rem;
                        width: 1.25rem;
                    }
                
                /**/

            /**/

            .feed-posts {
                top: 50px;
            }

        </style>

    </div>`)
    
    const renderPost = (item, index) => { ///its here because of the css and html at top pattern
        
        let feed_post = document.createElement('div')
        feed_post.className = 'feed-post'
        feed_post.dataset.act = 'openPost'
        feed_post.dataset.id = item.id
                    
            let img = document.createElement('img')
            img.className = 'feed-post_img'
            img.src = item.user.imgSrc
    

            let post_name = document.createElement('span')
            post_name.className = 'feed-post_name'
            post_name.innerText = item.user.name
    

            let post_time = document.createElement('span')
            post_time.className = 'feed-post_time'
            post_time.innerText = item.time
            

            let post_content = document.createElement('p')
            post_content.className = 'feed-post_content'
            post_content.innerText = item.content
    
            
            let post_botbar = document.createElement('div')
            post_botbar.className = 'feed-post_botbar'
    
                let post_like = document.createElement('span')
                post_like.className = 'feed-post_like' + (item.liked? ' feed-post_like_liked' : '')
                post_like.dataset.act = 'feed_like'
                post_like.dataset.id = item.id
                

                    let post_like_number = document.createElement('span')
                    post_like_number.className = 'feed-post_like_number' 
                    post_like_number.innerText = item.likes
                    
                    const post_like_ico = getIcoEle(item.liked? 'likePurple' : 'like')
                    
                post_like.appendChild(post_like_ico)
                post_like.appendChild(post_like_number)
                

                let post_comment = document.createElement('span')
                post_comment.className = 'feed-post_comment'
                post_comment.dataset.act = 'feed_comment'
                post_comment.dataset.id = item.id
                    
                    let post_comment_number = document.createElement('span')
                    post_comment_number.className = 'feed-post_comment_number' 
                    post_comment_number.innerText = item.comments

                post_comment.appendChild(getIcoEle('comment'))
                post_comment.appendChild(post_comment_number)
                        
            post_botbar.append(post_like, post_comment)
        
        feed_post.append(img, post_name, post_time, post_content, post_botbar)
            
        return feed_post
    }



    
    
    





 
    let thisTela = newTela(thisEle)

    thisTela.addActions({
        'openPost' (dataset) {
            const id = parseInt(dataset.id)
            module.listeners.onOpenPost(id)
        },
        'feed_like' (dataset, targetEle) {
            const blinkingPromise = blinkStar({ele: targetEle, onClass: 'feed-post_like_liked'})
            
            if(blinkingPromise !== undefined){
                targetEle.dataset.act = ''
                blinkingPromise.then(()=>targetEle.dataset.act = 'feed_like')
            }
            
            const id = parseInt(dataset.id)
            module.listeners.onTapLike(id)
        },
        'feed_comment' (dataset) {
            const id = parseInt(dataset.id)
            module.listeners.onTapComment(id)
        }
    })



    thisTela.addListeners({
        in() {
            if(!firstIn) {
                firstIn = true
                handleToolTip()
            }
            
        }
    })

    
    let {renderedList, arrayOfPosts} = getRenderedList(postsData)
    
    thisTela.append(renderedList.tela)








    
    module.addNewPosts = x => { 
        renderedList.addPostsAbove(mapRenderPost(x), {scrollToTop: true})
    }

    module.changePosts = postsData => {
        const obj = getRenderedList(postsData)  
        
        const newRenderedList = obj.renderedList
        arrayOfPosts = obj.arrayOfPosts
        
        renderedList.tela.replace(newRenderedList.tela)

        renderedList = newRenderedList
    }

    module.updateStats = (data) => {
        data.forEach(item => {
            
            const ele = arrayOfPosts[item.index]

            if(item.likes !== undefined) {
                const numberEle = ele.querySelector('.feed-post_like_number')
                numberEle.innerText = item.likes
            }

            if(item.comments !== undefined) {
                const commentEle = ele.querySelector('.feed-post_comment_number')
                commentEle.innerText = item.comments
            }

            if(item.liked !== undefined) {
                const likeEle = ele.querySelector('.feed-post_like')
                const likeIcoEle = likeEle.querySelector('svg')
                
                
                if(item.liked)
                    likeEle.classList.add('feed-post_like_liked')
                else
                    likeEle.classList.remove('feed-post_like_liked')
                //
                
                const newLikeIcoELe = getIcoEle(item.liked? 'likePurple' : 'like')
                likeEle.replaceChild(newLikeIcoELe, likeIcoEle)
            }
        })
    }

    module.tela = thisTela


    
    return module









/////Helper Functions


    function mapRenderPost (x) {
        return x.map(renderPost)
    }


    function getRenderedList (data) {
        if(data === undefined) {
            return {
                renderedList: {tela: newTela(newEle('<div>asda</div>'))},
                arrayOfPosts: []
            }
        }

        let arrayOfPosts = mapRenderPost(data)

        let renderedList = createRenderedList(arrayOfPosts)

        renderedList.setPushUpdate(() => 
            module.user.update().then(response => 
                response? mapRenderPost(response) : undefined
            )
        )

        renderedList.setCloserToTheEdge(() => 
            module.user.more().then(response => {
                
                if(response){
                    return mapRenderPost(response)
                } 
                else{
                    renderedList.setCloserToTheEdge('disable')
                    return []
                } 

            })
        )
        
        return {renderedList, arrayOfPosts}
    }

    function handleToolTip () {
        if(!isMobile.get()) return

        let timesShown = localStorage.getItem('poolToUpdateTipCnt')
        
        if(timesShown === undefined) {
            timesShown = 0
        }
        else
        if(timesShown > 2) {
            return
        }
        else{
            localStorage.setItem('poolToUpdateTipCnt', ++timesShown)
        }   


        const tipModule = getTip()

        thisEle.append(tipModule.ele)

        tipModule.in()

        thisEle.addEventListener('touchmove',() => {
            tipModule.out()
        }, {once: true})

    }


    function getTip () {
        const module = {}

        const tipEle = newEle(`<div class="feed-tip_box">
            <style>
                .feed-tip_box {
                    position: absolute;
                    padding-top: 15px;
                    padding-bottom: 10px;
                    width: 100%;
                    
                    display: flex;
                    overflow: hidden;
                    
                    will-change: opacity;
                    transition: opacity 0.5s;
                    opacity: 0;
                }

                .feed-tip {
                    margin: auto;
                    padding: 7px 11px;
                    
                    background: rgba(255,255,255,0.86);;
                    box-shadow: 0px 0px 7px -1px rgba(0,0,0,0.5);
                    border-radius: 15px;
                    
                    color: ${myIcos.color};
                    font-weight: 300;
                    letter-spacing: 0.7px;
                    font-size: 1rem;
                }
            </style>

            <div class="feed-tip">puxe para atualizar</div>

        </div>`)

        module.ele = tipEle

        module.in = () => {
            nextFrame(()=>{
                tipEle.style.opacity = 1
            })
        }

        module.out = () => {
            tipEle.style.opacity = 0;
            setTimeout(()=>{
                tipEle.remove()
            }, 500)
        }

        return  module

    }
   
}

