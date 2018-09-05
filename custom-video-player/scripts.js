// Elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer')
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');

const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullscreen = player.querySelector('.fullscreen');

// Functions
function togglePlay () {
  video.paused ? video.play() : video.pause();
}

function togglePlay2 () {
  const method = video.paused ? 'play' : 'pause';
  video[method]();
}

function updateButton () {
  if (video.paused) {
  toggle.innerHTML = '►';
  } else {
    toggle.innerHTML = 'l l';
  }
}

function updateButton2 () {
  const icon = this.paused ? '►' : 'l l'
  toggle.textContent = icon;
}

function skip () {
  video.currentTime += parseInt(this.dataset.skip);
}

function handleRangeUpdate () {
  video[this.name] = this.value
}

function handleProgress () {
  let percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub (e) {
  let scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

function toggleFullscreen () {
  if (!fs) {
    openFullscreen();
    fs = !fs
  } else {
    closeFullscreen();
    // console.log('close fs')
    fs = !fs
  }
}

/* View in fullscreen */
function openFullscreen() {
  if (player.requestFullscreen) {
    player.requestFullscreen();
  } else if (player.mozRequestFullScreen) { /* Firefox */
    player.mozRequestFullScreen();
  } else if (player.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
    player.webkitRequestFullscreen();
  } else if (player.msRequestFullscreen) { /* IE/Edge */
    player.msRequestFullscreen();
  }
}

/* Close fullscreen */
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) { /* Firefox */
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE/Edge */
    document.msExitFullscreen();
  }
}

// Event Listeners
// listed for when the video is paused
let mousedown = false;
let fs = false;
var isFullscreenAvailable = player.fullscreenEnabled;

video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('click', togglePlay);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip))
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate))
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate))

fullscreen.addEventListener('click', toggleFullscreen)

// () => {
//   if (!fs) {
//     openFullscreen();
//     fs = !fs
//   } else {
//     closeFullscreen();
//     // console.log('close fs')
//     fs = !fs
//   }
// });

progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
