/*
    module(data)
        data{
            typePost: true;
            content: 'oi';
            imgSrc: 'img.jpg';
            time: '11h'
            new: true;
            number: 10;
        }
        

    
    module.user.

        more()
            //recives a promise to be resolved with older items then the prior ones, if there are any
            //.then(data) data is the same as the initial

    //
    
    
    module.listeners.

        onTapPost(id, {wasUnseen, alertId})
            it alerts if the user tapped a post and informs the id
        //
        
        onTapQuest(id, {wasUnseen, alertId})
            it alerts if the user tapped a quest and informs the id
        //



    //

    module.

        processUpdates(string, more) 
            string == 'sendItemToTop' 
                more = {index, number, time}
                The view removes the item at the specified index and then puts it at the top
                    then updates the number of news and the time in that item
            //

            string == 'addItemToTheTop' 
                more = data
                Makes a new item with the specified data (the same as the initial data) 
                and adds to the top od the list
            //

            string == 'removeItem'
                more = index
                Just removes the item at the specified index
            //
        //

    //
*/


_['telas/alert/scrollerView'] = function createScrollerView (data) {
    
    const newTela = _['tools/myTelas'].new
    const newEle = _['tools/myLib'].newEle
    const getRenderedList = _['tools/renderedList']
    const makeEleGlow = _['tools/myLib'].makeEleGlow
    const thisUserData = _['WSAPI'].user
    const myIcos = _['img/myIcos']  
    

    let module = {}
//init




//eles
    let thisEle = newEle(`<div class="tela headspace">
        <style>

            .alert-item{
                display: flex;
                margin: 10px 4px 0px 4px;
                
                
                font-size: 0.9rem;
            }

                .alert-item * {
                    pointer-events: none;
                }
                
                .alert-item_post{
                    display: flex;
                    align-items: center;
                    padding: 10px 10px 10px 6px;
                    height: 71px;
                    flex-grow: 1;
                }

                    .alert-item_post_img{
                        border-radius: 50%;
                        width: 42px;
                        height: 42px;
                        flex-shrink: 0;
                    }

                    
                    .alert-item_post_content{
                        margin-left: 6px;
                        overflow: hidden;
                        
                        max-height: 51px;
                        line-height: 17px;
                    }
                
                /**/    
                
                .alert-item_detail {
                    padding: 5px 5px 5px 5px;
                    flex-shrink: 0;
                    color: grey;
                    width: 51px;
                    font-size: 0.8rem;
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    border-left: 1px solid lightgray;
                    margin: 5px 0px;
                    color: grey;
                }
                
                
                    .alert-item_detail_new {
                        color: ${myIcos.color};
                    }
                    
                    
                    .alert-item_detail_time{
                        
                    }

                    .alert-item_detail_number{
                        background: ${myIcos.color};
                        color: white;
                        border-radius: 100%;
                        display: none;
                        padding: 4px;
                        margin: auto 0px;
                        font-size: 0.7rem;
                        height: 1.4rem;
                        width: 1.4rem;
                        text-align: center;
                    }

                    .alert-item_detail_new .alert-item_detail_number {
                        display: inline-block;
                    }    

                /**/
                
                .alert-item_quest{
                    display: flex;
                    align-items: center;
                    padding: 10px 10px 10px 6px;
                    height: 71px;
                    flex-grow: 1;
                }

                    .alert-item_quest_img{
                        display: inline-block;
                        font-size: 2.6rem;
                        margin-left: 6px;
                        font-weight: 300;
                    }

                    
                    .alert-item_quest_content{
                        flex-grow: 1;
                        margin-left: 6px;
                        overflow: hidden;
                        max-height: 51px;
                        margin-right: 2px;
                        
                        line-height: 17px;

                        text-align: center;
                    }

                    .alert-item_quest_userimg {
                        width: 30px;
                        height: 30px;
                        flex-shrink: 0;
                        border-radius: 50%;
                    }
                
                /**/ 
            
            /**/

            .alert-scroller {
                padding-bottom: 10px;
            }

        </style>
        
                
        <div class="scroller alert-scroller">
        </div>

    </div>`)

    const scrollerEle = thisEle.querySelector('.scroller')


    function renderItem (data) {


        const thisEle = document.createElement('div')
        thisEle.className = 'alert-item item'
        thisEle.dataset.act = "itemTap"
        thisEle.dataset.id = data.id
        thisEle.dataset.alertid = data.alert.id
        
        
        
        

            if(data.type == 'post') {
                
                thisEle.dataset.typePost = 'true'
            
                var bodyEle = document.createElement('div')
                bodyEle.className = 'alert-item_post'

                    const imgEle = document.createElement('img')
                    imgEle.src = data.user.imgSrc
                    imgEle.className = 'alert-item_post_img'

                    const contentEle = document.createElement('div')
                    contentEle.innerText = data.content
                    contentEle.className = 'alert-item_post_content'

                bodyEle.append(imgEle, contentEle)
            
            }
            else if(data.type == 'quest') {    
            
                var bodyEle = document.createElement('div')
                bodyEle.className = 'alert-item_quest'

                    const imgEle = document.createElement('div')
                    imgEle.innerText = '?'
                    imgEle.className = 'alert-item_quest_img'

                    const contentEle = document.createElement('div')
                    contentEle.innerText = data.title
                    contentEle.className = 'alert-item_quest_content'

                bodyEle.append(contentEle)

                if(data.user == thisUserData){
                    const userQuestImgEle = document.createElement('img')
                    userQuestImgEle.src = data.user.imgSrc
                    userQuestImgEle.className = 'alert-item_quest_userimg'
                    
                    bodyEle.append(userQuestImgEle)
                }

                bodyEle.append(imgEle)
            
            }
            

            
            const detailEle = document.createElement('div')
            detailEle.className = 'alert-item_detail'
                
                var numberEle = document.createElement('div')
                numberEle.innerText = data.alert.unseenNumber
                numberEle.className = 'alert-item_detail_number'
            
                const timeEle = document.createElement('div')
                timeEle.innerText = data.alert.time
                timeEle.className = 'alert-item_detail_time'
            
            detailEle.append(timeEle, numberEle)        
            


            if(data.alert.unseen) {
                detailEle.classList.add('alert-item_detail_new')
                thisEle.dataset.new = 'true'
            }
            else{
                thisEle.dataset.new = 'false'
            }



        thisEle.append(bodyEle, detailEle)    
        

        return thisEle
    }    



//eles    




    



//tela

    let thisTela = newTela(thisEle)

    thisTela.addActions({
        'itemTap' (dataset, ele) {
            const wasUnseen = dataset.new === 'true'

            if(wasUnseen){
                dataset.new = 'false'
                ele.querySelector('.alert-item_detail').classList.remove('alert-item_detail_new')
            }

            if(dataset.typePost){
                module.listeners.onTapPost(dataset.id)
            }
            else{
                module.listeners.onTapQuest(dataset.id)
            }


        }
    })

//tela



//renderedList

    const arrayOfEles = getArrayOfEles(data)
    arrayOfEles.slice().reverse().forEach(x=>scrollerEle.append(x))
    

//renderedList







//module

    module.processUpdate = (type, data) => {
        
        if(type === 'sendItemToTop') {
            const {index, number, time} = data    
            const ele = arrayOfEles.splice(index, 1)[0]
            const unseen = number>0

            ele.remove()

            ele.dataset.new = unseen
            ele.querySelector('.alert-item_detail_number').innerText = number
            ele.querySelector('.alert-item_detail_time').innerText = time
            
            if(unseen)
                ele.querySelector('.alert-item_detail').classList.add('alert-item_detail_new')
            //
            
            arrayOfEles.push(ele)
            scrollerEle.insertAdjacentElement('afterBegin', ele)
        }
        else 
        if(type === 'addItemToTop') {
            const item = data
            const itemEle = renderItem(item)

            arrayOfEles.push(itemEle)
            scrollerEle.insertAdjacentElement('afterBegin', itemEle)
        }
        else
        if(type === 'removeItem') {
            const index = data
            const ele = arrayOfEles.splice(index, 1)[0]
            ele.remove()
        }
        else
        if(type === 'clearUnseen') {
            const index = data
            const ele = arrayOfEles[index]

            if(ele.dataset.new == 'true') {
                ele.dataset.new = 'false'
                ele.querySelector('.alert-item_detail').classList.remove('alert-item_detail_new')
            }
        }
        
    }

    module.clearSaveScroll = () => {
        thisTela.setSavedScrollValue(0)
    }


    module.tela = thisTela

//module




//
    return module







    function getArrayOfEles (data) {
        return data.map(renderItem)
    }





}


