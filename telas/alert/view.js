/*
    module()
        
    
    
    module.listeners.
        
        onIn()

        onOut()


    //

    module.

        appendTela()

    //
*/


_['telas/alert/view'] = function createAlertView (data) {
    
    const newTela = _['tools/myTelas'].new
    const newEle = _['tools/myLib'].newEle
    const makeEleGlow = _['tools/myLib'].makeEleGlow
    const myIcos = _['img/myIcos']  
    

    let module = {}
//init




//eles
    let thisEle = newEle(`<div id="alert" class="tela background footspace alert">

        <style>

            .alert-head{
                display: flex;
                align-items: center;
            }

            .alert-head_title{
                margin-left: 20px;
                font-size: 1.13rem;
            }

        </style>    
        
        
        <div class="alert-head head">
            <span class="alert-head_title">
                Notificações
            </span>
        </div>
        
    </div>`)
//eles    




let scrollerTela /// will be set up by the module



//tela

    let thisTela = newTela(thisEle)
    

    thisTela.addListeners({

        inForLoading() {
            thisTela.prepend(scrollerTela)
        },

        in() {
            module.listeners.onIn()
        },
        
        out() {
            module.listeners.onOut()
            scrollerTela.remove()
        }

    })
    
    thisTela.addActions({

    })

//tela




    
//module
    module.tela = thisTela

    module.setScrollerTela = (tela) => {
        scrollerTela = tela /// will be set up by the module
    }
//module




//
    return module
}

