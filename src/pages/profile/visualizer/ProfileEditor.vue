<template>
    <form @submit.prevent="handleSubmit">
        <h1>Change user data</h1>
        <section class="inputSection">

            <h1>Name</h1>
            <div>
                <p>></p>
                <input v-model="newUserName" type="text">                
            </div>

        </section>

        <section class="buttons">
            <button class="cancelButton">Cancel</button>
            <button @click="handleChange" v-if="changeStatus == 0">Change</button>
            <button @click="handleConfirm" v-if="changeStatus == 1">Confirm</button>
            <button v-if="changeStatus == 2">DONE!</button>
        </section>
    </form>
</template>

<script>
import { getData } from '@/API/localStorage';

import { updateUserProfile } from "@/API/DB/db"

import { ref } from 'vue';


export default {
    data() {
        return {
            userMail: ref(""),
            newUserName: ref(""),
            changeStatus: ref(0)
        }
    },
    props: {
        profileMail: String
    },
    created() {
        const userMail = getData("userMail")

        this.userMail = userMail
    },
    methods: {
        handleChange() {
            this.changeStatus = 1

        },
        async handleConfirm() {
            this.changeStatus = 2

            if (this.newUserName.length > 0) {
                const newProfile = {
                    name: this.newUserName
                }

                await updateUserProfile(this.userMail, newProfile)

                setTimeout(() => {
                    this.changeStatus = 0
                }, 1000)

            }
        }
    }
}

</script>

<style scoped>

form {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 80%;
    position: relative;
}

form > h1{
    font-weight: bold;
    text-align: center;
    margin-bottom: 50px;
}
.inputSection {
    margin: 20px 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}
.inputSection > h1{
    position: relative;
    margin: 0;
    margin-bottom: 20px;
    font-size: 25px;
    padding-left: 20px;
    position: relative;
}
.inputSection > h1::before{
    content: "";
    width: 10px;
    height: 10px;
    background: linear-gradient(135deg, transparent 50%, black 50%);
    display: block;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%) rotate(-45deg);
    opacity: .5;
}
.inputSection > div > input {
    background: transparent;
    padding: 5px 0px;
    border: none;
    border-bottom: 2px solid var(--purple);
    border-radius: 0;
    font-size: 20px;
}
.inputSection > div{
    display: flex;
    align-items: center;
}
.inputSection > div > p {
    margin-right: 10px;
    margin-left: 15px;
    font-size: 20px;
    color: var(--purple);
}
.buttons {
    display: flex;
    position: absolute;
    bottom: 0;
    right: 0;
}
.buttons > button {
    margin: 0;
    margin-left: 15px;
}
.cancelButton {
    color: var(--notifyError);
}

</style>