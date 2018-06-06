/*
    module(data
        //data{roomImgSrc, roomName}
        
    module.listeners.

        onClickRoom()

        onChooseRoom()

        onClickTool()

        onOut()

        onIn()

    //

    module.setPostsTela(postsTela)
        //appends the postsTels and save it as the posts tela

    module.appendOnTop(tela)
        //appends a tela on top

    module.updateRoom(data)
        //data{roomImgSrc, roomName}
*/


_['telas/feed/view'] = function createFeedView (roomData) {
    
    const newTela = _['tools/myTelas'].new
    const newEle = _['tools/myLib'].newEle
    const makeEleGlow = _['tools/myLib'].makeEleGlow
    const nextFrame = _['tools/myFrame'].next
    const myIcos = _['img/myIcos']  
    

    let module = {}
    let noRooms = roomData === undefined
//init




//eles
    let thisEle = newEle(`<div id="feed" class="tela background footspace">
        
        <style>

            .feed-head {
                display: flex;
                align-items: center;
            }
                .feed-head_room {
                    height: 50px;
                    display: flex;
                    align-items: center;
                    font-size: 1.2rem;
                }   
                
                    .feed-head_room_img {
                        width: 40px;
                        height: 40px;
                        border-radius: 20px;
                        margin-left: 10px;
                        margin-right: 9px;
                        pointer-events: none;
                    }

                    .feed-head_room_text{
                        pointer-events: none;
                    }
            
                /**/
                
                .feed-head_noroom {
                    margin-left: 15px;
                }
                

                .feed-head_triangle {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 50px;
                    width: 40px;
                }

                    .feed-head_triangle svg {
                        height: 12px;
                        pointer-events: none;
                    }

                /**/
                        
            /**/

        </style>

        <div class="head feed-head">
            <span class="feed-head_triangle" data-act="chooseRoom">${myIcos.triangle}</span>
        </div>

        <div class="tool" data-act="feedTool">
            ${myIcos.plus}
        </div>

    </div>`)

    function renderRoom (data) {
        const noRooms = data === undefined
        let ele = undefined
        
        if(noRooms) {
            
            ele = newEle(`<span class="feed-head_noroom feed-head_room">
                Sem salas
            </span>`)    

        }
        else{

            ele = newEle(`<span class="feed-head_room" data-act="room">
                <img class="feed-head_room_img" src="${data.imgSrc}"> 
                <span class="feed-head_room_text"></span>
            </span>`)

            const roomTextEle = ele.querySelector('.feed-head_room_text')
            roomTextEle.innerText = data.name
            
        }

        return ele
    }
    
    
    let headEle = thisEle.querySelector('.feed-head')
    let toolEle = thisEle.querySelector('.tool')
    let roomEle = renderRoom(roomData)
    let triangleEle = thisEle.querySelector('.feed-head_triangle')

    headEle.prepend(roomEle)




    makeEleGlow(toolEle)
    makeEleGlow(roomEle)

//eles    





    let postsTela //Will be setup by module.setScroller



//tela
    let thisTela = newTela(thisEle)
    

    thisTela.addListeners({
        
        inForLoading() {
            thisTela.prepend(postsTela)
        },
        in() {
            module.listeners.onIn()
        },
        out() {
            postsTela.remove()
            module.listeners.onOut()            
        }

    })
    
    thisTela.addActions({
        'room' () {
            module.listeners.onClickRoom()
        },
        'chooseRoom' () {
            module.listeners.onChooseRoom()
        },
        'feedTool' () {
            module.listeners.onClickTool()
        }
    })
//tela




    
//module
    module.setPostsTela = (tela)=> {
        postsTela = tela
    }
    
    module.appendOnTop = (tela)=> {
        thisTela.append(tela) 
    }
    
    module.updateRoom = (roomData)=> {
        const newRoomEle = renderRoom(roomData)
        headEle.replaceChild(newRoomEle, roomEle)
        roomEle = newRoomEle
    }
    
    module.tela = thisTela
//module




//
    return module
}

