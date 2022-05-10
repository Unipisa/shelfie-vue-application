<template>
<router-link to="/">
    <div  title="Back to Countries">
        <h2 class="backToCountries" >Countries <i class="fa-solid fa-sort-up sort-up"></i></h2>
    </div>
</router-link>
<div id="box">
  <router-link to="/ireland" @click="backToAreas()"><i class="fa-solid fa-house" title="Home"></i></router-link>
  <div id="searchBox">
    <div class="header_box">
      <img class="icona" alt="Ireland flag" src="../../assets/Ireland.png" >
      <h3 id="countryTitle">Ireland's Documentation</h3>
    </div>
    
      <!-- --------------Areas Section-------------- -->
    <div v-if="!resourceShow">
      <h2 id="categories_title">Choose <span id="SELFIE">SELFIE</span> Area</h2>
        <i title="Information" class="fa-solid fa-circle-info close"></i>
      <div class="ul">
      <li v-for="area in areas" :key="area.id">
        <router-link :to="{name: 'AreaIRE', params: {id: area.slug}}"><div @click="getResource(area.id);toResources(area)" class="category"><span class="title">{{area.name}}</span><span class="cat-description"> </span></div></router-link>
      </li>
      </div>
    </div>
<!-- ---------------------------- -->
      <AreaIRE :resources="resources" :area="area" @back="back" v-if="resourceShow"/>
  </div>
  
</div>

</template>

<script>
import AreaIRE from './AreaIRE.vue'
export default {
name: 'Ireland',
    components: {
    AreaIRE
        
    },
    data () {
      return {
          resources: [],
          resourceShow: false,
          areas: [],
          area: {}

      }
    },
    created () {
      this.getArea();
    },
    methods: {
      back(){
        this.resourceShow=false;
      },
     async getResource(area) {
      const response = await fetch('https://shelfie.labcd.unipi.it/wp-json/wp/v2/resource?language=2&areas='+area)
      const data = await response.json()
      this.resources = data;
      this.resourceShow=true;
      },
      async getArea() {
      const response = await fetch('https://shelfie.labcd.unipi.it/wp-json/wp/v2/areas?per_page=100')
      const data = await response.json()
      this.areas = data;
      this.areas = this.areas.filter(function(area){
      return area.acf.country.includes("Ireland");
      })
      console.log(this.areas)
      },
      backToAreas(){
        this.resourceShow=false;
      },
      toResources(area){
      this.area=area;
      }
    }
}
</script>

<style scoped>

.area{
  color:#f8b12c;
  /* rgb(60, 243, 60) */
}
#SELFIE{
  color:rgb(139,210,219);
}
#searchBox{
  width:90%;
  margin: 0 auto; 
}
#box{
  position:relative;
  background-color: #0E3051;
  padding-top: 1rem;
  padding-bottom:3rem;
  min-height:26rem;
}
.ul{
  padding-top:1.5rem;
  display: flex;
  justify-content: flex-start;
  flex-flow: row wrap;
  margin: 0 0 0 0;
  text-align:left;
}

.ulSub{
  display: flex;
  flex-flow: row wrap;
  margin: 0 auto;
  text-align:left;
  justify-content: center;
}
.chooseSub{
  color:white;
  position:absolute;
  left: 0;
  right: 0;
  margin-top:-0.9rem;
  font-size:1.2rem;
  font-weight: bold;
}
li{
  box-sizing: border-box;
    list-style-image: none;
    width: 25%;
    margin:0;
    padding: 0.5rem 0.5rem 0.5rem 0.5rem;
    display: block;
}
.category{
  padding:1rem;
  border-top: 5px solid #ffffff;
  font-size:1.15rem;
  width:90%;
  height: 6rem;
  background-color: white;
  cursor:pointer; 
}
.category:hover > .title{
  transition:0.1s;
  color:#e43228;
}
.category:hover{
  transform: scale(1.04);
  border-top: 5px solid rgb(29,129,144);
  transition:0.1s;
}
.title{
  font-weight: bold;
  font-size: 1.18rem;
  display: inline-block;
  width:100%;
  margin-bottom: 0.5rem
}
.cat-description{
  display: inline-block;
  font-weight: normal;
  width: 100%;
  color: #000000;
}
.sub{
  width:90%;
  margin: 0 auto;  
}
.subcategory{
  padding:1rem;
  border-top: 5px solid #ffffff;
  font-size:1.14rem;
  width:90%;
  height: 6rem;
  background-color: white;
  cursor:pointer; 
}
.subcat-description{
  display: inline-block;
  font-weight: bold;
  width: 100%;
  color: #000000;
}
.subcategory:hover > .subcat-description {
  transition:0.1s;
  color:#ee8003;
}
.subcategory:hover{
  transform: scale(1.04);
  border-top: 5px solid rgb(29,129,144);
  transition:0.1s;
}
#back{
  cursor:pointer;
  color:white;
  font-size: 1.4rem;
  margin-top:-2.25rem;
  margin-right:0.2rem;
}
#back:hover{
transform: scale(1.3);
color:rgb(105, 204, 40);
}
#back2{
  cursor:pointer;
  color:white;
  font-size: 1.4rem;
  margin-right:0.2rem;
}
#back2:hover{
/* transform: scale(1.3); */
color:#ee8003;
transform: scale(1.3);
}
.header_box{
  padding-top:1rem;
  width:100%;
  display: inline-flex;
  text-align: left;
}
.icona{
  margin-left:0.7rem;
  margin-top:10px;
  width:30px;
  height:30px;
}
#countryTitle{
  margin-left:0.2rem;
  color:white;
  text-align: left;
  font-size:1rem;
}
#categories_title{
  color:white;
  font-size:1.4rem;
  margin: 0 auto;
  margin-top:-2.1rem;
  padding-bottom:1.5rem;
}
.subTitles{
  color: white;
  font-size:1.2rem;
  line-height: 1.6rem;
  position:absolute;
  margin-top:-0.2rem;
  left: 0;
  right: 0;
  word-wrap: break-word;
}
.white{
  color:white;
}
.close{
  cursor:pointer;
  float:right;
  color:white;
  font-size:1.5rem;
  margin-top:-3.2rem;
  margin-right:-3rem;
}
/* .close:hover{
  transform: scale(1.3);
  color:red;
} */
.fa-house{
  cursor:pointer;
  font-size:1.4rem;
  color:rgb(255, 255, 255);
  position:absolute;
  left:2.3rem;
  top:2.65rem;
}
.fa-house:hover{
  transform: scale(1.15);
  color:rgb(255, 255, 255);
}
</style>