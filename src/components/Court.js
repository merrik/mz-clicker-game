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
  box-sizing: border-box;
  flex-direction: column;
  margin-bottom: 15px;
  padding-bottom: 20px;
  border-bottom: 1px solid #434343;
`;

export default ({
                  court,
                  onClick,
                  balance
                }) => {

  const {
    name,
    materials,
    productionJailed,
    productionBalance,
    upgradeCost,
    oneProductionJailed,
    oneProductionBalance,
    oneMaterials
  } = court;

  return (
    <Court>
      <TitleItemContainer>
        <TitleItem>{name}</TitleItem>
        <AddButton
          minWidth={'120px'}
          disabled={upgradeCost > balance}
          onClick={onClick}>
          Добавить судью
        </AddButton>
      </TitleItemContainer>
      <LabelItemContainer>
        <LabelItemTitle>Расход материалов м/c&nbsp;</LabelItemTitle>
        <LabelStatisticContainer>
          <LabelIncome>
            +{U.makeFormatM(U.fixed(oneMaterials))}
          </LabelIncome>
          {parseInt(materials)}
        </LabelStatisticContainer>
      </LabelItemContainer>
      <LabelItemContainer>
        <LabelItemTitle>Скорость посадки п/c&nbsp;</LabelItemTitle>
        <LabelStatisticContainer>
          <LabelIncome>
            +{U.makeFormatM(U.fixed(oneProductionJailed))}
          </LabelIncome>
          {U.makeFormatM(U.fixed(productionJailed))}
        </LabelStatisticContainer>
      </LabelItemContainer>
      <LabelItemContainer>
        <LabelItemTitle>Инкам бюджета&nbsp;</LabelItemTitle>
        <LabelStatisticContainer>
          <LabelIncome>
            +{U.makeFormatM(U.fixed(oneProductionBalance))}
          </LabelIncome>
          {U.makeFormatM(U.fixed(productionBalance))}
        </LabelStatisticContainer>
      </LabelItemContainer>
      <LabelItemContainer>
        <LabelItemTitle>Стоимость апргрейда&nbsp;</LabelItemTitle>
        <LabelStatisticContainer>
          <strong>{U.makeFormatM(U.fixed(upgradeCost))}</strong>
        </LabelStatisticContainer>
      </LabelItemContainer>
      <LabelItemContainer><strong></strong></LabelItemContainer>
    </Court>
  )
}