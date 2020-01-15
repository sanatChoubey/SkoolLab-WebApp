import * as firebase from 'firebase/app';
import { toastr } from 'react-redux-toastr';
export function* addStudentInitiate ({payload}) { 
     var db = firebase.database();
     yield db.ref(payload.selectedClass).remove()
  yield Promise.all(payload.filterData.map(async(data)=>{
      await db.ref(payload.selectedClass).push().set(data)
  }));
  toastr.success('SucessFull ', 'Added Added Student')
}