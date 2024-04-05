# Vue 성능 최적화

https://curious-notes.netlify.app/posts/vue-optimization

https://velog.io/@gykim/Vue-weo9vxer

https://tech.kakao.com/2023/06/13/fe-performance-improvement-2/

## v-once 로 한 번만 렌더링하기

```vue
<user-avatar v-once :user-obj="userObj"></user-avatar>
```

v-once 를 과도하게 사용하다보면 업데이트가 안되는 상황에서 디버깅이 어려울 수 있습니다.

## Keep-alive 를 사용한 캐싱

keep-alive 를 사용하면 컴포넌트가 destroy 되지 않고 상태가 보존된다.  
컴포넌트 인스턴스가 전역 큐에 저장되어 재활성화 될 때도 다시 렌더링되지 않고 캐싱된 상태를 사용할 수 있다

```vue
<keep-alive>
    <component :is="currentView"></component>
</keep-alive>
```

## v-for 에서 key 를 사용해야 하는 이유

https://codesandbox.io/p/sandbox/object-constancy-dxxze?file=%2Fsrc%2FApp.vue%3A1%2C1-79%2C1

```vue
<template>
  <div id="app">
    <h2>Object Constancy Demo</h2>

    <transition-group name="slide">
      <div v-for="item in list" :key="item.id" @click="removeFromList(item)">
        {{ item.id }}
      </div>
    </transition-group>

    <hr />

    <transition-group name="slide">
      <div
        v-for="(item, index) in list"
        :key="index"
        @click="removeFromList(item)"
      >
        {{ item.id }} - {{ index }}
      </div>
    </transition-group>

    <hr />

    <button @click="reset">Reset</button>
  </div>
</template>

<script>
const data = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];
export default {
  name: 'App',
  data() {
    return {
      list: [...data],
    };
  },
  methods: {
    removeFromList(item) {
      console.log(this.list);
      this.list.splice(
        this.list.findIndex(i => i.id === item.id),
        1,
      );
    },
    reset() {
      this.list = [...data];
    },
  },
};
</script>

<style>
.slide-enter-active,
.slide-leave-active {
  transition: 4s;
}
.slide-enter,
.slide-leave-to {
  transform: translate(-50%, 0);
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#app div {
  cursor: pointer;
  padding: 5px 0;
  font-size: bold;
  position: relative;
  float: left;
  width: 100%;
}

#app div:hover {
  background-color: #0099cc;
  color: white;
}
</style>
```

---

# Vue 메모리릭

https://kdydesign.github.io/2019/04/10/vuejs-performance/

가장 중요한 것은 위에서 언급한 객체의 속성을 읽거나 수정 항목이다.

Vue 는 data, state, computed, getters 와 같은 모델이 선언되면  
defineReactive 를 통해 해당 객체는 반응형 관리 대상으로 등록되어 반응적으로 변경이 되는데  
이 과정에서 각 개체마다 Observe 생성되고 내부적으로 getter/setter가 생성된다.  
실제로 모델의 데이터를 열어보면 **Ob**이 붙은 것을 확인할 수 있다.

생각해보자 10만건에 대해서 객체가 반응형이라면  
개체 1개 마다 getter/setter 가 생성될 것이다.  
10만개의 데이터가 단순 배열이 아닌 객체구조라면?? 10만건에 대해 이러한 과정을 거치는 것이(memory write) js heap memory의 증가 이유가 된다.

해결방법은 단순하다.  
대용량 데이터를 가진 모델에 대해 Vue 의 감지 대상에서 제거하면 된다.  
즉 Observe 가 생성되지 않게 처리하면 되는데 이는 vue 의 관점에 처리해야 한다.

`Object.freeze() - 사용`
이를 해결하기 위해서는 대용량 데이터를 가지고 있는 model 또는 state 에 대해서 Object.freeze()를 사용하여 처리한다.  
Object.freeze() 는 해당 객체를 read only 로 처리를 하기 때문에 이 객체에 대해서는 속성을 추가할 수도 없고 제거할 수도 없으며, 수정할 수도 없다.  
또한 해당 객체에 대한 프로토타입 역시 변경할 수 없다. 이렇게 순수하게 read only 객체로 되기 때문에 vue 에서도 감지의 대상이 되지 않는다.

```javascript
// state
export const state = {
  bookList: [],
};

// mutations
export const mutations = {
  setBookList(state, payload) {
    state.bookList = Object.freeze(payload);
  },
};

// actions
export const actions = {
  getBookList({ commit }) {
    // API call
    // ...

    commit('setBookList');
  },
};
```

하지만 위에서 언급한 바와 같이 Object.freeze()를 사용하게 되면 해당 객체는 변경이 불가능하기 때문에  
기능상 CRUD 의 행위들은 모두 불가능하게 된다.  
이 부분은 객체를 복사하는 방향으로 진행할 수 있으며, 객체를 복사한다 하더라고 기존에 증가되는 메모리 양보다는 비용이 적게든다.  
중요한 것은 복제된 객체는 전혀 다른 객체가 되므로 Object.freeze()의 대상이 되지 않으며 (map의 경우 동일) 변경이 가능하게 되지만  
최종적으로는 다시 Object.freeze() 로 vue 의 감지 대상에서 제거해야한다.

```javascript
// state
export const state = {
  bookList: [],
};

// mutations
export const mutations = {
  addBookList(state, boolList) {
    // lodash clone
    let cloneBookList = _.cloneDeep(bookList);

    cloneBookList.splice(1, 0, { name: 'add book', date: '2019-04-08' });

    state.bookList = Object.freeze(cloneBookList);
  },
};
```

또는

```javascript
//state
export const state = {
  bookList: [],
};

// mutations
export const mutations = {
  addBookList(state, boolList) {
    // lodash map
    let cloneBookList = bookList.map(book => (book.name = 'kdydesign'));

    state.bookList = Object.freeze(cloneBookList);
  },
};
```
