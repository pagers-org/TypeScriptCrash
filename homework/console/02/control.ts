interface DoingInterface {
  category: string;
  content: string[];
}
interface MemoryInterface {
  name: string;
  gender: string;
  age: number;
  isStudent: boolean;
  doing?: DoingInterface[];
  hobby?: string[];
}
type ConvertedGender = { [key: string]: string };
type actionType = MemoryInterface | string | number;

const convertGender: ConvertedGender = {
  female: '여성',
  male: '남성',
};

const arr: number[] = [];
const control = (type: string, action: actionType) => {
  let gameStatus = '';
  let result: string | number[] = '';
  if (type === 'game') {
    switch (action) {
      case 'start':
        gameStatus = '게임이 시작되었습니다!';
        break;
      case 'pause':
        gameStatus = '게임이 중지 되었습니다!';
        break;
      case 'stop':
        gameStatus = '게임이 종료 되었습니다!';
        break;
    }
    result = gameStatus;
  }

  if (type === 'study') {
    if (action > 0) {
      !arr.includes(+action) && arr.push(+action);
    } else {
      !arr.includes(+action) && arr.pop();
    }
    result = arr;
  }

  if (
    type === 'memory' &&
    typeof action !== 'string' &&
    typeof action !== 'number'
  ) {
    result = `저의 이름은 ${action.name}, ${convertGender[action.gender]}이고 ${
      action.age
    }이에요! ${
      action.isStudent ? '학교에 다니고 있어요🤗' : '학생은 아니에요🤣'
    } ${
      action.doing
        ? '현재 하고 있는 일은 이래요!' + JSON.stringify(action.doing)
        : ''
    }`;
  }

  return result;
};

console.log(control('game', 'start')); // "게임이 시작되었습니다!"
console.log(control('game', 'pause')); // "게임이 중지되었습니다!"
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
);
console.log(
  control('memory', {
    name: 'evaw',
    gender: 'male',
    age: 17,
    isStudent: false,
  }),
);
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
