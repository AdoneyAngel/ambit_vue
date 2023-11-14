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

                <div class="userMail" v-if="!loadingData">
                    <button @click="follow" class="followButton" v-if="!isFollowing">Follow</button>
                    <button class="followButton" v-if="isFollowing">UnFollow</button>
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

import { getUserData, setFollowingUser } from "@/API/DB/db";

import abstractProfileIco from "@/assets/images/abstract.png"
import editIcon from "@/assets/images/edit.png"

export default {
    data() {
        return {
            abstractProfileIco,
            editIcon,
            userProfile: ref({}),
            nGuides: ref(0),
            nJoined: ref(0),
            isFollowing: ref(false),
            loadingData: ref(true)
        }

    },
    props: {
        profileMail: String,
        userMail: String

    },
    async created() {

        getUserData(this.profileMail).then(async profile => {

            if (profile){
                this.userProfile = profile
                this.nGuides = profile.guides.length
                this.nJoined = profile.guidesJoined.length

                const userData = await getUserData(this.userMail)

                if (userData.following.includes(profile.mail)) {
                    this.isFollowing = true
                }

                this.loadingData = false

            }else {
                router.push("/")
            }

        })
    },
    methods: {
        goEditorPage() {
            router.push(`/profile/editor/${this.userMail}`)
        },
        async follow() {   
            setFollowingUser(this.userMail, this.userProfile.mail).then(res => {
                if(res) {
                    this.isFollowing = true
                }
            })
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
    background: rgb(255, 255, 255);
    padding: 5px;
    cursor: pointer;
    opacity: .5;
}
.editProfileButton:hover {
    transition: .1s;
    filter: brightness(.9);
}
.editProfileButton:hover > img {
    animation: .7s editProfileButtonImgClick cubic-bezier(1, 0.17, 0, 0.73);
}
.editProfileButton:active {
    filter: brightness(.8);
}
.editProfileButton > img{
    width: 15px;
    transform-origin: bottom left;
}
.followButton {
    margin: 0px;
    position: absolute;
    bottom: 70px;
}
@keyframes editProfileButtonImgClick {
    0%{
        transform: rotate(5deg);
    }
    50% {
        transform: rotate(-5deg);
    }
    100% {
        transform: rotate(0deg);
    }
}

</style>