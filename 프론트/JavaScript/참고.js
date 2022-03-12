
// dynamic import 
import('./dynamic').then(function() {
    console.log('dynamic');
}).catch(function(err) {
    console.error('dynamic error', err);
});


// bind
if (!Function.prototype.bind) {
    Function.prototype.bind = function(oThis) {
        if(typeof this !== 'function') {
            // ECMAScript 5 내부 IsCallable 함수와
            // 가능한 가장 가까운 것
            throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
        }
  
        var args = Array.prototype.slice.call(arguments, 1), // this, param, param, .. (this 를 제외한 파라미터값)
            thisFunction = this,
            tempFunction    = function() {},
            returnFunction  = function() {
            return thisFunction.apply(this instanceof tempFunction
                   ? this
                   : oThis,
                   aArgs.concat(Array.prototype.slice.call(arguments)));
            };
  
        // prototype 연결
        // https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Inheritance_and_the_prototype_chain
        if(this.prototype) {
            //returnFunction.prototype = Object.create(this.prototype); // 객체 딥 복사
            //returnFunction.prototype.constructor = returnFunction;

            // Function.prototype은 prototype 속성이 없음
            tempFunction.prototype = this.prototype;
        }
        // 프로토타입 체이닝을 이용한 상속 후 부모객체 prototype 를 추가/수정하면 자식 prorotype 영향이 있으므로, 임시 함수를 만들고 new 키워드로 연결고리를 제거
        /*
        returnFunction.prototype = this.prototype; // 프로토타입 상속
        this.prototype.test = 'test'; // 상속 후 부모 prorotype 수정 발생시 자식에게까지 영향
        */
        returnFunction.prototype = new tempFunction();

        return returnFunction;
    };
}

Function.prototype.bind2 = function() {
    var thisFunction = this;
    var args = Array.prototype.slice.call(arguments, 1);
    var that = arguments[0];
    return function() {
        thisFunction.apply(that, args.concat(Array.prototype.slice.call(arguments)));
    };
};

function setTest() {
    console.log(this);
}
var test = setTest.bind2('ysm');
test();


// Currying
Function.prototype.curry = function(one) {
    var func = this;
    var argsLength = func.length;
    var args = [];
    function next(nextOne) {
        // 파라미터를 담고 있는다.
        args = args.concat(nextOne);
        if(args.length === argsLength) {
            // 파라미터 값이 모두 들어오면 최종 실행
            return func.apply(null, args);
        }else {
            // 인자를 하나씩 받는다.
            return function(nextOne) { 
                return next(nextOne);
            };
        }
    }
    return next(one);
};
function four(a, b, c, d) {
    return a + b + c + d;
}
console.log(four.curry(1)(2)(3)(4));


function sumOfThreeThings(x, y, z) {
    return x + y + z;
  }
const sumOfThreeThings = x =>
  y =>
    z =>
      x + y + z;
sumOfThreeThings(1)(2)(3); // 6



// partial application
var plus = function(a, b, c) {
    return a + b + c;
};
Function.prototype.partial = function() {
    var self = this;
    var args = Array.prototype.slice.call(arguments);
    //var args = [].slice.call(arguments);
    //var args = Array.from(arguments);
    //var args = [...arguments];
    return function() {
        return self.apply(null, args.concat(Array.prototype.slice.call(arguments)));
    }
};
var plusa = plus.partial(1);
console.log(plusa(2, 3)); // 6


// 고차함수
const isEven = x => !(x % 2);

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const evenNumbers = numbers.filter(isEven);

console.log(evenNumbers); // 2, 4, 6, 8, 10



// 합성함수
const compose = (f, g) => x => f(g(x));

const add = x => y => x + y;
const pow = x => y => y ** x;

const add2 = add(2);
const square = pow(2);

const add2ThenSqaure = compose(square, add2);

add2ThenSquare(10); // 144



// Monads
// Implementation
Array.prototype.chain = function (f) {
    return this.reduce((acc, it) => acc.concat(f(it)), []);
  }
  
  // Usage
  Array.of('cat,dog', 'fish,bird').chain(e => e.split(',')); // ['cat', 'dog', 'fish', 'bird']
  
  // Difference with map
  Array.of('cat,dog', 'fish,bird').map(e => e.split(',')); // [['cat', 'dog'], ['fish', 'bird']]
