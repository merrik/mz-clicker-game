import React, {Component} from "react";
import styled, { keyframes } from "styled-components";
import {
  stageShareList
} from '../store/selectors';
import russiaMap from '../assets/russiaMap.png';
import worldMap from '../assets/worldMap.png';

import { RUSSIAN_POPULATION, WORLD_POPULATION } from '../store/selectors';
import { BUY_UPGRADE } from "../store/constants";

const BUBBLES_LIMIT = 20;

const Computer = styled.div`
  position: relative;
  width: ${props => props.width ? props.width : '484px'};
  max-width: 326px;
  height: 235px;
  @media screen and (max-width: 1000px)  {
    left: 50%;
    transform: translate3d(-50%, 0, 0);
    width: 100%;
    height: auto; 
  }
`;

const Map = styled.div`
  position: relative;
  cursor: pointer;
  height: 235px;
  background-image: url(${props => props.mapType});
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
  @media screen and (max-width: 1000px)  {
    width: 100%
  }
`;

const Progress = styled.div`
  box-sizing: border-box;
  position: absolute;
  z-index: -1;
  width: ${props => `${props.progress * 300}px`};
  height: 163px;
  background-color: #0a9a8d;
  @media screen and (max-width: 1000px)  {
    width: ${props => `${props.progress * 100}%`};
  }
`;

const move = (props) => { 
  console.log(props) 
  return keyframes`
  0% {
    transform: ${`translate3d(${props.posX}px, 0, 0)`};
    opacity: 1;
  }

  100% {
    transform: translate3d(100px, -300px, 0);
    opacity: 0;
  }
`};

const Bubble = styled.div`
  box-sizing: border-box;
  position: absolute;
  animation: ${props => `${move(props)} 2s linear`} ;
  z-index: 2;
  width: 20px;
  height: 20px;
  background-color: red;
  border-radius: 100px;
`;

const setBubbles = (bubles) => bubles.map(bubble => (<Bubble key={bubble.key} posX={bubble.posX} kill={() => console.log('kill', bubble.key)}/>))
export default class ComputerComponent extends React.Component {
  state = {
    bubbles: []
  };
  
  render() {
    const {
      jailed,
      width,
      addMaterial
    } = this.props;

    const overRussia = jailed > RUSSIAN_POPULATION;
    const mapType = overRussia ? worldMap : russiaMap;
    const targetPopulation = overRussia ? WORLD_POPULATION : RUSSIAN_POPULATION;
    const progress = Math.min(jailed / targetPopulation, 1).toFixed(2);
    console.log(this.state.bubbles)
    return (
      <Computer
        onClick={() => {
          if (this.state.bubbles.length < BUBBLES_LIMIT) {
            this.setState({
              bubbles: [...this.state.bubbles, {posX: parseInt(Math.random() * 300), key: parseInt(Math.random()*10000)}]
            })
          } else {
            this.setState({
              bubbles: [...(this.state.bubbles.shift()), {posX: parseInt(Math.random() * 300), key: parseInt(Math.random()*10000)}]
            })
          }
          addMaterial()
        }}
        width={width}
      >
        <ProgressBack width={width} />
        <Progress progress={progress} />
        <Map width={width} mapType={mapType}></Map>
        { (this.state.bubbles.length > 0) && setBubbles(this.state.bubbles) }
      </Computer>
    );
  }
}
