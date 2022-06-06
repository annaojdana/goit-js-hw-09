import Notiflix from 'notiflix';

const form = document.querySelector(".form");

form.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  const {
    elements: { delay, step, amount }
  } = event.currentTarget;
  let delayTotal = Number(delay.value);
  if (delay.value >= 0 && step.value >= 0 && amount.value > 0) {
    createPromise(1, delay.value)
    .then(({ position, delay }) => {
   Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
    .catch(({ position, delay }) => {
    Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  });
    for (let i = 2; i <= amount.value; i++) {
      delayTotal += Number(step.value);
      createPromise(i, delayTotal)
      .then(({ position, delay }) => {
   Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  });
  }
  }
  else {
    Notiflix.Notify.failure(`❌ select values ​​above 0 `);
  }
  event.currentTarget.reset();
}; 


function createPromise(position, delay) {
  return new Promise((resolve, reject) =>
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        // Fulfill
        resolve({position,delay});
      } else {
        // Reject
        reject({position,delay});
      }
    }, delay))
}
