import React from 'react';
import styled from "styled-components";
import {
  TitleColumn
} from "./index";
import * as U from "../utils";

const Title = styled.span`
  display: flex;
  align-self: flex-start;
  font: 12px "Fira Mono";c
  line-height: 1.83;
  letter-spacing: 2px;
  color: rgba(255, 255, 255, 0.5);
  text-transform: uppercase;
`;

const Count = styled.span`
  display: flex;
  align-self: flex-start;
  font: bold 12px "Fira Mono";
  letter-spacing: 2px;
  color: white;
  text-transform: uppercase;
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
  line-height: 10px;

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
        <ColorCount isUp={isUp}>{U.makeFormatM(count)}</ColorCount> :
        <Count>{U.makeFormatM(count)}</Count>
      }
    </Counter>
  )
}