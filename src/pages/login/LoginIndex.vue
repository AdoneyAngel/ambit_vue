<template>
    <main>
        <img id="logo" :src="logo" alt="">
        <section>
            <header>
                <p>{{ currentForm }}</p>

                <h1 :class="{'headerLoading' : this.isLoading}"> <span class="span1">A</span> <span class="span2">M</span> <span class="span3">B</span> <span class="span4">I</span> <span class="span5">T</span> </h1>
            </header>

            <router-view 
            :setLoading="setLoading" 
            :unsetLoading="unsetLoading" 
            :setCurrentForm="setCurrentForm" 
            :currentForm="currentForm" 
            :setIsLogged="setIsLogged" ></router-view>    

        </section>

    </main>
</template>

<script>
// import { userIsLogged } from "@/API/localStorage.js"
import appRouter from "@/routes/appRouter"
import logo from "@/assets/images/ambitLetter.png"
import { userIsLogged } from "@/API/localStorage"
import router from '@/routes/appRouter'

export default {
    data(){
        return {
            currentForm: window.location.hash.indexOf("signup") != -1 ? "Sign Up" : "Sign In",
            logo,
            isLoading: false,
            isLogged: false
        }
    },
    setup: () => {
        const currentRoute = appRouter.currentRoute.value.name

        if(currentRoute != "signup" && currentRoute != "signin"){
            appRouter.push("/login/signup")
        }
    },
    created(){
        if (userIsLogged()){
            this.isLogged = true
        }

    },
    methods: {
        setCurrentForm(newCurrentForm){
            this.currentForm = newCurrentForm

        },
        setLoading(){
            this.isLoading = true

        },
        unsetLoading(){
            this.isLoading = false

        },
        setIsLogged(){
            this.isLogged = true
            
        }
    },
    watch:  {
        isLogged(newValue){
            if(newValue === true){
                router.push("/")
            }
        }
    }
}
</script>

<style scoped>

main{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    position: relative;
}
section{
    background: rgba(255, 255, 255, 0.568);
    backdrop-filter: blur(20px);
    padding: 35px 40px;
    width: 600px;
    border-radius: 23px;
}
#logo{
    position: fixed;
    width: 70%;
    left: 40%;
    top: -50%;
}
header{
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    flex-direction: row;
}
header > p{
    font-weight: 800;
    font-size: 18px;
}
header > h1{
    font-size: 25px;
    color: var(--purple);
    margin-left: auto;
    display: flex;
    justify-content: center;
    align-items: center;
}
header > h1 > span{
    user-select: none;
    font-weight: bolder;
    text-transform: uppercase;
    margin: 0 2px;
    display: flex;
    justify-content: center;
    align-items: center;
    animation: none;

}
.headerLoading > span{
    animation: spanLoading 1s ease-in-out infinite;
}
.headerLoading > .span2{
    animation-delay: .1s;
}
.headerLoading > .span3{
    animation-delay: .2s;
}
.headerLoading > .span4{
    animation-delay: .3s;
}
.headerLoading > .span5{
    animation-delay: .5s;
}

@keyframes spanLoading {
    0%{
        transform: translateY(0%);
    }
    33%{
        transform: translateY(-50%);
    }
    66%{
        transform: translateY(0%);
    }
    77%{
        transform: translateY(0%);
    }
    100%{
        transform: translateY(0%)
    }
}

</style>