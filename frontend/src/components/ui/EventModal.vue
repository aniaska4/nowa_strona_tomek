<script setup>
import { computed, onMounted, onUnmounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useI18nStore } from '@/stores/i18nStore'

const { t, locale } = storeToRefs(useI18nStore())

const props = defineProps({
  event: { type: Object, default: null },
})
const emit = defineEmits(['close'])

const fullDate = computed(() => {
  if (!props.event) return ''
  return new Date(props.event.date).toLocaleDateString(locale.value === 'en' ? 'en-GB' : 'pl-PL', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  })
})

const shortMonth = computed(() => {
  if (!props.event) return ''
  return new Date(props.event.date).toLocaleDateString(locale.value === 'en' ? 'en-GB' : 'pl-PL', { month: 'short' })
})

const isPast = computed(() => {
  if (!props.event) return false
  return new Date(props.event.date) < new Date()
})

function onKey(e) {
  if (e.key === 'Escape') emit('close')
}
onMounted(()  => document.addEventListener('keydown', onKey))
onUnmounted(() => document.removeEventListener('keydown', onKey))
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="event"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
        @click.self="emit('close')"
      >
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

        <!-- Panel -->
        <div class="relative w-full max-w-lg bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl shadow-2xl overflow-hidden">

          <!-- Colored top bar -->
          <div class="h-1 w-full" :class="isPast ? 'bg-[var(--color-border)]' : 'bg-primary-600'"></div>

          <div class="p-6 sm:p-8">
            <!-- Header row -->
            <div class="flex items-start justify-between gap-4 mb-6">
              <div class="flex items-start gap-4">
                <!-- Date badge -->
                <div class="shrink-0 text-center bg-[var(--color-bg)] border border-[var(--color-border)] rounded-xl px-3 py-2 min-w-[64px]">
                  <span class="block text-3xl font-bold font-serif leading-none"
                    :class="isPast ? 'text-[var(--color-muted)]' : 'text-primary-400'">
                    {{ new Date(event.date).getDate() }}
                  </span>
                  <span class="block text-xs text-[var(--color-muted)] uppercase tracking-wider mt-1">
                    {{ shortMonth }}
                  </span>
                  <span class="block text-xs text-[var(--color-muted)] mt-0.5">
                    {{ new Date(event.date).getFullYear() }}
                  </span>
                </div>

                <div>
                  <span v-if="isPast" class="inline-block text-xs text-[var(--color-muted)] border border-[var(--color-border)] rounded-full px-2 py-0.5 mb-2">
                    {{ t.modal.archive }}
                  </span>
                  <span v-else class="inline-block text-xs text-primary-400 border border-primary-700 rounded-full px-2 py-0.5 mb-2">
                    {{ t.modal.upcoming }}
                  </span>
                  <h2 class="font-serif text-xl text-white leading-snug">{{ event.title }}</h2>
                </div>
              </div>

              <button
                class="shrink-0 text-[var(--color-muted)] hover:text-white transition-colors"
                @click="emit('close')"
                :aria-label="t.modal.close"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <!-- Details -->
            <div class="space-y-3 text-sm">
              <div class="flex items-start gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mt-0.5 shrink-0 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span class="text-[var(--color-text)] capitalize">{{ fullDate }}</span>
              </div>

              <div class="flex items-start gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mt-0.5 shrink-0 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div>
                  <p class="text-[var(--color-text)]">{{ event.venue }}</p>
                  <p v-if="event.city" class="text-[var(--color-muted)]">{{ event.city }}</p>
                </div>
              </div>

              <div v-if="event.description" class="flex items-start gap-3 pt-1">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mt-0.5 shrink-0 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
                <p class="text-[var(--color-muted)] leading-relaxed">{{ event.description }}</p>
              </div>

              <div v-if="event.url" class="flex items-center gap-3 pt-2 border-t border-[var(--color-border)]">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 shrink-0 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                <a
                  :href="event.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-primary-400 hover:text-primary-300 underline underline-offset-2 transition-colors truncate"
                >
                  {{ event.url }}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity .2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
.fade-enter-active .relative, .fade-leave-active .relative { transition: transform .2s ease; }
.fade-enter-from .relative { transform: scale(0.96) translateY(8px); }
.fade-leave-to .relative  { transform: scale(0.96) translateY(8px); }
</style>
