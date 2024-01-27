# props.children 에 ref 주입하기

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
