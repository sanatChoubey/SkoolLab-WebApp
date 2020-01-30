import { combineReducers } from 'redux';
import Call from './Call';
import addClass from './AddClass';
import {reducer as toastrReducer} from 'react-redux-toastr';
import AddStudent from './AddStudent';
import AddColumn from './AddColumn';
import AddSubjects from './AddSubjects';
import attendenceReducer from './Attendence';
import examResult from './resultReducer';
import messageReducer from './MessageReducer';
import AddPost from './AddPost';
import yearPlan from './yearPlan';

const rootReducer = combineReducers({
     item: Call,
     addClass,
     AddStudent,
     toastr: toastrReducer,
     AddColumn,
     AddSubjects,
     attendence:attendenceReducer,
     examResult,
     messageReducer,
     AddPost,
     yearPlan,

})
export default rootReducer;