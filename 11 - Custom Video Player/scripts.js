// get the elements
const player = document.querySelector(".player ");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const sliders = player.querySelectorAll(".player__slider");
const fullScreenButton = player.querySelector(".fullscreen");

// write functions 
function togglePlay() {
  video.paused ? video.play() : video.pause();
};

function updateButton() {
  const icon = this.paused ? "►" : '❚ ❚' ;
  toggle.textContent = icon;
};

function skip() {
  video.currentTime += parseFloat(this.dataset.skip); 
};

function handleRangeUpdate() {
  video[this.name] = this.value;
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}% `;
}
function scrub (e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

function fullScreen() {
  if (video.requestFullscreen) {
    video.requestFullscreen();
  }
}
//hook up the event listeners
video.addEventListener("click", togglePlay);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
video.addEventListener("timeupdate", handleProgress );

toggle.addEventListener("click", togglePlay);
skipButtons.forEach(button => button.addEventListener("click", skip)); 
sliders.forEach(range => range.addEventListener("change", handleRangeUpdate));
sliders.forEach(range => range.addEventListener("mousemove", handleRangeUpdate));

let mouseDown = false;
progress.addEventListener('click', scrub); 
progress.addEventListener('mousedown', () => mouseDown = true); 
progress.addEventListener('mouseup', () => mouseDown = false);
progress.addEventListener('mousemove', (e) => mouseDown && scrub(e)); 

fullScreenButton.addEventListener("click", fullScreen);