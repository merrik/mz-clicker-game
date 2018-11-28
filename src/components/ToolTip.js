import React, {Component} from 'react';
import styled from "styled-components";

const Tooltip = styled.div`
  position: relative;
  display: inline-block;
  
  > span {
    visibility: hidden;
    opacity: 0;
    width: 210px;
    border: 1px solid #3a3a3a;
    background-color: #2b2b2b;
    transition: opacity 0s, opacity 0.1s linear;
    left: 0;
    top: 23px;
    border-radius: 2px;
    text-align: start;
    color: #fff;
    padding: 25px;
    border-radius: 6px;
    position: absolute;
    z-index: 1;
    user-select: none;
  }
  > span:hover {
    display: none;
  }
  :hover > span {
    visibility: visible;
    opacity: 1;
  }
`;

export default class ToolTipComponent extends Component {
  render() {
    const {
      children
    } = this.props;

    return (
      <Tooltip>
        {children}
        <span className="tooltiptext">
          Описание параметра.
          Паддинги этого блока — 25рх со всех сторон!
        </span>
      </Tooltip>
    )
  }
}
