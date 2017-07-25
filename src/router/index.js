import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home.vue';
import Search from '../components/Search.vue';
import myShows from '../components/MyShows.vue'
import settings from '../components/Settings.vue'
import show from '../components/Show.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        { path: '/', name: 'home', component: Home },
        { path: '/search', name: 'search', component: Search },
        { path: '/my-shows', name: 'myShows', component: myShows },
        { path: '/settings', name: 'settings', component: settings },
        { path: '/show/:id', name: 'show', component: show }
    ]
})
