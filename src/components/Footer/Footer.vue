<template>
  <v-footer
    :inset="footer.inset"
    app
    color="background"
  >
    <v-row>
      <div class="align-center justify-center d-flex mr-2">
        <span slot="prepend" class="v-text-field--single-line">USING ACCOUNT</span>
      </div>
      <v-select
        :items="accounts"
        :value="currentAccount"
        solo
        dense
        hide-details
        color="background"
        item-color="textColor"
        :style="{ backgroundColor: $vuetify.theme.themes.dark.background }"
        class="select-accounts"
      >
      </v-select>
    </v-row>
    <v-spacer></v-spacer>
    <v-divider vertical></v-divider>
    <div>
      <span class="mx-2">CHAIN STATUS</span>
      <v-icon v-if="networkStatus" color="green">mdi-server-network</v-icon>
      <v-icon v-else>mdi-server-network-off</v-icon>
    </div>
  </v-footer>
</template>

<script>
  import Service from '../../api';
  export default {
    name: 'Footer',
    props: {
      footer: {
        type: Object,
        default: () => {},
      }
    },
    data: () => ({
      networkStatus: 0,
      currentAccount: 0,
      accounts: [],
    }),
    methods: {
      async checkNetworkStatus() {
        this.networkStatus = await Service.checkNetworkStatus();
      }
    },
    created() {
      this.checkNetworkStatus();
      setInterval(() => this.checkNetworkStatus(), 30 * 1000);

      const stellarKeys = Service.getStellarKeys();
      this.accounts = stellarKeys.map((key, index) => ({text: key, value: index}) );
    }
  }
</script>

<style lang="scss" scoped>
  @import '~vuetify/src/styles/styles.sass';
  .select-accounts {
    width: 300px;
  }
  .theme--dark.v-card {
    background: map-get($material-dark, darken-1);
  }
</style>