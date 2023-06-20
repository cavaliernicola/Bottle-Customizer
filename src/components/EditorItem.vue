<script setup>
import { Icon } from "@iconify/vue";
import { CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle } from '@coreui/vue';
import BottleItem from "./BottleItem.vue";
import { useBottleStore } from '../store/bottleStore';
import { storeToRefs } from 'pinia'

const store = useBottleStore();
const { availablePieces, selected } = storeToRefs(store);

const emit = defineEmits(['change-selection', "restart-action", 'undo-action', 'set-random']);
</script>

<template>
  <div class="editor-content">
    <div class="toggle-bar">
      <button class="option" @click="emit('set-random')">
        <Icon icon="zondicons:shuffle" width="24"/>
        <p>Random</p>
      </button>

      <button class="option" :disabled="availablePieces.every(item => item.color == '')" @click="emit('undo-action')">
        <Icon icon="majesticons:undo" width="30" />
        <p>Undo</p>
      </button>

      <button class="option" @click="emit('restart-action')">
        <Icon icon="iconamoon:restart" width="24" />
        <p>Restart</p>
      </button>

      <RouterLink to="/result" class="option" >
        <Icon icon="carbon:task-complete" width="24" />
        <p>Complete</p>
      </RouterLink>
    </div>

    <CDropdown style="margin: 5px;" direction="center" class="dropdown-center" :popper="false">
      <CDropdownToggle style="font-size: 20px; margin-top: 10px; background-color: whitesmoke; font-family: Arial, Helvetica, sans-serif; font-weight: bold;" >
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <Icon icon="ci:hamburger-md" width="30"/>
          <p style="margin: 0 auto;">{{ availablePieces[selected].name }}</p>
          <div @click.stop.prevent style="display: flex;">
            <button class="action-button prev" @click="emit('change-selection', -1)"><Icon icon="ooui:next-rtl" width="23" color="black" /></button>
            <button class="action-button next" @click="emit('change-selection', +1)"><Icon icon="ooui:next-ltr" width="23" color="black" /></button>
          </div>
        </div>
      </CDropdownToggle>

      <CDropdownMenu style="text-align: center; width: 100%;">
        <CDropdownItem v-for="value, index in availablePieces" :active="index == selected" @click="emit('change-selection', index, true)">{{ value.name }}</CDropdownItem>
      </CDropdownMenu>
    </CDropdown>

    <BottleItem :selected="selected"/>
  </div>
</template>

<style lang="scss" scoped>
// Override CoreUI dropdown menu
.dropdown-toggle {
  border: none;

  &::after {
    display: none;
  }
}

.action-button {
  border: none;
  padding: 5px;
  background-color: transparent;

  &.next:active {
    transform: translateX(4px);
  }

  &.prev:active {
    transform: translateX(-4px);
  }
}

// Editor + Buttons style
.editor-content {
  display: flex;
  flex-direction: column;
  box-shadow: rgba(213, 217, 217, .5) 0 2px 5px 0;
  width: 80%;
  height: 670px;

  .toggle-bar {
    display: flex;
    overflow-x: auto;
    overflow-y: hidden;
    box-shadow: rgba(213, 217, 217, .5) 0 2px 5px 0;
    touch-action: pan-x;
    // padding: 6px;

    &::-webkit-scrollbar {
      height: 12px;
    }

    /* Track */
    &::-webkit-scrollbar-track {
      box-shadow: inset 0 0 5px grey;
      border-radius: 5px;
      margin: 10px;
    }

    /* Handle */
    &::-webkit-scrollbar-thumb {
      background: grey;
      border-radius: 5px;
    }
    .option {
      all: unset;
      padding: 6px 0px;
      flex:1 0 150px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-right: 1px solid lightgrey;
      font-weight: bold;
      font-family: Arial, Helvetica, sans-serif;
      cursor: pointer;

      &:hover {
        background-color: #f7fafa;
      } 

      &:disabled {
        opacity: 0.4;
      }

      &:not(:disabled):active {
        transform: translateY(4px);
      }

      &:last-child {
        border: none;
      }

      * {
        margin: 5px;
      }
    }
  }
}
</style>