<template>
<h2 id="categories_title"><router-link to="/sweden" @click="goBack()"><i id="back" title="Back to Areas" class="fa-solid fa-circle-arrow-left" ></i></router-link>
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
    <p v-if="empty" id="emptyMsg">Inga resurser hittades i detta Område</p>
      <div :key="resource.id" v-for="resource in filteredRes">
        <Resource :resource="resource" @click="expand(resource)" :area="area" @checkIcon="checkIcon"/>
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
import Resource from '../../components/Resource.vue'

export default {
  name: 'AreaSWE',
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
  this.back=true;
  },
computed: {
  
},
  methods:{
    goBack(){
    this.$emit('back');
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
      this.checkIcon(res);
    },
    close(){
      this.expanded=false;
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
     if(this.country=="Italy"){this.emptyMessage="Nessuna risorsa trovata in quest'Area"};
     if(this.country=="Ireland"){this.emptyMessage="No resources found in this Area"}
     if(this.country=="Denmark"){this.emptyMessage="Ingen ressourcer fundet i dette Område"}
     if(this.country=="Finland"){this.emptyMessage="Tältä Alueelta ei löydy resursseja"}
     if(this.country=="Portugal"){this.emptyMessage="Nenhum recurso encontrado nesta Área"}
     if(this.country=="Sweden"){this.emptyMessage="Inga resurser hittades i detta Område"}
    },
    transformText(){
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
</style>