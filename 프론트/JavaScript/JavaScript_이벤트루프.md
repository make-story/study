https://developer.mozilla.org/ko/docs/Web/JavaScript/Event_loop

# 이벤트 루프 (콜백큐, 콜스택을 보고 있다가, 콜스택이 비는 시점에 콜백큐에 있는 것을 스택에 넣음)

자바스크립트는 싱글쓰레드, 콜스택방식  
호출스택 (setTimeout 비동기 프레임 있음) ->  
백그라운드 이동(setTimeout, Ajax, 이벤트리스너, 파일리더 등) ->  
태스크큐 대기 ->  
이벤트루프가 태스크 큐의 콜백을 호출스택으로 올림 ->  
호출스택 실행
