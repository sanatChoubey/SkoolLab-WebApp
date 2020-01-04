import React from 'react';
import styled from 'styled-components';
import { Icon } from 'semantic-ui-react';
const MainWrapper = styled.div`
     
     width:100%;
     
     display:flex;
     flex-direction:row;
     padding:15px;

`
const Title = styled.div`
     color: #485460;
     font-size: x-large;
     font-weight: lighter;
     padding: 40px;
     width:250px;
     border-bottom: 2px solid #4bcf;
     margin-left:5px;
     height:50px;
     `
const Header = ({title})=>{
     return(
          <MainWrapper>
                    <Icon onClick ={()=>{console.log('clicked')}}size='big'name='sidebar'/>
                    <Title>{title} </Title>
          </MainWrapper>
     )
}
export default Header;
