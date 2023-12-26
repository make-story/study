# Vuex

컴포넌트 -> 액션호출 -> 액션에서 비동기처리(API 호출) -> 비동기처리 응답값 뮤테이션 호출 -> 뮤테이션에서 상태(state)값 변경

## getters

특정 state 값을 반환하거나, state 를 가공한 값을 반환  
state 값을 가져와 여러 컴포넌트에서 동일한 가공을 해야할 때, 가공로직 공통화 할 수 있음

## actions

비동기 코드(비동기 데이터 호출 등)를 위해 액션 객체를 사용
store.dispatch('액션명')

## mutations

Mutation 은 State 의 변경역할  
context.commit('뮤테이션명')

## actions 와 mutations 차이

Mutations 는 동기적 로직을 정의, Actions 는 비동기적 로직을 정의

https://joshua1988.github.io/web-development/vuejs/vuex-actions-modules/

Mutations 에는 순차적인 로직들만 선언하고 Actions 에는 비 순차적 또는 비동기 처리 로직들을 선언한다.  
그렇다면 왜 처리 로직의 성격에 따라 Mutations 과 Actions 로 나눠 등록해야 할까?

Mutations 의 역할 자체가 State 관리에 주안점을 두고 있다.  
상태관리 자체가 한 데이터에 대해 여러 개의 컴포넌트가 관여하는 것을 효율적으로 관리하기 위함인데 Mutations 에 비동기 처리 로직들이 포함되면 같은 값에 대해 여러 개의 컴포넌트에서 변경을 요청했을 때, 그 변경 순서 파악이 어렵기 때문이다.

# Vuex - dynamic namespaces in binding helpers (mapState, mapActions, mapMutations)

https://stackoverflow.com/questions/55927452/vuex-dynamic-namespaces-in-binding-helpers-mapstate

https://github.com/vuejs/vuex/issues/863#issuecomment-329510765

```javascript
{
  props: ['namespace'],

  computed: mapState({
    state (state) {
      return state[this.namespace]
    },
    someGetter (state, getters) {
      return getters[this.namespace + '/someGetter']
    }
  }),

  methods: {
    ...mapActions({
      someAction (dispatch, payload) {
        return dispatch(this.namespace + '/someAction', payload)
      }
    }),
    ...mapMutations({
      someMutation (commit, payload) {
        return commit(this.namespace + '/someMutation', payload)
      }
    })
  }
}
```

# Vuex - 여러 작업을 동기적으로 디스패치해야 하는 경우

```
dispatch(type: string, payload?: any, options?: Object): Promise<any>
dispatch(action: Object, options?: Object): Promise<any>
```

```javascript
// Chaining dispatch calls
this.$store
  .dispatch('action1')
  .then(() => this.$store.dispatch('action2'))
  .then(() => this.$store.dispatch('action3'))
  .catch(error => {
    // Handle errors if any of the actions fail
    console.error(error);
  });
```

```javascript
// Using async/await
try {
  await this.$store.dispatch('action1');
  await this.$store.dispatch('action2');
  await this.$store.dispatch('action3');
} catch (error) {
  // Handle errors if any of the actions fail
  console.error(error);
}
```

https://stackoverflow.com/questions/64471277/vuex-does-dispatch-return-a-promise-so-that-you-can-chain-them

```javascript
export const actions = {
  async doSomethingMaster({ dispatch }) {
    await dispatch('doSomething');
    await dispatch('doSomething2');
    await dispatch('doSomething3');
  },
  doSomething() {},
  doSomething2() {},
  doSomething3() {},
};
```
