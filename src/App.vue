<template>
  <v-app>
      <Main></Main>
  </v-app>
</template>

<script>
import Main from './components/Main';

export default {
  name: 'App',
  components: {
    Main,
  },
  data () {
    return {
      //
    }
  }
}
</script>
<style lang="scss" scoped>
  .v-application {
    font-family: 'Poppins', sans-serif;
  }
</style>
