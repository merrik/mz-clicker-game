const GAME_NAME = 'clicker_game';

let startTime = 0;
const GAGameStart = () => {
  if (window.ga) {
    window.ga('send', 'event', GAME_NAME, 'start_game');
    
    startTime = Date.now();
    setInterval(() => {
      const currentTime = parseInt((Date.now() - startTime) / 1000);
      window.ga('send', 'event', GAME_NAME, 'game_duration', currentTime.toString());
    }, 5000)
  } else {
    console.error('No GA in WINDOW')
  }
};

const GAClicks = (count) => {
    if (window.ga) {
        window.ga('send', 'event', GAME_NAME, 'game_clics', count.toString());
    } else {
        console.error('No GA in WINDOW')
    }
};

export {
  GAGameStart,
  GAClicks,
}