<script setup>
import { useBottleStore } from '../store/bottleStore';
import { storeToRefs } from 'pinia'

const store = useBottleStore();
const { availablePieces } = storeToRefs(store);

// We pass selected as props because it's optional
const props = defineProps({
  selected: {
    type: Number,
    required: false
  }
})

const getColor = (name) => {
  return availablePieces.value.find(item => item.name === name)?.color
}

const getSelected = (name) => {
  return availablePieces.value[props?.selected]?.name === name;
}

</script>

<template>
  <!-- Wrapped in another div to mitigate iOS drop-shadow issues: https://stackoverflow.com/questions/38762661/css-drop-shadow-not-working-properly-in-safari -->
  <div style="height: 100%; filter: drop-shadow(5px 5px 10px #666);" class="bottle-shade">
    <!-- Bottle From: https://codepen.io/yoyo/pen/oyqEMx -->
    <div class="bottle-wrapper">
      <div class="bottle-cap" :class="{'selected': getSelected('Cap')}" :style="{'background-image': `linear-gradient(to bottom, #ffffff, #bcbdba 25%, #cecece 25%, #c7cac4 25%, #e8e8e8 20%, ${getColor('Cap') || '#981107'} 20%)`}"></div>
      
      <div class="bottle-body">
        <div class="bottle-neck-wrapper">
          <div class="bottle-neck" :style="{'background-color': getColor('Neck')}" :class="{'selected': getSelected('Neck')}"></div>
          <div class="bottle-neck-middle" :style="{'background-color': getColor('Neck')}" :class="{'selected': getSelected('Neck')}"></div>
          <div class="bottle-neck-bottom" :style="{'background-color': getColor('Neck')}" :class="{'selected': getSelected('Neck')}"></div>
          <div class="bottle-neck-bottom-last" :style="{'background-color': getColor('Neck')}" :class="{'selected': getSelected('Neck')}"></div>
        </div>
        <div class="bottle-main-body" :class="{'selected': getSelected('Body')}" :style="{'background-color': getColor('Body')}"></div>
        <div class="bottle-bottom" :class="{'selected': getSelected('Bottom')}" :style="{'background-image': `linear-gradient(to top, #bcbdba 17%, ${getColor('Bottom') || '#fee0de' } 20%)`}"></div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
$neck-background-color:#fee0de;

.bottle-wrapper {
  width: 200px;
  transform: scale(0.8);
  margin: 30px auto;
  height: 0px;
  
  .bottle-cap {
    background-size: 100% 5px;
    border-radius:10px 10px 0 0;
    width: 70%;
    height: 80px;
    margin: 0 auto;
    position: relative;

    &:after {
      content:"";
      background:#fff;
      width:100%;
      height:4px;
      bottom:-5px;
      position:absolute;
    }
  }

  .bottle-body {
    .bottle-neck {
      width:70%;
      height:40px;
      background: $neck-background-color;
      margin:0 auto;
    }
    
    .bottle-neck-middle {
      width:60%;
      height: 30px;
      background:$neck-background-color;
      margin:0 auto;
      position:relative;
      margin-top: -1px;

      &:before {
        width:25%;
        height:27px;
        background: inherit;
        content:'';
        position:absolute;
        left:-13%;
        transform:rotate(200deg);
      }

      &:after {
        width:25%;
        height:27px;
        background: inherit;
        content:'';
        position:absolute;
        right:-13%;
        transform:rotate(-200deg);
      }
    }

    .bottle-neck-bottom {
      width: 70%;
      height: 30px;
      background: $neck-background-color;
      margin:0 auto;
      position:relative;
      z-index: -1;
      margin-top: -1px;

      &:before {
        width:25%;
        height:28px;
        background: inherit;
        content:'';
        position:absolute;
        left:-10.4%;
        transform:rotate(201deg);
        top:-5px;
      }

      &:after {
        width:25%;
        height:28px;
        background: inherit;
        content:'';
        position:absolute;
        right:-10.4%;
        transform:rotate(-201deg);
        top:-5px;
      }
    }

    .bottle-neck-bottom-last {
      width:85%;
      height:10px;
      background:$neck-background-color;
      margin:0 auto;
      position:relative;
      z-index: -1;
      margin-top: -1px;
      
      &:before {
        width:22%;
        height:28px;
        background: inherit;
        content:'';
        position:absolute;
        left: -5.5%;
        transform: rotate(204deg);
        top: -10px;
      }

      &:after {
        width:22%;
        height:28px;
        background: inherit;
        content:'';
        position:absolute;
        right: -5.5%;
        transform: rotate(-204deg);
        top: -10px;
      }
    }
    
    .bottle-main-body {
      z-index: 20;
      width: calc(100% - 3px);
      margin: auto;
      margin-top: -2px;
      height: 400px;
      max-height: 100%;
      background: $neck-background-color;
      border-radius: 2px 2px 0 0;
    }

    .bottle-bottom {
      width: calc(100% - 3px);
      margin: auto;
      height: 30px;
      border-radius: 0 0 10px 10px;
    }
  }
}

.selected {
  animation: red-selection 0.7s 1 linear;
}

@keyframes red-selection {
  0%, 100% {
    filter: invert(48%) sepia(72%) saturate(454%) hue-rotate(314deg) brightness(96%) contrast(87%);
  }
}
</style>