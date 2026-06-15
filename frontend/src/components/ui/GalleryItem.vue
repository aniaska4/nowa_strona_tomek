<script setup>
import { uploadUrl } from '@/services/api'

defineProps({
  item: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['open'])
</script>

<template>
  <div
    class="group relative aspect-square overflow-hidden rounded-xl cursor-pointer border border-[var(--color-border)] hover:border-primary-500 transition-colors"
    @click="emit('open', item)"
  >
    <img
      :src="uploadUrl(item.filename)"
      :alt="item.caption || 'Galeria'"
      class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      loading="lazy"
    />
    <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
      <p v-if="item.caption" class="text-white text-sm line-clamp-2">{{ item.caption }}</p>
    </div>
  </div>
</template>
