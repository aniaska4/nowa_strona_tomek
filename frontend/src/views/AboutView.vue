<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

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
      <!-- Photo placeholder -->
      <div class="aspect-[3/4] rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] flex items-center justify-center">
        <span class="text-[var(--color-muted)] text-sm">Zdjęcie artysty</span>
      </div>

      <!-- Bio -->
      <div>
        <p class="text-primary-400 uppercase tracking-[0.3em] text-sm font-medium mb-3">O mnie</p>
        <h1 class="section-title">Tomasz Kowalski</h1>
        <p class="text-gold-500 font-serif text-lg mb-8">Pianista</p>

        <div class="space-y-4 text-[var(--color-muted)] leading-relaxed">
          <p>
            Tomasz Kowalski – pianista urodzony w Krakowie, absolwent Akademii Muzycznej im. Karola Szymanowskiego
            w klasie fortepianu. Swoją edukację kontynuował w Hochschule für Musik w Berlinie.
          </p>
          <p>
            Laureat licznych konkursów pianistycznych, m.in. Ogólnopolskiego Konkursu Pianistycznego im. F. Chopina.
            Koncertuje regularnie w Polsce i za granicą, współpracując z czołowymi orkiestrami i filharmoniami.
          </p>
          <p>
            Jego repertuar obejmuje muzykę baroku, klasycyzmu i romantyzmu, ze szczególnym uwzględnieniem dzieł
            Fryderyka Chopina, Franza Liszta i Ludwiga van Beethovena.
          </p>
        </div>

        <!-- Animated facts -->
        <div ref="statsRef" class="mt-10 grid grid-cols-2 gap-4">
          <div class="card text-center">
            <span class="block text-3xl font-serif text-primary-400 font-bold tabular-nums">
              {{ counts[0] }}{{ suffixes[0] }}
            </span>
            <span class="text-[var(--color-muted)] text-sm mt-1 block">lat na scenie</span>
          </div>
          <div class="card text-center">
            <span class="block text-3xl font-serif text-primary-400 font-bold tabular-nums">
              {{ counts[1] }}{{ suffixes[1] }}
            </span>
            <span class="text-[var(--color-muted)] text-sm mt-1 block">koncertów</span>
          </div>
          <div class="card text-center">
            <span class="block text-3xl font-serif text-primary-400 font-bold tabular-nums">
              {{ counts[2] }}{{ suffixes[2] }}
            </span>
            <span class="text-[var(--color-muted)] text-sm mt-1 block">krajów</span>
          </div>
          <div class="card text-center">
            <span class="block text-3xl font-serif text-primary-400 font-bold tabular-nums">
              {{ counts[3] }}{{ suffixes[3] }}
            </span>
            <span class="text-[var(--color-muted)] text-sm mt-1 block">nagród</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
