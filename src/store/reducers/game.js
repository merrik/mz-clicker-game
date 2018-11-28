import * as R from 'ramda';
import * as C from '../constants';
import * as S from '../selectors';
import * as U from '../../utils';
import {informerList, courtList, upgradesList, stageShareList} from "../selectors";
import {progressPoint} from "../selectors";

const LOCAL_STORAGE_KEY = 'game-state';

let persistedState = U.loadState(LOCAL_STORAGE_KEY);

const calculateIncomeFromInformers = ({state}) => {
  const {informers} = state;
  let income = 0;

  for (let i = 0; i < informers.length; i++) {
    let multipliers = state.informerModifier;
    if (state.informerLocalModifier[i]) {
      multipliers = multipliers * state.informerLocalModifier[i].createMaterial;
    }

    income += U.production({
      production: informerList[i].production,
      owned: informers[i],
      multipliers: multipliers <= 0 ? 1 : multipliers
    });
  }

  return income
};

const calculateIncomeFromCourts = (state, infromersIncome) => {
  const {courts} = state;
  const calculate = {
    incomeBalance: 0,
    incomeJailed: 0,
    outcomeMaterials: 0
  };

  for (let i = 0; i < courts.length; i++) {
    let multipliersJailed = state.courtsJailedModifier;
    let multipliersBalance = state.courtsModifierBalance;
    let multipliersMaterials = state.courtsModifierMaterials;
    const localModifier = state.courtsLocalModifier[i];

    if (localModifier && localModifier.jailed) {
      multipliersJailed = multipliersJailed * localModifier.jailed
    }

    if (localModifier && localModifier.balance) {
      multipliersBalance = multipliersBalance * localModifier.balance
    }

    if (localModifier && localModifier.materials) {
      multipliersMaterials = multipliersMaterials * localModifier.materials
    }

    calculate.incomeBalance += U.production({
      production: courtList[i].productionBalance,
      owned: courts[i],
      multipliers: multipliersBalance <= 0 ? 1 : multipliersBalance
    });

    calculate.incomeJailed += U.production({
      production: courtList[i].productionJailed,
      owned: courts[i],
      multipliers: multipliersJailed <= 0 ? 1 : multipliersJailed
    });

    calculate.outcomeMaterials += U.production({
      production: courtList[i].materials,
      owned: courts[i],
      multipliers: multipliersMaterials <= 0 ? 1 : multipliersMaterials
    });
  }

  if (calculate.outcomeMaterials > 0) {
    const allMaterials = state.materials + infromersIncome;
    const prodactionСoeff = Math.min(allMaterials / calculate.outcomeMaterials, 1);

    calculate.incomeJailed = calculate.incomeJailed * prodactionСoeff;
    calculate.incomeBalance = calculate.incomeBalance * prodactionСoeff;
  }

  return calculate;
};

const calculateIncomeUpgrades = (state) => {
  let availableUpgrades = [];
  for (let i = 0; i <= upgradesList.size; i++) {
    const upgrade = upgradesList.get(i);
    if (state.buyingItems[i]) continue;
    if (!upgrade) continue;
    if(upgrade.jailedPoint) {
      if(state.jailed >= upgrade.jailedPoint) {
        availableUpgrades.push(i);
      }
    }

    if(upgrade.courtIndex) {
      if (state.courts[upgrade.courtIndex] >= upgrade.point) {
        availableUpgrades.push(i);
      }
    }
    if(upgrade.informerIndex) {
      if (state.informers[upgrade.informerIndex] >= upgrade.point) {
        availableUpgrades.push(i);
      }
    }
  }

  return availableUpgrades
};

const calculateShareStage = state => {
  let shareStageLvl = 0;
  const jailed = state.jailed;
  for(let i = 1; i < stageShareList.length; i++) {
    if(jailed >= stageShareList[i].point && i > state.showedShareStage) {
      shareStageLvl = i;
      return shareStageLvl;
    }
  }
  return shareStageLvl;
};

const initialState = {
  allMaterials: 0,
  materials: 0,

  jailed: 0,
  balance: 0,

  courts: [1],
  upgrades: [],

  shareStage: 0,
  showedShareStage: 0,

  informers: [],
  lastUpdate: 0,
  clickModifier: 1,
  courtsModifierBalance: 1,
  courtsJailedModifier: 1,
  courtsModifierMaterials: 1,
  courtsLocalModifier: {},
  informerModifier: 1,
  informerLocalModifier: {},
  buyingItems: {},
  moneyClick: false,
  saveDate: Date.now(),
  pause: false,
  upgradesAvailable: false
};

export default (state = persistedState || initialState, action) => {
  switch (action.type) {
    case C.CALCULATE:
      if (state.pause) return state;
      if (state.allMaterials < progressPoint.courtsAvailable) return state;
      const infromersIncome = calculateIncomeFromInformers({state});
      const nextMaterialsCount = state.materials + (infromersIncome);
      let saveDate = state.saveDate;

      const courtsResult = calculateIncomeFromCourts(state, infromersIncome);
      let materialsResult = nextMaterialsCount - courtsResult.outcomeMaterials;

      if (Date.now() - C.SAVE_DELTA_TIME > saveDate) {
        U.saveState(LOCAL_STORAGE_KEY, state);
        saveDate = Date.now();
      }

      if (materialsResult < 0) {
        materialsResult = 0;
      }

      const incomeUpgrade = calculateIncomeUpgrades(state);
      const shareStage = calculateShareStage(state);

      return {
        ...state,
        balance: state.balance + courtsResult.incomeBalance,
        jailed: state.jailed + courtsResult.incomeJailed,
        materials: materialsResult,
        allMaterials: state.allMaterials + infromersIncome,
        upgrades: incomeUpgrade,
        shareStage,
        saveDate
      };
    case C.ADD_MATERIAL:
      let balance = state.balance;

      if (state.moneyClick) {
        balance += action.qty * state.clickModifier
      }

      return {
        ...state,
        materials: state.materials + action.qty * state.clickModifier,
        allMaterials: state.allMaterials + action.qty * state.clickModifier,
        balance
      };
    case C.APPEND_MATERIALS:
      return {
        ...state,
        materials: state.materials + action.qty
      };
    case C.HANDLE_PAUSE_GAME:
      return {
        ...state,
        pause: action.pause
      };
    case C.SET_SHOWED_SHARE_BANNER:
      return {
        ...state,
        showedShareStage: action.index
      };
    case C.SET_MATERIAL_TO_COURT:
      return {
        ...state,
        queue: [...state.courtQueue, {
          timestamp: action.timestamp,
          index: action.index
        }]
      };
    case C.ADD_COURT:
      const courtsSize = state.courts.length;
      if (action.cost > state.balance) return state;
      if (courtsSize >= S.courtList.length) return state;
      const courts = [...state.courts];
      courts[courtsSize] = 1;

      return {
        ...state,
        courts,
        balance: state.balance - action.cost,
      };
    case C.UPDATE_COURT:
      if (action.cost > state.balance) return state;

      const upgradedCourts = [...state.courts];
      const upgradedCourt = upgradedCourts[action.courtIndex];
      upgradedCourts[action.courtIndex] = upgradedCourt + 1;

      return {
        ...state,
        courts: upgradedCourts,
        balance: state.balance - action.cost
      };
    case C.ADD_INFORMER:
      const informersSize = state.informers.length;
      if (action.cost > state.balance) return state;
      if (informersSize > S.informerList.length) return state;
      const informers = [...state.informers];
      informers[informersSize] = 1;

      return {
        ...state,
        informers,
        balance: state.balance - action.cost
      };
    case C.UPDATE_INFORMER:
      if (action.cost > state.balance) return state;

      const upgradedInformers = [...state.informers];
      const upgradedInformer = upgradedInformers[action.index];
      upgradedInformers[action.index] = upgradedInformer + 1;

      return {
        ...state,
        informers: upgradedInformers,
        balance: state.balance - action.cost
      };
    case C.ADD_SECRETARY:
      if (action.cost > state.balance || state.secretaries.indexOf(action.index) > -1) return state;
      return {
        ...state,
        secretaries: [...state.secretaries, action.index],
        balance: state.balance - action.cost
      };
    case C.BUY_UPGRADE:
      if (action.cost > state.balance || !upgradesList.get(action.index)) return state;
      const upgrade = upgradesList.get(action.index);
      let buffs = [];
      let skills = [];
      let index = '';

      if(upgrade.informerIndex) {
        index = upgrade.informerIndex;
      }

      if(upgrade.courtIndex) {
        index = upgrade.courtIndex;
      }

      if(upgrade.buffs) {
        buffs = upgrade.buffs;
      }

      if(upgrade.skills) {
        skills = upgrade.skills;
      }

      let newModifiers = {};

      newModifiers = buffs.reduce((prev, curr) => {
        if(buffs) {
          if (typeof curr[1] === 'object') {
            let value = state[[curr[0]]];
            let balance = 1;
            let jailed = 1;
            let materials = 1;
            let createMaterial = 1;
            if (!value[index]) {
              value[index] = {
                balance,
                jailed,
                materials,
                createMaterial
              };
            }

            if (curr[1].balance) {
              value[index].balance = value[index].balance * curr[1].balance;
            }

            if (curr[1].jailed) {
              value[index].jailed = value[index].jailed * curr[1].jailed;
            }

            if (curr[1].materials) {
              value[index].materials = value[index].materials * curr[1].materials;
            }

            if (curr[1].createMaterial) {
              value[index].createMaterial = value[index].createMaterial * curr[1].createMaterial;
            }
            return {...prev, [curr[0]]: value}
          }
          return {...prev, [curr[0]]: state[curr[0]] + curr[1]}
        }
        }, {});
      const upgrades = R.reject(R.equals(action.index), state.upgrades);
      const buyingItems = {...state.buyingItems};
      buyingItems[action.index] = true;
      return {
        ...state,
        ...newModifiers,
        ...skills,
        balance: state.balance - action.cost,
        upgrades,
        buyingItems,
      };
    case C.RESET_GAME:
      return initialState;
    default:
      return state
  }
}