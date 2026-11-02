<script setup>
import { ref, reactive } from 'vue'
import { storeToRefs } from 'pinia'
import { useI18nStore } from '@/stores/i18nStore'
import api from '@/services/api'

const { t } = storeToRefs(useI18nStore())
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
    <div class="grid md:grid-cols-2 gap-6 md:gap-10 items-start">
      <!-- Info -->
      <div>
        <p class="text-primary-400 uppercase tracking-[0.3em] text-sm font-medium mb-3">{{ t.contact.label }}</p>
        <h1 class="section-title">{{ t.contact.title }}</h1>
        <p class="text-[var(--color-muted)] leading-relaxed">
          {{ t.contact.description }}
        </p>
      </div>

      <!-- Form -->
      <form class="card space-y-4" @submit.prevent="submitForm">
        <h2 class="font-serif text-white text-xl mb-2">{{ t.contact.formTitle }}</h2>

        <div>
          <label class="block text-sm text-[var(--color-muted)] mb-1">{{ t.contact.name }}</label>
          <input v-model="form.name" type="text" class="input-field" required :placeholder="t.contact.namePlaceholder" />
        </div>
        <div>
          <label class="block text-sm text-[var(--color-muted)] mb-1">{{ t.contact.email }}</label>
          <input v-model="form.email" type="email" class="input-field" required placeholder="jan@example.com" />
        </div>
        <div>
          <label class="block text-sm text-[var(--color-muted)] mb-1">{{ t.contact.subject }}</label>
          <input v-model="form.subject" type="text" class="input-field" required :placeholder="t.contact.subjectPlaceholder" />
        </div>
        <div>
          <label class="block text-sm text-[var(--color-muted)] mb-1">{{ t.contact.message }}</label>
          <textarea v-model="form.message" class="input-field resize-none" rows="5" required :placeholder="t.contact.messagePlaceholder"></textarea>
        </div>

        <div v-if="status === 'success'" class="text-green-400 text-sm">
          {{ t.contact.success }}
        </div>
        <div v-if="status === 'error'" class="text-red-400 text-sm">
          {{ t.contact.error }}
        </div>

        <button type="submit" class="btn-primary w-full" :disabled="loading">
          {{ loading ? t.contact.sending : t.contact.submit }}
        </button>
      </form>
    </div>
  </div>
</template>
