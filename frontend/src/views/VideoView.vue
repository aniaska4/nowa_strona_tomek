<script setup>
import { onMounted } from 'vue'
import { useVideosStore } from '@/stores/videosStore'
import VideoEmbed from '@/components/ui/VideoEmbed.vue'

const videosStore = useVideosStore()

onMounted(() => videosStore.fetchVideos())
</script>

<template>
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
    <p class="text-primary-400 uppercase tracking-[0.3em] text-sm font-medium mb-3">Wideo</p>
    <h1 class="section-title">Nagrania</h1>
    <p class="section-subtitle">Nagrania z koncertów i recitali</p>

    <div v-if="videosStore.loading" class="text-[var(--color-muted)]">Ładowanie...</div>
    <div v-else-if="videosStore.videos.length === 0" class="text-[var(--color-muted)]">
      Brak nagrań wideo.
    </div>
    <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <VideoEmbed
        v-for="video in videosStore.videos"
        :key="video.id"
        :video="video"
      />
    </div>
  </div>
</template>
