import actiontypes from '../config/actionType';
const initialState = {

}
export default function attendenceReducer(state= initialState, { type, payload }){
    switch(type){
        case actiontypes.ADD_ATTENDENCE_INITIATE:
            return payload;
        default:
            return state;    
    }
} 