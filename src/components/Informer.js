import React from 'react';
import styled from "styled-components";
import * as U from '../utils';

const Label = styled.p`
    margin: 0;
`

const Court = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  /* justify-content: center;
  align-content: flex-start;
  align-items: flex-start; */
  /* border: 1px solid red; */

`;

export default ({income, updateInformer, updateCost}) => {
    // const value = (income * 1000 * (multiply ? multiply : 1)).toFixed(2)

return (
    
    <Court>
        <Label>доносов: {U.fixed(income)} в секунду</Label>
        <button
            onClick={updateInformer}
            // disabled={}
        >Улучшить ({U.fixed(updateCost)}$)</button>
    </Court>
)
}