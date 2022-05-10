<template>
<Intro intro="Explore the IO-2 Roadmap"/>

  <router-view ></router-view>

</template>

<script>
import Intro from './components/Intro.vue'

export default {
  name: 'App',
  components: {
    Intro,
  },
  data () {
    return {

    }
  },
}
</script> 

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 30px;
}

</style>
