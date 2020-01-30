import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import { Dropdown, Button } from 'semantic-ui-react';
import * as firebase from 'firebase/app';
import { toastr } from 'react-redux-toastr';
import Header from '../resuable/header';

const MainWrapper = styled.div`
    width:100%;
    height:100vh;
    display:flex;
    flex-direction:column;
    padding:10px;
    

`
const columnDef = [{headerName:'Subject', field:'subject', },{headerName:'Ongoing Topic',field:'Ongoing_Topic', editable:true}]
const GoingLesson = () => {
    const db = firebase.database()
    const [classes, setClasses] = useState();
    const [selctedClasses, setSelectedClasses] = useState();
    const [rowData, setRowData] = useState();
    useEffect(()=>{
        db.ref('Class').once('value').then((snapData)=>{
            if(snapData.val()===null){
                toastr.info('Please Add Class');
            }else{
                
                const obbremover = Object.values(snapData.val())
                const mapped = obbremover.map( (data) => {
                    return(
                        {
                            text:data.Class,
                            value:data.Class,
                            key:data.Class
                        }
                    )
                })
                setClasses(mapped)   
            }
        })
    },[])
    const DropData = (e, { value }) => {
        setSelectedClasses(value);
        db
        .ref('Subject/'+value)
        .once('value')
        .then(snapdata=>{
            if(snapdata.val()===null){
                toastr.info('Please Add Sujbect to this Class')
            }else{
                const  objData = Object.values(snapdata.val());
                const mapped = objData.map(data=>{
                    return {
                        subject:data.subject
                    }
                })
                setRowData(mapped)

            }
        })

    }
    return(
        <MainWrapper>
            <Header title= {'Ongoing Topic'}/>
            <Dropdown 
                selection
                placeholder = 'select Class'
                options = { classes }
                fluid
                onChange = { DropData }
            />
              <div
                    className="ag-theme-balham"
                    style={{
                        height: '350px',
                        width: '100%',
                        marginTop:'10px'

                    }}
                >
                    <AgGridReact
                        columnDefs= {columnDef}
                        rowData={rowData}
                        defaultColDef={{resizable:true}}
                    />
                </div>
                <Button secondary>
                    Send Data
                </Button>
        </MainWrapper>
    )
}
export default GoingLesson;
