import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import vuetify from './plugins/vuetify'
import api from '@/plugins/axios'
import VueSocketIO from 'vue-socket.io'
import SocketIO from 'socket.io-client'
import './config/fontawesome'
import 'vue-slider-component/theme/default.css'

Vue.prototype.$api = api // Импортируем Axios с заданным BaseUrl
Vue.use(
    new VueSocketIO({
        debug: true,
        connection: SocketIO('http://localhost:8081'),
        vuex: {
            store,
            actionPrefix: 'SOCKET_',
            mutationPrefix: 'SOCKET_',
        },
    })
)

Vue.config.productionTip = false

new Vue({
    router,
    store,
    vuetify,
    render: (h) => h(App),
}).$mount('#app')
