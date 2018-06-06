/*
    module.listeners.
        onStateUpdate(state)
            state => boolean
    //

    module.
        updateTitle()
        updateBody()
        addTag()
        removeTag()
        get()
    //
*/

_['telas/newQuest/model'] = function createNewQuestionModel () {  

    const createAllValid = _['tools/myLib'].createAllValid



    let theData = {title: "", body: "", tags: []}
    
    let module = {}





    
///////////////////setting allValid

    let allValid = createAllValid()
    
    allValid.listeners = {
        onStateUpdate(allValid) {
            module.listeners.onStateUpdate(allValid)
        }
    }
    
    const allValid_UpdateTitle = allValid.addRule('emptyString')
    const allValid_UpdateBody = allValid.addRule('emptyString')
    const allValid_UpdateTags = allValid.addRule( x=> x.length > 0 )


///////////////////setting allValid

    
    
    
///////////////////module

    module.updateTitle = (text) => { 
    
        theData.title = text
        
        allValid_UpdateTitle(text)
    }
    
    module.updateBody = (text) => {  
        
        theData.body = text
        
        allValid_UpdateBody(text)

    }
    
    
    let pseudoTags = []
    
    module.addTag = (tagData) => {
        
        //updating
        const index = pseudoTags.push(tagData) - 1
        theData.tags.push(tagData)

        allValid_UpdateTags(theData.tags)

        return index

    }

    module.removeTag = (index) => {
              
        //updating
        const realIndex = theData.tags.indexOf(pseudoTags[index])
        pseudoTags[index] = undefined
        theData.tags.splice(realIndex, 1)
        
        allValid_UpdateTags(theData.tags)

    }


    module.get = () => theData 

///////////////////module


    return module
}





















