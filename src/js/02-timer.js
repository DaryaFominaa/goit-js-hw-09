// Описаний в документації
import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';

// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

const ref = {
  days: document.querySelector('.value[data-days]'),
  hours: document.querySelector('.value[data-hours]'),
  minutes: document.querySelector('.value[data-minutes]'),
  seconds: document.querySelector('.value[data-seconds]'),
  btn: document.querySelector('button[data-start]'),
};
const inputSelect = document.querySelector('#datetime-picker');

ref.btn.setAttribute('disabled', true);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    ref.btn.addEventListener('click', () => {
      const timer = {
        start() {
          const intervalId = setInterval(() => {
            const deltaTime = -(new Date() - selectedDates[0]);
            const { days, hours, minutes, seconds } = convertMs(deltaTime);
            // console.log('current', currentTime);
            //   console.log(`${days}:${hours}:${minutes}:${seconds}`);
              ref.days.textContent = days;
            ref.hours.textContent = hours;
            ref.minutes.textContent = minutes;
            ref.seconds.textContent = seconds;

            if (deltaTime < 1000) {
              clearInterval(intervalId);
            }
          }, 1000);
        },
      };

      timer.start();
    });

    if (selectedDates[0] - new Date() < 0) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      ref.btn.removeAttribute('disabled');
    }
  },
};

flatpickr(inputSelect, options);

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}
