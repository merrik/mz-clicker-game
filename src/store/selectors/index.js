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
  {name: 'городской', materials: 3, productionJailed: 0.5, productionBalance: 1, cost: 12, rate: 1.14},
  {name: 'областной', materials: 10, productionJailed: 3, productionBalance: 10, cost: 90, rate: 1.14},
  {name: 'верховный', materials: 30, productionJailed: 13, productionBalance: 40, cost: 750, rate: 1.14},
  {name: 'конституционный', materials: 120, productionJailed: 80, productionBalance: 150, cost: 9000, rate: 1.14},
  {name: 'военный', materials: 250, productionJailed: 300, productionBalance: 500, cost: 80000, rate: 1.14},
  {name: 'ЕСПЧ', materials: 700, productionJailed: 1000, productionBalance: 1000, cost: 1000000, rate: 1.14},
  {name: 'Международный суд ООН', materials: 3000, productionJailed: 2500, productionBalance: 7000, cost: 20000000, rate: 1.14},
  {name: 'Международный уголовный суд', materials: 25000, productionJailed: 80000, productionBalance: 80000, cost: 1000000000, rate: 1.14},
];

// export const courtList = [
//   {name: 'городской', materials: 3, productionJailed: 0.5, productionBalance: 1, cost: 12, rate: 1.14},
//   {name: 'областной', materials: 10, productionJailed: 5, productionBalance: 5, cost: 90, rate: 1.14},
//   {name: 'верховный', materials: 50, productionJailed: 20, productionBalance: 40, cost: 5000, rate: 1.14},
//   {name: 'конституционный', materials: 120, productionJailed: 30, productionBalance: 30, cost: 18000, rate: 1.14},
//   {name: 'военный', materials: 120, productionJailed: 100, productionBalance: 25, cost: 120000, rate: 1.14},
//   {name: 'ЕСПЧ', materials: 700, productionJailed: 350, productionBalance: 150, cost: 60000, rate: 1.14},
//   {name: 'Международный суд ООН', materials: 2000, productionJailed: 700, productionBalance: 400, cost: 400000, rate: 1.14},
//   {name: 'Международный уголовный суд', materials: 4000, productionJailed: 8000, productionBalance: 4000, cost: 2000000, rate: 1.14},
// ];

export const informerList = [
  {name: 'Студент юрфака', production: 1, cost: 3, rate: 1.14},
  {name: 'Набожная старушка', production: 3, cost: 50, rate: 1.14},
  {name: 'Казачья кибердружина', production: 10, cost: 450, rate: 1.14},
  {name: 'АВТОДОНОС 3000', production: 32, cost: 2500, rate: 1.14},
  {name: 'Госмемконтроль', production: 85, cost: 9000, rate: 1.14},
  {name: 'Интернет-бюро Интерпола', production: 250, cost: 35000, rate: 1.14},
  {name: 'Глобальная комиссия по запрету репостов', production: 650, cost: 180000, rate: 1.14},
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
    description: 'Проснувшись однажды утром после беспокойного сна, вы — Семен Богданович Залыба, фельдфебель Центра «Э» — твердо решили искоренить экстремизм в России. Едва допив кофе, вы побежали в свой кабинет и уселись за любимый компьютер.\n' +
      '<br><br>' +
      'Чтобы воплотить мечту в жизнь, вам необходимо <b>собирать материалы</b> — скриншотить картинки «ВКонтакте», нажимая на кнопку. Материалы превращаются в уголовные дела и направляются в независимый суд, который сажает экстремистов. Так им и надо.  \n'
  },
  {
    isNotAchievement: true,
    materialsPoint: 30,
    title: 'Вы открыли суды',
    description: ' Каждый должен с чего-то начинать, думаете вы, относя папку со скриншотами в ближайший городской суд — одноэтажное обшарпанное здание с протекающей крышей. Хряпнув чарочку с судьей, вы договариваетесь о том, что вы будете подкидывать ему дела постоянно.\n' +
      '<br><br>' +
      'Для того, чтобы городской суд посадил человека, нужно шесть материалов. За посаженных людей вам повышают финансирование — за деньги вы можете <b>открывать другие суды</b>, а также <b>улучшать</b> их.\n'
  },
  {
    isNotAchievement: true,
    point: 10,
    title: 'Вы открыли доносчиков',
    description: 'Первый десяток посаженных! Начальник городской полиции жмет вам руку. Теперь вы можете нанимать представителей общественности  — они будут собирать материалы вместе с вами.\n' +
      '<br><br>' +
      'Купите доносчика, чтобы <b>увеличить скорость сбора материалов</b>. За отдельную плату доносчики будут работать эффективнее — их тоже можно улучшать.\n\n'
  },
  {
    point: 50000,
    title: 'Я посадил целый город',
    params: [['achievement', 'city']],
    img: city,
    description: 'Я посадил за репосты 50 тысяч человек — население небольшого города'
  },
  {
    point: 700000,
    title: 'Я посадил Барнаул',
    params: [['achievement', 'barnaul']],
    img: barnaule,
    description: 'Я посадил за репосты 700 тысяч человек — все население Барнаула, экстремистской столицы России'
  },
  {
    point: 1500000,
    title: 'Я посадил мегаполис',
    params: [['achievement', 'megapolis']],
    img: megapolis,
    description: 'Полтора миллиона посаженных за репосты лично мною — население целого экстремистского мегаполиса'
  },
  {
    point: 20000000,
    title: 'Я посадил федеральный округ',
    params: [['achievement', 'fed']],
    img: fed,
    description: 'Я посадил за репосты 20 млн человек — целый федеральный округ или несколько областей'
  },
  {
    point: 73000000,
    title: 'Я посадил пол-России',
    params: [['achievement', 'half_russia']],
    img: halfRussia,
    description: 'Пол-страны сидят, пол-страны сторожат: я посадил за репосты половину населения России'
  },
  {
    point: RUSSIAN_POPULATION,
    title: 'Я посадил всю Россию',
    params: [['achievement', 'russia']],
    img: russia,
    description: 'Я посадил за репосты все население России'
  },
  {
    point: 4500000000,
    title: 'Я посадил весь Континент',
    params: [['achievement', 'continent']],
    img: continent,
    description: 'Антиэкстремистское законодательство распространилось на весь континент: я посадил за репосты больше четырех миллиардов человек'
  },
  {
    point: WORLD_POPULATION,
    title: 'Я посадил весь Мир',
    params: [['achievement', 'world']],
    img: world,
    description: 'Я — последний человек на земле. Все остальные сидят за репосты'
  }
];
window.stageShareList = stageShareList

export const upgradesListNotIndex = [
  [
    0,
    {
      name: 'Заработок в интернете без смс',
      description: 'Материалы уголовных дел становятся инвестиционно привлекательными ценными бумагами — <b>теперь вы получаете деньги за каждый клик</b>',
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
      name: 'Запрет апелляций',
      description:  'Только время тратили, ну ей-богу. <b>Увеличивает производительность городского суда в 1.5 раз и поступления в бюджет в 2 раза</b>',
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
      name: 'Списывание у прокурора',
      description: 'Норма закона, позволяющая писать приговор прокурору. Будем честны, наконец. <b>Увеличивает производительность городского суда в 1.5 раз и поступления в бюджет в 2 раза</b>',
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
      name: 'Новые СИЗО',
      description:  'Изоляторы прямо в здании суда — никаких автозаков. <b>Увеличивает производительность городского суда в 1.5 раз и поступления в бюджет в 2 раза</b>',
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
      name: 'Разгон присяжных',
      description:  'Слишком большой процент оправданий. <b>Увеличивает производительность городского суда в 1.5 раз и поступления в бюджет в 2 раза</b>',
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
      name: 'Еще больше приставов',
      description:  'Судьи чувствуют себя увереннее. <b>Увеличивает производительность городского суда в 25 раз и поступления в бюджет в 20 раз</b>',
      cost: 7360000,
      point: 100,
      courtIndex: '0',
      buffs: [
        ['courtsLocalModifier', {
          balance: 20,
          jailed: 25
        }],
      ]
    }
  ],
  [
    6,
    {
      name: 'Судейские городки',
      description:  'Отдельные хорошо охраняемые селения дарятся судьям за хорошую работу, что повышает их мотивацию. <b>Увеличивает производительность областного суда в 1.5 раз и поступления в бюджет в 2 раз</b>',
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
      name: 'Дела об экстремистских сообществах',
      description:  'Преследование всех подписчиков пабликов со смешными картинками. <b>Увеличивает производительность областного суда в 1.5 раз и поступления в бюджет в 2 раз</b>',
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
      name: 'Мантии-невидимки',
      description:  'Новая разработка Сколково — маскирующая одежда для судей. <b>Увеличивает производительность областного суда в 1.5 раз и поступления в бюджет в 2 раз</b>',
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
      name: 'Электростимуляция',
      description:  '18 часов без сна как новая норма. <b>Увеличивает производительность областного суда в 4 раз и поступления в бюджет в 2 раз</b>',
      cost: 700000,
      point: 50,
      courtIndex: '1',
      buffs: [
        ['courtsLocalModifier', {
          balance: 2,
          jailed: 4
        }],
      ]
    }
  ],
  [
    10,
    {
      name: 'Прямая подсудность',
      description:  'Теперь Верховный суд может рассматривать уголовные дела как и любой другой. <b>Увеличивает производительность Верховного суда в 1.5 раз и поступления в бюджет в 2 раз</b>',
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
      name: 'ТОП',
      description:  'Поддерживаемые святым духом и киберимплантами судьи продолжают выполнять свой долг даже после смерти. <b>Увеличивает производительность Верховного суда в 1.5 раз и поступления в бюджет в 2 раз</b>',
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
      name: 'Посмертное судейство',
      description:  'Поддерживаемые святым духом и киберимплантами судьи продолжают выполнять свой долг даже после смерти. <b>Увеличивает производительность Верховного суда в 1.5 раз и поступления в бюджет в 2 раз</b>',
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
      name: 'Роспуск коллегии',
      description:  'ВС больше не принимает никаких жалоб — все силы на приговоры экстремистам. <b>Увеличивает производительность Верховного суда в 4 раз и поступления в бюджет в 2 раз</b>',
      cost: 3500000,
      point: 50,
      courtIndex: '2',
      buffs: [
        ['courtsLocalModifier', {
          balance: 2,
          jailed: 4
        }],
      ]
    }
  ],
  [
    14,
    {
      name: 'Переезд из Петербурга',
      description:  'Ничто не может работать эффективно в этом чертовом городе. <b>Увеличивает производительность Конституционного суда в 1.5 раз и поступления в бюджет в 2 раз</b>',
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
      name: 'Мир и согласие',
      description:  ' Судьи Конституционного суда полностью соглашаются с необходимостью искоренить экстремизм и не рассматривают никаких жалоб. <b>Увеличивает производительность Конституционного суда в 1.5 раз и поступления в бюджет в 2 раз</b>',
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
      name: 'Поправки в Конституцию',
      description:  'Пенсионный возраст тоже обещали не поднимать — и чего? <b>Увеличивает производительность Конституционного суда в 1.5 раз и поступления в бюджет в 2 раз</b>',
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
      name: 'Закрытие границ',
      description:  'Обосновано необходимостью сдерживать экстремистов. <b>Увеличивает производительность Конституционного суда в 4 раз и поступления в бюджет в 2 раз</b>',
      cost: 21000000,
      point: 50,
      courtIndex: '3',
      buffs: [
        ['courtsLocalModifier', {
          balance: 2,
          jailed: 4
        }],
      ]
    }
  ],
  [
    18,
    {
      name: 'Расширение подсудности',
      description:  '<b>Увеличивает производительность Военного суда в 1.5 раз и поступления в бюджет в 2 раз</b>',
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
      name: 'Военные судьи',
      description:  'По-настоящему военные: судят служаки-прапорщики. <b>Увеличивает производительность Военного суда в 1.5 раз и поступления в бюджет в 2 раз</b>',
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
      name: 'Аренда храмов',
      description:  'Военных судов не так много — теперь отправлять правосудие можно будет прямо в храмах. <b>Увеличивает производительность Военного суда в 1.5 раз и поступления в бюджет в 2 раз</b>',
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
      name: 'Испытание поединком',
      description:  'Желающие доказать свою невиновность выходят на битву с Т-72Б3. <b>Увеличивает производительность Военного суда в 4 раз и поступления в бюджет в 2 раз</b>',
      cost: 70000000,
      point: 50,
      courtIndex: '4',
      buffs: [
        ['courtsLocalModifier', {
          balance: 2,
          jailed: 4
        }],
      ]
    }
  ],
  [
    22,
    {
      name: 'Отказ от приема жалоб',
      description:  'ЕСПЧ больше не принимает жалобы на приговоры российских судов. <b>Увеличивает производительность ЕСПЧ в 2 раз и поступления в бюджет в 2 раз</b>',
      cost: 500000,
      point: 2,
      courtIndex: '5',
      buffs: [
        ['courtsLocalModifier', {
          balance: 2,
          jailed: 2
        }],
      ]
    }
  ],
  [
    23,
    {
      name: 'Переезд. Прощай, Страсбург',
      description:  'Новое прекрасное здание суда в Сызрани. <b>Увеличивает производительность ЕСПЧ в 2 раз и поступления в бюджет в 2 раз</b>',
      cost: 770000,
      point: 5,
      courtIndex: '5',
      buffs: [
        ['courtsLocalModifier', {
          balance: 2,
          jailed: 2
        }],
      ]
    }
  ],
  [
    24,
    {
      name: 'Казаки-председатели',
      description:  'По-настоящему опытные судьи готовы рассмотреть самые сложные дела. <b>Увеличивает производительность ЕСПЧ в 2 раз и поступления в бюджет в 2 раз</b>',
      cost: 10500000,
      point: 25,
      courtIndex: '5',
      buffs: [
        ['courtsLocalModifier', {
          balance: 2,
          jailed: 2
        }],
      ]
    }
  ],
  [
    25,
    {
      name: 'Скрепы',
      description:  'Уголовные дела сшиваются духовными скрепами. <b>Увеличивает производительность ЕСПЧ в 4 раз и поступления в бюджет в 2 раз</b>',
      cost: 280000000,
      point: 50,
      courtIndex: '5',
      buffs: [
        ['courtsLocalModifier', {
          balance: 2,
          jailed: 4
        }],
      ]
    }
  ],
  [
    26,
    {
      name: 'Контингент мемотворцев',
      description:  'Вводится в страны с нестабильной экстремистской обстановкой. <b>Увеличивает производительность суда ООН в 2 раз и поступления в бюджет в 2 раз</b>',
      cost: 2600000,
      point: 2,
      courtIndex: '6',
      buffs: [
        ['courtsLocalModifier', {
          balance: 2,
          jailed: 2
        }],
      ]
    }
  ],
  [
    27,
    {
      name: 'Постановление о смешных картинках',
      description:  'Исторический документ — смех над мемами считается международным преступлением. <b>Увеличивает производительность суда ООН в 2 раз и поступления в бюджет в 2 раз</b>',
      cost: 3850000,
      point: 5,
      courtIndex: '6',
      buffs: [
        ['courtsLocalModifier', {
          balance: 2,
          jailed: 2
        }],
      ]
    }
  ],
  [
    28,
    {
      name: 'Делопроизводство кириллицей',
      description:  'MOTHER ЯUSSIA. <b>Увеличивает производительность суда ООН в 2 раз и поступления в бюджет в 2 раз</b>',
      cost: 53000000,
      point: 25,
      courtIndex: '6',
      buffs: [
        ['courtsLocalModifier', {
          balance: 2,
          jailed: 2
        }],
      ]
    }
  ],
  [
    29,
    {
      name: 'Закон прямого действия',
      description:  'Cохранение картинки приравнивается к действию, на нем изображенному. <b>Увеличивает производительность суда ООН в 4 раз и поступления в бюджет в 2 раз</b>',
      cost: 1400000000,
      point: 50,
      courtIndex: '6',
      buffs: [
        ['courtsLocalModifier', {
          balance: 2,
          jailed: 4
        }],
      ]
    }
  ],
  [
    30,
    {
      name: 'Расширение повестки',
      description:  'Доселе подсудимыми международного суда могли стать лишь избранные — пора это исправить. <b>Увеличивает производительность Международного уголовного суда в 2 раз и поступления в бюджет в 2 раз</b>',
      cost: 13000000,
      point: 2,
      courtIndex: '7',
      buffs: [
        ['courtsLocalModifier', {
          balance: 2,
          jailed: 2
        }],
      ]
    }
  ],
  [
    31,
    {
      name: 'Фортификация',
      description:  'Следующий уровень правосудия: дело ведет нейросеть. <b>Увеличивает производительность Международного уголовного суда в 2 раз и поступления в бюджет в 2 раз</b>',
      cost: 19200000,
      point: 5,
      courtIndex: '7',
      buffs: [
        ['courtsLocalModifier', {
          balance: 2,
          jailed: 2
        }],
      ]
    }
  ],
  [
    32,
    {
      name: 'Нейросудьи',
      description:  'Эфиры международных телеканалов и все газеты в ежедневном режиме транслируют суды над экстремистами в назидание. <b>Увеличивает производительность Международного уголовного суда в 2 раз и поступления в бюджет в 2 раз</b>',
      cost: 265000000,
      point: 25,
      courtIndex: '7',
      buffs: [
        ['courtsLocalModifier', {
          balance: 2,
          jailed: 2
        }],
      ]
    }
  ],
  [
    33,
    {
      name: 'Трансляция процессов',
      description:  'Эфиры международных телеканалов и все газеты в ежедневном режиме транслируют суды над экстремистами в назидание. <b>Увеличивает производительность Международного уголовного суда в 4 раз и поступления в бюджет в 2 раз</b>',
      cost: 7000000000,
      point: 50,
      courtIndex: '7',
      buffs: [
        ['courtsLocalModifier', {
          balance: 2,
          jailed: 4
        }],
      ]
    }
  ],
  [
    34,
    {
      name: 'Клики приносят мани',
      description: 'Деньги за клики',
      cost: 2500000000,
      point: 500000000,
      skills: {
        moneyClick: true
      }
    }
  ],
  [
    35,
    {
      name: 'Пинок',
      description:  'Вы пинаете студента, и он начинает работать эффективнее. <b>Повышает производительность студента в 2 раза</b>',
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
      name: 'Засекречивание',
      description:  'Выступая в суде, ваш студент будет засекречен. Он сможет доносить чаще, не боясь возмездия. <b>Повышает производительность студента в 2 раза</b>',
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
      name: 'Проставление практики',
      description:  'Вы договариваетесь с руководством вуза, и у студента появляется больше времени на доносы. <b>Повышает производительность студента в 2 раза</b>',
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
      name: 'Повышение до стажера',
      description: 'Вы обещаете студенту карьеру в правоохранительных органах, он переходит на 16-часовой рабочий день. <b>Повышает производительность студента в 2 раза</b>',
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
      name: 'Выдача погонов',
      description: 'Погоны, купленные в военторге, повышают рвение студента еще на несколько порядков. <b>Повышает производительность студента в 2 раза</b>',
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
      name: 'Святость',
      description: 'Икона на заставке компьютера позволяет старушке молиться, не отрываясь от работы. <b>Повышает производительность набожной старушки в 2 раза</b>',
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
      name: '«Радонеж»',
      description: 'Вы заказываете еженедельную передачу о доносах как долге христианина на радио «Радонеж». <b>Повышает производительность набожной старушки в 2 раза</b>',
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
      name: 'Компьютерные курсы',
      description: 'Внучок, я что-то нажала и все исчезло. <b>Повышает производительность набожной старушки в 2 раза</b>',
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
      name: 'Кагор с кофеином',
      description:  'После причащения бабушка смотрит картинки две недели без остановки. <b>Повышает производительность набожной старушки в 2 раза</b>',
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
      name: 'Пузырь спирту',
      description: 'Гуляй, дружина! <b>Повышает производительность казачьей кибердружины в 2 раза</b>',
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
      name: 'Кибернагайки',
      description: 'Новейшие технологии позволяют стегать экстремистов прямо в интернете. <b>Повышает производительность казачьей кибердружины в 2 раза</b>',
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
      name: 'Контракт с МВД',
      description:  'От охраны дач к охране интернет-пространства: теперь ваши казаки смогут ни в чем себе не отказывать. <b>Повышает производительность казачьей кибердружины в 2 раза</b>',
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
      name: 'Медали за интернет-оборону',
      description:  '+25 к важности каждого казака. <b>Повышает производительность казачьей кибердружины в 2 раза</b>',
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
      name: 'Новый алгоритм',
      description:  'Бип-бип-буп. <b>Повышает производительность АВТОДОНОСА 3000 в 2 раза</b>',
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
      name: 'Армия ботов',
      description:  'БЖЖЖЖЖЖ. <b>Повышает производительность АВТОДОНОСА 3000 в 2 раза</b>',
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
      name: 'Логин по паспорту',
      description:  '[ВВЕДИТЕ ВАШИ ДАННЫЕ]. <b>Повышает производительность АВТОДОНОСА 3000 в 2 раза</b>',
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
      name: 'Распознавание лиц',
      description:  '[ОСТАВАЙТЕСЬ НЕПОДВИЖНЫМ В ТЕЧЕНИЕ 5 СЕКУНД]. <b>Повышает производительность АВТОДОНОСА 3000 в 2 раза</b>',
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
      name: 'Перевыполненный план',
      description:  'Сотрудники ФСМ всеми правдами и неправдами перевыполняют план на этот год. <b>Повышает производительность Федеральной службы мемов в 2 раза</b>',
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
      name: 'Куратор в каждый дом',
      description:  'Физическое присутствие сотрудников в каждой квартире. <b>Повышает производительность Федеральной службы мемов в 2 раза</b>',
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
      name: 'СОРМ-4',
      description:  'Каждый случай смеха будет расследован — вдруг из-за мема? <b>Повышает производительность Федеральной службы мемов в 2 раза</b>',
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
      name: 'Курсы подготовки спецназа',
      description:  'Выбивание дверей на скорость, плетение из наручников, поиски флешки в темной комнате. <b>Повышает производительность Федеральной службы мемов в 2 раза</b>',
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
      name: 'Российский генерал',
      description:  'Новый глава Интерпола перебрасывает все ресурсы на поиски интернет-экстремистов. <b>Повышает производительность Интерпола в 2 раза</b>',
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
      name: 'Превентивный арест',
      description:  'Предотвращение важнее наказания — полиция по всему миру получает право задерживать граждан для проверки соцсетей. <b>Повышает производительность Интерпола в 2 раза</b>',
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
      name: 'Доступ к видеокамерам',
      description:  'Большому Брату и не снилась такая сеть. <b>Повышает производительность Интерпола в 2 раза</b>',
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
      name: 'Ключи шифрования от Telegram',
      description:  'Наконец-то! <b>Повышает производительность Интерпола в 2 раза</b>',
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
      name: 'Полный контроль соцсетей',
      description:  'В каждой интернет-компании открывается филиал комиссии, что позволяет раскрывать больше преступлений. <b>Повышает производительность Комиссии по борьбе с репостами в 2 раза</b>',
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
      name: 'Анализ трафика',
      description:  'Джон, у нас лягушонок Пепе, возможно криминал, по коням. <b>Повышает производительность Комиссии по борьбе с репостами в 2 раза</b>',
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
      name: 'Посадки за просмотр',
      description:  'Видел картинку? Виновен. <b>Повышает производительность Комиссии по борьбе с репостами в 2 раза</b>',
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
      name: 'Чтение мыслей',
      description:  'Уголовная статья за хранение смешных картинок в памяти. <b>Повышает производительность Комиссии по борьбе с репостами в 2 раза</b>',
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
      name: 'Покорение земли',
      description:  '',
      cost: 140000000000,
      jailedPoint: 7000000000,
      buffs: [
        ['informerModifier', 5],
        ['courtsModifierBalance', 5],
        ['courtsModifierBalance', 5],
      ]
    }
  ],
  [
    65,
    {
      name: 'Упрощенный документооборот',
      description:  'Из-за меньшего количества бумажной волокиты вы можете работать эффективнее. <b>Один клик создает на 5 материалов больше</b>',
      cost: 5000,
      jailedPoint: 10000,
      buffs: [
        ['clickModifier', 5]
      ]
    }
  ],
  [
    66,
    {
      name: 'Новые кадры',
      description:  'Ваше подразделение расширяется — теперь вы и ваши коллеги могут скриншотить больше картинок. <b>Один клик создает на 50 материалов больше.</b>',
      cost: 100000,
      jailedPoint: 250000,
      buffs: [
        ['clickModifier', 50]
      ]
    }
  ],
  [
    67,
    {
      name: 'Антиэкстремистская повинность',
      description:  'Новый закон, который вынуждает всех граждан тратить час времени на помощь вашему подразделению. <b>Один клик создает на 500 материалов больше.</b>',
      cost: 400000,
      jailedPoint: 1000000,
      buffs: [
        ['clickModifier', 500]
      ]
    }
  ],
  [
    68,
    {
      name: 'Нейроимпланты',
      description:  'Экспериментальные технологии на страже общественной безопасности. <b>Один клик создает на 5000 материалов больше.</b>',
      cost: 10000000,
      jailedPoint: 100000000,
      buffs: [
        ['clickModifier', 5000]
      ]
    }
  ],
  [
    69,
    {
      name: 'Турбореактивный ускоритель для пальцев',
      description:  'Предел человеческой производительности. <b>Один клик создает на 50 000 материалов больше.</b>',
      cost: 700000000,
      jailedPoint: 1000000000,
      buffs: [
        ['clickModifier', 50000]
      ]
    }
  ],
];

export const upgradesList = R.fromPairs(upgradesListNotIndex.map((value, index) => {
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
        return upgradesList[upgrade]
      })
      .sort((a, b) => a.cost - b.cost)
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
