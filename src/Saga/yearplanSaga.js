import * as firebase from 'firebase';
import { toastr } from 'react-redux-toastr';

export function* yearPlanSaga({ payload }){
    yield console.log(payload);
    const db = firebase.database();
    db.ref('yearlyPlan/'+payload.class).set(payload.data).then(()=>{
        toastr.success('dataSend Successfully')
    })
}