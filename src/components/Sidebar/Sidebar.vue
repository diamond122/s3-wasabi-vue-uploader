<template>
  <v-navigation-drawer
    v-model="primaryDrawer.model"
    :clipped="primaryDrawer.clipped"
    :floating="primaryDrawer.floating"
    :mini-variant="primaryDrawer.mini"
    :permanent="primaryDrawer.type === 'permanent'"
    :temporary="primaryDrawer.type === 'temporary'"
    :mobile-break-point="780"
    app
    overflow
    color="background"
  >
    <v-row align="center">
      <v-btn-toggle
        v-model="selectedTab"
        mandatory
        backgroundColor="background"
      >
        <v-btn
          v-for="(menu, index) in sideMenuList"
          :key="index"
          color="background"
          :to="menu.href"
          class="text-center"
        >
          <v-list-item-content>
            <v-list-item-title>{{menu.title}}</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-icon v-on="on">{{menu.icon}}</v-icon>
              </template>
              <span>more coming soon</span>
            </v-tooltip>
          </v-list-item-action>
        </v-btn>
      </v-btn-toggle>
    </v-row>
    <v-row class="align-center">
      <v-btn
        v-for="(file, index) in recentList"
        block
        target="_blank"
        :href="file.publicUrl"
        class="px-6"
        :key="index"
        color="background"
      >
        <v-list-item-content class="text-truncate">
          <v-list-item-title class="text-truncate">{{file.lastModified}}</v-list-item-title>
        </v-list-item-content>
        <v-icon>mdi-link</v-icon>
      </v-btn>
    </v-row>
  </v-navigation-drawer>
</template>

<script>
  import sideMenuList from '../../constants/sidebar-constants';
  import { mapGetters, mapActions } from 'vuex';

  export default {
    name: 'Sidebar',
    data: () => ({
      sideMenuList,
      selectedTab: 4,
      fileList: [],
    }),
    props: {
      primaryDrawer: {
        type: Object,
        default: () => {},
      },
    },
    methods: {
      ...mapActions({
        getRecentList: '$_app/getRecentList'
      })
    },
    computed: {
      ...mapGetters({
        recentList: '$_app/recentList'
      })
    },
    created() {
      this.getRecentList(4);
    },
  }
</script>
<style lang="scss" scoped>
  .v-btn-toggle {
    flex-direction: column;
    width: 100%;
    padding: 10px;
  }
</style>