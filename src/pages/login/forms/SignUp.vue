<template>
    <form @submit.prevent="handleSubmit">
        <section>
            <div class="inputSection">
                <h1 :class="{'typed' : mail}">Email</h1>
                <input v-model="mail" type="mail">
            </div>

            <div class="inputSection">
                <h1 :class="{'typed' : nickname}">Nickname</h1>
                <input v-model="nickname" type="text">
            </div>

            <div class="inputSection">
                <h1 :class="{'typed' : password}">Password</h1>
                <PasswordLayout className="inputSection" :callback="updatePassword" />
            </div>             
            <router-link class="link" to="signin">Do you have an account</router-link>
        </section>
        
        <button>{{ currentForm }}</button>   
    
    </form>

</template>

<script>
import { ref } from 'vue'
import "@/styles/loginForm.css"
import {createUser} from '../../../API/DB/db'
import PasswordLayout from '@/components/PasswordLayout.vue'
import { setUser } from '@/API/localStorage'

export default {
    props: {
        currentForm: String,
        setCurrentForm: Function,
        setLoading: Function,
        unsetLoading: Function,
        setIsLogged: Function,
    },
    components: {
        PasswordLayout
    },
    data(){
        return {
            mail: ref(""),
            nickname: ref(""),
            password: ref("")
        }
    },
    created(){this.setCurrentForm("Sign Up")},
    methods: {
        async handleSubmit(){

            this.setLoading()

            createUser(this.mail, this.nickname, this.password).then(result => {
                this.unsetLoading()

                if (result) {
                    setUser(result.mail, result.name)
                    this.setIsLogged()
                }
            })
        },

        updatePassword(newValue){
            this.password = newValue
        }
    }
}

</script>