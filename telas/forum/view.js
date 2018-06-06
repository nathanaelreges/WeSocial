/*
    module()
        
    
    
    module.listeners.
        
        onIn()

        onOut()

        onTapTool()
        
        onTapSearch()

    //

    module.

        setScrollerTela(tela)



    //
*/


_['telas/forum/view'] = function createForumView (data) {
    
    const newTela = _['tools/myTelas'].new
    const newEle = _['tools/myLib'].newEle
    const makeEleGlow = _['tools/myLib'].makeEleGlow
    const myIcos = _['img/myIcos']  
    

    let module = {}
//init




//eles
    let thisEle = newEle(`<div id="forum" class="tela background footspace">            
        <style>
            .forum-head {
                display: flex;
                align-items: center;
            }
                .forum-head_search {
                    height: 35px;
                    color: rgba(255,255,255,0.7);
                    display: flex;
                    align-items: center;
                    padding-left: 15px;
                }

                    .forum-head_search * {
                        pointer-events: none;
                    }
                    .forum-search_textbox {
                        border-bottom: 1px solid white;
                        margin-left: 10px;
                        padding: 7px 45px 4px 8px;
                        width
                    }
                        .forum-search_text {
                            height: 19px
                        }
        
                /**/

                .forum-head_search svg {
                    width: 30px;
                }

                .forum-head_title {
                    padding-left: 10px;
                    font-size: 1.5rem;
                }

            /**/
        </style>

        <div class="head forum-head">
            <span class="forum-head_search" data-act="tapSearch">
                ${myIcos.lupa}
                <span class="forum-search_textbox">
                    <span class="forum-search_text">Qual é a sua dúvida?</span>
                </span>
            </span>
        </div>

        <div class="tool" data-act="forumTool">
            ${myIcos.plus}
        </div>
        
    </div>`)
//eles    

    const toolEle = thisEle.querySelector('.tool')


    makeEleGlow(toolEle)





    let scrollerTela //Will be setup by module.setScroller






//tela
    const thisTela = newTela(thisEle)
    

    thisTela.addActions({
        "forumTool": function () {
            module.listeners.onTapTool()
        },
        "tapSearch": function () {
            module.listeners.onTapSearch()
        }
    })

    thisTela.addListeners({
        inForLoading() {
            thisTela.prepend(scrollerTela)
        },

        in() {
            module.listeners.onIn()
        },

        out() {
            scrollerTela.remove()
            module.listeners.onOut()
        }
    })

//tela


    
//module
    module.tela = thisTela

    module.setScrollerTela = (tela)=> {
        scrollerTela = tela
    }
//module




//
    return module
}

