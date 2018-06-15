/*
    module()
        
    module.listeners.

        onChangeTab(tabStr)
            // "post" or "chat", depending on wich tab the user is changing to
        
        onChangeAlert(state)
            //  true or false dependign on wich state the user is setting the alerts to

        onGoBack()

        onIn()

        onOut()
            
    //

    module.

        changeTabToChat()

    //


*/

_['telas/post/view'] = function createPostView ({initialTab, bellState}) {  

    const newTela = _['tools/myTelas'].new
    const newEle = _['tools/myLib'].newEle
    const mutateAndFade = _['tools/myLib'].mutateAndFade
    const myIcos = _['img/myIcos']

    let module = {}

    




////////////// handling DOM
    let thisEle = newEle(`<div id="post" class="tela background post">
        
        <style>

            .post-head{
                display: flex;
                z-index: 1;
            }

            .post-head_tabs {
                flex-grow: 1;
                
                display: flex;
                align-items: center;
                justify-content: center;
            }

                .post-head_tabs_butt {
                    border: 2px solid white;
                    border-radius: 21px;

                    padding: 3px 18px;
                    
                    color: white;
                    background: ${myIcos.color};
                    letter-spacing: 0.7px;
                    font-weight: 600;
                    font-size: 1rem;
                }
                

                .post-head_tabs_butt-on {
                    color: ${myIcos.color};
                    background: white;
                }

                .post-head_tabs_chat {
                    margin-left: 20px;
                }

            /**/


            .post-head_bell{
                height: 100%;
                background: ${myIcos.color}
            }

                .post-head_bell svg{
                    height: 100%;
                    padding: 10px;
                    pointer-events: none;
                }

            /**/

        </style> 

        <div class="post-head head">
            
            <div class="arrow" data-act="postGoBack">
                ${myIcos.arrow}
            </div>

            <div class="post-head_tabs">
                <div class="post-head_tabs_butt post-head_tabs_post" data-act="tapPostTab">
                    post
                </div>
                <div class="post-head_tabs_butt post-head_tabs_chat" data-act="tapChatTab">
                    chat
                </div>
            </div>

            <div class="post-head_bell" data-act="tapBell">
                
            </div>
            
        </div>
        
    </div>`)

    let tabEle = thisEle.querySelector('.post-head_tabs')
    let bellEle = thisEle.querySelector('.post-head_bell')



    initButtons()



    const changeTab = getChangeTab()
    const changeBell = getChangeBell()






    let thisTela = newTela(thisEle)

    thisTela.addActions({
        'tapPostTab' () {
            changeTab('post')
        },

        'tapChatTab' () {
            changeTab('chat')
        },

        'tapBell' () {
            changeBell()
        },

        'postGoBack' () {
            module.listeners.onGoBack()
        }
    })

    thisTela.addListeners({
        inForLoading() {
            module.listeners.onInForLoading()
        },
        
        in() {
            module.listeners.onIn()
        },

        out() {
            module.listeners.onOut()
        }
    })








    module.tela = thisTela


    module.changeTabToChat = (tela) => {
        changeTab('chat', {callListener: false})
    }

    module.appendTela = (tela) => {
        thisTela.append(tela)
    }

    module.prependTela = (tela) => {
        thisTela.prepend(tela)
    }

    module.turnBellOn = () => {
        changeBell({newState: true})
    }

    




    return module






    ///flow, dependent functions
    function getChangeTab () {
        let actualTab = initialTab

       

        return function changeTab (tab, {callListener = true} = {}) {
            
            if(actualTab == tab) return
            actualTab = tab

            if(callListener) {
                module.listeners.onChangeTab(tab)
            }
            


            mutateAndFade(tabEle, (clone) => {
                const cloneButtons = clone.querySelectorAll('.post-head_tabs_butt')
                
                cloneButtons.forEach(button => {
                    button.classList.toggle('post-head_tabs_butt-on')               
                })

                tabEle = clone
            })

        }
    }




    function getChangeBell () {
        let state = bellState

        return function changeBell ({newState} = {}) {
            if(newState === undefined){
                state = !state
            }
            else {
                if(newState == state) return
                state = newState
            }
                

            module.listeners.onChangeAlert(state)

            
            
            

            mutateAndFade(bellEle, (clone) => {
                clone.innerHTML = state? myIcos.bellOn : myIcos.bell
                bellEle = clone
            })

            

        }
    }




    function initButtons () {


        //initing witch tab is highlited
        const tabButtons = tabEle.querySelectorAll('.post-head_tabs_butt')
        if(initialTab == 'post'){
            var tabButtonsIndex = 0
        }
        else if(initialTab == 'chat'){
            var tabButtonsIndex = 1
        }

        tabButtons[tabButtonsIndex].classList.add('post-head_tabs_butt-on')


        //initing wheter the bell is on or of
        if(bellState) {
            var bellIco = myIcos.bellOn
        }
        else {
            var bellIco = myIcos.bell
        }

        bellEle.innerHTML = bellIco
    }



}
