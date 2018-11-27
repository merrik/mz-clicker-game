import React from "react";
import styled from "styled-components";

export const AddButton = styled.button`
  outline: none;
  border: none;
  background: none;
  font: bold 12px "Fira Mono";
  color: #ff8b86;
  line-height: 1.5;
  cursor: pointer;
  text-transform: uppercase;
  :hover {
   color: white;
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
  font: 12px "Fira Mono";
  text-align: right;
  color: #ffffff;
  strong {
    font-weight: 700;
  }
`;

export const LabelIncome = styled.span`
  font: 10px "Fira Mono";
  line-height: 1.8;
  color: #7ed321;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid red;
  margin-right: 10px;
  user-select: none;
  border: 1px solid #434343;
  padding: 20px;
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
  align-items: flex-start; */
`;
