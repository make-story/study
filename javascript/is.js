

// 정규식 활용 OR
let test = 'test';
if(/^string|number/.test(typeof test)) {
    console.log('OK!');
}


// object {} 활용
const getVaule = (value) => {
    return {
        [value === 0] : 100,
        [value === 'test'] : 'ysm',
        [typeof value === 'object'] : (value.test = 'test'),
    }.test;
};