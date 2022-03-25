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

type paramsType = MemoryInterface | string | number;

type GameStatus = 'start' | 'pause' | 'stop';

type Gender = 'female' | 'male';

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

type GameStatusType = 'start' | 'pause' | 'stop';

let arr: number[] = [];

const getGameStatus: { [key: string]: string } = {
  start: GAME_MESSAGE.START,
  pause: GAME_MESSAGE.PAUSE,
  stop: GAME_MESSAGE.STOP,
};

const control = (type: GameType, params: paramsType) => {
  let gameStatus = '';
  let result: string | number[] = '';

  if (type === 'game') {
    console.log(params);
    gameStatus = getGameStatus[(<string>params) as GameStatusType];
    result = gameStatus;
  }

  if (type === 'study') {
    const paramNumber = <number>params;
    const IS_POSITIVE_NUMBER = paramNumber > 0;
    const IN_STUDY = arr.includes(paramNumber);
    const NOT_IN_STUDY = !IN_STUDY;

    if (!NOT_IN_STUDY) return;
    if (IS_POSITIVE_NUMBER) {
      arr.push(+paramNumber);
    } else {
      arr = arr.filter(item => item !== Math.abs(paramNumber));
      return arr;
    }
    result = arr;
  }

  if (type === 'memory') {
    const memory = <MemoryInterface>params;

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
