import * as R from 'ramda';
import * as C from '../constants';
import * as S from '../selectors';
import * as U from '../../utils';
// import * as selectors from '../selectors'

const LOCAL_STORAGE_KEY = 'game-state'

const persistedState = U.loadState(LOCAL_STORAGE_KEY);
console.log(persistedState);

if (persistedState) {
    persistedState.lastUpdate = Date.now()
}

const initialState = {
    materials: 100,
    materialsQueue: [],

    jailed: 0,
    balance: 1000,

    courts: 0,

    judges: [{court: 0}],
    judgesQueue: [],
    secretaries: [],
    secretaryWorkTimestamp: 0,

    informers: 0,
    informersMultiplies: [],

    lastUpdate: 0
}



const calculateIncomeFromInfromers = ({state, timeDiff}) => {
    const {informersMultiplies, informers} = state;
    let income = 0;

    for (let idx = 0; idx < informers; idx++){
        const informer = S.informer(null, {index: idx})
        const mult = informersMultiplies[idx] ? informersMultiplies[idx] : 1
        income += timeDiff * informer.income * mult
    }

    return income
}

export default (state = persistedState || initialState, action) => {
    switch (action.type) {
        case C.CALCULATE:
            const actualTimestamp = action.timestamp
            const timeDiff = actualTimestamp - state.lastUpdate

            const materialCount = state.materialsQueue
                .filter(U.expired(actualTimestamp))
                .reduce(U.reduceQTY, 0)

            const actualCourts = state.judgesQueue
                .filter(U.expired(actualTimestamp))
                .map(el => {
                    const courtIndex = state.judges[el.judge].court
                    const court = S.court(null, {index: courtIndex})
                    return {
                        ...el,
                        court: courtIndex,
                        qty: court.result,
                        balance: court.balance
                }})
            
            const jailedIncome = actualCourts.reduce(U.reduceQTY, 0)
            const balanceIncome = actualCourts.reduce(U.reduceBalance, 0)

            // const UIS = updatedInformerStamps({state, timeDiff})
            const infromersIncome = calculateIncomeFromInfromers({state, timeDiff})

            let updatedJudgesQueue = state.judgesQueue.filter(U.notExpired(actualTimestamp))

            //Пройтись по всем индексам секретарей
            //  Пройтись по всем свободным судьям в суде с текущим секретарём
            //    Если хватает материалов дела, то 
            //      materialsOutcome++, 
            //      judgesQueue.push({timestamp, judge})
            // state.secretaries.map((el, idx) => {
            //     const judges = state.judges.filter(judge => judge.court === el)
            //     return el
            // })

            let incrementedMaterialsCount = state.materials + materialCount + infromersIncome

            if ((actualTimestamp - state.secretaryWorkTimestamp) > C.SECRETARY_WORKING_DELTA) {
                U.saveState(LOCAL_STORAGE_KEY, state)
            }
            
            if ((actualTimestamp - state.secretaryWorkTimestamp) > C.SECRETARY_WORKING_DELTA) {
                console.time('secretaries');
                let newMaterialCount = incrementedMaterialsCount
                let newJudgesQueue = updatedJudgesQueue.slice()
                const JBC = S.judgesByCourts({game:state});
                const JBCC = state.secretaries.map((el, idx) => {
                    return JBC[el]
                })
                const JBCCC = JBCC.map(el => el.filter(e => e.status === C.STATUS_FREE))
                JBCCC.map(el => el.map(judge => {
                    const court = S.court(null, {index: judge.court})
                    if (court.cost <= newMaterialCount) {
                        newMaterialCount -= court.cost
                        newJudgesQueue = [...newJudgesQueue,  {
                            timestamp: actualTimestamp + (court.time * 1000),
                            judge: judge.judge
                        }]
                    }
                    return judge
                }))
                
                incrementedMaterialsCount = newMaterialCount;
                updatedJudgesQueue = newJudgesQueue;
                state.secretaryWorkTimestamp = actualTimestamp;
                console.timeEnd('secretaries');
            }

            const isJudgesQueueNotUpdated = R.equals(updatedJudgesQueue, state.judgesQueue);

            return {
                ...state,
                materials: incrementedMaterialsCount,
                materialsQueue: incrementedMaterialsCount !==0 ? state.materialsQueue.filter(U.notExpired(actualTimestamp)) : state.materialsQueue,
                judgesQueue: isJudgesQueueNotUpdated ? state.judgesQueue : updatedJudgesQueue,
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