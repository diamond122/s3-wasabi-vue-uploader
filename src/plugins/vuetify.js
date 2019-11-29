import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify, {
  options: {
    customProperties: true
  }
});
export default new Vuetify({
  icons: {
    iconfont: 'mdi',  // 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4'
  },
  theme: {
    dark: true,
    themes: {
      dark: {
        primary: '#ff0000',
        secondary: "#81C44B",
        accent: "#8c9eff",
        error: "#b71c1c",
        borderColor: '#fff',
        textColor: '#fff',
        Highlighted: '#81C44B',
        background: '#326394',
        darkBackground: '#153657',
      },
    },
  },
})
