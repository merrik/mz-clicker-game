import * as R from 'ramda';
import * as C from '../constants';
import * as S from '../selectors';
import * as U from '../../utils';
import { informerList } from "../selectors";

const LOCAL_STORAGE_KEY = 'game-state';

let persistedState = U.loadState(LOCAL_STORAGE_KEY);
console.log(persistedState);

const calculateIncomeFromInformers = ({state}) => {
  const {informers} = state;
  let income = 0;

  for (let i = 0; i < informers.length; i++) {
    income += U.production({production: informerList[i].production, owned: informers[i], multipliers: 1});
  }

  return income
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
  materials: 100,

  jailed: 0,
  balance: 2000000,

  courts: [],

  secretaries: [],
  secretaryWorkTimestamp: 0,

  informers: [],

  lastUpdate: 0
};

export default (state = persistedState || initialState, action) => {
  switch (action.type) {
    case C.CALCULATE:
      const actualTimestamp = action.timestamp;
      const timeDiff = actualTimestamp - state.lastUpdate;

      const timeIndex = timeDiff / C.SECOND;
      const infromersIncome = calculateIncomeFromInformers({state}) * timeIndex;

      if ((actualTimestamp - state.secretaryWorkTimestamp) > C.SECRETARY_WORKING_DELTA) {
        U.saveState(LOCAL_STORAGE_KEY, state)
      }

      return {
        ...state,
        materials: state.materials + infromersIncome,
        lastUpdate: actualTimestamp
      };
    case C.ADD_MATERIAL:
      return {
        ...state,
        materialsQueue: [...state.materialsQueue, {
          timestamp: action.timestamp,
          qty: action.qty
        }]
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
    case C.RESET_GAME:
      return initialState;
    default:
      return state
  }
}