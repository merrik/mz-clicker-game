import React, {Component} from 'react';
import {connect} from 'react-redux';
import Modal from './StageModal';
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
import Share from './Share';
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

const mapStateToProps = (state) => {
  const {game} = state;
  return {
    courts: S.courts(state),
    courtList: S.courtList,
    balance: S.balance(state),
    informers: S.informers(state),
    upgrades: S.upgrades(state),
    allMaterials: S.allMaterials(state),
    informersOwned: game.informersOwned,
    queue: game.queue,
    secretaries: game.secretaries,
    jailed: game.jailed,
    shareStage: game.shareStage,
    showedShareStage: game.showedShareStage,
    upgradesAvailable: game.upgradesAvailable
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

const courtArray = ({courts, sendMaterials, updateCourt, balance}) => {
  const {
    courtsArr
  } = courts;

  return courtsArr.map((court, index) => {
    const {
      upgradeCost
    } = court;

    return (
      <Court
        balance={balance}
        court={court}
        key={index}
        onClick={() => updateCourt({cost: upgradeCost, index})}
      />
    )
  })
};

const upgradesArray = ({upgrades, buyUpgrade, balance}) => {
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
        balance={balance}
        description={description}
        cost={cost}
        key={name}
        onClick={() => buyUpgrade({cost, index})}
      />
    )
  })
};

const informersArray = ({informers, informersOwned, updateInformer, balance}) => {
  const {
    informersArr
  } = informers;

  return informersArr.map((informer, index) => {
    const {
      name,
      production,
      upgradeCost,
      oneProduction,
      owned
    } = informer;

    return (
      <Informer
        name={name}
        income={production}
        key={index}
        oneProduction={oneProduction}
        balance={balance}
        updateCost={upgradeCost}
        owned={owned}
        enoughBudget={balance >= upgradeCost}
        updateInformer={
          () => {
            updateInformer({cost: upgradeCost, index})
          }
        }
      />)
  })
};

class GameField extends Component {
  state = {
    isOpenModal: false,
    stage: {}
  };

  handleClose = () => {
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

    if(upgrades.length > 0 && !upgradesAvailable) {
      this.props.setUpgradesAvailable();
    }

    if (shareStage <= showedShareStage) return;

    if (shareStage > 0 && shareStage < stageShareList.length) {
      this.setState({
        stage: stageShareList[shareStage],
        isOpenModal: true
      });
      this.props.setShowedShareBanner(shareStage);
    }
  }

  render() {
    const {
      addMaterial,
      addInformer,
      resetGame,
      addCourt,
      balance,
      courts,
      jailed,
      informers,
      allMaterials,
      showedShareStage,
      upgradesAvailable
    } = this.props;

    const {
      isOpenModal,
      stage
    } = this.state;

    const {
      courtsArr
    } = courts;

    const {
      informersArr
    } = informers;

    let nextCourtCost = 0;
    let nextInformerCost = 0;
    const nextCourt = courtsArr.length < courtList.length ? courtList[courtsArr.length] : null;
    const nextInformer = informersArr.length < informerList.length ? informerList[informersArr.length] : null;

    if (nextCourt) {
      nextCourtCost = nextCourt.cost;
    }

    if (nextInformer) {
      nextInformerCost = nextInformer.cost
    }

    const courtsAvailable = allMaterials >= progressPoint.courtsAvailable;

    return (
      <GameArea>
        {stage.title ? (
          <Modal
            title={stage.title}
            text={stage.description}
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
              jailed={jailed}
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
            <Share/>
          ) : null
        }
        <Main>
          {courtsAvailable ?
            <Column maxWidth={'340px'}>
              <TitleColumn>Суды</TitleColumn>
              {courtArray(this.props)}
              {nextCourt ? (
                <AddButton
                  align={'start'}
                  onClick={() => addCourt({cost: nextCourtCost})}
                  disabled={nextCourtCost > balance}
                >
                  {(`Добавить ${nextCourt.name} $${U.makeFormatM(nextCourtCost)}`)}
                </AddButton>
              ) : null
              }
            </Column> : null
          }
          {jailed >= progressPoint.informersAvailable ?
            <Column maxWidth={'330px'}>
              <TitleColumn>Доносчики</TitleColumn>
              {informersArray(this.props)}
                <AddButton
                  align={'start'}
                  onClick={() => addInformer({cost: nextInformerCost})}
                  disabled={nextInformerCost > balance}
                >
                  Добавить доносчика ${U.makeFormatM(nextInformerCost)}
                </AddButton>
            </Column> : null
          }
          {upgradesAvailable ?
            <Column maxWidth={'300px'}>
              <TitleColumn>Улучшения</TitleColumn>
              {upgradesArray(this.props)}
            </Column> : null
          }
        </Main>
      </GameArea>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameField)
