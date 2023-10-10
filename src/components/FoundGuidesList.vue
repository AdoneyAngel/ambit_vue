<template>
    <div class="guidesContainer" :style="`grid-template-columns: ${guidesFound.length && usersFound ? '1fr 40%' : '1fr'}`">

        <div v-if="guidesFound.length" class="guidesFound">
            <h1>GUIDES</h1>

            <div @click="() => guideClick(guide.guide.code)" class="guideFound" v-for="(guide, index) in guidesFound" :key="index">
                <h2>{{ guide.guide.name }}</h2>
                <p>{{ guide.owner.nickname }}</p>
            </div>            
        </div>

        <div v-if="usersFound" class="usersFounds">
            <h1>USERS</h1>

            <div @click="userClick(user.mail)" class="userFound" v-for="(user, index) in concatenatedUsersFound" :key="index">
                <!-- <img :src="userIcon"> -->
                <section>
                    <h2>{{ user.name }}</h2>
                    <p>{{ user.mail }}</p>
                </section>
            </div>
        </div>
    </div>
</template>

<script>
import { searchAllAllowedGuides, searchSimilarUser } from '@/API/DB/db';
import router from '@/routes/appRouter';
import { ref } from 'vue';

import userIcon from "@/assets/images/user.png"


export default {
    data(){
        return {
            guidesFound: ref([]),
            usersFound: ref({}),
            concatenatedUsersFound: ref([]),
            userIcon
        }
    },
    props: {
        guideName: String,
        userMail: String
    },
    created() {
        searchAllAllowedGuides(this.guideName).then(guides => {
            this.guidesFound = this.userMail ? guides.filter(guide => guide.owner.mail !== this.userMail) : guides
        })            

        searchSimilarUser(this.guideName).then(users => {
            this.usersFound = {}
            this.usersFound = users.name.length || users.mail.length ? users : false

            this.concatenatedUsersFound = users.name.concat(users.mail);
        })

    },
    watch: {
        guideName(){

            searchAllAllowedGuides(this.guideName).then(guides => {
                this.guidesFound = []
                this.guidesFound = this.userMail ? guides.filter(guide => guide.owner.mail != this.userMail) : guides        


            })             

            searchSimilarUser(this.guideName).then(users => {
                this.usersFound = {}
                this.usersFound = users.name.length || users.mail.length ? users : false

                this.concatenatedUsersFound = users.name.concat(users.mail);
            })
        }

    },
    methods: {
        guideClick(code){
            router.push(`/visualizer/${code}`)

        },
        userClick(userMail) {
            router.push(`/profile/visualizer/${userMail}`)

        }
    }
}

</script>

<style scoped>

.guidesContainer{
    display: grid;
    gap: 20px;
    column-gap: 20px;
    overflow-y: auto;
    padding: 30px 40px;
    max-height: 680px;
}
.guideFound{
    padding: 10px 15px;
    cursor: pointer;
    margin-bottom: 20px;
    border: 2px solid rgb(182, 182, 182);
    border-radius: 5px;
    position: relative;
}
.guideFound > h2{
    margin-bottom: 25px;
    text-decoration: underline;
    font-size: 22px;
}
.guideFound > p{
    margin-left: auto;
    text-align: right;
    opacity: .4;
    position: absolute;
    bottom: 5px;
    right: 15px;
}
.guideFound > p::after{
    content: "<";
    position: relative;
    margin-left: 10px;
    color: var(--purple);
}
h1{
    color: grey;
    font-size: 20px;
    margin-bottom: 10px;
    position: sticky;
    top: 0;
    background: transparent;
    backdrop-filter: blur(2px);
    padding: 10px 14px;
}
.userFound {
    border: 2px solid rgb(182, 182, 182);
    border-radius: 5px;
    padding: 10px 15px;
    padding-right: 0;
    padding: 10px 15px;
    cursor: pointer;
    margin-bottom: 20px;
    margin-left: auto;
}
.userFound > h2 {
    margin-bottom: 25px;
}

.userFound > section > p{
    text-align: right;
}


</style>