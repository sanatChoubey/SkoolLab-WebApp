import actionTypes from '../config/actionType'
export const Call = ()=>{
     console.log('called')
     return({
          type: actionTypes.CALL,
          payload:'hello dada saga !!!'

     })
}