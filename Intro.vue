<template>
  <img id="logo" alt="Shelfie logo" src="../assets/shelfie_logo.png" >
  <h3 class="intro" id="intro1">{{ intro }}</h3>
</template>

<script>

export default {
  name: 'Intro',
  props: {
    intro: String,
    intro2: String,
  }
}
</script>

<style scoped>
#intro1{
  font-size:1.4rem;
}
#logo{
  width:9.5rem;
  padding:0.5rem;
}

</style>