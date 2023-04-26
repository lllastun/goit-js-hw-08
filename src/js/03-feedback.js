import throttle from 'lodash.throttle';

const feedbackForm = document.querySelector('.feedback-form');
const emailEl = document.querySelector('input[name="email"]');
const messageEl = document.querySelector('textarea[name="message"]');
const submit = document.querySelector('textarea[name="message"]');
const keyObj = 'feedback-form-state';
const keyEmail = 'email';
const keyMessage = 'message';
const feedbackFormState = {};

const savedFeedbackForm = localStorage.getItem(keyObj);
if (savedFeedbackForm !== null) {
  const parsedObj = JSON.parse(savedFeedbackForm);
  emailEl.value = parsedObj[keyEmail];
  messageEl.value = parsedObj[keyMessage];
}

function updateWebStorage(feedbackFormState) {
  localStorage.setItem(keyObj, JSON.stringify(feedbackFormState));
}
const throttleUpdateWebStorage = throttle(updateWebStorage, 500);

function writeInputEmail(event) {
  feedbackFormState[keyEmail] = event.target.value;
  feedbackFormState[keyMessage] = messageEl.value;
}

function writeInputMessage(event) {
  feedbackFormState[keyMessage] = event.target.value;
  feedbackFormState[keyEmail] = emailEl.value;
}

feedbackForm.addEventListener('input', event => {
  if (event.target === emailEl) {
    writeInputEmail(event);
  } else {
    writeInputMessage(event);
  }
  throttleUpdateWebStorage(feedbackFormState);
});

feedbackForm.addEventListener('submit', event => {
  event.preventDefault();
  writeInputEmail(event);
  writeInputMessage(event);
  console.log(JSON.parse(localStorage.getItem(keyObj)));
  localStorage.removeItem(keyObj);
  feedbackForm.reset();
});
