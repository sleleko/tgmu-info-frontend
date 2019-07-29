import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/home.vue'

Vue.use(Router)

export default new Router ({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: Home
        },
        // MAIN MENU (home)
        {
            path: '/GetLists',
            // with LazyLoad data
            component: () => import('./views/getlists.vue')            
        },
        {
            path: '/GetHelp',
            // with LazyLoad data
            component: () => import('./views/gethelp.vue')            
        },
        {
            path: '/ShowVideo',
            // with LazyLoad data
            component: () => import('./views/showvideo.vue')            
        },
        // GET LISTS MENU (submenu)
        {
            path: '/GetLists/Vpo',
            // with LazyLoad data
            component: () => import('./views/getlistvpo.vue')            
        },
        {
            path: '/GetLists/Mag',
            // with LazyLoad data
            component: () => import('./views/getlistmag.vue')            
        },
        {
            path: '/GetLists/Ord',
            // with LazyLoad data
            component: () => import('./views/getlistord.vue')            
        },
        {
            path: '/GetLists/Asp',
            // with LazyLoad data
            component: () => import('./views/getlistasp.vue')            
        }
    ]
})