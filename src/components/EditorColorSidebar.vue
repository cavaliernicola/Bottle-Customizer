<script setup>
import { useBottleStore } from '../store/bottleStore';
import { storeToRefs } from 'pinia'

const store = useBottleStore();
const { availablePieces, selected } = storeToRefs(store);

const emit = defineEmits(['change-color']);
const props = defineProps({
  randomColors: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <div class="color-sidebar">
    <div class="color" style="display: flex; justify-content: center; box-shadow: none; align-items: center; margin-top: 5px;">
      <input type="color" value="#ff6666" @input="emit('change-color', $event.target.value)" @click="emit('change-color', $event.target.value, true)">
    </div>
    <div v-for="color in randomColors" @click="emit('change-color', color, true)" class="color" :class="{'selected': availablePieces[selected].color == color}" :style="{backgroundColor: color}" />
  </div>
</template>


<style lang="scss" scoped>
.color-sidebar {
  box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;
  width: 80px;
  max-width: 20%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  height: 670px;

  &::-webkit-scrollbar {
    display: none;
  }
  
  .color {
    flex:0 0 50px;
    width: 90%;
    margin: auto;
    margin-bottom: 5px;
    border-radius: 5px;
    box-shadow: rgba(213, 217, 217, .5) 0 2px 5px 0;
    cursor: pointer;

    input[type="color"] {
      width: 90%; 
      height: 100%; 
      border: none;
      background-color: transparent;
      cursor: pointer
      ;
      &:-webkit-color-swatch-wrapper {
        padding: 0;
      }

      &::-webkit-color-swatch {
        border: 1.5px solid black;
        border-radius: 25px;
        margin: 0 auto;
      }
    }

    &.selected {
      border-radius: 0px 5px 5px 0px;
      border-left: 6px solid rgb(28, 28, 183);
    }
  }
}

@media only screen and (max-width: 480px) {
  .color-sidebar .color.selected {
    border-left: initial;
    border-radius: 5px 0px 0px 5px;
    border-right: 6px solid rgb(28, 28, 183);
  }
}
</style>