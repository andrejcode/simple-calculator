import { calculate } from './operations.js';

const buttons = document.querySelectorAll('.calculator button');
const display = document.getElementById('display');

let firstOperand = '';
let currentOperator = null;
let shouldResetDisplay = false;

function clearDisplay() {
  display.textContent = '0';
  firstOperand = '';
  currentOperator = null;
  shouldResetDisplay = false;
}

function appendNumber(number) {
  if (display.textContent === '0' || shouldResetDisplay) {
    display.textContent = number;
    shouldResetDisplay = false;
  } else {
    display.textContent += number;
  }
}

function setOperation(operator) {
  if (currentOperator !== null) evaluate();
  firstOperand = parseFloat(display.textContent);
  currentOperator = operator;
  shouldResetDisplay = true;
}

function evaluate() {
  if (currentOperator === null || shouldResetDisplay) return;

  const secondOperand = parseFloat(display.textContent);
  try {
    const result = calculate(currentOperator, firstOperand, secondOperand);
    display.textContent = formatResult(result);
    currentOperator = null;
    shouldResetDisplay = true;
  } catch (error) {
    display.textContent = error.message;
  }
}

function formatResult(result) {
  if (Math.abs(result) >= 1e9 || Math.abs(result) < 1e-9) {
    return result.toExponential(9);
  } else {
    return `${Math.round(result * 1e9) / 1e9}`;
  }
}

function appendPoint() {
  if (shouldResetDisplay) resetDisplay();
  if (!display.textContent.includes('.')) display.textContent += '.';
}

function deleteNumber() {
  display.textContent = display.textContent.slice(0, -1);
  if (display.textContent === '') display.textContent = '0';
}

function handleInput(value) {
  if (isNumber(value)) {
    appendNumber(value);
  } else if (value === '.') {
    appendPoint();
  } else if (value === 'AC') {
    clearDisplay();
  } else if (value === 'C') {
    deleteNumber();
  } else if (value === '=') {
    evaluate();
  } else if (isOperator(value)) {
    setOperation(value);
  }
}

function isNumber(value) {
  return value >= '0' && value <= '9';
}

function isOperator(value) {
  return ['+', '-', '*', '/'].includes(value);
}

buttons.forEach((button) => {
  button.addEventListener('click', () => handleInput(button.value));
});

document.onkeydown = (event) => {
  const validKeys = /^[\d+\-*/=]$/;
  if (validKeys.test(event.key)) {
    handleInput(event.key);
  } else if (event.key === 'Delete') {
    handleInput('AC');
  } else if (event.key === 'Backspace') {
    handleInput('C');
  } else if (event.key === 'Enter') {
    handleInput('=');
  }
};
