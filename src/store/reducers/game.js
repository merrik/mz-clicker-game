import * as R from 'ramda';
import * as C from '../constants';
import * as S from '../selectors';
import * as U from '../../utils';
import {informerList, courtList, upgradesList, stageShareList, courtCalculate} from "../selectors";
import {progressPoint} from "../selectors";



let persistedState = U.loadState(C.LOCAL_STORAGE_KEY);

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

const calculateIncomeFromCourts = (calculate, allMaterials) => {
  if (calculate.outcomeMaterials > 0) {
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
  const {
    jailed,
    allMaterials
  } = state;
  for(let i = 1; i < stageShareList.length; i++) {
    if(stageShareList[i].materialsPoint) {
      if(allMaterials >= stageShareList[i].materialsPoint && i > state.showedShareStage) {
        return i;
      }
    }
    if(jailed >= stageShareList[i].point && i > state.showedShareStage) {
      return i;
    }
  }
  return 0;
};

const initialState = {
  allMaterials: 0,
  materials: 0,

  jailed: 0,
  balance: 100000000,

  courts: [1],
  upgrades: [],

  shareStage: 0,
  showedShareStage: 0,

  informers: [],
  lastUpdate: 0,
  clickModifier: 1,
  clickStat: 0,
  courtsModifierBalance: 1,
  courtsJailedModifier: 1,
  courtsModifierMaterials: 1,
  courtsLocalModifier: {},
  informerModifier: 1,
  informerLocalModifier: {},
  buyingItems: {},
  moneyClick: false,
  upgradesAvailable: false,
  calcDate: Date.now()
};

export default (state = persistedState || initialState, action) => {
  switch (action.type) {
    case C.CALCULATE: {
      const shareStage = calculateShareStage(state);
      if (state.allMaterials < progressPoint.courtsAvailable) return {
        ...state,
        calcDate: action.timestamp,
        shareStage
      };
      const timeCoeff = Math.min(10, (action.timestamp - state.calcDate) / 1000);
      const infromersIncome = calculateIncomeFromInformers({state}) * timeCoeff;
      const nextMaterialsCount = state.materials + (infromersIncome);


      const courtOutcome = R.map(x => x * timeCoeff, courtCalculate(state));

      const courtsResult = calculateIncomeFromCourts(courtOutcome, state.materials + infromersIncome);
      let materialsResult = nextMaterialsCount - courtsResult.outcomeMaterials;

      if (materialsResult < 0) {
        materialsResult = 0;
      }

      const incomeUpgrade = calculateIncomeUpgrades(state);

      const res = {
        ...state,
        balance: state.balance + courtsResult.incomeBalance,
        jailed: state.jailed + courtsResult.incomeJailed,
        materials: materialsResult,
        allMaterials: state.allMaterials + infromersIncome,
        upgrades: incomeUpgrade,
        shareStage,
        calcDate: action.timestamp
      };

      if (incomeUpgrade.length > 0)
      {
        res.upgradesAvailable = true
      }

      return res;
  }
    case C.ADD_MATERIAL:
      let balance = state.balance;

      const clickBonus = action.qty * state.clickModifier

      if (state.moneyClick) {
        balance += clickBonus
      }

      return {
        ...state,
        materials: state.materials + clickBonus,
        allMaterials: state.allMaterials + clickBonus,
        balance,
        clickStat: state.clickStat + 1,
      };
    case C.APPEND_MATERIALS:
      return {
        ...state,
        materials: state.materials + action.qty
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
    case C.SET_UPGRADES_AVAILABLE:
      return {
        ...state,
        upgradesAvailable: true
      };
    default:
      return state
  }
}
