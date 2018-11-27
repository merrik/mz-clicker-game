import React from "react";
import styled from "styled-components";

export const GameArea = styled.div`
  display: flex;
  flex-direction: column;
  width: 900px;
  margin: 0 auto;
  margin-bottom: 25px;
`;

export const Head = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: start;
`;

export const Main = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
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
  min-width: 110px;
  font: 12px "Fira Mono";
  text-align: right;
  color: #ffffff;
  strong {
    font-weight: 700;
  }
`;

export const LabelIncome = styled.span`
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
  user-select: none;
  border: 1px solid #434343;
  padding: 20px;
  margin-right: 20px;
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
  text-transform: uppercase;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-content: flex-start;
`;

export const MainStatistics = styled.div`
  display: flex;
  box-sizing: border-box;
  flex-direction: row;
  width: 360px;
`;

export const ColumnMainStatistics = styled.div`
  display: flex;
  flex-direction: column;
  align-content: flex-start;
  justify-content: space-between;
  width: 100%;
`;