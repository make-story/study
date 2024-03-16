`study.git/프론트/NextJS_React/패턴_모범사례/React_합성컴포넌트.md` 참고!

`next-ai-news.git/components/comments.tsx` 참고!

# React Children

```tsx
import React, { PropsWithChildren, useMemo } from 'react';

const ChildrenTest = ({ children }: PropsWithChildren) => {
  // Children 테스트
  const count = React.Children.count(children);
  const Component = useMemo(() => {
    // https://fe-developers.kakaoent.com/2021/211022-react-children-tip/
    // console.log(React.Children); // {map: ƒ, forEach: ƒ, count: ƒ, toArray: ƒ, only: ƒ}
    return React.Children.map(children, (child, index: number) => {
      return <div data-child={index}>{child}</div>;
    });
  }, [children]);

  return (
    <>
      {count}
      {Component}
    </>
  );
};

export default ChildrenTest;
```

# Function as Child Component

https://reactpatterns.js.org/docs/function-as-child-component/

```tsx
import React, { PropsWithChildren, ReactElement, useMemo } from 'react';

interface Props {
  children: (arg0: string) => {};
}

const ChildrenTest = ({ children }: Props): ReactElement => {
  return <>{children?.('children 함수 실행!')}</>;
};

export default ChildrenTest;

// <ChildrenTest1>{name => <div>{name}</div>}</ChildrenTest>
```

# React Children - Swiper

```tsx
import React, { PropsWithChildren, Children } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

export default function FilterBarWrapper({ children }: PropsWithChildren) {
  const childList = Children.toArray(children);
  const hasChildren = children ? !!Children.count(children) : false;

  return (
    <Swiper slidesPerView='auto' threshold={12}>
      {Children.map(children, (child, index) => (
        <React.Fragment key={`fragment-${index}`}>
          {child && <SwiperSlide>{child}</SwiperSlide>}
        </React.Fragment>
      ))}
    </Swiper>
  );
}
```

# React Children - ref 주입

https://stackoverflow.com/questions/63654496/is-it-possible-to-add-ref-to-the-props-children-elements

`React.Children and React.cloneElement`

```javascript
const FunctionComponentForward = React.forwardRef((props, ref) => (
  <div ref={ref}>Function Component Forward</div>
));

const Form = ({ children }) => {
  const childrenRef = useRef([]);

  useEffect(() => {
    console.log('Form Children', childrenRef.current);
  }, []);

  return (
    <>
      {React.Children.map(children, (child, index) =>
        React.cloneElement(child, {
          ref: ref => (childrenRef.current[index] = ref),
        }),
      )}
    </>
  );
};

const App = () => {
  return (
    <Form>
      <div>Hello</div>
      <FunctionComponentForward />
    </Form>
  );
};
```

# list 에서 key 주입 안하는 방법

```tsx
import { Children } from 'react';

/*const App = ({ list }: { list: any[] }) => {
  return list.map((item: any) => {
    return <div key={item.id}>{item.name}</div>;
  });
};*/
const App = ({ list }: { list: any[] }) => {
  return Children.toArray(list.map((item: any) => <li>{item.name}</li>));
};
```

```tsx
import { Children, useState } from 'react';

function UserForm() {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const onItemClick = (item: any) => () => setSelectedItem(item);

  return (
    <ul>
      {items.map((item: any) => {
        return Children.toArray(<li onClick={onItemClick(item)}></li>);
      })}
    </ul>
  );
}
```
