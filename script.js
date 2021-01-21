const resultElement = document.querySelector('#result');
const lengthElement = document.querySelector('#length');
const uppercaseElement = document.querySelector('#uppercase');
const lowercaseElement = document.querySelector('#lowercase');
const numbersElement = document.querySelector('#numbers');
const symbolsElement = document.querySelector('#symbols');
const generateButton = document.querySelector('#generate');
const clipboardButton = document.querySelector('#clipboard');

const getRandomLower = () => {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
};

const getRandomUpper = () => {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
};

const getRandomNumber = () => {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
};

const getRandomSymbol = () => {
  const symbols = '!@#$%^&*(){}[]=<>/,.';
  return symbols[Math.floor(Math.random() * symbols.length)];
};

clipboardButton.addEventListener('click', () => {
  console.log('click');
  const textarea = document.createElement('textarea');
  const password = resultElement.innerText;
  if (!password || password === 'Please, check a box') {
    return '';
  }

  textarea.value = password;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  textarea.remove();
});

const randomFunction = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol,
};

function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

const generatePassword = (upper, lower, number, symbol, length) => {
  let generatedPassword = '';
  const checkedCount = upper + lower + number + symbol;

  const typesArray = [{ upper }, { lower }, { number }, { symbol }].filter(
    (item) => Object.values(item)[0]
  );

  if (checkedCount === 0) {
    result.style.color = 'rgb(168, 38, 38)';
    return (resultElement.innerText = 'Please, check a box');
  }

  for (let i = 0; i < length; i += checkedCount) {
    typesArray.forEach((type) => {
      const funcName = Object.keys(type)[0];
      generatedPassword += randomFunction[funcName]();
    });
  }

  const finalPassword = generatedPassword.slice(0, length);
  return finalPassword;
};

generateButton.addEventListener('click', () => {
  const length = +lengthElement.value;
  const hasLower = lowercaseElement.checked;
  const hasUpper = uppercaseElement.checked;
  const hasNumber = numbersElement.checked;
  const hasSymbol = symbolsElement.checked;

  result.style.color = '#fff';
  resultElement.innerText = generatePassword(
    hasUpper,
    hasLower,
    hasNumber,
    hasSymbol,
    length
  );
});
