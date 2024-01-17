# JavaScript DOM

https://developer.mozilla.org/ko/docs/Web/API/Document_Object_Model/Introduction#dom_%EA%B3%BC_javascript

# DOM 이 업데이트 될 때 마다 getElementById 다시 호출해야 할까?

DOM이 업데이트될 때마다 getElementById를 다시 호출할 필요는 없습니다. DOM(Document Object Model)은 웹 페이지의 구조를 나타내는 표현 방식으로, HTML, XML 등의 문서를 계층 구조로 표현합니다.

getElementById는 주어진 ID에 해당하는 엘리먼트를 찾아 반환하는 메서드이며, 이 메서드를 호출하면 현재 DOM 상태에서 해당 ID를 가진 엘리먼트를 찾아 반환합니다. 그러나 DOM이 업데이트되더라도 해당 ID를 가진 엘리먼트가 변경되지 않는다면, 즉, 엘리먼트의 속성이나 내용이 변경되지 않는 한 추가 호출이 필요하지 않습니다.

DOM이 동적으로 업데이트되어 엘리먼트가 추가, 제거, 또는 변경되는 경우에는 업데이트된 DOM에서 getElementById를 다시 호출하여 최신 정보를 얻을 수 있습니다. 그러나 불필요한 호출을 피하기 위해 필요한 경우에만 호출하도록 주의해야 합니다.
