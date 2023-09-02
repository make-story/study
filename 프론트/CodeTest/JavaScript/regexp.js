/**
 * 정규식 RegExp
 */

// 문자열에서 일치하는 조건 추출
const regx = new RegExp("([0-9]+)\\(([a-z]+)\\)");
regx.exec("10(hi)");