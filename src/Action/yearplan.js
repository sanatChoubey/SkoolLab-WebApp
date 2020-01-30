import actionTypes from '../config/actionType';

export const yearlyPlan = (data) => {
    return(
        {
            type:actionTypes.ADD_YEARLY_PLAN,
            payload:data
        }
    )
}