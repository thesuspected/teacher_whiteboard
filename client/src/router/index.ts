import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import NewBoard from '../views/NewBoard.vue'
import Whiteboard from '../views/Whiteboard.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/newBoard',
        name: 'newBoard',
        component: NewBoard,
    },
    {
        path: '/whiteboard',
        name: 'Whiteboard',
        component: Whiteboard,
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
})

export default router
