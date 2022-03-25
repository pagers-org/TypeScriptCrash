const MSG = {
  GameControl: {
    START: '게임이 시작되었습니다',
    PAUSE: '게임이 중지되었습니다',
    STOP: '게임이 종료되었습니다',
  },
};

type GameState = 'start' | 'pause' | 'stop';

type GameStateMap = { [key in GameState]: string };

const gameStateMap: GameStateMap = {
  start: MSG.GameControl.START,
  pause: MSG.GameControl.PAUSE,
  stop: MSG.GameControl.STOP,
};

type Do = {
  category: string;
  content: string[];
};

type ContolType = 'game' | 'study' | 'memory';

type Sex = 'male' | 'female';

type ArgType = GameState | number | Man;

type ResultType = string | number[];

interface Control<ArgType, ResultType> {
  display(arg: ArgType): ResultType;
}

interface Man {
  name: string;
  gender: Sex;
  age: number;
  isStudent?: boolean;
  doing?: Do[];
  hobby?: string[];
}

class GameControl implements Control<GameState, string> {
  display(state: GameState): string {
    return gameStateMap[state];
  }
}

class StudyControl implements Control<number, number[]> {
  private studyResult: number[] = [];

  private pushStudy(studyNum: number): void {
    this.studyResult.push(Math.abs(studyNum));
  }

  private removeStudy(studyNum: number): void {
    this.studyResult = [...this.studyResult].filter(
      num => num !== Math.abs(studyNum),
    );
  }

  private isIncludeStudyNum(studyNum: number) {
    return this.studyResult.includes(Math.abs(studyNum));
  }

  public display(studyNum: number): number[] {
    const isPlus = studyNum > 0;
    const isIncludeStudyNum = this.isIncludeStudyNum(studyNum);

    if (isIncludeStudyNum) {
      !isPlus && this.removeStudy(studyNum);
    } else {
      isPlus && this.pushStudy(studyNum);
    }

    return this.studyResult;
  }
}

class ManWrapper {
  private readonly man: Man;

  private result: string[] = [];

  constructor(man: Man) {
    this.man = man;
  }

  public getGender(): string {
    return this.man.gender === 'female' ? '여성' : '남성';
  }

  public getSchool(): string {
    return this.man.isStudent
      ? '학교에 다니고 있어요 🤗'
      : '학생은 아니에요 🤣';
  }

  public getHobby(): string {
    if (!this.man.hobby) return '';

    return this.man.hobby ? `취미는 ${this.man.hobby.join(',')}에요!` : '';
  }

  public getDoing(): string {
    if (!this.man.doing) return '';

    const result = [];

    result.push('현재 하고 있는 일은 이래요!\n');
    result.push('[\n');
    result.push(JSON.stringify(this.man.doing));
    result.push(']\n');

    return result.join(' ');
  }

  private pushOnlyNotEmpty(item: string | undefined): void {
    if (!item || item?.length === 0) return;
    this.result.push(item);
  }

  public introduce(): string {
    const { name, age }: Man = this.man;

    const nameWithGenderAndAge = `저의 이름은 ${name}, ${this.getGender()}이고 ${age}이구`;
    const school = this.getSchool();
    const hobby = this.getHobby();
    const doing = this.getDoing();

    this.pushOnlyNotEmpty(nameWithGenderAndAge);
    this.pushOnlyNotEmpty(school);
    this.pushOnlyNotEmpty(hobby);
    this.pushOnlyNotEmpty(doing);

    return this.result.join(' ');
  }
}

class ManControl implements Control<Man, string> {
  display(man: Man): string {
    return new ManWrapper(man).introduce();
  }
}

class ControlFactory {
  static gameControl = new GameControl();
  static studyControl = new StudyControl();
  static manControl = new ManControl();

  static create(type: ContolType): Control<ArgType, ResultType> {
    if (type === 'game') {
      return this.gameControl;
    } else if (type === 'study') {
      return this.studyControl;
    } else if (type === 'memory') {
      return this.manControl;
    }

    throw new Error();
  }
}

function control(type: ContolType, arg: ArgType) {
  return ControlFactory.create(type).display(arg);
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
