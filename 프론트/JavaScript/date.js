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