# 앱 전반적으로 재사용 가능한 로직을 prop으로 컴포넌트에게 제공한다

https://patterns-dev-kr.github.io/design-patterns/hoc-pattern/  
https://www.patterns.dev/posts/hoc-pattern/

`종종 여러 컴포넌트에서 같은 로직을 사용해야 하는 경우`가 있다.  
이런 로직은 컴포넌트의 스타일시트를 설정하는 것일 수 있고. 권한을 요청하거나. 전역 상태를 추가하는 것일 수 있다.

같은 로직을 여러 컴포넌트에서 재사용하는 방법 중 하나로 고차 컴포넌트 패턴을 활용하는 방법이 있다.  
이 패턴은 앱 전반적으로 재사용 가능한 로직을 여러 컴포넌트들이 쓸 수 있게 해 준다.

- `고차 컴포넌트란 다른 컴포넌트를 받는 컴포넌트를 뜻한다.`
- `HOC는 인자로 넘긴 컴포넌트에게 추가되길 원하는 로직을 가지고 있다.`
- `HOC는 로직이 적용된 엘리먼트를 반환하게 된다.`

# withLoader 라는 HOC를 만들어 보자.

HOC는 컴포넌트를 인자로 받아 컴포넌트를 반환해야 한다.  
아래 예제에서는 데이터 로딩이 끝나고 나서 보여져야 할 엘리먼트를 받는다.

```javascript
import React, { useEffect, useState } from 'react';

export default function withLoader(Element, url) {
  return props => {
    const [data, setData] = useState(null);

    useEffect(() => {
      async function getData() {
        const res = await fetch(url);
        const data = await res.json();
        setData(data);
      }

      getData();
    }, []);

    if (!data) {
      return <div>Loading...</div>;
    }

    return <Element {...props} data={data} />;
  };
}
```

```javascript
import React from 'react';
import withLoader from './withLoader';

function DogImages(props) {
  return props.data.message.map((dog, index) => <img src={dog} alt='Dog' key={index} />);
}

export default withLoader(DogImages, 'https://dog.ceo/api/breed/labrador/images/random/6');
```

---

몇몇 상황에서는 HOC패턴은 React의 훅으로 대체할 수 있다.

# HOC의 사용 사례

- 앱 전반적으로 동일하며 커스터마이징 불가한 동작이 여러 컴포넌트에 필요한 경우
- 컴포넌트가 커스텀 로직 추가 없이 단독으로 동작할 수 있어야 하는 경우

# Hooks(사용자훅, 커스텀훅)의 사용 사례

- 공통 기능이 각 컴포넌트에서 쓰이기 전에 커스터마이징 되어야 하는 경우
- 공통 기능이 앱 전반적으로 쓰이는 것이 아닌 하나나 혹은 몇개의 컴포넌트에서 요구되는 경우
- 해당 기능이 기능을 쓰는 컴포넌트에게 여러 프로퍼티를 전달해야 하는 경우
