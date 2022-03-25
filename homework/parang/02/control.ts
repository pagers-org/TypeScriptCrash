type ControlCommand = 'game' | 'study' | 'memory';
type GameStatusProps = 'start' | 'pause' | 'stop';
type Gender = 'female' | 'male';

type TaskProps = {
  category: string;
  content: string[];
};

type MemoryProps = {
  name: string;
  gender: Gender;
  age: number;
  isStudent: boolean;
  hobby?: string[];
  doing?: TaskProps[];
};

type InputProps = GameStatusProps | number | MemoryProps;
type ReturnProps = string | number[];

const gameStatus = {
  start: '게임이 시작되었습니다!',
  pause: '게임이 중지되었습니다!',
  stop: '게임이 종료되었습니다!',
};

const controlCenter = () => {
  let gameState: GameStatusProps = 'pause';
  let stack: number[] = [];

  return (command: ControlCommand, params: InputProps): ReturnProps => {
    if (command === 'game' && typeof params === 'string') {
      gameState = params as GameStatusProps;
      return gameStatus[gameState];
    }

    if (command === 'study' && typeof params === 'number') {
      const absNumber = Math.abs(params);
      const isInclude = stack.includes(absNumber);

      if (!isInclude && params > 0) stack.push(absNumber);
      if (isInclude && params < 0)
        stack = stack.filter(stackNumber => stackNumber !== absNumber);

      return stack;
    }

    if (command === 'memory' && typeof params === 'object') {
      const { name, gender, age, isStudent, hobby, doing } = params;
      let information = `저의 이름은 ${name}, ${
        gender === 'female' ? '여성' : '남성'
      }이고 ${age}살이${
        isStudent ? `구 학교에 다니고 있어요🤗 ` : `에요! 학생은 아니에요🤣`
      }`;

      if (hobby !== undefined)
        information += ` 취미는 ${hobby.join(', ')}에요!`;

      if (doing !== undefined)
        information += ` 하고 있는 일은 이래요!\n${JSON.stringify(
          doing,
          null,
          2,
        )}`;

      return information;
    }

    return '에러!👿';
  };
};

const control = controlCenter();
console.log(control('game', 'start')); // "게임이 시작되었습니다!"
console.log(control('game', 'pause')); // "게임이 중지되었습니다!"
console.log(control('game', 'stop')); // "게임이 종료되었습니다!"
console.log(control('study', +1)); // [1]
console.log(control('study', +2)); // [1,2]
console.log(control('study', -2)); // [1]
// // => 내용 추가(2022.03.24) : '동일한 원소가 없으면' +인 경우 push, '동일한 원소가 있으면' -인 경우 pop
// // =>                        '동일한 원소가 있으면' +인 경우 무시, '동일한 원소가 없으면' -인 경우 무시
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
