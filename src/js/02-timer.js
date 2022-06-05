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
      Notiflix.Notify.success('The selected date is correct. Press the "start" to countdown.');
      inputPicker.dataset.time = selectedDate.getTime();
    } else {
      Notiflix.Notify.failure("Please choose a date in the future", {
    timeout: 1500,
  },);
    };

  },
};

flatpickr(inputPicker, options);
start.addEventListener("click", countdownTimer);

function countdownTimer() {
  start.disabled = true;
  const timeInMs = Number(inputPicker.dataset.time);

  timer = setInterval(() => {
    let currentTime = new Date().getTime();
    let timeLeft = timeInMs - currentTime;
    const convertedTime = convertMs(timeLeft);
    const { days, hours, minutes, seconds } = convertedTime;
    setTime(days, hours, minutes, seconds);

    if (timeLeft < 1000) {
      clearInterval(timer);
      Notiflix.Notify.success("READY");
    };
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
