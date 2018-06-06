
/*
    module(data)

    module.listeners.
        onWriteAnswer()
        onVote()
        onGoBack()
    //

    module.updateVotes()
        //updates the number of votes

    module.setAnswersTela()
        //pass the tela with the answers
    
    module.setWriteAnswerTela(tela)
        //show tela to write Answer

    module.resetWriteAnswerTela() 
        //hide tela to write answer

    module.toggleButtons()
        //show or hide buttons


*/



_['telas/quest/view'] = function createQuestView (data, bellState) {  

    const newTela = _['tools/myTelas'].new
    const newEle = _['tools/myLib'].newEle
    const makeEleGlow = _['tools/myLib'].makeEleGlow
    const mutateAndFade = _['tools/myLib'].mutateAndFade
    const myIcos = _['img/myIcos']
    
    let module = {}

    




////////////// handling DOM
    let thisEle = newEle(`<div id="quest" class="tela quest">
        
        <style>
            .quest {
                background: white;
            }

            .quest-head {
                display: flex;
                align-items: center;
                z-index: 1;
            }
    
                .quest-head_title {
                    font-size: 1.2rem;
                    letter-spacing: 0.5px;   
                }

                .quest-head_bell{
                    height: 100%;
                    background: ${myIcos.color};
                    margin-left: auto;
                }
    
                    .quest-head_bell svg{
                        height: 100%;
                        padding: 10px;
                        pointer-events: none;
                    }
    
                /**/   

            /**/

            .quest-quest {
                padding: 19px 3% 0px 3%;
            }
            
                .quest-quest_user {
                    display: flex;
                    align-items: center;
                    
                }
                    
                    .quest-quest_img {
                        width: 50px;
                        height: 50px;
                        border-radius: 25px;

                        margin-left: 4px;
                    }

                    .quest-quest_name {
                        margin-left: 8px;
                        margin-top: 5px;
                        font-weight: 500;
                        font-size: 1.1rem;
                    }
                    
                    .quest-quest_time {
                        color: grey;
                        font-size: 0.8rem;
                        margin-left: 13px;
                    }
                
                /**/

                .quest-quest_title {
                    //font-size: 1.2rem;
                }
                
                .quest-quest_body {
                    white-space: pre-line;
                }

                .quest-quest_tags {
                    margin-bottom: 20px;
                }

                    .quest-quest_tag {
                        font-size: 0.8rem;
                        color: ${myIcos.color};
                        margin-right: 15px;
                    }

                /**/

                .quest-quest_buttons {
                    padding-bottom: 10px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                    .quest-quest_buttons_hide {
                        display: none;
                    }
                
                    .quest-quest_answerit{
                        background: ${myIcos.color};
                        padding: 6px 20px;
                        flex-grow: 0;
                        color: white;
                        border-radius: 21px;
                        margin-left: 6px;
                    }


                    .quest-quest_vote {
                        margin-right: 11px;
                        width: 45px;
                        white-space: nowrap;
                    }

                        .quest-quest_vote svg{
                            height: 45px;
                            width: 45px;

                            padding: 7px;
                            background: ${myIcos.color};
                            border-radius: 100%;
                            display: inline;
                            vertical-align: middle;
                        }

                        .quest-quest_vote_number{
                            background: grey;
                            width: 20px;
                            height: 20px;
                            border-radius: 100%;

                            color: white;
                            font-size: 0.72rem;

                            display: inline-flex;
                            align-items: center;
                            justify-content: center;

                            transform: translate(-20px, -15px);
                        }

                        .quest-quest_vote * {
                            pointer-events: none;
                        }

                        .quest-quest_vote_voted .quest-quest_vote_number{
                            background: ${myIcos.color}; 
                        }

                    /**/

                /**/

            /**/

        </style> 

        <div class="quest-head head"> 
            <span class="arrow" data-act="questGoBack">${myIcos.arrow}</span>
            <span class="quest-head_title">Pergunta</span>

            <div class="quest-head_bell" data-act="tapBell">
                ${bellState? myIcos.bellOn : myIcos.bell}
            </div>
        </div>  

        
    </div>`)
        
    
   const scrollerEle = newEle(`<div class="scroller headspace"> 
        <div class="quest-quest"> 
            
            <div class="quest-quest_user">                     
                <img class="quest-quest_img" src="${data.user.imgSrc}">
                <div>
                    <div class="quest-quest_name">${data.user.name}</div>
                    <span class="quest-quest_time">${data.time}</span>
                </div>
            </div>

            <h3 class="quest-quest_title">
            </h2>
            
            <p class="quest-quest_body"></p>

            <div class="quest-quest_tags">
            </div>


            <div class="quest-quest_buttons">

                <div class="quest-quest_answerit" data-act="tapWriteAnswer">
                    Responder
                </div>

                <div class="quest-quest_vote quest-quest_button ${data.voted? 'quest-quest_vote_voted':''}" 
                  data-act="tapVoteQuestion">                    
                    ${myIcos.voteWhite}            
                    <div class="quest-quest_vote_number">
                        ${data.votes}   
                    </div>
                </div>

            </div>

        </div>

        
    </div>`)

    
    const answerItEle = scrollerEle.querySelector('.quest-quest_answerit')
    const voteButtonEle = scrollerEle.querySelector('.quest-quest_vote')
    const voteNumberEle = scrollerEle.querySelector('.quest-quest_vote_number')
    const buttonsEle = scrollerEle.querySelector('.quest-quest_buttons')
    const tagsEle = scrollerEle.querySelector('.quest-quest_tags') 
    const titleEle = scrollerEle.querySelector('.quest-quest_title') 
    const bodyEle = scrollerEle.querySelector('.quest-quest_body')
    let bellEle = thisEle.querySelector('.quest-head_bell')



    makeEleGlow(voteButtonEle)
    makeEleGlow(answerItEle)

    data.tags.forEach((tagData) => {
        const ele = newEle(`<span class="quest-quest_tag"></span>`)
        ele.innerText = tagData.name
        tagsEle.append(ele)
    })

    titleEle.innerText = data.title
    bodyEle.innerText = data.body



    
    
    let scrollerTela = newTela(scrollerEle)




    let thisTela = newTela(thisEle)

    thisTela.addActions({
        'questGoBack'() {
            module.listeners.onGoBack()
        },

        'tapWriteAnswer' () {
            module.listeners.onWriteAnswer()
        },

        'tapBell' () {
            changeBell()
        },
        
        'tapVoteQuestion' (dataSet, ele) {
            const voting = ele.classList.toggle('quest-quest_vote_voted')
            const oldNumber = parseInt(voteNumberEle.innerText)
            voteNumberEle.innerText = oldNumber + (voting? 1 : -1)
            module.listeners.onVote(voting)
        }
    })

    thisTela.append(scrollerTela)






    //Holding space for the Wirte Answer Tela
    let writeEle = newEle('<div></div>')
    let writeTela = newTela(writeEle)
    scrollerTela.append(writeTela)











    module.setAnswersTela = (tela) => {
        scrollerTela.append(tela)
    }

    
    module.setWriteAnswerTela = (tela) => {   
        writeTela.replace(tela)
    
        module.resetWriteAnswerTela = () => {   
            tela.replace(writeTela)
        }
    }

    


    module.toggleButtons = () => {
        buttonsEle.classList.toggle('quest-quest_buttons_hide')
    }


    module.updateVotes = (number) => {      
        voteNumberEle.innerText = number;
    }

    module.tela = thisTela







    return module



    
    function changeBell () {
        bellState = !bellState


        module.listeners.onChangeAlert(bellState)

    
        mutateAndFade(bellEle, (clone) => {
            clone.innerHTML = bellState? myIcos.bellOn : myIcos.bell
            bellEle = clone
        })
    }

}
