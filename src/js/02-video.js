import Player from '@vimeo/player';
const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const throttle = require('lodash.throttle');

const onPlay = function (timeupdate) {
  localStorage.setItem('videoplayer-current-time', timeupdate.seconds);

  console.log(timeupdate.seconds);
};

player.on('timeupdate', throttle(onPlay, 1000));

const setTimeToPlay = localStorage.getItem('videoplayer-current-time');

if (setTimeToPlay) {
  player.setCurrentTime(setTimeToPlay);
}
