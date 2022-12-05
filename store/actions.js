import {
  maxCounters,
  maxCounterNameLength,
  maxCounterValue,
  minCounterValue,
  storeKey
} from '~/config.json'

const actions = {
  addCounter ({ state, commit }, newCounter) {
    if (state.counters.length >= maxCounters) {
      return {
        error: true,
        code: 'MAX_COUNTERS',
      }
    }

    if (!newCounter.name?.trim()) {
      return {
        error: true,
        code: 'NAME_REQUIRED',
      }
    }

    if (newCounter.name.length > maxCounterNameLength) {
      return {
        error: true,
        code: 'NAME_TOO_LONG',
      }
    }

    commit('addCounter', newCounter)
    return {
      error: false
    }
  },
  incrementCounter({ state, commit }, id) {
    const counter = state.counters.find(c => c.id === id)

    if (!counter) return
    if (counter.value >= maxCounterValue) return

    commit('incrementCounter', id)
  },
  decrementCounter({ state, commit }, id) {
    const counter = state.counters.find(c => c.id === id)

    if (!counter) return
    if (counter.value <= minCounterValue) return

    commit('decrementCounter', id)
  },
  loadStore({ state, commit }) {
    const storageLocal = localStorage.getItem(storeKey)
    const storageSession = sessionStorage.getItem(storeKey)

    let counters = state.counters
    let sortedCounters = state.sortedCounters
    let config = state.config

    if (storageLocal) {
      const json = JSON.parse(storageLocal)
      counters = json.counters
      sortedCounters = json.sortedCounters
    }

    if (storageSession) {
      const json = JSON.parse(storageSession)
      config = json.config
    }

    commit('loadStore', { counters, sortedCounters, config })
  }
}

export default actions
