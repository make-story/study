# History API

https://developer.mozilla.org/ko/docs/Web/API/History

https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/history

```html
<button class="js-button-push-state" data-url="?page=1">1</button>
<button class="js-button-push-state" data-url="?page=2">2</button>
<button class="js-button-push-state" data-url="?page=3">3</button>
<button class="js-button-replace-state" data-url="?replace-state=0">replace-state</button>
<button class="js-button-back">back</button>
<script>
  window.onpopstate = function (event) {
    console.log(`location: ${document.location}, state: ${JSON.stringify(event.state)}`);
  };

  // pushState
  const [$buttonPushState1, $buttonPushState2, $buttonPushState3] = [
    ...document.querySelectorAll('.js-button-push-state'),
  ];
  const handlerHistoryPushState = event => {
    const $target = event.currentTarget;
    const url = $target.dataset.url || '';
    history.pushState({ state: url }, 'title', url);
    console.log('History.length', history.length);
    console.log('History.state', history.state);
  };
  $buttonPushState1.removeEventListener('click', handlerHistoryPushState);
  $buttonPushState1.addEventListener('click', handlerHistoryPushState);
  $buttonPushState2.removeEventListener('click', handlerHistoryPushState);
  $buttonPushState2.addEventListener('click', handlerHistoryPushState);
  $buttonPushState3.removeEventListener('click', handlerHistoryPushState);
  $buttonPushState3.addEventListener('click', handlerHistoryPushState);

  // replaceState
  const $buttonReplaceState = document.querySelector('.js-button-replace-state');
  const handlerHistoryReplaceState = event => {
    const $target = event.currentTarget;
    const url = $target.dataset.url || '';
    history.replaceState({ state: url }, 'title', url);
    console.log('History.length', history.length);
    console.log('History.state', history.state);
  };
  $buttonReplaceState.removeEventListener('click', handlerHistoryReplaceState);
  $buttonReplaceState.addEventListener('click', handlerHistoryReplaceState);

  // back
  const $buttonBack = document.querySelector('.js-button-back');
  const handlerHistoryBack = event => {
    history.back();
  };
  $buttonBack.removeEventListener('click', handlerHistoryBack);
  $buttonBack.addEventListener('click', handlerHistoryBack);
</script>
```
