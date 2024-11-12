import { calculate } from './operations.js';

const buttons = document.querySelectorAll('.calculator button');
const display = document.getElementById('display');

// These are the Variables to store values
let firstOperand = '';
let secondOperand = '';
let currentOperator = null;
let shouldResetDisplay = false;

// Display functions
function clearDisplay() {
  display.textContent = '0';
  firstOperand = '';
  secondOperand = '';
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
  if (currentOperator === '/' && display.textContent === '0') {
    display.textContent = 'Error!';
    return;
  }
  secondOperand = parseFloat(display.textContent);
  display.textContent = roundResult(
    calculate(currentOperator, firstOperand, secondOperand)
  );
  currentOperator = null;
}

// Rounds results to fit with display limitations
function roundResult(number) {
  if (number.toString().length > 10) {
    return parseFloat(number).toExponential(5);
  }
  return Math.round(number * 1000) / 1000; // Rounds to 3 decimal places if within normal range
}

function appendPoint() {
  if (shouldResetDisplay) resetDisplay();
  if (!display.textContent.includes('.')) display.textContent += '.';
}

function deleteNumber() {
  display.textContent = display.textContent.slice(0, -1);
  if (display.textContent === '') display.textContent = '0';
}

// Button click events
buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const value = button.value;

    if (value >= '0' && value <= '9') {
      appendNumber(value);
    } else if (value === '.') {
      appendPoint();
    } else if (value === 'AC') {
      clearDisplay();
    } else if (value === 'C') {
      deleteNumber();
    } else if (value === '=') {
      evaluate();
    } else {
      setOperation(value);
    }
  });
});
