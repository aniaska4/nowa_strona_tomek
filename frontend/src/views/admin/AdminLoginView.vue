<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const form    = reactive({ username: '', password: '' })
const error   = ref('')
const loading = ref(false)
const router  = useRouter()
const auth    = useAuthStore()

async function handleLogin() {
  loading.value = true
  error.value   = ''
  try {
    await auth.login(form.username, form.password)
    router.push('/admin')
  } catch {
    error.value = 'Nieprawidłowy login lub hasło.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
    <div class="card w-full max-w-sm">
      <h1 class="font-serif text-2xl text-white mb-6 text-center">Panel admina</h1>

      <form class="space-y-4" @submit.prevent="handleLogin">
        <div>
          <label class="block text-sm text-[var(--color-muted)] mb-1">Login</label>
          <input v-model="form.username" type="text" class="input-field" required autocomplete="username" />
        </div>
        <div>
          <label class="block text-sm text-[var(--color-muted)] mb-1">Hasło</label>
          <input v-model="form.password" type="password" class="input-field" required autocomplete="current-password" />
        </div>

        <p v-if="error" class="text-red-400 text-sm">{{ error }}</p>

        <button type="submit" class="btn-primary w-full" :disabled="loading">
          {{ loading ? 'Logowanie...' : 'Zaloguj się' }}
        </button>
      </form>
    </div>
  </div>
</template>
