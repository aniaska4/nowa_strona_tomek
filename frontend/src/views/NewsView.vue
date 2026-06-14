<script setup>
import { ref, onMounted } from 'vue'
import { useEventsStore } from '@/stores/eventsStore'
import EventCard from '@/components/ui/EventCard.vue'

const eventsStore = useEventsStore()
const activeTab = ref('upcoming')

onMounted(() => {
  eventsStore.fetchUpcoming()
  eventsStore.fetchArchive()
})
</script>

<template>
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
    <p class="text-primary-400 uppercase tracking-[0.3em] text-sm font-medium mb-3">Aktualności</p>
    <h1 class="section-title">Koncerty i wydarzenia</h1>

    <!-- Tabs -->
    <div class="flex gap-1 p-1 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg w-fit mb-10">
      <button
        class="px-5 py-2 rounded-md text-sm font-medium transition-colors"
        :class="activeTab === 'upcoming'
          ? 'bg-primary-600 text-white'
          : 'text-[var(--color-muted)] hover:text-white'"
        @click="activeTab = 'upcoming'"
      >
        Nadchodzące
      </button>
      <button
        class="px-5 py-2 rounded-md text-sm font-medium transition-colors"
        :class="activeTab === 'archive'
          ? 'bg-primary-600 text-white'
          : 'text-[var(--color-muted)] hover:text-white'"
        @click="activeTab = 'archive'"
      >
        Archiwum
      </button>
    </div>

    <!-- Loading -->
    <div v-if="eventsStore.loading" class="text-[var(--color-muted)]">Ładowanie...</div>

    <!-- Upcoming -->
    <template v-else-if="activeTab === 'upcoming'">
      <div v-if="eventsStore.upcoming.length === 0" class="text-[var(--color-muted)]">
        Brak zaplanowanych koncertów.
      </div>
      <div v-else class="grid md:grid-cols-2 gap-4">
        <EventCard
          v-for="event in eventsStore.upcoming"
          :key="event.id"
          :event="event"
        />
      </div>
    </template>

    <!-- Archive -->
    <template v-else>
      <div v-if="eventsStore.archive.length === 0" class="text-[var(--color-muted)]">
        Brak archiwalnych wydarzeń.
      </div>
      <div v-else class="grid md:grid-cols-2 gap-4">
        <EventCard
          v-for="event in eventsStore.archive"
          :key="event.id"
          :event="event"
        />
      </div>
    </template>
  </div>
</template>
