<template>
<div class="resource">
    <i :title="icon" class="fa-solid fa-link icon" v-if="this.icon=='webpage'"></i>
    <i :title="icon" class="fa-solid fa-video icon" v-if="this.icon=='videoTutorial'"></i>
    <i :title="icon" class="fa-solid fa-wrench icon" v-if="this.icon=='tool'"></i>
    <i :title="icon" class="fa-regular fa-file icon" v-if="this.icon=='document'"></i>
    <i :title="icon" class="fa-regular fa-file-excel icon" v-if="this.icon=='spreadsheet'"></i>
    <i :title="icon" class="fa-solid fa-chalkboard-user icon" v-if="this.icon=='lms'"></i>
    <i :title="icon" class="fa-solid fa-pager icon" v-if="this.icon=='cms'"></i>
    <i v-if="ageRange" title="Target age group" class=age_group>{{resource.acf.minimum_age}} - {{resource.acf.maximum_age}}</i>
    <!-- <h4>{{resource.acf.minimum_age}}</h4><h4>{{resource.acf.maximum_age}}</h4> -->
    <!-- <i class="fa-solid fa-arrow-up-right-from-square expand"></i> -->
    <!-- <i class="fa-regular fa-paper-plane expand"></i> -->
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
       }
   },

    mounted(){
        this.checkIcon()
    },
   methods: {
       checkIcon(){
           if(this.resource.acf.type_of_resource=="Webpage"){this.icon="webpage";}
           if(this.resource.acf.type_of_resource=="Video tutorial"){this.icon="videoTutorial";}
           if(this.resource.acf.type_of_resource=="Tool"){this.icon="tool";}
           if(this.resource.acf.type_of_resource=="CMS"){this.icon="cms";}
           if(this.resource.acf.type_of_resource=="LMS"){this.icon="lms";}
           if(this.resource.acf.type_of_resource=="Document"){this.icon="document";}
           if(this.resource.acf.type_of_resource=="Spreadsheet"){this.icon="spreadsheet";}

           if(this.resource.acf.minimum_age==""){this.ageRange=false}
       }
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
    cursor: zoom-out;
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