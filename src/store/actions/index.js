import * as C from '../constants'
import * as U from '../../utils';
import * as analytic from '../../analytics';

export const calculate = ({timestamp}) => ({
  type: C.CALCULATE,
  timestamp: timestamp
});

export const addMaterial = () => 
  (dispatch, getState) => {
    const { clickStat } = getState().game;
    if ((clickStat % 100) === 0) {
      analytic.GAClicks(clickStat)
    }
    dispatch({
      type: C.ADD_MATERIAL,
      target: C.MATERIALS,
      qty: 1
    })
  }

export const removeMaterials = ({timestamp, qty}) => ({
  type: C.ADD_MATERIAL,
  timestamp: timestamp,
  target: C.MATERIALS,
  qty: -1 * qty
});

export const buyUpgrade = ({cost, index}) => {
  analytic.GABuy(`upgrade_index_${index}`);
  return {
    type: C.BUY_UPGRADE,
    cost,
    index
  }
};

export const addCourt = ({cost}) => {
  analytic.GABuy('new_court');
  return {
    type: C.ADD_COURT,
    cost
  };
};

export const updateCourt = ({index, cost}) => {
  analytic.GABuy('update_court');
  return({
    type: C.UPDATE_COURT,
    courtIndex: index,
    cost
  });
};

export const addInformer = ({cost}) => {
  analytic.GABuy('new_informer');
  return {
  type: C.ADD_INFORMER,
  cost
  }
};

export const updateInformer = ({index, cost}) => {
  analytic.GABuy('update_informer');
  return {
    type: C.UPDATE_INFORMER,
    index,
    cost
  }
};

export const addSecretary = ({index, cost}) => ({
  type: C.ADD_SECRETARY,
  index,
  cost
});

export const resetGame = () => {
  analytic.GAGameRestart();
  return {
  type: C.RESET_GAME
  }
}

export const setShowedShareBanner = (index) => {
  analytic.GAReachedStage(index);
  return {
  type: C.SET_SHOWED_SHARE_BANNER,
  index
  }
}

export const setUpgradesAvailable = () => ({
  type: C.SET_UPGRADES_AVAILABLE
});
