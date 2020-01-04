import { takeEvery } from 'redux-saga/effects'
function* send({payload}){
    yield console.log(payload)
}

export function* rootSaga(){
     yield takeEvery('CALL', send)
}