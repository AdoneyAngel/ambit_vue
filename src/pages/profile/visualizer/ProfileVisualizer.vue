<template>
    <div class="profileVisualizer">
        <section class="userProfileData">

            <div class="userPhoto">
                <div class="photoContainer">

                    <img class="photo" :src="abstractProfileIco" alt="">

                    <button @click="goEditorPage" v-if="userMail == profileMail" class="editProfileButton">
                        <img :src="editIcon" alt="">
                    </button>
                    
                </div>

                <h1>{{userProfile.name}}</h1>
            </div>

            <div class="userStats">

                <div class="userMail">
                    <p><span>></span>{{ userProfile.mail }}</p>
                </div>

                <ul class="list">

                    <li>
                        <p>Guides created</p>
                        <p class="numerOfStat">{{ nGuides }}</p>
                    </li>

                    <li>
                        <p>Guides joined</p>
                        <p class="numerOfStat">{{ nJoined }}</p>
                    </li>

                </ul>
            </div>

        </section>

        <section class="storage">

        </section>
    </div>
</template>

<script>

import router from "@/routes/appRouter";
import { ref } from "vue";

import { getUserData } from "@/API/DB/db";

import abstractProfileIco from "@/assets/images/abstract.png"
import editIcon from "@/assets/images/edit.png"

export default {
    data() {
        return {
            abstractProfileIco,
            editIcon,
            userProfile: ref({}),
            nGuides: ref(0),
            nJoined: ref(0)
        }

    },
    props: {
        profileMail: String,
        userMail: String

    },
    created() {

        getUserData(this.profileMail).then(profile => {

            if (profile){
                this.userProfile = profile
                this.nGuides = profile.guides.length
                this.nJoined = profile.guidesJoined.length

            }else {
                router.push("/")
            }

        })
    },
    methods: {
        goEditorPage() {
            router.push(`/profile/editor/${this.userMail}`)
        }
    }
}

</script>

<style scoped>

.profileVisualizer{
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-rows: 40% 1fr;
    gap: 30px;

}
.userProfileData{
    display: flex;
    align-items: center;
    flex-direction: row;
}

.userPhoto{
    display: flex;
    margin-right: auto;
    height: 280px;
    position: relative;
}
.photoContainer{
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 280px;
    height: 100%;
    border: 5px solid black;
    overflow: hidden;
    border-radius: 20px;
}
.userPhoto > h1{
    position: absolute;
    bottom: 0;
    left: 0;
    padding-right: 0px;
    padding: 10px 20px;
    color: white;
    font-weight: bold;
    font-size: 16px;
    text-align: left;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    max-width: 230px;
    background: transparent;
    border-radius: 10px;
}
.userPhoto > h1:hover{
    max-width: 200%;
    left: -30px;
    bottom: -30px;
    background: #000000ad;
    backdrop-filter: blur(5px);
    padding: 20px 20px;

}
.photo{
    width: 110%;
    height: 110%;
    object-fit: cover;
}
.photo{
    position: absolute;
}
.photoContainer:hover > .photo{
    width: 100%;
    height: 100%;

}
.userStats{
    display: grid;
    grid-template-columns: 1fr 60%;
    width: 100%;
    height: 100%;
    margin-left: 30px;
}
.userStats > .list{
    grid-column: 2;
    list-style: none;
}
.userStats > .list > li {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 13px 15px;
    border-radius: 10px;
    border: 2px solid grey;
    /* background: rgb(196, 196, 196); */
    margin: 25px 0;
}
.userStats > .list > li > .numerOfStat{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: auto;
    padding: 5px 10px;
    background: white;
    border-radius: 5px;
    font-weight: bold;
    box-shadow: inset 0px 0px 3px grey;
}
.userMail {
    display: block;
    position: relative;
}
.userMail > p{
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 0;
    padding: 10px 20px;
    border-radius: 10px;
    border: 2px solid grey;
}
.userMail > p > span{
    color: var(--purple);
    margin-right: 5px;
    transform: translateX(-50%);
}
.editProfileButton {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    position: absolute;
    top: 40px;
    right: 20px;
    z-index: 2;
    background: linear-gradient(45deg, white, #00000000);
    padding: 5px;
    /* border-bottom: 1px solid black;
    box-shadow: 0px 2px 0px white; */
    border-bottom: 3px solid rgb(255, 255, 255);
    border-left: 3px solid rgb(255, 255, 255);
    cursor: pointer;
    opacity: .5;
}
.editProfileButton:hover {
    transition: .1s linear;
    border-bottom: 0px solid rgb(255, 255, 255);
    border-left: 0px solid rgb(255, 255, 255);
    background: linear-gradient(45deg, white, #0000004b);
    width: 28px;
    height: 28px;
    top: 42px;
    right: 22px;
}
.editProfileButton:active {
    filter: brightness(.5);
}
.editProfileButton > img{
    width: 15px;
}

</style>