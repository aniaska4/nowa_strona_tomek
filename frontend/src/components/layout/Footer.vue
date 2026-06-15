<script setup>
import { storeToRefs } from 'pinia'
import { useI18nStore } from '@/stores/i18nStore'

const { t } = storeToRefs(useI18nStore())
</script>

<template>
  <footer class="border-t border-[var(--color-border)] bg-[var(--color-surface)] py-10 mt-20">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
      <p class="font-serif text-white text-lg">Tomasz Domański</p>
      <p class="text-[var(--color-muted)] text-sm">
        &copy; {{ new Date().getFullYear() }} {{ t.footer.rights }}
      </p>
      <div class="flex gap-4">
        <a href="https://www.youtube.com/@tomaszdomanski-pianist6899" target="_blank" rel="noopener noreferrer" class="text-[var(--color-muted)] hover:text-primary-400 transition-colors text-sm">YouTube</a>
      </div>
    </div>
  </footer>
</template>
