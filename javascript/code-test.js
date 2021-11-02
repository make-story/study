

/**
 * 반복되는 숫자가 몇번나오는지 카운트
 */
const input = '44433322222';
const list = input.split('');
//const list = ['a', 'b', 'a', 'b', 'c'];
const result = {};

// forEach
list.forEach((x) => { 
  result[x] = (result[x] || 0)+1; 
});

// reduce
result = list.reduce((accu, curr) => { 
    accu[curr] = (accu[curr] || 0)+1; 
    return accu;
}, {});

// Map
result = list.reduce((accu,curr)=> {
    accu.set(curr, (accu.get(curr)||0) +1) ;
    return accu;
},new Map());
for (let [key, value] of result.entries()) {
    document.write(key + ' : ' + value + '<br>');
}


/**
 * 배열 내부 정보 선택 제거
 * https://stackoverflow.com/questions/5767325/how-can-i-remove-a-specific-item-from-an-array
 */
const list = [
    { code: 'a' },
    { code: 'a' },
    { code: 'b' },
    { code: 'c' },
    { code: 'c' },
    { code: 'd' },
];
const setListRemoveItem = (list, key, value) => {
    let index = 0;
    while (index < list.length) {
        if (list[index][key] === value) {
            // 배열에서 제거
            list.splice(index, 1);
        } else {
            ++index;
        }
    }
    return list;
};

