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