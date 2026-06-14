<script setup>
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useEventsStore } from '@/stores/eventsStore'
import { useI18nStore } from '@/stores/i18nStore'
import EventCard from '@/components/ui/EventCard.vue'
import EventModal from '@/components/ui/EventModal.vue'

const { t } = storeToRefs(useI18nStore())
const eventsStore   = useEventsStore()
const activeTab     = ref('upcoming')
const selectedEvent = ref(null)

onMounted(() => {
  eventsStore.fetchUpcoming()
  eventsStore.fetchArchive()
})
</script>

<template>
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
    <p class="text-primary-400 uppercase tracking-[0.3em] text-sm font-medium mb-3">{{ t.news.label }}</p>
    <h1 class="section-title">{{ t.news.title }}</h1>

    <!-- Tabs -->
    <div class="flex gap-1 p-1 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg w-fit mb-10">
      <button
        class="px-5 py-2 rounded-md text-sm font-medium transition-colors"
        :class="activeTab === 'upcoming'
          ? 'bg-primary-600 text-white'
          : 'text-[var(--color-muted)] hover:text-white'"
        @click="activeTab = 'upcoming'"
      >
        {{ t.news.upcoming }}
      </button>
      <button
        class="px-5 py-2 rounded-md text-sm font-medium transition-colors"
        :class="activeTab === 'archive'
          ? 'bg-primary-600 text-white'
          : 'text-[var(--color-muted)] hover:text-white'"
        @click="activeTab = 'archive'"
      >
        {{ t.news.archive }}
      </button>
    </div>

    <!-- Loading -->
    <div v-if="eventsStore.loading" class="text-[var(--color-muted)]">{{ t.news.loading }}</div>

    <!-- Upcoming -->
    <template v-else-if="activeTab === 'upcoming'">
      <div v-if="eventsStore.upcoming.length === 0" class="text-[var(--color-muted)]">
        {{ t.news.emptyUpcoming }}
      </div>
      <div v-else class="grid md:grid-cols-2 gap-4">
        <EventCard
          v-for="event in eventsStore.upcoming"
          :key="event.id"
          :event="event"
          @open="selectedEvent = $event"
        />
      </div>
    </template>

    <!-- Archive -->
    <template v-else>
      <div v-if="eventsStore.archive.length === 0" class="text-[var(--color-muted)]">
        {{ t.news.emptyArchive }}
      </div>
      <div v-else class="grid md:grid-cols-2 gap-4">
        <EventCard
          v-for="event in eventsStore.archive"
          :key="event.id"
          :event="event"
          @open="selectedEvent = $event"
        />
      </div>
    </template>

    <EventModal :event="selectedEvent" @close="selectedEvent = null" />
  </div>
</template>
