<template>
  <div class="counter">
    <h3>{{ counter.name }}</h3>
    <div class="controls">
      <img src="~/assets/minus.png" @click="decrement" class="decrement">
      <span>{{ counter.value }}</span>
      <img src="~/assets/plus.png" @click="increment" class="increment">
      <img src="~/assets/remove.png" @click="remove" class="delete">
    </div>
  </div>
</template>
<script setup>
import { useStore } from 'vuex'
const { counter } = defineProps({ counter: Object })
const store = useStore()

const increment = () => {
  store.dispatch('incrementCounter', counter.id)
}
const decrement = () => {
  store.dispatch('decrementCounter', counter.id)
}
const remove = () => {
  store.commit('removeCounter', counter.id)
}
</script>
<style>
.counter {
  width: 100%;
  background-color: var(--textColor);
  padding: .5rem 1rem .5rem 2rem;
  border-radius: .5rem;
  margin-top: 1rem;
  color: var(--secondaryTextColor);
  display: flex;
  justify-content: space-between;
}

.counter h3 {
  background-color: var(--bgColor);
  padding-right: 2rem;
  padding-left: .5rem;
  color: var(--textColor);
  border-radius: .5rem;
  display: flex;
  align-items: center;
}

.counter .controls {
  display: flex;
  gap: .5rem;
  align-items: center;
}

.counter .controls span {
  width: 3rem;
  height: fit-content;
  font-size: 1.2rem;
  border-radius: .5rem;
  text-align: center;
  background-color: var(--bgColor);
  color: var(--textColor);
  font-weight: bolder;
}

.counter .controls .decrement,
.counter .controls .delete,
.counter .controls .increment {
  width: 2rem;
  cursor: pointer;
}

.counter .controls .delete {
  margin-left: 3rem;
}

@media screen and (max-width: 600px) {
  .counter {
    flex-direction: column;
    position: relative;
  }
  .counter h3 {
    margin-top: 1rem;
    justify-content: center;
    padding-right: .5rem;
  }
  .counter .controls {
    justify-content: center;
    margin-top: 1rem;
    gap: 2rem;
  }
  .counter .controls .delete {
    position: absolute;
    top: .5rem;
    right: .5rem;
  }
}

</style>
