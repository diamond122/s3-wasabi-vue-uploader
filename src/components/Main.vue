<template>
  <v-app id="sandbox">
    <Sidebar :primary-drawer="primaryDrawer"/>

    <Header :primary-drawer="primaryDrawer"/>

    <v-content class="justify-center align-center">
      <LayoutConfig
        v-if="showConfig"
        v-bind="{primaryDrawer, footer}"
      />
      <Upload v-else/>
    </v-content>

    <Footer :footer="footer"/>
  </v-app>
</template>

<script>
  import LayoutConfig from './LayoutConfig/LayoutConfig';
  import Sidebar from '../components/Sidebar/Sidebar';
  import Header from '../components/Header/Header';
  import Footer from '../components/Footer/Footer';
  import Upload from '../components/Upload/Upload';
  export default {
    name: 'Main',
    components: {
      Header,
      Sidebar,
      LayoutConfig,
      Footer,
      Upload,
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