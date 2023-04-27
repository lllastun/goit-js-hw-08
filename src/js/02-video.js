import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

function isPlayerPlayed(data) {
  localStorage.setItem('videoplayer-isPlayed', 0);
}

player.on('play', function () {
  localStorage.setItem('videoplayer-isPlayed', 1);
});

player.on('pause', isPlayerPlayed);

function setVideoplayerCurrentTime(seconds) {
  localStorage.setItem('videoplayer-current-time', seconds);
}

function timeUpdate(data) {
  setVideoplayerCurrentTime(data.seconds);
}

const throttleTimeUpdate = throttle(timeUpdate, 1000);

player.on('timeupdate', throttleTimeUpdate);

player.setCurrentTime(localStorage.getItem('videoplayer-current-time'));

if (JSON.parse(localStorage.getItem('videoplayer-isPlayed'))) {
  player.play();
}
