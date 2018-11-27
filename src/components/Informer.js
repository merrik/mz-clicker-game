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

const Informer = styled.div`
  display: flex;
  min-width: 260px;
  flex-direction: column;
  margin-bottom: 10px;
  align-content: flex-start;
  padding-bottom: 20px;
  border-bottom: 1px solid #434343;
`;

export default ({income, updateInformer, updateCost, name, balance, oneProduction}) => {
  return (
    <Informer>
      <TitleItemContainer>
        <TitleItem>{name}</TitleItem>
        <AddButton
          onClick={updateInformer}
          disabled={updateCost > balance}
        >Улучшить</AddButton>
      </TitleItemContainer>
      <LabelItemContainer>
        <LabelItemTitle>Доносов:</LabelItemTitle>
        <LabelIncome>
          +{U.makeFormatM(U.fixed(oneProduction))}
        </LabelIncome>
        <LabelStatisticContainer>{U.makeFormatM(parseInt(income))} в секунду</LabelStatisticContainer>
      </LabelItemContainer>
      <LabelItemContainer>
        <LabelItemTitle>Стоимость апргрейда&nbsp;</LabelItemTitle>
        <LabelStatisticContainer>
          <strong>{U.makeFormatM(U.fixed(updateCost))}</strong>
        </LabelStatisticContainer>
      </LabelItemContainer>
    </Informer>
  )
}