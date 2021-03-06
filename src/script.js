import './style.css';
import './index.html';

let inputBillValue = 0;
let inputTipRatio = 0;
let numberOfPeople = 0;
let tipPerPerson;
let amountPerPerson;

const totalPerson = document.querySelector('.total-person');
const tipPerson = document.querySelector('.tip-person');
const inputCustomValue = document.querySelector('#custom');
const inputRadioButtons = document.querySelectorAll('input[name="tip"]');
const inputNumberOfPeople = document.querySelector('#people');
const resetButton = document.querySelector('.reset');
const errorText = document.querySelector('.error-text');

function addGlobalListener(event, selector, cb) {
  document.addEventListener(event, e => {
    if (e.target.matches(selector)) cb(e);
  });
}
function getCustomTip(e) {
  inputTipRatio = +e.target.value * 0.01;
}
function getBill(e) {
  inputBillValue = +e.target.value;
}
function getPeople(e) {
  const regex = '^[1-9][0-9]*$';
  const inputValid = new RegExp(regex, 'g');
  if (e.target.value !== '') {
    if (!inputValid.test(`${e.target.value}`)) {
      inputNumberOfPeople.classList.add('error');
      errorText.classList.add('show');
    } else {
      inputNumberOfPeople.classList.remove('error');
      errorText.classList.remove('show');
    }

    numberOfPeople = +e.target.value;
  } else {
    inputNumberOfPeople.classList.remove('error');
    errorText.classList.remove('show');
  }
}
function setOutputCardValue() {
  if (numberOfPeople > 0) {
    tipPerPerson = (inputBillValue * inputTipRatio) / numberOfPeople;
    amountPerPerson = inputBillValue / numberOfPeople + tipPerPerson;
    totalPerson.innerText = `$${amountPerPerson.toFixed(2)}`;
    tipPerson.innerText = `$${tipPerPerson.toFixed(2)}`;
  }
}

addGlobalListener('click', "input[name='tip']", e => {
  inputTipRatio = +e.target.value * 0.01;
  inputCustomValue.value = '';
});
addGlobalListener('change', '#custom', getCustomTip);
addGlobalListener('keyup', '#custom', getCustomTip);
addGlobalListener('change', '#bill', getBill);
addGlobalListener('keyup', '#bill', getBill);
addGlobalListener('change', '#people', getPeople);
addGlobalListener('keyup', '#people', getPeople);
inputCustomValue.addEventListener('focus', () => {
  inputTipRatio = 0;
  inputRadioButtons.forEach(button => {
    button.checked = false;
  });
});
document.addEventListener('keyup', setOutputCardValue);
document.addEventListener('click', setOutputCardValue);
resetButton.addEventListener('click', () => {
  document.querySelectorAll('form').forEach(form => {
    form.reset();
  });
});
