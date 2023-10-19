// 커스텀 앨리먼트 + 쉐도우 돔(Shadow DOM) + 템플릿 엘리먼트
customElements.define(
  "my-paragraph",
  class extends HTMLElement {
    constructor() {
      super();

      // template
      let template = document.getElementById("my-paragraph"); // #my-paragraph
      let templateContent = template.content;

      // Create a shadow root
      const shadowRoot = this.attachShadow({ mode: "open" });
      shadowRoot.appendChild(templateContent.cloneNode(true));
    }
  }
);
