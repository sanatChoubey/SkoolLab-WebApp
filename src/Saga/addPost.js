import * as firebase  from 'firebase';
import { toastr } from 'react-redux-toastr';

export function* AddPostSaga({ payload }){
    yield 
    var storageRef = firebase.storage().ref();
    const db = firebase.database();
    const uploadTask = storageRef.child('Image/'+payload.Image[0].name).put(payload.Image[0]);
    
    uploadTask.on('state_changed', function(snapshot){
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        toastr.info( `${progress}% uploaded`)
        
    
      }, function(error) {
        toastr.error(error.code)

      }, function() {
        
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            db.ref('post')
            .push()
            .set({Date:Date.now(),title:payload.title,description:payload.description, photo:downloadURL})
            .then(()=>{
                toastr.success('SucessFully Uploaded Data');
            })

        });
      });
}