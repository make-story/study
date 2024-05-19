# props.sync, 2.3 < Vue < 3.0

https://powerku.tistory.com/259

Vue 2.3 버전 이후로 .sync 라는 수식어가 생겼습니다.  
props sync 를 붙이면 상위 컴포넌트에서 emit 이벤트를 등록을 생략할 수 있습니다.  
자식 컴포넌트에서 update:propName 으로 호출하면 prop 을 변경 할 수 있습니다.

```vue
<HelloWorld :msg.sync="message" />
```

자식컴포넌트

```javascript
this.$emit('update:msg', 'batman');
```
