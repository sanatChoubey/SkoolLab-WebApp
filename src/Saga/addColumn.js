import * as firebase from 'firebase';
import { toastr } from 'react-redux-toastr';

export function* AddColumn({payload:{dropselectedData,rowData}}){
     var filterColumndata = rowData.filter(daata=>{
          return daata.headerName && daata.field
     })
     yield firebase.database().ref('column/'+dropselectedData).remove()
     yield Promise.all(filterColumndata.map(async(data)=>{
          await firebase.database()
          .ref('column/'+dropselectedData)
          .push()
          .set(data)
     }))
     toastr.success('Add Column','ADDED')
     
}