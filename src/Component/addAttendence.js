import React,{ useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from '../resuable/header';
import { Dropdown,Button } from 'semantic-ui-react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import * as firebase from 'firebase/app';
import { useDispatch } from 'react-redux';
import { addAttendenceinitial } from '../Action/attendence';
const MainWrapperdiv = styled.div`
    width:100%;
    height:90vh;
    padding:10px;
    background-color:orange;
`
const ButtonWrapper = styled.div`
    width:50%;
    margin:10px;
`;
const columnData = [
    {headerName:'Sno',field:'Sno'},
    {headerName:'Student Name',field:'studentName'},
    {headerName:'March',field:'march',editable:true},
    {headerName:'apiril',field:'apiril',editable:true},
    {headerName:'May',field:'May',editable:true},
    {headerName:'June',field:'June',editable:true},
    {headerName:'July',field:'July',editable:true},
    {headerName:'August',field:'August',editable:true},
    {headerName:'September',field:'September',editable:true},
    {headerName:'October',field:'October',editable:true},
    {headerName:'November',field:'November',editable:true},
    {headerName:'December',field:'December',editable:true},
    {headerName:'January',field:'January',editable:true},
    {headerName:'Febraury',field:'febraury',editable:true},
    
];

const AddAttendence = () => {

    const [DropData, setDropData] = useState(null);
    const db = firebase.database();
    const [TableBool,setTableBool] = useState(false);
    const [addAtt, setAddAtt] = useState('');
    const [Classnme,setClassnme] = useState('');

    const dispatch = useDispatch();
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
        
    }, []);

    const changeDrop = async (e,{ value }) => {
        setClassnme(value)
        await db.ref('attendence/'+value).on('value',async (snapdata) => {
            if (snapdata.val() === null) {
                await db.ref(value).on('value', (snapdata) => {
                    if (snapdata.val() === null) {
                         console.log('noData');
                        setAddAtt([])
                    }
                    else{
                         const tableData = Object.values(snapdata.val())
                         console.log('data h',tableData)
                         setAddAtt(tableData)
                    }
                   
               })
               
           }
           else{
            const tableData = Object.values(snapdata.val())
            setAddAtt(tableData)
           }
        })
  
       setTableBool(true)

    }
    const sendDataAtt = () => {
        console.log(addAtt)
        dispatch(addAttendenceinitial({className:Classnme,attendance:addAtt}))

    }
    return(
        <div>
            <Header  title = 'Attendence'/>
            <MainWrapperdiv>
                <Dropdown
                    
                    placeholder = 'selectClass'
                    fluid
                    selection
                    onChange = {changeDrop}
                    options ={DropData}

                />
                {TableBool?<div
                     className="ag-theme-balham"
                     style={{
                          height: '350px',
                          width: '100%',
                          marginTop:'10px',
                     }}
                >
                    <AgGridReact
                        columnDefs = {columnData}
                        rowData= {addAtt}
                    />
                </div>:''}
                {TableBool? <ButtonWrapper><Button onClick = {sendDataAtt} secondary> Add Attendence </Button></ButtonWrapper>:''}
            </MainWrapperdiv>
        </div>
    )
}
export default AddAttendence;
