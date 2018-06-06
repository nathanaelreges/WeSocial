_['telas/newQuest/view'] = function createNewQuestView () {  
    
    /*
        TODO:
            Replace addTagBox for tagBox and append new tags to it, instead of appending to addTagBox.
    */
    

    const newTela = _['tools/myTelas'].new
    const newEle = _['tools/myLib'].newEle
    const makeEleGlow = _['tools/myLib'].makeEleGlow
    const myIcos = _['img/myIcos']
    const responsiveInputEl = _['tools/myLib'].responsiveInputEl
    
    let module = {}

    




////////////// handling DOM
    let thisEle = newEle(`<div id="newquest" class="tela background newquest" >
        
        <style>  
            .newquest-head {
                display: flex;
                align-items: center;
            }
                .newquest-head_title {
                    font-size: 1.2rem;   
                }

            /**/
            
            .newquest::-webkit-scrollbar {
                display: none;
            }

            .newquest-box{
                width: 100%;
                display: flex;
                flex-direction: column;
            }
                
                .newquest-box > div {
                    flex-shrink: 0;
                }

                .newquest-spacebox {
                    flex-grow: 1;
                }

                .newquest textarea{
                    font-size: 1rem;
                    resize: none;
                    outline: none;
                    border: none;
                    padding: 10px;
                    margin: 10px;
                    font-family: 'Roboto', sans-serif;
                    overflow-y: auto;
                    flex-shrink: 0;
                }

                .newquest-title{
                    margin-top: 20px !important;
                    height: 100px;
                    font-weight: 500;
                }
                
                .newquest-body{
                    height: 200px;
                }
            
                .newquest-tag{
                    padding: 8px;
                    margin: 10px;
                    margin-right: 0;
                    font-weight: 500;
                    display: inline-flex;
                    align-items: center;
                }
                
                    .newquest-tag_plus{
                        color: ${myIcos.color}
                    }
                    .newquest-tag_x{
                        color: ${myIcos.color};
                        transform: rotate(45deg) scale(1.8);
                        margin-left: 10px;
                    }
                
                /**/

                .newquest-addtagbox {
                }

                .newquest-tool {
                    box-shadow: none;
                    position: unset;
                    margin: 10px;
                    margin-bottom: 15px;
                    margin-left: auto;
                }

                    .newquest-tool_disabled {
                        background-color: ${myIcos.color}85;
                    }

                /**/
            
            /**/

        </style> 
        
        
        
        
        <div class="newquest-box scroller headspace">        

            <textarea id="title" class="newquest-title item" placeholder="Título"></textarea>

            <textarea id="body" class="newquest-body item" placeholder="Pergunta..."></textarea>
            
            <div class="newquest-tagbox">
            
            </div>


            <div class="newquest-addtagbox">
                <div class="newquest-tag newquest-tag_plus item" data-act="chooseTag">
                    + TAG
                </div>
            </div>

            <div class="newquest-spacebox"></div>

            <div class="newquest-tool newquest-tool_disabled tool">
                ${myIcos.send}
            </div>

        </div>

        <div class="newquest-head head"> 
            <span class="arrow" data-act="goBack">${myIcos.arrow}</span>
            <span class="newquest-head_title">Escreva sua pergunta</span>
        </div>

        
        
    </div>`)

    let titleInputEle = thisEle.querySelector('.newquest-title')
    let bodyInputEle = thisEle.querySelector('.newquest-body')
    let tagBoxEle = thisEle.querySelector(".newquest-tagbox")
    let sendEle = thisEle.querySelector(".tool")
////////////// handling DOM





////////////// handling Tela
    const thisTela = newTela(thisEle)

    thisTela.addActions({
        'removeTag' (dataSet, target) {
            target.parentElement.remove()
            module.listeners.onRemoveTag(dataSet.index)
        },
        
        'chooseTag' (dataSet, target) {
            module.listeners.onChooseTag()
        },
        
        'send' () {
            module.listeners.onSend()
        }
    })

////////////// handling Tela





////////////// resposiveInputEl & callListenner

    makeEleGlow(sendEle)


    const responsiveInputElTitle_module = responsiveInputEl({el: titleInputEle, minHeight: 100})

        responsiveInputElTitle_module.callBack = () => {
            module.listeners.onTitleInput(titleInputEle.value)
        }

    //
    
    const responsiveInputElBody_module = responsiveInputEl({el: bodyInputEle, minHeight: 200})

        responsiveInputElBody_module.callBack = () => {
            module.listeners.onBodyInput(bodyInputEle.value)
        }
    
    //

    
    
    const onFocusScrollIntoView = (ele)=> {
        ele.addEventListener('focus',()=>{
            ele.scrollIntoView({block: 'start'})
        })
    
    } 

    
    onFocusScrollIntoView(titleInputEle)
    onFocusScrollIntoView(bodyInputEle)



////////////// resposiveInputEl & callListenner





////////////// module
    
    module.addTag = (data, index) => {

        let tagEle = newEle(`
            <div class="newquest-tag  item" >
                <span></span>
                <span class="newquest-tag_x" data-act="removeTag" data-index="${index}">+</span>
            </div>
        `)
        tagEle.firstElementChild.innerText = data.name

        tagBoxEle.append(tagEle)

        //scroll to the bottom so the addTag button doesn't hide    
        thisEle.scrollTop = 10000
    }

    module.setSendButton = (val) => {

        if(val){

            sendEle.classList.remove('newquest-tool_disabled')
            sendEle.dataset.act = 'send'

        }
        else{
            
            sendEle.classList.add('newquest-tool_disabled')
            sendEle.dataset.act = ''

        }

    }

    module.appendTela = (tela) => {
        thisTela.append(tela)
    }

    module.tela = thisTela

////////////// module





//
    return module
}