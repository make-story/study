# 앨리먼트 & 컴포넌트 접근 (Vue2 와 Vue3 차이 확인필요)

https://v2.ko.vuejs.org/v2/guide/components-edge-cases.html

## 루트 엘리먼트에 접근하기

```
// root의 데이터 가져오기
this.$root.foo

// root의 데이터 수정하기
this.$root.foo = 2

// root의 computed 속성 접근하기
this.$root.bar

// root의 method 사용하기
this.$root.baz()
```

## 부모 컴포넌트 인스턴스에 접근하기 - $parent

https://jsfiddle.net/chrisvfritz/ttzutdxh/

```html
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCkUOdZ5y7hMm0yrcCQoCvLwzdM6M8s5qk"></script>
<script src="https://unpkg.com/vue"></script>

<div id="app">
  <google-map>
    <google-map-marker v-bind:places="vueConfCities"></google-map-marker>
  </google-map>
</div>
```

```javascript
Vue.component('google-map', {
  data: function () {
    return {
      map: null,
    };
  },
  mounted: function () {
    this.map = new google.maps.Map(this.$el, {
      center: { lat: 0, lng: 0 },
      zoom: 1,
    });
  },
  methods: {
    getMap: function (found) {
      var vm = this;
      function checkForMap() {
        if (vm.map) {
          found(vm.map);
        } else {
          setTimeout(checkForMap, 50);
        }
      }
      checkForMap();
    },
  },
  template: '<div class="map"><slot></slot></div>',
});

Vue.component('google-map-marker', {
  props: ['places'],
  created: function () {
    var vm = this;
    vm.$parent.getMap(function (map) {
      vm.places.forEach(function (place) {
        new google.maps.Marker({
          position: place.position,
          map: map,
        });
      });
    });
  },
  render(h) {
    return null;
  },
});

new Vue({
  el: '#app',
  data: {
    vueConfCities: [
      {
        name: 'Wrocław',
        position: {
          lat: 51.107885,
          lng: 17.038538,
        },
      },
      {
        name: 'New Orleans',
        position: {
          lat: 29.951066,
          lng: -90.071532,
        },
      },
    ],
  },
});
```

## 자식 컴포넌트의 인스턴스 및 요소에 접근하기 - $refs

ref 속성을 이용해 자식 요소에 레퍼런스 ID를 할당

```html
<div id="it_list">
  <mine-it inline-template ref="mint">
    <ul>
      <li>mine</li>
      <li>it</li>
      <li>record</li>
      <button v-on:click="goParnet()">VueJS</button>
    </ul>
  </mine-it>
</div>
```

```javascript
Vue.component('mine-it', {
  data() {
    return {
      test: 'hi',
    };
  },
  methods: {
    goParnet: function () {
      this.$parent.goChild();
    },
    hiParent: function () {
      alert(this.test);
    },
  },
});

new Vue({
  el: '#it_list',
  data: {},
  methods: {
    goChild: function () {
      // 하위(자식) 컴포넌트 중 $refs 접근
      this.$refs.mint.hiParent();
    },
  },
});
```
