const calculate = (operator, prevNumber, currentNumber) => {
  let result = 0;
  switch (operator) {
    case 'add':
      result = +prevNumber + +currentNumber;
      break;
    case 'sub':
      result = +prevNumber - +currentNumber;
      break;
    case 'mul':
      result = +prevNumber * +currentNumber;
      break;
    case 'div':
      result = +prevNumber % +currentNumber;
      break;
    case 'calc':
      result = 0;
      break;
  }
  return result;
};

export default calculate;
