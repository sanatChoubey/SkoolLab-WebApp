import * as fireabase from 'firebase';
import { toastr } from 'react-redux-toastr';
export function* messageClassSaga ({ payload }){
    const db = fireabase.database();
    yield db.ref('MesagebyClass/'+payload.className).push().set({
        classMsg:payload.inputMsg,
        Date:Date.now()
    }).then(()=>{
        toastr.success('message has been sent')
    });

}
export function* messageForStudentSaga ({ payload }){
    const db = fireabase.database();
    yield db.ref('messageforStudent/'+payload.className+'/'+payload.studentName)
    .push()
    .set({
        msg:payload.inputMsg,
        Date:Date.now()
    }).then(()=>{
        toastr.success('message has been sent')
    });
    
}