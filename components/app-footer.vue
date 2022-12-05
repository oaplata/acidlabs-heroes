<template>
  <footer class="app-footer">
    <p>Total: <span>{{ totalCounters }}</span></p>
  </footer>
</template>
<script setup>
import { useStore } from 'vuex'
const store = useStore()
const totalCounters = computed(() => store.getters.totalCounters)
</script>
<style>
.app-footer {
  padding: 1rem;
  background-color: var(--primaryColor);
  text-align: center;
  font-weight: 500;
  color: var(--textColor);
}
.app-footer span{
  padding: 0 1rem;
  height: fit-content;
  background-color: var(--bgColor);
  font-weight: 800;
}
</style>
