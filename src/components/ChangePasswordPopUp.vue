<template>

    <div class="changePass">
        
        <h1>Change password</h1>

        <section>
            <h2>Old password</h2>
            <input v-model="oldPassword" type="password">
        </section>

        <section>
            <h2>New password</h2>
            <input v-model="newPassword" type="password">
        </section>

        <div>
            <button @click="handleChange" v-if="changeStatus == 0">
                Change
            </button>
            <button @click="handleConfirm" v-if="changeStatus == 1">
                Confirm
            </button>
            <button v-if="changeStatus == 2">
                {{ changeResult }}
            </button>
        </div>

    </div>

</template>

<script>
import { checkPassword, updateUserProfile } from '@/API/DB/db';
import { getData } from '@/API/localStorage';
import { ref } from 'vue';


export default {
    data() {
        return {
            changeStatus: ref(0),
            userMail: ref(""),
            newPassword: ref(""),
            oldPassword: ref(""),
            changeResult: ref("")
        }
    },
    methods: {
        handleChange() {
            this.changeStatus = 1
        },
        async handleConfirm() {
            const correctPassword = await checkPassword(this.userMail, this.oldPassword)
                
            this.changeStatus = 2

            if (correctPassword && this.newPassword.length) {
                const newProfile = {
                    password: this.newPassword
                }


                this.changeResult = "Changing..."

                await updateUserProfile(this.userMail, newProfile)

                this.changeResult = "Done!"

                this.$emit("closeFunc")

            } else {
                this.changeResult = "Denied"

                setTimeout(() => {
                    this.changeStatus = 0
                }, 1000)
            }

        }
    },
    created() {
        this.userMail = getData("userMail")
    }
}

</script>

<style scoped>

.changePass {
    width: 400px;
    height: 100%;
    display: flex;
    flex-direction: column;
}
h1 {
    font-size: 30px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 100px;
    color: white;
}
section {
    margin: 20px 0;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: left;
    width: 100%;
}
section > h2 {
    width: 100%;
    padding: 10px 0px;
    color: white;
    text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.534);
}
section > input {
    padding: 10px 10px;
    background: rgba(255, 255, 255, 0.144);
    border: none;
    z-index: 2;
    font-size: 20px;
    border: 2px solid var(--greypurple);
    border-radius: 10px;
}
div > button{
    margin: 0;
    margin-left: auto;
}

</style>