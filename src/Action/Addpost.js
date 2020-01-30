import actionTypes from '../config/actionType';

export const AddPost = (data) => ({
    type: actionTypes.ADD_POST_INITIATE,
    payload:data
})