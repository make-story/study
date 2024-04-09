// json 내부 여러 key 존재여부 검사
// Check if multiple keys exists in JSON object
const neededKeys = ['oldPassword', 'name', 'newPassword'];
const obj = {
  name: 'admin@test.org',
  oldPassword: '1234',
  newPassword: '12345',
};
console.log(neededKeys.every(key => Object.keys(obj).includes(key)));

// json 내부 값이 모두 있는지 여부
const filter = {
  test1: '',
  test2: '',
};
console.log(Object.values(filter).every(value => !!value));
