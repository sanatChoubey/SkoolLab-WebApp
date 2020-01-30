import actiontypes from '../config/actionType';

export const AddNewResultInitiate = (data) => {
    return({
        type:actiontypes.ADD_NEW_RESULT_INITATE,
        payload:data
    })
}
export const EditNewResultInitiate = (data) =>{
    return ({
        type:actiontypes.EDIT_RESULT_INITATE,
        payload:data
    })
}