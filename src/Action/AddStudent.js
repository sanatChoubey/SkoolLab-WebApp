import actionTypes from '../config/actionType';

export const addStudentInitiate = (data) => (
     {
          type:actionTypes.ADD_STUDENT_INITIATE,
          payload:data
     }
)