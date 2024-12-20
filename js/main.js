import { calculate } from './operations.js';

const buttons = document.querySelectorAll('.calculator button');
const display = document.getElementById('display');
const errorSensitiveButtons = document.querySelectorAll('.disable-on-error');

let firstOperand = '';
let currentOperator = null;
let shouldResetDisplay = false;

function resetCalculator() {
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
  toggleOperationButton(operator, true);
}

function evaluate() {
  if (currentOperator === null || shouldResetDisplay) return;

  const secondOperand = parseFloat(display.textContent);
  try {
    const result = calculate(currentOperator, firstOperand, secondOperand);
    display.textContent = formatResult(result);
  } catch (error) {
    display.textContent = error.message;
    toggleErrorSensitiveButtons(true);
  } finally {
    shouldResetDisplay = true;
    currentOperator = null;
  }
}

function appendPoint() {
  if (shouldResetDisplay) resetCalculator();
  if (!display.textContent.includes('.')) display.textContent += '.';
}

function deleteNumber() {
  display.textContent =
    display.textContent.length > 1 ? display.textContent.slice(0, -1) : '0';

  if (display.textContent === '-') {
    display.textContent = '0';
  }
}

function toggleOperandSign() {
  const value = display.textContent;
  if (value === '0') return;
  display.textContent = Number(value) > 0 ? `-${value}` : value.slice(1);
}

function toggleErrorSensitiveButtons(disabled) {
  errorSensitiveButtons.forEach((button) => {
    button.disabled = disabled;
  });
}

function toggleOperationButton(buttonValue, isSelected) {
  const button = document.querySelector(`button[value="${buttonValue}"]`);
  if (button) {
    button.classList.toggle('selected', isSelected);
  }
}

function isNumber(value) {
  return value >= '0' && value <= '9';
}

function isOperator(value) {
  return ['+', '-', '*', '/'].includes(value);
}

// Extremely large or small numbers are displayed in scientific notation to maintain readability.
// Moderately sized numbers are rounded to a maximum of 9 decimal places for precision and clarity.
function formatResult(result) {
  if (result !== 0 && (Math.abs(result) >= 1e9 || Math.abs(result) < 1e-9)) {
    return result.toExponential(9);
  } else {
    return `${Math.round(result * 1e9) / 1e9}`;
  }
}

function handleInput(value) {
  if (currentOperator !== null) {
    toggleOperationButton(currentOperator, false);
  }

  if (isNumber(value)) {
    appendNumber(value);
    toggleErrorSensitiveButtons(false);
  } else if (value === '.') {
    appendPoint();
    toggleErrorSensitiveButtons(false);
  } else if (value === '±') {
    toggleOperandSign();
  } else if (value === 'AC' || value === 'Delete') {
    resetCalculator();
    toggleErrorSensitiveButtons(false);
  } else if (value === 'Backspace') {
    deleteNumber();
    toggleErrorSensitiveButtons(false);
  } else if (value === '=' || value === 'Enter') {
    evaluate();
  } else if (isOperator(value)) {
    setOperation(value);
  }
}

buttons.forEach((button) => {
  button.addEventListener('click', () => handleInput(button.value));
});

document.onkeydown = (event) => handleInput(event.key);
