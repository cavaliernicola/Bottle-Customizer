<script setup>
import { RouterView } from 'vue-router';
import TheHeader from './components/TheHeader.vue';

// Enable Hover on mobile: https://stackoverflow.com/a/17260431
document.addEventListener("touchstart", () => {}, true);
</script>

<template>
  <div>
    <TheHeader />
    <RouterView />
  </div>
</template>

<style lang="scss">
body {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

// Globally style all the buttons of the page in the same way.
.button {
  all: unset;
  display: flex; 
  height: 30px;
  margin: 5px;
  border-radius: 5px;
  border: 1px solid rgba(213, 217, 217, .5);
  box-shadow: 2px 2px 2px rgba(213, 217, 217, .5);
  align-items: center;
  cursor: pointer;
  
  p {
    color: black;
    margin: 0 auto;
  }

  &:hover {
    background-color: #f7fafa;
  } 

  &:active {
    transform: translateY(4px);
  }
}
</style>
