import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  addMaterial,
  removeMaterials,
  addCourt,
  addInformer,
  updateInformer,
  resetGame,
  updateCourt,
  buyUpgrade
} from '../store/actions'
import {courtList, informerList} from "../store/selectors";

import Row from './Row';
import Column from './Column';
import ClickArea from './ClickArea';
import Court from './Court';
import Informer from './Informer'
import Upgrade from './Upgrade';
import Title from './Header';

import Statistics from './Statistics';

import * as S from '../store/selectors';
import * as U from '../utils';

const mapStateToProps = (state) => {
  const {game} = state;
  return {
    courts: S.courts(state),
    courtList: S.courtList,
    balance: S.balance(state),
    informers: S.informers(state),
    upgrades: S.upgrades(state),
    informersOwned: game.informersOwned,
    queue: game.queue,
    secretaries: game.secretaries,
  };
};

const mapDispatchToProps = {
  addMaterial,
  addCourt,
  addInformer,
  updateInformer,
  resetGame,
  updateCourt,
  buyUpgrade
};

const courtArray = ({courts, sendMaterials, updateCourt}) => {
  return courts.map((court, index) => {
    const {
      name,
      materials,
      productionJailed,
      productionBalance,
      upgradeCost,
    } = court;

    return (
      <Court
        name={name}
        materials={materials}
        productionJailed={productionJailed}
        productionBalance={productionBalance}
        upgradeCost={upgradeCost}
        key={index}
        onClick={() => updateCourt({cost: upgradeCost, index})}
      />
    )
  })
};

const upgradesArray = ({upgrades, buyUpgrade}) => {
  return upgrades.map((upgrade) => {
    const {
      name,
      description,
      cost,
      index
    } = upgrade;

    return (
      <Upgrade
        name={name}
        description={description}
        cost={cost}
        key={name}
        onClick={() => buyUpgrade({cost, index})}
      />
    )
  })
};

const informersArray = ({informers, informersOwned, updateInformer, balance}) =>
  informers.map((informer, index) => {
    const {
      name,
      production,
      upgradeCost
    } = informer;

    return (
      <Informer
        name={name}
        income={production}
        key={index}
        updateCost={upgradeCost}
        enoughBudget={balance >= upgradeCost}
        updateInformer={
          () => {
            updateInformer({cost: upgradeCost, index})
          }
        }
      />)
  });

class GameField extends Component {
  render() {
    const {
      addMaterial,
      addInformer,
      resetGame,
      addCourt,
      balance,
      courts,
      informers
    } = this.props;

    let nextCourtCost = 0;
    let nextInformerCost = 0;
    const nextCourt = courts.length < courtList.length ? courtList[courts.length] : null;
    const nextInformer = informers.length < informerList.length ? informerList[informers.length] : null;

    if (nextCourt) {
      nextCourtCost = nextCourt.cost;
    }

    if (nextInformer) {
      nextInformerCost = nextInformer.cost
    }

    return (
      <Row>
        <Statistics/>
        <Column>
          <Title>Кликни</Title>
          <ClickArea
            onClick={() => {
              addMaterial()
            }}>
            CLICK ME</ClickArea>
          <button onClick={resetGame}>Заново</button>
        </Column>
        <Column>
          <Title>Суды</Title>
          {courtArray(this.props)}
          {nextCourt ? (
            <button
              onClick={() => addCourt({cost: nextCourtCost})}
              disabled={nextCourtCost > balance}
            >
              {(`Добавить ${nextCourt.name} ${nextCourtCost}$`)}
            </button>
          ) : null
          }
        </Column>
        <Column>
          <Title>Доносчики</Title>
          {informersArray(this.props)}
          {nextInformerCost
            ? <button
              onClick={() => addInformer({cost: nextInformerCost})}
              disabled={nextInformerCost > balance}
            >
              Добавить доносчика ({nextInformerCost}$)
            </button>
            : <div>Максимум доносчиков</div>
          }
        </Column>
        <Column>
          <Title>Улучшения</Title>
          {upgradesArray(this.props)}
        </Column>
      </Row>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameField)