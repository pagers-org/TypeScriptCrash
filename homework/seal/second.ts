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

저의 이름은 mark, 남성이고 42살이에요! 학생은 아니에요🤣 현재 하고 있는 일은 이래요!
[
 { category: '회사일', content: ['상담', '스프린트 진행하기'] },
 { category: '집안일', content: ['청소', '쓰레기 비우기'], },
]

function calculate(operation: string, ...numbers: (number | string)[]): number {
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
      calc(numbers);
      return 0;
    }
    default:
      return 0;
  }
}

interface foo {
  name: string;
  gender: string;
  age: number;
  isStudent: boolean;
  hobby?: string[];
  doing?: {
    category: string;
    content: string[];
  }[];
}

function control(
  type: string,
  purpose: string | number | foo,
): string | number[] {
  switch (type) {
    case 'game': {
      if (purpose === 'start') return '게임이 시작되었습니다!';
      else if (purpose === 'pause') return '게임이 중단되었습니다!';
      else if (purpose === 'stop') return '게임이 종료되었습니다!';
      return '';
    }
    case 'study': {
      if (purpose > 0) study.push(Number(purpose));
      else {
        const index = study.findIndex(
          (value: number) => value === Number(purpose),
        );
        study.splice(index, 1);
      }
      return study;
    }
    case 'memory': {
      const { name, gender, age, isStudent, hobby, doing } = purpose as foo;
      const bar = `저의 이름은 ${name}, ${getGender(
        gender,
      )}이고 ${age}살이에요! ${getIsStudent(isStudent)} ${getHobby(
        hobby,
      )} ${getDoing(doing)}`;
      return bar;
    }
    default:
      return [];
  }
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

function getDoing(
  doing:
    | {
        category: string;
        content: string[];
      }[]
    | undefined,
) {
  return doing ? `현재 하고 있는 일은 이래요! \n ${JSON.stringify(doing)}` : '';
}

function calc(arr: (number | string)[]) {
  return 0;
}

// 정해진 시간에 만난다. 개발할 수 있게 해준다.(the goal) -> ()
