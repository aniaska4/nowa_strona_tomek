<script setup>
defineProps({
  event: { type: Object, required: true },
})
const emit = defineEmits(['open'])
</script>

<template>
  <article
    class="card hover:border-primary-500 transition-colors group cursor-pointer"
    @click="emit('open', event)"
  >
    <div class="flex items-start gap-4">
      <div class="shrink-0 text-center bg-primary-900/50 rounded-lg px-3 py-2 min-w-[60px]">
        <span class="block text-2xl font-bold text-primary-400 font-serif leading-none">
          {{ new Date(event.date).getDate() }}
        </span>
        <span class="block text-xs text-[var(--color-muted)] uppercase tracking-wider mt-0.5">
          {{ new Date(event.date).toLocaleDateString('pl-PL', { month: 'short' }) }}
        </span>
      </div>
      <div class="flex-1 min-w-0">
        <h3 class="text-white font-serif text-lg group-hover:text-primary-300 transition-colors line-clamp-2">
          {{ event.title }}
        </h3>
        <p class="text-[var(--color-muted)] text-sm mt-1">{{ event.venue }}</p>
        <p v-if="event.city" class="text-[var(--color-muted)] text-sm">{{ event.city }}</p>
        <p v-if="event.description" class="text-[var(--color-muted)] text-sm mt-2 line-clamp-2">
          {{ event.description }}
        </p>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 shrink-0 text-[var(--color-border)] group-hover:text-primary-400 transition-colors mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    </div>
  </article>
</template>
