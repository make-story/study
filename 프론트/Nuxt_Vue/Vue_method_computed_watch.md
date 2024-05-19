# method

....

# computed

https://mygumi.tistory.com/311

https://velog.io/@leehaeun0/Vue-method-computed-watch

computed 속성 함수는 해당 함수 안에서 사용된 data들을 알아서 구독한다.  
구독하고 있는 값이 변경되면 변경된 값을 반영하여 계산하고 출력한다.

이 함수는 함수를 실행한 결과 값을 캐싱하여 저장한다.  
구독하는 data가 변경이 없으면 App 컴포넌트가 재호출(= 리랜더링, = 데이터변경) 되어도 함수를 다시 등록하지 않는다.

`computed 속성 사용 시 주의해야할 점`  
https://handhand.tistory.com/247

# watch

computed 와 마찬가지로 특정한 데이터를 구독하고 있다.  
구독하고 있는 data가 업데이트 될 때에 등록한 함수가 콜백 함수로서 실행된다.

업데이트된 값이 첫번째 인수로 들어오고 업데이트 전 값이 두번째 인수로 들어온다.  
data가 변경될 때 다른 작업을 실행하는 로직 만 있고 return 값이 필요 없을 때 쓰기 좋다.

---

# 컴포넌트가 리랜더링 될 때마다 함수가 등록되는가?

method O / computed X / watch O

# 특정한 값 data가 변환되는것을 감지 하는가?

method X / computed O / watch O

# 함수를 이벤트 함수 자리에 등록할 수 있는가?

method O / computed X / watch X

method만 뷰에서 기능을 제공해주는게 따로 없는 일반적으로 정의된 함수이기 때문에 가능하다.

---

method 에는 이벤트 함수만 등록할 것이다.  
아래처럼 "return 값" 을 얻기위해 사용하는 위치에는 computed 를 쓸것이다.

```javascript
<p>원본 메시지: "{{ method속성함수() }}"</p>
<p>원본 메시지: "{{ computed속성함수 }}"</p>
```

computed는 반환값으로 변수로서의 역할로만 쓸거같다.  
그리고 computed 안에서 return 하는 data 외의 다른 data를 직접 변경해서는 안된다. 해당 함수는 반환하는 값에만 의의가 있기 때문.  
watch 함수 안에서는 return 값이 없이 어떠한 로직을 실행하고 싶을때 사용할 것이다.  
그리고 함수안에서 여러개의 data를 직접 변경할 경우에 사용할 것이다.

# 리액트(React) 비슷한 기능

useEffect - watch

useMemo, useCallback - computed
