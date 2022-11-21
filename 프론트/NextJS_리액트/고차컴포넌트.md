# 고차 컴포넌트를 이용한 공통 기능 관리

고차 컴포넌트는 컴포넌트를 입력으로 받아서 컴포넌트를 출력해 주는 함수다.  
이 함수에서 출력되는 컴포넌트는 내부적으로 입력받은 컴포넌트를 사용한다.

```javascript
function withOnlyLogin(InputComponent) {
  return function ({ isLogin, ...rest }) {
    if (isLogin) {
      return <InputComponent {...rest} />;
    } else {
      return <p>권한이 없습니다.</p>;
    }
  };
}
```

---

https://www.patterns.dev/posts/hoc-pattern/

```javascript
function withStyles(Component) {
  return props => {
    const style = { padding: '0.2rem', margin: '1rem' }
    return <Component style={style} {...props} />
  }
}

const Button = () = <button>Click me!</button>
const Text = () => <p>Hello World!</p>

const StyledButton = withStyles(Button)
const StyledText = withStyles(Text)
```

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

# HOC typescript

https://react-typescript-cheatsheet.netlify.app/docs/hoc/full_example/  
https://medium.com/@jrwebdev/react-higher-order-component-patterns-in-typescript-42278f7590fb
https://bakery-it.tistory.com/59
