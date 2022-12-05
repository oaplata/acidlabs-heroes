<template>
  <main class="app-main">
    <app-new-counter />
    <div class="counter-list">
      <app-counter v-for="counter of counters" :key="counter.id" :counter="counter" />
    </div>
  </main>
</template>
<script setup>
import { useStore } from 'vuex'

const store = useStore()
const counters =  computed(() => store.getters.counters)
</script>
<style>
.app-main {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.counter-list {
  max-width: 800px;
  width: 90%;
  margin-bottom: 2rem;
}
</style>
