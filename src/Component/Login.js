import React ,{ useReducer } from 'react';
import { Button,Form ,Card, Icon,} from 'semantic-ui-react';
import styled from 'styled-components';
import * as firebase from 'firebase';

const ErrorPara = styled.p`
color: red;
`
const initialState = {
     email:'',
     password:'',
     error:'',
}

const Login = () => {
     const HandleChange = (event)=>{
          const { name, value } = event.target
          state[name]= value
          updateState({
               ...state
          })  
     }      
     const HandleSubmit =()=> { 
          console.log(state)
          firebase.auth().signInWithEmailAndPassword(state.email, state.password).then((res)=>{
               console.log(res)
          }).catch(function(error) {
            var errorCode = error.code;
            state["error"] = errorCode
            updateState({
              ...state
            })
          });
     }
     const updateReducer = (prevState={},nextState={})=>({...prevState,...nextState})
     const [state,updateState]= useReducer(updateReducer,initialState);

     return(
          <div className="App">
          <Icon  size='massive' color ="blue"name='lock' />
          <h3><b>Login </b></h3>
          <Card style={{width:'450px',padding:"5px"}}>
          <Form>
            <Form.Field>
              <label>Email Id</label>
              <input name = 'email' onChange={HandleChange} placeholder='Email Id' />
            </Form.Field>
            <Form.Field>
              <label>Password</label>
              <input type = "password" onChange={HandleChange} name = 'password'
              placeholder='Password' />
            </Form.Field>
               <ErrorPara>{state.error}</ErrorPara>
            <Button  primary onClick={HandleSubmit} >Login </Button>
          </Form>
          </Card>
          
        </div>
     )
}
export default Login;
