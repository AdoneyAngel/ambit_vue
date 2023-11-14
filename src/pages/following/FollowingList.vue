<template>
    <ul class="followingList">
        <li @click="openProfile(user.mail)" v-for="user in usersData" :key="user">
            <h3>{{ user.name }} </h3>
            <p> {{ user.mail }}<span>{{ "<" }}</span></p>
        </li>
    </ul>
</template>

<script>
import router from '@/routes/appRouter';
import { ref } from 'vue';

export default {
    data() {
        return {
            usersData: ref([])
        }
    },
    props: {
        users: Array
    },
    created() {
        this.usersData = this.users
    },
    methods: {
        openProfile(userMail) {
            router.push(`/profile/visualizer/${userMail}`)
        }
    }
}

</script>

<style scoped>

ul {
    width: 80%;
    height: 60%;
    min-width: 400px;
    list-style: none;
    padding: 0;
}
li {
    display: flex;
    flex-direction: row;
    align-items: center;
    background: white;
    margin: 20px 0;
    padding: 20px 15px;
    border-radius: 5px;
    font-size: 18px;
    cursor: pointer;
}
li > h3 {
    font-size: 23px;
}
li > p {
    margin-left: auto;
    opacity: .6;
    text-align: right;
}
li > p > span {
    margin-left: 10px;
    color: var(--purple);
}

</style>