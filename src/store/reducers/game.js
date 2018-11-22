import * as R from 'ramda';
import * as C from '../constants';
import * as S from '../selectors';
import * as U from '../../utils';
import { informerList, courtList, upgradesList } from "../selectors";
import {saveState} from "../../utils";

const LOCAL_STORAGE_KEY = 'game-state';

let persistedState = U.loadState(LOCAL_STORAGE_KEY);
console.log(persistedState);

const calculateIncomeFromInformers = ({state}) => {
  const {informers} = state;
  let income = 0;

  for (let i = 0; i < informers.length; i++) {
    let multipliers = state.informerModifier;
    if(state.informerLocalModifier[i]) {
      multipliers += state.informerLocalModifier[i];
    }
    income += U.production({production: informerList[i].production, owned: informers[i], multipliers});
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

  for(let i = 0; i < courts.length; i++) {
    let multipliersJailed = state.courtsJailedModifier;
    let multipliersBalance = state.courtsModifierBalance;
    let multipliersMaterials = state.courtsModifierMaterials;
    const localModifier = state.courtsLocalModifier[i];

    if(localModifier && localModifier.jailed) {
      multipliersJailed += localModifier.jailed
    }

    if(localModifier && localModifier.balance) {
      multipliersBalance += localModifier.balance
    }

    if(localModifier && localModifier.materials) {
      multipliersMaterials += localModifier.materials
    }

    calculate.incomeBalance +=  U.production({
      production: courtList[i].productionBalance,
      owned: courts[i],
      multipliers: multipliersBalance
    });

    calculate.incomeJailed += U.production({
      production: courtList[i].productionJailed,
      owned: courts[i],
      multipliers: multipliersJailed
    });

    calculate.outcomeMaterials += U.production({
      production: courtList[i].materials,
      owned: courts[i],
      multipliers: multipliersMaterials
    });
  }

  if(calculate.outcomeMaterials > 0) {
    const allMaterials = state.materials + infromersIncome;
    const prodactionСoeff = Math.min(allMaterials / calculate.outcomeMaterials, 1);

    calculate.incomeJailed = calculate.incomeJailed * prodactionСoeff;
    calculate.incomeBalance = calculate.incomeBalance * prodactionСoeff;
  }

  return calculate;
};

const calculateIncomeUpgrades = (state) => {
  let availableUpgrades = [];


  for(let i = 0; i <= upgradesList.size; i++) {
    const upgrade = upgradesList.get(i);
    if(state.buyingItems[i]) continue;
    if(!upgrade) continue;
    if(state.jailed >= upgrade.point) {
      availableUpgrades.push(i);
    }
  }

  return availableUpgrades
};

const getInintialMaterialsCount = (state) => state.materials;
const calcSessionIncome = ({state, sessionTime}) => {
  return calculateIncomeFromInformers({state})
};
const divideTimeDiffBySessions = ({timeDiff, sessionTime}) => Math.ceil(timeDiff / sessionTime);


if (persistedState) {
  const sessionTime = 1 * C.SECOND;
  const actualTimestamp = Date.now();
  let timeDiff = actualTimestamp - persistedState.lastUpdate;
  if (timeDiff < (10 * C.SECOND)) timeDiff = 0;
  const sessionsCount = divideTimeDiffBySessions({timeDiff, sessionTime});
  let materilas = getInintialMaterialsCount(persistedState);
  const sessionIncome = calcSessionIncome({state: persistedState, sessionTime});
  const courts = S.courts({game: persistedState});
  const materialsBySession = sessionsCount > 0 ? materilas / sessionsCount : 0;

  let restMaterials = materialsBySession + sessionIncome;
  let sessionOutcome = 0;
  let sessionBalanceIncome = 0;
  let sessionJailedIncome = 0;

  const overallIncome = (sessionIncome - sessionOutcome) * sessionsCount;
  const overallBalanceIncome = sessionBalanceIncome * sessionsCount;
  const overallJailedIncome = sessionJailedIncome * sessionsCount;

  persistedState.materials = materilas + overallIncome;
  persistedState.materials = persistedState.materials > 0 ? persistedState.materials : 1
  persistedState.balance += overallBalanceIncome;
  persistedState.jailed += overallJailedIncome;

  persistedState.lastUpdate = Date.now()
}

const initialState = {
  materials: 0,

  jailed: 0,
  balance: 0,

  courts: [1],
  upgrades: [],

  informers: [],

  lastUpdate: 0,
  clickModifier: 1,
  courtsModifierBalance: 1,
  courtsJailedModifier: 1,
  courtsModifierMaterials: 1,
  courtsLocalModifier: [],
  informerModifier: 1,
  informerLocalModifier: [],
  saveDate: Date.now(),
  buyingItems: []
};

export default (state = persistedState || initialState, action) => {
  switch (action.type) {
    case C.CALCULATE:
      const infromersIncome = calculateIncomeFromInformers({state});
      const nextMaterialsCount = state.materials + (infromersIncome);
      let saveDate = state.saveDate;

      const courtsResult = calculateIncomeFromCourts(state, infromersIncome);
      let materialsResult = nextMaterialsCount - courtsResult.outcomeMaterials;

      if(Date.now() - C.SAVE_DELTA_TIME > saveDate) {
        U.saveState(LOCAL_STORAGE_KEY, state);
        saveDate = Date.now();
      }

      if(materialsResult < 0) {
        materialsResult = 0;
      }

      const incomeUpgrade = calculateIncomeUpgrades(state);

      return {
        ...state,
        balance: state.balance + courtsResult.incomeBalance,
        jailed: state.jailed + courtsResult.incomeJailed,
        materials: materialsResult,
        upgrades: incomeUpgrade,
        saveDate
      };
    case C.ADD_MATERIAL:
      return {
        ...state,
        materials: state.materials + action.qty * state.clickModifier,
      };
    case C.APPEND_MATERIALS:
      return {
        ...state,
        materials: state.materials + action.qty
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
      if(action.cost > state.balance || !upgradesList.get(action.index)) return state;
      const buffs = upgradesList.get(action.index).buffs;

      const newModifiers = buffs.reduce((prev, curr) => {
        return {...prev, [curr[0]]: state[curr[0]] * curr[1]}
      }, {});

      const upgrades = R.reject(R.equals(action.index), state.upgrades);
      return {
        ...state,
        ...newModifiers,
        balance: state.balance - action.cost,
        upgrades,
        buyingItems: [...state.buyingItems, action.index]
      };
    case C.RESET_GAME:
      return initialState;
    default:
      return state
  }
}