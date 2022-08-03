import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';
const inputs = ['email', 'message'];

const refs = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('.feedback-form input'),
  message: document.querySelector('.feedback-form textarea'),
};

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onFormInput, 500));

function onFormInput(event) {
  // formData[event.target.name] = event.target.value;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(getFormData()));
}

populateFormData();

function onFormSubmit(event) {
  event.preventDefault();
  const {
    elements: { email, message },
  } = event.target;

  if (email.value === '' || message.value === '') {
    return alert('Please, fill all the fields!');
  }

  console.log(getFormData());

  event.target.reset();

  localStorage.removeItem(STORAGE_KEY);
}

function populateFormData() {
  const savedMessage = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (savedMessage) {
    refs.email.value = savedMessage.email;
    refs.message.value = savedMessage.message;
  }
}

function getFormData() {
  const result = {};
  inputs.forEach(input => {
    result[input] = refs[input].value;
  });

  return result;
}
