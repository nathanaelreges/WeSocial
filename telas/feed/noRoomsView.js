_['telas/feed/noRoomsView'] = function createFeedView () {
    
    const newTela = _['tools/myTelas'].new
    const newEle = _['tools/myLib'].newEle
    const makeEleGlow = _['tools/myLib'].makeEleGlow
    const nextFrame = _['tools/myFrame'].next
    const myIcos = _['img/myIcos']  
    

    const module = {}
//init




//eles
    let thisEle = newEle(`<div id="feed2" class="tela footspace">
        
        <style>
            
            .feed2-head {
                display: flex;
                align-items: center;
            }
                .feed2-head_txt {
                    margin-left: 20px;
                    font-size: 1.13rem;
                }
            /**/


            .feed2-body {
                display: flex;
                align-items: center;
                justify-content: center;
            }

                .feed2-but {
                    background-color: ${myIcos.color};
                    color: white;
                    font-weight: 300;
                    border-radius: 100px;
                    padding: 6px 20px;
                    letter-spacing: 1.4px;
                }

            /**/

        </style>

        <div class="head feed2-head">
            <span class="feed2-head_txt">
                Nenhuma sala
            </span>
        </div>

        <div class="feed2-body tela headspace">
            <div class="feed2-but" data-act="feed2newRoom">
                Criar Sala
            </div>
        </div>

    </div>`)
    

    const buttonEle = thisEle.querySelector('.feed2-but')
    makeEleGlow(buttonEle)


//eles    




//tela
    let thisTela = newTela(thisEle)
    

    thisTela.addListeners({
        
        in() {
           // module.listeners.onIn()   
        },
        out() {
           // module.listeners.onOut()            
        }

    })
    
    thisTela.addActions({
        'feed2newRoom' () {
            module.listeners.onClickNewRoom()
        }
    })
//tela




    
//module
    module.tela = thisTela
//module




//
    return module
}

