import {createRouter, createWebHistory} from 'vue-router'
import Home from '../views/Home.vue'
import PageNotFound from '@/views/PageNotFound.vue'

import Country from '../views/Country.vue'

import Area from '../views/Area.vue'

import Resource from '../views/Resource.vue'

const routes = [
    {
        path: '/vue-2',
        name: 'Home',
        component: Home
    },
    {
        path: '/:pathMatch(.*)*',
        name: "PageNotFound",
        component: PageNotFound,
    },
    {
        path: '/vue-2/:country',
        name: 'Country',
        component: Country,
        props: true
    },
    {
      path: '/vue-2/:country/:areaSlug',
      name: 'Area',
      component: Area,
      props: true
    },
    {
      path: '/vue-2/:country/:areaSlug/:resourceSlug',
      name: 'Resource',
      component: Resource,
      props: true
    },

]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})

export default router