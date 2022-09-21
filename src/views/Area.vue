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
      <img class="icona" alt="Italy flag" :src="require(`../assets/${country}.png`)" >
      <h3 id="countryTitle">{{countryResources}}</h3>
    </div>
  <h2 id="categories_title"><router-link :to="{ name: 'Country', params: { country: this.country }}"><i id="back" title="Back to Areas" class="fa-solid fa-circle-arrow-left" ></i></router-link>
      {{areaPrefix}}: <span class=area>{{areaName}}</span></h2>
<div class="resourceBox">
  <a id="target">{{schoolHeader}}:</a>
  <div id="filter" >
    
    <a :class='all ? "buttonT" : "buttonF"' @click="getAll()">{{schools[0]}}</a>
    <a :class='primary ? "buttonT" : "buttonF"' @click="schoolFilter(this.pID)">{{schools[1]}}</a>
    <a :class='lowerS ? "buttonT" : "buttonF"' @click="schoolFilter(this.lID)">{{schools[2]}}</a>
    <a :class='upperS ? "buttonT" : "buttonF"' @click="schoolFilter(this.uID)">{{schools[3]}}</a>
    <a :class='vocational ? "buttonT" : "buttonF"' @click="schoolFilter(this.vID)">{{schools[4]}}</a>
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

    countryResources:String,
    areaPrefix:String,
    areaName:'',

    icon:String,
    learning_need:String,
    target:String,
    schoolHeader:String,
    schools:[String, String, String, String, String],
    canEdit:String,
    subscription:String,

    targetSchool:Array,
    school:['', '', '', '', ''],
    
    pID:Number,
    lID:Number,
    uID:Number,
    vID:Number
    }
  },
  created (){
    this.setCountryStyle();
    this.getAreaBySlug(this.areaSlug);
    this.checkIfEmpty();
  },

  methods:{
    async getAreaBySlug(slug){
      try {
      const response = await fetch('https://shelfie.labcd.unipi.it/wp-json/wp/v2/areas?slug='+slug)
      const data = await response.json()
      this.area = data;
       this.getResource(this.area[0].id)
      }
      catch (error) {
      this.$router.push('/404')
        }
      
      
    },
    async getResource(area) {
      const response = await fetch('https://shelfie.labcd.unipi.it/wp-json/wp/v2/resource?areas='+area+'&per_page=100')
      const data = await response.json()
      this.resources = data;
      this.getAll();
    },
    /* async getTarget(country) {
     const response = await fetch('https://shelfie.labcd.unipi.it/wp-json/wp/v2/pages?slug=translations-io2-'+country)
        const data = await response.json()
    }, */
    setCountryStyle(){ 
                                    //for Documentation title  //for text before Area name               
          if(this.country=="italy"){this.countryResources='Risorse italiane'; this.areaPrefix='Area'; this.schoolHeader="Scuole target"; this.schools[0]="Tutte";this.schools[1]="Primaria";this.schools[2]="Secondaria di primo grado";this.schools[3]="Secondaria di secondo grado";this.schools[4]="Professionale"; this.pID=304; this.lID=306; this.uID=308; this.vID=310};
          if(this.country=="ireland"){this.countryResources='Irish Resources'; this.areaPrefix='Area'; this.schoolHeader="Target school"; this.schools[0]="All";this.schools[1]="Primary";this.schools[2]="Lower secondary";this.schools[3]="Upper secondary";this.schools[4]="Vocational"; this.pID=89; this.lID=90; this.uID=218; this.vID=220};
          if(this.country=="denmark"){this.countryResources='Danske Ressourcer'; this.areaPrefix='Område'; this.schoolHeader="Målskole"; this.schools[0]="Alle";this.schools[1]="Grundskole 0-6 klasse";this.schools[2]="Grundskole 7-9 (10) klasse";this.schools[3]="Alment gymnasium";this.schools[4]="Erhvervsskole"; this.pID=322; this.lID=324; this.uID=327; this.vID=329};
          if(this.country=="finland"){this.countryResources='Suomalaiset Resurssit'; this.areaPrefix='Alue'; this.schoolHeader="Kohdekoulu"; this.schools[0]="kaikki";this.schools[1]="Alakoulu";this.schools[2]="Yläkoulu";this.schools[3]="Toisen asteen koulutus/oppilaitos";this.schools[4]="Ammattikoulu"; this.pID=331; this.lID=333; this.uID=335; this.vID=337};
          if(this.country=="portugal"){this.countryResources='Recursos portugueses'; this.areaPrefix='Área'; this.schoolHeader="Nível de ensino"; this.schools[0]="Todos";this.schools[1]="1º ciclo do Ensino Básico";this.schools[2]="2º ciclo do Ensino Básico";this.schools[3]="3º ciclo do Ensino Básico";this.schools[4]="Ensino Secundário"; this.pID=312; this.lID=316; this.uID=318; this.vID=320};
          if(this.country=="sweden"){this.countryResources='Svenska Resurser'; this.areaPrefix='Området'; this.schoolHeader="Målskola"; this.schools[0]="Alla";this.schools[1]="Grundskolans - Högstadiet";this.schools[2]="Grundskolan - Mellanstadiet";this.schools[3]="Grundskolan - Lågstadiet";this.schools[4]="Gymnasieskola"; this.pID=339; this.lID=341; this.uID=343; this.vID=345};
          
          //for Area name, solution for faster loading page instead of retrieving area.name from area object
          this.areaName= this.areaSlug.charAt(0).toUpperCase() + this.areaSlug.slice(1).replaceAll('-', ' ')
          if(this.areaName.includes("Leadership")){this.areaName="Leadership"}
      },
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
      if(id==89||id==304||id==312||id==322||id==331||id==339){this.primary=true};
      if(id==90||id==306||id==316||id==324||id==333||id==341){this.lowerS=true};
      if(id==218||id==308||id==318||id==327||id==335||id==343){this.upperS=true};
      if(id==220||id==310||id==320||id==329||id==337||id==345){this.vocational=true};
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
  float:left;
  font-size: 1.1rem;;
  margin-left:0rem;
  margin-right: 0.6rem;
  font-weight: bold;
  color:white;
  margin-top:0.7rem;
}
.buttonF{
  padding-top:0.3rem;
  padding-left:0.3rem;
  padding-right:0.3rem;
  text-align: center;
  font-weight: bold;
  margin-right:0.3rem;
  margin-left:0.3rem;
  cursor:pointer;
  background-color:white;
  min-width: 9rem;
  height: 1.5rem;
  border-radius: 5px;
  margin-top:0.5rem;
  
}
.buttonF:hover{
 background-color: rgb(225, 236, 245)
}
.buttonT{
  padding-top:0.3rem;
  padding-left:0.3rem;
  padding-right:0.3rem;
  text-align: center;
  font-weight: bold;
  margin-right:0.3rem;
  margin-left:0.3rem;
  cursor:pointer;
  background-color:white;
  min-width: 9rem;
  height: 1.5rem;
  border-radius: 5px;
  background-color: rgb(249, 118, 146);
  color:white;
  margin-top:0.5rem;
}
.resourceBox{
  width:86%;
  margin: 0 auto;
  margin-top:2.5rem;
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
  #filter{
    justify-content: center;
  }
  
 }
 @media (max-width: 1088px) {
   .resources{
  justify-content: center;
  }
 }
 @media (max-width: 800px) {
   #filter{
     width:100%;
   }
   #target{
    float:none;
   }
  li{
    width:16rem;
  }
  .fa-house{
    top:1.5rem;
    left:4%;
  }
  .header_box{
    position:relative;
    justify-content: center;
    margin-left:0rem;
    left:0rem;
    top:1rem;
  }
  #categories_title{
    margin-top:0.8rem;
    padding-bottom:0rem;
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
    top:1.6rem;
  }
  #categories_title{
    margin-top:1.2rem;
    padding-bottom:0.8rem;
  }
  .buttonF, .buttonT{
    height:auto;
  }
  .fa-house {
    top:1.1rem;
  }
}
@media (min-width: 801px) and (max-width: 1100px) {
   #categories_title{
   max-width:20rem;
   line-height: 2rem;
  }
}
</style>