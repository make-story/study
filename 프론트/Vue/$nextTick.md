# $nextTick

https://doozi316.github.io/vuejs/2020/08/10/Vue4/

- data 가 업데이트 되고 난 직후, UI가 갱신될 때 Vue가 DOM을 찾지 못하는 경우가 발생
- 비동기로 처리되는 Javascript의 특성 때문

```vue
<div id="app">
    <div v-for="item in list">
        <div v-bind:id="bindId(item)"></div> <!-- 2 -->
    </div>
</div>

<script>
new Vue({
    el: '#app',
    data: function() {
        return {
            list: []
        };
    },
    created: function() {
        var self = this;

        for(var i=0; i<100; i++) {
            this._data.list.push(i); // 1
        }

        var dom = document.getElementById('item-0'); // 4
        dom.style.backgroundColor = 'red'; // 5
    },
    methods: {
        bindId: function(item) {
            return 'item-' + item; // 3
        }
    }
})
</script>
```

1. list에 데이터를 넣는 과정
2. v-bind:id를 통해 bindId(item) 메소드가 호출되는데, 이때 item은 list의 요소이다.
3. 호출된 bindId() 메소드가 실행됨
4. id가 “item-0”인 요소를 찾아
5. 배경색을 red로 지정

여기서 1이 수행되고 난 뒤에 2가 수행된다면 문제가 없겠지만, 1이 완료되기도 전에 DOM(2)이 그려지기 때문에 문제발생  
이러한 문제를 해결해주는 것이 callback 함수 $nextTick이다.

```javascript
new Vue({
  created: function () {
    // ...

    // nextTick으로 감싼 뒤 callback을 통해 DOM을 조작하게 되면 vue 엣서 데이터 갱신 후 UI까지 완료한 뒤에 nextTick에 있는 함수를 최종적으로 수행함
    this.$nextTick(function () {
      const dom = document.getElementById('item-0');
      dom.style.backgroundColor = 'red';
    });
  },
});
```
