type AloneCalculateType = 'add' | 'sub' | 'mul' | 'div';
type CalculateType = 'add' | 'sub' | 'mul' | 'div' | 'calc';

const excuteType = {
  add: (a: number, b: number) => a + b,
  sub: (a: number, b: number) => a - b,
  mul: (a: number, b: number) => a * b,
  div: (a: number, b: number) => ~~(a / b),
  calc: (a: number, b: number) => a + b
};

function calculate(type: CalculateType, ...value: Array<number | string>) {
  const calType = <AloneCalculateType>type;
  if (calType) {
    const result = value.reduce((a, b) => {
      return excuteType[type](Number(a), Number(b));
    });
    return result;
  } else {
    //TODO calc 타입일 때...
    return '';
  }
}

console.log(calculate('add', 1, 3)); // 4
console.log(calculate('sub', '3', 2)); // 1
console.log(calculate('mul', 6, '9')); // 54
console.log(calculate('div', '5', '4')); // 1
// console.log(calculate('calc', 6, '-', 4, '*', 12, '/', 6, '+', 19)); // 17