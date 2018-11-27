import React from 'react';
import styled from "styled-components";

const Title = styled.span`

`;

const Count = styled.span`
`;

const ColorCount = styled.span`
  color: ${props => props.isUp ? 'green' : 'red'}
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

export default ({header, count, color}) => {
  let isUp = false;

  if(count >= 0) {
    isUp = true;
  } else {
    isUp = false;
  }

  return (
    <Counter>
      <Title>{header}</Title>
      <br/>
      { color ?
        <ColorCount isUp={isUp}>{count}</ColorCount> :
        <Count>{count}</Count>
      }
    </Counter>
  )
}