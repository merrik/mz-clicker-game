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
  handlePauseGame,
  setShowedShareBanner
} from '../store/actions'
import {courtList, informerList, progressPoint, stageShareList} from "../store/selectors";

import ClickArea from './ClickArea';
import Court from './Court';
import Informer from './Informer'
import Upgrade from './Upgrade';
import {
  Column,
  Row,
  TitleColumn
} from "./index";

import Statistics from './Statistics';

import * as S from '../store/selectors';

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
    showedShareStage: game.showedShareStage
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
  handlePauseGame,
  setShowedShareBanner
};

const courtArray = ({courts, sendMaterials, updateCourt}) => {
  const {
    courtsArr
  } = courts;

  return courtsArr.map((court, index) => {
    const {
      name,
      materials,
      productionJailed,
      productionBalance,
      upgradeCost
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

const informersArray = ({informers, informersOwned, updateInformer, balance}) => {
  const {
    informersArr
  } = informers;

  return informersArr.map((informer, index) => {
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
    this.props.handlePauseGame(false);
  };

  componentWillReceiveProps(nextProps) {
    const {
      shareStage,
      showedShareStage
    } = nextProps;

    if(shareStage <= showedShareStage) return;

    if(shareStage > 0 && shareStage < stageShareList.length) {
      this.setState({
        stage: stageShareList[shareStage],
        isOpenModal: true
      });
      this.props.handlePauseGame(true);
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
      upgrades
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

    return (
      <Row>
        <Statistics/>
        {stage.title ? (
          <Modal
            title={stage.title}
            text={stage.description}
            fadeIn={isOpenModal}
            handleClose={this.handleClose}
          />
          ) : null
        }
        <Column>
          <TitleColumn>Кликни</TitleColumn>
          <ClickArea
            onClick={() => {
              addMaterial()
            }}>
            CLICK ME</ClickArea>
          <button onClick={resetGame}>Заново</button>
        </Column>
        {allMaterials >= progressPoint.courtsAvailable ?
          <Column>
            <TitleColumn>Суды</TitleColumn>
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
          </Column> : null
        }
        {jailed >= progressPoint.informersAvailable ?
          <Column>
            <TitleColumn>Доносчики</TitleColumn>
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
          </Column> : null
        }
        {upgrades.length > 0 ?
          <Column>
            <TitleColumn>Улучшения</TitleColumn>
            {upgradesArray(this.props)}
          </Column> : null
        }
      </Row>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameField)