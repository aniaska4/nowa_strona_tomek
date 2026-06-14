<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <section class="relative flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] text-center overflow-hidden px-4">
    <!-- Subtle background grid -->
    <div class="absolute inset-0 pointer-events-none"
      style="background-image: linear-gradient(rgba(30,64,175,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(30,64,175,0.04) 1px, transparent 1px); background-size: 60px 60px;">
    </div>
    <!-- Top fade -->
    <div class="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[var(--color-bg)] to-transparent pointer-events-none"></div>
    <!-- Bottom fade -->
    <div class="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[var(--color-bg)] to-transparent pointer-events-none"></div>

    <div class="relative z-10 flex flex-col items-center">
      <!-- Decorative vertical line -->
      <div class="w-px h-14 bg-gradient-to-b from-transparent to-primary-500 mb-8 opacity-70"></div>

      <p class="text-primary-400 uppercase tracking-[0.45em] text-xs font-semibold mb-7">
        Pianista
      </p>

      <h1 class="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-serif text-white leading-none tracking-tight mb-8">
        Tomasz<br>
        <span class="text-slate-300">Kowalski</span>
      </h1>

      <!-- Gold rule -->
      <div class="w-20 h-px bg-gold-500 mb-8 opacity-80"></div>

      <p class="text-[var(--color-muted)] text-base md:text-lg max-w-sm leading-relaxed">
        Muzyk klasyczny, absolwent Akademii Muzycznej.<br class="hidden md:block">
        Koncertuje na najważniejszych scenach w Polsce i Europie.
      </p>

      <div class="mt-10 flex flex-col sm:flex-row gap-4">
        <RouterLink to="/about" class="btn-primary">O mnie</RouterLink>
        <RouterLink to="/news" class="btn-ghost">Koncerty</RouterLink>
      </div>
    </div>
  </section>
</template>
