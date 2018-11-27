import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as S from '../store/selectors'
import * as U from '../utils';

import Counter from './Counter';
import {progressPoint} from "../store/selectors";
import {
  MainStatistics,
  ColumnMainStatistics,
  TitleColumn
} from "./index";

const mapStateToProps = (state) => {
  const {game} = state;
  return {
    materials: S.materials(state),
    jailed: Math.floor(game.jailed),
    balance: S.balance(state),
    allMaterials: S.allMaterials(state),
    informers: S.informers(state),
    courts: S.courts(state)
  };
};

class MinStatistics extends Component {
  render() {
    const {
      allMaterials,
      materials,
      jailed,
      balance,
      informers,
      courts,
    } = this.props;

    const deltaMaterials = parseInt(informers.incomeMaterials - courts.outcomeMaterials);
    const generateMaterials = materials + informers.incomeMaterials;
    const prodactionСoeff = Math.min(generateMaterials / courts.outcomeMaterials, 1);

    const incomeJailed = U.fixed(courts.incomeJailed * prodactionСoeff);
    const incomeBalance = U.fixed(courts.incomeBalance * prodactionСoeff);

    return (
      <MainStatistics>
        <ColumnMainStatistics>
          {allMaterials >= 0 && <Counter header='Все материалы' count={allMaterials}/>}
          {materials >= 0 && <Counter header='Материалы дела' count={materials}/>}
        </ColumnMainStatistics>
        <ColumnMainStatistics>
          {jailed >= 0 && <Counter header='Посажено' count={jailed}/>}
          {balance >= 0 && <Counter header='Бюджет' count={balance}/>}
        </ColumnMainStatistics>
      </MainStatistics>
    )
  }
}

export default connect(mapStateToProps)(MinStatistics)