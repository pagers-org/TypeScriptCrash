/*----------------- 01 calc ------------------*/
type Operator = 'add' | 'sub' | 'mul' | 'div' | 'calc';
type OpertorShorthand = '*' | '/';
type ArgType = Array<string | number>;
type Result = number | undefined;

function runCalc(args: ArgType): Result {
  let result: Result;
  let idx = 0;

  function isOepratorExist(operator: OpertorShorthand) {
    if (args.includes(operator)) return true;
    return false;
  }

  while (args.length > 1) {
    if (isOepratorExist('*')) {
      idx = args.findIndex(elem => elem === '*');
      result = calculate('mul', args[idx - 1], args[idx + 1]) as number;
      args.splice(idx - 1, 3, result);
      idx = 0;
    }

    if (isOepratorExist('/')) {
      idx = args.findIndex(elem => elem === '/');
      result = calculate('div', args[idx - 1], args[idx + 1]) as number;
      args.splice(idx - 1, 3, result);
      idx = 0;
    }
    if (args[idx] === '+') {
      result = calculate('add', args[idx - 1], args[idx + 1]) as number;
      args.splice(idx - 1, 3, result);
      idx--;
    }

    if (args[idx] === '-') {
      result = calculate('sub', args[idx - 1], args[idx + 1]) as number;
      args.splice(idx - 1, 3, result);
      idx--;
    }

    idx++;
  }
  return result;
}

function calculate(operator: Operator, ...args: ArgType): Result {
  if (args.length > 2) return runCalc(args);

  console.log(typeof args[0]);

  switch (operator) {
    case 'add':
      return +args[0] + +args[1];

    case 'sub':
      return +args[0] - +args[1];

    case 'mul':
      return +args[0] * +args[1];

    case 'div':
      return Math.trunc(+args[0] / +args[1]);

    default:
      console.log(`args: ${args}, operator:${operator}`);
  }
}

console.log(calculate('add', 1, 3)); // 4
console.log(calculate('sub', '3', 2)); // 1
console.log(calculate('mul', 6, '9')); // 54
console.log(calculate('div', '5', '4')); // 1
console.log(calculate('calc', 6, '-', 4, '*', 12, '/', 6, '+', 19)); // 17

/*----------------- 02 control ------------------*/
type Category = 'game' | 'memory' | 'study';
type Game = 'start' | 'pause' | 'stop';
type Gender = 'female' | 'male';
type Memory = {
  name: string;
  gender: Gender;
  age: number;
  isStudent: boolean;
  hobby?: Array<string>;
  doing?: Array<object>;
};

const GAME = {
  START: '게임이 시작되었습니다!',
  PAUSE: '게임이 중지되었습니다!',
  STOP: '게임이 종료되었습니다!',
};

const studyArray: Array<number> = [];

const studentState = (isStudent: boolean) => {
  if (isStudent) return `학교에 다니고 있어요🤗`;
  return `학생은 아니에요🤣 `;
};
const genderState = (gender: Gender) => {
  if (gender === 'female') {
    return `여성`;
  }
  return `남성`;
};
const genderSuffix = (gender: Gender) => {
  if (gender === 'female') {
    return '이구';
  }
  return '살이예요!';
};
const hobbyState = (hobby: Array<string>) => {
  const result = hobby.reduce((prev, curr) => prev + ', ' + curr);
  return `취미는 ${result}에요!`;
};
const doingState = (doing: Array<object>) => {
  return `현재 하고 있는 일은 이래요!\
  ${JSON.stringify(doing)}`;
};

function control(category: Category, action: Game | number | Memory) {
  if (category === 'game') {
    switch (action) {
      case 'start':
        console.log(GAME.START);
        break;
      case 'pause':
        console.log(GAME.PAUSE);
        break;
      case 'stop':
        console.log(GAME.STOP);
    }
  }

  if (category === 'study') {
    if (typeof action === 'number') {
      const absNum: number = Math.abs(action);

      if (action > 0) {
        if (studyArray.includes(absNum)) return;
        studyArray.push(action);
      } else {
        if (!studyArray.includes(absNum)) return;
        studyArray.pop();
      }
      return studyArray;
    }
  }

  if (category === 'memory') {
    const person = <Memory>action;
    const result = `
      저의 이름은 ${person.name}, ${genderState(person.gender)}이고 
      ${person.age + genderSuffix(person.gender)} 
      ${studentState(person.isStudent)} 
      ${person.hobby ? hobbyState(person.hobby) : ''} 
      ${person.doing ? doingState(person.doing) : ''}
      `;
    return result;
  }
}

console.log(control('game', 'start')); // "게임이 시작되었습니다!"
console.log(control('game', 'pause')); // "게임이 중지되었습니다!"
console.log(control('game', 'stop')); // "게임이 종료되었습니다!"
console.log(control('study', +1)); // [1]
console.log(control('study', +2)); // [1,2]
console.log(control('study', -2)); // [1]
// => 내용 추가(2022.03.24) : '동일한 원소가 없으면' +인 경우 push, '동일한 원소가 있으면' -인 경우 pop
// =>                        '동일한 원소가 있으면' +인 경우 무시, '동일한 원소가 없으면' -인 경우 무시

console.log(
  control('memory', {
    name: 'yuri',
    gender: 'female',
    age: 13,
    isStudent: true,
    hobby: ['swimming', 'movie'],
  }),
); // 저의 이름은 wave, 여성이고 13살이구 학교에 다니고 있어요🤗 취미는 swimming, movie에요!
console.log(
  control('memory', {
    name: 'evaw',
    gender: 'male',
    age: 17,
    isStudent: false,
  }),
); // 저의 이름은 evaw, 남성이고 17살이에요! 학생은 아니에요🤣
console.log(
  control('memory', {
    name: 'mark',
    gender: 'male',
    age: 42,
    isStudent: false,
    doing: [
      {
        category: '회사일',
        content: ['상담', '스프린트 진행하기'],
      },
      {
        category: '집안일',
        content: ['청소', '쓰레기 비우기'],
      },
    ],
  }),
);

// 저의 이름은 mark, 남성이고 42살이에요! 학생은 아니에요🤣 현재 하고 있는 일은 이래요!
// [
//  { category: '회사일', content: ['상담', '스프린트 진행하기'] },
//  { category: '집안일', content: ['청소', '쓰레기 비우기'], },
//]
