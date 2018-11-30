import React from "react";
import styled from "styled-components";

export const GameArea = styled.div`
  display: flex;
  flex-direction: column;
  width: 1000px;
  margin: 0 auto;
  margin-bottom: 25px;
  margin-top: 40px;
  @media screen and (max-width: 1000px)  {
    width: 100vw;
    padding: 0 10px;
    box-sizing: border-box;
    margin: 40px 0 0 0;
  }
`;

export const Head = styled.div`
  display: flex;
  width: 100%;
  flex-direction: ${props => props.column ? 'column' : 'row'}
  justify-content: center;
  align-items: start;
  margin-bottom: 45px;
  @media screen and (max-width: 1000px)  {
    flex-direction: column;
  }
`;

export const Main = styled.div`
  display: flex;
  width: 100%;
  margin-top: 15px;
  justify-content: start;
  align-items: start;
  @media screen and (max-width: 1000px)  {
    position: relative;
    flex-direction: column;
    align-items: stretch;
    max-width: 400px;
    left: 50%;
    transform: translate3d(-50%, 0, 0);
  }
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
  color: #0a9a8d;
  line-height: 1.5;
  cursor: pointer;
  text-transform: uppercase;
  text-align: ${props => props.align ? props.align : 'end'};
  :hover {
   color: white;
  }
  :disabled {
    color: rgba(10, 154, 141, 0.5);
  }
`;

export const TitleItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const TitleItem = styled.h4`
  font: bold 12px "Fira Mono";
  color: #0a9a8d;
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
  min-width: 100px;
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
  @media screen and (max-width: 1000px)  {
    max-width: unset;
    margin: 0;
    padding: 0;
    margin-bottom: 30px;
    :first-child {
      margin-top: 30px;
    }
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
  @media screen and (max-width: 1000px)  {
    flex-direction: column;
    width: 100%;
    margin-top: 20px;
  }
`;

export const MiniStatistic = styled.div`
  transform-style: preserve-3d;
  perspective: 100px;
  align-items: center;
  align-content: center;
  justify-content: center;
  position: fixed;
  overflow-y: hidden;
  width: 100%;
  height: 100%;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;  
  transform: translateZ(100px);
  display: flex;
  font: bold 14px "Fira Mono";
  flex-direction: column;
  @media screen and (max-width: 1000px)  {
    width: 300px;
    margin: 0 auto;
    box-sizing: border-box;
  }
`;

export const MiniStatisticProgressBar = styled.div`
  background-color: white;
  height: 12px;
  border-radius: 6px;
  width: ${props => props.progress < 100 ? `${props.progress}%` : '100%'}
`;

export const ProgressContainer = styled.div`
  width: 260px;
  margin: 10px 0;
  border: 1px solid #434343;
  border-radius: 6px;
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

export const CircleLine = styled.div`
  display: flex;
  flex-direction: row;
  align-content: flex-start;
  align-self: center;
  :first-child {
    margin-right: 27px;
  }
  @media screen and (max-width: 1000px)  {
    justify-content: space-between;
    align-content: stretch;
    width: 100%;
    box-sizing: border-box;
    padding: 0 5px;
    :first-child{
      margin-right: 0;
      margin-bottom: 10px;
    }   
  }
`

export const Circle = styled.img`
  width: 50px;
  height: 50px;
  cursor: pointer;
  @media screen and (max-width: 1000px)  {
    width: 50px;
    height: 50px;
    margin-right: 0;
  }
  margin-right: 27px;
  border-radius: 100%;
  :last-child {
    margin-right: 0;
  }
`;

export const CircleEmpty = styled.div`
  width: 50px;
  height: 50px;
  border: 1px solid #434343;
  @media screen and (max-width: 1000px)  {
    width: 50px;
    height: 50px;
    margin-right: 0;
  }
  margin-right: 27px;
  border-radius: 100%;
  :last-child{
    margin-right: 0;
  }
`;

export const AchievementContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-content: flex-start;
  align-self: center;
  margin-top: 25px;
  @media screen and (max-width: 1000px)  {
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
  }
`;

export const ClickButton = styled.span`
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  font: bold 12px "Fira Mono";
  width: ${props => props.width ? props.width : '610px'};
  height: 50px;
  margin: 0 auto;
  margin-top: 30px;
  border-radius: 24.5px;
  background-color: #0a9a8d;
  text-transform: uppercase;
  cursor: pointer;
  user-select: none;
  @media screen and (max-width: 1000px)  {
    width: 100%;
  }
`;
