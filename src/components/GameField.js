import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addMaterial, removeMaterials, addCourt, addInformer, addInformator } from '../store/actions'

import Row from './Row';
import Column from './Column';
import ClickArea from './ClickArea';
import Court from './Court';
import Informer from './Informer'
import Title from './Header';

import Statistics from './Statistics';

import * as S from '../store/selectors';
import * as U from '../utils';

const STATUS_FREE = 'STATUS_FREE';
const STATUS_BUSY = 'STATUS_BUSY';

const mapStateToProps = (state) => {
  const { game } = state;
  return {
    courts: S.courts(state),
    courtList: S.courtList,
    balance: S.balance(state),
    informers: S.informers(state),
    informersOwned: game.informersOwned,
    queue: game.queue,
    secretaries: game.secretaries
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  addMaterial: () => {
    dispatch(addMaterial(+new Date()))
  },

  sendMaterials: ({ time, idx, qty }) => {
    dispatch(removeMaterials({ timestamp: +new Date(), qty }))
    // dispatch(setMaterialToJudge({
    //   timestamp: +new Date() + (time * 1000),
    //   index: idx
    // }))
  },

  addCourt: ({cost}) => {
    dispatch(addCourt(cost))
  },

  addInformer: ({cost}) => {
    dispatch(addInformer(cost))
  },

  addInformator: ({index, cost}) => {
    dispatch(addInformator({index, cost}))
  }
});

const courtArray = ({courts, sendMaterials, courtList}) => {
  let _courts = [];
  // console.log(courts)
  for (const courtIndex in courts) {
    const court = courts[courtIndex];
    _courts.push(
      <Court
        name={court.name}
        materials={court.materials}
        productionJailed={court.productionJailed}
        productionBalance={court.productionBalance}
        upgradeCost={U.nextCost({base:court.cost, rate:court.rate, owned: 1})}
        key={courtIndex}
        onClick={true
          ? () => {
            sendMaterials({
              time: court.time,
              idx: courtIndex,
              qty: court.cost
            })
          }
          : null
        }
      />
    )
  }
  return _courts
}

const informersArray = ({ informers, informersOwned, addInformator, balance }) => informers.map((el, idx) => {
  const nextInformatorCost = U.nextCost({base: el.cost, rate: el.rate, owned: informersOwned[idx]});
  return <Informer
    income={el.income}
    every={el.every}
    key={idx}
    updateCost={nextInformatorCost}
    enoughBudget={balance >= nextInformatorCost}
    addInformator={
      () => { addInformator({cost: nextInformatorCost, index: idx}) }
    }
  />
});

class GameField extends Component {
  render() {
    let nextCourtCost = 0;
    let nextInformerCost = 0;
    const nextCourt = this.props.courts.length ? this.props.courts[this.props.courts.length - 1] : null;
    const nextInformer = S.informerList[this.props.informers.length] ? S.informerList[this.props.informers.length] : null;

    if(nextCourt) {
       nextCourtCost = nextCourt.cost;
    }

    if(nextInformer) {
      nextInformerCost = nextCourt.cost
    }

    return (
      <Row>
        <Statistics />
        <Column>
          <Title>Кликни</Title>
          <ClickArea
            onClick={() => {
              this.props.addMaterial()
            }} >
            CLICK ME</ClickArea>
        </Column>
        <Column>
          <Title>Суды</Title>
          {courtArray(this.props)}
          {nextCourt ? (
            <button
              onClick={() => this.props.addCourt({cost: nextCourtCost})}
              disabled={nextCourtCost > this.props.balance}
            >
              {(`Добавить ${nextCourt.name} ${nextCourtCost}`)}
            </button>
            ) : null
          }
        </Column>
        <Column>
          <Title>Доносчики</Title>
          {informersArray(this.props)}
          {(this.props.informers.length < S.informerList.length)
            ? <button 
            onClick={() => this.props.addInformer({cost: nextInformerCost})}
            disabled={nextInformerCost > this.props.balance}
          >
            Добавить доносчика ({nextInformerCost}$)
          </button>
          : <div>Максимум доносчиков</div>
          }
        </Column>
      </Row>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameField)