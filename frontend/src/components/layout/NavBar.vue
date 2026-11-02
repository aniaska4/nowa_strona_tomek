<script setup>
import { ref, computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useI18nStore } from '@/stores/i18nStore'

const route      = useRoute()
const i18n       = useI18nStore()
const { t, locale } = storeToRefs(i18n)
const mobileOpen = ref(false)
const dropdownOpen = ref(null)

const links = computed(() => [
  { to: '/',        label: t.value.nav.home    },
  { to: '/about',   label: t.value.nav.about   },
  {
    to: '/about-us', label: t.value.nav.aboutUs,
    children: [
      { to: '/about-us/pilatus-piano-duo', label: t.value.nav.pilatusPianoDuo },
    ],
  },
  { to: '/news',    label: t.value.nav.news    },
  { to: '/gallery', label: t.value.nav.gallery },
  { to: '/video',   label: t.value.nav.video   },
  { to: '/contact', label: t.value.nav.contact },
])

const LOCALES = ['pl', 'en', 'de']

const isActive = (link) => link.children
  ? link.children.some(child => route.path === child.to)
  : route.path === link.to
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
          <template v-for="link in links" :key="link.to">
            <!-- Dropdown (hover on desktop, click for touch devices) -->
            <div
              v-if="link.children"
              class="relative"
              @mouseenter="dropdownOpen = link.to"
              @mouseleave="dropdownOpen = null"
            >
              <button
                type="button"
                class="flex items-center gap-1 text-sm text-[var(--color-muted)] hover:text-white transition-colors"
                :class="{ '!text-primary-400': isActive(link) }"
                :aria-expanded="dropdownOpen === link.to"
                @click="dropdownOpen = dropdownOpen === link.to ? null : link.to"
              >
                {{ link.label }}
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 transition-transform" :class="{ 'rotate-180': dropdownOpen === link.to }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <Transition name="slide">
                <div v-if="dropdownOpen === link.to" class="absolute left-1/2 -translate-x-1/2 top-full pt-3">
                  <div class="min-w-[12rem] rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] py-2 shadow-xl">
                    <RouterLink
                      v-for="child in link.children"
                      :key="child.to"
                      :to="child.to"
                      class="block px-4 py-2 text-sm whitespace-nowrap text-[var(--color-muted)] hover:text-white hover:bg-white/5 transition-colors"
                      :class="{ '!text-primary-400': route.path === child.to }"
                      @click="dropdownOpen = null"
                    >
                      {{ child.label }}
                    </RouterLink>
                  </div>
                </div>
              </Transition>
            </div>

            <RouterLink
              v-else
              :to="link.to"
              class="text-sm text-[var(--color-muted)] hover:text-white transition-colors"
              :class="{ '!text-primary-400': isActive(link) }"
            >
              {{ link.label }}
            </RouterLink>
          </template>

          <!-- Language switch -->
          <div class="flex items-center gap-1 text-xs font-semibold tracking-widest border border-[var(--color-border)] rounded-md px-2.5 py-1">
            <template v-for="(lang, i) in LOCALES" :key="lang">
              <span v-if="i > 0" class="text-[var(--color-border)]">/</span>
              <button
                type="button"
                @click="i18n.setLocale(lang)"
                :class="locale === lang ? 'text-primary-400' : 'text-[var(--color-muted)] hover:text-white'"
                :aria-label="`Switch to ${lang.toUpperCase()}`"
                :aria-current="locale === lang"
              >{{ lang.toUpperCase() }}</button>
            </template>
          </div>
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
        <template v-for="link in links" :key="link.to">
          <div v-if="link.children">
            <span class="block py-2 text-[var(--color-muted)]" :class="{ 'text-primary-400': isActive(link) }">{{ link.label }}</span>
            <RouterLink
              v-for="child in link.children"
              :key="child.to"
              :to="child.to"
              class="block py-2 pl-4 border-l border-[var(--color-border)] ml-1 text-[var(--color-muted)] hover:text-white transition-colors"
              :class="{ 'text-primary-400': route.path === child.to }"
              @click="mobileOpen = false"
            >
              {{ child.label }}
            </RouterLink>
          </div>
          <RouterLink
            v-else
            :to="link.to"
            class="block py-2 text-[var(--color-muted)] hover:text-white transition-colors"
            :class="{ 'text-primary-400': isActive(link) }"
            @click="mobileOpen = false"
          >
            {{ link.label }}
          </RouterLink>
        </template>

        <!-- Lang switch mobile -->
        <div class="flex items-center gap-1.5 text-xs font-semibold tracking-widest pt-2 pb-1">
          <template v-for="(lang, i) in LOCALES" :key="lang">
            <span v-if="i > 0" class="text-[var(--color-border)]">/</span>
            <button
              type="button"
              @click="i18n.setLocale(lang)"
              :class="locale === lang ? 'text-white' : 'text-[var(--color-muted)]'"
            >{{ lang.toUpperCase() }}</button>
          </template>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<style scoped>
.slide-enter-active, .slide-leave-active { transition: all .2s ease; }
.slide-enter-from, .slide-leave-to { opacity: 0; transform: translateY(-8px); }
</style>
