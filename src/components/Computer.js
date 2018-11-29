import React, {Component} from "react";
import styled from "styled-components";
import {
  stageShareList
} from '../store/selectors';
import russiaMap from '../assets/russiaMap.png';

const Map = styled.div`
  position: relative;
  cursor: pointer;
  width: 100%; 
  height: 163px;
  background-image: url(${russiaMap});
  background-repeat: no-repeat;
`;

const ProgressBack = styled.div`
  box-sizing: border-box;
  position: absolute;
  z-index: -2;
  width: 300px;
  height: 163px;
  background-color: white;
`;

const Progress = styled.div`
  box-sizing: border-box;
  position: absolute;
  z-index: -1;
  width: ${props => `${props.progress}px`};
  height: 163px;
  background-color: red;
`;



export default class ComputerComponent extends React.Component {
  render() {
    const {
      jailed,
      width,
      addMaterial
    } = this.props;

    const progress = parseInt(Math.min(jailed / 146000000, 1) * 300);
    // 300px / 58 частей 

    return (
      <Map
        onClick={addMaterial}
        width={width}
      >
        <ProgressBack />
        <Progress
          progress={progress}
        />
      </Map>
    );
  }
}