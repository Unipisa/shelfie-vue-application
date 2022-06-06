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
    <h2 id="categories_title">{{areaPrefix}}: <span class=area>{{areaName}}</span></h2>
    <div class="resourceBox">
  <div class="expanded-resource">
    <div class="resContent">
      <router-link :to="{ name: 'Area'}"><i title="Close" class="fa-solid fa-xmark close"></i></router-link>
      <i class="fa-solid fa-link icon" v-if="this.icon=='webpage'"></i>
      <i class="fa-solid fa-video icon" v-if="this.icon=='videoTutorial'"></i>
      <i class="fa-solid fa-wrench icon" v-if="this.icon=='tool'"></i>
      <i class="fa-solid fa-file icon" v-if="this.icon=='document'"></i>
      <i class="fa-regular fa-file-excel icon" v-if="this.icon=='spreadsheet'"></i>
      <i class="fa-solid fa-pager icon" v-if="this.icon=='cms'"></i>
      <h4 class="typeOfResource">{{typeOfResource}}</h4>
      <h2 class="title">{{titleRendered}}</h2>
      <div class="resText">
        <p>{{description}}</p>
        <p><span class="field">{{targetPrefix}}</span>{{target}}</p>
        <p><span class="field"></span>{{school}}</p>
        <p><span class="field">{{agePrefix}}</span>{{age}}</p>
        <p><span class="field">{{learning_needPrefix}}</span>{{learning_need}}</p>
        <p><span class="field">{{canEditPrefix}}</span>{{canEdit}}</p>
        <p><span class="field">{{subscriptionPrefix}}</span>{{subscription}}</p>
        <p><span class="field">{{linkPrefix}}</span><a :href="link" target="_blank">{{link}}</a></p>
      </div>
    </div>
</div>
  </div>
  
</div>

</div>
</template>

<script>
export default {
  name: 'Area',
  props: {
    country: String,
    resourceSlug:String,
    areaSlug:String
  },
  components: {

  },
  data(){
    return{
    resource: Object,
    countryResources:String,
    icon:String,

    typeOfResource:'',
    titleRendered:'',
    description:'',
    learning_need:'',
    target:'',
    school:'',
    age:'',
    canEdit:'',
    subscription:'',
    link:'',
    
    learning_needPrefix:'',
    targetPrefix:'',
    schoolPrefix:'',
    agePrefix:'',
    canEditPrefix:'',
    subscriptionPrefix:'',
    linkPrefix:'',

    areaPrefix:'',
    areaName:'',
    }
  },
  created(){
    this.getResourceBySlug(this.resourceSlug);
    this.setCountryStyle();
  },
computed: {
  
},
  methods:{
    async getResourceBySlug(slug){
      const response = await fetch('https://shelfie.labcd.unipi.it/wp-json/wp/v2/resource?slug='+slug)
      const data = await response.json()
      this.resource = data;
      this.typeOfResource=this.resource[0].acf.type_of_resource;
      this.titleRendered=this.resource[0].title.rendered;
      this.description=this.resource[0].acf.description;
      this.transformText(this.country);
      this.checkIcon(this.resource)
    },
    setCountryStyle(){ 
          //for Documentation title
          if(this.country=="italy"){this.countryResources='Risorse italiane';this.areaPrefix='Area';};
          if(this.country=="ireland"){this.countryResources='Irish Resources';this.areaPrefix='Area';};
          if(this.country=="denmark"){this.countryResources='Danske Ressourcer';this.areaPrefix='Område';};
          if(this.country=="finland"){this.countryResources='Suomalaiset Resurssit';this.areaPrefix='Alue';};
          if(this.country=="portugal"){this.countryResources='Recursos portugueses';this.areaPrefix='Área';};
          if(this.country=="sweden"){this.countryResources='Svenska Resurser';this.areaPrefix='Området';};

          //for Area name, solution for faster loading page instead of retrieving area.name from area object
          this.areaName= this.areaSlug.charAt(0).toUpperCase() + this.areaSlug.slice(1).replaceAll('-', ' ')
          if(this.areaName.includes("Leadership")){this.areaName="Leadership"}
      },
    checkIfEmpty(){
      if(this.resources.length === 0){this.allEmpty=true;}
      this.emptyMess();
    },
     checkIcon(resource){
           if(resource[0].acf.type_of_resource=="Webpage"){this.icon="webpage";}
           if(resource[0].acf.type_of_resource=="Video tutorial"){this.icon="videoTutorial";}
           if(resource[0].acf.type_of_resource=="Tool"){this.icon="tool";}
           if(resource[0].acf.type_of_resource=="CMS"){this.icon="cms";}
           if(resource[0].acf.type_of_resource=="LMS"){this.icon="lms";}
           if(resource[0].acf.type_of_resource=="Document"){this.icon="document";}
           if(resource[0].acf.type_of_resource=="Spreadsheet"){this.icon="spreadsheet";}
       },
    //Fields Translation
    transformText(country){
      this.linkPrefix="Link: ";
      this.link=this.resource[0].acf.link;
      if(country=="italy"){   
        this.canEditPrefix='Personalizzabile: ';
        if(this.resource[0].acf.can_edit==false) {this.canEdit="No"}
          else this.canEdit="Sì";
        this.subscriptionPrefix='Sottoscrizione: ' ;
        if(this.resource[0].acf.subscription==false) {this.subscription="No"}
          else this.subscription="Sì";
        if(this.resource[0].acf.learning_need==""){this.learning_need=""}
          else {this.learning_need=this.resource[0].acf.learning_need.join(', ');this.learning_needPrefix='Bisogno di apprendimento: ';}
          this.learning_need=this.learning_need.replace('Manage video content', 'Gestire  contenuti video').replace('Manage interactive activity content', 'Gestire contenuti di attività interattive').replace('Manage audio content','Gestire contenuti audio').replace('Manage learning content','Gestire contenuti didattici').replace('Communicate and discuss','Comunicare e discutere').replace('Engagement', 'Coinvolgere').replace('Manage reading content','Gestire contenuti di lettura').replace('Share document','Condividere documenti').replace('Manage image content', 'Gestire contenuti immagine').replace('Manage document','Gestire documenti').replace('Manage sheet', 'Gestire fogli elettronici').replace('Manage presentation','Gestire presentazioni').replace('Brain storming and share ideas','Brain storming e condivisione di idee').replace('Collaborative programming tools','Strumenti di programmazione collaborativa').replace('Coding','Codifica').replace('Create a website','Creare un sito web');
           this.targetPrefix='Target: ' ;
          this.target=this.resource[0].acf.target.join(', ');
          this.target=this.target.replace('Teacher', 'Insegnanti').replace('Student', 'Studenti').replace('Leader', 'Dirigenti scolastici');
          if(!this.resource[0].acf.minimum_age||!this.resource[0].acf.maximum_age){this.age=" "}
          else {this.age=this.resource[0].acf.minimum_age + " - " + this.resource[0].acf.maximum_age;this.agePrefix="Fascia d'età: ";}
      }
      if(country=="ireland"){
        this.canEditPrefix='Customisable: ';
        if(this.resource[0].acf.can_edit==false){this.canEdit="No"}
        else this.canEdit="Yes";
        this.subscriptionPrefix='Subscription: ' ;
        if(this.resource[0].acf.subscription==false) {this.subscription="No"}
          else this.subscription="Yes";
        if(this.resource[0].acf.learning_need==""){this.learning_need=""}
         else {this.learning_need=+this.resource[0].acf.learning_need.join(', ');this.learning_needPrefix='Learning need: ';}
        //  this.learning_need=this.learning_need.replace('Manage video content',).replace('Manage interactive activity content',).replace('Manage audio content',).replace('Manage learning content',).replace('Communicate and discuss',).replace('Engagement',).replace('Manage reading content',).replace('Share document').replace('Manage image content',).replace('Manage document',).replace('Manage sheet',).replace('Manage presentation',).replace('Brain storming and share ideas',).replace('Collaborative programming tools',).replace('Coding',).replace('Create a website',);
           this.targetPrefix='Target: ' ;
           this.target=this.resource[0].acf.target.join(', ');
           this.target=this.target.replace('Teacher', 'Teachers').replace('Student', 'Students').replace('Leader', 'School leaders');
          if(!this.resource[0].acf.minimum_age||!this.resource[0].acf.maximum_age){this.age=""}
          else {this.age=this.resource[0].acf.minimum_age + " - " + this.resource[0].acf.maximum_age;this.agePrefix="Age range: ";}
      }
      if(country=="denmark"){
        this.canEditPrefix='Kan tilpasses: ';
        if(this.resource[0].acf.can_edit==false){this.canEdit="Nej"}
        else this.canEdit="Ja";
        this.subscriptionPrefix='Abonnement: ' ;
        if(this.resource[0].acf.subscription==false) {this.subscription="Nej"}
          else this.subscription="Ja";
        if(this.resource[0].acf.learning_need==""){this.learning_need=""}
         else {this.learning_need=this.resource[0].acf.learning_need.join(', ');this.learning_needPrefix='Læringsbehov: ';}
        //  this.learning_need=this.learning_need.replace('Manage video content',).replace('Manage interactive activity content',).replace('Manage audio content',).replace('Manage learning content',).replace('Communicate and discuss',).replace('Engagement',).replace('Manage reading content',).replace('Share document').replace('Manage image content',).replace('Manage document',).replace('Manage sheet',).replace('Manage presentation',).replace('Brain storming and share ideas',).replace('Collaborative programming tools',).replace('Coding',).replace('Create a website',);
           this.targetPrefix='Målgruppe: ' ;
           this.target=this.resource[0].acf.target.join(', ');
           this.target=this.target.replace('Teacher', 'Lærere').replace('Student', 'Studerende').replace('Leader', 'Skoleledere');
          if(!this.resource[0].acf.minimum_age||!this.resource[0].acf.maximum_age){this.age=""}
          else {this.age=this.resource[0].acf.minimum_age + " - " + this.resource[0].acf.maximum_age;this.agePrefix="Aldersspænd: ";}
      }
      if(country=="finland"){  
        this.canEditPrefix='Muokattava: ';
        if(this.resource[0].acf.can_edit==false){this.canEdit="Ei"}
        else this.canEdit="Kyllä";
        this.subscriptionPrefix='Tilaus: ' ;
        if(this.resource[0].acf.subscription==false) {this.subscription="Ei"}
          else this.subscription="Kyllä";
        if(this.resource[0].acf.learning_need==""){this.learning_need=""}
         else {this.learning_need=this.resource[0].acf.learning_need.join(', ');this.learning_needPrefix='Oppimisen tarvetta: ';}
        //  this.learning_need=this.learning_need.replace('Manage video content',).replace('Manage interactive activity content',).replace('Manage audio content',).replace('Manage learning content',).replace('Communicate and discuss',).replace('Engagement',).replace('Manage reading content',).replace('Share document').replace('Manage image content',).replace('Manage document',).replace('Manage sheet',).replace('Manage presentation',).replace('Brain storming and share ideas',).replace('Collaborative programming tools',).replace('Coding',).replace('Create a website',);
           this.targetPrefix='Kohdista ihmisiä: ' ;
           this.target=this.resource[0].acf.target.join(', ');
           this.target=this.target.replace('Teacher', 'Opettajat').replace('Student', 'Opiskelijat').replace('Leader', 'Koulujen johtajat'); 
          if(!this.resource[0].acf.minimum_age||!this.resource[0].acf.maximum_age){this.age=""}
          else {this.age=this.resource[0].acf.minimum_age + " - " + this.resource[0].acf.maximum_age;this.agePrefix="Ikähaarukka: ";}
      }
      if(country=="portugal"){
        this.canEditPrefix='Customizável: ';
        if(this.resource[0].acf.can_edit==false){this.canEdit="Não"}
        else this.canEdit="Sim";
        this.subscriptionPrefix='Inscrição: ' ;
        if(this.resource[0].acf.subscription==false) {this.subscription="Não"}
          else this.subscription="Sim";
        if(this.resource[0].acf.learning_need==""){this.learning_need=""}
         else {this.learning_need=this.resource[0].acf.learning_need.join(', ');this.learning_needPrefix='Necessidade de aprendizado: ';}
        //  this.learning_need=this.learning_need.replace('Manage video content',).replace('Manage interactive activity content',).replace('Manage audio content',).replace('Manage learning content',).replace('Communicate and discuss',).replace('Engagement',).replace('Manage reading content',).replace('Share document').replace('Manage image content',).replace('Manage document',).replace('Manage sheet',).replace('Manage presentation',).replace('Brain storming and share ideas',).replace('Collaborative programming tools',).replace('Coding',).replace('Create a website',);
           this.targetPrefix='Alvo: ' ;
           this.target=this.resource[0].acf.target.join(', ');
           this.target=this.target.replace('Teacher', 'Professores').replace('Student', 'Alunos').replace('Leader', 'Líderes escolares');
          if(!this.resource[0].acf.minimum_age||!this.resource[0].acf.maximum_age){this.age=""}
          else {this.age=this.resource[0].acf.minimum_age + " - " + this.resource[0].acf.maximum_age;this.agePrefix="Faixa etária: ";}
      }
      if(country=="sweden"){
        this.canEditPrefix='Anpassningsbar: ';
        if(this.resource[0].acf.can_edit==false){this.canEdit="Nej"}
        else this.canEdit="Ja";
        this.subscriptionPrefix='Prenumeration: ' ;
        if(this.resource[0].acf.subscription==false) {this.subscription="Nej"}
          else this.subscription="Ja";
        if(this.resource[0].acf.learning_need==""){this.learning_need=""}
         else {this.learning_need=this.resource[0].acf.learning_need.join(', ');this.learning_needPrefix='Lärande behov: ';}
        //  this.learning_need=this.learning_need.replace('Manage video content',).replace('Manage interactive activity content',).replace('Manage audio content',).replace('Manage learning content',).replace('Communicate and discuss',).replace('Engagement',).replace('Manage reading content',).replace('Share document').replace('Manage image content',).replace('Manage document',).replace('Manage sheet',).replace('Manage presentation',).replace('Brain storming and share ideas',).replace('Collaborative programming tools',).replace('Coding',).replace('Create a website',);
           this.targetPrefix='Rikta in dig på människor: ' ;
           this.target=this.resource[0].acf.target.join(', ');
           this.target=this.target.replace('Teacher', 'Lärare').replace('Student', 'Studenter').replace('Leader', 'Skolledare');
          if(!this.resource[0].acf.minimum_age||!this.resource[0].acf.maximum_age){this.age=""}
          else {this.age=this.resource[0].acf.minimum_age + " - " + this.resource[0].acf.maximum_age;this.agePrefix="Åldersintervall: ";}
      }    
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
  width:auto;
  margin: 0 auto;
  margin-top:3rem;
}
.area{
  color:#f8b12c;
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
.field{
  font-weight: bold;
}
.expanded-resource{
  position: relative;
    background-color: white;
    min-height: 26rem;
    margin: 0 auto;
    margin-top:-1rem;
    width:85%;
    border-radius: 20px;
    word-wrap: break-word;
    border: 1px solid;
}
.typeOfResource{
  position:absolute;
  left:4rem;
  top:1.45rem;
}
.icon{
    position: absolute;
   left: 1.9rem;
   top: 2.35rem;
   font-size:1.5rem;
}
.resContent{
  max-width:80%;
  margin:0 auto;
  padding-bottom:3rem;
}
.resText{
  padding-top:1.2rem;
  text-align: justify;
  line-height: 1.6rem;
}
.close{
  color:rgb(14,48,81);
  cursor:pointer;
  position:absolute;
  right:2rem;
  top:2.1rem;
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
  width:80%;
  margin-bottom: 0.5rem;
   margin-top:4rem;
  line-height: 1.5rem;
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
  padding-bottom:1rem;
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
@media(max-width: 1100px) {
  .expanded-resource{
    width:92%;   
  }
  
}
@media (min-width: 800px) and (max-width: 1100px) {

}
 @media (max-width: 800px) {
   .title{
  width:90%;
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
  .title{
  margin-top:6.5rem;
  line-height: 1.4rem;
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
   .expanded-resource{
    width:100%;   
  }
  .resText{
    padding-top:1rem;
  }
    
 }
@media (max-width: 400px) {
    .header_box{
    left:0rem;
    top:1.6rem;
  }
  .fa-house {
    top:1.1rem;
  }
  #categories_title{
    margin-top:1.2rem;
    padding-bottom:0.8rem;
  }
}
@media (min-width: 801px) and (max-width: 1100px) {
   #categories_title{
   max-width:20rem;
   line-height: 2rem;
  }
  .title{
  width:60%;
  }
}
</style>