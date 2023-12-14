# Vuex - dynamic namespaces in binding helpers (mapState

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
