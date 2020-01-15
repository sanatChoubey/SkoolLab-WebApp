import actionTypes from '../config/actionType';
const initialState = {};

export default function addClass(state=initialState, {type,payload}){
     switch (type){
          case actionTypes.ADD_CLASS_INITIATE:
               return payload
          default :
               return state     
     }
}