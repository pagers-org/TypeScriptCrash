type CalculateType = 'add' | 'sub' | 'mul' | 'div' | 'calc';

function calculate(type: CalculateType, ...value: Array<number | string>) {
  let result: string | number = 0;
  switch (type) {
    case 'add':
      result = value.reduce((a, b) => {
        return Number(a) + Number(b);
      });
      break;
    case 'sub':
      result = value.reduce((a, b) => {
        return Number(a) - Number(b);
      });
      break;
    case 'mul':
      result = value.reduce((a, b) => {
        return Number(a) * Number(b);
      });
      break;
    case 'div':
      result = value.reduce((a, b) => {
        return Number(a) / Number(b);
      });
      result = Math.round(Number(result));
      break;
    case 'calc':
      break;
  }

  return result;
}

console.log(calculate('add', 1, 3)); // 4
console.log(calculate('sub', '3', 2)); // 1
console.log(calculate('mul', 6, '9')); // 54
console.log(calculate('div', '5', '4')); // 1
// console.log(calculate('calc', 6, '-', 4, '*', 12, '/', 6, '+', 19)); // 17