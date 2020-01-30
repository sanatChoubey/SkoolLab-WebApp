import actionTypes from '../config/actionType';

export const ClassMsgInitate = (data) => (
    {
        type: actionTypes.CLASS_MESSAGE_INITATE,
        payload: data
    }
)
export const StudentMsgInitate = (data) => (
    {
        type:actionTypes.STUDENT_MSG_INITIATE,
        payload:data
    }
)