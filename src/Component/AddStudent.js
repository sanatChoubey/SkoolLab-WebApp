import React, { useEffect, useState } from 'react';
import Header from '../resuable/header';
import styled from 'styled-components';
import * as firebase from 'firebase';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import { Button, Dropdown, } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { addStudentInitiate } from '../Action/AddStudent';

const MainWrapper = styled.div`
width:100%;
height:100vh;

`
const SelectionContainer = styled.div`

     width:100%;
     margin:10px;
     height:100px;
`
const ItemContainer = styled.div`
     width:100%;
     justify-content:space-around;
     display:flex;
     flex-direction:row;

`
const TableWrapper = styled.div`
     margin:10px
`
const AddStudent = () => {
     const dispatch = useDispatch();
     const db = firebase.database()
     const [DropData, setDropData] = useState(null);
     const [studentList, setStudentList] = useState('');
     const [selectedClass,setSelectedClass] = useState('');
     const [Column,setColumn] = useState([{headerName:'Sno',field:'Sno',editable:true}])
     const [TableBool,setTableBool] = useState(false);

     useEffect(() => {
          try {
               db.ref('Class').once('value').then((snapdata) => {
                    var memo = Object.values(snapdata.val())
                    var createDrop = memo.map(bs => {
                         return {
                              key: bs.Class,
                              value: bs.Class,
                              text: bs.Class
                         }
                    })
                    setDropData(createDrop)
               })
          } catch (e) {

          }
     }, [])
    
     const HandleDrop = async (e, { value }) => {
          setSelectedClass(value)
          var list = []
          for (var i = 1; i < 101; i++) {
               var obb = { "Sno": i }
               list.push(obb)
          }
          const columnData = await db.ref('column/'+'AddStudent').once('value')
          if(columnData.val()){
               const obbColumn = Object.values(columnData.val())
               var dd = obbColumn.map(data=>{
                    return{
                         ...data,
                         editable:true
                    }
               })
               setColumn(dd)
               }
          await db.ref(value).on('value', (snapdata) => {
               if (snapdata.val() === null) {
                    setStudentList(list)

               }
               else{
                    const tableData = Object.values(snapdata.val())
                    const length = tableData.length+1;
                    var listadd=[];
                    for(var i = length; i < 101; i++){
                         var obb = { "Sno": i }
                         listadd.push(obb)
                    }
                    setStudentList([...tableData,...listadd])
               }
              
          })
          setTableBool(true)
          console.log(studentList)
     }
     const SendData = () => {
          var filterData = studentList.filter(data=>{
               return data.studentName
          })
          console.log('filterData',filterData)
          dispatch(addStudentInitiate({selectedClass,filterData}))
     }
     const ShowTable = () => {
          if (TableBool) {
               return (
                    <TableWrapper>
                         <div
                              className="ag-theme-balham"
                              style={{
                                   height: '350px',
                                   width: '100%',

                              }}
                         >
                              <AgGridReact
                                   columnDefs={Column}
                                   rowData={studentList}
                              />
                         </div>
                    </TableWrapper>
               )
          }
         
     }
     return (
          <MainWrapper>
               <Header title="Add Student"></Header>
               <ItemContainer>
                    <SelectionContainer>
                         <label style={{ marginLeft: '40%', fontSize: '22px', fontWeight: '700', color: '#192a56' }}>Select Class</label>
                         <Dropdown
                              label={"Select Class"}
                              placeholder='Select Class'
                              fluid
                              onChange={HandleDrop}
                              selection
                              options={DropData}
                         />
                    </SelectionContainer>
               </ItemContainer>
               {ShowTable()}
               {TableBool?<Button style={{margin:'10px'}} secondary onClick={SendData}>ADD Students</Button>:''}
          </MainWrapper>
     )
}
export default AddStudent;