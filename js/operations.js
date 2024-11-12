const add = (firstNumber, secondNumber) => firstNumber + secondNumber;

const substract = (firstNumber, secondNumber) => firstNumber - secondNumber;

const multiply = (firstNumber, secondNumber) => firstNumber * secondNumber;

const divide = (firstNumber, secondNumber) => {
  if (secondNumber === 0) {
    throw new Error('Cannot divide by 0.');
  }

  return firstNumber / secondNumber;
};

export function calculate(operator, firstNumber, secondNumber) {
  switch (operator) {
    case '+':
      return add(firstNumber, secondNumber);
    case '-':
      return substract(firstNumber, secondNumber);
    case '*':
      return multiply(firstNumber, secondNumber);
    case '/':
      return divide(firstNumber, secondNumber);

    default:
      throw new Error('Invalid operator');
  }
}
