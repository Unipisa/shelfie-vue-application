<template>
<h2 id="categories_title"><router-link to="/italy"><i id="back" title="Back to Areas" class="fa-solid fa-circle-arrow-left" ></i></router-link>
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
    <p v-if="empty" id="emptyMsg">Nessuna risorsa trovata in quest'Area</p>
      <div :key="resource.id" v-for="resource in filteredRes">
        
        <router-link :to="{name: 'Res', params: {res: resource.slug}}">
          <Resource :resource="resource" @expand="expand" />
        </router-link>
      </div>
  </div>
</div>
<!--  -->
<router-view name="Res" :expandedResource="expandedResource"></router-view>
<!-- Scheda risorse -->

</template>


<script>
import Resource from '../../components/Resource.vue'
import Res from '../../components/Res.vue'

export default {
  name: 'AreaITA',
  props: {
    resources: Array,
    area: Object,
    country: String
  },
  components: {
    Resource,
    Res
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
    
    }
  },
  emits: ['back']
  ,
  mounted(){
  this.checkIfEmpty();
  this.getAll();
  this.back=true;
  },
computed: {
  
},
  methods:{
    expand(res){
        console.log(res)
        this.expandedResource=res;
       },
    back(){
      this.$emit("back")
    },
    checkIfEmpty(){
      if(this.resources.length === 0){this.allEmpty=true;}
      this.emptyMess();
    },
    emptyMess(){
     if(this.country=="Italy"){this.emptyMessage="Nessuna risorsa trovata in quest'Area"};
     if(this.country=="Ireland"){this.emptyMessage="No resources found in this Area"}
     if(this.country=="Denmark"){this.emptyMessage="Ingen ressourcer fundet i dette Område"}
     if(this.country=="Finland"){this.emptyMessage="Tältä Alueelta ei löydy resursseja"}
     if(this.country=="Portugal"){this.emptyMessage="Nenhum recurso encontrado nesta Área"}
     if(this.country=="Sweden"){this.emptyMessage="Inga resurser hittades i detta Område"}
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
    close(){
      this.expanded=false;
      this.$router.go(-1);
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
.resource{
  background: rgb(163, 252, 255);
    cursor:pointer;
    box-sizing: border-box;
    list-style-image: none;
    width:15rem;
    position:relative;
    border-radius: 15px;
    word-wrap: break-word;
    padding:0.1rem;
    margin-top:1rem;
    min-height: 6rem;
    margin:1rem;
}




.resource:hover {
    background: rgb(63, 149, 170);
    color:white;

}
.expand{
   position: absolute;
   right: 10px;
   top: 10px;
   font-size:0.9rem;
}
.icon{
    position: absolute;
   left: 10px;
   top: 10px;
   font-size:1rem;
}
h3{
    text-align:center;
    vertical-align: middle;
    line-height: 1.8rem;
    padding: 1.2em 0 1.2em 0;
    
}
#back{
    font-size: 1.2rem;
    color: rgb(111, 204, 40);
}
#back:hover {
    font-size: 1.4rem;
    color:white;
}
</style>