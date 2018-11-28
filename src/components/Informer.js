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
      updateCost,
      balance
    } = next;

    if(!this.state.isShowUpgrade) return;

    if(updateCost > balance) {
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
      balance,
      oneProduction
    } = this.props;

    const {
      isShowUpgrade
    } = this.state;

    return (
      <Informer>
        <TitleItemContainer>
          <TitleItem>{name}</TitleItem>
          <AddButton
            onMouseEnter={this.handleShowUpgrade(true)}
            onMouseLeave={this.handleShowUpgrade(false)}
            onClick={updateInformer}
            disabled={updateCost > balance}
          >Добавить</AddButton>
        </TitleItemContainer>
        <LabelItemContainer>
          <LabelItemTitle>Доносов:</LabelItemTitle>
          <LabelIncome
            disabled={updateCost > balance}
            isShowUpgrade={isShowUpgrade}
          >
            +{U.makeFormatM(oneProduction)}
          </LabelIncome>
          <LabelStatisticContainer>{U.makeFormatM(parseInt(income))} в секунду</LabelStatisticContainer>
        </LabelItemContainer>
        <LabelItemContainer>
          <LabelItemTitle>Стоимость апргрейда&nbsp;</LabelItemTitle>
          <LabelStatisticContainer>
            <strong>{U.makeFormatM(updateCost)}</strong>
          </LabelStatisticContainer>
        </LabelItemContainer>
      </Informer>
    )
  }
}