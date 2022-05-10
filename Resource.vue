<template>
<div class="resource" @click="expand">

    <i class="fa-solid fa-link icon" v-if="this.icon=='webpage'"></i>
    <i class="fa-solid fa-video icon" v-if="this.icon=='videoTutorial'"></i>
    <i class="fa-solid fa-wrench icon" v-if="this.icon=='tool'"></i>
    <i class="fa-regular fa-file icon" v-if="this.icon=='document'"></i>
    <i class="fa-regular fa-file-excel icon" v-if="this.icon=='spreadsheet'"></i>
    <i class="fa-solid fa-chalkboard-user icon" v-if="this.icon=='lms'"></i>
    <i class="fa-solid fa-pager icon" v-if="this.icon=='cms'"></i>

    <i v-bind:class="{}"></i>
    <!-- <i class="fa-solid fa-arrow-up-right-from-square expand"></i> -->
    <!-- <i class="fa-regular fa-paper-plane expand"></i> -->
    <h3>{{resource.title.rendered}}</h3>
</div>
</template>

<script>
export default {
   name: 'Resource',
   props: {
       resource: Object
   },
   data(){
       return{
           expandedResource: Object,

            icon:String

       }
   },
   emits: ['expand'],

    mounted(){
        this.checkIcon()
    },
   methods: {
       expand(){
            this.expandedResource=this.resource;
            this.$emit("expand", this.expandedResource);
       },
       checkIcon(){
           if(this.resource.acf.type_of_resource=="Webpage"){this.icon="webpage";}
           if(this.resource.acf.type_of_resource=="Video tutorial"){this.icon="videoTutorial";}
           if(this.resource.acf.type_of_resource=="Tool"){this.icon="tool";}
           if(this.resource.acf.type_of_resource=="CMS"){this.icon="cms";}
           if(this.resource.acf.type_of_resource=="LMS"){this.icon="lms";}
           if(this.resource.acf.type_of_resource=="Document"){this.icon="document";}
           if(this.resource.acf.type_of_resource=="Spreadsheet"){this.icon="spreadsheet";}
           /* this.$emit("checkIcon", this.icon); */
       }
   }
}
</script>

<style scoped>
.resource{
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
div {
  background: rgb(163, 252, 255);
  cursor: default;
}
a {
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