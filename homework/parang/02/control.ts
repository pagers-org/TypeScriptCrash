type ControlCommand = 'game' | 'study';
type GameStatusProps = 'start' | 'pause' | 'stop';
type InputProps = GameStatusProps | number;
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
    if (typeof params === 'string') {
      gameState = params as GameStatusProps;
      return gameStatus[gameState];
    }

    if (command !== 'study') return '에러😡';

    const absNumber = Math.abs(params);
    const isInclude = stack.includes(absNumber);

    if (!isInclude && params > 0) stack.push(absNumber);
    if (isInclude && params < 0)
      stack = stack.filter(stackNumber => stackNumber !== absNumber);

    return stack;
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
