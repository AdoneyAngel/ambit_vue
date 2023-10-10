<template>
    <header class="principalHeader">
        <div class="container">
            <button class="homeButton" @click="homeClick"><img :src="homeIcon"></button>
            <button class="profileButton" @click="profileClick"><img :src="profileIcon"></button>
        </div>
    </header>
</template>

<script>
import router from "@/routes/appRouter";

import homeIcon from "@/assets/images/homeUnBordered.png"
import profileIcon from "@/assets/images/user.png"
import { ref } from "vue";
import { getData } from "@/API/localStorage";

export default {
    data(){
        return {
            homeIcon,
            profileIcon,
            profile: ref({})
        }
    },
    methods: {
        homeClick(){
            router.push("/owner")
        },
        profileClick() {
            router.push(`/profile/visualizer/${this.profile.mail}`)
        }
    },
    created() {
        this.profile = {
            mail: getData("userMail")
        }
    }
}

</script>

<style scoped>

.principalHeader{
    position: absolute;
    top: 0;
    height: 50px;
    padding: 10px 20px;
    display: block;
    width: calc(100% - 40px);
}
.container{
    display: flex;
    flex-direction: row;
    align-items: center;
}
.container > button{
    width: 30px;
}
.container > button:hover{
    box-shadow: none;
}
button{
    border: none;
    padding: 0;
    margin: 0;
    background: transparent;
}
img{
    width: 100%;
}
button{
    cursor: pointer;
}
.profileButton{
    margin-left: auto;
}

</style>