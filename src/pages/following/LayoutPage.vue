<template>
    <main class="followingPage">
        
        <header class="followingContainer">
            <h1>Following</h1>
            <input type="text" placeholder="Follow new users">
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
        }
    },
    created() {

        const userMail = getData("userMail")

        this.userMail = userMail

        this.getFollowing()

    },
    components: { FollowingList },
    methods: {
        async getFollowing() {
            const userData = await getUserData(this.userMail)

            const followedMails = userData.following;
            
            let followingUsers = await followedMails.map(async mail => {
                const userData = await getUserData(mail)

                const user = {
                    name: userData.name,
                    mail: userData.mail
                }

                this.following.push(user)

                return user
            })
            
            console.log(followingUsers)

        }
    }
}

</script>

<style scoped>

.followingPage {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 75%;
    height: 80dvh;
    min-height: 500px;
    max-height: 800px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: var(--visualizerContainerBackground);
    border-radius: var(--principalBorderRadius);
    overflow: hidden;
}
header {
    display: flex;
    position: absolute;
    top: 0;
    left: 0;
    background: white;
    width: calc(100% - 60px);
    padding: 20px 30px;
}
header > h1 {
    font-weight: bold;
}
header > input {
    width: 200px;
    margin-left: auto;
    border: none;
    border-radius: 10px;
    box-shadow: inset 0px 0px 6px -2px rgb(139, 139, 139);
    padding: 0 10px;
}

</style>