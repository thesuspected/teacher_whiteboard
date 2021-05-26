/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'
import { act } from './ref/actions'
import whiteboardModule from './modules/whiteboard'
import { MainState, Ctx } from './ref/types'
import { loc } from './ref/locals'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        me: {
            _id: localStorage.getItem(loc.USER_ID) ? localStorage.getItem(loc.USER_ID) : '',
            name: localStorage.getItem(loc.USER_NAME) ? localStorage.getItem(loc.USER_NAME) : '',
            color: localStorage.getItem(loc.USER_COLOR) ? localStorage.getItem(loc.USER_COLOR) : '#FF9800',
            canvas: localStorage.getItem(loc.USER_CANVAS) ? localStorage.getItem(loc.USER_CANVAS) : '',
        },
        currentBoard: {
            _id: localStorage.getItem(loc.USER_LAST_BOARD_ID) ? localStorage.getItem(loc.USER_LAST_BOARD_ID) : '',
            name: '',
            description: '',
            subject_id: 0, // Тематика
            is_private: false,
            password: '',
            owner: {
                name: '',
                color: '',
                canvas: '',
            },
            members: [],
        },
        allBoards: [],
    } as MainState,
    mutations: {},
    actions: {
        ['SOCKET_' + act.ON_USER_CONNECTED]: (ctx: Ctx, id: string) => {
            console.log('user connected', id)
        },
    },
    modules: {
        whiteboardModule,
    },
})
