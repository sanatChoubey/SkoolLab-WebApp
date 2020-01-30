import React,{ useState, useEffect } from 'react';
import Header from '../resuable/header';
import { Dropdown,Button, Input } from 'semantic-ui-react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import * as firebase from 'firebase/app';
import styled from 'styled-components';
import { toastr } from 'react-redux-toastr';
import { AddNewResultInitiate, EditNewResultInitiate } from '../Action/resultAction';
import { useDispatch } from 'react-redux';

const MainWrapperdiv = styled.div`
    width:100%;
    height:88vh;
    padding:10px;
    background-color:orange;
`

const InputWrapperDiv = styled.div`
     width:100%;
     margin-top:10px;
     display:flex;
     flex-direction:column;
`;

const ColumnWrapper = styled.div`
     display:flex;
     flex-direction:row;
     width:100%;
     justify-content:space-around
`

const AddExamMarks = () =>{
     const [dropBool, setDropBool] = useState(false);
     const [dropData, setDropData ] = useState([]);
     const [dropBool2, setDropBool2 ] = useState(false);
     const [BoolButton, setBoolButton ] = useState(false);
     const [column,setcolumn] = useState(null);
     const [rowDate,setRowDate] = useState(null);
     const [addDate,setaddData] = useState(null);
     const [classData,setClassData] = useState('');
     const [drop2,setDrop2] = useState(null);
     const [editTestExam,seteditTestExam] = useState('');
     const dispatch = useDispatch()
     const db = firebase.database();
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
                    })
                    setDropData(createDrop)
               })
          } catch (e) {

          }
     },[])
     const dropSelected = async (e, { value }) => {
          setClassData(value)
          setDrop2(null);
          setRowDate(null);
          await db.ref('Subject/'+value).on('value' ,async (snapdata) => {
               if(snapdata.val()=== null){
                    toastr.info(`Please add Subject for ${value}`)
                    setcolumn([])
               }else{
                    const columnData = Object.values(snapdata.val());
                    const mappedDataForColumn = columnData.map(({ subject })=>{
                         return {
                              headerName:subject,
                              field:subject,
                              editable:true
                         }
                    })
                    setcolumn([{headerName:'Sno',field:'Sno'},{headerName:'StudentName',field:'studentName'},...mappedDataForColumn])
                    
               }
          })

          
          setBoolButton(true)
     }
     const dropSelectedAddorEdit = async (e,{value}) => {
          if(value==='Add'){
               setDropBool2(false)
               setDropBool(true);
               await db.ref(classData).on('value',(snapdatarow)=>{
                    if(snapdatarow.val()===null){
                         toastr.info(`Please Add Student Data to ${value}`)
                    }else{
                         const obbvalue = Object.values(snapdatarow.val());
                         console.log('akhiri',obbvalue)
                         setRowDate(obbvalue)
                    }
               })
          }
          if(value==='Edit'){
               setDropBool(false);
               setDropBool2(true);
               setRowDate(null)
               await db.ref('exams/'+classData).on('value',(snapdatarow)=>{
                    if(snapdatarow.val()===null){
                         toastr.info(`Please Add Student Data to ${value}`)
                    }else{
                         const obbvalue = Object.keys(snapdatarow.val());
                         console.log('akhiri',obbvalue)
                         var dropalready= obbvalue.map((data)=>{
                              return(
                                   {
                                        text:data,
                                        value:data,
                                        key:data
                                   }
                              )
                         })
                         setDrop2(dropalready)

                         //setRowDate(obbvalue)
                    }
               })
          }
          
     }
     const handleAddresult = (e) => {
          setaddData(e.target.value)
     }
     const addDatasend = () =>{
          dispatch(AddNewResultInitiate({class:classData,addDate,rowDate}))
     }
     const EditDataForexam = async(e,{ value }) => {
          seteditTestExam(value)
         await db.ref('exams/'+classData+'/'+value).on('value',(snapdata)=>{
              if(snapdata.val()===null){
                   toastr.error('no data availabele');
              }else{
                   const obbremove = Object.values(snapdata.val())
                   console.log(obbremove)
                    setRowDate(obbremove)
              }
         })
     }
     const editDatasend = () => {
          dispatch(EditNewResultInitiate({class:classData,editTestExam,rowDate}))
     }

     return(
          <div>
               <Header title = 'Add Exam Marks'/>
               <MainWrapperdiv>
                    <ColumnWrapper>
                    <Dropdown
                         style={{width:'40%'}}
                         placeholder = 'selectClass'
                         fluid
                         selection
                         onChange = {dropSelected}
                         options ={dropData}
                    />
                    {BoolButton?
                         <Dropdown
                         style={{width:'40%'}}
                         
                         placeholder = 'Select to Add or Edit Exam'
                         fluid
                         selection
                         onChange = {dropSelectedAddorEdit}
                         options ={[{text:'Add New Exam result ',value:'Add',key:'1'},
                         {text:'Edit Existing Exam result',value:'Edit',key:'2'}]}
                    />:''
                    }
                    </ColumnWrapper>
                    <InputWrapperDiv >
                         {dropBool ? <Input onChange = {handleAddresult} placeholder = "Add Test Name"/>:''}
                         
                         {dropBool?
                              <div 
                                   className="ag-theme-balham"
                                   style={{
                                        height: '350px',
                                        width: '100%',
                                        marginTop:'10px',
                                   }}
                              >
                                   <AgGridReact
                                        columnDefs={column}
                                        rowData = {rowDate}
                                   />
                              </div>     
                         :''}
                         {dropBool?<Button onClick = {addDatasend}style={{width:'250px',marginTop:'10px'}}secondary>
                              Add New Result Marks
                         </Button>:''}
                    </InputWrapperDiv>
                    <InputWrapperDiv >
                         {dropBool2 ? <Dropdown fluid selection options={drop2} onChange={EditDataForexam} placeholder = "Edit Test Name"/>:''}
                         
                         {dropBool2?
                              <div 
                                   className="ag-theme-balham"
                                   style={{
                                        height: '350px',
                                        width: '100%',
                                        marginTop:'10px',
                                   }}
                              >
                                   <AgGridReact
                                        columnDefs={column}
                                        rowData = {rowDate}
                                   />
                              </div>     
                         :''}
                         {dropBool2?<Button onClick = {editDatasend}style={{width:'250px',marginTop:'10px'}}secondary>
                              Edit Exam Marks
                         </Button>:''}
                    </InputWrapperDiv>
               </MainWrapperdiv>
          </div>
     )
}
export default AddExamMarks;