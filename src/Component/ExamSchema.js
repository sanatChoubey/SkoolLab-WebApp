import React from 'react';
import styled from 'styled-components';
import Header from '../resuable/header';
import { Dropdown,Button, input } from 'semantic-ui-react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import * as firebase from 'firebase/app';

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

const ExamSchema = () =>{
     return(
          <div>
               <Header title = 'Add Exam Marks'/>
               <MainWrapperdiv>
                    <Dropdown
                         placeholder = 'selectClass'
                         fluid
                         selection
                         options ={[]}
                    />
               </MainWrapperdiv>
          </div>
     )
}
export default ExamSchema;