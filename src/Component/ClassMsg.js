import React, { useEffect, useState } from 'react';
import Header from '../resuable/header';
import styled from 'styled-components';
import { Dropdown,TextArea, Button } from 'semantic-ui-react';
import * as firebase from 'firebase';
import { useDispatch } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import { ClassMsgInitate } from '../Action/MessageAction';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';


const MainWrapper = styled.div`
    width:100%;
    height:80vh;
    background-color:orange;
    padding:10px;
`
const HeadingWrapper = styled.div`
    font-size:32px;
    font-weight:700;
    border-bottom:2px solid grey;
    height:5%;
    width:20%;
    color:white;
    margin-top:10px;
`
const ColumnAgi = [
    {headerName:'Date',field:'Date',width:400},
    {headerName:'Message', 
    field:'classMsg',
    width:400,
    cellStyle: { "white-space": "normal" },
    autoHeight:true
},
]
const ClassMsg = () => {
    const db = firebase.database();
    const [dropData,setDropData] = useState(null);
    const [bool,setbool] = useState(false);
    const [inputMsg,setInputMsg] = useState(null);
    const [className,setClassName] = useState(null);
    const [rowData,setRowData] = useState(null);
    const dispatch = useDispatch()
    const awaitFunction = () => {
        db.ref('Class').on('value',(snapData)=>{
            if(!snapData.val()){
                console.log('no data')
            }else{
                var obbconvertor = Object.values(snapData.val());
                const mappedforDrop = obbconvertor.map((data)=>({
                    text:data.Class,
                    key:data.Class,
                    value:data.Class
                }))
                setDropData(mappedforDrop)
            }
        })
    }
    useEffect(() => {
        awaitFunction();

    },[])

    const dataClicked = (e,{value}) => {
            setbool(true)
            setClassName(value)
            db.ref('MesagebyClass/'+value)
                .on('value', snapdata =>{
                    if(snapdata.val()){
                        console.log(snapdata.val())
                        const obbremover = Object.values(snapdata.val())
                        const mapedData = obbremover.map(data=>{
                            return(
                                {
                                    ...data,
                                    Date:new Date(data.Date)
                                }
                            )   
                        })
                        setRowData(mapedData)
                    }else{
                        setRowData(null)
                    }
                })

    }
    const sendMsg = () => {
        if(!inputMsg && !inputMsg.length>3){
            toastr.info('Please Add Message')
        }
        else{
            dispatch(ClassMsgInitate({className,inputMsg}))
            setInputMsg('')
        }
    }
    const storeDaat = (e) => {
        setInputMsg(e.target.value)
    }

    return (
        <div>
            <Header title= 'Message by Class'></Header>
            <MainWrapper>
                <Dropdown
                placeholder="Select Class"
                selection
                fluid
                onChange={dataClicked}
                options={dropData}
                
                ></Dropdown>
                
                    {
                        bool?<TextArea value = {inputMsg}onChange={storeDaat} style={{marginTop:'10px',width:'100%',height:'30vh'}} placeholder='Tell us more' />:''
                    }
                    {
                        bool?<Button onClick = {sendMsg} secondary>
                            Send Message
                        </Button>:''
                    }
                    { bool?
                        <HeadingWrapper>
                             Messages
                        </HeadingWrapper>:''
                    }
                    {  bool?<div 
                                   className="ag-theme-balham"
                                   style={{
                                        height: '280px',
                                        width: '100%',
                                        marginTop:'10px',
                                   }}
                              >
                                   <AgGridReact
                                        defaultColDef={{resizable:true}}
                                        columnDefs={ColumnAgi}
                                        rowData = {rowData}
                                        rowHeight={100}

                                   />
                              </div> :''}   
            </MainWrapper>
        </div>
    )
}
export default ClassMsg;