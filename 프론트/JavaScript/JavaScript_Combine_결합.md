# 결합 (combine)

https://www.altcademy.com/blog/how-to-combine-two-arrays-in-javascript/

```javascript
const fruits = ["apple", "banana", "cherry"];
const veggies = ["carrot", "broccoli", "spinach"];
```

## Concat

```javascript
const fruits = ["apple", "banana", "cherry"];
const veggies = ["carrot", "broccoli", "spinach"];

const combined = fruits.concat(veggies);

console.log(combined);
// Output: ['apple', 'banana', 'cherry', 'carrot', 'broccoli', 'spinach']
```

## Spread operator

```javascript
const fruits = ["apple", "banana", "cherry"];
const veggies = ["carrot", "broccoli", "spinach"];

const combined = [...fruits, ...veggies];

console.log(combined);
// Output: ['apple', 'banana', 'cherry', 'carrot', 'broccoli', 'spinach']
```

## Push.apply

```javascript
const fruits = ["apple", "banana", "cherry"];
const veggies = ["carrot", "broccoli", "spinach"];

Array.prototype.push.apply(fruits, veggies);

console.log(fruits);
// Output: ['apple', 'banana', 'cherry', 'carrot', 'broccoli', 'spinach']
```

## forEach and push

```javascript
const fruits = ["apple", "banana", "cherry"];
const veggies = ["carrot", "broccoli", "spinach"];

veggies.forEach(function (item) {
  fruits.push(item);
});

console.log(fruits);
// Output: ['apple', 'banana', 'cherry', 'carrot', 'broccoli', 'spinach']
```

## Array.from and map

```javascript
const fruits = ["apple", "banana", "cherry"];
const veggies = ["carrot", "broccoli", "spinach"];

const combined = Array.from(new Set([...fruits, ...veggies]));

console.log(combined);
// Output: ['apple', 'banana', 'cherry', 'carrot', 'broccoli', 'spinach']
```

---

# URL path 에 파라미터 결합

```javascript
function combine(path, query) {
  const keys = Object.keys(query);

  if (keys.length) {
    const qp = keys.reduce(
      (params, key) => [...params, `${key}=${query[key]}`],
      []
    );
    return `${path}?${qp.join("&")}`;
  }

  return path;
}

// combine(req.path, req.query);
```
