// json 내부 여러 key 존재여부 검사
// Check if multiple keys exists in JSON object
const neededKeys = ['oldPassword', 'name', 'newPassword'];
const obj = {
  name: 'admin@test.org',
  oldPassword: '1234',
  newPassword: '12345',
};
console.log(neededKeys.every(key => Object.keys(obj).includes(key)));
