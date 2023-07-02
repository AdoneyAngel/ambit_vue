<template>
    <form @submit.prevent="handleSubmit">
        <section>
            <div class="inputSection">
                <h1 :class="{'typed' : mail}">Email</h1>
                <input v-model="mail" type="mail">
            </div>

            <div class="inputSection">
                <h1 :class="{'typed' : password}">Password</h1>
                <PasswordLayout className="inputSection" :callback="updatePassword" />
            </div>             
            <router-link class="link" to="signup">Do you want join us</router-link>
        </section>
        
        <button>{{ currentForm }}</button>   
    
    </form>

</template>

<script>
import { ref } from 'vue'
import "@/styles/loginForm.css"
import { loginUser } from "@/API/DB/db"
import PasswordLayout from '@/components/PasswordLayout.vue'

export default {
    props: {
        currentForm: String,
        setCurrentForm: Function,
        setLoading: Function,
        unsetLoading: Function,
        setIsLogged: Function
    },
    components: {
        PasswordLayout
    },
    data(){
        return {
            mail: ref(""),
            password: "",
        }
    },
    created(){this.setCurrentForm("Sign In")},
    methods: {
        async handleSubmit(){
            this.setLoading()

            loginUser(this.mail, this.password).then((res) => {
                this.unsetLoading()

                if(res){
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