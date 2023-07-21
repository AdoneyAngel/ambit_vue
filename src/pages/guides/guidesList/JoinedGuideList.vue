<template>
    <GuideList :guides="joinedGuides"/>
</template>

<script>
import { ref } from 'vue';
import GuideList from './GuideList.vue';
import { getData } from "@/API/localStorage"
import { getJoinedGuides } from "@/API/DB/db"

export default {
    data(){
        return{
            joinedGuides: ref([]),
            userMail: ref("")
        }
    },
    async mounted(){
        this.userMail = ref(getData("userMail"))

        const joinedGuides = await getJoinedGuides(this.userMail)

        this.joinedGuides = joinedGuides

    },
    components:{
        GuideList
    }
}

</script>

<style>

</style>