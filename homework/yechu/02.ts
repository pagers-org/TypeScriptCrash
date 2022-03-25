/*----------------- 01 calc ------------------*/
type Operator = 'add' | 'sub' | 'mul' | 'div' | 'calc';

function runCalc(args: [string | number]) {
  //함수 만들기
}
function calculate(
  operator: Operator,
  ...args: [string | number, number | string]
) {
  //if (args.length > 2) return runCalc(args);
  if (typeof args[0] === 'string') {
    args[0] = parseInt(args[0]);
  }
  if (typeof args[1] === 'string') {
    args[1] = parseInt(args[1]);
  }

  switch (operator) {
    case 'add':
      return +args[0] + +args[1];

    case 'sub':
      return +args[0] - +args[1];

    case 'mul':
      return +args[0] * +args[1];

    case 'div':
      return Math.floor(+args[0] / +args[1]);

    default:
      return;
  }
}

console.log(calculate('add', 1, 3)); // 4
console.log(calculate('sub', '3', 2)); // 1
console.log(calculate('mul', 6, '9')); // 54
console.log(calculate('div', '5', '4')); // 1
//console.log(calculate('calc', 6, '-', 4, '*', 12, '/', 6, '+', 19)); // 17

/*----------------- 02 control ------------------*/
type Category = 'game' | 'memory' | 'study';
type Game = 'start' | 'pause' | 'stop';
type Memory = {
  name: string;
  gender: 'female' | 'male';
  age: number;
  isStudent: boolean;
  hobby?: string[];
  doing?: object[];
};

const GAME = {
  START: '게임이 시작되었습니다!',
  PAUSE: '게임이 중지되었습니다!',
  STOP: '게임이 종료되었습니다!',
};

const studyArray: number[] = [];
let ageSuffix = '';

const studentState = (isStudent: boolean) => {
  if (isStudent) return `학생은 아니에요🤣`;
  return `학생은 아니에요🤣 `;
};
const genderState = (gender: string) => {
  if (gender === 'female') {
    ageSuffix = '이구';
    return `여성`;
  }
  ageSuffix = '살이예요!';
  return `남성`;
};
const hobbyState = (hobby: string[]) => {
  console.log(hobby, '허비');
  const result = hobby.reduce((prev, curr) => prev + ', ' + curr);
  return `취미는 ${result}에요!`;
};
const doingState = (doing: object[]) => {
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
    if (typeof action === 'object') {
      const result = `
      저의 이름은 ${action.name}, ${genderState(action.gender)}이고 
       ${action.age + ageSuffix} ${studentState(action.isStudent)} 
       ${action.hobby ? hobbyState(action.hobby) : ''} 
        ${action.doing ? doingState(action.doing) : ''}
          `;
      return result;
    }
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
