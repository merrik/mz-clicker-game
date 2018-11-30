import React, {Component} from 'react';
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
  :last-child {
    border-bottom: none;
  }
`;

export default class CourtComponent extends Component {
  state = {
    isShowUpgrade: false
  };

  handleShowUpgrade = (isShow) => () => {
    this.setState({
      isShowUpgrade: isShow
    })
  };

  componentDidUpdate(next) {
    const {
      court
    } = next;

    const {
      upgradable
    } = court;

    if(!this.state.isShowUpgrade) return;

    if(!upgradable) {
      this.setState({
        isShowUpgrade: false
      })
    }

  }

  render() {
    const {
      court,
      onClick
    } = this.props;

    const {
      isShowUpgrade
    } = this.state;

    const {
      name,
      materials,
      productionJailed,
      productionBalance,
      upgradeCost,
      oneProductionJailed,
      oneProductionBalance,
      oneMaterials,
      owned,
      upgradable,
    } = court;

    return (
      <Court>
        <TitleItemContainer>
          <TitleItem>{name}{owned>1?`(${owned})`:''}</TitleItem>
          <AddButton
            onMouseOver={this.handleShowUpgrade(true)}
            onMouseOut={this.handleShowUpgrade(false)}
            minWidth={'120px'}
            disabled={!upgradable}
            onClick={onClick}>
            Добавить судью
          </AddButton>
        </TitleItemContainer>
        <LabelItemContainer>
          <LabelItemTitle>Расход материалов&nbsp;</LabelItemTitle>
          <LabelStatisticContainer>
            <LabelIncome
              isShowUpgrade={isShowUpgrade && upgradable}
            >
              +{U.makeFormatM(oneMaterials)}
            </LabelIncome>
            {parseInt(materials)}
          </LabelStatisticContainer>
        </LabelItemContainer>
        <LabelItemContainer>
          <LabelItemTitle>Посадок в секунду&nbsp;</LabelItemTitle>
          <LabelStatisticContainer>
            <LabelIncome
              isShowUpgrade={isShowUpgrade && upgradable}
            >
              +{U.makeFormatM(oneProductionJailed)}
            </LabelIncome>
            {U.makeFormatM(productionJailed)}
          </LabelStatisticContainer>
        </LabelItemContainer>
        <LabelItemContainer>
          <LabelItemTitle>Доходы в бюджет&nbsp;</LabelItemTitle>
          <LabelStatisticContainer>
            <LabelIncome
              isShowUpgrade={isShowUpgrade && upgradable}
            >
              +{U.makeFormatM(oneProductionBalance)}
            </LabelIncome>
            {U.makeFormatM(productionBalance)}
          </LabelStatisticContainer>
        </LabelItemContainer>
        <LabelItemContainer>
          <LabelItemTitle>Стоимость апгрейда&nbsp;</LabelItemTitle>
          <LabelStatisticContainer>
            <strong>{U.makeFormatM(upgradeCost)}</strong>
          </LabelStatisticContainer>
        </LabelItemContainer>
        <LabelItemContainer><strong></strong></LabelItemContainer>
      </Court>
    )
  }
}
