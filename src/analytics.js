const GAME_NAME = 'clicker_game';

let startTime = 0;
let allTime = 0;

const GAGameStart = () => {
  if (window.ga) {
    const isStarted = localStorage.getItem('isStarted');
    if (!isStarted) {
        window.ga('send', 'event', GAME_NAME, 'start_game_uniq');
        localStorage.setItem('isStarted', `true`);
    }
    window.ga('send', 'event', GAME_NAME, 'start_game');
  } else {
    console.error('No GA in WINDOW')
  }
};

const GASessionStart = () => {
    allTime = parseInt(localStorage.getItem('alltime')) || 0;
    startTime = Date.now();
    if (window.ga) {
        window.ga('send', 'event', GAME_NAME, 'start_game_session');

        setInterval(() => {
            const now = Date.now();
            const currentTime = parseInt((now - startTime) / 1000);
            window.ga('send', 'event', GAME_NAME, 'game_duration_sec', `${currentTime}`);
            
            allTime = allTime + 5;
            localStorage.setItem('alltime', `${allTime}`);
            window.ga('send', 'event', GAME_NAME, 'game_duration_alltime_sec', `${allTime}`);
          }, 5000)
    } else {
        console.error('No GA in WINDOW')
    }
}

//C.ADD_MATERIAL
const GAClicks = (count) => {
    if (window.ga) {
        window.ga('send', 'event', GAME_NAME, 'game_clics', `${count}`);
    } else {
        console.error('No GA in WINDOW')
    }
};

//C.BUY_UPGRADE
const GABuy = (item) => {
    if (window.ga) {
        const bought = localStorage.getItem(`game_first_buy_${item}`);
        if (!bought) {
            window.ga('send', 'event', GAME_NAME, 'game_first_buy', `${item}`);
            localStorage.setItem(`game_first_buy_${item}`, `true`);
        }

        window.ga('send', 'event', GAME_NAME, 'game_buy', `${item}`);
    } else {
        console.error('No GA in WINDOW')
    }
};

//C.SET_SHOWED_SHARE_BANNER
const GAReachedStage = (stageIndex) => {
    if (window.ga) {
        const timeFromStart = parseInt((Date.now() - startTime) / 1000);
        window.ga('send', 'event', GAME_NAME, `game_stage_${stageIndex}_reached_at`, `${timeFromStart}`);
        window.ga('send', 'event', GAME_NAME, 'game_stage_reached', `${stageIndex}`);
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
  GASessionStart,
  GAClicks,
  GABuy,
  GAReachedStage,
  GAGameRestart
}