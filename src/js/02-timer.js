import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const start = document.querySelector("[data-start]");
start.disabled = true;

const daysField = document.querySelector("[data-days]");
const hoursField = document.querySelector("[data-hours]");
const minutesField = document.querySelector("[data-minutes]");
const secondsField = document.querySelector("[data-seconds]");
const inputPicker = document.querySelector("#datetime-picker");
const currentDate = new Date();
const options = {
  altInput: true,
  enableTime: true,
  time_24hr: true,
  defaultDate: currentDate,
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    if (selectedDate > currentDate) {
      start.disabled = false;
      console.log(selectedDate.getTime());
      inputPicker.dataset.time = selectedDate.getTime();
    } else {
      Notiflix.Notify.failure("Please choose a date in the future", {
    timeout: 1500,
  },);
    };

  },
};

const datePiker = flatpickr(inputPicker, options);
start.addEventListener("click", countdownTimer);

function countdownTimer() {
  const timeInMs = Number(inputPicker.dataset.time);
  let currentTime = currentDate.getTime();
  let timeLeft = timeInMs - currentTime;
  setInterval(() => {
    const convertedTime = convertMs(timeLeft);
    const { days, hours, minutes, seconds } = convertedTime;
    setTime(days, hours, minutes, seconds);
    currentTime = new Date().getTime();
    timeLeft = timeInMs - currentTime
  }, 1000);
}

function setTime(days, hours, minutes, seconds) {

  daysField.innerHTML = addLeadingZero(days);
  hoursField.innerHTML =   addLeadingZero(hours) ;
  minutesField.innerHTML = addLeadingZero(minutes) ;
  secondsField.innerHTML = addLeadingZero(seconds) ;
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return (value < 10) ?  value = "0" + value  :  value;
  };
