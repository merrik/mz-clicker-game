import React, {Component} from 'react';
import {connect} from 'react-redux';
import Modal from './StageModal';
import {PHASE_TWO_STAGE} from '../store/constants'
import {
  addMaterial,
  removeMaterials,
  addCourt,
  addInformer,
  updateInformer,
  resetGame,
  updateCourt,
  buyUpgrade,
  setShowedShareBanner,
  setUpgradesAvailable
} from '../store/actions'
import {courtList, informerList, progressPoint, stageShareList} from "../store/selectors";

import Computer from './Computer';
import Court from './Court';
import Informer from './Informer'
import Upgrade from './Upgrade';
import ShareGameArea from './ShareGameArea';
import {
  Column,
  Row,
  TitleColumn,
  AddButton,
  GameArea,
  Main,
  Head
} from "./index";

import MinStatistics from './MinStatistics';

import * as S from '../store/selectors';
import * as U from "../utils";
import * as PropTypes from "prop-types";
import * as analytic from '../analytics';

const mapStateToProps = (state) => {
  const {game} = state;
  const showedShareStage = game.showedShareStage;

  const informersAvailable = game.jailed >= progressPoint.informersAvailable;


  return {
    courtList: S.courtList,
    courtsAvailable: S.allMaterials(state) >= progressPoint.courtsAvailable,
    informersOwned: game.informersOwned,
    shareStage: game.shareStage,
    showedShareStage: game.showedShareStage,
    upgradesAvailable: game.upgradesAvailable,
    informersAvailable,
  };
};

const mapDispatchToProps = {
  addMaterial,
  addCourt,
  addInformer,
  updateInformer,
  resetGame,
  updateCourt,
  buyUpgrade,
  setShowedShareBanner,
  setUpgradesAvailable
};


@connect((state) => {
  const game = state.game;
  const showedShareStage = game.showedShareStage;
  const courts = S.courts(state);
  const balance = S.balance(state);
  const upgradable = courts.courtsArr.map(x => balance > x.upgradeCost);
  const courtsArr = courts.courtsArr;

  let nextCourtCost = 0;
  const nextCourt = courtsArr.length < S.courtList.length && (
    courtsArr.length < 5 || (
      courtsArr.length >= 5 && showedShareStage >= PHASE_TWO_STAGE
    )
  )  ? courtList[courtsArr.length] : null;
  if (nextCourt) {
    nextCourtCost = nextCourt.cost;
  }

  return {
    courts,
    nextCourt,
    nextCourtAvailable: balance > nextCourtCost,
    nextCourtCost,
    upgradable,
  }
})
class Courts extends Component {
  shouldComponentUpdate(nextProps){
    for (const name in nextProps){
      if (this.props[name] != nextProps[name]) {
        if (name === 'upgradable') {
          for (let i = 0; i< nextProps[name].length; i++) {
            if (this.props[name][i] !== nextProps[name][i])
              return true;
          }
        }
        else {
          return true;
        }
      }
    }
    return false;
  }
  render() {
    const {courts, nextCourtAvailable, nextCourt, nextCourtCost, dispatch, upgradable} = this.props;
    const existedCourts = courts.courtsArr.map((court, index) => {
      const {
        upgradeCost
      } = court;

      return (
        <Court
          court={{...court, upgradable: upgradable[index]}}
          key={index}
          onClick={() => dispatch(updateCourt({cost: upgradeCost, index}))}
        />
      )
    });
    return <Column maxWidth={"340px"}>
      <TitleColumn>Суды</TitleColumn>
      {existedCourts}
      {this.props.nextCourt ? (
        <AddButton
          align={"start"}
          onClick={() => dispatch(addCourt({cost: nextCourtCost}))}
          disabled={!nextCourtAvailable}
        >
          {(`Добавить ${nextCourt.name} $${U.makeFormatM(nextCourtCost)}`)}
        </AddButton>
      ) : null
      }
    </Column>;
  }
}

Courts.propTypes = {
  courtsSendMaterialsUpdateCourtBalance: PropTypes.any,
  nextCourt: PropTypes.any,
  onClick: PropTypes.func,
  nextCourtCost: PropTypes.any,
  balance: PropTypes.any
};


@connect((state) => {
  const {game} = state;
  const showedShareStage = game.showedShareStage;
  let nextInformerCost = 0;
  const balance = S.balance(state);
  const informers = S.informers(state);
  const upgradable = informers.informersArr.map(x => balance > x.upgradeCost);
  const informersArr = informers.informersArr;
  const nextInformer = informersArr.length < informerList.length && (informersArr.length < 5 || (informersArr.length >= 5 && showedShareStage >= PHASE_TWO_STAGE)) ? informerList[informersArr.length] : null;

  if (nextInformer) {
    nextInformerCost = nextInformer.cost
  }

  return {
    nextInformerCost,
    nextInformerCostAvailable: balance > nextInformerCost,
    nextInformer,
    informers,
    upgradable,
  }
})
class Informers extends Component {
  shouldComponentUpdate(nextProps){
    for (const name in nextProps){
      if (this.props[name] != nextProps[name]) {
        if (name === 'upgradable') {
          for (let i = 0; i< nextProps[name].length; i++) {
            if (this.props[name][i] !== nextProps[name][i])
              return true;
          }
        }
        else {
          return true;
        }
      }
    }
    return false;
  }
  render() {
    const {informers, nextInformerCost, nextInformer, nextInformerCostAvailable, dispatch, upgradable} = this.props;
    const informersExists = informers.informersArr.map((informer, index) => {
      const {
        name,
        production,
        upgradeCost,
        oneProduction,
        owned,
      } = informer;

      return (
        <Informer
          name={name}
          income={production}
          key={index}
          oneProduction={oneProduction}
          updateCost={upgradeCost}
          upgradable={upgradable[index]}
          owned={owned}
          updateInformer={
            () => {
              dispatch(updateInformer({cost: upgradeCost, index}))
            }
          }
        />)
    });
    return <Column maxWidth={"330px"}>
      <TitleColumn>Доносчики</TitleColumn>
      {informersExists}
      {nextInformer ? <AddButton
        align={"start"}
        onClick={() => dispatch(addInformer({cost: nextInformerCost}))}
        disabled={!nextInformerCostAvailable}
      >
        Добавить доносчика ${U.makeFormatM(this.props.nextInformerCost)}
      </AddButton> : null
      }
    </Column>;
  }
}

Informers.propTypes = {
  informersInformersOwnedUpdateInformerBalance: PropTypes.any,
  onClick: PropTypes.func,
  nextInformerCost: PropTypes.any,
  balance: PropTypes.any
};

@connect((state) => {
  const upgrades = S.upgrades(state);
  const balance = S.balance(state);
  return {
    upgrades,
    upgradable: upgrades.map(x => balance > x.cost)
  }
})
class Upgrades extends Component {
  shouldComponentUpdate(nextProps) {
    for (let p in nextProps) {
      if (this.props[p] !== nextProps[p]) {
        if (p === 'upgradable') {
          for (let i = 0; i < nextProps[p].length; i++) {
            if (this.props[p][i] !== nextProps[p][i]) {
              console.log('upgradable')
              return true;
            }
          }
        }
        else {
          console.log('upgrades not equal', p)
          return true;
        }
      }
    }
    return false;
  }
  render() {

    const {upgrades, upgradable, dispatch} = this.props;

    return <Column maxWidth={"300px"}>
      <TitleColumn>Улучшения</TitleColumn>
      {upgrades.map((upgrade, num) => {
        const {
        name,
        description,
        cost,
        index
      } = upgrade;

        return (
        <Upgrade
        name={name}
        isAvailable={upgradable[num]}
        description={description}
        cost={cost}
        key={name}
        onClick={() => dispatch(buyUpgrade({cost, index}))}
        />
        )
      })}
    </Column>;
  }
}

Upgrades.propTypes = {upgradesBuyUpgradeIsAvailable: PropTypes.any};

class GameField extends Component {
  state = {
    isOpenModal: false,
    stage: {},
    stageIndex: 0
  };

  handleClose = () => {
    if (this.state.stageIndex === 1) {
      analytic.GAGameStart();
    }
    this.setState({
      isOpenModal: false
    });
  };

  componentWillReceiveProps(nextProps) {
    const {
      shareStage,
      showedShareStage,
      upgrades,
      upgradesAvailable
    } = nextProps;

    if (shareStage <= showedShareStage) return;

    if (shareStage > 0 && shareStage < stageShareList.length) {
      this.setState({
        stageIndex: shareStage,
        stage: stageShareList[shareStage],
        isOpenModal: true
      });
      this.props.setShowedShareBanner(shareStage);
    }
  }

  render() {
    const {
      addMaterial,
      showedShareStage,
      upgradesAvailable,
      courtsAvailable,
      informersAvailable,
    } = this.props;

    const {
      isOpenModal,
      stage
    } = this.state;


    return (
      <GameArea>
        {stage.title ? (
          <Modal
            title={stage.title}
            text={stage.description}
            params={stage.params}
            backgroundImg={stage.backgroundImg}
            fadeIn={isOpenModal}
            handleClose={this.handleClose}
          />
        ) : null
        }
        <Head
          column={!courtsAvailable}
        >
          { courtsAvailable ? (
            <Computer
              addMaterial={() => {
                addMaterial()
              }}
            /> ) : null
          }
          <MinStatistics
            showedShareStage={showedShareStage}
            addMaterial={() => {
              addMaterial()
            }}
            miniStatistic={!courtsAvailable}
          />
        </Head>
        {
          courtsAvailable ? (
            <ShareGameArea
            />
          ) : null
        }
        <Main>
          {courtsAvailable ?
            <Courts /> : null
          }
          {informersAvailable ?
            <Informers />: null
          }
          {upgradesAvailable ?
            <Upgrades /> : null
          }
        </Main>
      </GameArea>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameField)
