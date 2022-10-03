import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formObj = {
  formEl: document.querySelector(".form"),
  firstDelay: document.querySelector("[name='delay']"),
  stepDelay: document.querySelector("[name='step']"),
  amount: document.querySelector("[name='amount']"),
}

const { formEl, firstDelay, stepDelay, amount } = formObj;

function createPromise(position, delay) {

  const shouldResolve = Math.random() > 0.3;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      }
      reject({ position, delay });
    }, delay);
  })

  return promise;
}

function onFormSubmit(e) {
  e.preventDefault();

  let FIRST_DELAY = Number(firstDelay.value);
  const STEP_DELAY = Number(stepDelay.value);

  for (let i = 0; i < amount.value; i++) {
    createPromise(i, FIRST_DELAY).then(({ position, delay }) => {
      Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });

    FIRST_DELAY += STEP_DELAY;
  }
  e.currentTarget.reset();
}

formEl.addEventListener('submit', onFormSubmit);