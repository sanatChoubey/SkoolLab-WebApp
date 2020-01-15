import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Login from './Component/Login';
import AddClass from './Component/AddClass';
import RemoveStudent from './Component/RemoveStudent';
import AddStudent from './Component/AddStudent';
import Addcolumn from './Component/addColumn';
import AddSubject from './Component/AddSubject';
import AddAttendence from './Component/addAttendence';

import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'
import * as serviceWorker from './serviceWorker';
import 'semantic-ui-css/semantic.min.css';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './Reducer/index';
import { rootSaga } from './Saga/index';
import {
     BrowserRouter as Router,
     Route,
} from 'react-router-dom';
import firebase from 'firebase';
import firebaseConfig from './config/firebaseconfig';
import ReduxToastr from 'react-redux-toastr'
firebase.initializeApp(firebaseConfig);


const sagaMiddleware = createSagaMiddleware()
const stores = createStore(rootReducer, applyMiddleware(sagaMiddleware))
sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <Provider store ={ stores }> 
     <Router>
          <div>
               <ReduxToastr
                    timeOut={4000}
                    newestOnTop={false}
                    preventDuplicates
                    position="top-right"
                    getState={(state) => state.toastr} 
                    transitionIn="fadeIn"
                    transitionOut="fadeOut"
                    progressBar
                    closeOnToastrClick
               />
               <Route exact path ='/'>
                    <App />
               </Route>
               <Route path ='/login'>
                    <Login />
               </Route>
               <Route path ='/addClass'>
                    <AddClass />
               </Route>
               <Route path ='/addStudent'>
                    <AddStudent />
               </Route>
               <Route path ='/removeStudent'>
                    <RemoveStudent />
               </Route>
               <Route path ='/addcolumn'>
                    <Addcolumn />
               </Route>
               <Route path ='/addSubject'>
                    <AddSubject />
               </Route>
               <Route path = '/addAttendence'>
                    <AddAttendence />
               </Route>
               
          </div>
     </Router>
     </Provider>
     , document.getElementById('root'));
serviceWorker.unregister();
