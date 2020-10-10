<template>
  <div id="app">
    <header>
      <div class="container">
        <div class="logo">
          Site
        </div>
      </div>
    </header>
    <main>
      <div class="container">
        <router-view></router-view>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      
    }
  }
}
</script>

<style lang="scss">
  html{
    font-size: 62.5%;
  }
  body{
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    font-size: 1.4rem;
  }
  .container{
    max-width: 1170px;
    margin: 0 auto;
    padding: 0 15px;
  }
  header{
    .container{
      height: 50px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      border-bottom: 1px solid rgb(175, 175, 175);
    }
  }
</style>
