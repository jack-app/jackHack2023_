const startButton = document.getElementById("start");
// const stopButton = document.getElementById("stop");
const resetButton = document.getElementById("reset");
const timeDisplay = document.querySelector(".display");
const modal = document.getElementById("modal");
const success = document.querySelector(".success");
const fail = document.querySelector(".fail");
const timeModal = document.getElementById("timeModal");
const selectTime = document.getElementById("selectTime");
const time1 = document.getElementById("time1");
const time2 = document.getElementById("time2");
const time3 = document.getElementById("time3");
const time4 = document.getElementById("time4");
const time5 = document.getElementById("time5");
const time6 = document.getElementById("time6");
const time7 = document.getElementById("time7");
const time8 = document.getElementById("time8");
const topAudio = new Audio("./audio/Lovers.mp3");
const successAudio = new Audio("./audio/幸せな誓い.mp3");
const failAudio = new Audio("./audio/さようなら.mp3");
const alertAudio = new Audio("./audio/itemgetsea.mp3");
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

let timer;
let time = 0;
let initTime = 0;
const times = [time1, time2, time3, time4, time5, time6, time7, time8];
const timeList = [0, 0, 0, 0, 0, 0, 0, 0];
function playTopAudio() {
  if (time == initTime / 2 + 10) {
    topAudio.play();
  }
}

function stopTopAudio() {
  topAudio.pause();
}

function sendAlert() {
  if (timeList.includes(initTime - time)) {
    alertAudio.play();
  }
}

function setTime(i, t, l) {
  a = (initTime * i) / 8;
  l[i - 1] = parseInt(a);
  const minutes = Math.floor(a / 60)
    .toString()
    .padStart(2, "0");
  const seconds = parseInt(a % 60)
    .toString()
    .padStart(2, "0");
  t.textContent = `${minutes}:${seconds}`;
}

function Top() {
  if (time == initTime / 2) {
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
      updateTimerDisplay();
      window.requestAnimationFrame(loop);
      playTopAudio();
      sendAlert();
      Top();
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
  angleRad = 20.51;
  window.requestAnimationFrame(loop);
  updateTimerDisplay();
}

startButton.addEventListener("click", startTimer);
// stopButton.addEventListener("click", stopTimer);
resetButton.addEventListener("click", resetTimer);
timeDisplay.addEventListener("click", () => {
  timeModal.style.display = "block";
});

success.addEventListener("click", () => {
  modal.style.display = "none";
  topAudio.pause();
  successAudio.play();
});

fail.addEventListener("click", () => {
  modal.style.display = "none";
  topAudio.pause();
  failAudio.play();
});

selectTime.addEventListener("change", () => {
  time = selectTime.value;
  initTime = selectTime.value;
  timeModal.style.display = "none";
  for (let i = 0; i < times.length; i++) {
    setTime(i + 1, times[i], timeList);
  }
  console.log(timeList);
  updateTimerDisplay();
});

updateTimerDisplay();

// canvas
canvas.width = 700;
canvas.height = 700;
context.fillStyle = "#EAC7C7";
document.body.appendChild(canvas);

// 円運動の中心座標。
// 今回はcanvasの真ん中を中心に移動する。
const centerX = 350;
const centerY = 360;

// 円を描画する中心からの距離。
const distanceFromCenter = 300;

// 表示する円のサイズ。
const circleSize = 40;

// 変化させていくパラメータ。
// angleRadを増加させていき、
// それに伴いxとyが変化していくようにする。
let x = centerX;
let y = centerY;
let angleRad = 20.42;

// メインループ
function loop() {
  // 描画内容を消去する。
  context.clearRect(0, 0, canvas.width, canvas.height);

  // angleRadを1度ずつ変化させていく。
  // 1度はMath.PI/180ラジアン
  // single = initTime / (2 * Math.PI);
  // angleRad -= (single * Math.PI) / 180;
  let angleDegPerSec = 360 / initTime;
  angleRad -= (angleDegPerSec * Math.PI) / 180;
  // ここで座標を変化させていく。
  x = distanceFromCenter * Math.cos(angleRad) + centerX;
  y = distanceFromCenter * Math.sin(angleRad) + centerY;

  // 求めた座標に円を描画する。
  context.beginPath();
  context.arc(x, y, circleSize, 0, Math.PI * 2);
  // context.rect(x, y, circleSize, circleSize);
  context.fill();
}

// window.requestAnimationFrame(loop);
