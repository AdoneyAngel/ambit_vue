<template>
    <GuideList :isOwner="true" :guides="[...ownerGuides, ...sharedGuides]"/>
</template>

<script>
import { ref } from 'vue';
import GuideList from './GuideList.vue';
import { getData } from "@/API/localStorage"
import { getGuideData, getSharedGuides, getUserGuides } from "@/API/DB/db"

export default {
    data(){
        return{
            ownerGuides: ref([]),
            sharedGuides: ref([]),
            userMail: ref("")
        }
    },
    mounted(){
        this.userMail = ref(getData("userMail"))

        getUserGuides(this.userMail).then(res => {

            getSharedGuides(this.userMail).then(sharedGuidesRes => {
                let sharedGuides = sharedGuidesRes.map(guide => {
                    return {
                        ...guide,
                        isShared: true
                    }
                })

                sharedGuides.forEach(async guide => {
                    getGuideData(guide.code).then(data => {
                        sharedGuides = sharedGuides.map(guideB => {
                            if(guideB.code === guide.code) {
                                return {
                                    ...guideB,
                                    sharedBy: data.owner
                                }
                            }
                        })

                        this.sharedGuides = sharedGuides
                    })
                })

            })
            
            this.ownerGuides = res.map(guide => {
                return {
                    ...guide, 
                    isShared: false
                }
            })
        })
    },
    components:{
        GuideList
    }
}

</script>

<style>

</style>