<template>
<div class="resource">
    <i :title="icon" class="fa-solid fa-link icon" v-if="this.icon=='Webpage'"></i>
    <i :title="icon" class="fa-solid fa-video icon" v-if="this.icon=='Video'"></i>
    <i :title="icon" class="fa-solid fa-wrench icon" v-if="this.icon=='Tool'"></i>
    <i :title="icon" class="fa-solid fa-file icon" v-if="this.icon=='Document'"></i>
    <i :title="icon" class="fa-regular fa-file-excel icon" v-if="this.icon=='Spreadsheet'"></i>
    <i :title="icon" class="fa-solid fa-chalkboard-user icon" v-if="this.icon=='LMS'"></i>
    <i :title="icon" class="fa-solid fa-pager icon" v-if="this.icon=='CMS'"></i>

    <i :title="icon" class="fa-solid fa-book icon" v-if="this.icon=='Research'"></i>
    <i :title="icon" class="fa-solid fa-file-signature icon" v-if="this.icon=='Worksheet'"></i>
    <i :title="icon" class="fa-solid fa-rectangle-list icon" v-if="this.icon=='Course descriptions'"></i>
    <i v-if="ageRange" title="Target age group" class=age_group>{{resource.acf.minimum_age}} - {{resource.acf.maximum_age}}</i>
    <i v-if="downloadable" title="Download" class="fa-solid fa-download download"></i>
    <p class="resTitle">{{resource.title.rendered}}</p>
</div>
</template>

<script>
export default {
   name: 'ResourceButton',
   props: {
       resource: Object
   },
   data(){
       return{
         icon:String,
         ageRange:Boolean,
         downloadable:false,
       }
   },

    mounted(){
        this.checkIcon()
    },
   methods: {
       checkIcon(){
           if(this.resource.acf.type_of_resource=="Webpage"){this.icon="Webpage";}
           if(this.resource.acf.type_of_resource=="Video tutorial"){this.icon="Video";}
           if(this.resource.acf.type_of_resource=="Tool"){this.icon="Tool";}
           if(this.resource.acf.type_of_resource=="CMS"){this.icon="CMS";}
           if(this.resource.acf.type_of_resource=="LMS"){this.icon="LMS";}
           if(this.resource.acf.type_of_resource=="Document"){this.icon="Document";}
           if(this.resource.acf.type_of_resource=="Spreadsheet"){this.icon="Spreadsheet";}

           if(this.resource.acf.type_of_resource=="Research"){this.icon="Research";}
           if(this.resource.acf.type_of_resource=="Worksheet for students"){this.icon="Worksheet";}
           if(this.resource.acf.type_of_resource=="Course descriptions"){this.icon="Course descriptions";}
           console.log(this.resource.acf.type_of_resource);

           if(!this.resource.acf.minimum_age || !this.resource.acf.maximum_age){this.ageRange=false}
           if(this.resource.acf.downloadable){this.downloadable=true}
       },
   }
}
</script>

<style scoped>
.resource{
    cursor:pointer;
     background: rgb(163, 255, 252);
    box-sizing: border-box;
    list-style-image: none;
    width:15rem;
    height:6.5rem;
    box-sizing: border-box;
    padding-right:0.8rem;
    padding-left:0.8rem;
    position:relative;
    border-radius: 15px;
    word-wrap: break-word;
    margin:0.8rem;
    display: flex;
  justify-content: center;
  align-items: center;
}
.resTitle{
    padding-top:0.4rem;
    font-size: 1.06rem;
    font-weight: bold;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
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
.age_group{
    position: absolute;
    left: 35px;
    top: 8.5px;
    padding-left:8px;
    padding-right:8px;
    display:inline-block;
    color:rgb(0, 0, 0);
    font-style: italic;
    font-weight: bold;
    font-size:0.9rem;
    border:1px solid rgb(221, 207, 57);
    border-radius: 10px;
    background:#DDD;
    box-shadow: 2px 2px 0px -1px rgba(0, 0, 0, 0.2);
    cursor:pointer;
    vertical-align:middle;
    background-color: rgb(242, 242, 155)
}

.download{
   position: absolute;
   right: 10px;
   top: 10px;
   font-size:1rem; 
}
.resource:hover .age_group{ 
	background-color: rgb(255, 255, 255);
    border:1px solid rgb(255, 255, 255);
}

a{
    color: rgb(44,62,80);
    cursor: pointer;
    text-decoration: underline;
    padding:10px;
}
a:hover{
    color:white;
}
#back{
    float:left;
    font-size: 1.2rem;
    color: rgb(204, 40, 40);
}
#back:hover {
    font-size: 1.5rem;
    color:white;
}

</style>