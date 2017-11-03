import Vue from 'vue'
import Router from 'vue-router'
import Search from '@/components/Search'
import Matches from '@/components/Matches'
import SetGender from '@/components/SetGender'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Search',
      component: Search
    },
    {
      path: '/matches',
      name: 'Matches',
      component: Matches
    },
    {
      path: '/setgender',
      name: 'SetGender',
      component: SetGender
    }
  ]
})

export default router
