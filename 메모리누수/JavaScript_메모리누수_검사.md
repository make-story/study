# 요약

https://ui.toast.com/weekly-pick/ko_20210611

https://yceffort.kr/2020/07/memory-leaks-in-javascript  
https://yceffort.kr/2022/04/chrome-memory-profiler

https://flyingsquirrel.medium.com/ssr-memory-leak-%EB%94%94%EB%B2%84%EA%B9%85%ED%95%98%EB%8A%94-%EB%B0%A9%EB%B2%95-ce3cf41c107c

메모리 누수의 일반적인 형태는 아래와 같다.

- 우발적으로 생긴 전역변수
- 잊혀진 타이머와 콜백
- DOM을 외부에서 참조
- 클로저

크롬 개발자 도구 활용

1. `성능(Performance) 탭을 통해, 메모리누수 가능성이 여부 확인가능!`

- 메모리 누수가 있다는 것을 보여주는 요소가 두가지 있다. 초록선 (nodes)와 파란선 (JS Heap) 이다.
- 노드(초록선)들이 꾸준히 증가하면서 감소하지 않는데, 이것이 가장 큰 징후다.
- JS Heap 그래프
  - 메모리가 증가하다가, 한번 크게 감소하고, 다시 증가 하다 감소하는 형태가 반복
  - 이 경우 핵심은 가비지 컬렉터에 의해 메모리 사용량이 감소할 때마다 이전보다 힙의 크기가 더 크게 유지되고 있다는 점
    - 예: JS Heep[7.9 MB - 12.3MB]
  - 다시 말해, GC가 많은 양의 메모리 수집에 성공하고 있지만, 그 중 어딘가에서 일부가 누수되고 있다는 뜻

2. `어디에서 메모리 누수가 생기는지 찾기 위해, 메모리(Memory) 탭을 통해, 두 개의 스냅샷 찍기`

- 새로고침하고, Take Heap Snapshot을 수행
- 버튼을 누른 다음에 좀 기다린 후에 두번 째 스냅샷을 생성
- 비교할 수 있는 방법이 두가지
  - Summary 를 선택 한 다음, Objects Allocated between Snapshot 1 and Snapshot 를 선택하거나,
  - Summary 대신 Comparison 을 선택
- 새로운 객체 들이 할당되어 있지만, 해제 되지 않아 많은 메모리를 잡아먹고 있는 것들 확인!!
  - 예: (string) 하위 열어 보자

3. `누수 지점 찾기 위한 또 다른 방법, 메모리(Memory) 탭을 통해, 타임라인의 할당 계층(Allocation instrumentation on Timeline) 선택`

- 새로 고침 후 타임라인의 할당 계층 선택
- 기록이 진행되는 동안, 상단에 위 스크린샷 처럼 파란색 기둥 모양 그래프가 생기는 것 확인!!
- 타임라인 일부를 선택하면, 해당 기간 동안에 수행되는 할당만 볼 수 있다.
  - 해당영역을 선택하면, 3개의 constructor 가 존재하는 것을 알 수 있다.
  - 예: 이 중 하나는 메모리 누수의 원인인 (string) 이고 다른 하나는 DOM, 그리고 나머지는 Text (DOM 마지막에 존재하는 text) 요소다.
- Allocation Stack 메뉴를 누르면, 어느 것(함수 등)을 통해 참조되어 할당된 요소인지 확인 가능!!!
