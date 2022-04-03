let globalStudy: number[] = [];
const gameStatus = {
  start: '게임이 시작되었습니다!',
  pause: '게임이 중지되었습니다!',
  stop: '게임이 종료되었습니다!',
};

interface PersonInterface {
  name: string;
  gender: string;
  age: number;
  isStudent: boolean;
  hobby?: Array<string>;
  doing?: Array<DoingInterface>;
}
interface DoingInterface {
  category: string;
  content: Array<string>;
}

type DetailType = string | number | PersonInterface;
type GameType = 'start' | 'pause' | 'stop';


function control(type: string, detail: DetailType): string {
  switch(type){
    case 'game': 
      const gameType = <GameType>detail;
      return gameStatus[gameType];

    case 'study': 
      const detailNumber = Number(detail);
      const detailNatural = Math.abs(detailNumber);
      const isPlusValue = detail > 0;
      const isDuplicate = globalStudy.includes(detailNatural);

      if (isPlusValue && !isDuplicate) globalStudy.push(detailNumber);
      else if (!isPlusValue && isDuplicate) {
        globalStudy = globalStudy.filter(num => num !== detailNatural);
      }

      return String(globalStudy);

    case 'memory': 
      let memoryText: string = '저의 이름은 ';
      const memoryJson = <PersonInterface>detail;
      memoryText += `${memoryJson.name}, `;
      memoryText += `${memoryJson.gender === 'female' ? '여성' : '남성'}이고 `;
      memoryText += `${memoryJson.age}살`;
      memoryText += `${
        memoryJson.isStudent
          ? '이고, 학교에 다니고 있어요🤗 '
          : '이에요. 학생은 아니에요🤣 '
      }`;
      if (memoryJson.hobby) {
        memoryText += `취미는 ${(memoryJson.hobby).join(",")}`;
        memoryText += `${memoryJson.doing ? '에요.' : '이고, '}`;
      }
      if (memoryJson.doing) {
        memoryText += `현재 하고 있는 일은 이래요!`+'\n';
        memoryText += JSON.stringify(memoryJson.doing, null, 2);
      }
      return memoryText;
  }

  return '';
}

console.log(control('game', 'start')); // "게임이 시작되었습니다!"
console.log(control('game', 'pause')); // "게임이 중지되었습니다!"
console.log(control('game', 'stop')); // "게임이 종료되었습니다!"
console.log(control('study', +1)); // [1]
console.log(control('study', +2)); // [1,2]
console.log(control('study', -2)); // [1]
// => 내용 추가(2022.03.24) : '동일한 원소가 없으면' +인 경우 push,  '동일한 원소가 없으면' -인 경우 무시
// =>                        '동일한 원소가 있으면' +인 경우 무시, '동일한 원소가 있으면' -인 경우 pop

console.log(
  control('memory', {
    name: 'yuri',
    gender: 'female',
    age: 13,
    isStudent: true,
    hobby: ['swimming', 'movie'],
  })
); // 저의 이름은 wave, 여성이고 13살이구 학교에 다니고 있어요🤗 취미는 swimming, movie에요!
console.log(
  control('memory', {
    name: 'evaw',
    gender: 'male',
    age: 17,
    isStudent: false,
  })
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
  })
);
// 저의 이름은 mark, 남성이고 42살이에요! 학생은 아니에요🤣 현재 하고 있는 일은 이래요!
// [
//  { category: '회사일', content: ['상담', '스프린트 진행하기'] },
//  { category: '집안일', content: ['청소', '쓰레기 비우기'], },
//]
