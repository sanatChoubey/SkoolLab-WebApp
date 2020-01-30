import actiontypes from '../config/actionType';
const inttialState ={

}
export default function examResult(state=inttialState,{type,payload}){
    switch(type){
        case actiontypes.ADD_NEW_RESULT_INITATE:
            return payload;
        case actiontypes.EDIT_RESULT_INITATE:
            return payload;    
        default:
            return state;    
    }
}