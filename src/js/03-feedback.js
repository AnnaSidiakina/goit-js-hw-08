import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';
let formData = {
  email: '',
  message: '',
};

const refs = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('.feedback-form input'),
  textarea: document.querySelector('.feedback-form textarea'),
};

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onFormInput, 500));

function onFormInput(event) {
  formData[event.target.name] = event.target.value;

  localStorage.setItem('STORAGE_KEY', JSON.stringify(formData));
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
  // formData = {
  //   email: email.value,
  //   message: message.value,
  // };
  // formData[event.target.name] = event.target.value;
  console.log(formData);

  formData.email = '';
  formData.message = '';

  event.target.reset();

  localStorage.removeItem('STORAGE_KEY');
}

function populateFormData() {
  const savedMessage = JSON.parse(localStorage.getItem('STORAGE_KEY'));
  if (savedMessage === null) {
    return;
  }
  refs.email.value = savedMessage.email || '';
  refs.textarea.value = savedMessage.message || '';
}
