import { createRouter, createWebHashHistory } from 'vue-router'
import User from '../views/User.vue'

const routes = [
  {
    path: '/',
    name: 'User',
    component: User
  },
  {
    path: '/feed',
    name: 'Feed',
    // route level code-splitting
    // this generates a separate chunk (feed.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "feed" */ '../views/Feed.vue')
  },
  {
    path: '/post',
    name: 'Post',
    component: () => import(/* webpackChunkName: "post" */ '../views/Post.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import(/* webpackChunkName: "profile" */ '../views/Profile.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
