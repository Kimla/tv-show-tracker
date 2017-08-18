import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home.vue';
import Login from '@/pages/Login.vue';
import Register from '@/pages/Register.vue';
import Search from '@/pages/Search.vue';
import myShows from '@/pages/MyShows.vue'
import settings from '@/pages/Settings.vue'
import show from '@/pages/Show.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        { path: '/', name: 'home', component: Home },
        { path: '/login', name: 'login', component: Login },
        { path: '/register', name: 'register', component: Register },
        { path: '/search', name: 'search', component: Search },
        { path: '/my-shows', name: 'myShows', component: myShows },
        { path: '/settings', name: 'settings', component: settings },
        { path: '/show/:id/:slug', name: 'show', component: show }
    ]
})
