import {createSelector} from 'reselect';
import createCachedSelector from 're-reselect';
import * as U from "../../utils";
import * as R from 'ramda'
import city from '../../assets/city.svg';
import barnaule from '../../assets/barnaul.svg';
import megapolis from '../../assets/megapolis.svg';
import fed from '../../assets/fed.svg';
import halfRussia from '../../assets/halfRussia.svg';
import russia from '../../assets/russia.svg';
import continent from '../../assets/continent.svg';
import world from '../../assets/world.svg';
import zahod from '../../assets/zahod.jpg';

export const courtList = [
  {name: 'мировой суд', materials: 3, productionJailed: 0.5, productionBalance: 0.5, cost: 15, rate: 1.14},
  {name: 'районный', materials: 20, productionJailed: 3, productionBalance: 2, cost: 150, rate: 1.14},
  {name: 'городской', materials: 50, productionJailed: 9, productionBalance: 5, cost: 700, rate: 1.14},
  {name: 'областной', materials: 100, productionJailed: 27, productionBalance: 15, cost: 5000, rate: 1.14},
  {name: 'верховный', materials: 300, productionJailed: 100, productionBalance: 40  , cost: 20000, rate: 1.14},
  {name: 'конституционный', materials: 700, productionJailed: 350, productionBalance: 150, cost: 60000, rate: 1.14},
  {name: 'ЕСПЧ', materials: 2000, productionJailed: 700, productionBalance: 400, cost: 400000, rate: 1.14},
  {name: 'Международный суд ООН', materials: 4000, productionJailed: 8000, productionBalance: 4000, cost: 2000000, rate: 1.14},
];

export const informerList = [
  {name: 'Студент юрфака', production: 1, cost: 10, rate: 1.14},
  {name: 'Набожная старушка', production: 3, cost: 50, rate: 1.14},
  {name: 'Казачья кибердружина', production: 10, cost: 450, rate: 1.14},
  {name: 'АВТОДОНОС 3000', production: 32, cost: 2500, rate: 1.14},
  {name: 'Госмемконтроль', production: 85, cost: 9000, rate: 1.14},
  {name: 'Интернет-бюро Интерпола', production: 250, cost: 35000, rate: 1.14},
  {name: 'Глобальная комиссия по запрету репостов', production: 650, cost: 180000, rate: 1.14},
  {name: 'Доносчик 8', production: 1700, cost: 900000, rate: 1.14},
];

export const progressPoint = {
  courtsAvailable: 30,
  informersAvailable: 10
};

export const RUSSIAN_POPULATION = 146880000;
export const WORLD_POPULATION = 7530000000;


// Я посадил целый город (100 тысяч посаженных)
// Я посадил Барнаул (БАРНАУЛ АЛТАЙСКИЙ КРАЙ) (700 тысяч)
// Я посадил мегаполис (1,5 млн)
// Я посадил федеральный округ (17 млн)
// Я посадил пол-россии (73 млн)
// Я посадил всю Росссию (146 млн)
// Континент(4.5 млрд)
// Мир (7 млрд)

const gameTitle = window.title ? window.title :'Кликер';

export const stageShareList = [
  null,
  {
    isNotAchievement: true,
    point: 0,
    params: [],
    title: gameTitle,
    backgroundImg: zahod,
    description: 'Проснувшись однажды утром после беспокойного сна, вы — Семен Богданович Хуйко, фельдфебель Центра «Э» — твердо решили искоренить экстремизм в России. Едва допив кофе, вы побежали в свой кабинет, чтобы усесться за любимый компьютер.\n' +
      '\n' +
      'Чтобы воплотить мечту в жизнь, вам необходимо собирать материалы — скриншотить картинки «ВКонтакте», кликая на компьютер. Материалы превращаются в уголовные дела и направляются в независимый суд, который сажает экстремистов. \n'
  },
  {
    isNotAchievement: true,
    materialsPoint: 30,
    title: 'Появились суды',
    description: ' Первый десяток посаженных! Начальник городской полиции жмет вам руку. Теперь вы можете нанимать представителей общественности  — они будут собирать материалы вместе с вами. \n' +
      '\n' +
      'Купите доносчика, чтобы увеличить скорость сбора материалов. За отдельную плату доносчики будут работать эффективнее — их можно улучшать.\n'
  },
  {
    isNotAchievement: true,
    point: 10,
    title: 'Появились доносчики',
    description: 'Каждый должен с чего-то начинать, думаете вы, относя папку со скриншотами в ближайший мировой суд — одноэтажное обшарпанное здание с протекающей крышей. Хряпнув чарочку с судьей, вы договариваетесь о том, что вы будете подкидывать ему дела постоянно. \n' +
      '\n' +
      'Для того, чтобы посадить человека, нужно 10 материалов. За посаженных людей вам повышают финансирование — за деньги вы можете договариваться с другими судьями и с другими судами, а также улучшать их.\n'
  },
  {
    point: 100000,
    title: 'Город',
    params: [['achievement', 'city']],
    img: city,
    description: ''
  },
  {
    point: 700000,
    title: 'Барнаул',
    params: [['achievement', 'barnaul']],
    img: barnaule,
    description: ''
  },
  {
    point: 1500000,
    title: 'Мегаполис',
    params: [['achievement', 'megapolis']],
    img: megapolis,
    description: ''
  },
  {
    point: 17000000,
    title: 'Федеральный округ',
    params: [['achievement', 'fed']],
    img: fed,
    description: ''
  },
  {
    point: 73000000,
    title: 'Пол-России',
    params: [['achievement', 'half_russia']],
    img: halfRussia,
    description: ''
  },
  {
    point: RUSSIAN_POPULATION,
    title: 'Россия',
    params: [['achievement', 'russia']],
    img: russia,
    description: ''
  },
  {
    point: 4500000000,
    title: 'Континент',
    params: [['achievement', 'continent']],
    img: continent,
    description: ''
  },
  {
    point: WORLD_POPULATION,
    title: 'Мир',
    params: [['achievement', 'world']],
    img: world,
    description: ''
  }
];

const upgradesListNotIndex = [
  [
    0,
    {
      name: 'Клики приносят мани',
      description: 'Деньги за клики',
      cost: 250,
      jailedPoint: 500,
      skills: {
        moneyClick: true
      }
    }
  ],
  [
    1,
    {
      name: 'Первый суд эффективнее 1',
      description:  'Первый суд приносит в 2 раза больше денег и в 1.5 раз эффективнее сажает',
      cost: 195,
      point: 2,
      courtIndex: '0',
      buffs: [
        ['courtsLocalModifier', {
          balance: 2,
          jailed: 1.5
        }],
      ]
    }
  ],
  [
    2,
    {
      name: 'Первый суд эффективнее 2',
      description:  'Первый суд приносит в 2 раза больше денег и в 1.5 раз эффективнее сажает',
      cost: 300,
      point: 5,
      courtIndex: '0',
      buffs: [
        ['courtsLocalModifier', {
          balance: 2,
          jailed: 1.5
        }],
      ]
    }
  ],
  [
    3,
    {
      name: 'Первый суд эффективнее 3',
      description:  'Первый суд приносит в 2 раза больше денег и в 1.5 раз эффективнее сажает',
      cost: 4000,
      point: 25,
      courtIndex: '0',
      buffs: [
        ['courtsLocalModifier', {
          balance: 2,
          jailed: 1.5
        }],
      ]
    }
  ],
  [
    4,
    {
      name: 'Первый суд эффективнее 4',
      description:  'Первый суд приносит в 2 раза больше денег и в 1.5 раз эффективнее сажает',
      cost: 105000,
      point: 50,
      courtIndex: '0',
      buffs: [
        ['courtsLocalModifier', {
          balance: 2,
          jailed: 1.5
        }],
      ]
    }
  ],
  [
    5,
    {
      name: 'Первый суд эффективнее 5',
      description:  'Первый суд приносит в 2 раза больше денег и в 1.5 раз эффективнее сажает',
      cost: 7360000,
      point: 100,
      courtIndex: '0',
      buffs: [
        ['courtsLocalModifier', {
          balance: 2,
          jailed: 1.5
        }],
      ]
    }
  ],
  [
    6,
    {
      name: 'Второй суд эффективнее 1',
      description:  'Второй суд приносит в 2 раза больше денег и в 1.5 раз эффективнее сажает',
      cost: 1300,
      point: 2,
      courtIndex: '1',
      buffs: [
        ['courtsLocalModifier', {
          balance: 2,
          jailed: 1.5
        }],
      ]
    }
  ],
  [
    7,
    {
      name: 'Второй суд эффективнее 2',
      description:  'Второй суд приносит в 2 раза больше денег и в 1.5 раз эффективнее сажает',
      cost: 2000,
      point: 5,
      courtIndex: '1',
      buffs: [
        ['courtsLocalModifier', {
          balance: 2,
          jailed: 1.5
        }],
      ]
    }
  ],
  [
    8,
    {
      name: 'Второй суд эффективнее 3',
      description:  'Второй суд приносит в 2 раза больше денег и в 1.5 раз эффективнее сажает',
      cost: 26500,
      point: 25,
      courtIndex: '1',
      buffs: [
        ['courtsLocalModifier', {
          balance: 2,
          jailed: 1.5
        }],
      ]
    }
  ],
  [
    9,
    {
      name: 'Второй суд эффективнее 4',
      description:  'Второй суд приносит в 2 раза больше денег и в 1.5 раз эффективнее сажает',
      cost: 700000,
      point: 50,
      courtIndex: '1',
      buffs: [
        ['courtsLocalModifier', {
          balance: 2,
          jailed: 1.5
        }],
      ]
    }
  ],
  [
    10,
    {
      name: 'Третий суд эффективнее 1',
      description:  'Третий суд приносит в 2 раза больше денег и в 1.5 раз эффективнее сажает',
      cost: 6500,
      point: 2,
      courtIndex: '2',
      buffs: [
        ['courtsLocalModifier', {
          balance: 2,
          jailed: 1.5
        }],
      ]
    }
  ],
  [
    11,
    {
      name: 'Третий суд эффективнее 2',
      description:  'Третий суд приносит в 2 раза больше денег и в 1.5 раз эффективнее сажает',
      cost: 10000,
      point: 5,
      courtIndex: '2',
      buffs: [
        ['courtsLocalModifier', {
          balance: 2,
          jailed: 1.5
        }],
      ]
    }
  ],
  [
    12,
    {
      name: 'Третий суд эффективнее 3',
      description:  'Третий суд приносит в 2 раза больше денег и в 1.5 раз эффективнее сажает',
      cost: 133000,
      point: 25,
      courtIndex: '2',
      buffs: [
        ['courtsLocalModifier', {
          balance: 2,
          jailed: 1.5
        }],
      ]
    }
  ],
  [
    13,
    {
      name: 'Третий суд эффективнее 4',
      description:  'Третий суд приносит в 2 раза больше денег и в 1.5 раз эффективнее сажает',
      cost: 3500000,
      point: 50,
      courtIndex: '2',
      buffs: [
        ['courtsLocalModifier', {
          balance: 2,
          jailed: 1.5
        }],
      ]
    }
  ],
  [
    14,
    {
      name: 'Четвертый суд эффективнее 1',
      description:  'Четвертая суд приносит в 2 раза больше денег и в 1.5 раз эффективнее сажает',
      cost: 40000,
      point: 2,
      courtIndex: '3',
      buffs: [
        ['courtsLocalModifier', {
          balance: 2,
          jailed: 1.5
        }],
      ]
    }
  ],
  [
    15,
    {
      name: 'Четвертый суд эффективнее 2',
      description:  'Четвертая суд приносит в 2 раза больше денег и в 1.5 раз эффективнее сажает',
      cost: 60000,
      point: 5,
      courtIndex: '3',
      buffs: [
        ['courtsLocalModifier', {
          balance: 2,
          jailed: 1.5
        }],
      ]
    }
  ],
  [
    16,
    {
      name: 'Четвертый суд эффективнее 3',
      description:  'Четвертая суд приносит в 2 раза больше денег и в 1.5 раз эффективнее сажает',
      cost: 800000,
      point: 25,
      courtIndex: '3',
      buffs: [
        ['courtsLocalModifier', {
          balance: 2,
          jailed: 1.5
        }],
      ]
    }
  ],
  [
    17,
    {
      name: 'Четвертый суд эффективнее 4',
      description:  'Четвертая суд приносит в 2 раза больше денег и в 1.5 раз эффективнее сажает',
      cost: 21000000,
      point: 50,
      courtIndex: '3',
      buffs: [
        ['courtsLocalModifier', {
          balance: 2,
          jailed: 1.5
        }],
      ]
    }
  ],
  [
    18,
    {
      name: 'Пятый суд эффективнее 1',
      description:  'Пятый суд приносит в 2 раза больше денег и в 1.5 раз эффективнее сажает',
      cost: 120000,
      point: 2,
      courtIndex: '4',
      buffs: [
        ['courtsLocalModifier', {
          balance: 2,
          jailed: 1.5
        }],
      ]
    }
  ],
  [
    19,
    {
      name: 'Пятый суд эффективнее 2',
      description:  'Пятый суд приносит в 2 раза больше денег и в 1.5 раз эффективнее сажает',
      cost: 190000,
      point: 5,
      courtIndex: '4',
      buffs: [
        ['courtsLocalModifier', {
          balance: 2,
          jailed: 1.5
        }],
      ]
    }
  ],
  [
    20,
    {
      name: 'Пятый суд эффективнее 3',
      description:  'Пятый суд приносит в 2 раза больше денег и в 1.5 раз эффективнее сажает',
      cost: 2600000,
      point: 25,
      courtIndex: '4',
      buffs: [
        ['courtsLocalModifier', {
          balance: 2,
          jailed: 1.5
        }],
      ]
    }
  ],
  [
    21,
    {
      name: 'Пятый суд эффективнее 4',
      description:  'Пятый суд приносит в 2 раза больше денег и в 1.5 раз эффективнее сажает',
      cost: 70000000,
      point: 50,
      courtIndex: '4',
      buffs: [
        ['courtsLocalModifier', {
          balance: 2,
          jailed: 1.5
        }],
      ]
    }
  ],
  [
    22,
    {
      name: 'Шестой суд эффективнее 1',
      description:  'Шестой суд приносит в 2 раза больше денег и в 1.5 раз эффективнее сажает',
      cost: 500000,
      point: 2,
      courtIndex: '5',
      buffs: [
        ['courtsLocalModifier', {
          balance: 2,
          jailed: 1.5
        }],
      ]
    }
  ],
  [
    23,
    {
      name: 'Шестой суд эффективнее 2',
      description:  'Шестой суд приносит в 2 раза больше денег и в 1.5 раз эффективнее сажает',
      cost: 770000,
      point: 5,
      courtIndex: '5',
      buffs: [
        ['courtsLocalModifier', {
          balance: 2,
          jailed: 1.5
        }],
      ]
    }
  ],
  [
    24,
    {
      name: 'Шестой суд эффективнее 3',
      description:  'Шестой суд приносит в 2 раза больше денег и в 1.5 раз эффективнее сажает',
      cost: 10500000,
      point: 25,
      courtIndex: '5',
      buffs: [
        ['courtsLocalModifier', {
          balance: 2,
          jailed: 1.5
        }],
      ]
    }
  ],
  [
    25,
    {
      name: 'Шестой суд эффективнее 4',
      description:  'Шестой суд приносит в 2 раза больше денег и в 1.5 раз эффективнее сажает',
      cost: 280000000,
      point: 50,
      courtIndex: '5',
      buffs: [
        ['courtsLocalModifier', {
          balance: 2,
          jailed: 1.5
        }],
      ]
    }
  ],
  [
    26,
    {
      name: 'Седьмой суд эффективнее 1',
      description:  'Седьмой суд приносит в 2 раза больше денег и в 1.5 раз эффективнее сажает',
      cost: 2600000,
      point: 2,
      courtIndex: '6',
      buffs: [
        ['courtsLocalModifier', {
          balance: 2,
          jailed: 1.5
        }],
      ]
    }
  ],
  [
    27,
    {
      name: 'Седьмой суд эффективнее 2',
      description:  'Седьмой суд приносит в 2 раза больше денег и в 1.5 раз эффективнее сажает',
      cost: 3850000,
      point: 5,
      courtIndex: '6',
      buffs: [
        ['courtsLocalModifier', {
          balance: 2,
          jailed: 1.5
        }],
      ]
    }
  ],
  [
    28,
    {
      name: 'Седьмой суд эффективнее 3',
      description:  'Седьмой суд приносит в 2 раза больше денег и в 1.5 раз эффективнее сажает',
      cost: 53000000,
      point: 25,
      courtIndex: '6',
      buffs: [
        ['courtsLocalModifier', {
          balance: 2,
          jailed: 1.5
        }],
      ]
    }
  ],
  [
    29,
    {
      name: 'Седьмой суд эффективнее 4',
      description:  'Седьмой суд приносит в 2 раза больше денег и в 1.5 раз эффективнее сажает',
      cost: 1400000000,
      point: 50,
      courtIndex: '6',
      buffs: [
        ['courtsLocalModifier', {
          balance: 2,
          jailed: 1.5
        }],
      ]
    }
  ],
  [
    30,
    {
      name: 'Восьмой суд эффективнее 1',
      description:  'Восьмой суд приносит в 2 раза больше денег и в 1.5 раз эффективнее сажает',
      cost: 13000000,
      point: 2,
      courtIndex: '7',
      buffs: [
        ['courtsLocalModifier', {
          balance: 2,
          jailed: 1.5
        }],
      ]
    }
  ],
  [
    31,
    {
      name: 'Восьмой суд эффективнее 2',
      description:  'Восьмой суд приносит в 2 раза больше денег и в 1.5 раз эффективнее сажает',
      cost: 19200000,
      point: 5,
      courtIndex: '7',
      buffs: [
        ['courtsLocalModifier', {
          balance: 2,
          jailed: 1.5
        }],
      ]
    }
  ],
  [
    32,
    {
      name: 'Восьмой суд эффективнее 3',
      description:  'Восьмой суд приносит в 2 раза больше денег и в 1.5 раз эффективнее сажает',
      cost: 265000000,
      point: 25,
      courtIndex: '7',
      buffs: [
        ['courtsLocalModifier', {
          balance: 2,
          jailed: 1.5
        }],
      ]
    }
  ],
  [
    33,
    {
      name: 'Восьмой суд эффективнее 4',
      description:  'Восьмой суд приносит в 2 раза больше денег и в 1.5 раз эффективнее сажает',
      cost: 7000000000,
      point: 50,
      courtIndex: '7',
      buffs: [
        ['courtsLocalModifier', {
          balance: 2,
          jailed: 1.5
        }],
      ]
    }
  ],
  [
    34,
    {
      name: 'Клики приносят мани',
      description: 'Деньги за клики',
      cost: 250,
      point: 500,
      skills: {
        moneyClick: true
      }
    }
  ],
  [
    35,
    {
      name: 'Первый доносчик эффективнее 1',
      description:  '',
      cost: 130,
      point: 2,
      informerIndex: '0',
      buffs: [
        ['informerLocalModifier', {
          createMaterial: 2
        }],
      ]
    }
  ],
  [
    36,
    {
      name: 'Первый доносчик эффективнее 2',
      description:  '',
      cost: 192,
      point: 5,
      informerIndex: '0',
      buffs: [
        ['informerLocalModifier', {
          createMaterial: 2
        }],
      ]
    }
  ],
  [
    37,
    {
      name: 'Первый доносчик эффективнее 3',
      description:  '',
      cost: 2655,
      point: 25,
      informerIndex: '0',
      buffs: [
        ['informerLocalModifier', {
          createMaterial: 2
        }],
      ]
    }
  ],
  [
    38,
    {
      name: 'Первый доносчик эффективнее 4',
      description:  '',
      cost: 70000,
      point: 50,
      informerIndex: '0',
      buffs: [
        ['informerLocalModifier', {
          createMaterial: 2
        }],
      ]
    }
  ],
  [
    39,
    {
      name: 'Первый доносчик эффективнее 5',
      description:  '',
      cost: 49000000,
      point: 100,
      informerIndex: '0',
      buffs: [
        ['informerLocalModifier', {
          createMaterial: 2
        }],
      ]
    }
  ],
  [
    40,
    {
      name: 'Второй доносчик эффективнее 1',
      description:  '',
      cost: 650,
      point: 2,
      informerIndex: '1',
      buffs: [
        ['informerLocalModifier', {
          createMaterial: 2
        }],
      ]
    }
  ],
  [
    41,
    {
      name: 'Второй доносчик эффективнее 2',
      description:  '',
      cost: 960,
      point: 5,
      informerIndex: '1',
      buffs: [
        ['informerLocalModifier', {
          createMaterial: 2
        }],
      ]
    }
  ],
  [
    42,
    {
      name: 'Второй доносчик эффективнее 3',
      description:  '',
      cost: 13250,
      point: 25,
      informerIndex: '1',
      buffs: [
        ['informerLocalModifier', {
          createMaterial: 2
        }],
      ]
    }
  ],
  [
    43,
    {
      name: 'Второй доносчик эффективнее 4',
      description:  '',
      cost: 350000,
      point: 50,
      informerIndex: '1',
      buffs: [
        ['informerLocalModifier', {
          createMaterial: 2
        }],
      ]
    }
  ],
  [
    44,
    {
      name: 'Третий доносчик эффективнее 1',
      description:  '',
      cost: 2600,
      point: 2,
      informerIndex: '2',
      buffs: [
        ['informerLocalModifier', {
          createMaterial: 2
        }],
      ]
    }
  ],
  [
    45,
    {
      name: 'Третий доносчик эффективнее 2',
      description:  '',
      cost: 3850,
      point: 5,
      informerIndex: '2',
      buffs: [
        ['informerLocalModifier', {
          createMaterial: 2
        }],
      ]
    }
  ],
  [
    46,
    {
      name: 'Третий доносчик эффективнее 3',
      description:  '',
      cost: 53000,
      point: 25,
      informerIndex: '2',
      buffs: [
        ['informerLocalModifier', {
          createMaterial: 2
        }],
      ]
    }
  ],
  [
    47,
    {
      name: 'Третий доносчик эффективнее 4',
      description:  '',
      cost: 1400000,
      point: 50,
      informerIndex: '2',
      buffs: [
        ['informerLocalModifier', {
          createMaterial: 2
        }],
      ]
    }
  ],
  [
    48,
    {
      name: 'Четвертый доносчик эффективнее 1',
      description:  '',
      cost: 19500,
      point: 2,
      informerIndex: '3',
      buffs: [
        ['informerLocalModifier', {
          createMaterial: 2
        }],
      ]
    }
  ],
  [
    49,
    {
      name: 'Четвертый доносчик эффективнее 2',
      description:  '',
      cost: 30000,
      point: 5,
      informerIndex: '3',
      buffs: [
        ['informerLocalModifier', {
          createMaterial: 2
        }],
      ]
    }
  ],
  [
    50,
    {
      name: 'Четвертый доносчик эффективнее 3',
      description:  '',
      cost: 400000,
      point: 25,
      informerIndex: '3',
      buffs: [
        ['informerLocalModifier', {
          createMaterial: 2
        }],
      ]
    }
  ],
  [
    51,
    {
      name: 'Четвертый доносчик эффективнее 4',
      description:  '',
      cost: 10500000,
      point: 50,
      informerIndex: '3',
      buffs: [
        ['informerLocalModifier', {
          createMaterial: 2
        }],
      ]
    }
  ],
  [
    52,
    {
      name: 'Пятый доносчик эффективнее 1',
      description:  '',
      cost: 52000,
      point: 2,
      informerIndex: '4',
      buffs: [
        ['informerLocalModifier', {
          createMaterial: 2
        }],
      ]
    }
  ],
  [
    53,
    {
      name: 'Пятый доносчик эффективнее 2',
      description:  '',
      cost: 77000,
      point: 5,
      informerIndex: '4',
      buffs: [
        ['informerLocalModifier', {
          createMaterial: 2
        }],
      ]
    }
  ],
  [
    54,
    {
      name: 'Пятый доносчик эффективнее 3',
      description:  '',
      cost: 1050000,
      point: 25,
      informerIndex: '4',
      buffs: [
        ['informerLocalModifier', {
          createMaterial: 2
        }],
      ]
    }
  ],
  [
    55,
    {
      name: 'Пятый доносчик эффективнее 4',
      description:  '',
      cost: 28009000,
      point: 50,
      informerIndex: '4',
      buffs: [
        ['informerLocalModifier', {
          createMaterial: 2
        }],
      ]
    }
  ],
  [
    56,
    {
      name: 'Шестой доносчик эффективнее 1',
      description:  '',
      cost: 195000,
      point: 2,
      informerIndex: '5',
      buffs: [
        ['informerLocalModifier', {
          createMaterial: 2
        }],
      ]
    }
  ],
  [
    57,
    {
      name: 'Шестой доносчик эффективнее 2',
      description:  '',
      cost: 290000,
      point: 5,
      informerIndex: '5',
      buffs: [
        ['informerLocalModifier', {
          createMaterial: 2
        }],
      ]
    }
  ],
  [
    58,
    {
      name: 'Шестой доносчик эффективнее 3',
      description:  '',
      cost: 3900000,
      point: 25,
      informerIndex: '5',
      buffs: [
        ['informerLocalModifier', {
          createMaterial: 2
        }],
      ]
    }
  ],
  [
    59,
    {
      name: 'Шестой доносчик эффективнее 4',
      description:  '',
      cost: 105000000,
      point: 50,
      informerIndex: '5',
      buffs: [
        ['informerLocalModifier', {
          createMaterial: 2
        }],
      ]
    }
  ],
  [
    60,
    {
      name: 'Седьмой доносчик эффективнее 1',
      description:  '',
      cost: 1040000,
      point: 2,
      informerIndex: '6',
      buffs: [
        ['informerLocalModifier', {
          createMaterial: 2
        }],
      ]
    }
  ],
  [
    61,
    {
      name: 'Седьмой доносчик эффективнее 2',
      description:  '',
      cost: 1540000,
      point: 5,
      informerIndex: '6',
      buffs: [
        ['informerLocalModifier', {
          createMaterial: 2
        }],
      ]
    }
  ],
  [
    62,
    {
      name: 'Седьмой доносчик эффективнее 3',
      description:  '',
      cost: 20000000,
      point: 25,
      informerIndex: '6',
      buffs: [
        ['informerLocalModifier', {
          createMaterial: 2
        }],
      ]
    }
  ],
  [
    63,
    {
      name: 'Седьмой доносчик эффективнее 4',
      description:  '',
      cost: 560000000,
      point: 50,
      informerIndex: '6',
      buffs: [
        ['informerLocalModifier', {
          createMaterial: 2
        }],
      ]
    }
  ],
  [
    64,
    {
      name: 'Восьмой доносчик эффективнее 1',
      description:  '',
      cost: 5850000,
      point: 2,
      informerIndex: '7',
      buffs: [
        ['informerLocalModifier', {
          createMaterial: 2
        }],
      ]
    }
  ],
  [
    65,
    {
      name: 'Восьмой доносчик эффективнее 2',
      description:  '',
      cost: 8660000,
      point: 5,
      informerIndex: '7',
      buffs: [
        ['informerLocalModifier', {
          createMaterial: 2
        }],
      ]
    }
  ],
  [
    66,
    {
      name: 'Восьмой доносчик эффективнее 2',
      description:  '',
      cost: 120000000,
      point: 25,
      informerIndex: '7',
      buffs: [
        ['informerLocalModifier', {
          createMaterial: 2
        }],
      ]
    }
  ],
  [
    67,
    {
      name: 'Восьмой доносчик эффективнее 4',
      description:  '',
      cost: 3150000000,
      point: 50,
      informerIndex: '7',
      buffs: [
        ['informerLocalModifier', {
          createMaterial: 2
        }],
      ]
    }
  ],
  [
    68,
    {
      name: 'Все суды эффективнее(деньги) 1',
      description:  '',
      cost: 6000,
      jailedPoint: 10000,
      buffs: [
        ['courtsModifierBalance', 0.15],
      ]
    }
  ],
  [
    69,
    {
      name: 'Все доносчики эффективнее 1',
      description:  '',
      cost: 40000,
      jailedPoint: 100000,
      buffs: [
        ['informerModifier', 0.05],
      ]
    }
  ],
  [
    70,
    {
      name: 'Все суды эффективнее(jailed) 1',
      description:  '',
      cost: 80000,
      jailedPoint: 250000,
      buffs: [
        ['courtsJailedModifier', 0.15],
      ]
    }
  ],
  [
    71,
    {
      name: 'Все суды эффективнее(деньги) 2',
      description:  '',
      cost: 140000,
      jailedPoint: 500000,
      buffs: [
        ['courtsModifierBalance', 0.15],
      ]
    }
  ],
  [
    72,
    {
      name: 'Все суды эффективнее(jailed) 2',
      description:  '',
      cost: 180000,
      jailedPoint: 1000000,
      buffs: [
        ['courtsJailedModifier', 0.05],
      ]
    }
  ],
  [
    73,
    {
      name: 'Все доносчики эффективнее 2',
      description:  '',
      cost: 300000,
      jailedPoint: 2500000,
      buffs: [
        ['informerModifier', 0.05],
      ]
    }
  ],
  [
    74,
    {
      name: 'Все суды эффективнее(деньги) 3',
      description:  '',
      cost: 1000000,
      jailedPoint: 5000000,
      buffs: [
        ['courtsModifierBalance', 0.15],
      ]
    }
  ],
  [
    75,
    {
      name: 'Все суды эффективнее(jailed) 3',
      description:  '',
      cost: 2500000,
      jailedPoint: 10000000,
      buffs: [
        ['courtsJailedModifier', 0.15],
      ]
    }
  ],
  [
    76,
    {
      name: 'Все доносчики эффективнее 3',
      description:  '',
      cost: 5000000,
      jailedPoint: 25000000,
      buffs: [
        ['informerModifier', 0.05],
      ]
    }
  ],
  [
    77,
    {
      name: 'Все доносчики эффективнее 4',
      description:  '',
      cost: 100000000,
      jailedPoint: 500000000,
      buffs: [
        ['informerModifier', 0.05],
      ]
    }
  ],
  [
    78,
    {
      name: 'Все суды эффективнее(деньги) 4',
      description:  '',
      cost: 250000000,
      jailedPoint: 1000000000,
      buffs: [
        ['courtsModifierBalance', 0.15],
      ]
    }
  ],
  [
    79,
    {
      name: 'Все суды эффективнее(jailed) 4',
      description:  '',
      cost: 650000000,
      jailedPoint: 2500000000,
      buffs: [
        ['courtsJailedModifier', 0.15],
      ]
    }
  ],
  [
    80,
    {
      name: 'Все доносчики эффективнее 5',
      description:  '',
      cost: 1000000000,
      jailedPoint: 5000000000,
      buffs: [
        ['informerModifier', 0.15],
      ]
    }
  ],
  [
    81,
    {
      name: 'Покорение земли',
      description:  '',
      cost: 14000000000,
      jailedPoint: 7000000000,
      buffs: [
        ['informerModifier', 1],
        ['courtsModifierBalance', 1],
        ['courtsModifierBalance', 1],
      ]
    }
  ],
];

export const upgradesList = new Map(upgradesListNotIndex.map((value, index) => {
  value[1].index = index;
  return value
}));

// optimal rate between 1.07 and 1.15

export const MAX_COURTS = courtList.length;
export const MAX_INFORMERS = informerList.length;

export const intBalance = state => Math.floor(state.game.balance)
export const balance = state => Math.floor(state.game.balance)

export const intMaterials = state => Math.floor(state.game.materials)
export const materials = state => Math.floor(state.game.materials)

export const intAllMaterials = state => Math.floor(state.game.allMaterials)
export const allMaterials = state => Math.floor(state.game.allMaterials)


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
const buyingItems = state => state.game.buyingItems;

export const courts = createSelector(
  courtsState,
  courtsModifierBalance,
  courtsJailedModifier,
  courtsLocalModifier,
  courtsModifierMaterials,
  buyingItems,
    (
      courtsState,
      courtsModifierBalance,
      courtsJailedModifier,
      courtsLocalModifier,
      courtsModifierMaterials,
    ) => {
      const courtsInfo = {};
      courtsInfo.outcomeMaterials = 0;
      courtsInfo.incomeBalance = 0;
      courtsInfo.incomeJailed = 0;
      courtsInfo.courtsArr = courtList
        .slice(0, courtsState.length)
        .map((court, index) => {
          const owned = courtsState[index];
          let multipliersJailed = courtsJailedModifier;
          let multipliersBalance = courtsModifierBalance;
          let multipliersMaterials = courtsModifierMaterials;
          const localModifier = courtsLocalModifier[index];

          if (localModifier && localModifier.jailed) {
            multipliersJailed = localModifier.jailed * multipliersJailed
          }

          if (localModifier && localModifier.balance) {
            multipliersBalance = localModifier.balance * multipliersBalance
          }

          if (localModifier && localModifier.materials) {
            multipliersMaterials = localModifier.materials * multipliersMaterials
          }

          const multiJailed = multipliersJailed <= 0 ? 1 : multipliersJailed;
          const multiBalance = multipliersBalance <= 0 ? 1 : multipliersBalance;
          const multiMaterials = multipliersMaterials <= 0 ? 1 : multipliersMaterials;

          const productionJailed = U.production({
              production: court.productionJailed,
              owned,
              multipliers: multiJailed
          });

          courtsInfo.incomeJailed += productionJailed;

          const productionBalance = U.production({
              production: court.productionBalance,
              owned,
              multipliers: multiBalance
          });

          courtsInfo.incomeBalance += productionBalance;

          const materials = U.production({
              production: court.materials,
              owned,
              multipliers: multiMaterials
          });

          courtsInfo.outcomeMaterials += materials;

          const oneProductionJailed = court.productionJailed * multiJailed;
          const oneProductionBalance = court.productionBalance * multiBalance;
          const oneMaterials = court.materials * multiMaterials;

          return {
            ...court,
            productionJailed,
            productionBalance,
            owned,
            materials,
            oneProductionJailed,
            oneProductionBalance,
            oneMaterials,
            upgradeCost: U.nextCost({base: court.cost, rate: court.rate, owned}),
          };
        });

      return courtsInfo
    }
);

export const courtsWithUpgradable = createCachedSelector(
  courts,
  balance,
  (courtsArg, balance) => {
    return {
      ...courtsArg,
      courtsArr: courtsArg.courtsArr.map(
        x => ({
          upgradable: x.upgradeCost > balance,
          ...x
        })
      )
    };
  },
)(
  (state) => {
    const courtsArg = courts(state);
    const balanceArg = balance(state);
    return JSON.stringify(courtsArg.courtsArr.map(
      x => ({
        upgradable: x.upgradeCost > balanceArg,
        ...x
      })
    ))
  }
)

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
  buyingItems,
  (
    informersState,
    informerModifier,
    informerLocalModifier,
  ) => {
    const informerInfo = {};
    informerInfo.incomeMaterials = 0;
    informerInfo.informersArr = informerList
      .slice(0, informersState.length)
      .map((informer, index) => {
        const owned = informersState[index];
        let informersMultipliers = informerModifier;
        const localModifier = informerLocalModifier[index];

        if (localModifier && localModifier.createMaterial) {
          informersMultipliers = localModifier.createMaterial * informersMultipliers;
        }

        const multiProd = informersMultipliers <= 0 ? 1 : informersMultipliers;

        const oneProduction = informer.production * multiProd;

        const production = U.production({
          production: informer.production,
          owned,
          multipliers: multiProd
        });

        informerInfo.incomeMaterials += production;

        return {
          ...informer,
          owned,
          production,
          oneProduction,
          upgradeCost: U.nextCost({base: informer.cost, rate: informer.rate, owned}),
        }
      });
    return informerInfo;
  }
);

export const informersWithUpgradable = createCachedSelector(
  informers,
  balance,
  (informers, balance) => {
    return {
      ...informers,
      informersArr: informers.informersArr.map(x => ({
        ...x,
        upgradable: balance > x.upgradeCost,
      }))
    }
  }
)(
  (state) => {
    const informersArg = informers(state)
    const balanceArg = balance(state)
    return JSON.stringify(informersArg.informersArr.map(x => ({
      ...x,
      upgradable: balanceArg > x.upgradeCost,
    })))
  }
)

export const courtCalculate = createSelector(
  (state) => state.courts,
  (state) => state.courtsJailedModifier,
  (state) => state.courtsModifierBalance,
  (state) => state.courtsModifierMaterials,
  (state) => state.courtsLocalModifier,
  (courts, jailedModifier, balanceModifier, materialsModifier, localModifiers) => {
    const calculate = {
      incomeBalance: 0,
      incomeJailed: 0,
      outcomeMaterials: 0
    };

    for (let i = 0; i < courts.length; i++) {
      let multipliersJailed = jailedModifier;
      let multipliersBalance = balanceModifier;
      let multipliersMaterials = materialsModifier;
      const localModifier = localModifiers[i];

      if (localModifier && localModifier.jailed) {
        multipliersJailed = balanceModifier * localModifier.jailed
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
        multipliers: balanceModifier
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
    return calculate
  }
);


export const informer = (_, props) => informerList[props.index]
