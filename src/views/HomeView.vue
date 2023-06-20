<script setup>
</script>

<template>
  <main>
    <div class="description-container">
      <p>Welcome to <strong>Bottle Maker</strong>, with this application you can customize the bottle of your dreams!</p>
      <!-- The editor should always be reset when tapped so we use a normal anchor tag and not a RouterLink -->
      <a :href="$router.resolve({name: 'editor'}).href" class="button">
        <p>Try It!</p>
      </a>
    </div>
  </main>
</template>

<style scoped lang="scss">
main {
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-size: 24px;
  height: 90vh;
  min-height: 600px;
  display: flex;
  justify-content: center;
  align-items: center;

  .description-container {
    width: 600px;
    max-width: 100%;
    margin: 0 10px;
    margin-top: -20vh;
    padding: 30px;
    
    border: 1px solid black; 
    border-radius: 20px;
    box-shadow: 2px 2px 5px rgb(111, 108, 108);

    p {
      text-align: center;
    }

    .button {
      padding: 7px 20px;
      width: fit-content;
      margin: 0 auto;
    }
  }
}
</style>