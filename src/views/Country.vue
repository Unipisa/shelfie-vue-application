<template>
<router-link :to="{ name: 'Home'}">
    <div  title="Back to Countries">
        <h2 class="backToCountries">Countries <i class="fa-solid fa-sort-up sort-up"></i></h2>
    </div>
</router-link>

<div id="box">
  <router-link :to="{ name: 'Country', params: { country: this.country }}" ><i class="fa-solid fa-house" title="Home"></i></router-link>
  <div id="searchBox">
    <div class="header_box">
      <img class="icona" alt="Country flag" :src="require(`../assets/${country}.png`)" >
      <h3 id="countryTitle">{{title}}'s Resources</h3>
    </div>

 <!-- --------------Areas Section-------------- -->
    <div>
      <h2 id="categories_title">{{preTitle}}<span id="SELFIE">SELFIE </span>{{postTitle}}</h2>
        <i title="Information" :class='info ? "fa-solid fa-circle-info infoClicked" : "fa-solid fa-circle-info info"' @click="getInfo"></i>
      <div class="ul">
      <li v-for="area in areas" :key="area.id">
        <router-link :to="{name: 'Area', params: {areaSlug: area.slug}}"><div class="category"><span class="title">{{area.name}}</span><span class="cat-description"></span></div></router-link>
      </li>
      </div>
      
    <div v-if="info" class="infoBox">Here we can display some information about this country, maybe taken from Shelfie Website</div>



    </div>
 <!-- ---------------------------- -->
  </div>
  
</div>

</template>

<script>

export default {
name: 'Country',
    props: {
    country: String
  },
    components: {
        
    },
    data () {
      return {
          title: String,
          preTitle:'',
          postTitle:'',
          info:false,
          
          areas: [],
          area: {},
      }
    },
    created () {
      this.getArea(this.country);
      this.setCountryStyle();
    },
    methods: {   
      async getArea(country) {
        const response = await fetch('https://shelfie.labcd.unipi.it/wp-json/wp/v2/areas?per_page=100')
        const data = await response.json()
        this.areas = data;
        this.areas = this.areas.filter(function(area){
          return area.acf.country==country
        })
      },
      setCountryStyle(){ 
          //for Documentation title
          if(this.country=="italy"){this.title='Italy'};
          if(this.country=="ireland"){this.title='Ireland'};
          if(this.country=="denmark"){this.title='Denmark'};
          if(this.country=="finland"){this.title='Finland'};
          if(this.country=="portugal"){this.title='Portugal'};
          if(this.country=="sweden"){this.title='Sweden'};
          //for Choose SELFIE Area title
          if(this.country=="italy"){this.preTitle="Scegli l'Area "};
          if(this.country=="ireland"){this.preTitle="Choose "; this.postTitle="Area"}; 
          if(this.country=="denmark"){this.preTitle='Vælg '; this.postTitle="-Område"};
          if(this.country=="finland"){this.preTitle="Valitse "; this.postTitle="-Alue"};
          if(this.country=="portugal"){this.preTitle="Escolha a Área ";};
          if(this.country=="sweden"){this.preTitle="Välj "; this.postTitle="-Området"};
      }, 
      getInfo(){
        this.info=!this.info;
      }
    }
}
</script>

<style scoped>
.backToCountries{
    width:8rem;
    height:3rem;
    margin:0.8rem;
    font-size:0.9rem;
    cursor: pointer;
    justify-content: center;
    align-items: center;
    display: flex;
    position:absolute;
    top:0.2rem;
    left:0.2rem;
    background: rgb(219,219,219);
    padding:0.1rem;
    border-bottom: 4px solid #2c3e50;
    box-sizing: border-box;  
}
.backToCountries:hover { 
  background: rgb(105, 204, 40);
  font-size:0.9rem;
  transform: scale(1.06);
  transition: 0.5s;
  }
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
.info{
  cursor:pointer;
  float:right;
  color:white;
  font-size:1.5rem;
  margin-top:-3.2rem;
  margin-right:-3rem;
}
.infoClicked{
  cursor:pointer;
  float:right;
  color:rgb(240, 224, 105);
  font-size:1.5rem;
  margin-top:-3.2rem;
  margin-right:-3rem;
}
.infoBox{
  position:absolute;
  top:2.5rem; right:4rem;
  padding:2rem;
  font-size:1.2rem;
  line-height: 1.6rem;
  text-align: justify;
  border: 2px solid rgb(14,48,81);
  background-color: rgb(242, 242, 155);
  width:30rem;
  height: 15rem;
}
.info:hover{
  color:rgb(240, 224, 105);
}
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