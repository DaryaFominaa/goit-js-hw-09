import Notiflix from 'notiflix';
// console.log(Notiflix)

const form = document.querySelector('.form')
form.addEventListener('submit', onSubmit);

// console.log(form)

function onSubmit(evt) {
  evt.preventDefault();
  const delay = evt.currentTarget.delay.value;
  const step = evt.currentTarget.step.value;
   const amount = evt.currentTarget.amount.value;


}




function createPromise(position, delay) {

  setTimeout(() => {
    if (isSuccess) {
      resolve("Success! Value passed to resolve function");
    } else {
      reject("Error! Error passed to reject function");
    }
  }, 2000);
};




createPromise(2, 1500)
  .then(({ position, delay }) => {
    Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
  Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  });