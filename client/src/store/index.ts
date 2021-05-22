/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'
import { act } from './ref/actions'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {},
    mutations: {
        [act.SOCKET_USER_CONNECTED]: () => {
            console.log('socket connect act')
        },
        fucku() {
            console.log('FUCK YOU BEEEAACH')
        },
    },
    actions: {
        SOCKET_USER_CONNECTED() {
            console.log('socket connect mut')
        },
        SOCKET_fucku() {
            console.log('SOCKET_fucku')
        },
        [act.APP_CREATED]: () => {
            console.log('app created')
        },
        fucku() {
            console.log('FUCK YOU BEEEAACH')
        },
    },
    modules: {},
})
