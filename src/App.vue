<template>
  <principal-header />
  <main id="app">
    <router-view :openGeneralPopUp="openGeneralPopUp"></router-view>
    <general-pop-up-single-input v-if="generalPopUp" :call-back="generalPopUpData.callBack" :close="closeGeneralPopUp" :title="generalPopUpData.title" :button-text="generalPopUpData.buttonText" :placeholder="generalPopUpData.placeholder"/>
    <visual-notification></visual-notification>
  </main>
  
</template>

<!-- Prueba de sincronización GIT -->

<script>
import { userIsLogged } from './API/localStorage';
import VisualNotification from './components/VisualNotification.vue';
import router from './routes/appRouter';
import principalHeader from "@/components/pagePrincipalHeader.vue"
import GeneralPopUpSingleInput from './components/generalPopUpSingleInput.vue';
import { ref } from 'vue';

export default {
  name: 'App',
  components: {
    VisualNotification,
    principalHeader,
    GeneralPopUpSingleInput
},
data() {
  return {
    generalPopUp: ref(false),
    generalPopUpData: ref({})
  }
},
created() {

  this.$watch(
    () => this.$route.params,
    () => {

      const isLogged = userIsLogged()
      const location = window.location.hash

      if(!isLogged && location != "#/login/signin" && location != "#/login/signup"){
          router.push("/login/signup")
      }

      for (var i = 1; i < 99999; i++) {
        clearTimeout(i);
      }

    }
    )
  },
  methods: {
    openGeneralPopUp(data) {
      this.generalPopUp = true
      this.generalPopUpData = data
    },
    closeGeneralPopUp() {
      this.generalPopUp = false
      this.generalPopUpData = {}
    }
  }

}
</script>

<style>

:root{
  --greypurple: #dadaff;
  --purple: #a063dd;
  --background: #dedede;
  --notifyError: #f39e9e;
  --animationTransition: cubic-bezier(0.075, 0.82, 0.165, 1);
  --principalBorderRadius: 30px;
  --visualizerContainerBackground: rgb(237 237 237 / 90%);
}

*{
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  margin: 0;
  outline: none;
  transition: .3s var(--animationTransition);
}
*::-webkit-scrollbar{
    background: transparent;
}
*::-webkit-scrollbar-thumb{
    background: var(--greypurple);
    border-radius: 100px;
}
body{
  overflow: hidden;
  background: url("@/assets/images/pointGrey.png") var(--background);
  background-repeat: repeat;
  background-size: 1%;
}

</style>
