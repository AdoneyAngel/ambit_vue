<template>
    <main class="followingPage">
        
        <header class="followingContainer">
            <h1>Following</h1>
            <input type="text" placeholder="Follow new uses">
        </header>

        <FollowingList :users="following"/>
        
    </main>
</template>

<script>
import { getUserData } from '@/API/DB/db';
import { getData } from '@/API/localStorage';
import { ref } from 'vue';
import FollowingList from './FollowingList.vue';


export default {
    data() {
        return {
            userMail: ref(""),
            following: ref([])
        };
    },
    async created() {
        const userMail = getData("userMail");
        this.userMail = userMail;
        getUserData(userMail).then(data => {
            const followedMails = data.following;
            let followingUsers = [];
            followedMails.forEach(async (mail) => {
                let name = await getUserData(mail);
                name = name.name;
                const user = {
                    mail,
                    name
                };
                followingUsers.push(user);
            });
            this.following = followingUsers;
        });
    },
    components: { FollowingList }
}

</script>

<style scoped>

.followingPage {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80%;
    height: 100dvh;
    border: 2px solid black;
    position: absolute;
}

</style>