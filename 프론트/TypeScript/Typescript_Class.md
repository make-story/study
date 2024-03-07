## Class

`인터페이스로 클래스를 정의하는 경우, implements 키워드를 사용`

```typescript
interface IUser {
  name: string;
  getName(): string;
}

class User implements IUser {
  constructor(public name: string) {}
  getName() {
    return this.name;
  }
}

const neo = new User('Neo');
neo.getName(); // Neo
```

Construct signature  
`new 키워드를 사용해야 하는 경우`

```typescript
interface ICat {
  name: string;
}
interface ICatConstructor {
  new (name: string): ICat; // Construct signature
}

class Cat implements ICat {
  constructor(public name: string) {}
}
function makeKitten(c: ICatConstructor, n: string) {
  return new c(n); // ok
}

const kitten = makeKitten(Cat, 'Lucy');
console.log(kitten);
```
