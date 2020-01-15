import React, { useState, useEffect } from 'react';
import Header from '../resuable/header';
import styled from 'styled-components';
import * as firebase from 'firebase';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import { Button, Dropdown, } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { AddSubjectsinitiate } from '../Action/AddSubjects';

const MainWrapper = styled.div`
     width:100%;
     

` ;
const ItemWrapper = styled.div`
     width:100%;
     height:50vh;
     padding:20px;
`
const Column = [
     {headerName:'Subject Number', field:'subjectNumber',editable:true},
     {headerName:"Subject Name",field:'subject',editable:true},
]
const ButtonWrapper = styled.div`
     width:100%;
     margin-top:10px;

`
const AddSubject = () => {
     const dispatch = useDispatch();
     var db = firebase.database();
     const [DropData, setDropData] = useState(null);
     const [classnames, setclassnames] = useState(null);
     const [boolTable, setBoolTable] = useState(false);
     useEffect(()=>{
          try {
               
               db.ref('Class').once('value').then((snapdata) => {
                    var memo = Object.values(snapdata.val())
                    var createDrop = memo.map(bs => {
                         return {
                              key: bs.Class,
                              value: bs.Class,
                              text: bs.Class
                         }
                    });
                    setDropData(createDrop)
               });
          } catch (e) {

          }
     },[]);
     const [rowData,setRowData] = useState('');
     const onDropHandle = async (e, { value }) => {
          
          setclassnames(value)
         await  db.ref('Subject/'+value).on('value', snapdata=>{
               if(snapdata.val()=== null){
                    console.log('nahi ha data');
                    setRowData([{},{},{}])
               }
               else{
                    console.log('data ha', snapdata.val())
                    var subjects = Object.values(snapdata.val())
                    setRowData(subjects)
               }
          })
          setBoolTable(true)

     }
     const handleAddRow = ( ) =>  {
          setRowData([...rowData , {}]);
     }
     const sendSubjects = () => {
          console.log(rowData)
          dispatch(AddSubjectsinitiate({classnames,rowData}))
     }
     return (
          <MainWrapper>
               {console.log('i am row',rowData)}
               <Header title='Add Subject' />
               <div style={{width:'100%',margin : '10px',paddingRight:'50px'}}>
               <Dropdown 
                    style={{margin:'20px',marginRight:'50px'}}
                    label = {'Select Class' }
                    placeholder = "Select Class "
                    onChange={onDropHandle} 
                    selection
                    fluid
                    options = {DropData}
                    
                />
                </div>
               {boolTable?<Button style = {{margin:'30px'}} secondary onClick = { handleAddRow}>
                    Add Subject Row 
               </Button>:''}
               <ItemWrapper>
               {boolTable ? <div
                         className="ag-theme-balham"
                         style={{
                              height: '350px',
                              width: '100%',
                              

                         }}
                    >
                         <AgGridReact
                              columnDefs={Column}
                              rowData ={rowData}
                         />
                    </div> : ''}
                    {boolTable?<ButtonWrapper >
                         <Button secondary onClick= {sendSubjects}>
                              Add Subjects to Class 
                         </Button>
                    </ButtonWrapper>:''}
               </ItemWrapper>
          </MainWrapper>
     )
}
export default AddSubject;


