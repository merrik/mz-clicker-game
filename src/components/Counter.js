import React from 'react';
import styled from "styled-components";
import {
  TitleColumn
} from "./index";
import ToolTip from "./ToolTip";
import * as U from "../utils";

const Title = styled.span`
  display: flex;
  align-self: flex-start;
  font: 12px "Fira Mono";
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.5);
  text-align: start;
`;

const Count = styled.span`
  display: flex;
  text-align: right;
  align-self: flex-start;
  font: 12px "Fira Mono";
  float: right;
  color: white;
`;

const ColorCount = styled.span`
  display: flex;
  align-self: flex-end;
  font: bold 12px "Fira Mono";
  color: ${props => props.isUp ? 'green' : 'red'}
  text-transform: uppercase;
`;

const Counter = styled.p`
  display: flex;
  min-width: 65;
  justify-content: space-between;
  text-align: start;
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
      <Title>
        <ToolTip>
        {header}
        </ToolTip>
      </Title>
      <br/>
      { color ?
        <ColorCount isUp={isUp}>{U.makeFormatM(count)}</ColorCount> :
        <Count>{U.makeFormatM(count)}</Count>
      }
    </Counter>
  )
}