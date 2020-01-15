import actionTypes from '../config/actionType';
export function AddColumnInitiate(data){
     return{
          type:actionTypes.ADD_COLUMN_INITIATE,
          payload:data
     }
} 