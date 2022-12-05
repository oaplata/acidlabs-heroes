<template>
  <div class="overlay" :class="{ visible: modalVisible }">
    <div class="modal-new-counter">
      <div>
        <input type="text" placeholder="Indique el nombre" :class="{ error: !!errorMessage }" v-model="nameCounter">
        <span v-if="errorMessage">{{ errorMessage }}</span>
      </div>
      <div class="btns">
        <button @click="addCounter">Agregar</button>
        <button class="cancell" @click="closeModal">Cancelar</button>
      </div>
    </div>
  </div>
  <button v-if="canAddMoreCounters" @click="openModal" class="new-counter-btn">Nuevo contador</button>
</template>
<script setup>
import { useStore } from 'vuex'
import { minCounterValue } from '~/config.json'

const store = useStore()

const canAddMoreCounters = computed(() => store.getters.canAddMoreCounters)

const modalVisible = ref(false)
const nameCounter = ref('')
const errorMessage = ref('')

watch(nameCounter, () => {
  errorMessage.value = ''
})

const closeModal = () => modalVisible.value = false
const openModal = () => modalVisible.value = true

const addCounter = async () => {
  const newCounter = {
    name: nameCounter.value,
    value: minCounterValue,
    id: Date.now()
  }

  const result = await store.dispatch('addCounter', newCounter)
  if (result.error) {
    errorMessage.value = getErrorMessage(result.code)
  } else {
    nameCounter.value = ''
    modalVisible.value = false
  }
}
</script>
<style>
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

.modal-new-counter {
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

.overlay.visible .modal-new-counter {
  top: 20%;
  transform: translateX(-50%) scale(1);
  visibility: visible;
}

.modal-new-counter input {
  background-color: var(--bgColor);
  border: none;
  outline: none;
  padding: .5rem;
  border-radius: .5rem;
  color: var(--textColor);
  font-weight: 600;
  width: 100%;
}

.modal-new-counter input.error {
  border: solid 1px #ab5060;
  color: #ab5060;
}

.modal-new-counter span {
  padding-left: .5rem;
  color: #ab5060;
  font-size: .8rem;
}

.modal-new-counter input::placeholder {
  color: inherit;
  opacity: .8;
}

.modal-new-counter .btns {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}

.modal-new-counter button {
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

.modal-new-counter button.cancell {
  background-color: var(--bgColor);
}

.new-counter-btn {
  margin-right: 2rem;
  margin-top: 2rem;
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
</style>
