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
      <h3 id="countryTitle">{{countryResources}}</h3>
    </div>

 <!-- --------------Areas Section-------------- -->
    <div>
      <h2 id="categories_title">{{preTitle}}<span id="SELFIE">SELFIE </span>{{postTitle}}</h2>
        <i title="Information" :class='info ? "fa-solid fa-circle-info infoClicked" : "fa-solid fa-circle-info info"' @click="getInfo"></i>
      <div class="ul">
      <li v-for="area in areas" :key="area.id">
        <router-link :to="{name: 'Area', params: {areaSlug: area.slug}}"><div class="category"><span class="title">{{area.name}}</span><span class="count">({{area.count}})</span></div></router-link>
      </li>
      </div>
    
    <!------ About section accessible from 'i' button ----->
    <div v-if="info" class="infoBox">
      <h3 class="infoTitle">{{information[0].acf.main_title}}</h3>
      <p><span>{{information[0].acf.intro}}</span> <a class="infoLink" :href="information[0].acf.link" target="_blank">{{information[0].acf.link}}</a></p>
      <p><span>{{information[0].acf.intro2}}</span></p>

      <p><span class="infoArea">{{information[0].acf.title_leadership}}</span> {{information[0].acf.leadership}}</p>
      <p><span class="infoArea">{{information[0].acf.title_infrastructure_and_equipment}}</span> {{information[0].acf.infrastructure_and_equipment}}</p>
      <p><span class="infoArea">{{information[0].acf.title_continuing_professional_development}}</span> {{information[0].acf.continuing_professional_development}}</p>
      <p><span class="infoArea">{{information[0].acf.title_teaching_and_learning}}</span> {{information[0].acf.teaching_and_learning}}</p>
      <p><span class="infoArea">{{information[0].acf.title_assessment_practices}}</span> {{information[0].acf.assessment_practices}}</p>
      <p><span class="infoArea">{{information[0].acf.title_student_digital_competence}}</span> {{information[0].acf.student_digital_competence}}</p>
      
      </div>
    </div>
    <!-- ---------------------------- -->
  </div>
  
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
    data () {
      return {
          countryResources: String,
          title: String,
          preTitle:'',
          postTitle:'',
          info:false,
          
          areas: [],
          area: {},

          //about page
          information:Array
      }
    },
    created () {
      this.getArea(this.country);
      this.setCountryStyle();
      this.getInformation(this.country);
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
          if(this.country=="italy"){this.countryResources='Risorse italiane'};
          if(this.country=="ireland"){this.countryResources='Irish Resources'};
          if(this.country=="denmark"){this.countryResources='Danske Ressourcer'};
          if(this.country=="finland"){this.countryResources='Suomalaiset Resurssit'};
          if(this.country=="portugal"){this.countryResources='Recursos portugueses'};
          if(this.country=="sweden"){this.countryResources='Svenska Resurser'};
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
      },
       async getInformation(country) {
        const response = await fetch('https://shelfie.labcd.unipi.it/wp-json/wp/v2/pages?slug=information-page-'+country)
        const data = await response.json()
        this.information = data;
      },
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
  position:relative;
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
.count{
  font-style: italic;
  position:absolute;
  font-size: 0.95rem;
  bottom:8px;
  left:8px;
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
  position:absolute;
  margin-left:1rem;
  left:4.5%;
  top:2rem;
  display:flex
}
.icona{
  margin-top:10px;
  width:30px;
  height:30px;
}
#countryTitle{
  margin-left:0.2rem;
  position: relative;
  color:white;
  font-size:0.95rem;
  top:0.12rem;
}
#categories_title{
  color:white;
  font-size:1.4rem;
  margin: 0 auto;
  margin-top:2.1rem;
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
  position:absolute;
  cursor:pointer;
  right:3%;
  top:2.7rem;
  color:white;
  font-size:1.5rem;
}
.info:hover{
  color:rgb(240, 224, 105);
}
.infoClicked{
  position:absolute;
  cursor:pointer;
  right:3%;
  top:2.7rem;
  color:rgb(240, 224, 105);
  font-size:1.5rem;
}
.infoBox{
  position:absolute;
  overflow-y: scroll;
  top:2.6rem; right:5rem;
  padding: 0.5rem 2rem;
  font-size:1.2rem;
  line-height: 1.6rem;
  text-align: justify;
  border: 2px solid rgb(14,48,81);
  background-color: rgb(242, 242, 155);
  width:35rem;
  height: 20.5rem;
}
.infoTitle{
  text-align: center;
  font-style: italic;
}
.infoArea{
  font-weight: bold;
}
.infoLink{
  font-weight: bold;
   text-decoration: underline;
}
.fa-house{
  cursor:pointer;
  font-size:1.4rem;
  color:rgb(255, 255, 255);
  position:absolute;
  left:2.5%;
  top:2.66rem;
}
.fa-house:hover{
  transform: scale(1.15);
  color:rgb(255, 255, 255);
}
@media (max-width: 1150px) {
  .ul{
    justify-content: center;
  }
  
 }
 @media (max-width: 800px) {
  li{
    width:16rem;
  }
  .fa-house{
    top:1.5rem;
    left:4%;
  }
  .info, .infoClicked {
    top:1.5rem;
  }
  .infoBox{
   width:auto;
    right:4rem;
    left:4rem;
    top:1.2rem;
  }
  .header_box{
    position:relative;
    justify-content: center;
    margin-left:0rem;
    left:0rem;
    top:1.2rem;
  }
  #categories_title{
    margin-top:0.8rem;
    padding-bottom:1rem;
  }
 }
 @media (max-width: 600px) {
   .backToCountries{
     width:5.6rem;
    height:2.6rem;
    margin:0.4rem;
    font-size:0.8rem;
    cursor: pointer;
    justify-content: center;
    align-items: center;
    display: flex;
    position:absolute;
    top:0.2rem;
    left:0.2rem;
    padding:0.1rem;
   }
 }
@media (max-width: 400px) {
    .header_box{
    left:0rem;
    top:1.8rem;
  }
  #categories_title{
    margin-top:1.2rem;
    padding-bottom:0.8rem;
  }
  .fa-house, .info, .infoClicked {
    top:1.1rem;
  }
  .infoBox{
    right:2%;
    left:2%;
    top:3rem;
  }
}
</style>