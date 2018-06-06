

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

_['telas/forum/questTemplate'] = function getQuestTemplate () {  

    const newEle = _['tools/myLib'].newEle
    const myIcos = _['img/myIcos']
    
    let module = {}

    




    module.styleEle = newEle(`<style>

        .questItem{
            padding: 11px 10px;
            margin: 12px 8px 0px 8px;
        }

            .questItem * {
                pointer-events: none;
            }
        
            .questItem_text{
                font-weight: 500;
            }

            .questItem_tags{
                font-size: 0.7rem;
                margin-top: 10px;
                color: ${myIcos.color};          
            }

                .questItem_tag{
                    padding-right: 12px;
                }
            
            /**/

            
            .questItem_botbar{
                display: flex;
                color: grey;
                margin-top: 9px;
                margin-left: 10px;

                font-size: 0.7rem;
            }
                
                .questItem_votes{
                    display: flex;
                    align-items: center;
                    margin-right: 15px;
                }

                .questItem_answers{
                    display: flex;
                    align-items: center;
                }

                .questItem_botbar svg{
                    height: 15px;
                    width: 19px;
                    margin-right: 4px;
                }

            /**/

        /**/

    </style>`)



    module.renderQuest = item => {
        const ele = newEle(`<div class="item questItem" data-act="tapQuest" data-id="${item.id}">
            
            <div class="questItem_text"></div>
            
            <div class="questItem_tags">
            </div>        
            
            <div class="questItem_botbar">    
                <div class="questItem_votes">
                    ${myIcos.vote}
                    <div class="questItem_votes_number">
                        ${item.votes}
                    </div>
                </div>
                <div class="questItem_answers">
                    ${myIcos.answer}
                    <div class="questItem_answers_number">
                        ${item.answersNumber}
                    </div>
                </div>
            </div>
        
        </div>`)
        
        const tagsEle = ele.querySelector('.questItem_tags')
        
        ele.querySelector('.questItem_text').innerText = item.title

        item.tags.forEach((tagData) => {
            const ele = newEle(`<span class="questItem_tag"></span>`)
            ele.innerText = tagData.name
            tagsEle.append(ele)
        })

        return ele
    }

    //

    


    return module





}
