<template>

  <main id="app">
    <router-view></router-view>
    <visual-notification></visual-notification>
  </main>
  
</template>

<script>
import VisualNotification from './components/VisualNotification.vue';

export default {
  name: 'App',
  components: {
    VisualNotification
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
  background-size: 15px;
}

</style>
