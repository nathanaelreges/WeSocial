/*

    module(data)
        //data { 
            text: '', 
            votes: 0,
            answers: 0,
            tags: [{id, name}], 
            id: 0
        }

    module.user.

        more()
            //recives a promise to be resolved with older quests then the prior ones, if there are any
            //.then(data) data is the same as the initial

    //

    module.listeners.

        onOpenQuest(questId)

    //
    
    module.

        addNewQuests(questsData)
            //add quests to top 
            //questsData data is the same as the initial


        updateStats(updateArray)
            //updateArray[
                index: 123, votes: 123, answers: 123
            ]

        tela
            //this tela
    //

*/




_['telas/forum/scrollerView'] = function createScrollerView (questsData) { 
    
    const createRenderedList = _['tools/renderedList']
    const newTela = _['tools/myTelas'].new
    const newEle = _['tools/myLib'].newEle
    const getQuestTemplate = _['telas/forum/questTemplate']
    const myIcos = _['img/myIcos']
    const getIcoEle = _['img/myIcos'].getEle

    let module = {}


    const questTemplate = getQuestTemplate()


    let thisEle = newEle(
        `<div class="forum-quests">
            <style>
                .forum-quests .scroller {
                    top: 50px;
                }
            </style>
        </div>`
    )
    
    thisEle.append(questTemplate.styleEle)

 






    let thisTela = newTela(thisEle)

    thisTela.addActions({
        'tapQuest' (dataset) {
            const id = parseInt(dataset.id)
            module.listeners.onOpenQuest(id)
        }
    })



    let {renderedList, arrayOfQuests} = getRenderedList()
    thisTela.append(renderedList.tela)





    
    module.addNewQuests = x => { 
        renderedList.addPostsAbove(mapRenderQuests(x), {scrollToTop: true})
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









/////Helper Functions

    function mapRenderQuests (x) {
        return x.map(questTemplate.renderQuest)
    }


    function getRenderedList () {

        const arrayOfQuests = mapRenderQuests(questsData)   

        let renderedList = createRenderedList(arrayOfQuests)

        renderedList.setCloserToTheEdge(() => 
            module.user.more().then(response => {
                
                if(response){
                    return mapRenderQuests(response)
                } 
                else{
                    renderedList.setCloserToTheEdge('disable')
                    return []
                } 

            })
        )
        
        return {renderedList, arrayOfQuests}
    }
   
}

