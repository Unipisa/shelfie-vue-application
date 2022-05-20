import {createRouter, createWebHistory} from 'vue-router'
import Home from '../views/Home.vue'
import PageNotFound from '@/views/PageNotFound.vue'

import Country from '../views/Country.vue'

import Area from '../views/Area.vue'

import Resource from '../views/Resource.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/:pathMatch(.*)*',
        name: "PageNotFound",
        component: PageNotFound,
    },
    {
        path: '/:country',
        name: 'Country',
        component: Country,
        props: true
    },
    {
      path: '/:country/:areaSlug',
      name: 'Area',
      component: Area,
      props: true
    },
    {
      path: '/:country/:areaSlug/:resourceSlug',
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