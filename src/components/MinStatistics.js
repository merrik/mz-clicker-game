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
  MainStatisticsContainer,
  MiniStatistic,
  MiniStatisticProgressBar,
  ProgressContainer,
  MobileStat,
  MobileCounter
} from "./index";
import Achievement from "./Achievement";
import Computer from "./Computer";
import {progressPoint} from "../store/selectors";

class MobileStats extends Component{
  state = {
    show: false
  }
  refEl = null
  componentDidMount(){
    window.addEventListener('scroll', this.onScrollHandler, true)
  }
  componentWillUnmount(){
    window.removeEventListener('scroll', this.onScrollHandler, true)
  }
  onScrollHandler = (e) => {
    if (this.refEl) {
      const newShow = (this.refEl.getBoundingClientRect().top < -40)
      console.log('new show', newShow, this.refEl, this.refEl.getBoundingClientRect().top)
      if (newShow != this.state.show)
      {
        this.setShow(newShow)
      }
    }
  }
  setShow(showed) {
    this.setState(() => ({show: showed}))
  }
  render() {
    const {balance, jailed, deltaMaterials} = this.props
    const {show} = this.state
    const styleObj = show ? {} : {'display': 'none'}
    return (
      <div>
        <div ref={(el) => this.refEl = el}></div>
        <MobileStat  style={styleObj}>
        <MobileCounter>
          ${U.makeFormatM(balance)}
        </MobileCounter>
        <MobileCounter>
          {U.makeFormatM(jailed)}
        </MobileCounter>
        <MobileCounter>
          {U.makeFormatM(deltaMaterials)}
        </MobileCounter>
      </MobileStat>
      </div>
    );
  }

}

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
      miniStatistic,
      showJailed,
      showInformers
    } = this.props;

    const deltaMaterials = parseInt(informers.incomeMaterials - courts.outcomeMaterials);
    const generateMaterials = materials + informers.incomeMaterials;
    const prodactionСoeff = Math.min(generateMaterials / courts.outcomeMaterials, 1);

    const incomeJailed = courts.incomeJailed * prodactionСoeff;
    const incomeBalance = courts.incomeBalance * prodactionСoeff;

    if(miniStatistic) {
      const progress = Math.min(allMaterials / progressPoint.courtsAvailable * 100, 100);


      return (
        <MiniStatistic>
          <Computer
            jailed={jailed}
            addMaterial={addMaterial}
          />
          <ProgressContainer>
            <MiniStatisticProgressBar
              progress={progress}
            />
          </ProgressContainer>
          <ClickButton
            width={'280px'}
            onClick={addMaterial}
            className="click-button"
          >
            Собрать материал
          </ClickButton>
        </MiniStatistic>
      )
    }

    return (
      <MainStatistics>
        <MainStatisticsContainer>
          <ColumnMainStatistics>
            {allMaterials >= 0 && <Counter header='Всего собрано материалов' count={allMaterials} tooltip={'Общее количество материалов, собранных за все время'}/>}
            {jailed >= 0 && <Counter header='Посажено' count={jailed} tooltip={'Всего посажено человек за все время'}/>}
            {showJailed && incomeJailed >= 0 && <Counter header='Посаженных в секунду' count={incomeJailed.toFixed(1)} tooltip={'Количество людей, отправляющихся в тюрьмы ежесекундно'}/>}
            {showJailed && showInformers && U.fixed(deltaMaterials) && <Counter header='Прирост материалов' color={true} count={deltaMaterials} tooltip={'Зеленая цифра показывает, сколько материалов в секунду у вас скапливается. Красная — сколько убывает. Балансируйте между количеством доносчиков и судов.'}/>}
          </ColumnMainStatistics>
          <ColumnMainStatistics>
            {materials >= 0 && <Counter header='Материалы дела' count={materials} tooltip={'Количество материалов дела, пока не переданных в суд'}/>}
            {showJailed && balance >= 0 && <Counter header='Бюджет' count={balance} tooltip={'Количество денег, выделенных за посадки людей'}/>}
            {showJailed && incomeBalance >= 0 && <Counter header='Прирост бюджета' tooltip={'Скорость пополнения бюджета в секунду'} count={incomeBalance}/>}
            {showJailed && showInformers && courts.outcomeMaterials >= 0 && <Counter header='Потребление материалов' count={courts.outcomeMaterials} tooltip={'Количество материалов, забираемых в суд за секунду'}/>}
          </ColumnMainStatistics>
        </MainStatisticsContainer>
        <Achievement/>
        <ClickButton className="click-button">
          Собрать материал
        </ClickButton>
        {/*<MobileStats jailed={jailed} deltaMaterials={deltaMaterials} balance={balance}/>*/}
      </MainStatistics>
    )
  }
}

export default connect(mapStateToProps)(MinStatistics)
