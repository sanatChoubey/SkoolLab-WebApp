import actionTypes from '../config/actionType';

const initialState = {};

export default function yearPlan(state=initialState, {type, payload}){
    switch(type){
        case actionTypes.ADD_YEARLY_PLAN:
            return payload;
        default :
            return state;    
    }
}