import React ,{ useState }from 'react';
import styled from 'styled-components';
import { Input, Button } from 'semantic-ui-react';
import Header from '../resuable/header';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css'
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
     const [column, setColumn] = useState([{headerName:'Classes in your School',field:'Class', },{headerName:'sex',field:'sex',editable:true}]);
     const [classData,setclassData] = useState([{Class:'class9A'},{Class:'class9A'}]);
     const [Class,setClass] = useState([{Class:'class9A'}])
     const [errors,setError] = useState('');
     const changed = () =>{
          console.log('done')
     }
     const listofClassadded = ()=>{
          return(
             <div style= {{margin:'10px'}}>
                    <div
               className="ag-theme-balham"
               style={{
               height: '500px',
               width: '100%',
               
           }}
             >
                    <AgGridReact
                    columnDefs={column}
                    rowData={classData}
                    onRowClicked = {params=>{console.log('hello',params.data)}}
                    onCellValueChanged={(params)=>{console.log('hello',params.data)}}
                    onCellEditingStarted={(params)=>{console.log('hellled',params.data)}}>
                     
                    </AgGridReact>
             </div>
             </div>
          )
     }
     const onSubmit = ()=>{
               if(Class.length<6){
                    setError('** please use Correct Class Name')
               }else{
                    dataClass.push({'Class':Class})
                    console.log(dataClass)
                    setclassData([...dataClass])
                    console.log('yoyo',classData)
               }

          
     }
     const changeText =(e) => {
          console.log(e.target.value);
          setClass(e.target.value)
          
     }
     return(
        <MainWrapper>
             <Header title={'ADD Classes'}></Header>
              <ItemContainer>
                    <Input  onChange ={changeText}placeholder='Add Class example = 9A or 10A or 11Commerce or 12mathscience'/>  
                    <ErrorPara>{errors}</ErrorPara>
                    <AddWrapper><Button onClick={onSubmit }basic color='blue' content='ADD CLASS' /></AddWrapper>
                    {listofClassadded()}

              </ItemContainer>
     </MainWrapper>     
     )
}
export default AddClass;
