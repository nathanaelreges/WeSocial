_['telas/home/home_tabs'] = function initTabHandler (homeTela, homeModule, fTab) {
    
    const myTime = _['tools/myTime']
    const createFeedTela = _['telas/feed/createTela']
    const createForumTela = _['telas/forum/createTela']
    const createAlertTela = _['telas/alert/createTela']

    
    let telas = []
    let currentTab = ""
    let createTela = [createFeedTela, createForumTela, createAlertTela]
    let myTimeId = undefined
    if(!fTab) fTab = 0
    

    telas[fTab] = createTela[fTab](homeModule)
    homeTela.prepend(telas[fTab])
    currentTab = fTab
 
    
    return function home_changeTab (tab) {
        setMyTime(tab)
        changeTab(tab)
    }




    function setMyTime (tab) {
        
        const goingOutOfFeed = currentTab == 0 && tab != 0
        if(goingOutOfFeed) {
            
            const timeFunAlreadySet = myTimeId !== undefined
            if(timeFunAlreadySet) return
            
            myTimeId = myTime.addFun(() => { 
                changeTab(0)
                homeModule.onChangeTab(0)
                myTimeId = undefined
            })
            
        }

        const goingIntoFeed = currentTab != 0 && tab == 0
        if(goingIntoFeed) { 
            myTime.remove(myTimeId)
            myTimeId = undefined
        }
     
    }

    function changeTab (tab) {
        if(tab == currentTab){
            newtela = createTela[tab]({appendOnTop: homeModule.appendOnTop})   
            telas[currentTab].replace(newtela)
            telas[currentTab] = newtela
            return
        } 

        if(!telas[tab]){
            telas[tab] = createTela[tab](homeModule)
        }                    
        
        var dir = currentTab > tab ? 'right' : 'left'
        
        telas[currentTab].replace(telas[tab], dir)
        
        currentTab = tab
    }
    
}