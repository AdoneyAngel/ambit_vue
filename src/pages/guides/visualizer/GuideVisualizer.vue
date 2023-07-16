<template>
    <main>
        <section class="guideContainer">
            <h1>{{ guide.name }}</h1>

            <div class="guideSteps">

                <div class="guideStepItem" v-for="(step, stepIndex) in guide.steps" :key="stepIndex">
                    <h2>{{ step.title }}</h2>

                    <div class="stepContent" v-for="(item, itemIndex) in step.content" :key="itemIndex">
                        <pre>{{ item.value }}</pre>
                    </div>
                </div>

            </div>
            <p class="guideOwner">{{ guideData.nickname }}</p>
        </section>
    </main>
</template>

<script>
import { ref } from "vue"
import { getGuide, getGuideData } from "@/API/DB/db.js"

export default {
    data(){
        return {
            guide: ref({}),
            guideData: ref({}),
            guideStepPrevScroll: ref(0)
        }
    },
    props: {
        guideCode: String
    },
    async created(){
        const guide = await getGuide(this.guideCode)
        const guideData = await getGuideData(this.guideCode)

        this.guide = guide
        this.guideData = guideData
    }
}

</script>

<style scoped>

main{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
}
.guideContainer{
    width: calc(80% - 100px);
    height: calc(90% - 100px);
    background: rgba(255, 255, 255, .6);
    backdrop-filter: blur(3px);
    border-radius: 30px;
    padding: 50px;
    position: relative;
    overflow: hidden;
}
.guideContainer > h1{
    font-size: 40px;
    font-weight: 500;
    margin-bottom: 40px;
}
.guideSteps{
    padding: 0 25px;
    padding-bottom: 100px;
    overflow: hidden;
    overflow-y: auto;
    height: 70%;
}
.guideSteps::-webkit-scrollbar{
    background: transparent;
}
.guideSteps::-webkit-scrollbar-thumb{
    background: rgba(202, 202, 202, 0.507);
    border-radius: 100px;
    padding: 0;
}
.guideStepItem{
    margin: 50px 0;
}
.guideStepItem > h2{
    font-weight: bolder;
    margin-bottom: 20px;
    font-size: 28px;
    border-bottom: 3px solid rgb(221, 221, 221);
}
.stepContent{
    padding: 0 20px;
    margin-bottom: 30px;
}
.stepContent > pre{
    resize: none;
    width: 100%;
    background: transparent;
    border: none;
    overflow: hidden;
}
.guideOwner{
    position: absolute;
    bottom: 40px;
    right: 40px;
    opacity: .5;
}
.guideOwner::after{
    content: "<";
    margin-left: 10px;
}
</style>