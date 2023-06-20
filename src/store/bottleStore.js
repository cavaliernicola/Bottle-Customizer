import { defineStore } from "pinia";
import { ref } from "vue";

export const useBottleStore = defineStore('bottle', () => {
  const availablePieces = ref([]);
  const selected = ref(0);
  const prevActions = ref([])

  return { availablePieces, selected, prevActions }
})