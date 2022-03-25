const addOperator: {
  [key: string]: (a: number, b?: number, sum?: number) => number;
} = {
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
let temp = 0;

const calculate = (operator: string, ...arg: (string | number)[]) => {
  let result: number | [] = 0;
  let argResult = +arg[0];
  let count = 0;
  if (operator === 'calc') {
    while (arg.length > 3) {
      if (arg[count] === '*') {
        temp = addOperator[convertedOperator[arg[count]]](
          +arg[+count - 1],
          +arg[+count + 1],
        );
        arg.splice(+count - 1, +count, temp);
      }
      if (arg[count] === '/') {
        temp = addOperator[convertedOperator[arg[count]]](
          +arg[+count - 1],
          +arg[+count + 1],
        );
        arg.splice(+count - 1, +count, temp);
      }
      if (arg[count] === '-') {
        temp = addOperator[convertedOperator[arg[count]]](
          +arg[+count - 1],
          +arg[+count + 1],
        );
        arg.splice(+count - 1, +count, temp);
      }
      if (arg[count] === '+') {
        temp = addOperator[convertedOperator[arg[count]]](
          +arg[+count - 1],
          +arg[+count + 1],
        );
        arg.splice(+count - 1, +count, temp);
      }

      count++;
    }

    temp = addOperator[convertedOperator[arg[1]]](+arg[0], +arg[2]);
    arg.splice(+count - 1, +count, temp);
    result = temp;
  } else {
    argResult = 0;
    argResult = addOperator[operator](+arg[0], +arg[1]);
    result = argResult;
  }
  return result;
};

console.log(calculate('add', 1, 3)); // 4
console.log(calculate('sub', '3', 2)); // 1
console.log(calculate('mul', 6, '9')); // 54
console.log(calculate('div', '5', '4')); // 1
console.log(calculate('calc', 6, '-', 4, '*', 12, '/', 6, '+', 19)); // 17
