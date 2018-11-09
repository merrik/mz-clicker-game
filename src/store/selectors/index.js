import { createSelector } from 'reselect';
import * as R from 'ramda';

export const courtList = [
    {cost: 10, time: 3, result: 10, balance: 100, judgeCost: 100, judgeCostMult: 2, nextCourtCost: 200, secretaryCost: 10},
    {cost: 20, time: 6, result: 12, balance: 120, judgeCost: 200, judgeCostMult: 2, nextCourtCost: 400, secretaryCost: 100},
    {cost: 30, time: 12, result: 15, balance: 150, judgeCost: 300, judgeCostMult: 2, nextCourtCost: 800, secretaryCost: 1000},
    {cost: 40, time: 24, result: 19, balance: 190, judgeCost: 400, judgeCostMult: 2, nextCourtCost: 1600, secretaryCost: 3000},
    {cost: 50, time: 48, result: 26, balance: 225, judgeCost: 500, judgeCostMult: 2, nextCourtCost: 3200, secretaryCost: 5000},
    {cost: 60, time: 96, result: 32, balance: 275, judgeCost: 600, judgeCostMult: 2, nextCourtCost: 6400, secretaryCost: 10000},
    {cost: 70, time: 182, result: 39, balance: 350, judgeCost: 700, judgeCostMult: 2, nextCourtCost: 12800, secretaryCost: 15000},
    {cost: 80, time: 364, result: 47, balance: 400, judgeCost: 800, judgeCostMult: 2, nextCourtCost: 25600, secretaryCost: 20000}
]

export const informerList = [
    {income: 0.000333, last: 0, cost: 10, updateCost: 10, updateCostMult: 1},
    {income: 0.0006, last: 0, cost: 30, updateCost: 20, updateCostMult: 1},
    {income: 0.0008, last: 0, cost: 50, updateCost: 30, updateCostMult: 1 }
]

export const MAX_COURTS = courtList.length
export const MAX_INFORMERS = informerList

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


const STATUS_FREE = 'STATUS_FREE';
const STATUS_BUSY = 'STATUS_BUSY';

const judgesSelector = state => state.game.judges;
const courtQueueSelector = state => state.game.judgesQueue;
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

export const judgesByCourts = createSelector(
    judgesSelector,
    courtQueueSelector,
    (judges, courtQueue) => {
        const flattenQueue = R.pluck('judge')(courtQueue)
        const judgesWithStatus = judges.map((el, idx) => {
            el.status = flattenQueue.indexOf(idx) > -1 ? STATUS_BUSY : STATUS_FREE
            el.judge = idx
            return el
        })
        return R.groupBy(el => el.court, judgesWithStatus)
    }
)
