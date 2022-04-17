/**
 * January 1월 JAN. 재뉴워리
 * February 2월 FEB. 페브루어리
 * March 3월 MAR. 마알~치
 * April 4월 APR. 에이프럴
 * May 5월 MAY. 메이
 * June 6월 JUN. 쥰
 * July 7월 JUL. 쥴라이
 * August 8월 AUG. 어거스트
 * September 9월 SEP./SEPT. 쎕템벌
 * October 10월 OCT. 악토벌
 * November 11월 NOV. 노벰벌
 * December 12월 DEC. 디쎔벌 
 */


 /**
  * 사파리(Safari) Date 에러 (Invalid Date)
  */
 // 아래와 같이 String 포맷을 Date에 넣었을 경우 에러 발생   
 new Date('2021-11-15T01:00:00+0900');
 new Date('2022-03-25T02:00:59.999+0900');
 
 // 아래와 같이 해줘야 한다.  
 new Date('2021-11-15T01:00:00+09:00');  
 new Date('2022-03-25T02:00:59.999+09:00');  


 /**
  * milliseconds to date
  */
const time = new Date().getTime(); // get your number
const date = new Date(time); // create Date object
  
console.log(date.toString()); // result: Wed Jan 12 2011 12:42:46 GMT-0800 (PST)

/**
 * 한국시간
 */
export const getKoreaStandardTime = () => {
    // 1. 현재 시간(Locale)
    const date = new Date();

    // 2. UTC 시간 계산
    // getTimezoneOffset() 함수는 현재 사용자 PC 설정 시간대로부터 UTC 시간까지의 차이를 '분'단위로 리턴
    // getTime() 함수는 '1970년 1월1 일 00:00:00 UTC'로부터 주어진 시간 사이의 경과시간(밀리초)를 리턴
    const UTC = date.getTime() + date.getTimezoneOffset() * 60 * 1000;

    // 3. UTC to KST (UTC + 9시간)
    // 한국 시간(KST)은 UTC시간보다 9시간 더 빠름
    const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
    const dateKR = new Date(UTC + KR_TIME_DIFF);

    return dateKR;
};

/**
 * D-Day
 * targetDate: 대상날짜
 * referenceDate: 기준일자(대부분 오늘, 현재)
 */
export const getDDay = (targetDate, { referenceDate = new Date() } = {}) => {
    const result = {
        targetDate: null, // D-Day 대상 날짜
        referenceDate, // 기준일자 (대부분 현재)
        timeDifference: 0, // 시간차이
        day: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    };

    // D-Day 날짜 지정
    targetDate = targetDate instanceof Date ? targetDate : new Date(targetDate);
    // 'Invalid Date' 잘못된 Date 형식 확인
    if (isNaN(targetDate.getTime())) {
        return result;
    }
    result.targetDate = targetDate;

    // D-Day 날짜에서 현재 날짜의 차이를 getTime 메서드를 사용해서 밀리초의 값으로 가져온다.
    result.timeDifference = result.targetDate.getTime() - result.referenceDate.getTime();

    // D-day 날짜의 연,월,일 구하기
    //const dateYear = targetDate.getFullYear();
    //const dateMonth = targetDate.getMonth() + 1; // getMonth 메서드는 0부터 세기 때문에 +1 해준다.
    //const dateDay = targetDate.getDate();

    // Math.floor 함수를 이용해서 근접한 정수값을 가져온다.
    // 밀리초 값이기 때문에 1000을 곱한다.
    // 1000*60 => 60초(1분)*60 => 60분(1시간)*24 = 24시간(하루)
    // 나머지 연산자(%)를 이용해서 시/분/초를 구한다.
    result.day = Math.floor(result.timeDifference / (1000 * 60 * 60 * 24));
    result.hours = Math.floor((result.timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    result.minutes = Math.floor((result.timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    result.seconds = Math.floor((result.timeDifference % (1000 * 60)) / 1000);

    return result;
};