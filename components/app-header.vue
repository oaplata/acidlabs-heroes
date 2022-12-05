<template>
  <header class="app-header">
    <nav class="app-nav" :class="{ filters: thereIsFilters }">
      <div class="sort-select">
        <select id="sort-by" v-model="sortOption">
          <option value="">Original</option>
          <option value="name asc">Nombre ascendente</option>
          <option value="name desc">Nombre descendente</option>
          <option value="value asc">Valor ascendente</option>
          <option value="value desc">Valor descendente</option>
        </select>
        <span class="custom-arrow"></span>
      </div>
      <div class="filters">
        <template v-if="thereIsFilters">
          <div class="summary" >
            <span v-if="filterMinStore">Desde: <b>{{ filterMinStore }}</b></span>
            <span v-if="filterMaxStore">Hasta: <b>{{ filterMaxStore }}</b></span>
            <span v-if="filterNameStore">Nombre: <b>{{ filterNameStore }}</b></span>
          </div>
          <ion-icon name="trash" @click="clearFilters"></ion-icon>
        </template>
        <ion-icon name="filter" v-else @click="showFilters"></ion-icon>
        </div>
    </nav>
  </header>
  <div class="overlay" :class="{ visible: filtersVisible }">
    <div class="modal-filters">
      <input type="number" id="filter-min" placeholder="Desde" v-model="filterMin">
      <input type="number" id="filter-max" placeholder="Hasta" v-model="filterMax">
      <input type="text" id="filter-name" placeholder="Nombre" v-model="filterName">
      <button @click="applyFilters">filtrar</button>
    </div>
  </div>
</template>
<script setup>
import { useStore } from 'vuex'
const store = useStore()

const sortOption = ref('')

const filtersVisible = ref(false)

const filterMin = ref(null)
const filterMax = ref(null)
const filterName = ref('')

const applyFilters = () => {
  const filters = {
    min: filterMin.value,
    max: filterMax.value,
    name: filterName.value
  }

  filterMin.value = null
  filterMax.value = null
  filterName.value = ''

  filtersVisible.value = false

  store.commit('setFilters', filters)
}

const clearFilters = () => {
  store.commit('setFilters', {})
}

const showFilters = () => {
  filtersVisible.value = true
}

// bindings vuex

const sortOptionStore = computed(() => store.getters.sortBy)
watch(sortOptionStore, (val) => sortOption.value = val, { immediate: true })

const filterMinStore = computed(() => store.getters.filtersMin)
watch(filterMinStore, (val) => filterMin.value = val, { immediate: true })

const filterMaxStore = computed(() => store.getters.filtersMax)
watch(filterMaxStore, (val) => filterMax.value = val, { immediate: true })

const filterNameStore = computed(() => store.getters.filtersName)
watch(filterNameStore, (val) => filterName.value = val, { immediate: true })

watch(sortOption, () => store.commit('sortBy', sortOption.value))

const thereIsFilters = computed(() => filterMinStore.value || filterMaxStore.value || filterNameStore.value)
</script>
<style>
.app-header {
  padding: 1rem;
  background-color: var(--primaryColor);
}

.app-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.sort-select {
  position: relative;
  width: fit-content;
  height: fit-content;
}

.sort-select select {
  border: none;
  appearance: none;
  outline: none;
  background-color: var(--bgColor);
  padding-top: .5rem;
  padding-bottom: .5rem;
  padding-left: 1rem;
  padding-right: 3rem;
  border-radius: .5rem;
  color: var(--textColor);
  font-weight: bold;
}

.sort-select .custom-arrow {
  position: absolute;
  width: 2rem;
  height: 100%;
  background-color: var(--textColor);
  top: 0;
  right: 0;
  border-top-right-radius: .5rem;
  border-bottom-right-radius: .5rem;
  pointer-events: none;
  display: flex;
  justify-content: center;
  align-items: center;
}

.sort-select .custom-arrow::after {
  content: '';
  border-top: .5rem solid var(--bgColor);
  border-left: .5rem solid transparent;
  border-right: .5rem solid transparent;
}

.sort-select select option {
  padding: .5rem;
  font-weight: 500;
}

.filters {
  display: flex;
  align-items: center;
}

.filters .summary {
  display: flex;
  flex-direction: row;
  gap: .5rem;
  font-size: .8rem;
  font-weight: 500;
  margin-left: .5rem;
  margin-right: .5rem;
  color: var(--textColor);
}
.filters ion-icon {
  color: var(--textColor);
}

.filters img {
  height: 25px;
  cursor: pointer;
}

.overlay {
  content: '';
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
  visibility: hidden;
}

.overlay.visible {
  visibility: visible;
}

.modal-filters {
  position: absolute;
  top: -20%;
  visibility: hidden;
  background-color: var(--textColor);
  max-width: 400px;
  width: 90%;
  left: 50%;
  padding: 1rem;
  border-radius: 1rem;
  transform: translateX(-50%) scale(0.1);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: transform .5s, top .5s;
}

.overlay.visible .modal-filters {
  top: 20%;
  transform: translateX(-50%) scale(1);
  visibility: visible;
}

.modal-filters input {
  background-color: var(--bgColor);
  border: none;
  outline: none;
  padding: .5rem;
  border-radius: .5rem;
  color: var(--textColor);
  font-weight: 600;
}

.modal-filters input::placeholder {
  color: inherit;
  opacity: .8;
}

.modal-filters button {
  width: fit-content;
  align-self: flex-end;
  padding: .5rem 1.5rem;
  border: none;
  border-radius: .5rem;
  background-color: var(--primaryColor);
  font-weight: 800;
  color: var(--textColor);
  text-transform: uppercase;
}

/* media query */

@media screen and (max-width: 600px) {
  .app-nav.filters {
    flex-direction: column;
    gap: .5rem;
    align-items: flex-end;
  }

  .filters .summary {
    font-size: .6rem;
  }
}

</style>
