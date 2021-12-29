import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#D2003C', // #E53935
                secondary: '#1F3F6E', //colors.red.lighten4, // #FFCDD2
                accent: '#F2940A'//colors.indigo.base, // #3F51B5
            },
        },
    },
});
