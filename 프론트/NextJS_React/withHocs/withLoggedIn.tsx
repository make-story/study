import React, { ComponentType, ComponentProps, useEffect } from 'react';

/**
 * 로그인이 필수인 화면의 가드 역할을 하는 hoc
 * - 로그인이 되어있지 않다면 로그인 화면으로 이동한다.
 * - SSR에서 Redux State에 로그인정보를 내려주기 때문에 클라이언트에서 따로 로그인 확인을 위한 API 조회를 하지 않는다.
 */
function withLoggedIn<P extends {}>(WrappedComponent: ComponentType<P>) {
  const Component = (props: ComponentProps<typeof WrappedComponent>) => {
    //const { isLoggedIn, login } = useAuth();
    const isLoggedIn = false;

    useEffect(() => {
      //if (!isLoggedIn) login();
    }, [isLoggedIn]);

    if (!isLoggedIn) return <></>;
    return <WrappedComponent {...props} />;
  };

  // https://stackoverflow.com/questions/67992894/component-definition-is-missing-display-name-for-forwardref
  // https://legacy.reactjs.org/docs/react-component.html#displayname
  // ESLint 오류 발생 가능성 있음
  // "Component definition is missing display name react/display-name"
  Component.displayName = `withLoggedIn(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;
  return Component;
}

export default withLoggedIn;
