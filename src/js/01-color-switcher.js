// QuerySelectors
const start = document.querySelector("[data-start]");
const stop = document.querySelector("[data-stop]");
const body = document.querySelector("body");
stop.disabled = true;

//Listening for the start and stop
start.addEventListener("click", handleStart);
stop.addEventListener("click", handleStop);

// Functions
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

function handleStart() {
  start.disabled = true;
  stop.disabled = false;
  body.style.backgroundColor = getRandomHexColor();
    changeColor = setInterval(() => {
      const bodyColor = getRandomHexColor();
      body.style.backgroundColor = bodyColor;
    }, 1000);

};
function handleStop() {
  clearInterval(changeColor);
  start.disabled = false;
  stop.disabled = true;
};
