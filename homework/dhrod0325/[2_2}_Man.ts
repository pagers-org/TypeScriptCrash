interface Control<ArgType, ResultType> {
  getResult(arg: ArgType): ResultType;
}

type GameState = 'start' | 'pause' | 'stop';

type Do = {
  category: string;
  content: string[];
};

type Sex = 'male' | 'female';

type Man = {
  name: string;
  gender: Sex;
  age: number;
  isStudent?: boolean;
  doing?: Do[];
  hobby?: string[];
};

type ArgType = GameState | number | Man;

type ResultType = string | number[];

class GameControl implements Control<GameState, string> {
  getResult(state: GameState): string {
    switch (state) {
      case 'start':
        return '게임이 시작되었습니다';
      case 'pause':
        return '게임이 중지되었습니다';
      case 'stop':
        return '게임이 종료되었습니다';
    }

    throw new Error('없는 state 입니다');
  }
}

class StudyControl implements Control<number, number[]> {
  private studyResult: number[] = [];

  private isPlus(num: number): boolean {
    return num > 0;
  }

  private isMinus(num: number): boolean {
    return !this.isPlus(num);
  }

  private pushStudy(studyNum: number): void {
    this.studyResult.push(Math.abs(studyNum));
  }

  private popStudy(): void {
    this.studyResult.pop();
  }

  private isIncludeStudyNum(studyNum: number) {
    return this.studyResult.includes(Math.abs(studyNum));
  }

  getResult(studyNum: number): number[] {
    if (!this.isIncludeStudyNum(studyNum)) {
      this.isPlus(studyNum) && this.pushStudy(studyNum);
    } else {
      this.isMinus(studyNum) && this.popStudy();
    }

    return this.studyResult;
  }
}

class ManControl implements Control<Man, string> {
  private result: string[] = [];

  private getGender(gender: string): string {
    return gender === 'female' ? '여성' : '남성';
  }

  private getSchool(isStudent: boolean | undefined): string {
    return isStudent ? '학교에 다니고 있어요 🤗' : '학생은 아니에요 🤣';
  }

  private getHobby(hobby: string[] | undefined): string {
    if (!hobby) return '';

    return hobby ? `취미는 ${hobby.join(',')}에요!` : '';
  }

  private getDoing(doing: Do[] | undefined): string {
    if (!doing) return '';

    const result = [];

    result.push('현재 하고 있는 일은 이래요!\n');
    result.push(doing.map(item => `${JSON.stringify(item)},\n`).join(''));

    return result.join(' ');
  }

  private push(item: string | undefined): void {
    if (!item || item?.length === 0) return;
    this.result.push(item);
  }

  getResult(man: Man): string {
    this.result = [];

    const { name, gender, age, isStudent, doing, hobby }: Man = man;

    this.push(`저의 이름은 ${name}, ${this.getGender(gender)}이고 ${age}이구`);
    this.push(this.getSchool(isStudent));
    this.push(this.getHobby(hobby));
    this.push(this.getDoing(doing));

    return this.result.join(' ');
  }
}

const gameControl = new GameControl();
const studyControl = new StudyControl();
const manControl = new ManControl();

class ControlFactory {
  static create(type: string): Control<ArgType, ResultType> {
    if (type === 'game') {
      return gameControl;
    } else if (type === 'study') {
      return studyControl;
    } else if (type === 'memory') {
      return manControl;
    }

    throw new Error('error!');
  }
}

function control(type: string, arg: ArgType) {
  const control = ControlFactory.create(type);
  return control.getResult(arg);
}

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
