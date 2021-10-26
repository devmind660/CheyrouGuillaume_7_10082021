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
    component: () => import('../views/Feed.vue')
  },
  {
    path: '/publish',
    name: 'Publish',
    component: () => import('../views/Publish.vue')
  },
  {
    path: '/post/:id',
    name: 'Post',
    component: () => import('../views/Post.vue'),
    props: true
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/Profile.vue')
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: () => import('../views/Error.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
