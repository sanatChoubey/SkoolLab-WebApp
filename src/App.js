import React,{ useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Call } from './Action/call'
import './App.css';

function App() {
  const dis = useDispatch()
  useEffect(()=>{
    console.log('j')
    dis(Call())
  },[])
  
  return (
    <div onClick={()=>{
      console.log('hello')
      dis(Call())
    }} className="App">
      hellos 
    </div>
  );
}

export default App;
