const study: number[] = [];

console.log(calculate('add', 1, 3)); // 4
console.log(calculate('sub', '3', 2)); // 1
console.log(calculate('mul', 6, '9')); // 54
console.log(calculate('div', '5', '4')); // 1
console.log(calculate('calc', 6, '-', 4, '*', 12, '/', 6, '+', 19)); // 17

console.log(control('game', 'start')); // "게임이 시작되었습니다!"
console.log(control('game', 'pause')); // "게임이 시작되었습니다!"
console.log(control('game', 'stop')); // "게임이 종료되었습니다!"

console.log(control('study', +1)); // [1]
console.log(control('study', +2)); // [1,2]
console.log(control('study', -2)); // [1]

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
// ]

type Numbers = (number | string)[];

function calculate(operation: string, ...numbers: Numbers): number {
  switch (operation) {
    case '+':
    case 'add': {
      return Number(numbers[0]) + Number(numbers[1]);
    }
    case '-':
    case 'sub': {
      return Number(numbers[0]) - Number(numbers[1]);
    }
    case '*':
    case 'mul': {
      return Number(numbers[0]) * Number(numbers[1]);
    }
    case '/':
    case 'div': {
      return Math.trunc(Number(numbers[0]) / Number(numbers[1]));
    }
    case 'calc': {
      return 사칙연산(numbers);
    }
    default:
      return 0;
  }
}

interface Memory {
  name: string;
  gender: string;
  age: number;
  isStudent: boolean;
  hobby?: string[];
  doing?: Doing[];
}

interface Doing {
  category: string;
  content: string[];
}

function control(
  type: string,
  purpose: string | number | Memory,
): string | number[] {
  switch (type) {
    case 'game': {
      return getGame(purpose as string);
    }
    case 'study': {
      getStudy(purpose as number);
      return study;
    }
    case 'memory': {
      return getMemory(purpose as Memory);
    }
    default:
      return [];
  }
}

function getGame(purpose: string) {
  if (purpose === 'start') return '게임이 시작되었습니다!';
  else if (purpose === 'pause') return '게임이 중단되었습니다!';
  else if (purpose === 'stop') return '게임이 종료되었습니다!';
  return '';
}

function getStudy(purpose: number) {
  if (purpose > 0) study.push(Number(purpose));
  else {
    const index = study.findIndex((value: number) => value === Number(purpose));
    study.splice(index, 1);
  }
}

function getMemory(purpose: Memory) {
  const { name, gender, age, isStudent, hobby, doing } = purpose;
  const bar = `저의 이름은 ${name}, ${getGender(
    gender,
  )}이고 ${age}살이에요! ${getIsStudent(isStudent)} ${getHobby(
    hobby,
  )} ${getDoing(doing)}`;

  return bar;
}

function getGender(gender: string) {
  return gender === 'female' ? '여성' : '남성';
}

function getIsStudent(isStudent: boolean) {
  return isStudent ? '학교에 다니고 있어요🤗' : '학생은 아니에요🤣';
}

function getHobby(hobby: string[] | undefined) {
  return hobby ? `취미는 ${hobby.join(', ')}에요!` : '';
}

function getDoing(doing: Doing[] | undefined) {
  return doing ? `현재 하고 있는 일은 이래요! \n ${JSON.stringify(doing)}` : '';
}

function 사칙연산(arr: Numbers) {
  const { numbers, operators } = getMultiplyDividePriorityCalculation(arr);
  const result = getAddSubtractCalculation(numbers, operators);

  return result;
}

function getMultiplyDividePriorityCalculation(arr: Numbers) {
  const numbers = [arr[0]];
  const operators: string[] = [];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] === '*' || arr[i] === '/') {
      const left = numbers.pop() as string;
      const result = calculate(arr[i] as string, left, arr[i + 1]);
      numbers.push(result);
      i++;
    } else if (arr[i] === '+' || arr[i] === '-') {
      operators.push(arr[i] as string);
    } else {
      numbers.push(arr[i]);
    }
  }

  return { numbers, operators };
}

function getAddSubtractCalculation(numbers: Numbers, operators: string[]) {
  let total = 0;

  for (let i = 1; i < numbers.length; i++) {
    const left = i === 1 ? numbers[0] : total;
    const operator = operators.shift();
    const result = calculate(operator as string, left, numbers[i] as number);
    total = result;
  }

  return total;
}

// 정해진 시간에 만난다. 개발할 수 있게 해준다.(the goal) -> ()
