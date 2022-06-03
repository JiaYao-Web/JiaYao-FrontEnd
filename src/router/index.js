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
      path: '/index',
      name: 'Home',
      component: () => import('@/views/home/home')
    },
    {
      path: '/',
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
      path: '/ingredient',
      name: 'Ingredient',
      component: () => import('@/views/ingredient/ingredient')
    },
    {
      path: '/uploadIngredient',
      name: 'UploadIngredient',
      component: () => import('@/views/ingredient/uploadIngredient')
    },
    {
      path: '/menuIndex',
      name: 'MenuIndex',
      component: () => import('@/views/menu/index')
    },
    {
      path: '/menu',
      name: 'Menu',
      component: () => import('@/views/menu/menu')
    },
    {
      path: '/uploadMenu',
      name: 'UploadMenu',
      component: () => import('@/views/menu/uploadMenu')
    },
    {
      path: '/category',
      name: 'Category',
      component: () => import('@/views/category/category')
    },
    // 用户信息相关
    {
      path: '/favorite',
      name: 'Favorite',
      component: () => import('@/views/favorite/favorite')
    },
    {
      path: '/user',
      name: 'User',
      component: () => import('@/views/userInfo/user')
    },
    {
      path: '/userInfo',
      name: 'UserInfo',
      component: () => import('@/views/userInfo/userInfo')
    },
    {
      path: '/allUser',
      name: 'AllUser',
      component: () => import('@/views/follow/allUsers')
    }
  ]
})
