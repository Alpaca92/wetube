const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const muteBtn = document.getElementById("mute");
const time = document.getElementById("time");
const volumeRange = document.getElementById("volume");

let volumeValue = 0.5;
video.volume = volumeValue;

playBtn.addEventListener("click", (event) => {
  event.preventDefault();
  video.paused ? video.play() : video.pause();
  playBtn.innerText = video.paused ? "Play" : "Pause";
});

muteBtn.addEventListener("click", (event) => {
  event.preventDefault();
  video.muted = !video.muted;
  volumeRange.value = video.muted ? 0 : volumeValue;

  muteBtn.innerText = video.muted ? "Unmute" : "Mute";
});

volumeRange.addEventListener("input", (event) => {
  const {
    target: { value },
  } = event;

  if (video.muted) {
    video.muted = false;
    muteBtn.innerText = "Mute";
  }

  volumeValue = value;
  video.volume = value;
});
