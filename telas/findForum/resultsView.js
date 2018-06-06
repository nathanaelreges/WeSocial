

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
            tags:[{id, name}]
        }

    module.listeners.

        onTapTag(data)
            data{id, name}

        onQuest(questId)

        onGoBack()
            
    //

    module.user.

        more(data)
            //when the user scrolls to the bottom,
            //  data the same as the one at the top
            //  but without tags
            
    //

    module.remove()
        //removes the tela

*/

_['telas/findForum/resultsView'] = function createResultsView (data) {  

    const newTela = _['tools/myTelas'].new
    const newEle = _['tools/myLib'].newEle
    const time = _['tools/myTime']
    const getQuestTemplate = _['telas/forum/questTemplate']
    const createRenderedListView = _['tools/renderedList']
    const makeEleGlow = _['tools/myLib'].makeEleGlow
    const myIcos = _['img/myIcos']
    
    let module = {}

    
    const questTemplate = getQuestTemplate()


    let thisEle = newEle(`<div id="results" class="findforum-results headspace tela">
        
        <style>
            .findforum-results{

            }

            .findforum-tagsbox {
                overflow-x: scroll;
                padding: 4px 0px 4px 0px;
                margin-top: 12px;
                width: 100%;
                white-space: nowrap;
            }

                .findforum-tag{
                    padding: 10px;
                    margin-right: 8px;
                    font-weight: 500;
                    display: inline-block;
                    flex-shrink: 0;
                    color: ${myIcos.color};
                }

                .findforum-tagsbox-title {
                    margin: 0px 8px 0px 12px;
                    font-weight: 300;
                    font-size: 1.1rem;
                    letter-spacing: 1px;
                }
                
            /**/


        </style> 
    
    </div>`)


    const renderTag = item =>  
        `<div class="item findforum-tag" data-act="tapTag" data-id="${item.id}" data-name="${item.name}">
            ${item.name}
        </div>`        
        

    const tagsBoxEle = newEle(
        `<div class="findforum-tagsbox hidescrollbar">
            <span class="findforum-tagsbox-title"> Tags:</span>
        </div>`
    )


    
    thisEle.append(questTemplate.styleEle)



    
    let thisTela = newTela(thisEle)
    
    thisTela.addActions({
        
        'tapQuest' (data) {
            module.listeners.onTapQuest(data.id)
        },

        'tapTag' (data) {
            const id = parseInt(data.id)
            module.listeners.onTapTag(id)
        }

    })

    





    const {renderedListTela, arrayOfQuests} = getRenderedList(data)
    thisTela.append(renderedListTela);






    module.remove = ()=> {
        thisTela.remove()
    }

    module.updateStats = (data) => {
        data.forEach(item => {
            
            const ele = arrayOfQuests[item.index]

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

    module.tela = thisTela

    
    
    
    
    return module






    function getRenderedList ({questions, tags}) {
        let arrayOfQuests = renderQuests(questions)

        const tagsFrag = getTagFrag(tags)
        tagsBoxEle.append(tagsFrag);
                    
        arrayOfQuests.push(tagsBoxEle)

        let renderedListView = createRenderedListView(arrayOfQuests)

        renderedListView.setCloserToTheEdge(() => 
            module.user.more().then(response => {
                
                if(response){
                    return renderQuests(response)
                } 
                else{
                    renderedListView.setCloserToTheEdge('disable')
                    return []
                } 

            })
        )
        
        return {renderedListTela: renderedListView.tela, arrayOfQuests}



        function getTagFrag (array) {
            let docFrag = document.createDocumentFragment()
            
            array.forEach(item => {
                const ele = newEle(renderTag(item))
                docFrag.append(ele)
            })
    
            
            return docFrag
        }
    
    
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
