# 타입스크립트 기초

## 1회차
### `Object is possibly 'undefined'`
> [참고](https://stackoverflow.com/questions/54884488/how-can-i-solve-the-error-ts2532-object-is-possibly-undefined)

- 해결 : 옵셔널 체이닝 사용
  ```ts
  contact.phones[phoneType]?.num
  ```

- 타입 단언(Type Assertion)을 사용하는 것은 안티 패턴이기 때문에... 옵셔널 체이닝을 활용했습니다.

<br>