import actionTypes from '../config/actionType';
const initialState= {

}
 export default function messageReducer(state = initialState, {type,payload}){
     switch(type){
        case actionTypes.CLASS_MESSAGE_INITATE:
            return payload
        default :
            return state
                
     }
 }