/*
    module(data)

    module.listeners.

        onVote(id, newState)

    //

    module.updateVote()


    /////module.blabla()
*/



_['telas/quest/answersView'] = function createAnswersView (data) {  

    const newTela = _['tools/myTelas'].new
    const newEle = _['tools/myLib'].newEle
    const makeEleGlow = _['tools/myLib'].makeEleGlow
    const myIcos = _['img/myIcos']
    
    let module = {}

    




////////////// handling DOM
    let thisEle = newEle(`<div class="quest-answers">
        
        <style>
            .quest-answers{
                padding-top: 10px;
            }

            .quest-answers_title{
                text-align: center;
                margin-top: 8px;
                margin-bottom: 9px;
            }
            
                .quest-answers_title_text{
                    font-weight: 500;
                    letter-spacing: 0.4px;
                    font-size: 0.94rem;
                }
            
            /**/

            .quest-answer{
                margin: 5px;
                margin-bottom: 25px;
                padding: 15px 10px 10px 10px;
            }

                .quest-answer_votes{
                    background: ${myIcos.color};
                    border-radius: 50%;

                    height: 30px;
                    width: 30px;

                    display: flex;
                    align-items: center;
                    justify-content: center;

                    
                    position: absolute;
                    margin-left: 10px;
                    margin-top: -26px;
                }

                    .quest-answer_votes_number{
                        font-size: 0.9rem;
                        font-weight: 400;
                        letter-spacing: -1px;
                        color: white;
                    }

                    .quest-answer_votes svg{
                        margin-left: 1.9px;
                        width: 10px;        
                    }

                /**/
                
                .quest-answer_body{
                    margin-top: 13px;
                    margin-bottom: 20px;
                    white-space: pre-line;
                }

                .quest-answer_bot {
                    display: flex;
                    align-items: flex-end;
                }

                    .quest-answer_user {
                        display: inline-flex;
                        align-items: center;  
                        margin-right: auto;                  
                    }
                        
                        .quest-answer_img {
                            width: 50px;
                            height: 50px;
                            border-radius: 25px;
                        }

                        .quest-answer_name {
                            margin-left: 8px;
                            margin-top: 5px;
                            font-weight: 500;
                            font-size: 1.1rem;
                        }
                        
                        .quest-answer_time {
                            color: grey;
                            font-size: 0.8rem;
                            margin-left: 13px;
                        }
                    
                    /**/

                    .quest-answer_vote{
                        display: inline-block;
                        margin-right: 5px;
                    }

                        .quest-answer_vote svg{
                            pointer-events: none;
                            height: 33px;
                            width: 33px;
                        }

                        
                    /**/

                /**/

            /**/

        </style> 
            
        <div class="quest-answers_title">
            <span class="quest-answers_title_text">
                Respostas
            </span>
        </div>

        
        
    </div>`)

    function renderAnswer (item) {
        const votedFlag = item.voted? 'true': ''
        const voteIcon = item.voted? myIcos.votePurple: myIcos.vote

        const ele = newEle(`<div id="quest-answer${item.id}" class="quest-answer background item">

            <div class="quest-answer_votes">
                <span class="quest-answer_votes_number">
                    ${item.votes}
                </span>
                ${myIcos.voteWhite}
            </div>

            <p class="quest-answer_body"></p>
            
            <div class="quest-answer_bot">                     
            
                <div class="quest-answer_user">                     
                    <img class="quest-answer_img" src="${item.user.imgSrc}">
                    <div>
                        <div class="quest-answer_name">${item.user.name}</div>
                        <span class="quest-answer_time">${item.time}</span>
                    </div>
                </div>

                <div class="quest-answer_vote" 
                    data-act="tapVoteAnswer" 
                    data-id="${item.id}"
                    data-voted="${votedFlag}"
                >
                    ${voteIcon}
                </div>

            </div>

        </div>`)

        const bodyEle = ele.querySelector('.quest-answer_body')
        bodyEle.innerText = item.body

        return ele
    }


    data.forEach((item)=>{
        const answerEle = renderAnswer(item)
        thisEle.append(answerEle)
    })




    let thisTela = newTela(thisEle)

    thisTela.addActions({
        'tapVoteAnswer' (dataSet, ele) {
            const id = parseInt(dataSet.id)

            const voting = !dataSet.voted
            dataSet.voted = voting? 'true': ''


            //Updating the number
            updateVote({id, add: voting? 1: -1})
            



            //Updating the color
            ele.innerHTML = voting?  myIcos.votePurple : myIcos.vote

 
            module.listeners.onVote(id, voting)

        }
    })






    module.addAnswer = (array) => {
        array.forEach((item)=>{
            const answerEle = renderAnswer(item)
            thisEle.append(answerEle)
        })
        
        requestAnimationFrame(()=>{
            requestAnimationFrame(()=>{
                thisEle.lastElementChild.scrollIntoView({behavior: 'smooth'})
            })
        })
    }

    module.updateVote = (id, number) => {
        
        updateVote({id, number})

    }

    module.tela = thisTela


    return module







    function updateVote ({id, number, add}) {
        
        const votesNumberEle = thisEle.querySelector(`#quest-answer${id} .quest-answer_votes_number`)
        
        if(add){ 
            const votesNumber = parseInt(votesNumberEle.innerText)
            number = votesNumber + add
        }

        
        votesNumberEle.innerText = number

    }



}
