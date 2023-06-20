<script setup>
import { Icon } from '@iconify/vue';
import  BottleItem  from "../components/BottleItem.vue";
import { toJpeg } from 'html-to-image';

function downloadImage() {
  const bottle = document.querySelector('.bottle-shade');

  toJpeg(bottle, {backgroundColor: "white"})
  .then(function (dataUrl) {
    const link = document.createElement('a');
    link.download = 'custom-bottle.jpeg';
    link.href = dataUrl;
    link.click();
  });
}
</script>

<template>
  <div style="padding-bottom: 40px;">
    <h1>Your Custom Bottle:</h1>
    <div class="bottle-container">
      <BottleItem />
    </div>
    
    <div class="buttons-container">
      <div class="top-buttons">
        <RouterLink to="/editor" class="button">
          <p>Go Back</p>
          <Icon icon="ep:back" width="30" color="black"/>
        </RouterLink>

        <!-- The editor should always be reset when tapped so we use a normal anchor tag and not a RouterLink -->
        <a :href="$router.resolve({name: 'editor'}).href" class="button">
          <p>Restart</p>
          <Icon icon="iconamoon:restart" width="27" color="black"/>
        </a>
      </div>
    
      <button class="button" @click="downloadImage">
        <p>Download</p>
        <Icon icon="material-symbols:download-sharp" width="30" color="black"/>
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
h1 {
  text-align: center;
  margin-top: 20px;
  margin-bottom: -40px;
  font-family: 'Courier New', Courier, monospace;
}

.bottle-container {
  transform: scale(0.8); 
  border: 1px solid black; 
  border-radius: 20px;
  box-shadow: 2px 2px 5px rgb(111, 108, 108);
  height: 580px; 
  width: 550px; 
  max-width: 100%;
  margin: 0 auto;

  .bottle-shade {
    padding-top: 10px;
  }
}

.buttons-container {
  display: flex; 
  flex-direction: column; 
  width: 550px; 
  margin: 0 auto; 
  max-width: 100%; 
  margin-top: -40px;

  .top-buttons {
    display: flex; 
    align-items: center; 
    justify-content: space-around;

    .button {
      width: 100%;
    }
  }

  .button {
    padding: 5px;
  }
}
</style>