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
<style lang="scss">
  @import './scss/main.scss';
  .v-application {
    font-family: 'Poppins', sans-serif;
  }
  .theme--dark.v-text-field--solo > .v-input__control > .v-input__slot,
  .theme--dark.v-list,
  .theme--dark.v-select-list {
    background-color: $bg-color;
  }
</style>
