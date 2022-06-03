import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const inputPicker = document.querySelector("#datetime-picker");
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};

const datePiker = flatpickr(inputPicker, options);
inputPicker.addEventListener("click", datePiker);