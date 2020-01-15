import * as firebase from  'firebase';
import { toastr } from 'react-redux-toastr';

export function* AddSubjectInitate({payload}){
     
          const db = firebase.database();
          yield db.ref('Subject/'+ payload.classnames).remove();
          const lengthOfData = payload.rowData.length-1;
          const  filterdata = payload.rowData.filter(data=>{
               return Object.keys(data).length !== 0 && data.subject && data.subjectNumber;
          })
          yield console.log(payload.rowData,'filter',filterdata)
      yield Promise.all[filterdata.map(async(data,i)=>{
           
           if(i===lengthOfData){
               await db.ref('Subject/'+payload.classnames).push().set(data).then(()=>{
                    console.log('done')
                    toastr.success('sucessFull added');
               }).catch(e=>{
                    console.log(e,e.message,)
                    toastr.error(e.message)
               })
           }
          else {await db.ref('Subject/'+payload.classnames).push().set(data).catch(e=>{})}
     })]
     

   
}