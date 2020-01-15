import { combineReducers } from 'redux';
import Call from './Call';
import addClass from './AddClass';
import {reducer as toastrReducer} from 'react-redux-toastr';
import AddStudent from './AddStudent';
import AddColumn from './AddColumn';
import AddSubjects from './AddSubjects';
import attendenceReducer from './Attendence';

const rootReducer = combineReducers({
     item: Call,
     addClass,
     AddStudent,
     toastr: toastrReducer,
     AddColumn,
     AddSubjects,
     attendence:attendenceReducer
})
export default rootReducer;