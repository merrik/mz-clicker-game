import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as S from '../store/selectors'
import * as U from '../utils';

import Counter from './Counter';
import {
  MainStatistics,
  ColumnMainStatistics,
  TitleColumn,
  ClickButton,
  MainStatisticsContainer
} from "./index";
import Achievement from "./Achievement";
import {progressPoint} from "../store/selectors";

const mapStateToProps = (state) => {
  const {game} = state;
  return {
    materials: S.materials(state),
    jailed: Math.floor(game.jailed),
    balance: S.balance(state),
    allMaterials: S.allMaterials(state),
    informers: S.informers(state),
    courts: S.courts(state),
    showJailed: state.game.allMaterials >= progressPoint.courtsAvailable,
    showInformers: state.game.jailed >= progressPoint.informersAvailable,
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
      addMaterial,
      showedShareStage,
      showJailed,
      showInformers
    } = this.props;

    const deltaMaterials = parseInt(informers.incomeMaterials - courts.outcomeMaterials);
    const generateMaterials = materials + informers.incomeMaterials;
    const prodactionСoeff = Math.min(generateMaterials / courts.outcomeMaterials, 1);

    const incomeJailed = courts.incomeJailed * prodactionСoeff;
    const incomeBalance = courts.incomeBalance * prodactionСoeff;

    return (
      <MainStatistics>
        <MainStatisticsContainer>
          <ColumnMainStatistics>
            {allMaterials >= 0 && <Counter header='Все материалы' count={allMaterials}/>}
            {jailed >= 0 && <Counter header='Посажено' count={jailed}/>}
            {showJailed && incomeJailed >= 0 && <Counter header='Посаженных в секунду' count={incomeJailed.toFixed(1)}/>}
            {showJailed && showInformers && U.fixed(deltaMaterials) && <Counter header='Эффективность' color={true} count={deltaMaterials}/>}
          </ColumnMainStatistics>
          <ColumnMainStatistics>
            {materials >= 0 && <Counter header='Материалы дела' count={materials}/>}
            {showJailed && balance >= 0 && <Counter header='Бюджет' count={balance}/>}
            {showJailed && incomeBalance >= 0 && <Counter header='Прирост бюджета' count={incomeBalance}/>}
            {showJailed && showInformers && courts.outcomeMaterials >= 0 && <Counter header='Потребление материалов' count={courts.outcomeMaterials}/>}
          </ColumnMainStatistics>
        </MainStatisticsContainer>
        <Achievement
          showedShareStage={showedShareStage}
        />
        <ClickButton onClick={addMaterial}>
          Сфабриковать дело
        </ClickButton>
      </MainStatistics>
    )
  }
}

export default connect(mapStateToProps)(MinStatistics)
