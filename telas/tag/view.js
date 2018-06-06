


/*
    module(data)
        //data{
            questions: [{ 
                text: '', 
                votes: 0,
                answers: 0,
                tags: [{id, name}], 
                id: 0
            }], 
            tag:{name}
        }

    module.listeners.

        onTapQuest(questId)

        onGoBack()
            
    //

    module.user.

        more(data)
            //when the user scrolls to the bottom,
            //  data the same as the one at the top
            //  but without tags
            
    //


*/

_['telas/tag/view'] = function createTagView (data) {  

    const newTela = _['tools/myTelas'].new
    const newEle = _['tools/myLib'].newEle
    const myIcos = _['img/myIcos']
    const createRenderedListView = _['tools/renderedList']
    const getQuestTemplate = _['telas/forum/questTemplate']

    let module = {}

    


    const questTemplate = getQuestTemplate()




////////////// handling DOM
    let thisEle = newEle(`<div id="tag" class="tela background tag">
        
        <style>

            .tag{
                display: flex;
                flex-direction: column;
            }

            /*Testing a diferent way to layer telas*/
            .tag .scroller {
                flex-grow: 1;

                will-change: unset;
                width: 100%;
                position: unset;
                top: unset;
                bottom: unset;
            }

            .tag-head {
                display: flex;
                align-items: center;
                flex-wrap: wrap;
                z-index: 1;

                flex-shrink: 0;

                will-change: unset;
                height: 50px;
                width: 100%;
                position: unset;
                top: unset;
            }
                
                .tag-title{

                }
                    .tag-title_txt{

                    }

                    .tag-title_tag{
                        margin-left: 4px;

                        padding: 10px;
                        
                        font-weight: 500;
                        display: inline-block;
                        color: ${myIcos.color};
                    }
                
                /**/

            /**/

            .tag-scroller {
                padding-bottom: 10px;
            }



        </style> 

        <div class="tag-head head">
            
            <div class="arrow" data-act="tagGoBack">
                ${myIcos.arrow}
            </div>

            <div class="tag-title">
            
                <span class="tag-title_txt">
                    TAG
                </span>
                <div class="tag-title_tag item">
                </div>

            </div>
            
        </div>
        
        <div class="scroller tag-scroller">
        </div>
        
    </div>`)

    const scrollerEle = thisEle.querySelector('.scroller')
    const tagNameEle = thisEle.querySelector('.tag-title_tag')


    thisEle.append(questTemplate.styleEle)

    tagNameEle.innerText = data.tag.name




    let thisTela = newTela(thisEle)

    thisTela.addActions({
        'tapQuest' (data) {
            module.listeners.onTapQuest(data.id)
        },
        'tagGoBack' () {
            module.listeners.onGoBack()
        }

    })

    thisTela.addListeners({
        in() {
            module.listeners.onIn()
        },

        out () {
            module.listeners.onOut()
        }
    })
    



    const questEles = getQuestEles(data.questions)
    questEles.forEach(x=>scrollerEle.append(x))






    module.tela = thisTela

    module.updateStats = (data) => {
        data.forEach(item => {
            
            const ele = questEles[item.index]

            if(item.votes != undefined) {
                const votesEle = ele.querySelector('.questItem_votes_number')
                votesEle.innerText = item.votes
            }

            if(item.answers != undefined) {
                const answersEle = ele.querySelector('.questItem_answers_number')
                answersEle.innerText = item.answers
            }

        })
    }
    
    return module





    function getQuestEles (questionsData) {
        let arrayOfQuests = renderQuests(questionsData)

        return arrayOfQuests
    
        function renderQuests (data) {
            let arr = []
            
            data.forEach(item => {
                const ele = questTemplate.renderQuest(item)
                arr.push(ele)
            })
            
            return arr
        }

    }

}
