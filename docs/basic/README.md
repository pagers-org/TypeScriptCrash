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

<br>

## 타입 연산자(Union, Intersection)
```ts
//연산자 - Union Type

// function logMessage(value: any) {
//     console.log(value);
// }
// logMessage('hello');
// logMessage(100);

let seho: string | number | boolean;
function logMessage(value: string | number) {
    // 타입스크립트가 가지는 코드 추론 : Union Type의 특징 중 하나
    if (typeof value === 'number') {
        // 자동으로 number 관련 함수랑 매핑됨
    }
    if (typeof value === 'string') {
        // 자동으로 string 관련 함수랑 매핑됨
    }

    throw new TypeError('value must be string or number');
}
logMessage('hello');
logMessage(100);


// Union의 특징
interface Developer {
    name: string;
    skill: string;
}

interface Person {
    name: string;
    age: number;
}

function askSomeone(someone: Developer | Person) {
    // 모든 속성을 전부 추론해줄 수 있을거라 생각했지만...
    someone.name; // 추론으로는 공통적인 (name) 프로퍼티 밖에 접근하지 못함
    // type-safe 하지 않은 상황이 올 수 있으므로 공통적인 속성-보장된 속성만 제공되는 것
}

/********************************************************************************/

//연산자 - Intersection Type
let kein: string | number | boolean;
let capt: string & number & boolean;

function askSomeone2(someone: Developer & Person) {
    // 모든 속성을 전부 추론해준다.
    someone.age;
    someone.name;
    someone.skill;
}

/********************************************************************************/
// | 와 & 의 차이점

// Developer의 규격
askSomeone({ name: '개발자', skill: '타입스크립트' });
// Person의 규격
askSomeone({ name: '캡틴', age: 100 });

// Developer + Person의 규격
askSomeone2({ name: '개발자', skill: '타입스크립트', age: 100 });
```

<br>

## enum
```ts
// enum : 특정 값들의 집합

// 별도의 값을 정의하지 않으면 숫자로 취급
enum Shoes {
    Nike,
    Adidas,
}

let myShoes = Shoes.Nike;
console.log(myShoes); // 0

// 문자 enum
enum Shoes2 {
    Nike = '나이키',
    Adidas = '아디다스',
}

let myShoes2 = Shoes2.Nike;
console.log(myShoes2); // 나이키

// 이러면 확장성이 낮음 : enum을 활용해보자
// function askQuestion(answer: string) {
//     if (answer === 'yes') {
//         console.log("정답입니다.");
//     }
//     if (answer === 'no') {
//         console.log("오답입니다.");
//     }
// }

// 드롭다운 형태에 자주 씀
enum Answer {
    Yes = "Y",
    No = "N",
}

function askQuestion(answer: Answer) {
    if (answer === Answer.Yes) {
        console.log("정답입니다.");
    }
    if (answer === Answer.No) {
        console.log("오답입니다.");
    }
}

askQuestion(Answer.Yes);
askQuestion('Yes');
// askQuestion('예스');
// askQuestion('y');
// askQuestion('Yes');
```

<br>

## 클래스(Class)
```ts
class Person2 {
    // 멤버변수 정의
    private name: string;   // 클래스 내부에서만 접근 가능
    public age: number;     // 어디에서나 접근 가능
    readonly log: string;   // 읽기만 가능, 값을 변경할 수 없음

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
}

// 리액트 예전 문법 - 클래스 기반 코드
class App extends React.Component {

}

// 리액트 최신 문법 - 훅 기반의 함수영 코드
function App() {
    return <div>Heelo World < /div>
}

// 뷰 컴포지션 API
new Vue({
    el:'',
    setup(){

    }
})
```

<br>

## 제네릭(Generic)
```ts
/* 기본적인 제네릭 함수 */

// // 파라미터를 그대로 돌려주는 함수
// function logText(text) {
//     console.log(text);
//     return text;
// }

// logText(10);        // 숫자 10
// logText('안녕');    // 문자열 안녕
// logText(true);      // 진위값 true

// // 제네릭 적용하기
// function logtext<T>(text: T): T {
//     console.log(text);
//     return text;
// }

// logtext<number>(10);
// logtext<string>('하이');
// logtext<boolean>(true);

/* 기존 타입 정의 방식과 제네릭의 차이점 - 함수 중복 선언의 단점 */
// 코드가 동일한데 단순 타입이 다르다는 이유로 비슷한 함수를 늘려나가는건 매우 비효율적이다.
// function logNumber(num: number) {
//     console.log(num);
//     return num;
// }

// function logText(text: string) {
//     console.log(text);
//     text.split('').reverse().join('');
//     return text;
// }

// const num = logNumber(10);
// logText('안녕');    // split으로 인해 문자열만 받을 수 있다.
// logText(true);

/* 기존 타입 정의 방식과 제네릭의 차이점 - 유니온 타입을 이용한 선언 방식의 문제점 */
// function logText(text: string | number) {
//     console.log(text);
//     // string과 number에 공통으로 사용되는 API만 제공한다.
//     return text;
// }

// logText(10);        // 숫자 10
// const a = logText('안녕');    // 문자열 안녕
// // a도 여전히 string과 number에 공통으로 사용되는 API만 제공된다.

/* 제네릭의 장점과 타입 추론에서의 이점 */
function logText<T>(text: T): T {
    console.log(text);
    return text;
}

// 1. 타입이 틀어지지 않게 잘 구성할 수 있다.
// 2. 동일한 함수에 대해 분리가 가능하다.
const str = logText<string>('안녕');
str.split('');
const login = logText<boolean>(true);
login.valueOf();


/* 인터페이스에 제네릭을 선언하는 방법 */
// interface Dropdown {
//     value: string;
//     selected: boolean;
// }

// const obj: Dropdown = {value: 10, selected: false}; // 에러

interface Dropdown2<T> {
    value: T;
    selected: boolean;
}

const obj2: Dropdown2<string> = {value: 'abc', selected: false};    // 정상
const obj21: Dropdown2<number> = {value: 10, selected: false};    // 정상


/* 제네릭의 타입 제한 */
// 제네릭으로 받은 타입을 배열로 활용하겠다라고 제한
// function logTextLength<T>(text: T[]): T[] {
//     console.log(text.length);
//     text.forEach(function (text) {
//         console.log(text);
//     });
//     return text;
// }

// logTextLength<string>(['hi']);

/* 제네릭의 타입 제한2 - 정의된 타입 이용하기 */
interface LengthType {
    length: number;
}

// 인터페이스를 상속하여 제네릭에 들어갈 수 있는 타입을 구분할 수 있다.
function logTextLength<T extends LengthType>(text: T): T {
    text.length;
    return text;
}

logTextLength('a'); // 문자열은 기본적으로 length 함수가 제공됨
logTextLength(10);  // 에러, 숫자에는 length가 적용되지 않음
logTextLength({length: 10});  // 객체 내부에 length 프로퍼티가 있으므로 에러가 나지는 않음

/* 제네릭의 타입 제한3 - keyof */
interface ShoppingItem {
    name: string;
    price: number;
    stock: number;
}

// extends : 기존에 정의된 인터페이스, 클래스, 타입 등을 확장하기 위해 사용한다.
// keyof : 인터페이스의 한가지 속성만 받을 수 있게 제약을 걸겠다
function getShoppingItemOption<T extends keyof ShoppingItem>(itemOption: T): T {
    return itemOption;
}

// getShoppingItemOption(10);
// getShoppingItemOption<string>('a');
getShoppingItemOption("name");

// 가장 많이 사용되는 곳은 API의 호출 후 응답에 대한 규칙을 정의하는 곳이다.
```

<br>

## 타입 추론(Type Inference)
```ts
/* 타입 추론 기본 1 */

// TypeScript Language Server가 타입 추론을 함
let a;  // type: any
let b = 10; // type: number
let c = '10' // type: string

// // return type: any
// function getA(a) {
//     return a;
// }

// // return type: number
// function getB(b) {
//     return b;
// }

// default 값 설정, return type: number
function getA(a = 10) {
    return a;
}

// default 값 설정 연산을 통한 타입 변경, return type: string
function getB(a = 10) {
    return c + a;
}

/* 타입 추론 기본 2 : 인터페이스와 제네릭을 이용한 타입 추론 방식 */
// interface Dropdown<T> {
//     value: T;
//     title: string;
// }

// // type: string
// let shoppingItem: Dropdown<string> = {
//     value: 'abc',
//     title: 'hello',
// }

/* 타입 추론 기본 3 : 복잡한 구조에서의 타입 추론 방식 */
interface Dropdown<T> {
    value: T;
    title: string;
}

interface DetailedDropdown<K> extends Dropdown<K> {
    description: string;
    tag: K;
}

// type: string
let detailedItem: DetailedDropdown<string> = {
    title: 'abc',
    description: 'ab',
    value: 'a',
    tag: 'a'
}

/* Best Common Type */
let arr = [1, 2, true, true, 'a', 3];
```

<br>

## 타입 단언(Type Assertion)
```ts
/* 타입 단언(type assertion) */
// type: any의 경우 중간에 변수 할당을 한다면 타입 추론이 any로 고정된다.
let a;
a = 20;
a = 'a'
let b = a;  // type: string이 아니라 type: any임
let c = a as string; // type: string으로 강제 추론하는 것(개발자가 더 타입을 확실하게 아니까 너는 이렇게 선언해라)

// DOM API(웹 페이지의 태그 정보)를 조작할때 가장 많이 사용된다.

// <div id="app" > hi < /div>

let div = document.querySelector('div'); // div가 있다는 보장이 불가능함
// 일반적으로 존재여부를 확인하고 아래 처럼 로직을 진행한다.
if (div) {
    div.innerText
}

// 타입 단언을 활용
let div2 = document.querySelector('div') as HTMLDivElement;
div2.innerText;
```

<br>

## 타입 가드(Type Guard)
```ts
interface Developer {
    name: string;
    skill: string;
}

interface Person {
    name: string;
    age: number;
}

function introduce(): Developer | Person {
    return {name: 'Tony', age: 33, skill: 'Iron Making'};
}
let tony = introduce();
console.log(tony.skill);    // 에러 : skill, age는 공통된 속성이 아니므로 name만 접근 가능

// 보장됨. 그러나 단언이 반복되면서 가독성이 떨어짐.
if ((tony as Developer).skill) {
    let skill = (tony as Developer).skill;
    console.log(skill);
} else if ((tony as Person).age) {
    let age = (tony as Person).age;
    console.log(age);
}

// 타입 가드 사용하기 : 아래 함수를 통과하고 나면 type을 체크할 수 있다.
function isDeveloper(target: Developer | Person): target is Developer {
    return (target as Developer).skill !== undefined;
}

if (isDeveloper(tony)) {
    tony.skill;
} else {
    tony.age;
}
```

<br>

## 타입 호환(Type Compatibility)
```ts
/* 타입 호환 1 : 인터페이스, 클래스 */
interface Developer {
    name: string;
    skill: string;
}

interface Person {
    name: string;
}

let developer: Developer;
let person: Person;
// developer = person; // 에러 : 왼쪽에 있는 타입은 구조적으로 오른쪽보다 크기때문에 불가능함.
person = developer; // 할당 대상 <= 할당자

// 그렇다면?
class Person {
    name: string;
}
// developer = new Person(); // 에러 : 왼쪽에 있는 타입은 구조적으로 오른쪽보다 크기때문에 불가능함.

/* 타입 호환 2 : 함수, 제네릭 */
// 함수
// 비교를 위해 함수 표현식으로 선언
let add = function (a: number) { }
let sum = function (a: number, b: number) { }

sum = add;  // 에러 : 구조적으로 가능
add = sum;  // 에러 : 구조적으로 불가능

// 제네릭
// 구조적인 타입의 차이가 없음
interface Empty<T> {
}
let emptyOne: Empty<string>;
let emptyTwo: Empty<number>;
emptyOne = emptyTwo;
emptyTwo = emptyOne;

// 구조적인 타입의 차이가 생김 : 인터페이스 내부에서 변수에 타입을 할당하므로
interface NotEmpty<T> {
    data: T;
}
let notEmptyOne: NotEmpty<string>;
let notEmptyTwo: NotEmpty<number>;
notEmptyOne = notEmptyTwo;  // 불가능
notEmptyTwo = notEmptyOne;  // 불가능
```

<br>

## 유틸리티 타입(Utility Type)
```ts
/* Utility - Pick */
interface Product {
  id: number;
  name: string;
  price: number;
  brand: string;
  stock: number;
}

// 1. 상품 목록을 받아오기 위한 API 함수
function fetchProducts(): Promise<Product> {
  return new Promise<Product>((resolve) => {});
}

// 2. 특정 상품의 상세 정보를 불러오는 API 함수 : 특정 속성만 가져오는 경우 interface 전체의 속성을 필요로 하지 않는다.
// Product !== {id, name, price}
// function displayProductDetail(shoppingItem: {
//   id: number;
//   name: string;
//   price: number;
// }) {}

// 두 가지 방법 1: 인터페이스 분리
// interface ProductDetail {
//   id: number;
//   name: string;
//   price: number;
// }
// function displayProductDetail(shoppingItem: ProductDetail) {}

// 두 가지 방법 2: 유틸리티 타입 - Pick
type ShoppingItem = Pick<Product, 'id' | 'name' | 'price'>;
function displayProductDetail(shoppingItem: ShoppingItem) {}

// 3. 특정 상품 정보를 업데이트(갱신)하는 함수
// interface UpdateProduct {
//   id?: number;   // ? 는 Optional로 any와 비슷하다. 있어도 그만, 없어도 그만.
//   name?: string;
//   price?: number;
//   brand?: string;
//   stock?: number;
// }
// function updateProductItem(productItem: UpdateProduct) {}
type UpdateProduct = Partial<Product>;
function updateProductItem(productItem: UpdateProduct) {} // 동일한 결과

// 4. 유틸리티 타입 구현하기 - Partial
interface UserProfile {
  username: string;
  email: string;
  profilePhotoUrl: string;
}
// interface UserProfileUpdate {
//   username?: string;
//   email?: string;
//   profilePhotoUrl?: string;
// }

// #1 첫번째 시도 - 옵셔널 사용, interface가 가지고 있는 각각의 키-밸류값을 가져온다.
// type UserProfileUpdate = {
//   username?: UserProfile['username'];
//   email?: UserProfile['email'];
//   profilePhotoUrl?: UserProfile['profilePhotoUrl'];
// };

// #2 두번째 시도 - 축약형 : 인덱스 오브 시그니쳐를 사용한다.
// type UserProfileUpdate = {
//   // for...in과 동일한 반복문으로 Mapped Type이라고도 함
//   [p in 'username' | 'email' | 'profilePhotoUrl']?: UserProfile[p]; // Partial 처럼 동작하게 구현한 것이지, Partial이 아님
// };
// type UserProfileKeys = keyof UserProfile;    // p in ...과 동일한 형태임

// #3 세번째 시도 - keyof 구문으로 변경하기
type UserProfileUpdate = {
  [p in keyof UserProfile]?: UserProfile[p]; // 기존 선언한 타입에 대해서만 강제성을 가짐
};

// #4 네번째 시도 - Partial 형태
type Subset<T> = {
  [p in keyof T]?: T[p]; // 제네릭으로 넘겨주는 타입에 따라 유동적일 수 있음. 이게 Partial임
};
```

<br>

## 맵드 타입(Mapped Type)
```ts
type Heroes = 'Hulk' | 'Capt' | 'Thor';
// JavaScript의 for...in과 같음
// 인터페이스와 같은 형태로 정의됨
type HeroAges = { [K in Heroes]: number };
const ages: HeroAges = {
  Hulk: 33,
  Capt: 100,
  Thor: 1000,
};
```

<br>