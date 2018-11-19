import { createSelector } from 'reselect';
import * as R from 'ramda';

// optimal rate between 1.07 and 1.15
export const courtList = [
    {name:'Суд 1', materials: 10, productionJailed: 3, productionBalance: 30, cost: 200, rate: 1.11},
    {name:'Суд 2', materials: 20, productionJailed: 4, productionBalance: 50, cost: 400, rate: 1.11},
    {name:'Суд 3', materials: 30, productionJailed: 6, productionBalance: 75, cost: 1000, rate: 1.11},
    {name:'Суд 4', materials: 40, productionJailed: 10, productionBalance: 100, cost: 1500, rate: 1.11},
    {name:'Суд 5', materials: 50, productionJailed: 20, productionBalance: 300, cost: 3000, rate: 1.11},
    {name:'Суд 6', materials: 60, productionJailed: 40, productionBalance: 800, cost: 10000, rate: 1.11},
    {name:'Суд 7', materials: 70, productionJailed: 60, productionBalance: 1500, cost: 30000, rate: 1.11},
    {name:'Суд 8', materials: 80, productionJailed: 100, productionBalance: 3000, cost: 100000, rate: 1.11},
]

export const informerList = [
    {name:'Доносчик 1', production: 0.33, cost: 10, rate: 1.11},
    {name:'Доносчик 2', production: 0.6, cost: 100, rate: 1.11},
    {name:'Доносчик 3', production: 0.8, cost: 500, rate: 1.11},
]

export const MAX_COURTS = courtList.length;
export const MAX_INFORMERS = informerList.length;

export const intBalance = state => Math.floor(state.game.balance)
export const balance = createSelector(
    intBalance,
    (b) => b
)

export const intMaterials = state => Math.floor(state.game.materials)
export const materials = createSelector(
    intMaterials,
    (b) => b
)

const informersCount = state => state.game.informers;
const courtCount = state => state.game.courts;

export const courts = createSelector(
    courtCount,
    (count) => courtList.slice(0, count + 1)
)

export const court = (_, props) => courtList[props.index]

export const informers = createSelector(
    informersCount,
    (count) => informerList.slice(0, count)
)

export const informer = (_, props) => informerList[props.index]
