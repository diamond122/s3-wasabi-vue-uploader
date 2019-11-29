<template>
  <v-app id="sandbox">
    <Sidebar :primary-drawer="primaryDrawer"/>

    <Header :primary-drawer="primaryDrawer"/>

    <v-content class="justify-center align-center" :style="{backgroundColor: $vuetify.theme.themes.dark.darkBackground}">
      <v-fade-transition mode="out-in">
        <router-view></router-view>
      </v-fade-transition>
    </v-content>

    <Footer :footer="footer"/>
  </v-app>
</template>

<script>
  import Sidebar from '../components/Sidebar/Sidebar';
  import Header from '../components/Header/Header';
  import Footer from '../components/Footer/Footer';
  export default {
    name: 'Main',
    components: {
      Header,
      Sidebar,
      Footer,
    },
    data: () => ({
      drawers: ['Default (no property)', 'Permanent', 'Temporary'],
      primaryDrawer: {
        model: null,
        type: 'default (no property)',
        clipped: true,
        floating: false,
        mini: false,
      },
      footer: {
        inset: true,
      },
      showConfig: false,
    }),
  }
</script>