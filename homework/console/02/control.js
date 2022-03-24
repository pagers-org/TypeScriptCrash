function Control(type, action) {
  this.type = type;
  this.action = action;
  this.studyArray;
  this.gameStatus;

  // 실행부: 리렌더링, 인스턴스를 다시 선언하지 않고 상태를 적용하는 렌더링
  this.setState = (type = '', action = '') => {
    this.#action = action;
    this.#type = type;

    this.render();
  };

  // 선언부
  this.render = () => {};

  // 실행부: 초기화(Init)
  this.render();
}

export default Control;
// class Control {
//   #type;
//   #action;
//   #studyArray;
//   #gameStatus;
//   constructor(type = '', action = '') {
//     this.#action = action;
//     this.#type = type;
//   }
//   render() {
//     if (this.#type === 'game') {
//       switch (this.#action) {
//         case 'start':
//           this.#gameStatus = '게임이 시작되었습니다!';
//           return this.#gameStatus;
//         case 'pause':
//           this.#gameStatus = '게임이 중지 되었습니다!';
//           return this.#gameStatus;
//         case 'stop':
//           this.#gameStatus = '게임이 종료 되었습니다!';
//           return this.#gameStatus;
//       }
//     }
//   }
// }
