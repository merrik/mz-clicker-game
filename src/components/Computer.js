import React, {Component} from "react";
import styled from "styled-components";
import {
  stageShareList
} from '../store/selectors';
import russiaMap from '../assets/russiaMap.png';

const Computer = styled.div`
  position: relative;
  width: ${props => props.width ? props.width : '484px'};
  height: 235px;
  @media screen and (max-width: 1000px)  {
    max-width: 326px;
    left: 50%;
    transform: translate3d(-50%, 0, 0);
    width: 100%;
    height: auto; 
  }
`;

const Map = styled.div`
  position: relative;
  cursor: pointer;
  width: ${props => props.width ? props.width : '484px'};
  height: 235px;
  background-image: url(${russiaMap});
  background-repeat: no-repeat;
  @media screen and (max-width: 1000px)  {
    width: 100%;
    height: 0;
    padding-top: 69.63%;
    background-size: contain;
  }
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
      <Computer
        onClick={addMaterial}
        width={width}
      >
        <Map width={width}>
          <Progress
            progress={progress}
          />
        </Map>
      </Computer>
    );
  }
}
