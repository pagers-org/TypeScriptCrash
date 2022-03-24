let controlGameArray: number[] = [];

type MemoryObject = {
  name: string;
  gender: "female" | "male";
  age: number;
  isStudent: boolean;
  hobby?: string[];
  doing?: object[];
};

type ControlType = "game" | "study" | "memory";
function control(type: ControlType, t: object | string | number) {
  if (type === "game") {
    if (typeof t === "string") {
      if (t === "start") return "게임이 시작되었습니다!";
      if (t === "pause") return "게임이 중지되었습니다!";
      if (t === "stop") return "게임이 종료되었습니다!";
    }
  }

  if (type === "study") {
    if (typeof t === "number") {
      if (controlGameArray.includes(Math.abs(t))) {
        if (t < 0)
          controlGameArray = [
            ...controlGameArray.filter((x) => x !== Math.abs(t)),
          ];
      } else {
        if (t > 0) controlGameArray.push(t);
      }
    }

    return [...controlGameArray];
  }

  if (type === "memory") {
    if (typeof t === "object") {
      const memory = t as MemoryObject;
      let resultString: string[] = [];

      resultString.push(`저의 이름은 ${memory.name}, `);
      resultString.push(`${memory.gender === "female" ? "여성" : "남성"}이고 `);
      resultString.push(`${memory.age}살이고 `);
      resultString.push(
        `${memory.isStudent ? "학교에 다니고 있어요🤗" : "학생은 아니에요🤣"}. `
      );

      if (memory.hobby) {
        resultString.push(`취미는 ${memory.hobby.join(", ")}에요!`);
      }
      if (memory.doing) {
        resultString.push(`현재 하고있는 일은 이래요!`);
        resultString.push(JSON.stringify(memory.doing));
      }

      return resultString.join("");
    }
  }
  return;
}

type MethodType = "add" | "sub" | "mul" | "div" | "calc";
function calculate(type: MethodType, ...args: any[]) {
  if (type === "add") {
    return +args[0] + +args[1];
  }
  if (type === "sub") {
    return +args[0] - +args[1];
  }
  if (type === "mul") {
    return +args[0] * +args[1];
  }
  if (type === "div") {
    return Math.floor(+args[0] / +args[1]);
  }
  if (type === "calc") {
    let result = 0;
    let i = 0;
    while (args.length > 1) {
      console.log(args);

      if (args.find((x) => x === "*")) {
        i = args.findIndex((x) => x === "*");
        result = args[i - 1] * args[i + 1];
        console.log(result);
        args.splice(i - 1, 3, result);
        i = 0;
        continue;
      }

      if (args.find((x) => x === "/")) {
        i = args.findIndex((x) => x === "/");
        result = args[i - 1] / args[i + 1];
        console.log(result);
        args.splice(i - 1, 3, result);
        i = 0;
        continue;
      }
      if (args[i] === "+") {
        result = args[i - 1] + args[i + 1];
        args.splice(i - 1, 3, result);
        i--;
      }

      if (args[i] === "-") {
        result = args[i - 1] - args[i + 1];
        args.splice(i - 1, 3, result);
        i--;
      }

      i++;
    }

    return result;
  }
  return "";
}

console.log(calculate("add", 1, 3)); // 4
console.log(calculate("sub", "3", 2)); // 1
console.log(calculate("mul", 6, "9")); // 54
console.log(calculate("div", "5", "4")); // 1
console.log(calculate("calc", 6, "-", 4, "*", 12, "/", 6, "+", 19)); // 17

console.log(control("game", "start")); // "게임이 시작되었습니다!"
console.log(control("game", "pause")); // "게임이 중지되었습니다!"
console.log(control("game", "stop")); // "게임이 종료되었습니다!"
console.log(control("study", +1)); // [1]
console.log(control("study", +2)); // [1,2]
console.log(control("study", -2)); // [1]
// => 내용 추가(2022.03.24) : '동일한 원소가 없으면' +인 경우 push, '동일한 원소가 있으면' -인 경우 pop
// =>                        '동일한 원소가 있으면' +인 경우 무시, '동일한 원소가 없으면' -인 경우 무시

console.log(
  control("memory", {
    name: "yuri",
    gender: "female",
    age: 13,
    isStudent: true,
    hobby: ["swimming", "movie"],
  })
); // 저의 이름은 wave, 여성이고 13살이구 학교에 다니고 있어요🤗 취미는 swimming, movie에요!
console.log(
  control("memory", {
    name: "evaw",
    gender: "male",
    age: 17,
    isStudent: false,
  })
); // 저의 이름은 evaw, 남성이고 17살이에요! 학생은 아니에요🤣
console.log(
  control("memory", {
    name: "mark",
    gender: "male",
    age: 42,
    isStudent: false,
    doing: [
      {
        category: "회사일",
        content: ["상담", "스프린트 진행하기"],
      },
      {
        category: "집안일",
        content: ["청소", "쓰레기 비우기"],
      },
    ],
  })
);
// 저의 이름은 mark, 남성이고 42살이에요! 학생은 아니에요🤣 현재 하고 있는 일은 이래요!
// [
//  { category: '회사일', content: ['상담', '스프린트 진행하기'] },
//  { category: '집안일', content: ['청소', '쓰레기 비우기'], },
//]
