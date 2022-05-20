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

    <div class="resourceBox">
  <div class="expanded-resource">
    <div class="resContent">
      <i title="Close" class="fa-solid fa-xmark close" @click="back"></i>
      <i class="fa-solid fa-link icon" v-if="this.icon=='webpage'"></i>
      <i class="fa-solid fa-video icon" v-if="this.icon=='videoTutorial'"></i>
      <i class="fa-solid fa-wrench icon" v-if="this.icon=='tool'"></i>
      <i class="fa-regular fa-file icon" v-if="this.icon=='document'"></i>
      <i class="fa-regular fa-file-excel icon" v-if="this.icon=='spreadsheet'"></i>
      <i class="fa-solid fa-pager icon" v-if="this.icon=='cms'"></i>
      <h4 class="typeOfResource">{{typeOfResource}}</h4>
      <h2 class="title">{{titleRendered}}</h2>
      <div class="resText">
        <p >{{description}}</p>
        <p class="field">{{target}}</p>
        <p class="field">{{learning_need}}</p>
        <p class="field">{{canEdit}}</p>
        <p class="field">{{subscription}}</p>
        <h4><a :href="link" target="_blank">{{link}}</a></h4>
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
  },
  components: {

  },
  data(){
    return{
    resource: Object,
    title:String,
    icon:String,

    typeOfResource:'',
    titleRendered:'',
    description:'',
    learning_need:'',
    target:'',
    canEdit:'',
    subscription:'',
    link:'',
    }
  },
  mounted(){
    
  },
  created(){
    this.getResourceBySlug(this.resourceSlug);
    this.setCountryStyle();
    /* this.transformText(this.country)
    this.checkIcon(this.resource) */
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
      /* this.link='Link: '+this.resource[0].acf.link;
      this.target=this.resource[0].acf.target;
      this.canEdit=this.resource[0].acf.can_edit;
      this.subscription=this.resource[0].acf.subscription; */
    },
    setCountryStyle(){ 
          //for Documentation title
          if(this.country=="italy"){this.title='Italy'};
          if(this.country=="ireland"){this.title='Ireland'};
          if(this.country=="denmark"){this.title='Denmark'};
          if(this.country=="finland"){this.title='Finland'};
          if(this.country=="portugal"){this.title='Portugal'};
          if(this.country=="sweden"){this.title='Sweden'};
      },
    back(){
      this.$router.go(-1);
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
           /* this.$emit("checkIcon", this.icon); */
       },
    //Fields Translation
    transformText(country){
      if(country=="italy"){
        if(this.resource[0].acf.can_edit==false) {this.canEdit="Personalizzabile: No"}
          else this.canEdit="Personalizzabile: Sì";
        if(this.resource[0].acf.subscription==false) {this.subscription="Sottoscrizione: No"}
          else this.canEdit="Sottoscrizione: Sì";
        if(this.resource[0].acf.learning_need==""){this.learning_need=""}
          else this.learning_need="Bisogno di apprendimento: "+this.resource[0].acf.learning_need.join(', ');
          this.learning_need=this.learning_need.replace('Manage video content', 'Gestire  contenuti video').replace('Manage interactive activity content', 'Gestire contenuti di attività interattive').replace('Manage audio content','Gestire contenuti audio').replace('Manage learning content','Gestire contenuti didattici').replace('Communicate and discuss','Comunicare e discutere').replace('Engagement', 'Coinvolgere').replace('Manage reading content','Gestire contenuti di lettura').replace('Share document','Condividere documenti').replace('Manage image content', 'Gestire contenuti immagine').replace('Manage document','Gestire documenti').replace('Manage sheet', 'Gestire fogli elettronici').replace('Manage presentation','Gestire presentazioni').replace('Brain storming and share ideas','Brain storming e condivisione di idee').replace('Collaborative programming tools','Strumenti di programmazione collaborativa').replace('Coding','Codifica').replace('Create a website','Creare un sito web');
          this.target="Target: "+ this.resource[0].acf.target.join(', ');
          this.target=this.target.replace('Teacher', 'Insegnanti').replace('Student', 'Studenti').replace('Leader', 'Dirigenti scolastici');
      }
      if(country=="ireland"){
        if(this.resource[0].acf.can_edit==false){this.canEdit="Customisable: No"}
        else this.canEdit="Customisable: Yes";
        if(this.resource[0].acf.subscription==false) {this.subscription="Subscription: No"}
          else this.canEdit="Subscription: Yes";
        if(this.resource[0].acf.learning_need==""){this.learning_need=""}
         else this.learning_need="Learning need: "+this.resource[0].acf.learning_need.join(', ');
        //  this.learning_need=this.learning_need.replace('Manage video content',).replace('Manage interactive activity content',).replace('Manage audio content',).replace('Manage learning content',).replace('Communicate and discuss',).replace('Engagement',).replace('Manage reading content',).replace('Share document').replace('Manage image content',).replace('Manage document',).replace('Manage sheet',).replace('Manage presentation',).replace('Brain storming and share ideas',).replace('Collaborative programming tools',).replace('Coding',).replace('Create a website',);
           this.target="Target: "+ this.resource[0].acf.target.join(', ');
           this.target=this.target.replace('Teacher', 'Teachers').replace('Student', 'Students').replace('Leader', 'School leaders');
      }
      if(country=="denmark"){
        if(this.resource[0].acf.can_edit==false){this.canEdit="Kan tilpasses: Nej"}
        else this.canEdit="Kan tilpasses: Ja";
        if(this.resource[0].acf.subscription==false) {this.subscription="Abonnement: Nej"}
          else this.canEdit="Abonnement: Ja";
        if(this.resource[0].acf.learning_need==""){this.learning_need=""}
         else this.learning_need="Læringsbehov: "+this.resource[0].acf.learning_need.join(', ');
        //  this.learning_need=this.learning_need.replace('Manage video content',).replace('Manage interactive activity content',).replace('Manage audio content',).replace('Manage learning content',).replace('Communicate and discuss',).replace('Engagement',).replace('Manage reading content',).replace('Share document').replace('Manage image content',).replace('Manage document',).replace('Manage sheet',).replace('Manage presentation',).replace('Brain storming and share ideas',).replace('Collaborative programming tools',).replace('Coding',).replace('Create a website',);
           this.target="Målgruppe: "+ this.resource[0].acf.target.join(', ');
           this.target=this.target.replace('Teacher', 'Lærere').replace('Student', 'Studerende').replace('Leader', 'Skoleledere');
      }
      if(country=="finland"){
        if(this.resource[0].acf.can_edit==false){this.canEdit="Muokattava: Ei"}
        else this.canEdit="Muokattava: Kyllä";
        if(this.resource[0].acf.subscription==false) {this.subscription="Tilaus: Ei"}
          else this.canEdit="Tilaus: Kyllä";
        if(this.resource[0].acf.learning_need==""){this.learning_need=""}
         else this.learning_need="Oppimisen tarvetta: "+this.resource[0].acf.learning_need.join(', ');
        //  this.learning_need=this.learning_need.replace('Manage video content',).replace('Manage interactive activity content',).replace('Manage audio content',).replace('Manage learning content',).replace('Communicate and discuss',).replace('Engagement',).replace('Manage reading content',).replace('Share document').replace('Manage image content',).replace('Manage document',).replace('Manage sheet',).replace('Manage presentation',).replace('Brain storming and share ideas',).replace('Collaborative programming tools',).replace('Coding',).replace('Create a website',);
           this.target="Kohdista ihmisiä: "+ this.resource[0].acf.target.join(', ');
           this.target=this.target.replace('Teacher', 'Opettajat').replace('Student', 'Opiskelijat').replace('Leader', 'Koulujen johtajat'); 
      }
      if(country=="portugal"){
        if(this.resource[0].acf.can_edit==false){this.canEdit="Customizável: Não"}
        else this.canEdit="Customizável: Sim";
        if(this.resource[0].acf.subscription==false) {this.subscription="Inscrição: Não"}
          else this.canEdit="Inscrição: Sim";
        if(this.resource[0].acf.learning_need==""){this.learning_need=""}
         else this.learning_need="Necessidade de aprendizado: "+this.resource[0].acf.learning_need.join(', ');
        //  this.learning_need=this.learning_need.replace('Manage video content',).replace('Manage interactive activity content',).replace('Manage audio content',).replace('Manage learning content',).replace('Communicate and discuss',).replace('Engagement',).replace('Manage reading content',).replace('Share document').replace('Manage image content',).replace('Manage document',).replace('Manage sheet',).replace('Manage presentation',).replace('Brain storming and share ideas',).replace('Collaborative programming tools',).replace('Coding',).replace('Create a website',);
           this.target="Alvo: "+ this.resource[0].acf.target.join(', ');
           this.target=this.target.replace('Teacher', 'Professores').replace('Student', 'Alunos').replace('Leader', 'Líderes escolares');
      }
      if(country=="sweden"){
        if(this.resource[0].acf.can_edit==false){this.canEdit="Anpassningsbar: Nej"}
        else this.canEdit="Anpassningsbar: Ja";
        if(this.resource[0].acf.subscription==false) {this.subscription="Prenumeration: Nej"}
          else this.canEdit="Prenumeration: Ja";
        if(this.resource[0].acf.learning_need==""){this.learning_need=""}
         else this.learning_need="Lärande behov: "+this.resource[0].acf.learning_need.join(', ');
        //  this.learning_need=this.learning_need.replace('Manage video content',).replace('Manage interactive activity content',).replace('Manage audio content',).replace('Manage learning content',).replace('Communicate and discuss',).replace('Engagement',).replace('Manage reading content',).replace('Share document').replace('Manage image content',).replace('Manage document',).replace('Manage sheet',).replace('Manage presentation',).replace('Brain storming and share ideas',).replace('Collaborative programming tools',).replace('Coding',).replace('Create a website',);
           this.target="Rikta in dig på människor: "+ this.resource[0].acf.target.join(', ');
           this.target=this.target.replace('Teacher', 'Lärare').replace('Student', 'Studenter').replace('Leader', 'Skolledare');
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
.field{
  font-weight: bold;
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