# 네이밍
참고: typescript 3.x 부터 tslint 가 모든 인터페이스 네이밍 앞에 대문자 I 를 강제한다. (interface name must start with a capitalized Itslint(interface-name))  
```
interface: I  
type: T
eum: E
```

`우리는 타입 선언시, 프리픽스(prefix)를 함께 사용한다.`  


# 데이터 통신 (axios response)
```typescript
import axios from 'axios';

interface User {
  id: number;
  firstName: string;
}

export type TUserList = User[]

// ...

axios
.get<TUserList>('http://url')
.then((response) => {
	console.log(response.data);
});
```