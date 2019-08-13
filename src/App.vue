<template>
  <div id="app">
    <div class="container-fluid mt-3">
      <b-link :to="{ path: '/' }"><img alt="Tyumsmu logo" src="./assets/tyumsmu.png"></b-link>
      <BaseSlogan msg="Информационный экран ТюмГМУ"/>
      <BaseSlogan disclaimer="Информация отображается в реальном времени"/>
      <div v-if="!main" class="mt-5">
        <b-button :to="{ path: '/getlists' }"><font-awesome-icon icon="arrow-left" /> Вернуться на предыдущую страницу</b-button>
      </div>

      <hr>
      <router-view />
      <hr>
      <p align="center">Версия 1.4</p>
    </div>
  </div>
</template>

<script>
import BaseSlogan from './components/BaseSlogan'

export default {
  name: 'App',
  components: {
    BaseSlogan
  },
  computed: {
    main () {
      return this.$route.path === '/'
    }
  }
}
</script>

<style>
/* body {
  background-image: url('bg.jpg');
  font-size: 10px;
} */
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
