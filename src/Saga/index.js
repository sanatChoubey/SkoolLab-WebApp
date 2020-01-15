import { takeLatest } from 'redux-saga/effects';
import actionTypes from '../config/actionType';
import { addClassInitate } from './addClassSaga';
import { addStudentInitiate } from './addStudentInitiate';
import { AddColumn } from './addColumn';
import { AddSubjectInitate } from './AddSubjects';
import { AddAttendenceSaga } from './AttendenceSaga';
function* send({ payload }) {
    yield console.log(payload)
}

export function* rootSaga() {
    yield takeLatest('CALL', send);
    yield takeLatest(actionTypes.ADD_CLASS_INITIATE, addClassInitate)
    yield takeLatest(actionTypes.ADD_STUDENT_INITIATE,addStudentInitiate)
    yield takeLatest(actionTypes.ADD_COLUMN_INITIATE,AddColumn)
    yield takeLatest(actionTypes.ADD_SUBJECTS_INITIATE,AddSubjectInitate)
    yield takeLatest(actionTypes.ADD_ATTENDENCE_INITIATE,AddAttendenceSaga)
}