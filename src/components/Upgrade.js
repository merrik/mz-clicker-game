import React from 'react';
import styled from "styled-components";
import * as U from '../utils';
import {
  TitleItem,
  TitleItemContainer,
  AddButton,
  LabelItemContainer,
  LabelItemTitle,
  LabelStatisticContainer,
  LabelIncome
} from "./index";

const Label = styled.p`
    margin: 0;
`;

const Upgrade = styled.div`
  display: flex;
  min-width: 260px;
  flex-direction: column;
  margin-bottom: 10px;
  align-content: flex-start;
  padding-bottom: 20px;
  padding-top: 20px;
  border-bottom: 1px solid #434343;
  :last-of-type {
    border-bottom: none;
  }
`;

export default ({name, description, cost, balance, onClick}) => {
  return (
    <Upgrade>
      <LabelItemContainer>
        <LabelItemTitle>{name}</LabelItemTitle>
      </LabelItemContainer>
      <AddButton
        onClick={onClick}
        align={'start'}
        disabled={cost > balance}
      >Купить ${U.makeFormatM(U.fixed(cost))}</AddButton>
    </Upgrade>
  )
}