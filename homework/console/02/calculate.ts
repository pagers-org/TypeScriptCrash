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

  if (operator === 'calc') {
    for (const i in arg) {
      if (typeof arg[i] === 'string') {
        if (arg[i] === '*') {
          temp = addOperator[convertedOperator[arg[i]]](
            +arg[+i - 1],
            +arg[+i + 1],
          );
          arg.splice(+i - 1, +i, temp);
        }
        if (arg[i] === '/') {
          temp = addOperator[convertedOperator[arg[i]]](
            +arg[+i - 1],
            +arg[+i + 1],
          );
          arg.splice(+i - 1, +i, temp);
        }
        if (arg[i] === '-') {
          temp = addOperator[convertedOperator[arg[i]]](
            +arg[+i - 1],
            +arg[+i + 1],
          );
          arg.splice(+i - 1, +i, temp);
        }
        if (arg[i] === '+') {
          temp = addOperator[convertedOperator[arg[i]]](
            +arg[+i - 1],
            +arg[+i + 1],
          );
          arg.splice(+i - 1, +i, temp);
        }
      }
    }

    result = argResult;
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
