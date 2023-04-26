import Player from '@vimeo/player';
import  throttle  from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

function isPlayerPlayed(data) {
  console.log('pause the video!');
  localStorage.setItem('videoplayer-isPlayed', 0);
}

player.on('play', function () {
  localStorage.setItem('videoplayer-isPlayed', 1);
  console.log('played the video!');
});

player.on('pause', isPlayerPlayed);

function setVideoplayerCurrentTime (seconds) {
localStorage.setItem('videoplayer-current-time', seconds);
}

function timeUpdate(data) {
    setVideoplayerCurrentTime(data.seconds);
}

var throttleTimeUpdate = throttle(timeUpdate, 1000) ;

player.on('timeupdate', throttleTimeUpdate);

player.getVideoTitle().then(function (title) {
  console.log('title:', title);
});

player
  .setCurrentTime(localStorage.getItem('videoplayer-current-time'))
  .then(() => {
    if (JSON.parse(localStorage.getItem('videoplayer-isPlayed'))) {
      player.play();
    }
  });

