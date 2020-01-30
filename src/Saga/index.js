import { takeLatest } from 'redux-saga/effects';
import actionTypes from '../config/actionType';
import { addClassInitate } from './addClassSaga';
import { addStudentInitiate } from './addStudentInitiate';
import { AddColumn } from './addColumn';
import { AddSubjectInitate } from './AddSubjects';
import { AddAttendenceSaga } from './AttendenceSaga';
import { examResultAddSagaInitate, examResultEditSagaInitate } from './examsResultSaga';
import { messageClassSaga, messageForStudentSaga } from './MessageSaga';
import { AddPostSaga } from './addPost';
import { yearPlanSaga } from './yearplanSaga';


export function* rootSaga() {
    yield takeLatest(actionTypes.ADD_CLASS_INITIATE, addClassInitate)
    yield takeLatest(actionTypes.ADD_STUDENT_INITIATE,addStudentInitiate)
    yield takeLatest(actionTypes.ADD_COLUMN_INITIATE,AddColumn)
    yield takeLatest(actionTypes.ADD_SUBJECTS_INITIATE,AddSubjectInitate)
    yield takeLatest(actionTypes.ADD_ATTENDENCE_INITIATE,AddAttendenceSaga)
    yield takeLatest(actionTypes.ADD_NEW_RESULT_INITATE,examResultAddSagaInitate)
    yield takeLatest(actionTypes.EDIT_RESULT_INITATE,examResultEditSagaInitate)
    yield takeLatest(actionTypes.CLASS_MESSAGE_INITATE,messageClassSaga);
    yield takeLatest(actionTypes.STUDENT_MSG_INITIATE,messageForStudentSaga);
    yield takeLatest(actionTypes.ADD_POST_INITIATE, AddPostSaga);
    yield takeLatest(actionTypes.ADD_YEARLY_PLAN, yearPlanSaga);
}