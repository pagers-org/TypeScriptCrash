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

type GameStatus = 'start' | 'pause' | 'stop';

const convertGender: ConvertedGender = {
  female: '여성',
  male: '남성',
};

const GAME_MESSAGE = {
  START: '게임이 시작되었습니다!',
  PAUSE: '게임이 중지되었습니다!',
  STOP: '게임이 종료되었습니다!',
};
type GameType = 'game' | 'study' | 'memory';
const arr: number[] = [];
const control = (type: GameType, action: actionType) => {
  let gameStatus = '';
  let result: string | number[] = '';

  if (type === 'game') {
    switch (action as GameStatus) {
      case 'start':
        gameStatus = GAME_MESSAGE.START;
        break;
      case 'pause':
        gameStatus = GAME_MESSAGE.PAUSE;
        break;
      case 'stop':
        gameStatus = GAME_MESSAGE.STOP;
        break;
    }
    result = gameStatus;
  }

  if (type === 'study') {
    const IS_POSITIVE_NUMBER = action > 0;
    const IN_STUDY = arr.includes(+action);
    const NOT_IN_STUDY = !IN_STUDY;

    if (IS_POSITIVE_NUMBER) {
      NOT_IN_STUDY && arr.push(+action);
    } else {
      NOT_IN_STUDY && arr.pop();
    }
    result = arr;
  }

  if (type === 'memory') {
    const memory = <MemoryInterface>action;
    result = `저의 이름은 ${memory.name}, ${convertGender[memory.gender]}이고 ${
      memory.age
    }이에요! ${
      memory.isStudent ? '학교에 다니고 있어요🤗' : '학생은 아니에요🤣'
    } ${
      memory.doing
        ? '현재 하고 있는 일은 이래요!' + JSON.stringify(memory.doing)
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
