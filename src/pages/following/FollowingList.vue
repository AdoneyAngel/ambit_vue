<template>
    <ul class="followingList">
        <li v-for="user in usersData" :key="user">
            <h3>{{ user.name }}</h3>
            <p><span>></span> {{ user.mail }}</p>
        </li>
    </ul>
</template>

<script>
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
    background: white;
    margin: 20px 0;
    padding: 10px 15px;
    border-radius: 10px;
}

</style>