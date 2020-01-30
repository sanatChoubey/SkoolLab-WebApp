import actionTypes from '../config/actionType';

const initialState = {};

export default function AddPost(state=initialState, {type,payload} ) {
     switch(type){
          case actionTypes.ADD_POST_INITIATE:
               return payload;
          default :
               return state;     
     }
}