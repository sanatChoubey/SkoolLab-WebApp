import { toastr } from 'react-redux-toastr';
import * as firebase from 'firebase/app';

export function* examResultAddSagaInitate({payload}){
    const db = firebase.database();
    if(!payload.addDate){
        yield toastr.info('Please Add Exam Name');
    }else{
        console.log(payload.rowDate)
        db.ref('exams/'+payload.class+"/"+payload.addDate)
        .set(payload.rowDate)
        .then(()=>{
            toastr.success('Done')
        }).catch((e)=>{
            console.log(e);
        })
    }
}
export function* examResultEditSagaInitate({payload}){
    console.log(payload)
    const db = firebase.database();
    if(!payload.editTestExam){
        toastr.error('please select Test first')
    }else{
        yield db.ref('exams/'+payload.class+'/'+payload.editTestExam).remove();
        yield db.ref('exams/'+payload.class+'/'+payload.editTestExam)
                .set(payload.rowDate)
                .then(()=>{
                    toastr.success('Done')
                }).catch((e)=>{
                    console.log(e);
                })
    }
}