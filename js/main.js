import { calculate } from './operations.js';

const buttons = document.querySelectorAll('.calculator button');
const display = document.getElementById('display');

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const value = button.value;

    // TODO: Add the rest of the buttons and their functionality
    if (value === 'AC') {
      console.log('AC');
    } else if (value === 'C') {
      console.log('C');
    }
  });
});
