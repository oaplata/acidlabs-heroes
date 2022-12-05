<template>
  <div class="app-container">
    <div>
      <app-header />
      <app-counter-list />
    </div>
    <app-footer />
  </div>
</template>
<style>
.app-container {
  min-height: 100vh;
  width: 100%;
  background-color: var(--bgColor);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>