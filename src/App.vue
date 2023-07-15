<template>

  <main id="app">
    <router-view></router-view>
    <visual-notification></visual-notification>
  </main>
  
</template>

<script>
import { userIsLogged } from './API/localStorage';
import VisualNotification from './components/VisualNotification.vue';
import router from './routes/appRouter';

export default {
  name: 'App',
  components: {
    VisualNotification
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
}

*{
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  margin: 0;
  outline: none;
  transition: .3s;
}
body{
  overflow: hidden;
  background: url("@/assets/images/pointGrey.png") var(--background);
  background-repeat: repeat;
  background-size: 1%;
}

</style>
