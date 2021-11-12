# 타입스크립트와 자바스크립트의 관계
> 타입스크립트는 문법적으로 자바스크립트의 상위집합입니다.

문법의 유효성과 동작의 이슈는 독립적인 문제입니다. 타입스크립트는 .ts와 .tsx 확장자를 사용하며 .js와 .jsx 확장자를 가진 파일과 완벽하게 호환됩니다. 이는 자바스크립트를 타입스크립트로 마이그레이션하는 데 엄청난 이점이 있습니다.

모든 `자바스크립트는 타입스크립트다`는 명제는 참이지만, 모든 타입스크립트는 자바스크립트가 아닙니다. 그 이유는 타입스크립트가 타입을 명시하는 추가적인 문법을 갖기 때문이죠.
```js
const greet = (who: string) => {
  console.log(`Hello, ${who}!!`);
}
```
이 코드는 자바스크립트를 구동하는 노드나 브라우저에서 실행하는 경우 에러(`SyntaxError: Unexpected token :`)가 발생합니다. 앞서 사용한 `: string`이 타입스크립트에서 사용하는 구문이기 때문에, 이 **타입 구문**을 사용하는 순간부터 자바스크립트는 타입스크립트 영역으로 들어갑니다.

타입스크립트는 컴파일러를 가지고 있습니다. 이 컴파일러는 기본적이 자바스크립트 프로그램에도 유용하죠. 가령 아래와 같은 코드가 있습니다.
```js
let city = 'new city';
console.log(city.toUppercase());
```

이 코드는 에러(`TypeError: city.toUppercase is not a function`)가 발생하죠. 그러나 타입스크립트의 **타입 체커**는 문제점을 찾아냅니다.
```js
let city = 'new city';
console.log(city.toUppercase());

// Property 'toUppercase' does not exist on type '"new city"'. Did you mean 'toUpperCase'?
```

변수의 타입을 아렬주지 않아도 타입스크립트는 **초깃값**으로부터 타입을 **추론**합니다. 이 `타입 추론`은 타입스크립트에서 매우 중요하죠. 타입 시스템의 목표 중 하나는 `런타임에 오류를 발생시킬 코드를 미리 찾는` 것입니다. 그러나 타입 체커가 모든 오류를 찾아내진 않습니다. 또한 오류가 발생하지 않아도 의도와 다르게 동작하는 코드도 있죠.

자바스크립트는 선언되지 않은 프로퍼티에 접근할 경우 이를 생성하고 undefined를 반환합니다. 그에 반면 타입스크립트는 타입 구문이 없어도 오류를 찾아내죠. 그러나 이 오류는 명확하지 않습니다. 이를 더 확실하게 하려면 타입 구문을 추가해야 하죠.

이 행위가 `의도를 명확히`해서 타입스크립트가 잠재적 문제점을 찾을 수 있게 하는 것입니다. 타입 구문 없이 배열 안에 오타를 냈을 경우, 오류가 되지 않았을 테지만 타입 구문을 추가하면 이를 오류로서 인지할 수 있는 것이죠.

타입스크립트 타입 시스템은 자바스크립트의 런타임 동작을 `모델링`합니다. 단순히 런타임 동작을 모델링하는 것이 아니라 의도하지 않은 코드가 오류를 발생시킬 수 있다는 것까지 고려하죠.

그러나 타입스크립트의 타입 시스템이 정적 타입의 정확성을 보장해주진 않습니다. 정리하자면, 아래와 같습니다.
1. 타입스크립트는 자바스크립트의 상위집합으로서 별도의 문법을 가진 유요하지 않은 자바스크립트 프로그램입니다. 
2. 자바스크립트 런타임 동작을 모델링하는 타입 시스템을 가지고 있으므로 런타임 오류를 발생시키는 코드를 찾아낼 수 있지만 모든 오류를 찾아내진 못합니다. 타입 체커를 통과하면서도 런타임 오류를 발생시키는 코드는 충분히 많거든요.
3. 타입스크립트의 타입 시스템은 자바스크립트에서 허용되는 것을 문제삼기도 합니다. 이러한 문법의 엄격함은 취향차이니 우열을 가릴 수 없죠.

<br>

# 타입스크립트 설정 이해하기
> 타입스크립트를 사용할 때 반드시 설정 파일을 사용하세요.

설정 파일은 `tsc --init`만 실행하면 생성됩니다. 물론 전역에 타입스크립트가 설치되어야만 합니다.

타입스크립트는 어떻게 설정하냐에 따라 완전히 다른 언어처럼 느껴질 수 있는데, 이를 제대로 사용하기 위해서는 `noImplicitAny`와 `strictNullChecks`를 이해해야 합니다.

- `noImplicitAny` : 변수들이 미리 정의된 타입을 가져야 하는지 여부를 제어합니다.
  ```js
  const add = (a, b) => a + b;
  ```
  - 이 코드는 `noImplicitAny`가 해제되어 있을 때는 유효하며, a와 b가 타입스크립트에 의해 `any`로 타입 추론되었음을 알 수 있습니다.
  - any 타입을 매개변수에 사용하면 타입 체커는 무력해집니다.
  - any를 명시하지 않아도 타입이 없는 변수는 암시적으로 `any`로서 간주됩니다.
  - `noImplicitAny`를 설정하면 `any`를 선언하거나 분명한 타입으로 선언하여 해결할 수 있습니다.
    ```js
      const add = (a: number, b: number) => a + b;
    ```
  - 모든 변수에 타입을 명시하면 문제를 발견하기 수월해지고 코드의 가독성이 향상되며 개발자의 생산성이 높아집니다.
  - 해당 설정의 해제는 자바스크립트를 마이그레이션할 때만 사용하도록 합니다.

- `strictNullChecks` : null과 undefined가 모든 타입에서 허용되는지 확인하는 설정입니다.
  ```js
  const x: number = null;
  ```
  - 이 코드는 `strictNullChecks`가 해제되었을 때는 유효하며, 선언되었을 경우 의도를 명시적으로 드러내어야 합니다.
    ```js
    const x: number | null = null;
    ```
  - 만약 null을 허용하지 않으려면 이 값이 어디서부터 왔는지 null을 체크하는 코드 혹은 `단언문(assertion)`을 추가해야 합니다.
    ```js
    const $status = document.querySelector('.status');
    el.textContent = 'Ready'; // ~ 개체가 `null`인 것 같습니다.

    // 아래와 같이 설정
    if($status) $status.textContent = 'Ready'; // null 제외
    $status!.textContent = 'Ready'; // null이 아님을 단언
    ```
  - `strictNullChecks`는 null과 undefined를 잡는데 탁월하며, 이를 사용하지 않는다면 `undefined는 객체가 아닙니다`라는 런타임 오류를 맞이하게 될 겁니다.
  - 가능한 한 초반에 설정하는 것이 좋으며, `strictNullChecks` 옵션보다 `noImplicitAny`이 선행되어야 합니다.

이 모든 체크를 설정하고 싶다면 `strict` 설정을 하면 됩니다.

정리하자면, 타입스크립트 컴파일러는 언어의 핵심 요소에 영향을 미치는 몇 가지 설정이 있습니다.
1. 타입스크립트 설정은 커맨드 라인(CLI)이 아닌 `tsconfig.json`을 사용하세요.
2. 자바스크립트 프로젝트를 타입스크립트로 전환하는 게 아니라면 `noImplicitAny`를 설정하세요.
3. `undefined는 객체가 아닙니다` 같은 런타임 오류를 방지하기 위해 `strictNullChecks`를 사용하세요.
4. 타입스크립트에서 엄격한 체크를 하고 싶다면 `strict` 설정을 고려하세요.

<br>

# 코드 생성과 타입이 관계없을 이해하기
> 타입스크립트 컴파일러의 역할은 완벽히 독립적입니다.

타입스크립트 컴파일러는 아래와 같은 역할을 합니다.
1. 최신 타입스크립트/자바스크립트를 브라우저에서 동작할 수 있도록 구버전의 자바스크립트로 트랜스파일(transpile)합니다.
2. 코드의 타입 오류를 체크합니다.

타입스크립트가 자바스크립트로 변환될 때의 코드 내 타입에는 영향을 주지 않으며, 자바스크립트의 실행 시점에도 타입은 영향을 미치지 않습니다. 즉, 완벽히 독립적이죠. 이를 통해 타입스크립트가 하는 일, 할 수 있는 일을 확인할 수 있습니다.

## 타입 오류가 있는 코드도 컴파일이 가능합니다.
> 컴파일은 타입 체크와 독립적으로 동작하므로 타입 오류가 있는 코드도 컴파일이 가능합니다.

타입스크립트 오류는 경고(warning)로서 문제가 될 부분을 알려주나 빌드를 멈추지는 않습니다. 타입 오류가 있는데 컴파일되는 것은 문제가 있어보이나, 사실 이는 도움이 많이 됩니다. 에러가 발생해도 컴파일된 산출물이 생성되므로 애플리케이션의 다른 부분을 테스트할 수 있게 돼죠.

만약 오류가 있을 때 컴파일하지 않으려면 `tsconfig.json`에 `noEmitOnError`를 설정하거나 빌드 도구에 적용하도록 합시다.

<br>

## 런타임에는 타입 체크가 불가능합니다.
> 타입스크립트의 타입은 `제거 가능(erasable)`으로 자바스크립트로 컴파일되는 과정에 모든 인터페이스, 타입, 타입 구문은 제거됩니다.

```js
interface Square {
  width: number;
}
interface Rectangle extends Square {
  height: number;
}
type Shape = Square | Rectangle;

function calculateArea(shape: Shape) {
  if (shape instanceof Rectangle) {
                    // ~~~~~~~~~ 'Rectangle' only refers to a type,
                    //           but is being used as a value here
    return shape.width * shape.height;
                    //         ~~~~~~ Property 'height' does not exist
                    //                on type 'Shape'
  } else {
    return shape.width * shape.width;
  }
}
```

타입을 명확하게 하려면 런타임에 타입 정보를 유지하는 방법이 필요합니다. 그 중 하나는 height 속성을 가졌는지 체크하는 것입니다.

```js
interface Square {
  width: number;
}
interface Rectangle extends Square {
  height: number;
}
type Shape = Square | Rectangle;
function calculateArea(shape: Shape) {
  if ('height' in shape) {
    shape;  // Type is Rectangle
    return shape.width * shape.height;
  } else {
    shape;  // Type is Square
    return shape.width * shape.width;
  }
}
```
- 속성 체크는 런타임에 접근 가능한 값에 관려되나, 타입 체커 역시 shape의 타입을 Rectangle로 보정해주므로 오류가 사라집니다.

다른 방법으로는 런타임에 접근 가능한 타입 정보를 명시적으로 저장하는 `태그` 기법입니다.
```js
interface Square {
  kind: 'square';
  width: number;
}
interface Rectangle {
  kind: 'rectangle';
  height: number;
  width: number;
}
type Shape = Square | Rectangle;

function calculateArea(shape: Shape) {
  if (shape.kind === 'rectangle') {
    shape;  // Type is Rectangle
    return shape.width * shape.height;
  } else {
    shape;  // Type is Square
    return shape.width * shape.width;
  }
}
```
- Shape 타입은 `태그된 유니온(tagged union)`의 한 예로서 런타임에 타입 정보를 손쉽게 유지합니다.

타입을 클래스로 만들어 타입(런타임 접근 불가)과 값(런타임 접근 가능)을 둘 다 사용할 수도 있습니다.
```js
class Square {
  constructor(public width: number) {}
}
class Rectangle extends Square {
  constructor(public width: number, public height: number) {
    super(width);
  }
}
type Shape = Square | Rectangle;

function calculateArea(shape: Shape) {
  if (shape instanceof Rectangle) {
    shape;  // Type is Rectangle
    return shape.width * shape.height;
  } else {
    shape;  // Type is Square
    return shape.width * shape.width;  // OK
  }
}
```
- Square와 Rectangle을 클래스로 만들어 오류를 해결했습니다. 인터페이스는 타입으로만 사용할 수 있지만 Rectangle을 클래스로 선언하면 타입과 값으로 모두 사용할 수 있기에 오류가 없죠.
- `type Sahpe = Square` 부분에서 Rectangle은 타입으로 참조되지만 `shape instanceof Rectangle` 부분에서는 값으로 참조됩니다.

<br>

## 타입 연산은 런타임에 영향을 주지 않습니다.
string 또는 number 타입인 값을 항상 number로 정제하는 경우를 가정해볼까요?

```js
function asNumber(val: number | string): number {
  return val as number;
}

// 아래처럼 변환됩니다.
function asNumber(val) {
  return val;
}
```

코드에 아무런 정제 과정이 없죠? `as number(타입 단언문)`는 타입 연산이고 런타임 동작에는 아무런 영향을 미치지 않습니다. 값을 정제하기 위해서는 런타임에 타입을 체크하고 자바스크립트 연산을 통해 변환을 수행해야 하죠.

```js
function asNumber(val: number | string): number {
  return typeof(val) === 'string' ? Number(val) : val;
}
```

<br>

## 런타임 타입은 선언된 타입과 다를 수 있습니다.
> 타입스크립트는 일반적으로 실행되지 못하는 죽은 코드를 찾아내나 strict를 설정해도 찾아내지 못하는 경우가 있습니다.

```js
function turnLightOn() {}
function turnLightOff() {}
function setLightSwitch(value: boolean) {
  switch (value) {
    case true:
      turnLightOn();
      break;
    case false:
      turnLightOff();
      break;
    default:
      console.log(`실행이 안 돼요...ㅠ`);
  }
}
```
- `: boolean`은 타입 선언문입니다. 타입스크립트의 타입이라 런타임에 제거되죠. 따라서 `setLightSwitch('실수')`로 호출할 수도 있습니다.

타입스크립트에서도 마지막 코드를 실행할 수 있는 방법은 존재합니다.
```js
interface LightApiResponse {
  lightSwitchValue: boolean;
}
async function setLight() {
  const response = await fetch('/light');
  const result: LightApiResponse = await response.json();
  setLightSwitch(result.lightSwitchValue);
}
```
- `/light`를 요청하여 `LightApiResponse`를 반환하라 선언했지만, 실제로 그렇게 되리라는 보장은 없습니다.
- 만약 API를 잘못 파악해서 lightSwitchValue가 실제로는 `문자열`이었다면, 런타임에는 `setLightSwitch`의 마지막까지 실행되겠죠.

이처럼 타입스크립트에서는 런타임 타입과 선언된 타입이 맞지 않을 수 있으므로 타입이 달라지는 혼란스러운 상황은 가능한 피해야 합니다. 선언된 타입은 언제든 달라질 수 있으니까요.

<br>

## 타입스크립트 타입으로는 함수를 오버로드할 수 없습니다.
> Java 같은 언어에서는 동일한 이름이지만 매개변수의 개수가 다른 여러 함수를 선언할 수 있지만, 타입스크립트는 불가능합니다.

타입스크립트에서는 타입과 런타임의 동작이 무관하므로 함수 오버로딩이 불가능합니다.
```js
function add(a: number, b: number) { return a + b; }
      // ~~~ 중복된 함수 구현입니다.
function add(a: string, b: string) { return a + b; }
      // ~~~ 중복된 함수 구현입니다.
```

물론 타입스크립트는 함수 오버로딩 기능을 지원합니다. 그러나 타입 수준에서만 동작하죠. 즉 하나의 함수에 대해 여러 선언문을 작성할 수 있으나 구현체(Implementation)는 오직 하나뿐입니다.

```js
// tsConfig: {"noImplicitAny":false}

function add(a: number, b: number): number;
function add(a: string, b: string): string;

function add(a, b) {
  return a + b;
}

const three = add(1, 2);  // 타입이 number
const twelve = add('1', '2');  // 타입이 string
```

add에 대한 처음 두 선언문은 타입의 정보를 제공할 뿐이므로 런타임 때 제거되고 구현체만 남게 됩니다.

<br>

## 타입스크립트 타입은 런타임 성능에 영향을 주지 않습니다.
> 타입과 타입 연산자는 자바스크립트 변환 시점에 제거되므로 런타임 성능에 어떤 영향도 미치지 않습니다.

타입스크립트의 정적 타입은 비용이 일체 들지 않습니다. 그러나, `런타임 오버헤드`가 없는 대신 `빌드타임 오버헤드`가 존재하죠. 만약 오버헤드가 커진다면 빌드 도구에서 `transpile only`를 설정하여 타입 체크를 건너뛸 수 있습니다.

타입스크립트를 컴파일 할 때 `호환성을 높이고 성능 오버헤드를 감안`할 지, `호환성을 포기하고 성능 중심 네이티브 구현체를 선택`할 지 고민할 수 있습니다. 어떤 경우든 타입과는 무관합니다.

<br>

정리하자면, 코드 생성은 타입 시스템과 무관하므로 런타임 동작과 성능에 영향을 주지 않습니다. 또한 타입 오류가 존재하더라도 코드 생성(컴파일)은 가능합니다.

마지막으로 타입스크립트 타입은 런타임에 사용할 수 없습니다. 런타임에 타입을 지정하려면 타입 정보 유지를 위한 별도의 방법이 필요하며, 일반적으로 태그된 유니온 및 속성 체크 방법을 사용합니다. 혹은 클래스 같이 타입스크립트 타입과 런타임 값 둘 다 제공하는 방법이 있습니다.