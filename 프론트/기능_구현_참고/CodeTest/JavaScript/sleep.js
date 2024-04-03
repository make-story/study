/**
 * 코드 실행 지연
 * https://www.daleseo.com/js-sleep/
 */

const sleep1 = function (milliSeconds) {
  var startTime = new Date().getTime(); // get the current time
  while (new Date().getTime() < startTime + milliSeconds); // hog cpu
};
// sleep(10000);

const sleep2 = function (time) {
  return new Promise(resolve => {
    setTimeout(resolve, time);
  });
};
// await sleep(200);
