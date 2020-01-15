import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button,Dropdown } from 'semantic-ui-react';
import Header from '../resuable/header';
import * as firebase from 'firebase/app';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import { AddColumnInitiate } from '../Action/Addcolumn';
import  { useDispatch } from 'react-redux';

const MainWrapper = styled.div`
     width:100%;
     height:100%;


`
const InnerWrapper = styled.div`
     width:100%;
     height:50vh;
     display:flex;
     flex-direction: row;
     flex-wrap:wrap;
`
const Margindiv = styled.div`
     margin:15px;
`
const Column = [
     {headerName:'HeaderName', field:'headerName',editable:true},
     {headerName:'FieldName', field:'field',editable:true  },
]
const AddColumn = () => {
     const dispatch = useDispatch();
     const [sum, setsum] = useState([]);
     const [Dropdata, setDropdata] = useState([]);
     const [boolTable,setboolTable] = useState(false);
     const [rowData,setrowData] = useState([{},{},{},{},{},{},{},{},{},{}]);
     const[dropselectedData,setdropselecteddata] = useState('')
     const db = firebase.database();
     const fetchDataforColumnfor = () => {
          try{
               db.ref('columnfor').once('value').then((memo)=>{
                   const Columndb = Object.values(memo.val())
                   var changedcoln = Columndb.map((data)=>{
                         return {
                              key:data.key,
                              value:data.key,
                              text:data.key
                         }
                   })
                   console.log(changedcoln)
                   setDropdata(changedcoln)
               })
          }catch(e){

          }
     }
     const fetchcolumn = ( ) =>{
          try{
               db.ref('column/'+dropselectedData).once('value').then(res=>{
                    if(res.val()===null){
                         console.log('null',res.val())
                    }else{
                         var removeObj = Object.values(res.val())
                         console.log('rowData',removeObj,res.val())

                         setrowData(removeObj)
                    }
               })
          }catch(e){

          }
     }
     useEffect(()=>{
          console.log('datadrop',dropselectedData)
          fetchDataforColumnfor();
          fetchcolumn();
     },[dropselectedData])

     const dropfunc = (e, {value}) => {
          setboolTable(true)
          setdropselecteddata(value)
     }
     const handleDataforColmn = () =>{
          dispatch(AddColumnInitiate({dropselectedData,rowData}))
     }
     const AddRows = () => {
          setrowData([...rowData,{}]);
     }
     return(
          <div>
              <Header title={"ADD Column"}/> 
              <MainWrapper>
                    <InnerWrapper>
                         <Margindiv>
                              <Dropdown placeholder='Select Column'
                                        fluid
                                        style={{width:'550px'}}
                                        selection
                                        onChange={dropfunc}
                                        options={Dropdata}/>
                              
                         </Margindiv>
                         <Margindiv>
                             <Button secondary onClick={AddRows}>Add Rows to Table</Button>
                         </Margindiv>
                         {boolTable? <div
                                   className="ag-theme-balham"
                                   style={{
                                        height: '350px',
                                        width: '100%',

                                   }}
                              >
                                   <AgGridReact
                                        columnDefs={Column}
                                        rowData={rowData}
                                   />
                              </div>:''}
                    </InnerWrapper>
                    {boolTable?<Button style ={{margin:'50px'}} onClick ={handleDataforColmn}secondary>
                         Add Column     
                    </Button>:''}
              </MainWrapper>
          </div>
     )
}
export default AddColumn;
