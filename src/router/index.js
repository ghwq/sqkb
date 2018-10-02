import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/page/home/home'
import Search from '@/page/search/search'
import Cart from '@/page/cart/cart'

Vue.use(Router)

export default new Router({
  linkActiveClass: 'active',
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart
    }
  ]
})
