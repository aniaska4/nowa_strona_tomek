import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import pl from '@/i18n/pl'
import en from '@/i18n/en'
import de from '@/i18n/de'

const TRANSLATIONS = { pl, en, de }
const DATE_LOCALES  = { pl: 'pl-PL', en: 'en-GB', de: 'de-DE' }

export const useI18nStore = defineStore('i18n', () => {
  const locale = ref(localStorage.getItem('locale') || 'en')

  const t          = computed(() => TRANSLATIONS[locale.value] || TRANSLATIONS.en)
  const dateLocale = computed(() => DATE_LOCALES[locale.value] || DATE_LOCALES.en)

  function setLocale(lang) {
    locale.value = lang
    localStorage.setItem('locale', lang)
  }

  return { locale, t, dateLocale, setLocale }
})
