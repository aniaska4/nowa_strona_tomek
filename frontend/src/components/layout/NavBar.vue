<script setup>
import { ref, computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useI18nStore } from '@/stores/i18nStore'

const route      = useRoute()
const i18n       = useI18nStore()
const { t, locale } = storeToRefs(i18n)
const mobileOpen = ref(false)

const links = computed(() => [
  { to: '/',        label: t.value.nav.home    },
  { to: '/about',   label: t.value.nav.about   },
  { to: '/news',    label: t.value.nav.news    },
  { to: '/gallery', label: t.value.nav.gallery },
  { to: '/video',   label: t.value.nav.video   },
  { to: '/contact', label: t.value.nav.contact },
])

function toggleLocale() {
  i18n.setLocale(locale.value === 'pl' ? 'en' : 'pl')
}
</script>

<template>
  <nav class="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-bg)]/90 backdrop-blur-md">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <RouterLink to="/" class="font-serif text-xl text-white tracking-wide hover:text-primary-400 transition-colors">
          Tomasz Domański
        </RouterLink>

        <!-- Desktop links + lang switch -->
        <div class="hidden md:flex items-center gap-6">
          <RouterLink
            v-for="link in links"
            :key="link.to"
            :to="link.to"
            class="text-sm text-[var(--color-muted)] hover:text-white transition-colors"
            :class="{ '!text-primary-400': route.path === link.to }"
          >
            {{ link.label }}
          </RouterLink>

          <!-- Language switch -->
          <button
            class="flex items-center gap-1 text-xs font-semibold tracking-widest border border-[var(--color-border)] rounded-md px-2.5 py-1 transition-colors hover:border-primary-500 hover:text-white"
            :class="locale === 'en' ? 'text-primary-400 border-primary-600' : 'text-[var(--color-muted)]'"
            @click="toggleLocale"
            :aria-label="locale === 'pl' ? 'Switch to English' : 'Przełącz na Polski'"
          >
            <span :class="locale === 'pl' ? 'text-white' : 'text-[var(--color-muted)]'">PL</span>
            <span class="text-[var(--color-border)]">/</span>
            <span :class="locale === 'en' ? 'text-white' : 'text-[var(--color-muted)]'">EN</span>
          </button>
        </div>

        <!-- Hamburger -->
        <button
          class="md:hidden text-[var(--color-muted)] hover:text-white"
          @click="mobileOpen = !mobileOpen"
          aria-label="Menu"
        >
          <svg v-if="!mobileOpen" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile menu -->
    <Transition name="slide">
      <div v-if="mobileOpen" class="md:hidden border-t border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 space-y-2">
        <RouterLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="block py-2 text-[var(--color-muted)] hover:text-white transition-colors"
          :class="{ 'text-primary-400': route.path === link.to }"
          @click="mobileOpen = false"
        >
          {{ link.label }}
        </RouterLink>

        <!-- Lang switch mobile -->
        <button
          class="flex items-center gap-1.5 text-xs font-semibold tracking-widest pt-2 pb-1"
          @click="toggleLocale"
        >
          <span :class="locale === 'pl' ? 'text-white' : 'text-[var(--color-muted)]'">PL</span>
          <span class="text-[var(--color-border)]">/</span>
          <span :class="locale === 'en' ? 'text-white' : 'text-[var(--color-muted)]'">EN</span>
        </button>
      </div>
    </Transition>
  </nav>
</template>

<style scoped>
.slide-enter-active, .slide-leave-active { transition: all .2s ease; }
.slide-enter-from, .slide-leave-to { opacity: 0; transform: translateY(-8px); }
</style>
