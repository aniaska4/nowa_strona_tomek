<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useGalleryStore } from '@/stores/galleryStore'
import { useI18nStore } from '@/stores/i18nStore'
import GalleryItem from '@/components/ui/GalleryItem.vue'

const { t } = storeToRefs(useI18nStore())
const galleryStore = useGalleryStore()
const activeIndex  = ref(null)

const isOpen  = computed(() => activeIndex.value !== null)
const current = computed(() => galleryStore.items[activeIndex.value])
const total   = computed(() => galleryStore.items.length)

onMounted(() => galleryStore.fetchGallery())

function open(item) {
  activeIndex.value = galleryStore.items.findIndex(i => i.id === item.id)
}

function close() {
  activeIndex.value = null
}

function prev() {
  activeIndex.value = (activeIndex.value - 1 + total.value) % total.value
}

function next() {
  activeIndex.value = (activeIndex.value + 1) % total.value
}

function onKey(e) {
  if (!isOpen.value) return
  if (e.key === 'Escape')     close()
  if (e.key === 'ArrowLeft')  prev()
  if (e.key === 'ArrowRight') next()
}

let touchStartX = 0
function onTouchStart(e) { touchStartX = e.touches[0].clientX }
function onTouchEnd(e) {
  const diff = touchStartX - e.changedTouches[0].clientX
  if (Math.abs(diff) > 50) diff > 0 ? next() : prev()
}

onMounted(()  => window.addEventListener('keydown', onKey))
onUnmounted(() => window.removeEventListener('keydown', onKey))
</script>

<template>
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
    <p class="text-primary-400 uppercase tracking-[0.3em] text-sm font-medium mb-3">{{ t.gallery.label }}</p>
    <h1 class="section-title">{{ t.gallery.title }}</h1>
    <p class="section-subtitle">{{ t.gallery.subtitle }}</p>

    <div v-if="galleryStore.loading" class="text-[var(--color-muted)]">{{ t.gallery.loading }}</div>
    <div v-else-if="galleryStore.items.length === 0" class="text-[var(--color-muted)]">
      {{ t.gallery.empty }}
    </div>
    <div v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
      <GalleryItem
        v-for="item in galleryStore.items"
        :key="item.id"
        :item="item"
        @open="open"
      />
    </div>
  </div>

  <!-- Carousel lightbox -->
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-50 bg-black/95 flex flex-col"
        @touchstart.passive="onTouchStart"
        @touchend.passive="onTouchEnd"
      >
        <!-- Top bar -->
        <div class="flex items-center justify-between px-4 py-3 shrink-0">
          <span class="text-white/50 text-sm tabular-nums">
            {{ activeIndex + 1 }} / {{ total }}
          </span>
          <button
            class="text-white/60 hover:text-white transition-colors p-1"
            @click="close"
            :aria-label="t.modal.close"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Image area -->
        <div class="flex-1 flex items-center justify-center relative min-h-0 px-16">
          <!-- Prev -->
          <button
            class="absolute left-2 md:left-4 text-white/50 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
            @click="prev"
            aria-label="Previous"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <!-- Image -->
          <Transition name="slide" mode="out-in">
            <img
              v-if="current"
              :key="current.id"
              :src="`/uploads/${current.filename}`"
              :alt="current.caption || ''"
              class="max-w-full max-h-full object-contain rounded select-none"
              draggable="false"
            />
          </Transition>

          <!-- Next -->
          <button
            class="absolute right-2 md:right-4 text-white/50 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
            @click="next"
            aria-label="Next"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <!-- Caption + dots -->
        <div class="shrink-0 py-4 text-center px-4">
          <p v-if="current?.caption" class="text-white/80 text-sm mb-3">{{ current.caption }}</p>
          <div class="flex justify-center gap-1.5 flex-wrap max-w-xs mx-auto">
            <button
              v-for="(_, i) in galleryStore.items"
              :key="i"
              class="w-1.5 h-1.5 rounded-full transition-colors"
              :class="i === activeIndex ? 'bg-white' : 'bg-white/25 hover:bg-white/50'"
              @click="activeIndex = i"
            />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity .2s ease; }
.fade-enter-from, .fade-leave-to       { opacity: 0; }

.slide-enter-active, .slide-leave-active { transition: opacity .15s ease, transform .15s ease; }
.slide-enter-from { opacity: 0; transform: scale(0.97); }
.slide-leave-to   { opacity: 0; transform: scale(0.97); }
</style>
