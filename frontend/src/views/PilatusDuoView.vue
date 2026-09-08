<script setup>
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { usePilatusStore } from '@/stores/pilatusStore'
import { useI18nStore } from '@/stores/i18nStore'
import GalleryItem from '@/components/ui/GalleryItem.vue'
import VideoEmbed from '@/components/ui/VideoEmbed.vue'
import { uploadUrl } from '@/services/api'

const { t } = storeToRefs(useI18nStore())
const pilatus = usePilatusStore()
const lightboxItem = ref(null)

onMounted(() => pilatus.fetchAll())
</script>

<template>
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
    <h1 class="section-title">Pilatus Duo</h1>

    <div v-if="pilatus.loading" class="text-[var(--color-muted)]">{{ t.gallery.loading }}</div>

    <template v-else>
      <p v-if="pilatus.text" class="text-[var(--color-muted)] leading-relaxed max-w-2xl whitespace-pre-line mb-14">
        {{ pilatus.text }}
      </p>

      <template v-if="pilatus.photos.length">
        <h2 class="font-serif text-xl text-white mb-4">{{ t.gallery.title }}</h2>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-14">
          <GalleryItem
            v-for="item in pilatus.photos"
            :key="item.id"
            :item="item"
            @open="lightboxItem = item"
          />
        </div>
      </template>

      <template v-if="pilatus.videos.length">
        <h2 class="font-serif text-xl text-white mb-4">{{ t.video.title }}</h2>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <VideoEmbed v-for="video in pilatus.videos" :key="video.id" :video="video" />
        </div>
      </template>
    </template>
  </div>

  <!-- Simple single-image lightbox -->
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="lightboxItem"
        class="fixed inset-0 z-50 bg-black/95 flex flex-col"
        @click.self="lightboxItem = null"
      >
        <div class="flex justify-end px-4 py-3 shrink-0">
          <button
            class="text-white/60 hover:text-white transition-colors p-1"
            @click="lightboxItem = null"
            :aria-label="t.modal.close"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="flex-1 flex items-center justify-center min-h-0 px-4 pb-4">
          <img
            :src="uploadUrl(lightboxItem.filename)"
            :alt="lightboxItem.caption || ''"
            class="max-w-full max-h-full object-contain rounded select-none"
          />
        </div>
        <p v-if="lightboxItem.caption" class="text-white/80 text-sm text-center pb-4 shrink-0">{{ lightboxItem.caption }}</p>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity .2s ease; }
.fade-enter-from, .fade-leave-to       { opacity: 0; }
</style>
