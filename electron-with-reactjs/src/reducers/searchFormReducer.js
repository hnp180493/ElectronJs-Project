
const searchFormReducer = (state = {}, action) =>{
    switch(action.type){
        case "SEND_PARAMS_FORM":
            return {...action.params};
        default:
            return state;
    }
}

export default searchFormReducer;