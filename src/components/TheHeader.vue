<script setup>
</script>

<template>
  <header>
    <nav class="container">
      <div class="branding">
        <img src="../assets/Bottle_Logo.png" alt=""/>
        <h1>Bottle Maker</h1>
      </div>

      <ul class="nav-routes">
        <RouterLink to="/">Home</RouterLink>
        <!-- The editor should always be reset when tapped so we use a normal anchor tag and not a RouterLink -->
        <a :href="$router.resolve({name: 'editor'}).href">Editor</a>
      </ul>
    </nav>

  </header>
</template>

<style lang="scss" scoped>

header {
  background-color: #f1f1f1;
  
  nav {
    display: flex;
    align-items: center;
    padding: 7px 20px;

    .branding {
      display: flex;
      align-items: center;
      gap: 8px;

      img {
        max-width: 50px;
      }

      h1 {
        margin-top: 11px;
        font-size: 20px;
      }
    }
    
    .nav-routes {
      margin-top: 20px;
      display: flex;
      align-items: center;
      flex: 1;
      justify-content: flex-end;
      gap: 12px;
      list-style: none;

      a {
        text-decoration: none;
        color: inherit;
      }
    }
  }
}
</style>