<template>
    <header class="principalHeader">
        <div class="container">
            <button class="homeButton" @click="homeClick"><img :src="homeIcon" alt=""></button>
            <button class="profileButton"><img :src="profileIcon" alt=""></button>
        </div>
    </header>
</template>

<script>
import router from "@/routes/appRouter";

import homeIcon from "@/assets/images/homeUnBordered.png"
import profileIcon from "@/assets/images/user.png"

export default {
    data(){
        return {
            homeIcon,
            profileIcon
        }
    },
    methods: {
        homeClick(){
            router.push("/owner")
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