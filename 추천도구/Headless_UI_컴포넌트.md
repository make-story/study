# Headless 컴포넌트 (헤드리스 UI)

https://www.howdy-mj.me/design/headless-components

https://news.hada.io/topic?id=5660

## Headless UI 란?

`외부 UI 라이브러리를 사용할 경우, 유스케이스에 맞게 기능을 새로 추가하거나 변경하고 싶어도 그에 맞게 디자인이나 기능을 수정하기가 매우 어렵다.`  
더 나아가 해당 라이브러리에 심각한 버그가 있거나, 유지보수를 종료한다고 하면 언젠가는 바꿔야 한다.  
그러다 결국 '그냥 컴포넌트를 만들까?'라는 생각을 문뜩 들게 한다.

그래서 나온 개념이 Headless UI Component로 `기능은 있지만 스타일이 없는 컴포넌트를 의미`한다.

`기능과 스타일의 관심사 분리`

## Component 기반 UI 라이브러리 vs Headless UI 라이브러리

### Component 기반 UI 라이브러리

Component 기반 UI 라이브러리는 `기능과 스타일이 존재하는 라이브러리`를 말하며, 대표적으로 Material UI, Ant Design가 있다.

- MUI(Material-UI)
  https://mui.com/
- Ant Design
  https://ant.design/

장점

- 바로 사용할 수 있는 마크업과 스타일이 존재
- 설정이 거의 필요 없음

단점

- 마크업을 자유롭게 할 수 없음
- 스타일은 대부분 라이브러리에 있는 테마 기반으로만 변경할 수 있어 한정적임
- 큰 번들 사이즈

### Headless UI 라이브러리

Headless는 `기능은 있지만 스타일이 없는 라이브러리`로, Headless UI, Radix UI, Reach UI 등이 있다.

- Headless UI
  https://headlessui.dev/
- Radix UI
  https://www.radix-ui.com/
- Reach UI
  https://github.com/reach/reach-ui

장점

- 마크업과 스타일을 완벽하게 제어 가능
- 모든 스타일링 패턴 지원(ex. CSS, CSS-in-JS, UI 라이브러리 등)
- 작은 번들 사이즈

단점

- 추가 설정이 필요함
- 마크업, 스타일 혹은 테마 모두 지원되지 않음

디자인이 그렇게 중요하지 않고, 커스텀할 곳이 많지 않다면 Component 기반 라이브러리를 사용하면 된다.  
하지만 만약 반응형에 따라 디자인이 달라지고, 기능 변경이나 추가가 많이 발생한다면 Headless 라이브러리가 유지보수에 더 좋을 것 같다.

`Material UI, Reach UI등 많은 UI 라이브러리가 Compound 컴포넌트를 사용`

```jsx
import * as React from 'react'

type CheckboxContextProps = {
  id: string
  isChecked: boolean
  onChange: () => void
}

type CheckboxProps = CheckboxContextProps & React.PropsWithChildren<{}>

const CheckboxContext = React.createContext<CheckboxContextProps>({
  id: '',
  isChecked: false,
  onChange: () => {},
})

const CheckboxWrapper = ({
  id,
  isChecked,
  onChange,
  children,
}: CheckboxProps) => {
  const value = {
    id,
    isChecked,
    onChange,
  }
  return (
    <CheckboxContext.Provider value={value}>
      {children}
    </CheckboxContext.Provider>
  )
}

const useCheckboxContext = () => {
  const context = React.useContext(CheckboxContext)
  return context
}

const Checkbox = ({ ...props }) => {
  const { id, isChecked, onChange } = useCheckboxContext()
  return (
    <input
      type="checkbox"
      id={id}
      checked={isChecked}
      onChange={onChange}
      {...props}
    />
  )
}

const Label = ({ children, ...props }: React.PropsWithChildren<{}>) => {
  const { id } = useCheckboxContext()
  return (
    <label htmlFor={id} {...props}>
      {children}
    </label>
  )
}

CheckboxWrapper.Checkbox = Checkbox
CheckboxWrapper.Label = Label

export default CheckboxWrapper
```
