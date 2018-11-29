import React, {Component} from "react";
import styled, { keyframes } from "styled-components";
import {
  stageShareList
} from '../store/selectors';
import {connect} from 'react-redux';

import bubbleImage from '../assets/1.png';
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
  return keyframes`
  0% {
    transform: ${`translate3d(${props.posX}px, ${props.posY}px, 0)`};
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
  text-align: center;
  /* width: 40px;
  height: 40px; */
  opacity: 0;
  /* background-image: url(${bubbleImage}); */
  /* background-size: contain; */
  /* background-color: red; */
  /* border-radius: 100px; */
`;

const generateBubble = () => {
  return {
    posX: parseInt(Math.random() * 300),
    posY: parseInt(-100 - (Math.random() * 100)),
    key: parseInt(Math.random() * 1000000),
    status: 'new'
  }
}

const initialBubbles = (length = 10) => {
  let bubbles = [];
  for (let i=0; i<length; i++) {
    bubbles.push({status: 'end'})
  }
  return bubbles;
}

const setBubbles = (bubbles, modifier) => bubbles
  .filter(bubble => bubble.status === 'new')
  .map(bubble => 
  (<Bubble 
    key={bubble.key} 
    posX={bubble.posX} 
    posY={bubble.posY}
    onAnimationEnd={() => bubble.status = 'end'}
  >+{modifier}</Bubble>)
)

const calculateProcess = (jailed) => {
  const targetPopulation = (jailed > RUSSIAN_POPULATION) ? WORLD_POPULATION : RUSSIAN_POPULATION;
  return Math.min(jailed / targetPopulation, 1).toFixed(2);
}
const selectMap = (jailed) => (jailed > RUSSIAN_POPULATION) ? worldMap : russiaMap;

export default
@connect(state => {
  return {
    progress: calculateProcess(state.game.jailed),
    mapType: selectMap(state.game.jailed),
    clickModifier: state.game.clickModifier
  }
})
class ComputerComponent extends React.Component {
  state = {
    bubbles: initialBubbles(20)
  };

  createBubble() {
    const newBubble = generateBubble()
    this.setState({ bubbles: this.state.bubbles.filter(bubble => bubble.status === 'new') }, () => {
      if (this.state.bubbles.length < BUBBLES_LIMIT) {
        this.setState({ bubbles: [...this.state.bubbles, newBubble] })
      }
    })
  }

  render() {
    const {
      progress,
      mapType,
      width,
      addMaterial
    } = this.props;

    return (
      <Computer
        onClick={() => {
          this.createBubble()
          addMaterial()
        }}
        width={width}
      >
        <ProgressBack width={width} />
        <Progress progress={progress} />
        <Map width={width} mapType={mapType}></Map>
        { (this.state.bubbles.length > 0) && setBubbles(this.state.bubbles, this.props.clickModifier) }
      </Computer>
    );
  }
}
