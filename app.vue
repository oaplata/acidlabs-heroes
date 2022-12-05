<template>
  <NuxtLayout></NuxtLayout>
</template>
<script setup>
import { useStore } from 'vuex'
onMounted(() => {
  if (process.client) useStore().dispatch('loadStore')  
})
</script>
<style>
:root {
  --primaryColor: #462181;
  --bgColor: #39383B;
  --textColor: #b1f4ca;
  --secondaryTextColor: #FFFFFF;
}
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
*::before,
*::after {
  box-sizing: border-box;
}
</style>
