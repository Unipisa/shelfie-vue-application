<template>
<h2 id="categories_title"><router-link to="/italy"><i id="back" title="Back to Areas" class="fa-solid fa-circle-arrow-left"></i></router-link>
      Area: <span class=area>{{area.name}}</span></h2>
<div class="resourceBox" v-if="!expanded">
  
  <div id="filter" >
    <a id="target">Target School:</a>
    <a :class='all ? "buttonT" : "buttonF"' @click="getAll()">All</a>
    <a :class='primary ? "buttonT" : "buttonF"' @click="getPrimary()">Primary</a>
    <a :class='lowerS ? "buttonT" : "buttonF"' @click="getLowerS()">Lower Secondary</a>
    <a :class='upperS ? "buttonT" : "buttonF"' @click="getUpperS()">Upper Secondary</a>
    <a :class='vocational ? "buttonT" : "buttonF"' @click="getVocational()">Vocational</a>
  </div>
<!-- Lista risorse -->
  <div class="resources">
    <p v-if="empty" id="emptyMsg">{{emptyMessage}}</p>
      <div :key="resource.id" v-for="resource in filteredRes">
        <Resource :resource="resource" @expand="expand" :area="area" @checkIcon="checkIcon"/>
      </div>
  </div>
</div>
<!--  -->
<!-- Scheda risorse -->
<div class="resourceBox" v-if="expanded" >
  <div class="expanded-resource" v-if="expanded">
    <div class="resContent">
      <i title="Close" class="fa-solid fa-xmark close" @click="close"></i>
      <i class="fa-solid fa-link icon" v-if="this.icon=='webpage'"></i>
      <i class="fa-solid fa-video icon" v-if="this.icon=='videoTutorial'"></i>
      <i class="fa-solid fa-wrench icon" v-if="this.icon=='tool'"></i>
      <i class="fa-regular fa-file icon" v-if="this.icon=='document'"></i>
      <i class="fa-regular fa-file-excel icon" v-if="this.icon=='spreadsheet'"></i>
      <i class="fa-solid fa-pager icon" v-if="this.icon=='cms'"></i>
      <h4 class="typeOfResource">{{expandedResource.acf.type_of_resource}}</h4>
      <h2 class="title">{{expandedResource.title.rendered}}</h2>
      <div class="resText">
        <p >{{expandedResource.acf.description}}</p>
        <p>{{target}}</p>
        <p>{{learning_need}}</p>
        <p>{{canEdit}}</p>
        <p>{{subscription}}</p>
        <h4>Link: <a :href="expandedResource.acf.link" target="_blank">{{expandedResource.acf.link}}</a></h4>
      </div>
    </div>
</div>
        
  
</div>
</template>


<script>
import Resource from './ResourceButton.vue'

export default {
  name: 'Resources',
  props: {
    resources: Array,
    area: Object,
    country: String
  },
  components: {
    Resource
  },
  data(){
    return{
    filteredRes: [],

    all:true,
    primary:false,
    lowerS:false,
    upperS:false,
    vocational:false,

    empty: false,
    emptyMessage:String,

    expanded:false,
    expandedResource: Object,

    icon:String,
    learning_need:String,
    target:String,
    canEdit:String,
    subscription:String,
    
    }
  },
  mounted(){
  this.checkIfEmpty();
  this.getAll();
  console.log(this.areas)
  },
computed: {
  
},
  methods:{
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
    getPrimary(){
    this.filteredRes = this.resources.filter(function(ele){
      return ele.school.includes(89);
    })
    this.primary=true;
    this.empty=false;
    this.all=false;this.lowerS=false;this.upperS=false;this.vocational=false;
    this.checkIfNone();
    },
    getLowerS(){
    this.filteredRes = this.resources.filter(function(ele){
      return ele.school.includes(90);
    })
    this.lowerS=true;
    this.empty=false;
    this.all=false;this.primary=false;this.upperS=false;this.vocational=false;
    this.checkIfNone();
    },
    getUpperS(){
    this.filteredRes = this.resources.filter(function(ele){
      return ele.school.includes(218);
    })
    this.upperS=true;
    this.empty=false;
    this.all=false;this.primary=false;this.lowerS=false;this.vocational=false;
    this.checkIfNone();
    },
    getVocational(){
    this.filteredRes = this.resources.filter(function(ele){
      return ele.school.includes(220);
    })
    this.vocational=true;
    this.empty=false;
    this.all=false;this.primary=false;this.lowerS=false;this.upperS=false;
    this.checkIfNone();
    },
    expand(res){
      this.expanded=true;
      this.expandedResource=res;
      this.transformText();
    },
    close(){
      this.expanded=false;
    },
    checkIcon(icon){
      this.icon=icon;
    },

    /* Messages and translations*/
    emptyMess(){
     if(this.country=="Italy"){this.emptyMessage="Nessuna risorsa trovata in quest'Area"};
     if(this.country=="Ireland"){this.emptyMessage="No resources found in this Area"}
     if(this.country=="Denmark"){this.emptyMessage="Ingen ressourcer fundet i dette Område"}
     if(this.country=="Finland"){this.emptyMessage="Tältä Alueelta ei löydy resursseja"}
     if(this.country=="Portugal"){this.emptyMessage="Nenhum recurso encontrado nesta Área"}
     if(this.country=="Sweden"){this.emptyMessage="Inga resurser hittades i detta Område"}
    },
    transformText(){
      if(this.country=="Italy"){
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
      if(this.country=="Ireland"){
        if(this.expandedResource.acf.can_edit==false){this.canEdit="Can be edited: No"}
        else this.canEdit="Can be edited: Yes";
        if(this.expandedResource.acf.subscription==false) {this.subscription="Subscription: No"}
          else this.canEdit="Subscription: Yes";
        if(this.expandedResource.acf.learning_need==""){this.learning_need=""}
         else this.learning_need="Learning need: "+this.expandedResource.acf.learning_need.join(', ');
        //  this.learning_need=this.learning_need.replace('Manage video content',).replace('Manage interactive activity content',).replace('Manage audio content',).replace('Manage learning content',).replace('Communicate and discuss',).replace('Engagement',).replace('Manage reading content',).replace('Share document').replace('Manage image content',).replace('Manage document',).replace('Manage sheet',).replace('Manage presentation',).replace('Brain storming and share ideas',).replace('Collaborative programming tools',).replace('Coding',).replace('Create a website',);
           this.target="Target: "+ this.expandedResource.acf.target.join(', ');
           this.target=this.target.replace('Teacher', 'Teachers').replace('Student', 'Students').replace('Leader', 'School leaders');
      }
      if(this.country=="Denmark"){
        if(this.expandedResource.acf.can_edit==false){this.canEdit="Kan redigeres: Nej"}
        else this.canEdit="Kan redigeres: Ja";
        if(this.expandedResource.acf.subscription==false) {this.subscription="Abonnement: Nej"}
          else this.canEdit="Abonnement: Ja";
        if(this.expandedResource.acf.learning_need==""){this.learning_need=""}
         else this.learning_need="Læringsbehov: "+this.expandedResource.acf.learning_need.join(', ');
        //  this.learning_need=this.learning_need.replace('Manage video content',).replace('Manage interactive activity content',).replace('Manage audio content',).replace('Manage learning content',).replace('Communicate and discuss',).replace('Engagement',).replace('Manage reading content',).replace('Share document').replace('Manage image content',).replace('Manage document',).replace('Manage sheet',).replace('Manage presentation',).replace('Brain storming and share ideas',).replace('Collaborative programming tools',).replace('Coding',).replace('Create a website',);
           this.target="Målrette folk: "+ this.expandedResource.acf.target.join(', ');
           this.target=this.target.replace('Teacher', 'Lærere').replace('Student', 'Studerende').replace('Leader', 'Skoleledere');
      }
      if(this.country=="Finland"){
        if(this.expandedResource.acf.can_edit==false){this.canEdit="Voidaan muokata: Ei"}
        else this.canEdit="Voidaan muokata: Kyllä";
        if(this.expandedResource.acf.subscription==false) {this.subscription="Tilaus: Ei"}
          else this.canEdit="Tilaus: Kyllä";
        if(this.expandedResource.acf.learning_need==""){this.learning_need=""}
         else this.learning_need="Oppimisen tarvetta: "+this.expandedResource.acf.learning_need.join(', ');
        //  this.learning_need=this.learning_need.replace('Manage video content',).replace('Manage interactive activity content',).replace('Manage audio content',).replace('Manage learning content',).replace('Communicate and discuss',).replace('Engagement',).replace('Manage reading content',).replace('Share document').replace('Manage image content',).replace('Manage document',).replace('Manage sheet',).replace('Manage presentation',).replace('Brain storming and share ideas',).replace('Collaborative programming tools',).replace('Coding',).replace('Create a website',);
           this.target="Kohdista ihmisiä: "+ this.expandedResource.acf.target.join(', ');
           this.target=this.target.replace('Teacher', 'Opettajat').replace('Student', 'Opiskelijat').replace('Leader', 'Koulujen johtajat');
      }
      if(this.country=="Portugal"){
        if(this.expandedResource.acf.can_edit==false){this.canEdit="Pode ser editado: Não"}
        else this.canEdit="Pode ser editado: Sim";
        if(this.expandedResource.acf.subscription==false) {this.subscription="Inscrição: Não"}
          else this.canEdit="Inscrição: Sim";
        if(this.expandedResource.acf.learning_need==""){this.learning_need=""}
         else this.learning_need="Necessidade de aprendizado: "+this.expandedResource.acf.learning_need.join(', ');
        //  this.learning_need=this.learning_need.replace('Manage video content',).replace('Manage interactive activity content',).replace('Manage audio content',).replace('Manage learning content',).replace('Communicate and discuss',).replace('Engagement',).replace('Manage reading content',).replace('Share document').replace('Manage image content',).replace('Manage document',).replace('Manage sheet',).replace('Manage presentation',).replace('Brain storming and share ideas',).replace('Collaborative programming tools',).replace('Coding',).replace('Create a website',);
           this.target="Alvo: "+ this.expandedResource.acf.target.join(', ');
           this.target=this.target.replace('Teacher', 'Professores').replace('Student', 'Alunos').replace('Leader', 'Líderes escolares');
      }
      if(this.country=="Sweden"){
        if(this.expandedResource.acf.can_edit==false){this.canEdit="Kan redigeras: Nej"}
        else this.canEdit="Kan redigeras: Ja";
        if(this.expandedResource.acf.subscription==false) {this.subscription="Prenumeration: Nej"}
          else this.canEdit="Prenumeration: Ja";
        if(this.expandedResource.acf.learning_need==""){this.learning_need=""}
         else this.learning_need="Lärande behov: "+this.expandedResource.acf.learning_need.join(', ');
        //  this.learning_need=this.learning_need.replace('Manage video content',).replace('Manage interactive activity content',).replace('Manage audio content',).replace('Manage learning content',).replace('Communicate and discuss',).replace('Engagement',).replace('Manage reading content',).replace('Share document').replace('Manage image content',).replace('Manage document',).replace('Manage sheet',).replace('Manage presentation',).replace('Brain storming and share ideas',).replace('Collaborative programming tools',).replace('Coding',).replace('Create a website',);
           this.target="Rikta in dig på människor: "+ this.expandedResource.acf.target.join(', ');
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
  cursor:pointer;
  position:absolute;
  right:2rem;
  top:2rem;
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
</style>