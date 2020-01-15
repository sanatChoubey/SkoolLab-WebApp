import  actionTypes from '../config/actionType'
export function AddClassInitiate(data){
     return{
          type:actionTypes.ADD_CLASS_INITIATE,
          payload:data,
     }
     
}