<script setup>
import { RouterLink } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useI18nStore } from '@/stores/i18nStore'

const { t } = storeToRefs(useI18nStore())
</script>

<template>
  <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
    <p class="text-primary-400 uppercase tracking-[0.3em] text-sm font-medium mb-3">{{ t.aboutUs.label }}</p>
    <h1 class="section-title mb-8">{{ t.aboutUs.title }}</h1>

    <p class="text-lg text-[var(--color-muted)] leading-relaxed mb-12">{{ t.aboutUs.intro }}</p>

    <section v-for="(section, i) in t.aboutUs.sections" :key="i" class="mb-12">
      <h2 class="font-serif text-2xl text-white mb-4">{{ section.heading }}</h2>
      <p class="text-[var(--color-muted)] leading-relaxed">{{ section.text }}</p>
    </section>

    <section>
      <h2 class="font-serif text-2xl text-white mb-6">{{ t.aboutUs.discoverTitle }}</h2>
      <div class="grid sm:grid-cols-2 gap-4">
        <RouterLink to="/pilatus-duo" class="card block hover:border-primary-400 transition-colors">
          <span class="block text-2xl mb-2" aria-hidden="true">🎧</span>
          <span class="block font-serif text-lg text-white mb-1">{{ t.aboutUs.listenTitle }}</span>
          <span class="block text-sm text-[var(--color-muted)]">{{ t.aboutUs.listenText }}</span>
        </RouterLink>
        <RouterLink to="/news" class="card block hover:border-primary-400 transition-colors">
          <span class="block text-2xl mb-2" aria-hidden="true">🎼</span>
          <span class="block font-serif text-lg text-white mb-1">{{ t.aboutUs.concertsTitle }}</span>
          <span class="block text-sm text-[var(--color-muted)]">{{ t.aboutUs.concertsText }}</span>
        </RouterLink>
      </div>
    </section>
  </div>
</template>
