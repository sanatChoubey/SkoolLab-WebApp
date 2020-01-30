import React, { useEffect, useState } from 'react';
import Header from '../resuable/header';
import styled from 'styled-components';
import { Dropdown,TextArea, Button } from 'semantic-ui-react';
import * as firebase from 'firebase';
import { useDispatch } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import { ClassMsgInitate, StudentMsgInitate } from '../Action/MessageAction';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';


const MainWrapper = styled.div`
    width:100%;
    height:80vh;
    background-color:orange;
    padding:10px;
`
const TwoDropWrapper = styled.div`
    display:flex;
    width:100%;
    flex-direction:row;
    

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
    field:'msg',
    width:400,
    cellStyle: { "white-space": "normal" },
    autoHeight:true
},
]

const StudentMsg = () => {
    const db = firebase.database();
    const [dropData,setDropData] = useState(null);
    const [dropData2,setDropData2] = useState(null);
    const [bool,setbool] = useState(false);
    const [bool2,setbool2] = useState(false);
    const [inputMsg,setInputMsg] = useState(null);
    const [className,setClassName] = useState(null);
    const [rowData,setRowData] = useState(null);
    const [ studentName, setStudentName] = useState(null);
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
          
            db.ref(value).once('value').then(res=>{
                if(res.val()===null){
                    setDropData2(null)
                    setRowData(null)
                }else{
                    const removerobject = Object.values(res.val());
                    console.log(removerobject)

                    const mapped = removerobject.map(data=>{
                        return({
                            text:data.studentName,
                            key:data.studentName,
                            value:data.studentName,
                        })
    
                    })
                    setDropData2(mapped)
                }
            })

    }
    const dataClicked2 = async (e, {value})=> {
        setbool2(true)
        setRowData(null)
        setStudentName(value)
        await db.ref('messageforStudent/'+className+'/'+value).on('value',(snapData)=>{
            if(snapData.val()===null){
                toastr.info('No Msg')
            }else{
                const objectremover = Object.values(snapData.val());
                const mappedData = objectremover.map(data=>{
                    return{
                        Date:new Date(data.Date),
                        msg:data.msg
                    }
                })
                setRowData(mappedData)

            }
        })
    }
    const sendMsg = () => {
        if(!inputMsg && !inputMsg.length>3){
            toastr.info('Please Add Message')
        }
        else{
            dispatch(StudentMsgInitate({className,studentName,inputMsg}))
            setInputMsg('')
        }
    }
    const storeDaat = (e) => {
        setInputMsg(e.target.value)
    }
    return (
        <div>
                 <div>
            <Header title= 'Message For Student'></Header>
            <MainWrapper>
                <TwoDropWrapper> 
                    <Dropdown
                    style={{marginRight:'10px'}}
                    placeholder="Select Class"
                    selection
                    fluid
                    onChange={dataClicked}
                    options={dropData}
                    
                    ></Dropdown>
                    {bool?<Dropdown
                    placeholder="Student in This class"
                    selection
                    fluid
                    onChange={dataClicked2}
                    options={dropData2}
                    
                    ></Dropdown>:''}
                        
                    
                </TwoDropWrapper>
                
                    {
                        bool2?<TextArea value = {inputMsg}onChange={storeDaat} style={{marginTop:'10px',width:'100%',height:'30vh'}} placeholder='Tell us more' />:''
                    }
                    {
                        bool2?<Button onClick = {sendMsg} secondary>
                            Send Message
                        </Button>:''
                    }
                    { bool2?
                        <HeadingWrapper>
                             Messages
                        </HeadingWrapper>:''
                    }
                    {  bool2?<div 
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
        </div>
    )
}
export default StudentMsg;
