<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useI18nStore } from '@/stores/i18nStore'

const { t } = storeToRefs(useI18nStore())

const statsRef = ref(null)
const counts   = ref([0, 0, 0, 0])
const targets  = [15, 200, 12, 5]
const suffixes = ['+', '+', '', '']
let observer   = null

function animateAll() {
  const duration = 1800
  const startTime = performance.now()
  function tick(now) {
    const elapsed  = now - startTime
    const progress = Math.min(elapsed / duration, 1)
    const eased    = 1 - Math.pow(1 - progress, 3)
    counts.value   = targets.map(t => Math.round(eased * t))
    if (progress < 1) requestAnimationFrame(tick)
  }
  requestAnimationFrame(tick)
}

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        animateAll()
        observer.disconnect()
      }
    },
    { threshold: 0.4 }
  )
  if (statsRef.value) observer.observe(statsRef.value)
})

onUnmounted(() => observer?.disconnect())
</script>

<template>
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
    <div class="grid md:grid-cols-2 gap-16 items-start">
      <!-- Photo -->
      <div class="aspect-[3/4] rounded-2xl overflow-hidden bg-[var(--color-surface)] border border-[var(--color-border)]">
        <img
          :src="'/uploads/1781444286545-33679.jpg'"
          :alt="t.about.photoAlt"
          class="w-full h-full object-cover object-top"
        />
      </div>

      <!-- Bio -->
      <div>
        <p class="text-primary-400 uppercase tracking-[0.3em] text-sm font-medium mb-3">{{ t.about.label }}</p>
        <h1 class="section-title">Tomasz Domański</h1>
        <p class="text-gold-500 font-serif text-lg mb-8">{{ t.about.role }}</p>

        <div class="space-y-4 text-[var(--color-muted)] leading-relaxed">
          <p v-for="(para, i) in t.about.bio" :key="i">{{ para }}</p>
        </div>

        <!-- Animated stats -->
        <div ref="statsRef" class="mt-10 grid grid-cols-2 gap-4">
          <div v-for="(label, i) in t.about.stats" :key="i" class="card text-center">
            <span class="block text-3xl font-serif text-primary-400 font-bold tabular-nums">
              {{ counts[i] }}{{ suffixes[i] }}
            </span>
            <span class="text-[var(--color-muted)] text-sm mt-1 block">{{ label }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
