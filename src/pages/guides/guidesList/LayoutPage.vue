<template>
    <main>
    

        <div class="buttonActionList">
            <HomePageButtonList />
        </div>

        <div class="guideListSection">

            <section class="guideListContainer">

                <!--GUIDES VISUALIZATION-->
                <router-view />

                <div class="guideNav" id="guideNav">

                    <div class="guideNavbuttonBackground" :style="{
                        left: `${guideNavbuttonBackgroundPosX}px`,
                        width: `${guideNavbuttonBackgroundWidth}px`
                    }"></div>

                    <RouterLink
                        to="owner"
                        @click="(e) => handleGuideListButton(e)" 
                        :class="{'selectedNavButton' : guideNavSelected === 'myGuideNavButton'}" 
                        id="myGuideNavButton"
                        >My guides</RouterLink>

                    <RouterLink
                        to="joined"
                        @click="(e) => handleGuideListButton(e)" 
                        :class="{'selectedNavButton' : guideNavSelected === 'jonedNavButton'}" 
                        id="jonedNavButton">Joined</RouterLink>
                </div>

            </section>

        </div>

        <div>

        </div>


    </main>
</template>

<script>
import { ref } from "vue";
import HomePageButtonList from "@/components/HomePageButtonList.vue"
import "@/styles/guideList.css"

export default {
    components: {
        HomePageButtonList
    },
    data(){
        return{
            guideNavbuttonBackgroundPosX: ref(10),
            guideNavbuttonBackgroundWidth: ref(150),
            guideNavSelected: ref("myGuideNavButton")
        }
    },
    methods: {
        handleGuideListButton(event){
            const guideNavPos = document.getElementById("guideNav").getBoundingClientRect().left
            this.guideNavbuttonBackgroundPosX = event.target.getBoundingClientRect().left - guideNavPos

            this.guideNavbuttonBackgroundWidth = event.target.clientWidth

            this.guideNavSelected = event.target.id
        }
    }
}

</script>

<style scoped>

main{
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    height: 85vh;
    width: 100%;
    display: grid;
    grid-template-columns: 200px 1fr 200px;
    grid-template-rows: 1fr;
    grid-gap: 10%;
    place-content: center;
}
.guideListSection{
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(255, 255, 255, 0.6);
    padding: 50px;
    border-radius: 20px;
    backdrop-filter: blur(3px);
    overflow: hidden;
}
.guideListContainer{
    display: block;
    width: 100%;
    height: 100%;
    position: relative;
}
.guideNav{
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 20px;
    background: white;
    box-shadow: 0px 0px 20px -10px rgb(196, 196, 196);
    border-radius: 100px;
    padding: 10px;
    height: 35px;
}
.guideNav > a{
    margin-top: 0;
    min-width: 150px;
    border: none;
    border-radius: 100px;
    background: transparent;
    color: var(--purple);
    text-align: center;
    display: flex;
    justify-content: center;
    font-weight: normal;
    font-size: 17px;
    padding: 7px 0;
    z-index: 3;
    text-decoration: none;
}
.guideNav > a:hover{
    box-shadow: none;

}
.guideNavbuttonBackground{
    display: block;
    background: var(--purple);
    height: 20px;
    width: 150px;
    position: fixed;
    top: 50%;
    transform: translateY(-50%);
    z-index: 2;
    padding: 7px 0;
    border-radius: 100px;
    transition-timing-function: cubic-bezier(0.32, 0.21, 0.13, 1.32);
}
.guideNav > .selectedNavButton{
    color: white;
}
.buttonActionList{
    height: 100%;
    width: 100%;
    /*border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
    border: 3px solid rgba(255, 255, 255, 0.281);
    backdrop-filter: blur(3px);*/
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 20px;
}


</style>