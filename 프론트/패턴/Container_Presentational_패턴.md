# 비즈니스 로직으로부터 뷰를 분리하여 관심사의 분리(SoC) 를 강제한다

https://patterns-dev-kr.github.io/design-patterns/container-presentational-pattern/  
https://www.patterns.dev/posts/presentational-container-pattern/

React에서 관심사의 분리(SoC) 를 강제하는 방법은 Container/Presentational Pattern을 이용하는 방법이 있다.  
이 를 통해 `비즈니스 로직에서 뷰를 분리`해낼 수 있다.

- Presentational Components: 데이터가 어떻게 사용자에게 보여질 지에 대해서만 다루는 컴포넌트.
- Container Components: 어떤 데이터가 보여질 지에 대해 다루는 컴포넌트.

# Presentational Component

Presentational 컴포넌트는 props를 통해 데이터를 받는다.  
이 컴포넌트의 주요 기능은 받은 데이터를 화면에 표현하는것이며 그 목적을 위해 스타일시트를 포함한다.  
데이터는 건드리지 않는다.

```javascript
import React from 'react';

export default function DogImages({ dogs }) {
  return dogs.map((dog, i) => <img src={dog} key={i} alt='Dog' />);
}
```

# Container 컴포넌트

Container 컴포넌트의 주요 기능은 Presentational 컴포넌트에 데이터를 전달하는 것이다.  
Container 컴포넌트 자체는 화면에 아무것도 렌더링하지 않는다.  
Container 컴포넌트는 아무것도 화면에 그리지 않으니 스타일시트도 포함하지 않는다.

```javascript
export default class DogImagesContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      dogs: [],
    };
  }

  componentDidMount() {
    fetch('https://dog.ceo/api/breed/labrador/images/random/6')
      .then(res => res.json())
      .then(({ message }) => this.setState({ dogs: message }));
  }

  render() {
    return <DogImages dogs={this.state.dogs} />;
  }
}
```

---

# Hooks

대개 Container/Presentational 패턴은 React Hooks로 대체 가능하다.  
React 에 Hooks가 추가되면서 Container 컴포넌트 없이도 stateless 컴포넌트를 쉽게 만들 수 있게 되었다.

```javascript
import { useState, useEffect } from 'react';

export default function useDogImages() {
  const [dogs, setDogs] = useState([]);

  useEffect(() => {
    async function fetchDogs() {
      const res = await fetch('https://dog.ceo/api/breed/labrador/images/random/6');
      const { message } = await res.json();
      setDogs(message);
    }

    fetchDogs();
  }, []);

  return dogs;
}
```

```javascript
import React from 'react';
import useDogImages from './useDogImages';

export default function DogImages() {
  const dogs = useDogImages();

  return dogs.map((dog, i) => <img src={dog} key={i} alt='Dog' />);
}
```
