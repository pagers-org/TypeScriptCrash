type CalculateType = 'add' | 'sub' | 'mul' | 'div' | 'calc';

const excuteType = {
  add: (a: number, b: number) => a + b,
  sub: (a: number, b: number) => a - b,
  mul: (a: number, b: number) => a * b,
  div: (a: number, b: number) => ~~(a / b)
};

function calculate(type: CalculateType, ...value: Array<number | string>) {
  if (type === 'add' || type === 'sub' || type === 'mul' || type === 'div') {
    const result = value.reduce((a, b) => {
      return excuteType[type](Number(a), Number(b));
    });
    return result;

  } else {
    let calArray = [...value];
    let result = 0;
    let count = 1;

    const mulDivCnt = calArray.filter((element) => {
      return element === '*' || element === '/' ? true : false;
    }).length;
    const addSubCnt = calArray.filter((element) => {
      return element === '+' || element === '-' ? true : false;
    }).length;

    //TODO 더 깔끔하게 할 수 없을까?
    while (count < calArray.length) {
      let cnt = 0;
      if (calArray[count] === '*') {
        result = excuteType['mul'](
          Number(calArray[count - 1]),
          Number(calArray[count + 1])
        );
        calArray.splice(count - 1, 3, result);
        cnt++;
      }
      if (calArray[count] === '/') {
        result = excuteType['div'](
          Number(calArray[count - 1]),
          Number(calArray[count + 1])
        );
        calArray.splice(count - 1, 3, result);
        cnt++;
      }
      if (cnt === mulDivCnt) break;
      else count++;
    }

    count = 0;
    while (count < calArray.length) {
      let cnt = 0;
      if (calArray[count] === '-') {
        result = excuteType['sub'](
          Number(calArray[count - 1]),
          Number(calArray[count + 1])
        );
        calArray.splice(count - 1, 3, result);
        cnt++;
      }
      if (calArray[count] === '+') {
        result = excuteType['add'](
          Number(calArray[count - 1]),
          Number(calArray[count + 1])
        );
        calArray.splice(count - 1, 3, result);
        cnt++;
      }
      if (cnt === addSubCnt) break;
      else count++;
    }
    return result;
  }
}

console.log(calculate('add', 1, 3)); // 4
console.log(calculate('sub', '3', 2)); // 1
console.log(calculate('mul', 6, '9')); // 54
console.log(calculate('div', '5', '4')); // 1
console.log(calculate('calc', 6, '-', 4, '*', 12, '/', 6, '+', 19)); // 17