import {createSelector} from 'reselect';
import * as U from "../../utils";

export const upgradesList = [
  {index: 0, name: 'КЛИНОК АРМАГЕДОНА', courtBalance: 0.1, cost: 2000, point: 10000},
  {index: 1, name: 'ТЯПКА', click: 1, cost: 10000, point: 100000}
];
// optimal rate between 1.07 and 1.15
export const courtList = [
  {name: 'Суд 1', materials: 10, productionJailed: 2, productionBalance: 1, cost: 100, rate: 1.11},
  {name: 'Суд 2', materials: 20, productionJailed: 4, productionBalance: 10, cost: 1000, rate: 1.11},
  {name: 'Суд 3', materials: 30, productionJailed: 6, productionBalance: 45, cost: 10000, rate: 1.11},
  {name: 'Суд 4', materials: 40, productionJailed: 10, productionBalance: 400, cost: 130000, rate: 1.11},
  {name: 'Суд 5', materials: 50, productionJailed: 20, productionBalance: 40000, cost: 1400000, rate: 1.11},
  {name: 'Суд 6', materials: 60, productionJailed: 40, productionBalance: 400000, cost: 40000000, rate: 1.11},
  {name: 'Суд 7', materials: 70, productionJailed: 60, productionBalance: 3000000, cost: 30000000, rate: 1.11},
  {name: 'Суд 8', materials: 80, productionJailed: 100, productionBalance: 50000000, cost: 500000000, rate: 1.11},
];

export const informerList = [
  {name: 'Доносчик 1', production: 1, cost: 100, rate: 1.11},
  {name: 'Доносчик 2', production: 10, cost: 5000, rate: 1.11},
  {name: 'Доносчик 3', production: 50, cost: 30000, rate: 1.11},
];

export const MAX_COURTS = courtList.length;
export const MAX_INFORMERS = informerList.length;

export const intBalance = state => Math.floor(state.game.balance)
export const balance = createSelector(
  intBalance,
  (b) => b
);

export const intMaterials = state => Math.floor(state.game.materials)
export const materials = createSelector(
  intMaterials,
  (b) => b
);

const informersState = state => state.game.informers;
const courtsState = state => state.game.courts;
const upgradesState = state => state.game.upgrades;

export const courts = createSelector(
  courtsState,
  (courtsState) =>
    courtList
      .slice(0, courtsState.length)
      .map((court, index) => {
        const owned = courtsState[index];
        return {
          ...court,
          productionJailed: U.production({
            production: court.productionJailed,
            owned,
            multipliers: 1
          }),
          productionBalance: court.productionBalance,
          materials: court.materials,
          upgradeCost: U.nextCost({base: court.cost, rate: court.rate, owned}),
        };
      })
);

export const court = (_, props) => courtList[props.index];

export const upgrades = createSelector(
  upgradesState,

);

export const informers = createSelector(
  informersState,
  (informersState) =>
    informerList
      .slice(0, informersState.length)
      .map((informer, index) => {
        const owned = informersState[index];
        return {
          ...informer,
          production: U.production({
            production: informer.production,
            owned,
            multipliers: 1
          }),
          upgradeCost: U.nextCost({base: informer.cost, rate: informer.rate, owned}),
        }
      })
);

export const informer = (_, props) => informerList[props.index]
