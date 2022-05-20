<template>
  <img class="img" id="explore1" alt="Explore Roadmap 1" src="../assets/Explore_1.png" >
  <img class="img" id="explore2" alt="Explore Roadmap 2" src="../assets/Explore_2.png" >
  <div id="description">
      <h3 id="descriptionText">Find the resources tailored for you</h3>
  </div>
  <div id="countryClosed">
    <router-link :to="{ name: 'Country', params: { country: 'italy' }}"><CountryButton country="Italy" /></router-link>
    <router-link :to="{ name: 'Country', params: { country: 'ireland' }}"><CountryButton country="Ireland" /></router-link>
    <router-link :to="{ name: 'Country', params: { country: 'denmark' }}"><CountryButton country="Denmark" /></router-link>
    <router-link :to="{ name: 'Country', params: { country: 'finland' }}"><CountryButton country="Finland" /></router-link>
    <router-link :to="{ name: 'Country', params: { country: 'sweden' }}"><CountryButton country="Sweden" /></router-link>
    <router-link :to="{ name: 'Country', params: { country: 'portugal' }}"><CountryButton country="Portugal" /></router-link>
  </div>
  
</template>

<script>
import CountryButton from '../components/CountryButton.vue'

export default {
  name: 'Home',
  components: {
    CountryButton,
  },
  data () {
    return {

    }
  },
}
</script> 

<style>
a { 
    text-decoration: none; 
    color:inherit;
}
.img{
  width:12rem;
}
#explore1{
  padding-right:0.6rem;
}
#explore2{
  padding-left:0.6rem;
}
#description{
  margin-bottom:2rem;
  
}
#descriptionText{
  font-size: 1.4rem;
  padding-top:0.8rem;
  margin: 0 auto 0 auto;
 
}
#countryClosed{
    margin:auto;
    align-items: center;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom:1rem;
}
.sort-up{
  font-size:1rem;
  margin-left:0.4rem;
  margin-top:0.5rem;
}
</style>