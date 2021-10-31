

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
 * 
 */
