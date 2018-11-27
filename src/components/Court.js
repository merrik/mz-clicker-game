import React from 'react';
import styled from "styled-components";
import {addSecretary} from '../store/actions';
import {
  TitleItem,
  TitleItemContainer,
  AddButton,
  LabelItemContainer,
  LabelItemTitle,
  LabelStatisticContainer,
  LabelIncome
} from "./index";
import * as U from '../utils';

const Court = styled.div`
  display: flex;
  min-width: 300px;
  flex-direction: column;
  margin-bottom: 15px;
  border-bottom: 1px solid #151515;
`;

export default ({
                  name,
                  materials,
                  productionJailed,
                  productionBalance,
                  upgradeCost,
                  onClick
                }) => (
  <Court>
    <TitleItemContainer>
      <TitleItem>{name}</TitleItem>
      <AddButton
        onClick={onClick}>
        Добавить судью
      </AddButton>
    </TitleItemContainer>
    <LabelItemContainer>
      <LabelItemTitle>Расход материалов м/c&nbsp;</LabelItemTitle>
      <LabelStatisticContainer>
        {parseInt(materials)}
      </LabelStatisticContainer>
    </LabelItemContainer>
    <LabelItemContainer>
      <LabelItemTitle>Скорость посадки п/c&nbsp;</LabelItemTitle>
      <LabelStatisticContainer>
        {U.fixed(productionJailed)}
      </LabelStatisticContainer>
    </LabelItemContainer>
    <LabelItemContainer>
      <LabelItemTitle>Инкам бюджета&nbsp;</LabelItemTitle>
      <LabelStatisticContainer>
        {U.fixed(productionBalance)}
      </LabelStatisticContainer>
    </LabelItemContainer>
    <LabelItemContainer>
      <LabelItemTitle>Стоимость апргрейда&nbsp;</LabelItemTitle>
      <LabelStatisticContainer>
        <strong>{U.fixed(upgradeCost)}</strong>
      </LabelStatisticContainer>
    </LabelItemContainer>
    <LabelItemContainer><strong></strong></LabelItemContainer>
  </Court>
)