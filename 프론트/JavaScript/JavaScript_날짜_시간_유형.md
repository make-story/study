# JavaScript 에서 Date 는 유닉스 타임스탬프를 사용 - 날짜 / 시간

`study.git/프론트/기능_구현_참고/CodeTest/JavaScript/date_time.js` 참고!

https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Date

JavaScript 날짜의 기반은 1970년 1월 1일 UTC 자정과의 시간 차이를 밀리초 단위로 나타낸 것

https://pks2974.medium.com/javascript-%EC%99%80-date-%EB%82%A0%EC%A7%9C-cf638c05f8f3

Date 객체에 전달되는 인자의 형태에 따라서 해석되는데  
Date.parse() 메서드가 해석할 수 있어야 하는 RFC2822 또는 ISO 8601 날짜를 나타내는 문자열 이나 UTC 기준의 숫자값 이어야 한다.

https://www.ietf.org/rfc/rfc2822  
https://ko.wikipedia.org/wiki/ISO_8601

만약 해석할 수 없는 값이 전달되면, RangeError 가 내부에서 발생되며, Invalid Date 가 생성된다.

```javascript
var a = new Date(1558311020000);
var b = new Date('2019-05-20T00:10:20.000Z');
var c = new Date('2019-05-20 09:10:20');
var d = new Date('Mon May 20 2019 09:10:20 GMT+0900');
var e = new Date(2019, 4, 20, 9, 10, 20);

console.log(a.getTime() === b.getTime());
console.log(b.getTime() === c.getTime());
console.log(c.getTime() === d.getTime());
// true
```

## Unix Time

Unix time 은 POSIX 시간이나 Epoch 시간이라고 부르기도 한다.  
1970년 1월 1일 00:00:00 협정 세계시(UTC) 부터의 경과 시간을 초로 환산하여 정수로 나타낸다.

## UTC

UTC 는 1972년 1월 1일부터 시행된 국제 표준시 이다.  
UTC 는 그리니치 평균시(GMT)에 기반하므로 GMT 로도 불리기도 하는데,  
UTC 와 GMT 는 초의 소숫점 단위에서만 차이가 나기 때문에 일상에서는 혼용되어 사용된다.  
기술적인 표기에서는 UTC 가 사용된다.

## GMT

GMT 는 Greenwich Mean Time 의 약자로 런던을 기점으로 하고,  
웰링턴에 종점으로 설정되는 협정 세계시 (UTC) 의 기준시간대이다.

```
- GMT+0   GMT/LON(런던)
- GMT+1   PAR(파리)
- GMT+2   CAI/JRS(카이로/예루살렘)
- GMT+3   JED(제다)
- GMT+3.5 THR(테헤란)
- GMT+4   DXB(두바이)
- GMT+4.5 KBL(카불)
- GMT+5   KHI(카라치)
- GMT+5.5 DEL(델리)
- GMT+6   DAC(다카)
- GMT+6.5 RGN(양곤)
- GMT+7   BKK(방콕)
- GMT+8   HKG(홍콩)
- GMT+9   SEL(서울)
- GMT+9.5 ADL(다윈)
- GMT+10  SYD(시드니)
- GMT+11  NOU(누메아)
- GMT+12  WLG(웰링턴)
```

## ISO 8601

ISO 8601 는 날짜와 시간과 관련된 데이터 교환을 다루는 국제 표준이다.  
이 표준은 국제 표준화 기구(ISO)에 의해 공포 되었으며 1988년에 처음으로 공개되었다.

```
YYYY-MM-DDTHH:mm:ss.sssZ
YYYY-MM-DDThh:mm:ss+hh:mm
```

형태로 정의가 가능하다.

## toJSON 과 toISOString 의 차이

toJSON 은 Date 값을 toISOString() 를 이용해 JSON 문자열을 반환 위해 정의 되었다.  
toISOString 는 ISO 8601 문자열을 반환하기 위해 정의 되었다.  
toJSON 은 IE 8 부터 지원되며, toISOString 은 IE 9 부터 지원된다.

## Date.getTime() 와 Date.now() 차이

생성자 객체의 속성과 생성자 객체 프로토타입의 속성 간의 차이

정적 메서드  
https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Date/now

인스턴스 메서드  
https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Date/getTime

## 사파리(Safari) Date 에러 (Invalid Date)

```javascript
// 아래와 같이 String 포맷을 Date에 넣었을 경우 에러 발생
new Date('2021-11-15T01:00:00+0900');
new Date('2022-03-25T02:00:59.999+0900');

// 아래와 같이 해줘야 한다.
new Date('2021-11-15T01:00:00+09:00');
new Date('2022-03-25T02:00:59.999+09:00');
```
