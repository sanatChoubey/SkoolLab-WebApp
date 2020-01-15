import actionTypes from '../config/actionType';
export const addAttendenceinitial = ( data )=> {
    return(
        {
            type:actionTypes.ADD_ATTENDENCE_INITIATE,
            payload:data
        }
    )
}
