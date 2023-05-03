const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const resetButton = document.getElementById("reset");
const timeDisplay = document.querySelector(".display");
const topAudio = new Audio("./audio/Lovers.mp3");
const successAudio = new Audio("./audio/幸せな誓い.mp3");
const failAudio = new Audio("./audio/さようなら.mp3");

let timer;
let time = 300;

function playAudio() {
  audio.play();
}

function updateTimerDisplay() {
  const minutes = Math.floor(time / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (time % 60).toString().padStart(2, "0");
  timeDisplay.textContent = `${minutes}:${seconds}`;
}

function startTimer() {
  clearInterval(timer);
  timer = setInterval(() => {
    if (time > 0) {
      time--;
      updateTimerDisplay();
    } else {
      clearInterval(timer);
      playAudio();
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(timer);
}

function resetTimer() {
  stopTimer();
  time = 300;
  updateTimerDisplay();
}

startButton.addEventListener("click", startTimer);
stopButton.addEventListener("click", stopTimer);
resetButton.addEventListener("click", resetTimer);

updateTimerDisplay();
