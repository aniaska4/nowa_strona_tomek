import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '@/services/api'

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('admin_token') || null)

  const isAuthenticated = computed(() => !!token.value)

  async function login(username, password) {
    const { data } = await api.post('/auth/login', { username, password })
    token.value = data.token
    localStorage.setItem('admin_token', data.token)
  }

  function logout() {
    token.value = null
    localStorage.removeItem('admin_token')
  }

  return { token, isAuthenticated, login, logout }
})
