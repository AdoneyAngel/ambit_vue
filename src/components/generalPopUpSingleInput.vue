<template>
    <div class="body">
        <div @click="close" class="clickCloseArea"></div>
        <section class="contentContainer">
            <h1>{{ title }}</h1>

            <section class="inputContainer" v-on:keyup="(e  ) => handleKeyUp(e)">
                <input :placeholder="placeholder" type="text" v-model="inputData" required>
                <button @click="handleSubmit">{{ buttonText }}</button>
            </section>            
        </section>
    </div>
</template>

<script>
import { ref } from 'vue';


export default {
    props: {
        callBack: Function,
        title: String,
        buttonText: String,
        placeholder: String,
        close: Function
    },
    data() {
        return {
            inputData: ref("")
        }
    },
    methods: {
        async handleSubmit() {
            await this.callBack(this.inputData)

            this.close()
        },
        handleKeyUp(event) {
            if (event.keyCode == "13") {
                this.handleSubmit()
            }
        }
    },
}

</script>

<style scoped>

.body {
    position: absolute;
    width: 100%;
    height: 100dvh;
    background-color: rgba(0, 0, 0, 0.63);
    display: flex;
    justify-content: center;
    padding-top: 250px;
    animation: .4s openBackground;
}
.contentContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 450px;
    max-width: 550px;
    width: 40%;
    height: min-content;
    position: relative;
    transform-origin: center;
    animation: .5s openPopUpContent;
}
h1 {
    text-align: center;
    margin-bottom: 50px;
    color: white;
    font-weight: bold;
    font-size: 25px;
}
.inputContainer {
    width: 100%;
}
input {
    width: calc(100% - 44px);
    padding: 15px 20px;
    background: rgba(0, 0, 0, 0.26);
    border: 2px solid var(--purple);
    border-radius: 10px;
    box-shadow: 0px 0px 10px var(--purple);
    color: white;
    font-size: 20px;
}
button {
    margin: 0;
    margin-left: auto;
    margin-top: 25px;
    font-size: 15px;
}
.clickCloseArea {
    background: transparent;
    width: 100%;
    height: 100dvh;
    position: absolute;
    top: 0;
}
@keyframes openPopUpContent {
    0% {
        opacity: 0;
        transform: scale(0.95);
    }
    100% {
        opacity: 1;
        transform: scale(1);
    }
}
@keyframes openBackground {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}

</style>