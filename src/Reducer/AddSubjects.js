import actionTypes from '../config/actionType';

const initialState = {};

export default function AddSubjects(state=initialState, {type,payload} ) {
     switch(type){
          case actionTypes.ADD_CLASS_INITIATE:
               return state;
          default :
               return state;     
     }
}