<script setup>
import { computed } from 'vue';
import EditorManager from "../components/EditorManager.vue";
import EditorColorSidebar from '../components/EditorColorSidebar.vue';
import { isEqual } from "lodash";
import { useBottleStore } from '../store/bottleStore';
import { storeToRefs } from 'pinia'

const store = useBottleStore();
const { availablePieces, selected, prevActions } = storeToRefs(store);

const randomColors = computed(() => {
  const result = [];
  for (let i = 0; i <= 30; i++) {
    let randomColor = '#' + Math.floor(Math.random() * (0xffffff + 1)).toString(16).padStart(6, '0')
    if (!result.includes(randomColor)) {
      result.push(randomColor)
    }
  }
  return result;
})

const resetList = () => {
  availablePieces.value.length = 0;
  prevActions.value.length = 0;
  const pieceName = ["Cap", "Neck", "Body", "Bottom"];
  
  for (let piece of pieceName) {    
    availablePieces.value.push({ name: piece, color: "" })
  }
}

const manageSelection = (value, force)  => {
  if (force) return selected.value = value;

  if (selected.value + value < 0) selected.value = availablePieces.value.length - 1;
  else if (selected.value + value <= availablePieces.value.length - 1) selected.value += value;
  else selected.value = 0
}

const undoAction = () => {
  if (!prevActions.value.length) return resetList();
  
  // We pop the latest item of the list to replace it with the availablePieces value.
  const prev = prevActions.value.pop();

  // This means this is the first time the user goes back, therefore the last value is the same of the current one and the click wouldn't produce any result.
  if (isEqual(availablePieces.value, prev)) {
    if (!prevActions.value.length) return resetList();
    else availablePieces.value = prevActions.value.pop();
  } 
  else availablePieces.value = prev
}

const setRandomColor = () => {
  resetList();
  for (let i = 0; i < availablePieces.value.length; i++){
    availablePieces.value[i].color = randomColors.value[Math.floor(Math.random() * randomColors.value.length)]
  }
}

const setColor = (color, backup) => {
  if (availablePieces.value[selected.value].color === color) return;

  availablePieces.value[selected.value].color = color

  if (backup) {
    const result = []
    for (let el of availablePieces.value) {
      // We need to get a copy otherwise the element will keep the same values.
      result.push({...el})
    }
    prevActions.value.push(result)
  }
}

// Populate the list if it's empty
if (!availablePieces.value.length) {
  resetList();
}
</script>

<template>
  <div class="main-content">
    <EditorManager @change-selection="manageSelection" @restart-action="resetList" @undo-action="undoAction" @set-random="setRandomColor" />
    <EditorColorSidebar :random-colors="randomColors" @change-color="setColor"/>
  </div>
</template>

<style scoped lang="scss">
.main-content {
  margin: 20px;
  display: flex;
  justify-content: center;
  padding-bottom: 40px;
}

@media only screen and (max-width: 480px) {
  .main-content {
    flex-direction: row-reverse;
  }
}
</style>
