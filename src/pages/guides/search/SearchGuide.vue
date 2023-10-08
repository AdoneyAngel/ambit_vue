<template>
    <main>
        <h1>Search Guide</h1>
        <form @submit.prevent="handleSubmit">
            <div class="inputContainer">
                <input @change="e => handleWrite(e)" type="text" placeholder="Guide Name">
            </div>
        </form>
        <div class="guidesContainer">
            <RouterView :userMail="userMail" />
        </div>
    </main>
</template>

<script>
import { ref } from "vue";
import { RouterView } from "vue-router";
import router from "@/routes/appRouter"
import { getData } from "@/API/localStorage";

export default {
    data(){
        return {
            currentText: ref(""),
            userMail: getData("userMail")
        }
    },
    components: {
    RouterView
},
    methods: {
        handleWrite(event){
            this.currentText = event.target.value
        },
        handleSubmit(){
            router.push(`/search/${this.currentText}`)
        }
    }
}

</script>

<style scoped>

main{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
}
h1{
    font-weight: bold;
    margin-bottom: 50px;
    background: linear-gradient(90deg, var(--purple), #807bf7);
    background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: 0px -2px 0px white;
    font-size: 40px;
}
input{
    border: none;
    font-size: 25px;
    background: linear-gradient(90deg, var(--purple), #807bf7);
    background-clip: text;
    -webkit-text-fill-color: transparent;
    width: 100%;
    height: 100%;
}
input::placeholder{
    background: rgba(0, 0, 0, 0.274);
    background-clip: text;
    -webkit-text-fill-color: transparent;
}
.inputContainer{
    width: 400px;
    height: 30px;
    display: flex;
    align-items: center;
    box-shadow: 0px 0px 15px -5px var(--purple);
    padding: 10px 20px;
    border-radius: 10px;
    background: rgba(255, 255, 255, .6);
    backdrop-filter: blur(2.5px);
    margin-bottom: 20px;
}
.guidesContainer{
    max-width: 800px;
    min-width: 420px;
    width: 90%;
    overflow-y: hidden;
    overflow-x: hidden;
    background: var(--visualizerContainerBackground);
    border-radius: 15px;
}
.guidesContainer::-webkit-scrollbar{
    display: none;
}

</style>