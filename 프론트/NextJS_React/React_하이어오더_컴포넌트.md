# 하이어오더 컴포넌트 ('리액트 프로그래밍 정석' 책 내용 중)

`하이어오더 컴포넌트` 라는 이름은 자바스크립트의 고차 함수(Higher-order function)에서 유래되었습니다.  
자바스크립트에서는 커링 함수를 고차 함수라고 하는데, 고차 함수의 영어 표현을 그대로 살려 하이어오더 컴포넌트라고 부르게 된 것이지요.

## 하이어오더 컴포넌트는 함수나 클래스 형태의 컴포넌트를 모두 반환할 수 있습니다.

---

# 고차 컴포넌트(HOC, Higher Order Component)

https://ko.legacy.reactjs.org/docs/higher-order-components.html

고차 컴포넌트는 컴포넌트를 가져와 새 컴포넌트를 반환하는 함수입니다.

`컴포넌트는 props를 UI로 변환하는 반면에, 고차 컴포넌트는 컴포넌트를 새로운 컴포넌트로 변환합니다.`

```javascript
import React, { ComponentType, ComponentProps, useEffect } from 'react';
import useAuth from 'common/hooks/useAuth';

/**
 * 로그인이 필수인 화면의 가드 역할을 하는 hoc
 * - 로그인이 되어있지 않다면 로그인 화면으로 이동한다.
 * - SSR에서 Redux State에 로그인정보를 내려주기 때문에 클라이언트에서 따로 로그인 확인을 위한 API 조회를 하지 않는다.
 */
function withLoggedIn<P extends {}>(WrappedComponent: ComponentType<P>) {
  const Component = (props: ComponentProps<typeof WrappedComponent>) => {
    const { isLoggedIn, login } = useAuth();

    useEffect(() => {
      if (!isLoggedIn) login();
    }, [isLoggedIn]);

    if (!isLoggedIn) return <></>;
    return <WrappedComponent {...props} />;
  };

  Component.displayName = `withLoggedIn(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;
  return Component;
}

export default withLoggedIn;
```

```javascript
import React from 'react';
import withLoggedIn from 'common/hocs/withLoggedIn';

interface IProps {
    data: string[];
}
const TestComponent = ({ data }: IProps) {
    return <></>;
};

export default withLoggedIn(TestComponent);
```

## 참고: 'front-next-build-template.git' 저장소 또는 'front-next-test.git' 저장소 참고
