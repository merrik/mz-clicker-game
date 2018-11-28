import React, {Component} from "react";
import styled from "styled-components";
import {
  stageShareList
} from '../store/selectors';
import computerRussia from '../assets/computerRussia.png';

const Computer = styled.div`
  position: relative;
  width: 484px;
  height: 235px;
  background-image: url(${computerRussia});
  background-repeat: no-repeat;
`;

const Progress = styled.div`
  box-sizing: border-box;
  position: absolute;
  z-index: -1;
  background-color: red;
  height: 81%;
  margin-left: 64px;
  margin-top: 10px;
  max-width: 200px;
  width: ${props => props.progress < 1 ? `${200 * props.progress}px` : '200px'};
`;

export default class ComputerComponent extends React.Component {
  render() {
    const {
      jailed
    } = this.props;

    const progress = Math.min(jailed / 146000000, 1);

    return (
      <Computer>
        <Progress
          progress={progress}
        />
      </Computer>
    );
  }
}