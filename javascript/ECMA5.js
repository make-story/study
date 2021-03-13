
/*
Object.create(prototype, descriptors) - 지정된 프로토타입을 포함하고 선택적으로 지정된 속성을 포함하는 개체를 만듭니다.
prototype
필수 요소. 프로토타입으로 사용할 개체입니다. null 일 수 있습니다.
descriptors
선택 사항입니다. 하나 이상의 속성 설명자를 포함하는 JavaScript 개체입니다.
데이터 속성은 값을 가져오고 설정할 수 있는 속성입니다. 데이터 속성 설명자에는 value 특성과 writable, enumerable 및 configurable 특성이 포함됩니다. 마지막 세 가지 특성이 지정되지 않은 경우 false가 기본값이 됩니다. 접근자 속성은 값을 검색하거나 설정할 때마다 사용자가 제공한 함수를 호출합니다. 접근자 속성 설명자에는 set 특성, get 특성 또는 두 특성이 모두 포함됩니다. 


Object.defineProperty(object, propertyname, descriptor) - 개체에 속성을 추가하거나 기존 속성의 특성을 수정합니다.
object
필수 요소. 속성을 추가하거나 수정할 개체입니다. 기본 JavaScript 개체 즉, 사용자 정의 개체나 기본 제공 개체 또는 DOM 개체일 수 있습니다.
propertyname
필수 요소. 속성 이름을 포함하는 문자열입니다.
descriptor
필수 요소. 속성에 대한 설명입니다. 데이터 속성이나 접근자 속성에 사용할 수 있습니다.


Object.defineProperties(object, descriptors) - 하나 이상의 속성을 개체에 추가하고/또는 기존 속성의 특성을 수정합니다.
object
필수 요소. 속성을 추가 또는 수정할 개체입니다. 이 개체는 네이티브JavaScript 개체 또는 DOM 개체일 수 있습니다.
descriptors
필수 요소. 하나 이상의 설명자 개체를 포함하는 JavaScript 개체입니다. 각 설명자 개체는 데이터 속성 또는 접근자 속성을 설명합니다.


Object.getPrototypeOf(object) - 개체의 프로토타입을 반환합니다.


Object.keys(object) - 개체의 열거 가능한 속성 및 메서드 이름을 반환합니다.
// From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
if (!Object.keys) {
  Object.keys = (function() {
    'use strict';
    var hasOwnProperty = Object.prototype.hasOwnProperty,
        hasDontEnumBug = !({ toString: null }).propertyIsEnumerable('toString'),
        dontEnums = [
          'toString',
          'toLocaleString',
          'valueOf',
          'hasOwnProperty',
          'isPrototypeOf',
          'propertyIsEnumerable',
          'constructor'
        ],
        dontEnumsLength = dontEnums.length;

    return function(obj) {
      if (typeof obj !== 'object' && (typeof obj !== 'function' || obj === null)) {
        throw new TypeError('Object.keys called on non-object');
      }

      var result = [], prop, i;

      for (prop in obj) {
        if (hasOwnProperty.call(obj, prop)) {
          result.push(prop);
        }
      }

      if (hasDontEnumBug) {
        for (i = 0; i < dontEnumsLength; i++) {
          if (hasOwnProperty.call(obj, dontEnums[i])) {
            result.push(dontEnums[i]);
          }
        }
      }
      return result;
    };
  }());
}


Object.seal(object) - 기존 속성의 특성 수정을 방지하고 새 속성의 추가를 방지합니다.


Object.freeze(object) - 기존 속성 특성 및 값에 대한 수정을 방지하고 새 속성의 추가를 방지합니다.


Object.preventExtensions(object) - 개체에 대한 새 속성 추가를 방지합니다.


Object.isSealed(object) - 기존 속성 특성을 개체에서 수정할 수 없고 개체에 새 속성을 추가할 수 없는 경우 true를 반환합니다.


Object.isFrozen(object) - 기존 속성 특성 및 값을 개체에서 수정할 수 없고 개체에 새 속성을 추가할 수 없는 경우 true를 반환합니다.


Object.isExtensible(object) - 새 속성을 개체에 추가할 수 있는지 여부를 나타내는 값을 반환합니다.


Object.getOwnPropertyDescriptor(object, propertyname) - 지정한 개체의 고유 속성 설명자를 가져옵니다. 고유 속성 설명자는 개체에 직접 정의되며 개체의 프로토타입으로부터 상속되지 않습니다.
object
필수 요소. 속성이 포함된 개체입니다.
propertyname
필수 요소. 속성 이름


Object.getOwnPropertyNames(object) - 개체의 고유 속성 이름을 반환합니다. 개체의 고유 속성은 해당 개체에 직접 정의된 속성이며, 개체의 프로토타입으로부터 상속되지 않습니다. 개체의 속성에는 필드(개체) 및 함수가 모두 포함됩니다.


Array.isArray(object) - 개체가 배열인지 여부를 확인합니다.


Function.prototype.bind - 지정된 함수에 대해 원본 함수와 동일한 본문을 갖는 바인딩된 함수를 만듭니다. 바운드 함수에서 this 개체는 개체에 전달된 것으로 확인됩니다. 바인딩된 함수에는 지정된 초기 매개 변수가 있습니다.
MSDN표기 : function.bind(thisArg[,arg1[,arg2[,argN]]])
function
필수입니다. 함수 개체입니다.
thisArg
필수입니다. this 키워드가 새 함수 내에서 참조할 수 있는 개체입니다.
arg1[,arg2[,argN]]]
선택 사항 새 함수에 전달될 인수 목록입니다.


Array.prototype.indexOf - 배열에서 맨 처음 나오는 값의 인덱스를 반환합니다.
MSDN표기 : array1.indexOf(searchElement[, fromIndex])
array1
필수 요소. Array 개체입니다.
searchElement
필수 요소. array1에서 찾을 값입니다.
fromIndex
선택 사항입니다. 검색을 시작할 배열 인덱스입니다. fromIndex가 생략되면 검색이 인덱스 0에서 시작됩니다.


Array.prototype.lastIndexOf - 배열에서 마지막으로 나오는 지정된 값의 인덱스를 반환합니다.
MSDN표기 : array1.lastIndexOf(searchElement[, fromIndex])
array1
필수 요소. 검색할 array 개체입니다.
searchElement
필수 요소. array1에서 찾을 값입니다.
fromIndex
선택 사항입니다. 검색을 시작할 배열 인덱스입니다. fromIndex가 생략되면 검색이 배열의 마지막 인덱스에서 시작됩니다.


Array.prototype.every - 배열의 모든 멤버가 지정한 테스트를 충족하는지 여부를 확인합니다.
MSDN표기 : array1.every(callbackfn[, thisArg])
array1
필수 요소. Array 개체입니다.
callbackfn
필수 요소. 최대 3개까지 인수를 허용하는 함수입니다. every 메서드는 callbackfn에서 false를 반환하거나 배열이 끝날 때까지 array1의 각 요소에 대해 callbackfn 함수를 호출합니다.
thisArg
선택 사항입니다. this 키워드가 callbackfn 함수에서 참조할 수 있는 개체입니다. thisArg가 생략되면 undefined가 this로 사용됩니다.


Array.prototype.some - 배열의 모든 요소에 대해 지정된 콜백 함수가 true를 반환하는지 여부를 결정합니다.
MSDN표기 : array1.some(callbackfn[, thisArg])
array1
필수 요소. Array 개체입니다.
callbackfn
필수 요소. 최대 3개까지 인수를 허용하는 함수입니다. some 메서드는 callbackfn에서 true를 반환하거나 배열이 끝날 때까지 array1의 각 요소에 대해 callbackfn 함수를 호출합니다.
thisArg
선택 사항입니다. this 키워드가 callbackfn 함수에서 참조할 수 있는 개체입니다. thisArg가 생략되면 undefined가 this로 사용됩니다.


Array.prototype.forEach - 배열의 각 요소에 대해 지정된 작업을 수행합니다.
MSDN표기 : array1.forEach(callbackfn[, thisArg])
array1
필수입니다. 배열 개체입니다.
callbackfn
필수입니다. 최대 3개의 인수를 받아들이는 함수입니다. forEach는 배열에 있는 각 요소마다 한 번씩 callbackfn 함수를 호출합니다.
thisArg
선택 사항 this 키워드가 callbackfn 함수에서 참조할 수 있는 개체입니다. thisArg가 생략되면 undefined가 this 값으로 사용됩니다.


Array.prototype.map - 배열의 각 요소에 대해 정의된 콜백 함수를 호출하고 결과가 포함되어 있는 배열을 반환합니다.
MSDN표기 : array1.map(callbackfn[, thisArg])
array1
필수입니다. 배열 개체입니다.
callbackfn
필수입니다. 최대 3개의 인수를 받아들이는 함수입니다. map 메서드는 배열에 있는 각 요소마다 한 번씩 callbackfn 함수를 호출합니다.
thisArg
선택 사항 this 키워드가 callbackfn 함수에서 참조할 수 있는 개체입니다. thisArg가 생략되면 undefined가 this 값으로 사용됩니다.


Array.prototype.filter - 콜백 함수에 지정된 조건을 충족하는 배열의 요소를 반환합니다.
MSDN표기 : array1.filter(callbackfn[, thisArg])
array1
필수 요소. Array 개체입니다.
callbackfn
필수 요소. 최대 3개까지 인수를 허용하는 함수입니다. filter 메서드는 배열에 있는 각 요소마다 한 번씩 callbackfn 함수를 호출합니다.
thisArg
선택 사항입니다. this 키워드가 callbackfn 함수에서 참조할 수 있는 개체입니다. thisArg가 생략되면 undefined가 this로 사용됩니다.


Array.prototype.reduce - 배열의 모든 요소에 대해 지정된 콜백을 호출합니다. 콜백 함수의 반환 값은 결과에 누적되며 다음에 콜백 함수를 호출할 때 인수로 제공됩니다.
MSDN표기 : array1.reduce(callbackfn[, initialValue])
array1
필수 요소. Array 개체입니다.
callbackfn
필수 요소. 최대 4개까지 인수를 허용하는 함수입니다. reduce 메서드는 배열에 있는 각 요소마다 한 번씩 callbackfn 함수를 호출합니다.
initialValue
선택 사항입니다. initialValue가 지정된 경우 누적을 시작하는 초기 값으로 사용됩니다. callbackfn 함수에 대한 첫 번째 호출은 이 값을 배열 값 대신 인수로 제공합니다.


Array.prototype.reduceRight - 배열의 모든 요소에 대해 지정된 콜백을 내림차순으로 호출합니다. 콜백 함수의 반환 값은 결과에 누적되며 다음에 콜백 함수를 호출할 때 인수로 제공됩니다.
MSDN표기 : array1.reduceRight(callbackfn[, initialValue])
array1
필수 요소. Array 개체입니다.
callbackfn
필수 요소. 최대 4개까지 인수를 허용하는 함수입니다. reduceRight 메서드는 배열에 있는 각 요소마다 한 번씩 callbackfn 함수를 호출합니다.
initialValue
선택 사항입니다. initialValue가 지정된 경우 누적을 시작하는 초기 값으로 사용됩니다. callbackfn 함수에 대한 첫 번째 호출은 이 값을 배열 값 대신 인수로 제공합니다.
*/

