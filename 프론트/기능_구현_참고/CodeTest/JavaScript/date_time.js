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

export const MILLISECONDS_SECOND = 1000; // 1000 = 1초 (밀리초 값이기 때문에 1000)
export const MILLISECONDS_MINUTE = 60 * MILLISECONDS_SECOND; // 1초 * 60 = 1분
export const MILLISECONDS_HOUR = 60 * MILLISECONDS_MINUTE; // 60초(1분) * 60 = 1시간
export const MILLISECONDS_DAY = 24 * MILLISECONDS_HOUR; // 60분(1시간) * 24 = 1일

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
 * '0' > '00'
 */
export const padTo2Digits = (value, { length = 2 } = {}) => {
  return value.toString().padStart(length, '0');
};

/**
 * milliseconds -> 시, 분, 초 변환
 */
export const changeMsToTime = milliseconds => {
  // new Date(milliseconds).toISOString().slice(11, 19); // HH:MM:SS
  let seconds = Math.floor(milliseconds / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);

  seconds = seconds % 60;
  minutes = minutes % 60;
  hours = hours % 24;

  return {
    hours: padTo2Digits(hours),
    minutes: padTo2Digits(minutes),
    seconds: padTo2Digits(seconds),
  };
};

/**
 * 24시간제 -> 12시간제
 */
export const convert24HourTo12HourFormat = time => {
  if (time === null || time === undefined || time === '') {
    return '';
  }

  const list = time?.split(':');
  let hour = Number(list?.[0]);
  hour = hour > 12 ? hour - 12 : hour;
  const minute = list?.[1];
  const econds = list?.[2] ? `:${list?.[2]}` : '';

  return `${hour}:${minute}${econds}`;
};

/**
 * 한국시간
 */
/**
 * 한국시간 - KST(Korea Standard Time, 한국 표준 시)
 */
export const getKoreaStandardTime = () => {
  // 현재 시간(Locale, 서버시간)
  const date = new Date();

  // UTC 시간 계산 - UTC(Coordinated Universal Time, 협정 세계시)
  // getTimezoneOffset() 함수는 현재 사용자 PC 설정 시간대로부터 UTC 시간까지의 차이를 '분'단위로 리턴
  // getTime() 함수는 '1970년 1월1 일 00:00:00 UTC'로부터 주어진 시간 사이의 경과시간(밀리초)를 리턴
  const localTimeOffset = date.getTimezoneOffset() * 60 * 1000;
  const utc = date.getTime() + localTimeOffset;

  // UTC to KST (UTC + 9시간) - KST(Korea Standard Time, 한국 표준 시)
  // 한국 시간(KST)은 UTC 시간보다 9시간 더 빠름
  const kstTimeOffset = 9 * 60 * 60 * 1000;
  const kst = new Date(utc + kstTimeOffset);

  //kst.toString(); // "2024-07-21T09:12:01.466Z"

  return kst;
};

/**
 * 24시(자정)까지 남은 시간(분)
 */
export const getMidnightMinutes = (now = new Date()) => {
  const midnight = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    23,
    59,
    0,
  );
  const difference = midnight.getTime() - now.getTime(); // 밀리 초
  let minutes = Math.ceil(difference / (1000 * 60)); // 분
  if (minutes <= 0) {
    minutes = 60 * 24; // 24시간(분)
  }
  return minutes;
};

/**
 * D-Day
 * targetDate: 대상날짜
 * referenceDate: 기준일자(대부분 오늘, 현재)
 */
export const getDDay = (targetDate, { referenceDate = new Date() } = {}) => {
  let result = {
    targetTimestamp: 0, // D-Day 대상 날짜
    referenceTimestamp: 0, // 기준일자 (대부분 현재)
    totalMilliseconds: 0, // 시간차이
    day: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    totalDays: 0,
    totalHours: 0,
    totalMinutes: 0,
    totalSeconds: 0,
  };

  // D-Day 날짜 지정
  targetDate = targetDate instanceof Date ? targetDate : new Date(targetDate);
  // 'Invalid Date' 잘못된 Date 형식 확인
  if (isNaN(targetDate.getTime())) {
    throw 'targetDate error!';
  } else if (isNaN(referenceDate.getTime())) {
    throw 'referenceDate error!';
  }

  // D-Day 날짜에서 현재 날짜의 차이를 getTime 메서드를 사용해서 밀리초의 값으로 가져온다.
  const targetTimestamp = targetDate.getTime();
  const referenceTimestamp = referenceDate.getTime();
  const totalMilliseconds = targetTimestamp - referenceTimestamp;

  // D-day 날짜의 연,월,일 구하기
  //const dateYear = targetDate.getFullYear();
  //const dateMonth = targetDate.getMonth() + 1; // getMonth 메서드는 0부터 세기 때문에 +1 해준다.
  //const dateDay = targetDate.getDate();

  // Math.floor 함수를 이용해서 근접한 정수값을 가져온다.
  result = {
    ...result,
    targetTimestamp,
    referenceTimestamp,
    totalMilliseconds,
    day: Math.floor(totalMilliseconds / MILLISECONDS_DAY),
    hours: Math.floor(
      (totalMilliseconds % MILLISECONDS_DAY) / MILLISECONDS_HOUR,
    ),
    minutes: Math.floor(
      (totalMilliseconds % MILLISECONDS_HOUR) / MILLISECONDS_MINUTE,
    ),
    seconds: Math.floor(
      (totalMilliseconds % MILLISECONDS_MINUTE) / MILLISECONDS_SECOND,
    ),
    totalDays: Math.floor(totalMilliseconds / MILLISECONDS_DAY),
    totalHours: Math.floor(totalMilliseconds / MILLISECONDS_HOUR),
    totalMinutes: Math.floor(totalMilliseconds / MILLISECONDS_MINUTE),
    totalSeconds: Math.floor(totalMilliseconds / MILLISECONDS_SECOND),
  };

  return result;
};

/**
 * 날짜 차이
 */
export const getDateDiff = (
  future = new Date('2019-3-01'),
  { referenceDate = new Date() } = {},
) => {
  const date = future instanceof Date ? future : new Date(future);
  const timeDifference = new Date(date.getTime() - referenceDate.getTime());
  return {
    timeDifference,
    year: timeDifference.getUTCFullYear() - 1970,
    month: timeDifference.getUTCMonth(),
    day: timeDifference.getUTCDate() - 1,
    hour: timeDifference.getUTCHours(),
    minute: timeDifference.getUTCMinutes(),
    second: timeDifference.getUTCSeconds(),
  };
};
export const getDatetimeDifference = (baseDate, targetDate) => {
  if (baseDate instanceof Date && targetDate instanceof Date) {
    const timestamp = Math.abs(baseDate.getTime() - targetDate.getTime());
    return {
      year: baseDate.getFullYear() - targetDate.getFullYear(),
      month: baseDate.getMonth() - targetDate.getMonth(),
      days: baseDate.getDate() - targetDate.getDate(),
      hours: baseDate.getHours() - targetDate.getHours(),
      minutes: baseDate.getMinutes() - targetDate.getMinutes(),
      seconds: baseDate.getSeconds() - targetDate.getSeconds(),
      totalDays: Math.floor(timestamp / MILLISECONDS_DAY),
      totalHours: Math.floor(timestamp / MILLISECONDS_HOUR),
      totalMinutes: Math.floor(timestamp / MILLISECONDS_MINUTE),
      totalSeconds: Math.floor(timestamp / MILLISECONDS_SECOND),
    };
  }
};

/**
 * 날짜 숫자 변경
 */
export const getFormatterLegend = value => {
  // YYYY-MM-DD HH:MM:SS
  const date = new Date(value);
  if (
    date instanceof Date &&
    !isNaN(date) /* && date.toString() !== 'Invalid Date'*/
  ) {
    return `${('0' + (date.getMonth() + 1)).slice(-2)}/${(
      '0' + date.getDate()
    ).slice(-2)} ${('0' + date.getHours()).slice(-2)}:${(
      '0' + date.getMinutes()
    ).slice(-2)}`;
  } else {
    return value;
  }
};

/**
 * 'yyyyMMddHHmmss' 날짜 포맷 > new Date 변환
 */
export const getConvertDateInstance = yyyyMMddHHmmss => {
  const stringParseInt = text => parseInt(text || 0, 10); // '00' > 0 변환
  if (typeof yyyyMMddHHmmss === 'string' && 8 <= yyyyMMddHHmmss.length) {
    return new Date(
      ...[
        yyyyMMddHHmmss.substring(0, 4),
        yyyyMMddHHmmss.substring(4, 6) - 1, // 월은 0부터 시작하므로 1을 빼줍니다.
        yyyyMMddHHmmss.substring(6, 8),
        yyyyMMddHHmmss.substring(8, 10),
        yyyyMMddHHmmss.substring(10, 12),
        yyyyMMddHHmmss.substring(12, 14),
      ].map(stringParseInt),
    );
  } else {
    return new Date();
  }
};

/**
 * timestamp (유닉스 시간) > 사람이 인지 가능한 날짜포맷
 */
export const getTimestampConvertDatetime = (timestamp = Date.now()) => {
  const date = new Date(timestamp);
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    days: date.getDate(),
    hours: date.getHours(),
    minutes: date.getMinutes(),
    seconds: date.getSeconds(),
  };
};

/**
 * timestamp (유닉스 시간) 값 디버깅(console.log) 출력을 위한 용도
 */
export const getTimestampDebug = (timestamp = Date.now()) => {
  //const timestamp = Date.now();
  //console.log(timestamp);
  //console.log(new Date(timestamp).getTime());
  const date = getTimestampConvertDatetime(timestamp);
  return [
    [date.year, padTo2Digits(date.month), padTo2Digits(date.days)].join('-'),
    [
      padTo2Digits(date.hours),
      padTo2Digits(date.minutes),
      padTo2Digits(date.seconds),
    ].join(':'),
  ].join(' ');
};

/**
 * 지정한 날짜 찾기 (몇년 전/후, 몇달 전/후, 몇시간 전/후, 몇분 전/후 등)
 */
export const getFindDate = (parmas = {}) => {
  let { date = new Date() } = parmas;

  for (const [key, value] of Object.entries(parmas)) {
    if (typeof value !== 'number') {
      continue;
    }
    switch (key) {
      case 'year':
        date = new Date(date.setFullYear(date.getFullYear() + value));
        break;
      case 'month':
        date = new Date(date.setMonth(date.getMonth() + value));
        break;
      case 'days':
        date = new Date(date.setDate(date.getDate() + value));
        break;
      case 'hours':
        date = new Date(date.setHours(date.getHours() + value));
        break;
      case 'minutes':
        date = new Date(date.setMinutes(date.getMinutes() + value));
        break;
      case 'seconds':
        date = new Date(date.setSeconds(date.getSeconds() + value));
        break;
    }
  }

  return date;
};
