<script setup>
import { computed } from 'vue'

const props = defineProps({
  video: {
    type: Object,
    required: true,
  },
})

function extractYouTubeId(url) {
  const match = url.match(/(?:v=|youtu\.be\/|embed\/)([A-Za-z0-9_-]{11})/)
  return match ? match[1] : null
}

const videoId  = computed(() => extractYouTubeId(props.video.url))
const embedUrl = computed(() => `https://www.youtube-nocookie.com/embed/${videoId.value}`)
const thumbUrl = computed(() => videoId.value ? `https://img.youtube.com/vi/${videoId.value}/hqdefault.jpg` : '')
</script>

<template>
  <div class="card overflow-hidden p-0 group">
    <div class="relative aspect-video bg-black">
      <iframe
        v-if="videoId"
        :src="embedUrl"
        :title="video.title"
        class="w-full h-full"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
      <div v-else class="w-full h-full flex items-center justify-center text-[var(--color-muted)]">
        Nieprawidłowy link
      </div>
    </div>
    <div class="p-4">
      <h3 class="text-white font-serif text-base group-hover:text-primary-300 transition-colors">
        {{ video.title }}
      </h3>
      <p v-if="video.description" class="text-[var(--color-muted)] text-sm mt-1 line-clamp-2">
        {{ video.description }}
      </p>
    </div>
  </div>
</template>
