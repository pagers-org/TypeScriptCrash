# 타입스크립트의 타입 시스템

타입스크립트의 가장 중요한 역할은 타입 시스템입니다. 저희는 이 장에서 타입 시스템의 기초를 정리합니다.
1. 타입 시스템이란 무엇인가요?
2. 어떻게 사용해야 하나요?
3. 무엇을 결정해야 하나요?
4. 가급적 사용하지 말아야 할 기능은 무엇인가요?

# 에디터를 사용하여 타입 시스템 탐색하기
- 에디터에서 타입스크립트 언어 서비스를 적극 활용해야 합니다.
- 에디터를 사용하면 어떻게 타입 시스템이 동작하고 타입스크립트가 어떻게 타입을 추론하는지 개념을 확인할 수 있습니다.
- 타입스크립트가 동작을 어떻게 모델링하는지 알기 위해 타입 선언 파일을 찾아보는 방법을 터득해야 합니다.

<br>

# 타입이 값들의 집합이라고 생각하기
> 코드 실행 전, 타입스크립트가 오류를 체크하는 순간에 모든 변수는 `타입`을 가지고 있습니다.

자바스크립트의 모든 변수는 다양한 값을 가질 수 있습니다. 그러나 타입스크립트의 변수는 `타입`에 따른 값만을 허용합니다. 즉 타입은 `할당 가능한 값들의 집합` 또는 `범위`라고 말할 수 있죠.

- 가장 작은 집합은 아무 값도 없는 공집합인 `never` 타입입니다. 이 타입으로 선언된 변수의 범위는 매우 좁아 아무런 값도 할당할 수 없습니다.
  ```js
  const x: never = 12;
  // '12' 형식은 'never' 형식에 할당할 수 없습니다.
  ```

- 가장 작은 집합은 한 가지 값만 포함하는 타입입니다. 이들은 타입스크립트에서 유닛(Unit) 타입이라고도 불리는 리터럴(Literal) 타입입니다.
  ```js
  type A = 'A';
  type B = 'B';
  type Twelve = 12;  
  ```

- 두 개, 혹은 세 개로 묶으려면 유니온(Union) 타입(값 집합들의 합집합)을 사용합니다.
  ```js
  type AB = 'A' | 'B';
  type AB12 = 'A' | 'B' | 12;
  ```
  - 세 개 이상의 타입도 `|`로 묶을 수 있습니다.

다양한 타입스크립트 오류에서 `할당 가능한`이라는 문구는 집합의 관점에서 `~의 원소(값과 타입의 관계)` 또는 `~의 부분 집합(두 타입의 관계)`를 의미합니다.

```js
const a: AB = 'A';  // 정상, 'A'는 집합 {'A', 'B'}의 원소입니다.
const c: AB = 'C';  // "'C'" 형식은 'AB' 형식에 할당할 수 없습니다.
```
- `"C"`는 유닛 타입으로 단일 값을 갖는 범위로 구성되며, AB의 부분 집합이 아니므로 오류입니다.

즉 집합의 관점에서 타입 체커의 주요 역할은 하나의 집합이 다른 집합의 부분 집합인지 검사하는 것이라고 볼 수 있습니다.

```js
// 정상, {"A", "B"}는 {"A", "B"}의 부분 집합입니다.
const ab: AB = Math.random() < 0.5 ? 'A' : 'B';
const ab12: AB12 = ab; // 정상, {"A", "B"}는 {"A", "B", 12}의 부분 집합입니다.

declare let twelve: AB12;
const back: AB = twelve;
// 'AB12' 형식은 'AB' 형식에 할당할 수 없습니다.
// '12' 형식은 'AB' 형식에 할당할 수 없습니다.
```

이렇게 집합의 범위가 한정되어 있다면 쉽게 이해할 수 있죠. 그러나 실제 다루는 타입은 대부분 범위가 무한이므로 생각하기 벅찹니다. 이렇게 범위가 무한대인 타입은 `원소들을 일일이 추가해` 만들 수도 있습니다.

```js
type Int = 1 | 2 | 3 | 4 | 5 | ...
```

또는 다음처럼 원소를 서술할 수도 있죠.

```js
interface Identified {
  id: string;
}
```

앞의 인터페이스가 타입 범위 내의 값들이라고 가정하면, 어떤 객체가 string으로 할당 가능한 id 속성을 지니고 있을 때 그 객체는 Identified입니다.

즉, 구조적 타이핑 규칙들은 어떠한 값이 다른 속성도 가질 수 있음을 의미합니다. 심지어 함수 호출의 매개변수에서도 다른 속성을 가질 수 있죠. 이런 사실은 특정 상황에서만 추가 속성을 허용하지 않는 잉여 속성 체크(Excess Property Checking)만 생각하다 보면 간과하기 쉽습니다.

연산과 관련된 이해를 돕기 위한 예제를 볼까요?

```js
interface Person {
  name: string;
}

interface LifeSpan {
  birth: Date;
  death?: Date;
}

type PersonSpan = Person & LifeSpan;
```

`&` 연산자는 두 타입의 인터섹션(Intersection, 교집합)을 계산합니다. 언뜻 Person과 LifeSpan 인터페이스는 공통으로 가지는 속성이 없으므로 PersonSpan 타입을 공집합(never)으로 예상할 수 있죠? 그러나 타입 연산자는 인터페이스의 속성이 아니라 값의 집합(타입의 범위)에 적용되며 추가적인 속성을 가지는 값도 여전히 해당 타입에 속합니다. 따라서 Person과 LifeSpan을 둘 다 가지는 값은 인터섹션 타입에 속하게 돼죠.

```js
const ps: PersonSpan = {
  name: 'Alan Turing',
  birth: new Date('1912/06/23'),
  death: new Date('1954/06/07'),
} // 정상
```
- 선언한 세 타입보다 많은 속성을 가지는 값도 PersonSpan 타입에 속합니다. 인터섹션 타입의 값은 각 타입 내 속성을 `모두 포함`하는 것이 일반적이니까요. 그러나 두 인터페이스의 유니온에서는 그렇지 않습니다.

```js
type K = keyof (Person | LifeSpan); // 타입은 never
```

앞의 유니온 타입에 속하는 값은 어떠한 키도 없으므로 유니온에 대한 keyof는 공집합(never)이어야만 합니다. 좀 더 명확히 하자면 아래와 같죠.

```js
keyof (A & B) = (keyof A) | (keyof B)
keyof (A | B) = (keyof A) & (keyof B)
```
- 이 등식은 타입스크립트의 타입 시스템을 이해하는데 큰 도움이 될 거에요!

일반적으로 PersonSpan 타입을 선언하는 방법은 extends 키워드를 쓰는 것이죠.

```js
interface Person {
  name: string;
}

interface PersonSpan extends Person {
  birth: Date;
  death?: Date;
}
```

타입이 집합이라는 관점에서 extends의 의미는 `~에 할당 가능한`과 비슷하게 `~의 부분 집합`이라는 의미로 받아들일 수 있습니다. PersonSpan 타입의 모든 값은 문자열 name 속성을 가져야 하며, birth 속성까지 가져야 제대로 된 부분 집합이 돼죠.

`서브 타입`이라는 용어를 들어보셨나요? 어떤 집합이 다른 집합의 부분 집합이라는 의미입니다. 이걸 1, 2, 3차원 벡터 관점에서 생각해볼까요?

```js
interface Vector1D { x: number; }
interface Vector2D extends { y: number; };
interface Vector3D extends { z: number; };
```

Vector3D는 Vector2D의 서브타입이고, Vector2D는 Vector1D의 서브 타입(클래스 관점에서는 `서브 클래스`)입니다. 이 관계는 상속 관계로 그려지나, 집합의 관점에서는 벤 다이어그램으로 그리는게 더 적절합니다.

<br>

<div align=center>

  <img src="./images/type_relationships.jpg" width="600">

</div>

<br>

위의 그림을 보면 extends 없이 인터페이스로 코드를 재작성했을 때 부분 집합, 서브 타입, 할당 가능성의 관계가 바뀌지 않음을 명확히 알 수 있습니다.

```js
interface Vector1D { x: number; }
interface Vector2D { x: number; y: number; };
interface Vector3D { x: number; y: number; z: number; };
```
- 집합도, 벤 다이어그램도 바뀌지 않았습니다!

두 스타일 모두 객체 타입에 대해 잘 동작합니다. 하지만 리터럴, 유니온 타입을 생각한다면 집합 스타일(extends)이 훨씬 직관적이죠?

extends 키워드는 제네릭 타입에서 한정자로도 쓰이며, `~의 부분 집합`을 의미하기도 합니다.

```js
function getKey<K extends string>(val: any, key: K) {
  // ...
}
```

string을 상속한다는 의미를 객체 상속의 관점으로 생각하면 이해하기 어려운데, 상속의 관점에서는 객체 래퍼(Wrapper) 타입 String의 서브 클래스를 정의해야 하므로 바람직해 보이진 않죠. 그러나 string을 집합의 관점으로 생각하면 string의 부분 집합 범위를 가지는 어떠한 타입이 됩니다. 이 타입은 string 리터럴 타입, string 리터럴 타입의 유니온, string 자신을 포함합니다.

```js
// 정상, 'x'는 string을 상속
getKey({}, 'x');
// 정상, 'a' | 'b'는 string을 상속
getKey({}, Math.random() < 0.5 ? 'a' : 'b');
// 정상, string은 string을 상속
getKey({}, document.title);
// '12' 형식의 인수는 'string' 형식의 매개변수에 할당될 수 없습니다.
getKey({}, 12);
```

마지막 오류의 `할당될 수 없습니다`를 `상속할 수 없습니다`로 받아들이면 어떤가요? 아무런 문제가 없어 보이죠? 이처럼 할당과 상속의 관점을 전환하자면 객체의 키 타입을 반환하는 keyof T를 이해하기 쉬워집니다.

```js
interface Point {
  x: number;
  y: number;
}

type PointKeys = keyof Point; // 타입은 'x' | 'y'

function sortBy<K extends keyof T, T>(vals: T[], key: K): T[] {
  // ...
}

const pts: Point[] = [{x: 1, y: 1}, {x: 2, y: 0}];
sotyBy(pts, 'x'); // 정상, 'x'는 'x'|'y'를 상속(keyof T)
sortBy(pts, 'y'); // 정상, 'y'는 'x'|'y'를 상속
sortBy(pts, Math.random() < 0.5 ? 'x' : 'y'); // 정상, 'y'는 'x'|'y'를 상속
sortBy(pts, 'z'); // '"z"' 형식의 인수는 '"x" | "y"' 형식의 매개변수에 할당될 수 없습니다.
```

타입들이 엄격한 상속 관계가 아닐 때는 집합 스타일이 더욱 빛을 발합니다. 예를 들어 string | number와 string | Date 사이의 인터섹션은 공집합이 아닌 string이고, 서로의 부분집합도 아닙니다. 이 타입이 엄격한 상속 관계가 아니더라도 범위에 대한 관계는 명확하죠.

<br>

<div align=center>

<img src="./images/union.jpg" width="600">

</div>

<br>

타입이 집합이라는 관점은 배열과 튜플의 관계를 명확하게 합니다.

```js
// 타입은 number[]
const list = [1, 2];
// 'number[]' 타입은 '[number, number]' 타입의 0, 1 속성에 없습니다.
const tuple: [number, number] = list;
```
- 숫자 배열을 숫자들의 쌍(pair)이라 할 수는 없습니다. 빈 리스트나 단일 값만 있을 수 있기 때문이죠. 따라서 number[]는 [number, number]의 부분 집합이 아니므로 할당할 수 없습니다(단, 이 반대로 할당되면 동작됩니다!).

그럼 세 숫자를 가지는 값을 볼까요?

```js
const triple: [number, number, number] = [1, 2, 3];
const double: [number, number] = triple;
// '[number, number, number]' 형식은
// '[number, number]' 형식에 할당할 수 없습니다.
// 'length' 속성의 형식이 호환되지 않습니다.
// '3' 형식은 '2' 형식에 할당할 수 없습니다.
```
- 타입스크립트는 숫자의 쌍을 {0: number, 1: number}로 모델링하지 않고 {0: number, 1: number, length: 2}로 모델링했습니다.
- 따라서 length의 값이 맞지 않아 할당문에 오류가 발생했죠. 이처럼 쌍에서 길이를 체크하는 것은 합리적입니다.

결국 타입의 값이 집합이라는 것은 동일한 값의 집합을 가지는 두 타입은 같다는 의미입니다. 두 타입이 의미적으로 다르고, 우연히 같은 범위를 가진다고 하러다로 같은 타입을 두 번 정의할 이유는 없죠. 하지만 타입스크립트 타입이 되지 못하는 값의 집합들이 있다는 것을 기억해야 하는데, 정수에 대한 타입 또는 x와 y 속성 외에 다른 속석이 없는 객체는 타입스크립트 타입에 존재하지 않기 때문이죠. 가끔 Exclude를 사용해 일부 타입을 제외할 순 있지만, 그 결과가 적절한 타입스크립트 타입일 때만 유효합니다.

```js
type T = Exclude<string|Date, string|number>; // 타입은 Date
type NonZeroNums = Exclude<number, 0>;        // 타입은 number
```

| 타입스크립트 용어   | 집합 용어                        |
| ------------------- | -------------------------------- |
| never               | **∮**(공집합)                    |
| 리터럴 타입         | 원소가 1개인 집합                |
| 값이 T에 할당 가능  | **값 ∈ T**(값이 T의 원소)        |
| T1이 T2에 할당 가능 | **T1 ⊆ T2**(T1이 T2의 부분 집합) |
| T1이 T2를 상속      | **T1 ⊆ T2**(T1이 T2의 부분 집합) |
| T1과 T2의 유니온    | **T1 ∪ T2**(T1과 T2의 합집합)    |
| T1과 T2의 인터섹션  | **T1 ∩ T2**(T1과 T2의 교집합)    |
| unknown             | 전체(universe) 집합              |

<br>

정리하자면, 아래와 같습니다.
- 타입을 값의 집합(타입의 범위)으로 생각하면 좋습니다. 이 집합은 유한(boolean 또는 리터럴 타입)하거나 무한(number 또는 string)합니다.
- 타입스크립트 타입은 엄격한 상속 관계가 아니라 겹쳐지는 집합으로 표현됩니다. 즉, 두 타입은 서로 서브타입이 아니면서도 겹쳐질 수 있습니다.
- 한 객체의 추가적인 속성이 타입 선언에 언급되지 않더라도 그 타입에 속할 수 있습니다.
- 타입 연산은 집합의 범위에 적용됩니다. A와 B의 인터섹션은 A의 범위와 B의 범위의 인터섹션입니다. 객체 타입에서는 A & B인 값이 A와 B의 속성을 모두 가짐을 의미하죠.
- `A는 B를 상속`, `A는 B에 할당 가능`, `A는 B의 서브타입`은 `A는 B의 부분 집합`과 같은 의미입니다.

<br>