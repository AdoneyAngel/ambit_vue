<template>
    <GuideList :isOwner="true" :guides="ownerGuides"/>
</template>

<script>
import { ref } from 'vue';
import GuideList from './GuideList.vue';
import { getData } from "@/API/localStorage"
import { getUserGuides } from "@/API/DB/db"

export default {
    data(){
        return{
            ownerGuides: ref([]),
            userMail: ref("")
        }
    },
    mounted(){
        this.userMail = ref(getData("userMail"))

        getUserGuides(this.userMail).then(res => {
            
            this.ownerGuides = res
        })
    },
    components:{
        GuideList
    }
}

</script>

<style>

</style>