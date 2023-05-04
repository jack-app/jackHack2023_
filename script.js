const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const resetButton = document.getElementById("reset");
const timeDisplay = document.querySelector(".display");
const modal = document.getElementById("modal");
const timeModal = document.getElementById("timeModal");
const success = document.getElementById("success");
const fail = document.getElementById("fail");
const selectTime = document.getElementById("selectTime");

const topAudio = new Audio("./audio/Lovers.mp3");
const successAudio = new Audio("./audio/幸せな誓い.mp3");
const failAudio = new Audio("./audio/さようなら.mp3");
const alertAudio = new Audio("./audio/itemgetsea.mp3");

let timer;
let time = selectTime.value;
let initTime = selectTime.value;
var initialOffset = 280;
var i = 1;
function playTopAudio() {
  if (time == 280) {
    topAudio.play();
  }
}

function stopTopAudio() {
  topAudio.pause();
}

function sendAlert() {
  if (time == 290) {
    alertAudio.play();
  }
}

function Top() {
  // 5秒経過したらモーダルを表示する
  if (time == 295) {
    modal.style.display = "block";
  }
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
      i++;
      updateTimerDisplay();
      playTopAudio();
      sendAlert();
      Top();
      circle.style.strokeDashoffset = initialOffset - i * (initialOffset / 300);
    } else {
      clearInterval(timer);
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(timer);
  stopTopAudio();
  successAudio.pause();
  failAudio.pause();
}

function resetTimer() {
  stopTimer();
  time = initTime;
  updateTimerDisplay();
  circle.style.strokeDashoffset = initialOffset;
  i = 0;
}

startButton.addEventListener("click", startTimer);
stopButton.addEventListener("click", stopTimer);
resetButton.addEventListener("click", resetTimer);
timeDisplay.addEventListener("click", () => {
  timeModal.style.display = "block";
});

success.addEventListener("click", () => {
  modal.style.display = "none";
  successAudio.play();
});

fail.addEventListener("click", () => {
  modal.style.display = "none";
  failAudio.play();
});

selectTime.addEventListener("change", () => {
  time = selectTime.value;
  initTime = selectTime.value;
  timeModal.style.display = "none";
  updateTimerDisplay();
});

updateTimerDisplay();
