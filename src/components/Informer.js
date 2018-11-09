import React from 'react';
import styled from "styled-components";

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

export default ({income, every, multiply, addInformator, updateCost, enoughBudget}) => {
    const value = (income * 1000 * (multiply ? multiply : 1)).toFixed(2)

return (
    
    <Court>
        <Label>доносов: {value} в секунду</Label>
        <button
            onClick={addInformator}
            disabled={!enoughBudget}
        >Улучшить ({updateCost}$)</button>
    </Court>
)
}