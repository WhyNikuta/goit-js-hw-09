import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import { Notify } from 'notiflix/build/notiflix-notify-aio';

const inputEl = document.querySelector("#datetime-picker");

const elementDOM = {
    btnStartEl: document.querySelector('[data-start]'),
    dataDays: document.querySelector('[data-days]'),
    dataHours: document.querySelector('[data-hours]'),
    dataMinutes: document.querySelector('[data-minutes]'),
    dataSeconds: document.querySelector('[data-seconds]'),
}
const { btnStartEl, dataDays, dataHours, dataMinutes, dataSeconds } = elementDOM;

let timerId = null;
changeDisableBtn(btnStartEl, true);

const optionsFlatpickr = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0].getTime() < Date.now()) {
            return Notify.failure("Please choose a date in the future");
        }
        changeDisableBtn(btnStartEl, false);
    },
};

const flatPickrForm = flatpickr(inputEl, optionsFlatpickr);


function renderCounter() {
    const remainingTime = getRemainingTime(flatPickrForm.selectedDates[0].getTime())

    if (remainingTime < 1000) {
        clearInterval(timerId);
    }

    dataDays.textContent = addLeadingZero(convertMs(remainingTime).days);
    dataHours.textContent = addLeadingZero(convertMs(remainingTime).hours);
    dataMinutes.textContent = addLeadingZero(convertMs(remainingTime).minutes);
    dataSeconds.textContent = addLeadingZero(convertMs(remainingTime).seconds);
}

function getRemainingTime(selectedTime) {
    return selectedTime - Date.now();
}

function onTimerStart() {
    Notify.success("Let's go! 🚀 ");
    changeDisableBtn(btnStartEl, true);
    timerId = setInterval(renderCounter, 1000);
}

btnStartEl.addEventListener('click', onTimerStart);



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

function changeDisableBtn(btnElement, status) {
    btnElement.disabled = status;
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}