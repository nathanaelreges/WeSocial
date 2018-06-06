_['telas/room/view'] = function createRoomView (data) {  

    const newTela = _['tools/myTelas'].new
    const newEle = _['tools/myLib'].newEle
    const time = _['tools/myTime']
    const makeEleGlow = _['tools/myLib'].makeEleGlow
    const myIcos = _['img/myIcos']
    
    let module = {}

    




////////////// handling DOM
    let thisEle = newEle(`<div id="room" class="tela background room">
        
        <style>
            .room-head {
                display: flex;
                align-items: center;
            }

                .room-head_title {
                    font-size: 1.2rem;   
                }   
            
            /**/
            
            .room-scroller {
                display: flex;
                flex-direction: column;
            }
            
                .room-scroller > div {
                    flex-shrink: 0;
                }
                
                .room-spacebox {
                    flex-grow: 1;
                }

                .room-detail_box {
                    padding-bottom: 10px;
                    text-align: center;
                    background: white;
                }

                    .room-img {
                        margin-top: 24px;
                        display: inline-block;
                        height: 220px;
                        width: 220px;
                        border-radius: 100%;
                    }

                    .room-name {
                        margin-top: 25px;
                        font-size: 1.3rem;
                        font-weight: 600;
                        letter-spacing: 1px;
                    }

                /**/

                .room-members_box {
                margin: 25px 10px 0px 10px;
                padding-bottom: 25px;
                background: white;
                }
                    
                    .room-members_title{
                        font-weight: 500;
                        padding-top: 20px;
                        padding-bottom: 17px;
                        margin-left: 20px;
                        font-size: 1.4rem;
                    }

                    .room-members_number {
                        display: inline-block;
                        text-align: center;
                        
                        height: 1.1875rem;
                        width: 1.1875rem;
                        box-sizing: content-box;
                        padding: 4px;

                        font-size: 1rem;
                        font-weight: 400;
                        color: white;
                        background: ${myIcos.color};
                        border-radius: 100%;
                    }

                    .room-member {
                        margin-top: 15px;
                    }

                        .room-member_img {
                            display: inline-block;
                            vertical-align: middle;
                            height: 50px;
                            width: 50px;
                            border-radius: 100%;
                            margin-left: 15px;
                        }

                        .room-member_name {
                            display: inline-block;
                            margin-left: 7px;
                            vertical-align: middle;
                            letter-spacing: 0.7px;
                        }

                    /**/

                /**/

                .room-buttons_box{
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    margin-top: 25px;
                    padding: 16px;
                    background: white;
                }
                
                    .room-button {
                        padding: 6px 23px;
                        color: white;
                        border-radius: 21px;
                        letter-spacing: 0.7px;
                        font-weight: 300;
                        font-size: 1.1rem;
                    }
                    
                    .room-leave {
                        background: #bd1a1a;
                        margin-top: 10px;
                    }
                    
                    .room-invite {
                        background: ${myIcos.color};
                    }

                /**/
            

        </style> 
        

        <div class="scroller headspace room-scroller">
        
            <div class="room-detail_box">
                <img class="room-img" src="${data.imgSrc}"></img>
                <div class="room-name"></div>
            </div>
            
            <div class="room-members_box item">
                <div class="room-members_title">
                    Participantes <span class="room-members_number">${data.members.length}</span>
                </div>
                ${data.members.reduce(renderMember, '')}
            </div>
            
            <div class="room-spacebox"></div>

            <div class="room-buttons_box">

                <div class="room-invite room-button" data-act="tapInvite"> 
                    Convidar
                </div>

                <div class="room-leave room-button" data-act="tapLeave"> 
                    Sair da Sala
                </div>
            
            </div>

        </div>

        <div class="room-head head"> 
            <span class="arrow" data-act="goBack">${myIcos.arrow}</span>
            <span class="room-head_title">Sala</span>
        </div>
        
    </div>`)

    function renderMember (prev, item) {
        return prev + `<div class="room-member">
            <img class="room-member_img" src="${item.imgSrc}"></img>
            <div class="room-member_name">${item.name}</div>     
        </div>`
    }


    const roomNameEle = thisEle.querySelector('.room-name')
    const inviteEle = thisEle.querySelector('.room-invite')
    const leaveEle = thisEle.querySelector('.room-leave')
    
    
    
    roomNameEle.innerText = data.name
    makeEleGlow(inviteEle)
    makeEleGlow(leaveEle)

    let thisTela = newTela(thisEle)

    thisTela.addActions({
        
        'tapLeave'() {
            module.listeners.onLeaveRoom()
        },
        
        'tapInvite'() {
            module.listeners.onInvite()
        }

    })





    module.appendTela = (tela) => {
        thisTela.append(tela)
    }

    module.tela = thisTela

    return module

}

