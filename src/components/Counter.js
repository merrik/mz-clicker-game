import React from 'react';
import styled from "styled-components";

const Header = styled.span`

`;

const Count = styled.span`

`;

const Counter = styled.p`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: flex-start;
  align-items: flex-start;
  /* border: 1px solid red; */
  line-height: 10px;

  /* margin: 0 auto; */
  text-align: center;

`;

export default ({header, count}) => (
    <Counter>
        <Header>{header}</Header>
        <br />
        <Count>{count}</Count> 
    </Counter>
)