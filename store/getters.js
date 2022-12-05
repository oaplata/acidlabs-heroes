import { maxCounters } from '~/config.json'
const getters = {
  counters: (state) => {
    const counters = [...state.sortedCounters]

    const { name: filterName, min: filterMin, max: filterMax } = state.config.filters
    
    return counters
      .filter((c) => !filterName || c.name.toLowerCase().includes(filterName.toLowerCase()))
      .filter((c) => !filterMin || c.value >= filterMin)
      .filter((c) => !filterMax || c.value <= filterMax)
  },
  totalCounters: (state) => state.counters.reduce((acc, c) => acc + c.value, 0),
  sortBy: (state) => state.config.sort,
  filtersMin: (state) => state.config.filters.min,
  filtersMax: (state) => state.config.filters.max,
  filtersName: (state) => state.config.filters.name,
  canAddMoreCounters: (state) => state.counters.length < maxCounters,
}

export default getters
