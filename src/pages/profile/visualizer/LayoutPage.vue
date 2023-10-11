<template>
    <main class="profilePage">
        <section class="profilePageContainer">

            <router-view :userMail="userMail"></router-view>

        </section>
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

        console.log(userMail)
    }
}

</script>

<style scoped>

.profilePage {
    overflow: hidden;
    width: 100%;
    height: 100svh;
    display: flex;
    justify-content: center;
    align-items: center;
}
.profilePageContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    background: var(--visualizerContainerBackground);
    width: 75%;
    max-width: 960px;
    height: 75%;
    max-height: 770px;
    border-radius: var(--principalBorderRadius);
    padding: 50px;
}

</style>