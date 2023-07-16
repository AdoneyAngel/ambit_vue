<template>
    <main class="guideSettings">
        <section @click="handleChangeSettings('privated', !settings.privated)" class="isPrivatedSection">
            <p>Private <span>{{ settings.privated }}</span></p>
        </section>

        <section class="userAllowedSection">
            <header @click="this.openAddAllowedUser = !this.openAddAllowedUser">Allowed users <button>+</button></header>

            <form v-if="openAddAllowedUser" @submit.prevent="handleSubmit">
                <input placeholder="NewUser@gmail.com" id="addAllowdUserInput" type="mail" required>
            </form>
            
            <ul>
                <li v-for="(user, index) in settings.allowedUsers" :key="index">{{ user }}</li>
            </ul>
        </section>

        <section class="guideCodeSection">
            <p>{{guide.code}}</p>
        </section>
    </main>
</template>

<script>
import { ref } from 'vue';

export default {
    props: {
        guide: Object,
        callBack: Function
    },
    data(){
        return {
            settings: ref({}),
            openAddAllowedUser: ref(false)
        }
    },
    created(){
        this.settings = {
            privated: this.guide.privated,
            allowedUsers: this.guide.allowedUsers
        }

        console.log(this.guide.allowedUsers)
    },
    methods: {
        handleChangeSettings(option, value){
            this.settings = {
                ...this.settings,
                [option]: value
            }

            const setting = this.settings

            this.callBack(setting)


        },
        handleSubmit(){
            const input = document.getElementById("addAllowdUserInput")
            const newUser = input.value
            const newAllowdUsersSettings = [
                ...this.settings.allowedUsers,
                newUser
            ]

            this.handleChangeSettings("allowedUsers", newAllowdUsersSettings)
            this.openAddAllowedUser = false

            input.value = ""
            
        }
    }
}

</script>

<style scoped>

button:hover{
    box-shadow: none;
}

.guideSettings{
    background: white;
    padding: 20px 15px;
    border-radius: 15px;
    box-shadow: 0px 0px 15px -5px rgba(128, 128, 128, 0.486);
    min-width: 150px;
    animation: showSettings .3s var(--animationTransition);
}
.guideSettings > section{
    margin: 10px 0;
}
.isPrivatedSection{
    color: var(--purple);
    position: relative;
    user-select: none;
    cursor: pointer;
}
span{
    color: grey;
    right: 0;
    position: absolute;
    top: 0;
}
.userAllowedSection{
    border: 3px solid rgb(212, 212, 212);
    overflow: hidden;
    border-radius: 5px;
}
.userAllowedSection > header{
    border-bottom: 3px solid rgb(241, 241, 241);
    display: flex;
    align-items: center;
    padding: 3px 3px;
    user-select: none;
    cursor: pointer;
    color: var(--purple);

}
.userAllowedSection > header > button{
    background: transparent;
    padding: 0;
    margin: 0;
    margin-left: auto;
    color: grey;
}
form > input{
    border: none;
    background: rgb(212, 212, 212);
    padding: 3px 3px;
    width: 100%;
    animation: showInput .3s var(--animationTransition);
    height: 20px;
    margin-bottom: 5px;
}
ul{
    list-style: none;
    padding: 5px 5px;
}
li{
    overflow-x: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: grey;
}
.guideCodeSection{
    color: grey;
    font-size: 13px;
    padding-top: 10px;
}

@keyframes showSettings{
    0%{
        opacity: 0;
        transform: translateY(20%);
    }
    100%{
        opacity: 1;
        transform: translateY(0%);
    }
}
@keyframes showInput{
    0%{
        height: 5px;
        transform: translateY(-100%);
        opacity: 0;
    }
    100%{
        height: 20px;
        transform: translateY(0%);
        opacity: 1;
    }
}

</style>