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
        console.log(this.users)
    }
}

</script>