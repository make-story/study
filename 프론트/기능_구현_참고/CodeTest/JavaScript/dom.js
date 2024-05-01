// 1. 연관배열(유사 배열 객체) -> 일반 배열형태 변환하여 사용 : Array 관련 기능 사용을 위함
const arr1 = [...document.querySelectorAll('p')];
arr1.find(element => {});
const arr2 = Array.from(document.querySelectorAll('p'));
arr2.find(element => {});

// 2. 셀렉터 재활용
const $ = document.querySelector.bind(document);
$('#container');
const $$ = document.querySelectorAll.bind(document);
$$('p');
