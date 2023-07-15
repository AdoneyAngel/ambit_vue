<template>
    <div v-if="uploading" class="uploadingContainer">
        <img :src="uploadIcon" alt="">
    </div>
    <main>
        <input @change="e => handleUpdateInputs(e)" name="guideName" class="editorTitle" type="text" :placeholder="initialGuide.name">
        <section class="stepsContainer">
            <div class="guideStep" v-for="(step, stepIndex) in currentGuide.steps" :key="stepIndex">
                
                <input class="titleStep" @change="e => handleUpdateInputs(e)" :id="`itemPos=${stepIndex}`" name="stepTitle" type="text" :placeholder="step.initialTitle">

                <div 
                    class="stepContent" 
                    v-for="(item, contentIndex) in step.content" 
                    :key="contentIndex"
                    :style="{
                        animationDelay: `${(contentIndex*0.1)}s`
                    }"
                    >
                    <textarea 
                        contenteditable @keyup="e => handleUpdateInputs(e)" 
                        :id="`itemPos=${stepIndex},${contentIndex}`" 
                        name="stepContentText" 
                        type="text" 
                        :placeholder="item.initialValue"
                        ></textarea>

                    <button @click="e => deleteStepContent(e, stepIndex, contentIndex)" class="btnDelete">-</button>
                </div>

                <button class="btnAdd btnAddContent" @click="addStepCotent" :id="`btnPos=${stepIndex}`">+</button>
            </div>
        </section>

        <div class="editorFooter">
            <button class="btnAdd" @click="addNewStep()">New step</button>
        </div>
    </main>
</template>

<script>
import { getGuide, updateGuide } from '@/API/DB/db';
import { getData } from '@/API/localStorage';
import { ref } from 'vue';
import uploadIcon from "@/assets/images/up.png"

export default {
    data(){
        return {
            initialGuide: ref({}),
            currentGuide: ref({}),
            uploading: ref(false),
            uploadIcon
        }
    },
    props: {
        guideCode: String
    },
    async created(){
        const initialGuide = await getGuide(this.guideCode)

        this.initialGuide = initialGuide

        let currentGuide = {
            code: initialGuide.code,
            name: initialGuide.name,
            initialName: initialGuide.name,
            date: initialGuide.date,
            privated: initialGuide.privated,
            allowedUsers: initialGuide.allowedUsers,
            steps: initialGuide.steps.map(step => {
                return {
                    title: step.title,
                    initialTitle: step.title,
                    content: step.content.map(item => {
                        return {
                            type: item.type,
                            value: item.value,
                            initialValue: item.value
                        }
                    })
                }
            })
        }

        this.currentGuide = currentGuide

        await this.autoSaveGuide()
    },
    methods: {
        async addNewStep(){
            this.currentGuide.steps.push({
                title: "",
                content: [
                    {
                        type: "",
                        value: ""
                    }
                ]
            })
        },
        handleUpdateInputs(event){
            const input  = event.target
            const inputPos = input.id.split("=")[1]

            if(input.name === "stepTitle"){
                this.currentGuide.steps[inputPos].title = input.value                
                
                if(!input.value){
                    return false
                }

            }else if(input.name === "stepContentText"){

                input.style.height = `${0}px`
                input.style.height = `${input.scrollHeight - 10}px`

                const contentPos = inputPos.split(",")[1]
                const stepPos = inputPos.split(",")[0]

                if(!input.value){
                    return false
                }

                this.currentGuide.steps[stepPos].content[contentPos].value = input.value
                console.log(input.scrollHeight)

            }else if(input.name === "guideName"){
                if(!input.value){
                    return false
                }

                this.currentGuide.name = input.value
                

            }
        },
        async autoSaveGuide(){
            let guideToSend = {
            code: this.currentGuide.code,
            name: this.currentGuide.name,
            date: this.currentGuide.date,
            privated: this.currentGuide.privated,
            allowedUsers: this.currentGuide.allowedUsers,
            steps: this.currentGuide.steps.map(step => {
                return {
                    title: step.title,
                    content: step.content.map(item => {
                        return {
                            type: item.type,
                            value: item.value
                        }
                    })
                }
                })
            }
                
            const userMail = getData("userMail")

            this.uploading = true

            await updateGuide(userMail, guideToSend.code, guideToSend)

            this.uploading = false

            setTimeout(async () => {await this.autoSaveGuide()}, 10000)
        
        },
        async addStepCotent(event){
            const button = event.target
            const pos = button.id.split("=")[1]
            const stepIndex = pos.split(",")[0]

            this.currentGuide.steps[stepIndex].content.push({
                type: "text",
                value: "Nuevo contenido",
                initialValue: "Nuevo contenido"
            })
        },
        deleteStepContent(event, stepPos, contentPos){
            this.currentGuide.steps[stepPos].content = this.currentGuide.steps[stepPos].content.filter(item => item != this.currentGuide.steps[stepPos].content[contentPos])

            stepPos
            event
        }
    }
}

</script>

<style scoped>

main{
    display: flex;
    flex-direction: column;
    width: 85%;
    height: 85vh;
    top: 50%;
    left: 50%;
    background: rgb(237 237 237 / 90%);
    transform: translate(-50%, -50%);
    position: absolute;
    padding: 40px;
    border-radius: 30px;
    overflow: hidden;
}
input{
    border: none;
    background: transparent;
}
.editorTitle{
    font-size: 40px;
    position: absolute;
    top: 40px;
    left: 40px;
    background: transparent;
    backdrop-filter: blur(10px);
    z-index: 3;
    width: calc(100% - 120px);
    padding: 10px;
    border-radius: 10px;
}
section{
    padding: 20px;
}
.guideStep{
    margin: 20px 0;
    background: rgba(255, 255, 255, 0.6);
    padding: 20px;
    border-radius: 20px;
    padding-bottom: 70px;
    position: relative;
}
.titleStep{
    display: block;
    font-size: 25px;
    margin-bottom: 30px;
    font-weight: bolder;
    border-bottom: 3px solid grey;
    width: 100%;
}
.stepContent{
    margin: 10px 0;
    width: 100%;
    animation: showContent .3s ease-in-out forwards;
    opacity: 0;
    position: relative;
}
.stepContent > .btnDelete{
    position: absolute;
    right: 10px;
    top: 10px;
    margin-top: 0;
    background: transparent;
    padding: 5px 10px;
    box-shadow: none;
}
.stepContent > textarea{
    resize: none;
    width: 100%;
    overflow: hidden;
    border: none;
    border-radius: 10px;
    transition: 0s;
    min-height: 50px;
    height: auto;
    padding: 5px;
    background: white;
}
.editorFooter{
    position: sticky;
    bottom: 0;
    width: 100%;
}
.editorFooter > .btnAdd{
    bottom: -20px;
}
.btnAdd{
    position: absolute;
    bottom: 0;
    right: 0;
    box-shadow: 0px 0px 10px var(--purple);
    border-radius: 100px;
}
.btnAddContent{
    text-align: center;
    display: flex;
    justify-content: center;
    margin: 10px;
    font-size: 30px;
    padding: 0;
    width: 40px;
    height: 40px;
}
.stepsContainer{
    overflow-y: auto;
    padding-top: 60px;
}
.stepsContainer::-webkit-scrollbar{
    background: transparent;
}
.stepsContainer::-webkit-scrollbar-thumb{
    background: var(--greypurple);
    border-radius: 100px;
}
.uploadingContainer{
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 20px;
    right: 20px;
    z-index: 5;
    width: 45px;
    height: 45px;
    border-radius: 100%;
    background: white;
}
.uploadingContainer > img{
    width: 50%;
    animation: showUploadingIcon .5s var(--animationTransition);
    opacity: 1;
    filter: drop-shadow(0px 0px 4px var(--purple));
}

@keyframes showContent{
    0%{
        opacity: 0;
        transform: scale(.8);
    }
    100%{
        opacity: 1;
        transform: scale(1);
    }
}
@keyframes showUploadingIcon {
    0%{
        opacity: 0;
        transform: scale(.9) translateY(20%);
    }
    100%{
        opacity: 1;
        transform: scale(1) translateY(0);
    }
}

</style>