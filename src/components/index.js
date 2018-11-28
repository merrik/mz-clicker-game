import React from "react";
import styled from "styled-components";

export const GameArea = styled.div`
  display: flex;
  flex-direction: column;
  width: 1000px;
  margin: 0 auto;
  margin-bottom: 25px;
  margin-top: 115px;
`;

export const Head = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: start;
  margin-bottom: 35px;
`;

export const Main = styled.div`
  display: flex;
  width: 100%;
  justify-content: start;
  align-items: start;
`;

export const AddButton = styled.button`
  outline: none;
  border: none;
  background: none;
  margin: 0;
  padding: 0;
  float: right;
  min-width: ${props => props.minWidth ? props.minWidth : '85px'};
  font: bold 12px "Fira Mono";
  color: #ff8b86;
  line-height: 1.5;
  cursor: pointer;
  text-transform: uppercase;
  text-align: ${props => props.align ? props.align : 'end'};
  :hover {
   color: white;
  }
  :disabled {
    color: rgba(255, 139, 134, 0.5);
  }
`;

export const TitleItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const TitleItem = styled.h4`
  font: bold 12px "Fira Mono";
  color: #ff8b86;
  line-height: 1.5;
  letter-spacing: 2px;
  color: #ffffff;
  text-transform: uppercase;
`;

export const LabelItemContainer = styled.span`
  display: flex;
  justify-content: space-between;
`;

export const LabelItemTitle = styled.span`
  font: 12px "Fira Mono";
  color: rgba(255, 255, 255, 0.5);
`;

export const LabelStatisticContainer = styled.span`
  min-width: 140px;
  font: 12px "Fira Mono";
  text-align: right;
  color: #ffffff;
  strong {
    font-weight: 700;
  }
`;

export const LabelIncome = styled.span`
  opacity: ${props => props.isShowUpgrade ? '1' : '0'};
  transition: opacity 0s, opacity 0.5s linear;
  float: left;
  font: 10px "Fira Mono";
  line-height: 1.8;
  color: #7ed321;
  text-align: start;
`;

export const Column = styled.div`
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  margin-right: 10px;
  max-width: ${props => props.maxWidth ? props.maxWidth : '300px'};
  user-select: none;
  padding: 20px;
  margin-right: 20px;
  :first-child {
    padding-left: 0;
  }
  :last-of-type {
    margin-right: 0;
  }
`;
export const TitleColumn = styled.h2`
  display: flex;
  align-self: flex-start;
  font: 12px "Fira Mono";
  line-height: 1.5;
  letter-spacing: 2px;
  color: rgba(255, 255, 255, 0.5);
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-content: flex-start;
`;

export const MainStatistics = styled.div`
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  width: 100%;
`;

export const MainStatisticsContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 600px;
  margin: 0 auto;
  p {
    margin-top: 0;
    margin-bottom: 0;
    :last-of-type {
      margin-bottom: 0;
    }
  }
`;

export const ColumnMainStatistics = styled.div`
  display: flex;
  flex-direction: column;
  align-content: flex-start;
  justify-content: space-between;
  width: 100%;
  margin-right: 15px; 
  :last-child {
    margin-right: 0;
  }
`;

export const Circle = styled.span`
  width: 50px;
  height: 50px;
  margin-right: 27px;
  background-color: ${props => props.test ? 'red' : 'auto'};
  border-radius: 100%;
  border: 1px solid #434343;
  :last-child {
    margin-right: 0;
  }
`;

export const AchievementContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-content: flex-start;
  align-self: center;
  margin-top: 25px;
`;

export const ClickButton = styled.span`
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  font: bold 12px "Fira Mono";
  width: 610px;
  height: 50px;
  margin: 0 auto;
  margin-top: 30px;
  border-radius: 24.5px;
  background-color: #ff8b86;
  text-transform: uppercase;
  cursor: pointer;
  user-select: none;
`;