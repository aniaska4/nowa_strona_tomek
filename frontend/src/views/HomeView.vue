<script setup>
import { storeToRefs } from 'pinia'
import { RouterLink } from 'vue-router'
import { useI18nStore } from '@/stores/i18nStore'
import homePhoto from '@/assets/images/home.jpg'

const { t } = storeToRefs(useI18nStore())
</script>

<template>
  <section class="relative flex items-center min-h-[calc(100vh-4rem)] overflow-hidden">
    <!-- Background photo (pianist sits on the right side of the frame) -->
    <img
      :src="homePhoto"
      alt=""
      class="absolute inset-0 w-full h-full object-cover object-[72%_center] pointer-events-none select-none"
    />
    <!-- Darkening: uniform on mobile, from the left on desktop so the face stays visible -->
    <div class="absolute inset-0 bg-[#0c1119]/70 md:bg-transparent md:bg-gradient-to-r md:from-[#0c1119]/95 md:via-[#0c1119]/60 md:to-transparent pointer-events-none"></div>
    <div class="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[var(--color-bg)] to-transparent pointer-events-none"></div>

    <div class="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col items-center text-center md:items-start md:text-left">
      <div class="w-px h-14 bg-gradient-to-b from-transparent to-primary-500 mb-8 opacity-70"></div>

      <p class="text-gold-400 uppercase tracking-[0.45em] text-xs font-semibold mb-7 [text-shadow:0_1px_8px_rgba(0,0,0,0.8)]">
        {{ t.home.role }}
      </p>

      <h1 class="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-serif text-white leading-none tracking-tight mb-8">
        Tomasz<br>
        <span class="text-slate-300">Domański</span>
      </h1>

      <div class="w-20 h-px bg-gold-500 mb-8 opacity-80"></div>

      <p class="text-slate-300 text-base md:text-lg max-w-sm leading-relaxed whitespace-pre-line">
        {{ t.home.tagline }}
      </p>

      <div class="mt-10 flex flex-col sm:flex-row gap-4">
        <RouterLink to="/about" class="btn-primary">{{ t.home.btnAbout }}</RouterLink>
        <RouterLink to="/news"  class="btn-ghost">{{ t.home.btnConcerts }}</RouterLink>
      </div>
    </div>
  </section>
</template>
