import React,{ useEffect,useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Call } from './Action/call'
import './App.css';
import * as firebase from 'firebase';

function App() {
  const dis = useDispatch()
  const divref = useRef(null)
  useEffect(()=>{
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(window.recaptcha, {
      'size': 'normal',
      'callback': function (response) {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        // ...
        console.log(response)
      },
      'expired-callback': function () {
        // Response expired. Ask user to solve reCAPTCHA again.
        // ...
      }
   });
   window.recaptchaVerifier.render().then(function (widgetId) {
     window.recaptchaWidgetId = widgetId;
   });
  },[]);
  
  const onSignInSubmit = () => {
    var appVerifier = "03AOLTBLTBZc67ccG-DniAJuNjBiKh_geKpyuVz0nnKr85alTDVy6BRi2q340dgXOZ33uh1csXjsIKIVIA3R1gZmS1YqM3fi1SgM89bCj47fTPKAlNl00NSSBULn6qLwm-Mf33DY-0xunW53S3AHRuOP9b32cMDMwpFoN9E5xiImPUpSW_iHtrxHWgAPYFyFGLK6zOZMQeDqksyk-GXISPc-T3rXbZ7CsSwSYkSPMSzHwpENp_C-B9DU0c0j7b1JZwW-7F-oUiMoxFIwnDSKAkXuLJsAWLgReaZNTLMhKNcnSTignKpujirwD3w4uPTyspUUp1PHxkA5XWMsRY5CW4UJDkLGmCziPTXAvYRSp-hqm30Ol4Vgz8FCbRvg5DoYUqvEf8F-PWwGpG3Auh8mZ7H5ehxIUA7eB12ebsZiFcvWdUZFwVqytXQbJSvkfOBpO1dD6ZMtd75R9gkMLxGIqCuRAD_ffmCWoJLMvtp0kFlUhAJKvvq1qsBPLmvyGfX-sNj8YIqB18LFfGgwL4LAsPR1gcUhn-K0pMtQ"
    firebase.auth().signInWithPhoneNumber('+919770003301',appVerifier)
        .then(function (confirmationResult) {
          // SMS sent. Prompt user to type the code from the message, then sign the
          // user in with confirmationResult.confirm(code).
          console.log(confirmationResult)
          window.confirmationResult = confirmationResult;
          confirmationResult.confirm(1234).then(function (result) {
            // User signed in successfully.
            var user = result.user;
            // ...
          }).catch(function (error) {
            // User couldn't sign in (bad verification code?)
            // ...
            console.log(error)
          });

        }).catch(function (error) {
          // Error; SMS not sent
          // ...
          console.log(error)
        });
  }
 

  const sendMessage = (e) => {
    console.log('done')

  }
  return (
    <div className="App">
      <div value = 'all'ref={(ref)=>{window.recaptcha=ref}}></div>
      <button id = 'sign-in-button' onClick= {onSignInSubmit}>
        click
      </button>
    </div>
  );
}

export default App;
