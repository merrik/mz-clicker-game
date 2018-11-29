const GAME_NAME = 'clicker_game';

let startTime = 0;
const GAGameStart = () => {
  if (window.ga) {
    window.ga('send', 'event', GAME_NAME, 'start_game');

    startTime = Date.now();
    setInterval(() => {
      const now = Date.now();
      const allTime = localStorage.getItem('alltime');
      const newAllTime = 
      window.ga('send', 'event', GAME_NAME, 'game_duration_alltime', currentTime.toString());
      const currentTime = parseInt((now - startTime) / 1000);
      window.ga('send', 'event', GAME_NAME, 'game_duration', currentTime.toString());
    }, 5000)
  } else {
    console.error('No GA in WINDOW')
  }
};



//C.ADD_MATERIAL
const GAClicks = (count) => {
    if (window.ga) {
        window.ga('send', 'event', GAME_NAME, 'game_clics', count.toString());
    } else {
        console.error('No GA in WINDOW')
    }
};

const GAFirstBuy = (item) => {
    if (window.ga) {
        window.ga('send', 'event', GAME_NAME, 'game_first_buy', item);
    } else {
        console.error('No GA in WINDOW')
    }
};

//C.BUY_UPGRADE
const GABuy = (item) => {
    if (window.ga) {
        window.ga('send', 'event', GAME_NAME, 'game_buy', item);
    } else {
        console.error('No GA in WINDOW')
    }
};

//C.SET_SHOWED_SHARE_BANNER
const GAReachedStage = (stageIndex) => {
    if (window.ga) {
        window.ga('send', 'event', GAME_NAME, 'game_stage_reached', stageIndex.toString());
    } else {
        console.error('No GA in WINDOW')
    }
};

//C.RESET_GAME
const GAGameRestart = (stageIndex) => {
    if (window.ga) {
        window.ga('send', 'event', GAME_NAME, 'game_restarted');
    } else {
        console.error('No GA in WINDOW')
    }
};

export {
  GAGameStart,
  GAClicks,
  GAFirstBuy,
  GABuy,
  GAReachedStage,
  GAGameRestart
}