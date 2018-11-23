import {createSelector} from 'reselect';
import * as U from "../../utils";

const upgradesListNotIndex = [
  [
    0,
    {
      name: 'Клики приносят мани',
      description: 'Деньги за клики',
      cost: 200,
      point: 1000,
      skills: {
        moneyClick: true
      }
    }
  ],
  [
    1,
    {
      name: 'Суды эффективнее',
      description:  '',
      cost: 600,
      point: 2000,
      buffs: [
        ['courtsLocalModifier', {
          '0': {
            balance: 2
          }
        }],
      ]
    }
  ],
  [
    2,
    {
      name: 'Суды эффективнеее посадка',
      description:  '',
      cost: 600,
      point: 2000,
      buffs: [
        ['courtsLocalModifier', {
          '0': {
            jailed: 2
          }
        }],
      ]
    }
  ],
  [
    3,
    {
      name: 'Повышает скорость производства материалов',
      description:  '',
      cost: 600,
      point: 2000,
      buffs: [
        ['informerModifier', 1.05],
      ]
    }
  ],
  [
    4,
    {
      name: 'Повышает доход судов в 2 раза',
      description:  '',
      cost: 600,
      point: 2000,
      buffs: [
        ['courtsModifierBalance', 2],
      ]
    }
  ],
  [
    5,
    {
      name: 'Скорость посадки эффективнее',
      description:  'Повышает скорость посадки всех судов',
      cost: 600,
      point: 2000,
      buffs: [
        ['courtsJailedModifier', 1.05],
      ]
    }
  ],
];

export const courtList = [
  {name: 'Суд 1', materials: 3, productionJailed: 1, productionBalance: 0.5, cost: 15, rate: 1.14},
  {name: 'Суд 2', materials: 10, productionJailed: 3, productionBalance: 2, cost: 100, rate: 1.14},
  {name: 'Суд 3', materials: 34, productionJailed: 9, productionBalance: 5, cost: 500, rate: 1.14},
  {name: 'Суд 4', materials: 76, productionJailed: 27, productionBalance: 9, cost: 3000, rate: 1.14},
  {name: 'Суд 5', materials: 200, productionJailed: 100, productionBalance: 40  , cost: 10000, rate: 1.14},
  {name: 'Суд 6', materials: 550, productionJailed: 350, productionBalance: 100, cost: 40000, rate: 1.14},
  {name: 'Суд 7', materials: 1600, productionJailed: 700, productionBalance: 400, cost: 200000, rate: 1.14},
  {name: 'Суд 8', materials: 3200, productionJailed: 1500, productionBalance: 4000, cost: 1000000, rate: 1.14},
];

export const informerList = [
  {name: 'Доносчик 1', production: 1, cost: 10, rate: 1.13},
  {name: 'Доносчик 2', production: 3, cost: 50, rate: 1.13},
  {name: 'Доносчик 3', production: 10, cost: 300, rate: 1.13},
  {name: 'Доносчик 4', production: 32, cost: 2000, rate: 1.13},
  {name: 'Доносчик 5', production: 85, cost: 11000, rate: 1.13},
  {name: 'Доносчик 6', production: 250, cost: 50000, rate: 1.13},
  {name: 'Доносчик 7', production: 650, cost: 260000, rate: 1.13},
  {name: 'Доносчик 8', production: 1700, cost: 900000, rate: 1.13},
];

export const progressPoint = {
  courtsAvailable: 50,
  informersAvailable: 150,
  upgradesAvailable: 1000
};

export const upgradesList = new Map(upgradesListNotIndex.map((value, index) => {
  value[1].index = index;
  return value
}));

// optimal rate between 1.07 and 1.15

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

export const intAllMaterials = state => Math.floor(state.game.allMaterials)
export const allMaterials = createSelector(
  intAllMaterials,
  (b) => b
);


const informersState = state => state.game.informers;
const courtsState = state => state.game.courts;
const upgradesState = state => state.game.upgrades;
const clickModifier = state => state.game.clickModifier;
const courtsModifierBalance = state => state.game.courtsModifierBalance;
const courtsModifierMaterials = state => state.game.courtsModifierMaterials;
const courtsJailedModifier = state => state.game.courtsJailedModifier;
const courtsLocalModifier = state => state.game.courtsLocalModifier;
const informerModifier = state => state.game.informerModifier;
const informerLocalModifier = state => state.game.informerLocalModifier;


export const courts = createSelector(
  courtsState,
  courtsModifierBalance,
  courtsJailedModifier,
  courtsLocalModifier,
  courtsModifierMaterials,
    (
      courtsState,
      courtsModifierBalance,
      courtsJailedModifier,
      courtsLocalModifier,
      courtsModifierMaterials,
    ) =>
    courtList
      .slice(0, courtsState.length)
      .map((court, index) => {
        const owned = courtsState[index];
        let multipliersJailed = courtsJailedModifier;
        let multipliersBalance = courtsModifierBalance;
        let multipliersMaterials = courtsModifierMaterials;
        const localModifier = courtsLocalModifier[index];

        if(localModifier && localModifier.jailed) {
          multipliersJailed += localModifier.jailed
        }

        if(localModifier && localModifier.balance) {
          multipliersBalance += localModifier.balance
        }

        if(localModifier && localModifier.materials) {
          multipliersMaterials += localModifier.materials
        }

        return {
          ...court,
          productionJailed: U.production({
            production: court.productionJailed,
            owned,
            multipliers: multipliersJailed <= 0 ? 1 : multipliersJailed
          }),
          productionBalance: U.production({
            production: court.productionBalance,
            owned,
            multipliers: multipliersBalance <= 0 ? 1 : multipliersBalance
          }),
          materials: U.production({
            production: court.materials,
            owned,
            multipliers: multipliersMaterials <= 0 ? 1 : multipliersMaterials
          }),
          upgradeCost: U.nextCost({base: court.cost, rate: court.rate, owned}),
        };
      })
);

export const court = (_, props) => courtList[props.index];

export const upgrades = createSelector(
  upgradesState,
  (upgradesState) =>
    upgradesState
      .map((upgrade) => {
        return upgradesList.get(upgrade)
      })
);

export const informers = createSelector(
  informersState,
  informerModifier,
  informerLocalModifier,
  (
    informersState,
    informerModifier,
    informerLocalModifier,
  ) =>
    informerList
      .slice(0, informersState.length)
      .map((informer, index) => {
        const owned = informersState[index];
        let informersMultipliers = informerModifier;
        const localModifier = informerLocalModifier[index];

        if(localModifier && localModifier.createMaterial) {
          informersMultipliers += localModifier.createMaterial
        }
        return {
          ...informer,
          production: U.production({
            production: informer.production,
            owned,
            multipliers: informersMultipliers <= 0 ? 1 : informersMultipliers
          }),
          upgradeCost: U.nextCost({base: informer.cost, rate: informer.rate, owned}),
        }
      })
);

export const informer = (_, props) => informerList[props.index]
