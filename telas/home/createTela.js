_['telas/home/createTela'] = function createHomeTela () {
    
    const newTela = _['tools/myTelas'].new
    const newEle = _['tools/myLib'].newEle
    const responseFrame = _['tools/myFrame'].response
    const myIcos = _['img/myIcos']
    const initSettingsHandler = _['telas/home/home_settings']
    const getChangeTabFunction = _['telas/home/home_tabs']
    const getMoveHeadlineFunction = _['telas/home/home_headLine']



    
    


/////////Creating the home tela 6b42f4
    let homeEle = newEle(`<div id="home" class="tela home background">
        
        <style>

            .home-foot{
                display: flex;
                justify-content: space-around;
                border-top: 1px solid lightgrey;
            }
        
                .home-foot_buttom{
                    width: 65px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border-top: 2px solid rgba(0,0,0,0);
                }
                
                .home-foot_buttom svg {
                    height: 35px;
                    pointer-events: none;
                }
                
                .home-foot_headline {
                    width: 65px;
                    height: 2px;
                    background: white;
                    position: absolute;
                    top: 0;
                    left: 0;
                    display: none;
                    will-change: transform;
                }
            
            /**/
       
        </style>
           
    </div>`)

    
    let tabsEle = newEle(`<div class="foot home-foot">
        <div class="home-foot_buttom" data-act="open" data-who="feed">
            ${myIcos.blackBoard}
        </div>
        <div class="home-foot_buttom" data-act="open" data-who="forum">
            ${myIcos.forum}
        </div>
        <div class="home-foot_buttom" data-act="open" data-who="calendar">
            ${myIcos.bell}
        </div>
        <div class="home-foot_buttom">
            ${myIcos.settings}
        </div>
        <div class="home-foot_headline transition"></div>
    </div>`)

    homeEle.appendChild(tabsEle)
    
    const tabNums = {
        'feed': 0,
        'forum': 1,
        'calendar': 2,
    } 




    let homeTela = newTela(homeEle)

    homeTela.addActions({
        'open': function telaHomeAct_open (data) {

            let tabNum = tabNums[data.who]
        
            changeTab(tabNum)
            moveHeadline(tabNum)
        }
    })
    
    
    homeTela.addListeners({
        in () {
            if (moveHeadline === undefined) {
                moveHeadline = getMoveHeadlineFunction(tabsEle)
            }
        }
    })




    const homeTabModule = {
        appendOnTop (tela) {
            homeTela.append(tela)
        }, 

        onChangeTab (tabNum) {
            moveHeadline(tabNum)
        }
    }


    initSettingsHandler(tabsEle.children[3])
    
    const changeTab = getChangeTabFunction(homeTela, homeTabModule)
    let moveHeadline = undefined

    return homeTela
}   