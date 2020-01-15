import actionTypes from '../config/actionType';

const intialState = {

}
export default function AddColumn(state = intialState, {type, payload}){
     switch(type){
          case actionTypes.ADD_COLUMN_INITIATE:
               return payload
          default:
               return state     
     }

}