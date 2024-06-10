Number.isInteger(0); // true
Number.isInteger(1); // true
Number.isInteger(-100000); // true
Number.isInteger(99999999999999999999999); // true

Number.isInteger(0.1); // false
Number.isInteger(Math.PI); // false

Number.isInteger(NaN); // false
Number.isInteger(Infinity); // false
Number.isInteger(-Infinity); // false
Number.isInteger('10'); // false
Number.isInteger(true); // false
Number.isInteger(false); // false
Number.isInteger([1]); // false

// 노출시간 '0' -> '00'
const padTo2Digits = value => {
  return value.toString().padStart(2, '0');
};

// 콤마(,) 제거
/*const setRemoveComma = (value) => {
	let valueString = String(value);
	let returnValue = '';
	let substr = '';
    let i;
	for(i=0; i<valueString.length; i++) {
		substr = valueString.substring(i, i+1);
		if(substr != ',') { returnValue += substr; }
	}
	return returnValue;
};*/
const setRemoveComma = value => {
  value = value.toString(); // 문자로 변환
  value = value.replace(/[^0-9.]/g, '');
  return value;
};

// 천 단위 마다 콤마(,) 찍기
/*const setComma = (number) => {
	if(String(number).length > 3) {
		let arr = String(number).split('').join(',').split('');
        let i, j;
		for(i=arr.length-1, j=1; i>=0; i--, j++)  {
            if(j%6 !== 0 && j%2 === 0) {
                arr[i] = '';
            }
        }
		return arr.join('');
	}
	else return number;
};*/
const setComma = value => {
  let reg = /(^[+-]?\d+)(\d{3})/; // 정규식
  value = removeComma(value);
  while (reg.test(value)) {
    value = value.replace(reg, '$1' + ',' + '$2');
  }
  return value;
};
// 소수점 단위 금액
const setFloatFormat = function (number) {
  number = String(number);
  let orgnum = number;
  let arrayOfStrings = [];

  if (number.length > 3) {
    number = number + '.';
  }
  arrayOfStrings = number.split('.');
  number = '' + arrayOfStrings[0];

  if (number.length > 3) {
    let mod = number.length % 3;
    let output = mod > 0 ? number.substring(0, mod) : '';
    let i;
    for (i = 0; i < Math.floor(number.length / 3); i++) {
      if (mod == 0 && i == 0) {
        output += number.substring(mod + 3 * i, mod + 3 * i + 3);
      } else {
        output += ',' + number.substring(mod + 3 * i, mod + 3 * i + 3);
      }
    }
    if (orgnum.indexOf('.') > -1) {
      output += '.' + arrayOfStrings[1];
    }
    return output;
  } else {
    return orgnum;
  }
};
