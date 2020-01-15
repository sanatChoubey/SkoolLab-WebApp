import actionTypes from '../config/actionType';
const initialState = {

}
export default function AddStudent(state=initialState,{type,payload}){
     switch(type){
          case actionTypes.ADD_STUDENT_INITIATE:
               return {...payload};
          default :
          return state     
     }
} 