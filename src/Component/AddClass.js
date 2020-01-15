import React ,{ useState, useEffect }from 'react';
import styled from 'styled-components';
import { Input, Button } from 'semantic-ui-react';
import Header from '../resuable/header';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import { useDispatch } from 'react-redux';
import { call } from 'redux-saga/effects'
import { AddClassInitiate } from '../Action/AddClass';
import * as firebase from 'firebase';

const ItemContainer = styled.div`
     width:100%;
     height:86vh;
     background-color:#f1f2f6;
     display:flex;
     flex-direction:column;

`
const MainWrapper = styled.div`
width:100%;
height:100vh;

`
const AddWrapper = styled.div`
    align-items: center;
    justify-content: center;
    display: flex;
    margin-top: 10px;
`
const ErrorPara = styled.p`
color: red;
`
var dataClass = []
const AddClass =() =>{
     const dispatch = useDispatch();
     const [column, setColumn] = useState([{headerName:'Classes in your School',field:'Class', }]);
     const [classData,setclassData] = useState([]);
     const [Class,setClass] = useState('')
     const [errors,setError] = useState('');
     const db = firebase.database();
     useEffect(()=>{
         db.ref('Class').on('value',snapdata=>{
              try{var ClassArray = Object.values(snapdata.val());
              ClassArray.sort(memo=>{
                   return memo.name
              })
              setclassData(ClassArray)}
              catch(e){
                   console.log(e)
              }

         })
     },[])

     const listofClassadded = ()=>{
          return(
             <div style= {{margin:'10px'}}>
                    <div
               className="ag-theme-balham"
               style={{
               height: '350px',
               width: '100%',
               
           }}
             >
                    <AgGridReact
                    columnDefs={column}
                    rowData={classData}
                    onRowClicked = {params=>{console.log('hello',params.data)}}
                    />
             </div>
             
             </div>
          )
     }
     const onSubmit = ()=>{
               if(Class.length<6){
                    setError('** please use Correct Class Name')
               }else{
                    dispatch(AddClassInitiate({'Class':Class}))
                    setClass('')
               }   
     }
     const changeText =(e) => {
          setClass(e.target.value)
     }

     return(
        <MainWrapper>
             <Header title={'ADD Classes'}></Header>
              <ItemContainer>
                    <Input style={{margin:'5px'}} onChange ={changeText} value = {Class} placeholder='Add Class example = 9A or 10A or 11Commerce or 12mathscience'/>  
                    <ErrorPara>{errors}</ErrorPara>
                    <AddWrapper><Button onClick={onSubmit }basic color='blue' content='ADD CLASS' /></AddWrapper>
                    {listofClassadded()}

              </ItemContainer>
     </MainWrapper>     
     )
}
export default AddClass;
