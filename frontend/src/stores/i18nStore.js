import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import pl from '@/i18n/pl'
import en from '@/i18n/en'

export const useI18nStore = defineStore('i18n', () => {
  const locale = ref(localStorage.getItem('locale') || 'pl')

  const t = computed(() => locale.value === 'en' ? en : pl)

  function setLocale(lang) {
    locale.value = lang
    localStorage.setItem('locale', lang)
  }

  return { locale, t, setLocale }
})
