import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import NewBoard from '../views/NewBoard.vue'
import AllBoards from '../views/AllBoards.vue'
import Profile from '../views/Profile.vue'
import Whiteboard from '../views/Whiteboard.vue'
// Доска
import Draw from '../views/Board/Draw.vue'
import Members from '../views/Board/Members.vue'
import Settings from '../views/Board/Settings.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/newBoard',
        name: 'NewBoard',
        component: NewBoard,
    },
    {
        path: '/allBoards',
        name: 'AllBoards',
        component: AllBoards,
    },
    {
        path: '/profile',
        name: 'Profile',
        component: Profile,
    },
    {
        path: '/whiteboard',
        component: Whiteboard,
        children: [
            {
                path: '/',
                redirect: 'draw',
            },
            {
                path: 'draw',
                name: 'Draw',
                component: Draw,
            },
            {
                path: 'members',
                name: 'Members',
                component: Members,
            },
            {
                path: 'settings',
                name: 'Settings',
                component: Settings,
            },
        ],
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
})

export default router
