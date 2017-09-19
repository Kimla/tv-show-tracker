import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Search from '@/pages/Search';
import myShows from '@/pages/MyShows'
import settings from '@/pages/Settings'
import show from '@/pages/Show'

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
