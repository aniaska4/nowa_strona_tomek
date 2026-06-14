<script setup>
import { ref, onMounted } from 'vue'
import { useGalleryStore } from '@/stores/galleryStore'
import GalleryItem from '@/components/ui/GalleryItem.vue'

const galleryStore = useGalleryStore()
const lightbox = ref(null)

onMounted(() => galleryStore.fetchGallery())

function openLightbox(item) {
  lightbox.value = item
}

function closeLightbox() {
  lightbox.value = null
}
</script>

<template>
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
    <p class="text-primary-400 uppercase tracking-[0.3em] text-sm font-medium mb-3">Galeria</p>
    <h1 class="section-title">Zdjęcia</h1>
    <p class="section-subtitle">Fotografie z koncertów i wydarzeń muzycznych</p>

    <div v-if="galleryStore.loading" class="text-[var(--color-muted)]">Ładowanie...</div>
    <div v-else-if="galleryStore.items.length === 0" class="text-[var(--color-muted)]">
      Galeria jest pusta.
    </div>
    <div v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
      <GalleryItem
        v-for="item in galleryStore.items"
        :key="item.id"
        :item="item"
        @open="openLightbox"
      />
    </div>
  </div>

  <!-- Lightbox -->
  <Teleport to="body">
    <div
      v-if="lightbox"
      class="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
      @click.self="closeLightbox"
    >
      <button
        class="absolute top-4 right-4 text-white hover:text-primary-400 transition-colors"
        @click="closeLightbox"
        aria-label="Zamknij"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <div class="max-w-4xl w-full">
        <img
          :src="`/uploads/${lightbox.filename}`"
          :alt="lightbox.caption"
          class="w-full max-h-[80vh] object-contain rounded-lg"
        />
        <p v-if="lightbox.caption" class="text-white text-center mt-3">{{ lightbox.caption }}</p>
      </div>
    </div>
  </Teleport>
</template>
