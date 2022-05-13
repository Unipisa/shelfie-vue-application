<template>
    <div class="closed">
      <h2>{{country}}</h2>
      <i class="fa-solid fa-sort-down sort-down"></i>
    </div>
</template>

<script>
export default {
  name: 'Country',
  props: {
    country: String,
  },
  components: {
     
  },
  data() {
    return{
    
    }
  },
  methods: {
  }
}

</script>

<style scoped>
.closed{
    width:11rem;
    height:5.9rem;
    margin:0.4rem;
    cursor: pointer;
    justify-content: center;
    align-items: center;
    display: flex;
    background: rgb(219,219,219);
    padding:0.1rem;
}
.closed:hover { 
  background: rgb(105, 204, 40);
  font-size:1rem;
  transform: scale(1.06);
  transition: 0.1s;
  }
.sort-down{
  font-size:1.2rem;
  margin-left:0.4rem;
  margin-bottom:0.4rem;
}

</style>