<template>
<router-link to="/">
    <div  title="Back to Countries">
        <h2 class="backToCountries">Countries <i class="fa-solid fa-sort-up sort-up"></i></h2>
    </div>
</router-link>

<div id="box">
  <router-link :to="{ name: 'Country', params: { country: this.country }}" ><i class="fa-solid fa-house" title="Home"></i></router-link>
  <div id="searchBox">
    <div class="header_box">
      <img class="icona" alt="Italy flag" :src="require(`../assets/${country}.png`)" >
      <h3 id="countryTitle">{{title}}'s Documentation</h3>
    </div>
  <h2 id="categories_title"><router-link :to="{ name: 'Country', params: { country: this.country }}"><i id="back" title="Back to Areas" class="fa-solid fa-circle-arrow-left" ></i></router-link>
      Area: <span class=area>{{areaName}}</span></h2>
<div class="resourceBox">
  <div id="filter" >
    <a id="target">Target School:</a>
    <a :class='all ? "buttonT" : "buttonF"' @click="getAll()">All</a>
    <a :class='primary ? "buttonT" : "buttonF"' @click="schoolFilter(89)">Primary</a>
    <a :class='lowerS ? "buttonT" : "buttonF"' @click="schoolFilter(90)">Lower Secondary</a>
    <a :class='upperS ? "buttonT" : "buttonF"' @click="schoolFilter(218)">Upper Secondary</a>
    <a :class='vocational ? "buttonT" : "buttonF"' @click="schoolFilter(220)">Vocational</a>
  </div>
  <!-- Lista risorse -->
    <div class="resources">
      <p v-if="empty" id="emptyMsg">{{emptyMessage}}</p>
        <div :key="resource.id" v-for="resource in filteredRes">
          <router-link :to="{name: 'Resource', params: {resourceSlug: resource.slug}}"><ResourceButton :resource="resource"/></router-link>
        </div>
    </div>
  </div>
  </div>
</div>
</template>


<script>
import ResourceButton from '../components/ResourceButton.vue'
export default {
  name: 'Area',
  props: {
    country: String,
    areaSlug:String,
    
  },
  components: {
    ResourceButton
  },
  data(){
    return{
    area:{},
    languageId:Number,
    resources:[],
    filteredRes:[],

    all:true,
    primary:false,
    lowerS:false,
    upperS:false,
    vocational:false,
    
    empty: false,
    emptyMessage:String,

    expanded:false,
    expandedResource: Object,

    title:String,
    areaName:'',

    icon:String,
    learning_need:String,
    target:String,
    canEdit:String,
    subscription:String,
    
    }
  },
  created(){
    this.getLanguageId();
    this.getAreaBySlug(this.areaSlug);
    this.setCountryStyle();
    this.checkIfEmpty();
  },
computed: {
  
},
  methods:{
    async getAreaBySlug(slug){
      const response = await fetch('https://shelfie.labcd.unipi.it/wp-json/wp/v2/areas?slug='+slug)
      const data = await response.json()
      this.area = data;
      /* this.areaName=this.area[0].name */
      this.getResource(this.languageId, this.area[0].id)
    },
    setCountryStyle(){ 
          //for Documentation title
          if(this.country=="italy"){this.title='Italy'};
          if(this.country=="ireland"){this.title='Ireland'};
          if(this.country=="denmark"){this.title='Denmark'};
          if(this.country=="finland"){this.title='Finland'};
          if(this.country=="portugal"){this.title='Portugal'};
          if(this.country=="sweden"){this.title='Sweden'};
          //for Area name, solution for faster loading page instead of retrieving area.name from area object
          this.areaName= this.areaSlug.charAt(0).toUpperCase() + this.areaSlug.slice(1).replaceAll('-', ' ')
      },
      getLanguageId(){
        if(this.country=="italy"){this.languageId=19};
        if(this.country=="ireland"){this.languageId=2};
        if(this.country=="denmark"){this.languageId=18};
        if(this.country=="finland"){this.languageId=20};
        if(this.country=="portugal"){this.languageId=16};
        if(this.country=="sweden"){this.languageId=17};
      },
      async getResource(language, area) {
        const response = await fetch('https://shelfie.labcd.unipi.it/wp-json/wp/v2/resource?language='+language+'&areas='+area)
        const data = await response.json()
        this.resources = data;
        this.getAll();
      },
      /* async getResource(area) {
        const response = await fetch('https://shelfie.labcd.unipi.it/wp-json/wp/v2/resource?areas='+area)
        const data = await response.json()
        this.resources = data;
        this.getAll();
      }, */
    checkIfEmpty(){
      if(this.resources.length === 0){this.allEmpty=true;}
      this.emptyMess();
    },
    checkIfNone(){
      if(this.filteredRes.length === 0){this.empty=true;}
      this.emptyMess();
    },
    getAll(){
      this.filteredRes = this.resources;
      this.all=true;
      this.empty=false;
      this.primary=false;this.lowerS=false;this.upperS=false;this.vocational=false;
      this.checkIfNone();
    },
    schoolFilter(id){
      this.filteredRes = this.resources.filter(function(ele){
      return ele.school.includes(id);
    })
    this.empty=false;
    this.checkIfNone();
    this.filterStyle(id);
    },
    filterStyle(id){
      this.all=false;this.primary=false;this.lowerS=false;this.upperS=false;this.vocational=false;
      if(id==89){this.primary=true};
      if(id==90){this.lowerS=true};
      if(id==218){this.upperS=true};
      if(id==220){this.vocational=true};
    },
 
     checkIcon(resource){
           if(resource.acf.type_of_resource=="Webpage"){this.icon="webpage";}
           if(resource.acf.type_of_resource=="Video tutorial"){this.icon="videoTutorial";}
           if(resource.acf.type_of_resource=="Tool"){this.icon="tool";}
           if(resource.acf.type_of_resource=="CMS"){this.icon="cms";}
           if(resource.acf.type_of_resource=="LMS"){this.icon="lms";}
           if(resource.acf.type_of_resource=="Document"){this.icon="document";}
           if(resource.acf.type_of_resource=="Spreadsheet"){this.icon="spreadsheet";}
           /* this.$emit("checkIcon", this.icon); */
       },

    /* Messages and translations*/
    emptyMess(){
     if(this.country=="italy"){this.emptyMessage="Nessuna risorsa trovata in quest'Area"};
     if(this.country=="ireland"){this.emptyMessage="No resources found in this Area"}
     if(this.country=="denmark"){this.emptyMessage="Ingen ressourcer fundet i dette Område"}
     if(this.country=="finland"){this.emptyMessage="Tältä Alueelta ei löydy resursseja"}
     if(this.country=="portugal"){this.emptyMessage="Nenhum recurso encontrado nesta Área"}
     if(this.country=="sweden"){this.emptyMessage="Inga resurser hittades i detta Område"}
    },
    transformText(){
        if(this.expandedResource.acf.can_edit==false) {this.canEdit="Modificabile: No"}
          else this.canEdit="Moficabile: Sì";
        if(this.expandedResource.acf.subscription==false) {this.subscription="Sottoscrizione: No"}
          else this.canEdit="Sottoscrizione: Sì";
        if(this.expandedResource.acf.learning_need==""){this.learning_need=""}
          else this.learning_need="Bisogno di apprendimento: "+this.expandedResource.acf.learning_need.join(', ');
          this.learning_need=this.learning_need.replace('Manage video content', 'Gestire  contenuti video').replace('Manage interactive activity content', 'Gestire contenuti di attività interattive').replace('Manage audio content','Gestire contenuti audio').replace('Manage learning content','Gestire contenuti didattici').replace('Communicate and discuss','Comunicare e discutere').replace('Engagement', 'Coinvolgere').replace('Manage reading content','Gestire contenuti di lettura').replace('Share document','Condividere documenti').replace('Manage image content', 'Gestire contenuti immagine').replace('Manage document','Gestire documenti').replace('Manage sheet', 'Gestire fogli elettronici').replace('Manage presentation','Gestire presentazioni').replace('Brain storming and share ideas','Brain storming e condivisione di idee').replace('Collaborative programming tools','Strumenti di programmazione collaborativa').replace('Coding','Codifica').replace('Create a website','Creare un sito web');
           this.target="Target: "+ this.expandedResource.acf.target.join(', ');
           this.target=this.target.replace('Teacher', 'Insegnanti').replace('Student', 'Studenti').replace('Leader', 'Dirigenti scolastici');
      }
  }
}
</script>
<style scoped>
#filter{
  display:flex;
  justify-content: flex-start;
  flex-flow: row wrap;
  align-items: center;
}
#target{
  font-size: 1.1rem;;
  margin-left:2rem;
  margin-right: 1rem;
  font-weight: bold;
  color:white
}
.buttonF{
  padding-top:0.3rem;
  text-align: center;
  font-weight: bold;
  margin-right:0.3rem;
  margin-left:0.3rem;
  cursor:pointer;
  background-color:white;
  width: 9rem;
  height: 1.5rem;
  border-radius: 5px;
}
.buttonF:hover{
 background-color: rgb(225, 236, 245)
}
.buttonT{
  padding-top:0.3rem;
  text-align: center;
  font-weight: bold;
  margin-right:0.3rem;
  margin-left:0.3rem;
  cursor:pointer;
  background-color:white;
  width: 10rem;
  height: 1.5rem;
  border-radius: 5px;
  background-color: rgb(249, 118, 146);
  color:white;
}
.resourceBox{
  width:80%;
  margin: 0 auto;
  margin-top:3rem;
}
.resources{
  padding-top:3rem;
  display: flex;
  justify-content: flex-start;
  flex-flow: row wrap;
  padding-bottom:1.5rem;
  width:100.7%;
  border-bottom:3px solid white;
}
.expanded-resource{
  position: relative;
    background-color: white;
    min-height: 28rem;
    margin: 0 auto;
    margin-top:-1rem;
    width:64rem;
    border-radius: 20px;
    word-wrap: break-word;
    border: 1px solid;
  /* box-shadow: 10px 10px 30px 1px rgb(211, 255, 254) inset; */
}
.typeOfResource{
  position:absolute;
  left:4rem;
  top:1.6rem;
}
.icon{
    position: absolute;
   left: 2rem;
   top: 2.75rem;
   font-size:1.2rem;
}
.resContent{
  max-width:50rem;
  margin:0 auto;
  padding-bottom:3rem;
}
.resText{
  text-align: justify;
  line-height: 1.6rem;
}
.title{
  line-height: 5rem;
}
.close{
  color:rgb(14,48,81);
  cursor:pointer;
  position:absolute;
  right:5rem;
  top:5.2rem;
  font-size:2rem;
  
}
.close:hover{
  transform: scale(1.3);
  color:rgb(255, 35, 105);
}
#emptyMsg{
  color:white;
  font-size:1.1rem;
}
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
.close{
  cursor:pointer;
  float:right;
  color:white;
  font-size:1.5rem;
  margin-top:-3.2rem;
  margin-right:-3rem;
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