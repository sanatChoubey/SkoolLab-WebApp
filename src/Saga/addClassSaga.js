import * as firebase from 'firebase/app';
import {toastr} from 'react-redux-toastr'

export function* addClassInitate({payload}){
     const db = firebase.database()
     yield db.ref('Class').push().set(payload)
     toastr.success('hello','sucess')   

}