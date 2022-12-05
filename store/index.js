import { createStore } from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
import { storeKey } from '~/config.json'

const state = () => ({
  counters: [],
  sortedCounters: [],
  config: {
    filters: {},
    sort: '',
  }
})

const saveState = (store) => {
  store.subscribe((_, state) => {
    const localState = { counters: state.counters, sortedCounters: state.sortedCounters }
    localStorage.setItem(storeKey, JSON.stringify(localState))
    const sessionState = { config: state.config }
    sessionStorage.setItem(storeKey, JSON.stringify(sessionState))
  })
}

const store = createStore({
  plugins: [saveState],
  state,
  mutations,
  actions,
  getters
})

export default store
