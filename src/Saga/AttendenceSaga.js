import * as firebase from 'firebase/app';
import { toastr } from 'react-redux-toastr';

 
export function* AddAttendenceSaga ({ payload }) {
    const db = firebase.database();
    yield console.log(payload);
    const lengthofData = payload.attendance.length - 1;
   
    yield Promise.all(payload.attendance.map(async (sendData,i)=>{
        if(i===lengthofData){
            await db.ref('attendence/'+ payload.className)
            .push()
            .set(sendData)
            .then(()=>{
                toastr.success('send data');
            })
        }else{
            await db.ref('attendence/'+payload.className)
            .push()
            .set(sendData)
        }

    }))

}