<template>
    <div class="guidesContainer">
        <div @click="() => guideClick(guide.guide.code)" class="guideFound" v-for="(guide, index) in guidesFound" :key="index">
            <h2>{{ guide.guide.name }}</h2>
            <p>{{ guide.owner.nickname }}</p>
        </div>
    </div>
</template>

<script>
import { searchAllAllowedGuides } from '@/API/DB/db';
import router from '@/routes/appRouter';
import { ref } from 'vue';


export default {
    data(){
        return {
            guidesFound: ref([])
        }
    },
    props: {
        guideName: String,
        userMail: String
    },
    created() {
        searchAllAllowedGuides(this.guideName).then(guides => {
            this.guidesFound = this.userMail ? guides.filter(guide => guide.owner.mail !== this.userMail) : guides
            console.log(guides)
        }) 

    },
    watch: {
        guideName(){

            searchAllAllowedGuides(this.guideName).then(guides => {
                this.guidesFound = []
                this.guidesFound = this.userMail ? guides.filter(guide => guide.owner.mail != this.userMail) : guides

                guides.forEach(guide => {
                    console.log(guide.owner.mail)
                })
            })            
        }

    },
    methods: {
        guideClick(code){
            router.push(`/visualizer/${code}`)
        }
    }
}

</script>

<style scoped>

.guidesContainer{
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(
        300px,
        1fr
    ));
    width: 100%;
    gap: 15px;
    column-gap: 20px;
    overflow-y: auto;
}
.guideFound{
    background: rgba(255, 255, 255, 0.6);
    backdrop-filter: blur(2.5px);
    padding: 10px 15px;
    border-radius: 10px;
    cursor: pointer;
}
.guideFound > h2{
    margin-bottom: 10px;
}
.guideFound > p{
    margin-left: auto;
    text-align: right;
    opacity: .4;
    position: absolute;
    bottom: 10px;
    right: 15px;
}
.guideFound > p::after{
    content: "<";
    position: relative;
    margin-left: 10px;
    color: var(--purple);
}


</style>