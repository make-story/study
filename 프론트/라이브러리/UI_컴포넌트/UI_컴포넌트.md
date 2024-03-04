# UI Framework (UI 프레임워크), UI Platform, Admin UI, UI 솔루션

https://goodsharp.tistory.com/519

https://dribbble.com/tags/platform-ui

## MUI(Material-UI)

https://mui.com/

- MUI(Material-UI) 는 구글의 디자인 철학인 Material Design 을 구현한 자바스크립트 라이브러리
- 특히 버전 5가 릴리즈 되면서 많은 변화
- 기존 Material-UI 를 MUI 라는 명칭으로 변경
- 5 버전 부터 emotion 을 접목
- 단점
  - https://blog.bitsrc.io/enhance-your-dx-with-radix-a-customizable-and-a11y-friendly-react-component-library-91ddfcfef1c9
  - MUI, React Bootstrap이 가진 문제점으로 지적하는 것은 나만의 스타일을 추가하는 것이 어려울 수 있음
  - 이는 결국 우리가 필요한 것보다 더 많은 시간을 소모하게 될 수 있다고 지적

Material Design - Google 오픈소스 디자인 시스템  
https://m3.material.io/

## Ant Design

https://ant.design/

어드민 웹개발에 적합  
https://jeonghwan-kim.github.io/2018/10/13/ant-design-101.html

## React Bootstrap

https://react-bootstrap.netlify.app/

## Radix-ui

디자인 시스템 및 웹 앱을 구축하기 위한 오픈 소스 UI 컴포넌트 라이브러리

- Compound Component Pattern

https://www.radix-ui.com/primitives/docs/overview/introduction

```jsx
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import './styles.css';

const DialogDemo = () => (
  <Dialog.Root>
    <Dialog.Trigger asChild>
      <button className='Button violet'>Edit profile</button>
    </Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay className='DialogOverlay' />
      <Dialog.Content className='DialogContent'>
        <Dialog.Title className='DialogTitle'>Edit profile</Dialog.Title>
        <Dialog.Description className='DialogDescription'>
          Make changes to your profile here. Click save when you're done.
        </Dialog.Description>
        <fieldset className='Fieldset'>
          <label className='Label' htmlFor='name'>
            Name
          </label>
          <input className='Input' id='name' defaultValue='Pedro Duarte' />
        </fieldset>
        <fieldset className='Fieldset'>
          <label className='Label' htmlFor='username'>
            Username
          </label>
          <input className='Input' id='username' defaultValue='@peduarte' />
        </fieldset>
        <div
          style={{ display: 'flex', marginTop: 25, justifyContent: 'flex-end' }}
        >
          <Dialog.Close asChild>
            <button className='Button green'>Save changes</button>
          </Dialog.Close>
        </div>
        <Dialog.Close asChild>
          <button className='IconButton' aria-label='Close'>
            <Cross2Icon />
          </button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);

export default DialogDemo;
```

## shadcn

`Radix UI 및 Tailwind CSS 를 사용하여 구축된 재사용 가능한 컴포넌트`

https://ui.shadcn.com/

https://velog.io/@ckstn0777/shadcnui-%EB%A5%BC-%EC%9D%B4%EC%9A%A9%ED%95%9C-%EA%B3%B5%EC%9C%A0-UI-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8-%EC%82%AC%EC%9A%A9-%EA%B2%BD%ED%97%98

## Mantine

https://mantine.dev/

## JUI

http://jui.io/?lang=ko

## webix

https://kr.webix.com/

## `WebSquare5` 웹스퀘어 - HTML5 Enterprise UI Platform

인스웨이브사의 웹스퀘어

https://www.inswave.com/websquare/websquare.html?w2xPath=/cm/xml/index.xml

## 투비소프트의 Nexacro

## xPlatform

## 토마토시스템의 eXbuilder

## https://www.inzent.com/

## https://www.sencha.com/

## http://www.softbase.co.kr/

xFrame5

---

## Twitter Bootstrap

가장 보편적이고 잘 알려진 프레임워크  
http://bootstrapk.com/

## Flat UI

https://designmodo.github.io/Flat-UI/

---

## ZURB Foundation

https://get.foundation/

## Bulma

https://bulma.io/

## Skeleton

http://getskeleton.com/

## CardinalCSS

http://cardinalcss.com/

## ConsiseCSS

https://concisecss.com/

## Furtive

https://www.furtive.co/

## Mueller

https://muellergridsystem.com/

---

# 디자인 포트폴리오 플랫폼

https://dribbble.com/
