/**
 * https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Classes
 * 
 * Private class (ES2019, #)
 * https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Classes/Private_class_fields
 * 
 * Public
 * https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Classes/Class_fields
 */

function Student(name) {
	this.name = name;
}
Student.prototype.printName = function() {
	console.log(this.name);
};

var s1 = new Student("수지");
var s2 = new Student("민호");

function School(name) {
	this.name = name;
	this.printName = function() {
		console.log(this.name);
	}
}

var s3 = new School("이학교");
var s4 = new School("저학교");

console.log(s1.printName == s2.printName); // true
console.log(s3.printName == s4.printName); // false 


// 클래스는 호이스팅 안된다!


// 클래스 선언
class Student {
	constructor(name) {
		this.name = name;
	}
}
var s1 = new Student("수지");
console.log(s1.name); // 수지

// 기존 함수 형태
function School(name) {
	this.name = name;
}
var s2 = new School("학교");
console.log(s2.name); // 학교 



// get/set 메소드 (getter / setter)
class Person {
	constructor(name) {
		this._name = name;
	}

	get name() {
		console.log('getter');
		return this._name;
	}

	set name(name) {
		console.log('setter');
		this._name = name;
	}
}

var p = new Person("성민");
console.log(p.name); // 성민
p.name = "진은";
console.log(p.name); // 진은 



// 정적메소드 (static)
class Student {
	constructor(name) {
		this.name = name;
	}

	static findName(student) {
		return student.name;
	}
}

var s = new Student("성민");
var name = Student.findName(s);

console.log(name); // 성민


// 함수 버전
function Student(name) {
	this.name = name;
}
Student.findName = function(student) {
	return student.name;
};

var s = new Student("성민");
var name = Student.findName(s);

console.log(name); // 성민 


// 상속
function A(a) {
	this.a = a;
}
A.prototype.printA = function() {
	console.log(this.a);
}

class B extends A {
	constructor(a, b) {
		super(a);
		this.b = b;
	}

	printB() {
		console.log(this.b);
	}

	static sayHello() {
		console.log("안녕하세요.");
	}
}

class C extends B {
	constructor(a, b, c) {
		super(a, b);
		this.c = c;
	}

	printC() {
		console.log(this.c);
	}

	printAll() {
		this.printC(); // 3
		super.printB(); // 2 (부모 호출)
		super.printA(); // 1 (부모 호출)
	}
}

var obj = new C(1, 2, 3);
obj.printAll();

C.sayHello(); // 안녕하세요. 



// Private (프라이빗)
class ClassWithPrivateField {
	#privateField
}
  
class ClassWithPrivateMethod {
	#privateMethod() {
		return 'hello world'
	}
}
  
class ClassWithPrivateStaticField {
	static #PRIVATE_STATIC_FIELD
}