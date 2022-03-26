interface addOperatorInterface {
  [key: string]: (a: number, b?: number, sum?: number) => number;
}
type CalculateType = (string | number)[];

const addOperator: addOperatorInterface = {
  add: (a: number, b = 0) => a + b,
  sub: (a: number, b = 0) => a - b,
  mul: (a: number, b = 0) => a * b,
  div: (a: number, b = 0) => a / b,
};

const convertedOperator: { [key: string]: string } = {
  '*': 'mul',
  '/': 'div',
  '+': 'add',
  '-': 'sub',
};

const calculate = (operator: string, ...args: CalculateType): number => {
  let subSum = 0;
  let result: number | [] = 0;
  const calculateElem = [...args];
  let initialValue = +args[0];
  let count = 0;
  if (operator === 'calc') {
    while (calculateElem.length > 3) {
      if (calculateElem[count] === '*') {
        subSum = addOperator[convertedOperator[calculateElem[count]]](
          Number(calculateElem[count - 1]),
          Number(calculateElem[count + 1]),
        );
        calculateElem.splice(+count - 1, +count, subSum);
      }
      if (calculateElem[count] === '/') {
        subSum = addOperator[convertedOperator[calculateElem[count]]](
          Number(calculateElem[count - 1]),
          Number(calculateElem[count + 1]),
        );
        calculateElem.splice(count - 1, count, subSum);
      }
      if (calculateElem[count] === '-') {
        subSum = addOperator[convertedOperator[calculateElem[count]]](
          Number(calculateElem[count - 1]),
          Number(calculateElem[count + 1]),
        );
        calculateElem.splice(count - 1, count, subSum);
      }
      if (calculateElem[count] === '+') {
        subSum = addOperator[convertedOperator[calculateElem[count]]](
          Number(calculateElem[count - 1]),
          Number(calculateElem[count + 1]),
        );
        calculateElem.splice(count - 1, count, subSum);
      }

      count++;
    }

    subSum = addOperator[convertedOperator[calculateElem[1]]](
      Number(calculateElem[0]),
      Number(calculateElem[2]),
    );
    calculateElem.splice(count - 1, count, subSum);
    result = subSum;
    return ~~result;
  }

  initialValue = 0;
  initialValue = addOperator[operator](
    Number(calculateElem[0]),
    Number(calculateElem[1]),
  );
  result = initialValue;
  return ~~result;
};

console.log(calculate('add', 1, 3)); // 4
console.log(calculate('sub', '3', 2)); // 1
console.log(calculate('mul', 6, '9')); // 54
console.log(calculate('div', '5', '4')); // 1
console.log(calculate('calc', 6, '-', 4, '*', 12, '/', 6, '+', 19)); // 17
