import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import colors from 'vuetify/lib/util/colors'
import ru from 'vuetify/src/locale/ru'
import { loc } from '@/store/ref/locals'

Vue.use(Vuetify)

export default new Vuetify({
    lang: {
        locales: { ru },
        current: 'ru',
    },
    breakpoint: {
        mobileBreakpoint: 'sm',
    },
    theme: {
        default: 'light',
        disable: false,
        themes: {
            light: {
                primary: colors.orange.base,
                secondary: '#424242',
                accent: '#82B1FF',
                error: '#FF5252',
                info: '#2196F3',
                success: '#4CAF50',
                warning: '#FB8C00',
            },
            dark: {
                primary: colors.orange.base,
                secondary: '#555',
                accent: '#FF4081',
                error: '#FF5252',
                info: '#2196F3',
                success: '#4CAF50',
                warning: '#FB8C00',
            },
        },
    },
})
