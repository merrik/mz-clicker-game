import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addMaterial, removeMaterials, addCourt, addInformer, addInformator, addJudge, setMaterialToJudge, addSecretary } from '../store/actions'

import Row from './Row';
import Column from './Column';
import ClickArea from './ClickArea';
import Court from './Court';
import Informer from './Informer'
import Title from './Header';

import Statistics from './Statistics';

import * as S from '../store/selectors'

const STATUS_FREE = 'STATUS_FREE'
const STATUS_BUSY = 'STATUS_BUSY'

const mapStateToProps = (state) => {
  const { game } = state;
  return {
    jailed: game.jailed,
    courts: S.courts(state),
    balance: S.balance(state),
    informers: S.informers(state),
    informersMultiplies: game.informersMultiplies,
    courtList: S.judgesByCourts(state),
    courtQueue: game.courtQueue,
    judgesQueue: game.judgesQueue,
    secretaries: game.secretaries
  };
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  addMaterial: () => {
    dispatch(addMaterial(+new Date()))
  },
  removeMaterials: (qty) => { },
  sendMaterials: ({ time, idx, qty }) => {

    dispatch(removeMaterials({ timestamp: +new Date(), qty }))
    dispatch(setMaterialToJudge({
      timestamp: +new Date() + (time * 1000),
      index: idx
    }))
  },
  addCourt: ({cost}) => {
    dispatch(addCourt(cost))
  },
  addInformer: ({cost}) => {
    dispatch(addInformer(cost))
  },
  addInformator: ({index, cost}) => {
    dispatch(addInformator({index, cost}))
  },
  addJudge: ({index, cost}) => {
    dispatch(addJudge({index, cost}))
  },
  addSecretary: ({index, cost}) => {
    dispatch(addSecretary({index, cost}))
  }
})

const courtArray = ({courts, sendMaterials, courtList, addJudge, balance, addSecretary, secretaries}) => {
  console.time('courtArray');
  let _courts = [];
  for (const courtIndex in courtList) {
    const el = courts[courtIndex]
    const judges = courtList[courtIndex]
    const freeJudges = courtList[courtIndex].filter(el => el.status === STATUS_FREE)
    // const isActive = el.cost <= materials
    const nextJudgeCost = el.judgeCost * el.judgeCostMult * judges.length
    const enoughBudget = +nextJudgeCost <= +balance
    const enoughToSecretary = +el.secretaryCost <= +balance
    _courts.push(
      <Court
        cost={el.cost}
        enoughMaterials = {true}
        enoughBudget = {enoughBudget}
        time={el.time}
        result={el.result}
        balance={el.balance}
        key={courtIndex}
        active={true}
        judges={judges.length}
        freeJudges={freeJudges.length}
        enoughToSecretary={enoughToSecretary}
        haveSecretary={secretaries.indexOf(courtIndex) > -1}
        secretaryCost={el.secretaryCost}
        addSecretary={() => addSecretary({index: courtIndex, cost: el.secretaryCost})}
        onClick={true
          ? () => {
            sendMaterials({
              time: el.time,
              idx: freeJudges[0].judge,
              qty: el.cost
            })
          }
          : null
        }
        nextJudgeCost = {nextJudgeCost}
        addJudge={() => addJudge({index: courtIndex, cost: nextJudgeCost})}
      />
    )
  }
  console.timeEnd('courtArray');
  return _courts
}

const informersArray = ({ informers, informersMultiplies, addInformator, balance }) => informers.map((el, idx) => {
  const nextInformatorCost = el.updateCost * el.updateCostMult * (informersMultiplies[idx] ? informersMultiplies[idx] + 1 : 1)
  return <Informer
    income={el.income}
    every={el.every}
    key={idx}
    multiply={informersMultiplies[idx]}
    updateCost={nextInformatorCost}
    enoughBudget={balance >= nextInformatorCost}
    addInformator={
      () => { addInformator({cost: nextInformatorCost, index: idx}) }
    }
  />
})

class GameField extends Component {
  render() {
    const nextCourtCost = this.props.courts.length ? this.props.courts[this.props.courts.length - 1].nextCourtCost : 0;
    const nextInformerCost = S.informerList[this.props.informers.length] ? S.informerList[this.props.informers.length].cost : 0;
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
          <button 
            onClick={() => this.props.addCourt({cost: nextCourtCost})}
            disabled={nextCourtCost > this.props.balance}
          >
            Добавить cуд ({nextCourtCost}$)
          </button>
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