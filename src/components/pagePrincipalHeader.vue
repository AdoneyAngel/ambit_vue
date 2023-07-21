<template>
    <header class="principalHeader">
        <div class="container">
            <button class="homeButton" @click="homeClick"><img :src="homeIcon" alt=""></button>
        </div>
    </header>
</template>

<script>
import homeIcon from "@/assets/images/homeUnBordered.png"
import router from "@/routes/appRouter";

export default {
    data(){
        return {
            homeIcon
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
    width: 100%;
    height: 50px;
    padding: 10px 20px;
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
.homeButton{
    cursor: pointer;
}

</style>