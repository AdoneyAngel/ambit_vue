<template>
    <main class="followingPage">
        
        
        
    </main>
</template>

<script>
import { getData } from '@/API/localStorage';
import { ref } from 'vue';


export default {
    data() {
        return {
            userMail: ref("")

        }
    },
    created() {
        const userMail = getData("userMail")

        this.userMail = userMail
    }
}

</script>

<style scoped>



</style>