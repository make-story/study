# 불변성, 불변객체 만들기

## ECMA5

### Object.seal(object)

https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/seal

기존 속성의 특성 수정을 방지하고 새 속성의 추가를 방지합니다.

### Object.freeze(object)

https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze

기존 속성 특성 및 값에 대한 수정을 방지하고 새 속성의 추가를 방지합니다.

### Object.preventExtensions(object)

개체에 대한 새 속성 추가를 방지합니다.

### Object.isSealed(object)

기존 속성 특성을 개체에서 수정할 수 없고 개체에 새 속성을 추가할 수 없는 경우 true를 반환합니다.

### Object.isFrozen(object)

기존 속성 특성 및 값을 개체에서 수정할 수 없고 개체에 새 속성을 추가할 수 없는 경우 true를 반환합니다.

### Object.isExtensible(object)

새 속성을 개체에 추가할 수 있는지 여부를 나타내는 값을 반환합니다.

## ECMA6

### Reflect.isExtensible(object)

Reflect.isExtensible() 는 확장 가능한 객체인지, 즉 이 객체에 새로 프로퍼티를 추가할 수 있는지 확인하는 메소드다.

자바스크립트 객체는 Object.preventExtensions(), Object.freeze(), Object.seal() 메소드로 더 이상 확장할 수 없게 고정할 수 있다.  
이 메소드는 Object.isExtensible() 과 같다.

```javascript
var obj = {
  name: "성민",
};

console.log(Reflect.isExtensible(obj)); // true

Object.preventExtensions(obj);

console.log(Reflect.isExtensible(obj)); // false
```

### Reflect.preventExtensions(object)

Reflect.preventExtensions() 는 객체를 확장할 수 없게 하는 메소드다.  
처리 결과를 true/false 로 반환한다.  
이 메소드는 Object.preventExtensions() 과 같다.

```javascript
var obj = {
  name: "성민",
};

console.log(Reflect.isExtensible(obj)); // true

console.log(Reflect.preventExtensions(obj)); // true

console.log(Reflect.isExtensible(obj)); // false
```
