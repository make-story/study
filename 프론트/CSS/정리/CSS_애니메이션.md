`완성된 웹사이트로 배우는 HTML & CSS 웹 디자인` 책 내용중

## 트랜지션

트랜지션은 시작 지점과 종료 지점을 꾸민 것의 변화를 표현할 수 있어 단순한 움직임을 구현하는데 적합합니다.  
여기에서 '단순함'이란 `시작 지점 및 종료 지점 사이의 움직임만 정의`할 수 있으며 중간에 다른 동작을 추가하거나 반복되게끔 할 수는 없습니다.

- transition-property
  애니메이션을 적용하는 속성
  기본값 'all'

- transition-duration
  애니메이션이 실행되는 데 걸리는 시간

- transition-timing-function
  애니메이션 속도 및 타이밍
  기본값 'ease'

- transition-delay
  애니메이션이 시작하기까기 기다리는 시간

## 키프레임

키 프레임 애니메이션은 시간의 경과에 따라 속성을 설정할 수 있습니다.  
`트랜지션과 달리 시작과 종료 사이에 경과 지점을 추가하는 것은 물론 각각 다르게 꾸밀 수도 있습니다.`  
해당 경과 지점을 키프레임이라고 하며 @keyframes 라는 @ 규칙으로 어떻게 변화할지 정의합니다.

```css
@keyframes 키프레임명 {
  0% {
  }
  ,
  50% {
  }
  ,
  100% {
  }
}

@keyframes 키프레임명 {
  from {
  }
  ,
  to {
  }
}
```

```css
셀렉터 {
  animation-name: 키프레임명;
}
```

- animation-name
  @keyframes 으로 정의한 키 프레임명

- animation-duration
  애니메이션이 한 번 실행되는 데 걸리는 시간

- animation-timing-function
  애니메이션 속도 및 타이밍
  기본값 'ease'

- animation-delay
  애니메이션이 시작하기까지 기다리는 시간

- animation-iteration-count
  애니메이션을 반복하는 횟수

- animation-direction
  애니메이션 재생 방향
  기본값 'normal'

- `animation-fill-mode`
  애니메이션 재상 전후 상태
  기본값 'none'

- animation-play-state
  애니메이션 재생과 일시 정지
  기본값 'running'
