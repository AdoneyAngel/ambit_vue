<template>
  <principal-header />
  <main id="app">
    <router-view></router-view>
    <visual-notification></visual-notification>
  </main>
  
</template>

<!-- Prueba de sincronización GIT -->

<script>
import { userIsLogged } from './API/localStorage';
import VisualNotification from './components/VisualNotification.vue';
import router from './routes/appRouter';
import principalHeader from "@/components/pagePrincipalHeader.vue"
// import { collection, doc, getDocs, setDoc } from 'firebase/firestore';
// import db from './API/DB/db';

export default {
  name: 'App',
  components: {
    VisualNotification,
    principalHeader
},
async created() {

  //EJECUTAR SCRIPT PARA INSERTAR UNA NUEVA PROPIEDAD....INCOMPLETO

  // const users = await getDocs(collection(db, "users"))

  // users.forEach(userDoc => {
  //   const userGuides = userDoc.data().guides
  //   const userID = userDoc.id

  //   userGuides.forEach(guide => {
  //     guide.share = ""

  //   })

    
  //   setDoc(doc(db, "users", userID), {
  //       guides: userGuides
  //   })

  // }) 


  this.$watch(
    async () => this.$route.fullPath,
    async () => {
      const isLogged = await userIsLogged()
      const location = this.$route.fullPath

      if(!isLogged && location != "/login/signin" && location != "/login/signup"){
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
  --principalBorderRadius: 30px;
  --visualizerContainerBackground: rgb(237 237 237 / 90%);
}

*{
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  margin: 0;
  outline: none;
  transition: .3s;
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
