/**
 * https://developer.mozilla.org/en-US/docs/Web/API/Web_components
 */

export const guideLayer = () => {
  const customElementName = 'guide-layer';
  if (!window.customElements.get(customElementName)) {
    window.customElements.define(
      customElementName,
      class extends HTMLElement {
        static shadowRoot;
        constructor() {
          super();
          // shadow root - mode: open or closed
          this.shadowRoot = this.attachShadow({ mode: 'open' });
          // shadow tree
          this.shadowRoot.innerHTML = `
              <style>
              .wrap {
                position: fixed; 
                top: 0; 
                left: 0; 
                box-sizing: border-box;
                padding: 1.2rem;
                max-height: 200px; 
                overflow-y: scroll;
                z-index: 99999; 
                background: rgba(253, 254, 255, .8); 
                border-bottom: 1px solid #eee;
              }
              .wrap.show {
                width: 100%; 
              }
              .wrap.hide {
  
              }
              .wrap ._layer_toggle {
                margin-top: 10px;
              }
              .wrap.show ._layer_toggle {
                display: block;
              }
              .wrap.hide ._layer_toggle {
                display: none;
              }
              </style>
              
              <div class="wrap show">
                <button class="_layer_toggle_button" data-toggle="">-</button>
                <div class="_layer_toggle">
                  TEST
                </div>
              </div>
                    `;
        }

        // 커스텀태그 기본 라이프사이클 - DOM에 추가되었을 때 콜백
        connectedCallback() {
          const wrap = this.shadowRoot.querySelector('.wrap');
          const _layer_toggle_button = this.shadowRoot.querySelector(
            '._layer_toggle_button',
          );
          const _layer_toggle_button_show_text = '보이기';
          const _layer_toggle_button_hide_text = '숨기기';
          //const _layer_toggle = this.shadowRoot.querySelector('._layer_toggle');

          // 셀렉터 또는 전역변수로 접근가능하도록 설정
          this.setAttribute('id', '_validator_layer');
          window._validator_layer = this.shadowRoot;

          if (!!wrap && !!_layer_toggle_button) {
            // 보이기 / 숨기기 관련
            if (wrap.className.includes('show')) {
              _layer_toggle_button.setAttribute('data-toggle', 'true');
              _layer_toggle_button.innerHTML = _layer_toggle_button_hide_text;
            } else {
              _layer_toggle_button.setAttribute('data-toggle', 'false');
              _layer_toggle_button.innerHTML = _layer_toggle_button_show_text;
            }
            // 이벤트
            _layer_toggle_button.addEventListener('click', e => {
              const toggle = _layer_toggle_button.getAttribute('data-toggle');
              if (toggle === 'true') {
                wrap.classList.remove('show');
                wrap.classList.add('hide');
                _layer_toggle_button.setAttribute('data-toggle', 'false');
                _layer_toggle_button.innerHTML = _layer_toggle_button_show_text;
              } else {
                wrap.classList.remove('hide');
                wrap.classList.add('show');
                _layer_toggle_button.setAttribute('data-toggle', 'true');
                _layer_toggle_button.innerHTML = _layer_toggle_button_hide_text;
              }
            });
          }
        }

        // 커스텀태그 기본 라이프사이클 - DOM에서 제거되었을 때 콜백
        disconnectedCallback() {}
      },
    );
  }
  // 페이지에 삽입
  document.body.appendChild(document.createElement(customElementName));
};

export const warningLayer = () => {
  const customElementName = 'warning-layer';
  if (!window.customElements.get(customElementName)) {
    window.customElements.define(
      customElementName,
      class extends HTMLElement {
        static shadowRoot;
        static wrap;
        constructor() {
          super();
          this.attachShadow({ mode: 'open' });
          this.shadowRoot.innerHTML = `
              <style>
              .wrap {
                position: absolute;
                left: 0;
                top: 0;
                box-sizing: border-box;
                padding: 1.2rem;
                z-index: 99999; 
                background: rgba(253, 254, 255, .8); 
                border: 1px solid #eee;
                font-size: 1.4rem;
                color: #333;
              }
              </style>
              <div class="wrap">
  
              </div>
                    `;
          this.wrap = this.shadowRoot.querySelector('.wrap');
        }

        // 커스텀태그 기본 라이프사이클 - DOM에 추가되었을 때 콜백
        connectedCallback() {
          this.style.cssText = `
              position: relative;
            `;
        }

        // 커스텀태그 기본 라이프사이클 - DOM에서 제거되었을 때 콜백
        disconnectedCallback() {}

        set left(value) {
          this.style.left = value;
        }
        get left() {
          return this.style.left;
        }
        set top(value) {
          this.style.top = value;
        }
        get top() {
          return this.style.top;
        }
        set position(value) {
          this.style.position = value;
        }
        get position() {
          return this.style.position;
        }
        set content(value) {
          if (this.wrap && value) {
            this.wrap.innerHTML = value;
          }
        }
        get content() {
          if (this.wrap) {
            return this.wrap.innerHTML;
          }
        }
      },
    );
  }
  // 페이지에 삽입
  document.body.appendChild(document.createElement(customElementName));
};
