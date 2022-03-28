import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/home/home')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/login/login')
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('@/views/register/register')
    },
    {
      path: '/forgetPassword',
      name: 'ForgetPassword',
      component: () => import('@/views/register/forgetPassword')
    },
    {
      path: '/search',
      name: 'Search',
      component: () => import('@/views/search/search')
    },
    {
      path: '/searchDetail',
      name: 'SearchDetail',
      component: () => import('@/views/search/searchDetail')
    },
    {
      path: '/ingredientIndex',
      name: 'IngredientIndex',
      component: () => import('@/views/ingredient/index')
    },
    {
      path: '/menuIndex',
      name: 'MenuIndex',
      component: () => import('@/views/menu/index')
    },
    {
      path: '/favorite',
      name: 'Favorite',
      component: () => import('@/views/favorite/favorite')
    }
  ]
})
