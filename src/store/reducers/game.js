import * as R from 'ramda';
import * as C from '../constants';
import * as S from '../selectors';
import * as U from '../../utils';
// import * as selectors from '../selectors'

const LOCAL_STORAGE_KEY = 'game-state'

let persistedState = U.loadState(LOCAL_STORAGE_KEY);
console.log(persistedState);

const calculateIncomeFromInfromers = ({state}) => {
    const {informersOwned, informers} = state;
    let income = 0;

    for (let idx = 0; idx < informers; idx++){
        const informer = S.informer(null, {index: idx})
        const owned = informersOwned[idx] ? informersOwned[idx] : 1
        income += U.production({production: informer.income, owned, multipliers: 1})
    }

    return income
}

const getInintialMaterialsCount = (state) => state.materials 
const calcSessionIncome = ({state, sessionTime}) => { return calculateIncomeFromInfromers({state}) }
// const calcSessionGeneratorsResults = ({state, timeDiff}) => { return {jailed, balance, materials} } 
const divideTimeDiffBySessions = ({timeDiff, sessionTime}) => Math.ceil(timeDiff / sessionTime)


if (persistedState) {
    const sessionTime = 1 * C.SECOND
    const actualTimestamp = Date.now()
    let timeDiff = actualTimestamp - persistedState.lastUpdate
    if (timeDiff < (10 * C.SECOND)) timeDiff = 0
    const sessionsCount = divideTimeDiffBySessions({timeDiff, sessionTime})
    let materilas = getInintialMaterialsCount(persistedState)
    const sessionIncome = calcSessionIncome({state: persistedState, sessionTime})
    const JBC = S.judgesByCourts({game: persistedState});
    const courts = S.courts({game: persistedState});
    const materialsBySession = sessionsCount > 0 ? materilas / sessionsCount : 0

    let restMaterials = materialsBySession + sessionIncome;
    let sessionOutcome = 0;
    let sessionBalanceIncome = 0;
    let sessionJailedIncome = 0;

    for (const courtIndex in JBC) {
        const currentCourt = courts[courtIndex];
        const courtTimeIndex = sessionTime / (currentCourt.time * C.SECOND);
        if (currentCourt.cost < restMaterials) {
            for (const judge in JBC[courtIndex]) {
                if (currentCourt.cost < restMaterials) {
                    restMaterials -= currentCourt.cost * courtTimeIndex
                    sessionOutcome += currentCourt.cost * courtTimeIndex
                    sessionBalanceIncome += currentCourt.balance * courtTimeIndex
                    sessionJailedIncome += currentCourt.result * courtTimeIndex
                }
            }
        }
        
        console.log(sessionOutcome, sessionBalanceIncome, sessionJailedIncome);
    }

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
    materialsQueue: [],

    jailed: 0,
    balance: 1000,

    courts: 0,

    queue: [],
    secretaries: [],
    secretaryWorkTimestamp: 0,

    informers: 0,
    informersOwned: [],

    lastUpdate: 0
}

export default (state = persistedState || initialState, action) => {
    switch (action.type) {
        case C.CALCULATE:
            const actualTimestamp = action.timestamp
            const timeDiff = actualTimestamp - state.lastUpdate

            const materialCount = state.materialsQueue
                .filter(U.expired(actualTimestamp))
                .reduce(U.reduceQTY, 0)

            const income = calculateIncomeFromInfromers({state})
            
            const actualQueue = state.queue
                .filter(U.expired(actualTimestamp))
                .map(el => {
                    const court = S.court(null, {index: el.court})
                    return {
                        ...el,
                        court: el.court,
                        jailed: court.productionJailed,
                        balance: court.productionBalance
                }})

            
            const timeIndex = timeDiff / C.SECOND
            const infromersIncome = calculateIncomeFromInfromers({state}) * timeIndex
            const jailedIncome = actualQueue.reduce(U.reduceQTY, 0) *  timeIndex
            const balanceIncome = actualQueue.reduce(U.reduceBalance, 0) * timeIndex
            
            let updatedQueue = state.queue.filter(U.notExpired(actualTimestamp))

            let incrementedMaterialsCount = state.materials + materialCount + infromersIncome

            if ((actualTimestamp - state.secretaryWorkTimestamp) > C.SECRETARY_WORKING_DELTA) {
                U.saveState(LOCAL_STORAGE_KEY, state)
            }
            
            // if ((actualTimestamp - state.secretaryWorkTimestamp) > C.SECRETARY_WORKING_DELTA) {
            //     console.time('secretaries');
            //     let newMaterialCount = incrementedMaterialsCount
            //     let newJudgesQueue = updatedJudgesQueue.slice()
            //     const JBC = S.judgesByCourts({game:state});
            //     const JBCC = state.secretaries.map((el, idx) => {
            //         return JBC[el]
            //     })
            //     const JBCCC = JBCC.map(el => el.filter(e => e.status === C.STATUS_FREE))
            //     JBCCC.map(el => el.map(judge => {
            //         const court = S.court(null, {index: judge.court})
            //         if (court.cost <= newMaterialCount) {
            //             newMaterialCount -= court.cost
            //             newJudgesQueue = [...newJudgesQueue,  {
            //                 timestamp: actualTimestamp + (court.time * 1000),
            //                 judge: judge.judge
            //             }]
            //         }
            //         return judge
            //     }))
                
            //     incrementedMaterialsCount = newMaterialCount;
            //     updatedJudgesQueue = newJudgesQueue;
            //     state.secretaryWorkTimestamp = actualTimestamp;
            //     console.timeEnd('secretaries');
            // }

            const isJudgesQueueNotUpdated = R.equals(updatedQueue, state.queue);

            return {
                ...state,
                materials: incrementedMaterialsCount,
                materialsQueue: incrementedMaterialsCount !==0 ? state.materialsQueue.filter(U.notExpired(actualTimestamp)) : state.materialsQueue,
                judgesQueue: isJudgesQueueNotUpdated ? state.queue : updatedQueue,
                jailed: state.jailed + jailedIncome,
                balance: state.balance + balanceIncome,
                lastUpdate: actualTimestamp
            }
        case C.ADD_MATERIAL:
            return {
                ...state,
                materialsQueue: [...state.materialsQueue, {
                    timestamp: action.timestamp,
                    qty: action.qty
                }]
            }
        case C.APPEND_MATERIALS: 
            return {
                ...state,
                materials: state.materials + action.qty
            }
        case C.SET_MATERIAL_TO_COURT: 
            return {
                ...state,
                courtQueue: [...state.courtQueue, {
                    timestamp: action.timestamp,
                    index: action.index
                }]
            }
        case C.SET_MATERIAL_TO_JUDGE: 
            return {
                ...state,
                judgesQueue: [...state.judgesQueue, {
                    timestamp: action.timestamp,
                    judge: action.index
                }]
            }
        case C.ADD_JUDGE:
            if (action.cost > state.balance) return state
            return {
                ...state,
                judges: [...state.judges, {court: +action.courtIndex}],
                balance: state.balance - action.cost
            }
        case C.ADD_COURT:
            if (action.cost > state.balance) return state
            if (state.courts + 1 >= S.courtList.length) return state
            return {
                ...state,
                courts: state.courts + 1,
                judges: [...state.judges, {court: state.courts + 1}],
                balance: state.balance - action.cost
            }
        case C.ADD_INFORMER:
            if (action.cost > state.balance) return state
            if (state.informers + 1 > S.informerList.length) return state
            return {
                ...state,
                informers: state.informers + 1,
                balance: state.balance - action.cost
            }
        case C.ADD_INFORMATOR:
            if (action.cost > state.balance) return state
            const _arr = state.informersMultiplies.slice();
            const newVal = _arr[action.index] ? _arr[action.index] + 1 : 2;
            _arr[action.index] = newVal
            return {
                ...state,
                informersMultiplies: _arr,
                balance: state.balance - action.cost
            }
        case C.ADD_SECRETARY:
            if (action.cost > state.balance || state.secretaries.indexOf(action.index) > -1) return state
            return {
                ...state,
                secretaries: [...state.secretaries, action.index],
                balance: state.balance - action.cost
            }
        default:
            return state
    }
  }