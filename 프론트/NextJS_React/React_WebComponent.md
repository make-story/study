# React 더 이상 사용하지 말아야 하는 이유

https://velog.io/@dipokalhhj/Abandoned-React

https://www.youtube.com/watch?v=RtvSgptpfnY

GitHub 개발자들이 React 에서 WebComponent 로 전환

## WebComponent

```javascript
class TestCode extends HTMLElement {
  constructor() {
    super();
  }

  render() {
    const template = this.template();
    this.innerHTML = template;
  }

  template() {
    return `<div> ... </div>`;
  }

  connectedCallback() {
    this.render();
  }
}

customElements.define("test-code", TestCode);
```

```html
<test-code></test-code>
```

## Lit

커스텀 엘리먼트를 React처럼 사용할 수 있도록 한게 Lit  
TypeScript를 기본으로 지원하며 Redux도 적용할 수 있다. 즉, JS에서 사용 가능한 라이브러리는 대부분 사용 가능하다.

```javascript
import { html, css, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("simple-greeting")
export class SimpleGreeting extends LitElement {
  static styles = css`
    p {
      color: blue;
    }
  `;

  @property()
  name = "Somebody";

  render() {
    return html`<p>Hello, ${this.name}!</p>`;
  }
}
```

```html
<simple-greeting name="World"></simple-greeting>
```

만일 여기서 데코레이터 구문을 사용하지 않았다면 컴포넌트를 생성할때마다  
customElements.define('app-root', AppRoot); 이런식의 구문을 추가해주어야 한다.  
Lit의 문법이 앞서 언급한 Custom Element 보다 훨신 간결하다.
