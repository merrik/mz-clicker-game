import React, {Component} from "react";
import styled from "styled-components";
import {
  stageShareList
} from '../store/selectors';
import russiaMap from '../assets/russiaMap.png';

const Computer = styled.div`
  position: relative;
  cursor: pointer;
  width: ${props => props.width ? props.width : '484px'};
  height: 235px;
  background-image: url(${russiaMap});
  background-repeat: no-repeat;
`;

const Progress = styled.div`
  box-sizing: border-box;
  position: absolute;
  z-index: -1;
`;

export default class ComputerComponent extends React.Component {
  render() {
    const {
      jailed,
      width,
      addMaterial
    } = this.props;

    const progress = Math.min(jailed / 146000000, 1);

    return (
      <Computer
        onClick={addMaterial}
        width={width}
      >
        <Progress
          progress={progress}
        />
      </Computer>
    );
  }
}