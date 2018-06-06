/*
    module({activeRoom, rooms [{id: 0, name: ''}]})

    module.listeners.

        onChooseRoom(roomId)
            //user cliked on a room

        onAdRoom()
            //user cliked on Criar Sala Button
    //

    module.tela
        //this tela
*/


_['telas/feed/chooseRoomView'] = function createChooseRoomView (data) {
    
    const newTela = _['tools/myTelas'].new
    const newEle = _['tools/myLib'].newEle
    const makeEleGlow = _['tools/myLib'].makeEleGlow
    const myIcos = _['img/myIcos']
    const myTime = _['tools/myTime']
    
    const module = {}
    let thisTelaWasRemoved = false
    let myTimeId = undefined
//init




//eles
    let thisEle = newEle(
        `<div id="chooseroom" class="chooseroom">
            
            <style>
                .chooseroom {
                    position: fixed;
                    height: 100%;
                    width: 100%;
                    overflow: hidden;
                }

                .chooseroom-container {
                    display: inline-block;
                }
                
                    .chooseroom-theroom_container {
                        color: white;
                        width: 100%;
                        position: relative;
                        z-index: 2;

                        display: flex;
                        align-items: center;
                        background-color: ${myIcos.color};

                        border-radius: 0px 0px 0px 15px;
                    }
                    
                        .chooseroom-theroom {
                            height: 50px;
                            display: flex;
                            align-items: center;
                            font-size: 1.2rem;
                        }

                            .chooseroom-theroom *{
                                pointer-events: none;
                            }
                        
                            .chooseroom-theroom_img {
                                width: 40px;
                                height: 40px;
                                border-radius: 20px;
                                margin-left: 10px;
                                margin-right: 9px;
                                pointer-events: none;
                            }

                            

                        /**/

                        .chooseroom-theroom_noroom {
                            margin-left: 15px;
                        }


                        .chooseroom-theroom_triangle {
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            height: 50px;
                            width: 40px;
                        }

                            .chooseroom-theroom_triangle svg {
                                height: 12px;
                                transition: transform 0.25s;
                                will-change: transform;
                                pointer-events: none;
                            }

                        /**/
                    
                    /**/   


                    .chooseroom-buttonsBox {
                        will-change: transform;
                        position: relative;
                        top: -30px;
                        padding-top: 35px;
                        padding-bottom: 5px;
                        z-index: 1;

                        margin-right: 30px;

                        transition: 0.15s transform;

                        border-radius: 0px 0px 15px 15px;
                    }
            
                        .chooseroom-button {
                            display: flex;
                            align-items: center;
                            font-size: 1.1rem;  
                            padding: 4px;
                            padding-right: 10px;
                            padding-left: 10px;
                        }
                        
                            .chooseroom-button *{
                                pointer-events: none;
                            }
                        
                            .chooseroom-button_img {
                                pointer-events: none;
                                width: 40px;
                                height:  40px;
                                border-radius: 20px;    
                                margin-right: 9px;
                            }
                        
                            .chooseroom-button svg {
                                pointer-events: none;
                                width: 40px;
                                height:  40px;
                                background-color: white;
                                border-radius: 20px;    
                                margin-right: 5px;
                            }

                        /**/

                    /**/
                
                /**/

            </style>

            <div class="chooseroom-container">
    
                <div class="chooseroom-theroom_container">
                    <span class="chooseroom-theroom_triangle">${myIcos.triangle}</span>
                </div>


                <div class="chooseroom-buttonsBox shadow background">
                    <div class="chooseroom-button" data-act="addRoom">
                        ${myIcos.plusPurple}
                        <span>Criar sala</span>
                    </div>
                </div>    

            </div>
        </div>`
    )

    function renderRoom (data) { 
        const ele = newEle(`
            <div class="chooseroom-button" data-act="changeRoom" data-id="${data.id}">
                <img class="chooseroom-button_img" src="${data.imgSrc}">
                <span class="chooseroom-button_txt">${data.name}</span>
            </div>
        `)
        ele.querySelector('.chooseroom-button_txt').innerText = data.name
        return ele
    }


    function renderTheRoom (data) {
        const noRooms = data === undefined
        let ele = undefined
        
        if(noRooms) {
            ele = newEle(`<span class="chooseroom-theroom chooseroom-theroom_noroom">
                <span class="chooseroom-theroom_text">Sem salas</span>
            </span>`)
        }
        else{
            ele = newEle(`<span class="chooseroom-theroom">
                <img class="chooseroom-theroom_img" src="${data.imgSrc}">
                <span class="chooseroom-theroom_text"></span>
            </span>`)
            const textEle = ele.querySelector('.chooseroom-theroom_text')
            textEle.innerText = data.name
        }

        return ele
    }

    const buttonsBoxEle = thisEle.querySelector('.chooseroom-buttonsBox')
    const theRoomContainerEle = thisEle.querySelector('.chooseroom-theroom_container')
    const triangleEle = thisEle.querySelector('.chooseroom-theroom_triangle svg')
    const theRoomEle = renderTheRoom(data.activeRoom)
    
    theRoomContainerEle.prepend(theRoomEle)



    //Add the roomButtons
    data.rooms.forEach((item)=>{
        buttonsBoxEle.insertAdjacentElement('afterbegin', renderRoom(item))
    })


    //Translate out so it can transform in after
    buttonsBoxEle.style.transform = `translateY(-${calculateHeight() + 5}px)`




    //Make the buttons glow responsive
    const buttonElesArray = Array.from(buttonsBoxEle.children)
    
    buttonElesArray.forEach(buttonEle => {
        makeEleGlow(buttonEle)
    })






    //tela
    const thisTela = newTela(thisEle)
    
    thisTela.addActions({
        'changeRoom': (data)=> {
            const roomId = parseInt(data.id)
            
            closeController('roomClick', {id: roomId})
        },

        'addRoom': (data)=> {
            closeController('addRoomClick')
        }
    })

    
    thisTela.addListeners({
        in () {
            //Translate In
            buttonsBoxEle.style.transform = ""
            triangleEle.style.transform = "rotate(180deg)"

            onTouchedOutside(closeController.bind(undefined, 'outsideClick'))
            
            myTimeId = myTime.addFun(closeController.bind(undefined, 'timeClick'))
        },

        out () {
            if(!thisTelaWasRemoved){
                myTime.remove(myTimeId)
                thisTela.remove()
            }
        }
    })






    





    //module
    module.tela = thisTela











    return module


    
    function closeController (type, data) { 
        
        if(type != 'timeClick') {
            myTime.remove(myTimeId)
        }

        if(type === 'timeClick') {
            runCloseAnimation().then(removeTela)
        }
        else 
        if(type === 'outsideClick') {
            runCloseAnimation().then(removeTela)
        }
        else
        if(type === 'addRoomClick') {
            module.listeners.onAddRoom()
        }
        else
        if(type === 'roomClick') {
            runCloseAnimation().then(()=>{
                removeTela()
                requestAnimationFrame(()=>{
                    requestAnimationFrame(()=>{
                        module.listeners.onChooseRoom(data.id)
                    })
                })
            })
        }


        function removeTela () {
            thisTela.remove()
            thisTelaWasRemoved = true
        }
    }





    function runCloseAnimation ({onSlided, onEnd} = {}) {
        buttonsBoxEle.style.transform = `translateY(-${calculateHeight() + 5}px)`
        triangleEle.style.transform = ""
        
        return new Promise(resolve=>{
            buttonsBoxEle.addEventListener('transitionend', resolve, {once: true})
        })
        
    }


    



    function calculateHeight () {
        const numberOfItems = data.rooms.length + 1
        return (40 + 18) * numberOfItems
        //height + padding
    }






    function onTouchedOutside (onTouched) {
        let alreadyChecked = false

        //If touching not on a button them close the menu
        thisEle.addEventListener('touchstart', checkTouch, {passive: true})

        thisEle.addEventListener('mousedown', checkTouch, {passive: true})
    

        function checkTouch (e) {
            if(alreadyChecked){return}
        
            if(!buttonsBoxEle.contains(e.target)){
                onTouched()
                alreadyChecked = true
            }
        }


    }
}   





/* let data = {
    active: {imgsrc: 'img/calc.jpg', name: 'ENGELEUNITAU'},
    rooms: [
        {imgsrc: 'img/calc.jpg', name: 'ENGELEUNITsdasdAU', id: 1},
        {imgsrc: 'img/calc.jpg', name: 'ENGELEUNITAU', id: 2},
        {imgsrc: 'img/calc.jpg', name: 'ENGELEUNITAU', id: 3},
        {imgsrc: 'img/calc.jpg', name: 'ENGELEUNITAU', id: 4}
    ]
}*/
