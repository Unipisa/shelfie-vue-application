import {createRouter, createWebHistory} from 'vue-router'
import Home from '../views/Home.vue'
import PageNotFound from '@/views/PageNotFound.vue'

import Italy from '../views/italy/Italy.vue'
import Ireland from '../views/ireland/Ireland.vue'
import Denmark from '../views/denmark/Denmark.vue'
import Finland from '../views/finland/Finland.vue'
import Portugal from '../views/portugal/Portugal.vue'
import Sweden from '../views/sweden/Sweden.vue'

import AreaITA from '../views/italy/AreaITA.vue'
import AreaIRE from '../views/ireland/AreaIRE.vue'
import AreaDEN from '../views/denmark/AreaDEN.vue'
import AreaFIN from '../views/finland/AreaFIN.vue'
import AreaPOR from '../views/portugal/AreaPOR.vue'
import AreaSWE from '../views/sweden/AreaSWE.vue'

import Res from '../components/Res.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/:catchAll(.*)*',
        name: "PageNotFound",
        component: PageNotFound,
      },
    {
        path: '/italy',
        name: 'Italy',
        component: Italy,
        children:[
            {
              path: ':area',
              name: 'AreaITA',
              components: {
                AreaITA: AreaITA
              },
              children:[
                {
                  path: ':res',
                  name: 'Res',
                  components: {
                    Res: Res
                  }
                },
              ],
            },
          ],
    },
    {
        path: '/ireland',
        name: 'Ireland',
        component: Ireland,
        children:[
            {
              path: '/ireland/:id',
              name: 'AreaIRE',
              component: AreaIRE,
            },
          ],
    },
    {
        path: '/denmark',
        name: 'Denmark',
        component: Denmark,
        children:[
            {
              path: '/denmark/:id',
              name: 'AreaDEN',
              component: AreaDEN,
            },
          ],
    },
    {
        path: '/finland',
        name: 'Finland',
        component: Finland,
        children:[
            {
              path: '/finland/:id',
              name: 'AreaFIN',
              component: AreaFIN,
            },
          ],
    },
    {
        path: '/portugal',
        name: 'Portgual',
        component: Portugal,
        children:[
            {
              path: '/portugal/:id',
              name: 'AreaPOR',
              component: AreaPOR,
            },
          ],
    },
    {
        path: '/sweden',
        name: 'Sweden',
        component: Sweden,
        children:[
            {
              path: '/sweden/:id',
              name: 'AreaSWE',
              component: AreaSWE,
            },
          ],
    },

]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})

export default router