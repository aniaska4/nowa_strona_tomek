import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const routes = [
  { path: '/',          name: 'home',    component: () => import('@/views/HomeView.vue') },
  { path: '/about',     name: 'about',   component: () => import('@/views/AboutView.vue') },
  { path: '/news',      name: 'news',    component: () => import('@/views/NewsView.vue') },
  { path: '/gallery',   name: 'gallery', component: () => import('@/views/GalleryView.vue') },
  { path: '/video',     name: 'video',   component: () => import('@/views/VideoView.vue') },
  { path: '/contact',   name: 'contact', component: () => import('@/views/ContactView.vue') },
  {
    path: '/admin/login',
    name: 'admin-login',
    component: () => import('@/views/admin/AdminLoginView.vue'),
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('@/views/admin/AdminView.vue'),
    meta: { requiresAuth: true },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

router.beforeEach((to) => {
  if (to.meta.requiresAuth) {
    const auth = useAuthStore()
    if (!auth.isAuthenticated) {
      return { name: 'admin-login' }
    }
  }
})

export default router
