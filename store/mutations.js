import { sortCounters } from "~/utils/sortCounters"

const mutations = {
  addCounter (state, newCounter) {
    state.counters.push(newCounter)
    state.sortedCounters = sortCounters(state.counters, state.config.sort)
  },
  incrementCounter (state, id) {
    const counter = state.counters.find(c => c.id === id)
    counter.value++
  },
  decrementCounter (state, id) {
    const counter = state.counters.find(c => c.id === id)
    counter.value--
  },
  removeCounter (state, id) {
    const index = state.counters.findIndex(c => c.id === id)
    state.counters.splice(index, 1)
    state.sortedCounters = sortCounters(state.counters, state.config.sort)
  },
  sortBy (state, sortOption) {
    state.config.sort = sortOption
    state.sortedCounters = sortCounters(state.counters, sortOption)
  },
  setFilters (state, filters) {
    state.config.filters = filters
  },
  loadStore (state, { counters, sortedCounters, config }) {
    state.counters = counters
    state.sortedCounters = sortedCounters
    state.config = config
  }
}

export default mutations
