# props.sync

https://powerku.tistory.com/259

Vue 2.3 버전 이상 Vue 3.0 아래 버전에서 사용가능한 .sync 라는 수식어  

props sync를 붙이면 상위 컴포넌트에서 emit 이벤트를 등록을 생략할 수 있습니다.
자식 컴포넌트에서 update:propName으로 호출하면 prop을 변경 할 수 있습니다.