# XMLHttpRequest - Asynchronous JavaScript and XML(AJSX)

`ui.git/src/xhr`

---

쿠키 포함할 경우  
XMLHttpRequest.withCredentials

---

XMLHttpRequest 로 HTML 을 불러와 삽입(innerHTML)했을 때,  
HTML 에 script 코드(code)가 포함된 경우,
해당 script 는 실행되지 않는다!

https://stackoverflow.com/questions/41110413/javascript-not-executing-when-loaded-via-xmlhttprequest-but-does-when-loaded-wit

---

```javascript
const setScriptTag = function (node, { is = true, type = '', src = '', code = '' } = {}) {
  let script = document.createElement('script');
  let setRemove = script => {
    script.parentNode.removeChild(script);
  };

  //console.log(code);
  //script.text = code;
  if (type) {
    script.type = type;
  }
  if (src) {
    // <script src=""></script>
    script.setAttribute('src', src);
  } else if (code) {
    // <script>inline code</script>
    script.appendChild(document.createTextNode(code));
  }
  // 삽입
  node.parentNode.insertBefore(script, node);
  // 실행 후 제거
  if (is !== false) {
    if (src) {
      script.onload = event => {
        console.log(event.type); // error, load
        setRemove(script);
      };
    } else if (code && script.parentNode) {
      setRemove(script);
    }
  } else {
    script = null;
  }
};
const setScriptCodeLoad = node => {
  let instance = new XMLHttpRequest();
  if (typeof instance !== 'object' || !('withCredentials' in instance)) {
    return;
  }
  //instance.abort();
  instance.open('GET', node.src, false); // 동기방식으로 호출
  //instance.setRequestHeader('Accept', '*/*');
  //instance.setRequestHeader('X-Requested-With', 'XMLHttpRequest'); // X-Requested-With 헤더는, 해당 요청이 Ajax라는 걸 의미 (비표준)
  //instance.timeout = 3000; // time in milliseconds
  instance.onreadystatechange = function () {
    switch (instance.readyState) {
      case 0: // 객체만 생성되고 아직 초기화되지 않은 상태(open 메소드가 호출되지 않음)
        break;
      case 1: // open 메소드가 호출되고 아직 send 메소드가 불리지 않은 상태
      case 2: // send 메소드가 불렸지만 status와 헤더는 도착하지 않은 상태
        // 연결 진행
        break;
      case 3: // 데이터의 일부를 받은 상태
        break;
      case 4: // 데이터를 전부 받은 상태
        break;
    }
  };
  instance.onload = function (event) {
    let code;
    if (instance.status == 200) {
      code = instance.response || instance.responseText || instance.responseXML; // XMLHttpRequest Level 2
      setScriptTag(node, { code });
    }
  };
  instance.ontimeout = function (event) {};
  instance.onerror = function (event) {};
  instance.send();
};
const setScripts = scripts => {
  // 동적 html load(ajax)된 script tag 는 실행이 안된다. 아래와 같이 실행해줘야 한다.
  for (let i = 0, max = scripts.length; i < max; i++) {
    let node = scripts[i];
    let code;
    //console.log(node);
    if (node.src) {
      // <script src="" /> 형태
      // jQuery 코드 내부 호출 형태 참고
      /*$.ajax({
        url: node.src,
        type: 'GET',
        dataType: 'script',
        async: false,
        global: false,
        throws: true,
      });*/

      // 동기 방식으로 적용해야 하므로, 아래 방식을 사용할 수 없다.
      /*(function () {
        let script = document.createElement('script');
        // 해당 script 속성
        script.async = false;
        //if(s.scriptCharset) {
        //script.charset = s.scriptCharset;
        //}
        script.src = node.src;

        script.onload = script.onreadystatechange = function (_, isAbort) {
          if (isAbort || !script.readyState || /loaded|complete/.test(script.readyState)) {
            // Handle memory leak in IE
            script.onload = script.onreadystatechange = null;

            // Remove the script
            if (script.parentNode) {
              script.parentNode.removeChild(script);
            }

            // Dereference the script
            script = null;

            // Callback if not abort
            if (!isAbort) {
              // 다음 스크립트를 실행시켜야 한다.
              //callback(200, "success");
            }
          }
        };

        // Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
        // Use native DOM manipulation to avoid our domManip AJAX trickery
        node.parentNode.insertBefore(script, node);
      })();*/

      // <script src=""></script>
      setScriptCodeLoad(node, { src: node.src });
    } else {
      // <script>code...</script> 형태
      code = (node.text || node.textContent || node.innerHTML || '').replace(
        /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
        '',
      );
      //window["eval"].call(window, code);
      setScriptTag(node, { code });
    }
  }
};
```

```javascript
// ui.git/src/modal/ModalStory.js
const success = html => {
  let template;
  let scripts, head, first;
  let code;

  // encodeURIComponent / decodeURIComponent
  html = decodeURIComponent(html || '');
  //console.log('[모달 정보] load HTML', html);

  // iframe / shadow dom 분기처리
  if (this.elements.iframe) {
    console.log('[모달 정보] iframe load HTML');
    //console.log('[모달 정보] iframe load HTML', html);

    // onload 이벤트 정지
    this.elements.iframe.onload = null;

    // sandbox
    //this.elements.iframe.sandbox = "allow-script"; // iframe 내부 스크립트

    // srcdoc - IE지원안함
    // 코드 중 큰따옴표("")를 사용해서는 안 되므로 대신 &quot;를 사용해야 한다.
    // src 속성과 srcdoc 속성을 둘다 지정했을 때는 srcdoc 속성이 우선되며, srcdoc가 지원하지 않는 브라우저에서는 src 속성이 동작하게 됩니다.
    // https://github.com/jugglinmike/srcdoc-polyfill
    // https://developer.mozilla.org/en-US/docs/Web/API/HTMLIFrameElement/srcdoc
    if ('srcdoc' in this.elements.iframe) {
      this.elements.iframe.srcdoc = html;
    } else {
      this.elements.iframe.contentWindow.document.open('text/html', 'replace');
      this.elements.iframe.contentWindow.document.write(html);
      this.elements.iframe.contentWindow.document.close();
    }

    // html
    //(this.elements.iframe.contentDocument || this.elements.iframe.contentWindow.document).body.innerHTML = 'test'; // body
    //(this.elements.iframe.contentDocument || this.elements.iframe.contentWindow.document).write('test'); // body
    //(this.elements.iframe.contentDocument || this.elements.iframe.contentWindow.document).documentElement.innerHTML = html;
  } else if (this.elements.main) {
    console.log('[모달 정보] main load HTML');
    //console.log('[모달 정보] main load HTML', html);

    this.elements.main.style.overflow = 'auto';
    if (this.elements.main.shadowRoot) {
      // 기존 shadow dom 적용되어 있음
      this.elements.main.shadowRoot.innerHTML = html;
    } else {
      // 신규 shadow dom 적용
      this.elements.main.innerHTML = '';
      //this.elements.main.attachShadow({mode: 'open'}).innerHTML = html; // shadow dom 내부 script 스크립트 동작안함 (text 방식 외부 스크립트 코드는 작동안한다)
      //this.elements.main.attachShadow({mode: 'open'}).appendChild(document.importNode(template.content, true));
      //this.elements.main.attachShadow({mode: 'open'}).appendChild(template.content.cloneNode(true));
      this.elements.main.attachShadow({ mode: 'open' }).innerHTML = html;
    }

    // shadow dom 내부 script 리스트, head 위치
    scripts = this.elements.main.shadowRoot.querySelectorAll('script');
    head = this.elements.main.shadowRoot.querySelector('head');
    first = this.elements.main.shadowRoot.firstChild;

    // makestory 전용 코드 (makestory 와 외부 html코드 연결 통로제공)
    code = `
        console.log(document.getRootNode());
    `;
    if (scripts.length) {
      //console.log(scripts);
      setScriptTag(scripts[0], { is: false, code });
    } else if (head) {
      //console.log(head);
      setScriptTag(head.firstChild, { is: false, code });
    } else if (first) {
      //console.log(first);
      setScriptTag(first, { is: false, code });
    } else {
      //console.log('[모달 에러!]');
      return false;
    }

    setScripts(scripts);
  } else {
    console.error('[모달 에러!] load HTML');
  }
};

$.ajax({
  type: 'get',
  url: `//${window.location.host}/data/story`,
  data: {},
  success,
});
```
