import * as C from '../constants'
import * as U from '../../utils';

export const calculate = ({timestamp}) => ({
  type: C.CALCULATE,
  timestamp: timestamp
});

export const addMaterial = (timestamp) => ({
  type: C.ADD_MATERIAL,
  timestamp: +new Date(),
  target: C.MATERIALS,
  qty: 1
});

export const removeMaterials = ({timestamp, qty}) => ({
  type: C.ADD_MATERIAL,
  timestamp: timestamp,
  target: C.MATERIALS,
  qty: -1 * qty
});

export const buyUpgrade = ({cost, index}) => ({
  type: C.BUY_UPGRADE,
  cost,
  index
});

export const addCourt = ({cost}) => ({
  type: C.ADD_COURT,
  cost
});

export const updateCourt = ({index, cost}) => {
  return({
    type: C.UPDATE_COURT,
    courtIndex: index,
    cost
  });
};

export const addInformer = ({cost}) => ({
  type: C.ADD_INFORMER,
  cost
});

export const updateInformer = ({index, cost}) => ({
  type: C.UPDATE_INFORMER,
  index,
  cost
});

export const addSecretary = ({index, cost}) => ({
  type: C.ADD_SECRETARY,
  index,
  cost
});

export const resetGame = () => ({
  type: C.RESET_GAME
});

export const handlePauseGame = (pause) => ({
  type: C.HANDLE_PAUSE_GAME,
  pause
});

export const setShowedShareBanner = (index) => ({
  type: C.SET_SHOWED_SHARE_BANNER,
  index
});