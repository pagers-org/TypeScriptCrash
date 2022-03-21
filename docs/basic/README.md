# 타입스크립트
> 마이크로소프트사에서 개발한 언어

<br>

<div align=center>

<img src="./images/01.png" width="300"/>

</div>

<br>

## 등장 배경
런타임 시 타입(Type)이 결정되는 동적 타입(Dynamically Typed)인 자바스크립트 특성 상 런타임에 에러가 발생하면 앱이 종료되는 문제가 있습니다. 이를 방지하고자 타입스크립트라는 언어는 컴파일 시 에러를 일으켜 런타임 시 발생할 문제에 대처할 수 있고, 이를 정적 타입(Statically Typed)이라고 합니다.

<br>

## 동작
타입스크립트는 기본적으로 내장된 바벨 컴파일러를 쓰고 있으며 외부 라이브러리로 타입스크립트를 트랜스파일링할 수 있습니다.

<br>

## 타입스크립트가 뜨는 이유
1. 동적 타입 언어의 한계를 극복 가능합니다.
2. 안정적이고 확장이 쉬운 소프트웨어를 만들 수 있습니다.
3. 객체지향 프로그래밍이 가능합니다.
   - Modularity 객체 위주의 모듈성 있는 코드
   - Reusability 모듈 단위의<> 재사용
   - Extensible 객체 단위로 확장
   - Maintainability 위의 특징을 종합해 기존 코드에 문제해결 /새로운 기능을 추가할 때 용이성

<br>

## 기본 타입(Primitive Type)
> number, string, boolean, symbol, null, undefined

```ts
/* ===================================== */
/* 기본타입 */

// JS 문자열
// var str = 'hello';

// TS 문자열
let str: string = 'hello';

// TS 숫자
let num: number = 10;

// TS 진위값
let show:boolean = true;
```

<br>

## 객체(참조) 타입(Object Type)

```ts
/* ===================================== */
/* 배열, 튜플, 객체, 함수 */

// TS 배열1
let arr: Array<number> = [1, 2, 3];
let heros: Array<string> = ['Capt', 'Thor', 'Hulk'];

// TS 배열2
let items: number[] = [1, 2, 3];

// TS 튜플
let address: [string, number] = ['gangnam', 100];

// TS 객체
let obj: object = {};
// let person: object = {
//     name: 'capt',
//     age: 100
// };
let person: { name: string, age: number } = {
    name: 'thor',
    age: 1000
};

// 함수의 파라미터에 타입을 정의하는 방식
// function sum(a: number, b: number) {
//     return a + b;
// }
// sum(10, 20);

// 함수의 반환 값에 타입을 정의하는 방식
function add(): number {
    return 10;
}
add();

// 함수의 타입을 정의하는 방식 : 함수의 파라미터 갯수도 제한하는 특성이 있음
function sum(a: number, b: number): number {
    return a + b;
}
sum(10);

// 함수의 옵셔널 파라미터 : 추가적으로 들어올 수 있는 파라미터 검증하기
function log(a: string, b?: string) {

}
log('hello world');
log('hello ts', 'abc');
```

<br>

## 인터페이스(Interface)
```ts
/*========= 변수를 정의하는 인터페이스 =========*/
interface User {
    age: number;
    name: string;
}

/*========= 변수에 인터페이스 활용 =========*/
let seho: User = {
    age: 33,
    name: "세호"
}

/*========= 함수에 인터페이스 활용(인자 정의) =========*/
function getUser(user: User) {
    console.log(user);
}
// 에러 발생, age까지 정의해줘야 함
const capt = {
    name: '캡틴',
}
getUser(capt);

/*========= 함수의 스펙(구조)에 인터페이스 활용 =========*/
interface SumFunction {
    (a: number, b: number): number;
}

let sum: SumFunction;
sum = function (a: number, b: number): number {
    return a + b;
}

/*========= 인덱싱 =========*/
interface StringArray {
    [index: number]: string;
}
let arr: StringArray = ['a', 'b', 'c'];
arr[0] = 10; // 에러
arr[1] = '10';

/*========= 딕셔너리 패턴 =========*/
interface StringRegexDictionary {
    [key: string]: RegExp   // 정규표현식 생성자
}

let obj: StringRegexDictionary = {
    // sth: /abc/,
    cssFile: /\.css$/,
    jsFile: /\.js$/,
}
obj['cssFile'] = 'a'; // 에러

// 타입스크립트의 추론
Object.keys(obj).forEach(function (value) {

});

/*========= 인터페이스 확장 =========*/
interface Person {
    name: string;
    age: number;
}

// extends 로 Person 인터페이스를 상속함
interface Developer extends Person {
    language: string;
}

const captain: Developer = {
    language: 'ts',
    name: '캡틴',
    age: 38,
}
```

<br>

## 타입 별칭
```ts
// 타입 별칭 : 이미 정의한 타입에 이름을 부여하여 쉽게 참고할 수 있다
type Person = {
    name: string;
    age: number;
}

let seho: Person = {
    name: '세호',
    age: 33,
}

type MyString = string;
let str: MyString = 'hello';

type Todo = { id: string, title: string, done: boolean };
function getTodo(todo: Todo) {}


// 인터페이스와 타입의 차이
// 인터페이스는 확장이 가능하지만 타입은 확장이 불가능하다
// 가능한 타입 별칭보다는 인터페이스를 사용하는 것이 좋다

// interface Person {
//     name: string;
//     age: number;
// }
```