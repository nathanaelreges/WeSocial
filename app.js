_['app'] = function initApp () {
    
    const createHomeTela = _['telas/home/createTela']
    const bodyTela = _['tools/myTelas'].bodyTela
    const newTela = _['tools/myTelas'].new
    const addTimeFun = _['tools/myTime'].addFun
    const goBackInTime = _['tools/myTime'].goBack
    const addAction = _['tools/myActions'].add
    const newEle = _['tools/myLib'].newEle
    const isMobile = _['tools/myLib'].isMobile
    
    let currentTela




    const appEle = newEle(`<div id="app" class="app">
        <style>
            .app {
                will-change: transform;
                height: 100%;
                width: 100%;
                max-width: 450px;
                max-height: 900px;
                overflow: hidden;
                margin: auto;
            }
        </style>
    </div>`)

    const appTela = newTela(appEle)




    const nextTela = function app_nextTela (nextTela) {
        currentTela.replace(nextTela,'downin')
        
        let lastTela = currentTela
        
        addTimeFun(function returnTela () {
            nextTela.replace(lastTela, 'upout')
            currentTela = lastTela
        })

        currentTela = nextTela
    }
    


    requestAnimationFrame(()=>{
        currentTela = createHomeTela()
        bodyTela.append(appTela)
        appTela.append(currentTela)
    })
    


    addAction("goBack", goBackInTime)



    checkMobility()



    return {nextTela: nextTela}



    function checkMobility () {
        if(isMobile.get()) return

        const {maxMobileWidth, windowWidth} =  isMobile.getProps()
        const tipBoxWidth = (windowWidth - maxMobileWidth) / 2
        const minTipWidth = 175
        
        const fitsToolTip = tipBoxWidth > minTipWidth
        if(!fitsToolTip) return


        const tipBoxEle = newEle(`<div class="desktoptooltip-box">
            <style>
                
                .desktoptooltip-box {
                    width: calc(calc(100% - 450px) / 2);
                    height: 100%;
                    position: fixed;
                    top: 0;
                    left: calc(450px + 100% / 2 - 450px / 2);

                    display: flex;
                }

                .desktoptooltip {
                    margin: auto;
                    width: 85%;
                    max-width: 200px;
                    text-align: center;
                    background: rgba(0,0,0,0.2);
                    border-radius: 10px;
                    padding: 13px;
                    color: white;
                    letter-spacing: 1px;
                    font-weight: 100;
                }

                @media screen and (max-width: ${minTipWidth * 2 + maxMobileWidth}px) {
                    .desktoptooltip-box {
                        display: none;
                    }
                }

            </style>
            
            <div class="desktoptooltip">
                Para ter uma experiência completa acesse no mobile.
                <br/> <br/>
                Copie este link no seu celular: <a href="tinyurl.com/wesocial">link.com</a>
            </div>

        </div>`)

        document.body.append(tipBoxEle)
    }
}