<template>
    <div class="homePageButtonList" id="homePageButtonList">
        <div class="buttonListBackground" :style="{
            top: `${backgroundPosY}px`,
            left: `${backgroundPosX}px`,
            width: `${backgroundWidth}px`,
            height: `${backgroundHeight}px`,
            opacity: backgroundOpacity
        }"></div>
        <button 
            @mouseleave="handleMouseLeave" 
            @mouseenter="e => handleMouseHover(e)"
            @click="createGuide">New</button>

        <button 
            @mouseleave="handleMouseLeave" 
            @mouseenter="e => handleMouseHover(e)"
            @click="route.push('/search')">Search</button>

        <button 
            @mouseleave="handleMouseLeave" 
            @mouseenter="e => handleMouseHover(e)">Following</button>

    </div>
</template>

<script>
import { createGuide } from '@/API/DB/db';
import { getData } from '@/API/localStorage';
import router from '@/routes/appRouter';
import { ref } from 'vue';
import route from '@/routes/appRouter';


export default{
    data(){
        return {
            backgroundPosY: ref(0),
            backgroundPosX: ref(0),
            backgroundWidth: ref(100),
            backgroundHeight: ref(100),
            backgroundOpacity: ref(0),
            route
        }
    },
    methods: {
        handleMouseHover(e){
            const posY = e.target.getBoundingClientRect().top
            const posX = e.target.getBoundingClientRect().left
            const containerPosY = document.getElementById("homePageButtonList").getBoundingClientRect().top
            const containerPosX = document.getElementById("homePageButtonList").getBoundingClientRect().left

            const backgroundPosY = posY - containerPosY
            const backgroundPosX = posX - containerPosX

            this.backgroundPosY = backgroundPosY
            this.backgroundPosX = backgroundPosX
            this.backgroundWidth = e.target.clientWidth
            this.backgroundHeight = e.target.clientHeight
            this.backgroundOpacity = 1

        },
        handleMouseLeave(){
            this.backgroundOpacity = 0

        },

        async createGuide(){
            createGuide(getData("userMail")).then((guideCode) => {
                router.push(`/editor/${guideCode}`)
            })
        }
    }
}

</script>

<style scoped>


.homePageButtonList{
    width: 100%;
    position: relative;
    padding: 20px 0;
    border-radius: 20px;
    background: rgba(255, 255, 255, .6);
    backdrop-filter: blur(3px);
}
button{
    text-align: center;
    margin: 20px auto;
    display: flex;
    justify-content: center;
    width: 80%;
    border-radius: 100px;
    background: transparent;
    cursor: pointer;
}
button:hover{
    box-shadow: none;
}
.buttonListBackground{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    border-radius: 20px;
    background: white;
    box-shadow: 0px 0px 10px var(--greypurple);
    border-radius: 15px;
}

</style>