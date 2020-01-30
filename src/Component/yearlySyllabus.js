
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Dropdown, Button } from 'semantic-ui-react';
import Header from '../resuable/header';
import * as firebase from 'firebase/app';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import { yearlyPlan } from '../Action/yearplan';
import { useDispatch } from 'react-redux';


const MainWrapper = styled.div`
    width:100%;
    height:100vh;
    padding:10px;

`
const column = [
    {headerName:'Subject',field:'subject', width:400,
    cellStyle: { "white-space": "normal" },
    autoHeight:true },
    {headerName:'March',field:'March',editable:true, width:400,
    cellStyle: { "white-space": "normal" },
    autoHeight:true},
    {headerName:'Apiril',field:'Apiril',editable:true, width:400,
    cellStyle: { "white-space": "normal" },
    autoHeight:true},
    {headerName:'May',field:'May',editable:true, width:400,
    cellStyle: { "white-space": "normal" },
    autoHeight:true},
    {headerName:'June',field:'June',editable:true, width:400,
    cellStyle: { "white-space": "normal" },
    autoHeight:true},
    {headerName:'July',field:'July',editable:true, width:400,
    cellStyle: { "white-space": "normal" },
    autoHeight:true},
    {headerName:'August',field:'August',editable:true, width:400,
    cellStyle: { "white-space": "normal" },
    autoHeight:true},
    {headerName:'September',field:'September',editable:true, width:400,
    cellStyle: { "white-space": "normal" },
    autoHeight:true},
    {headerName:'October',field:'October',editable:true, width:400,
    cellStyle: { "white-space": "normal" },
    autoHeight:true},
    {headerName:'November',field:'November',editable:true, width:400,
    cellStyle: { "white-space": "normal" },
    autoHeight:true},
    {headerName:'December',field:'December',editable:true, width:400,
    cellStyle: { "white-space": "normal" },
    autoHeight:true},
    {headerName:'January',field:'January',editable:true, width:400,
    cellStyle: { "white-space": "normal" },
    autoHeight:true},
    {headerName:'Febraury',field:'febraury',editable:true, width:400,
    cellStyle: { "white-space": "normal" },
    autoHeight:true},
]
const YearlSyllabus = () => {
    const db = firebase.database();
    const dispatch = useDispatch();
    const [classes, setClass] = useState(null);
    const [rowData ,setrowData] = useState([]);
    const [selectedClass,setselectedClass] = useState(null);
    useEffect(()=>{
        db.ref('Class').once('value').then((snapdata)=>{
            if(snapdata.val()===null){

            }
            else{const obbremover = Object.values(snapdata.val()) ;
            const mappedvalue = obbremover.map(data=>{
                                    return({
                                        key:data.Class,
                                        text:data.Class,
                                        value:data.Class
                                    })
                                })
                        setClass(mappedvalue)}
        })
    },[]);
    const DropSelected = (e, { value }) => {
        setselectedClass(value)
        db.ref('yearlyPlan/'+value).on('value', snapdata => {
            if(snapdata.val()===null){
                    db.ref('Subject/'+ value).once('value').then((snapdata)=>{
                if(snapdata.val()===null){
                    setrowData([])
                }else{
                    const obbremover = Object.values(snapdata.val())
                    const mapppedCoulmn = obbremover.map(data=>{
                        return{
                            subject:data.subject
                        }
                    })
                    setrowData(mapppedCoulmn)
                }
                })
            }
            else{
                const obbremover = Object.values(snapdata.val())
                console.log('data h', snapdata.val(), obbremover)
                setrowData(obbremover)
            }
        })
        
        
    }
    const sendData = () => {
        dispatch(yearlyPlan({data:rowData,class:selectedClass}))
        
    }
    return(
        <MainWrapper>
            {console.log(rowData)}
            <Header title={'Yearly Syllabus'}/>
            <Dropdown
                fluid
                selection
                placeholder = 'Select Class'
                onChange = {DropSelected}
                options={classes}
            />

            <div
               className="ag-theme-balham"
               style={{
               height: '350px',
               width: '100%',
               marginTop:'20px',
                 }}
             >
                    <AgGridReact
                        columnDefs={column}
                        rowData={rowData}
                        rowHeight={100}
                        defaultColDef={{resizable:true}}
                    />
             </div>
             <Button secondary  onClick={sendData}>
                 Add New plan 
             </Button>
        </MainWrapper>
        
    )
}
export default YearlSyllabus;
