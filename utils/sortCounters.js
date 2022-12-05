export const sortCounters = (counters, sortOption) => {
  let sortedCounters = [...counters]
  
  if (sortOption === 'name asc') {
    sortedCounters.sort((a, b) => a.name.localeCompare(b.name))
  }
  if (sortOption === 'name desc') {
    sortedCounters.sort((a, b) => b.name.localeCompare(a.name))
  }
  if (sortOption === 'value asc') {
    sortedCounters.sort((a, b) => a.value - b.value)
  }
  if (sortOption === 'value desc') {
    sortedCounters.sort((a, b) => b.value - a.value)
  }

  return sortedCounters
}
