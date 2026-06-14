<script setup>
import { ref, reactive } from 'vue'
import api from '@/services/api'

const form = reactive({ name: '', email: '', subject: '', message: '' })
const status = ref('')
const loading = ref(false)

async function submitForm() {
  loading.value = true
  status.value = ''
  try {
    await api.post('/contact', form)
    status.value = 'success'
    Object.assign(form, { name: '', email: '', subject: '', message: '' })
  } catch {
    status.value = 'error'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
    <div class="grid md:grid-cols-2 gap-16 items-start">
      <!-- Info -->
      <div>
        <p class="text-primary-400 uppercase tracking-[0.3em] text-sm font-medium mb-3">Kontakt</p>
        <h1 class="section-title">Skontaktuj się</h1>
        <p class="text-[var(--color-muted)] leading-relaxed mb-10">
          Zapraszam do kontaktu w sprawach koncertów, współpracy i innych zapytań.
        </p>

        <div class="space-y-4">
          <div class="flex items-center gap-3 text-[var(--color-muted)]">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span>kontakt@tomaszkowalski.pl</span>
          </div>
          <div class="flex items-center gap-3 text-[var(--color-muted)]">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span>+48 123 456 789</span>
          </div>
        </div>
      </div>

      <!-- Form -->
      <form class="card space-y-4" @submit.prevent="submitForm">
        <h2 class="font-serif text-white text-xl mb-2">Wyślij wiadomość</h2>

        <div>
          <label class="block text-sm text-[var(--color-muted)] mb-1">Imię i nazwisko</label>
          <input v-model="form.name" type="text" class="input-field" required placeholder="Jan Kowalski" />
        </div>
        <div>
          <label class="block text-sm text-[var(--color-muted)] mb-1">Adres e-mail</label>
          <input v-model="form.email" type="email" class="input-field" required placeholder="jan@example.com" />
        </div>
        <div>
          <label class="block text-sm text-[var(--color-muted)] mb-1">Temat</label>
          <input v-model="form.subject" type="text" class="input-field" required placeholder="Zapytanie o koncert" />
        </div>
        <div>
          <label class="block text-sm text-[var(--color-muted)] mb-1">Wiadomość</label>
          <textarea v-model="form.message" class="input-field resize-none" rows="5" required placeholder="Treść wiadomości..."></textarea>
        </div>

        <div v-if="status === 'success'" class="text-green-400 text-sm">
          Wiadomość została wysłana. Odpiszę najszybciej jak to możliwe.
        </div>
        <div v-if="status === 'error'" class="text-red-400 text-sm">
          Wystąpił błąd. Spróbuj ponownie lub wyślij e-mail bezpośrednio.
        </div>

        <button type="submit" class="btn-primary w-full" :disabled="loading">
          {{ loading ? 'Wysyłanie...' : 'Wyślij wiadomość' }}
        </button>
      </form>
    </div>
  </div>
</template>
