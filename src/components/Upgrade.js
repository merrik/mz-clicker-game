import React from 'react';
import styled from "styled-components";
import * as U from '../utils';

const Label = styled.p`
    margin: 0;
`

const Upgrade = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  /* justify-content: center;
  align-content: flex-start;
  align-items: flex-start; */
  /* border: 1px solid red; */

`;

export default ({name, description, cost, onClick}) => {
  // const value = (income * 1000 * (multiply ? multiply : 1)).toFixed(2)
  return (
    <Upgrade>
      <Label>{name}</Label>
      <Label>{description}</Label>
      <button
        onClick={onClick}
        // disabled={}
      >Улучшить ({U.fixed(cost)}$)</button>
    </Upgrade>
  )
}