import React, {Component} from 'react';
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

export default class InformerContainer extends Component {
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
      upgradable
    } = next;


    if (!this.state.isShowUpgrade) return;

    if (!upgradable) {
      this.setState({
        isShowUpgrade: false
      })
    }
  }

  render() {
    const {
      income,
      updateInformer,
      updateCost,
      name,
      oneProduction,
      owned,
      upgradable,
    } = this.props;

    const {
      isShowUpgrade
    } = this.state;

    return (
      <Informer>
        <TitleItemContainer>
          <TitleItem>
            {name}{owned > 1 ? `(${owned})` : ''}
          </TitleItem>
          <AddButton
            onMouseEnter={this.handleShowUpgrade(true)}
            onMouseLeave={this.handleShowUpgrade(false)}
            onClick={updateInformer}
            disabled={!upgradable}
          >Добавить</AddButton>
        </TitleItemContainer>
        <LabelItemContainer>
          <LabelItemTitle>Доносов в секунду</LabelItemTitle>
          <LabelStatisticContainer>
            <LabelIncome
              isShowUpgrade={isShowUpgrade && upgradable}
            >
              +{U.makeFormatM(oneProduction)}
            </LabelIncome>
            {U.makeFormatM(parseInt(income))}
          </LabelStatisticContainer>
        </LabelItemContainer>
        <LabelItemContainer>
          <LabelItemTitle>Стоимость апгрейда&nbsp;</LabelItemTitle>
          <LabelStatisticContainer>
            <strong>{U.makeFormatM(updateCost)}</strong>
          </LabelStatisticContainer>
        </LabelItemContainer>
      </Informer>
    )
  }
}
