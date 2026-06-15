<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { useEventsStore } from '@/stores/eventsStore'
import { useGalleryStore } from '@/stores/galleryStore'
import { useVideosStore } from '@/stores/videosStore'
import EventForm from '@/components/admin/EventForm.vue'
import api, { uploadUrl } from '@/services/api'

const router  = useRouter()
const auth    = useAuthStore()
const events  = useEventsStore()
const gallery = useGalleryStore()
const videos  = useVideosStore()

const tab         = ref('events')
const editingEvent = ref(null)
const showEventForm = ref(false)

// Video form
const videoForm = ref({ title: '', url: '', description: '' })
const videoMsg  = ref('')

// Gallery
const photoInput = ref(null)
const photoCaption = ref('')
const photoMsg  = ref('')

onMounted(() => {
  events.fetchUpcoming()
  events.fetchArchive()
  gallery.fetchGallery()
  videos.fetchVideos()
})

function logout() {
  auth.logout()
  router.push('/')
}

function openNewEvent() {
  editingEvent.value = null
  showEventForm.value = true
}

function openEditEvent(event) {
  editingEvent.value = { ...event }
  showEventForm.value = true
}

async function saveEvent(payload) {
  if (editingEvent.value) {
    await events.updateEvent(editingEvent.value.id, payload)
  } else {
    await events.createEvent(payload)
  }
  showEventForm.value = false
  editingEvent.value  = null
}

async function deleteEvent(id) {
  if (confirm('Usunąć to wydarzenie?')) await events.deleteEvent(id)
}

async function addVideo() {
  videoMsg.value = ''
  try {
    await videos.addVideo(videoForm.value)
    Object.assign(videoForm.value, { title: '', url: '', description: '' })
    videoMsg.value = 'Dodano!'
  } catch {
    videoMsg.value = 'Błąd podczas dodawania.'
  }
}

async function deleteVideo(id) {
  if (confirm('Usunąć ten film?')) await videos.deleteVideo(id)
}

async function uploadPhoto() {
  const file = photoInput.value?.files[0]
  if (!file) return
  const fd = new FormData()
  fd.append('photo', file)
  fd.append('caption', photoCaption.value)
  photoMsg.value = ''
  try {
    await gallery.uploadPhoto(fd)
    photoCaption.value = ''
    photoInput.value.value = ''
    photoMsg.value = 'Dodano!'
  } catch (err) {
    const status = err?.response?.status
    const msg    = err?.response?.data?.error || err?.message || 'nieznany błąd'
    photoMsg.value = `Błąd ${status ?? ''}: ${msg}`
    console.error('Upload error:', err)
  }
}

async function deletePhoto(id) {
  if (confirm('Usunąć to zdjęcie?')) await gallery.deletePhoto(id)
}

const allEvents = () => [...events.upcoming, ...events.archive].sort((a, b) => new Date(b.date) - new Date(a.date))
</script>

<template>
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <!-- Header -->
    <div class="flex items-center justify-between mb-8">
      <h1 class="font-serif text-2xl text-white">Panel administracyjny</h1>
      <button class="btn-ghost text-sm" @click="logout">Wyloguj</button>
    </div>

    <!-- Tab bar -->
    <div class="flex gap-1 p-1 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg w-fit mb-8">
      <button v-for="t in ['events','gallery','videos']" :key="t"
        class="px-4 py-1.5 rounded-md text-sm font-medium capitalize transition-colors"
        :class="tab === t ? 'bg-primary-600 text-white' : 'text-[var(--color-muted)] hover:text-white'"
        @click="tab = t"
      >
        {{ t === 'events' ? 'Koncerty' : t === 'gallery' ? 'Galeria' : 'Wideo' }}
      </button>
    </div>

    <!-- EVENTS -->
    <section v-if="tab === 'events'">
      <div class="flex items-center justify-between mb-4">
        <h2 class="font-serif text-xl text-white">Koncerty</h2>
        <button class="btn-primary text-sm" @click="openNewEvent">+ Dodaj koncert</button>
      </div>

      <EventForm
        v-if="showEventForm"
        :initial="editingEvent"
        @save="saveEvent"
        @cancel="showEventForm = false"
        class="mb-6"
      />

      <div class="space-y-3">
        <div v-for="event in allEvents()" :key="event.id"
          class="card flex items-center justify-between gap-4"
        >
          <div class="min-w-0">
            <p class="text-white font-medium truncate">{{ event.title }}</p>
            <p class="text-[var(--color-muted)] text-sm">{{ event.date }} · {{ event.venue }}</p>
          </div>
          <div class="flex gap-2 shrink-0">
            <button class="btn-ghost text-xs px-3 py-1" @click="openEditEvent(event)">Edytuj</button>
            <button class="px-3 py-1 text-xs border border-red-700 text-red-400 hover:bg-red-700 hover:text-white rounded-lg transition-colors" @click="deleteEvent(event.id)">Usuń</button>
          </div>
        </div>
      </div>
    </section>

    <!-- GALLERY -->
    <section v-else-if="tab === 'gallery'">
      <h2 class="font-serif text-xl text-white mb-4">Galeria</h2>

      <div class="card mb-6 space-y-3">
        <h3 class="text-white font-medium">Dodaj zdjęcie</h3>
        <input ref="photoInput" type="file" accept="image/*" class="text-[var(--color-muted)] text-sm" />
        <input v-model="photoCaption" type="text" class="input-field" placeholder="Podpis (opcjonalnie)" />
        <button class="btn-primary text-sm" @click="uploadPhoto">Prześlij</button>
        <p v-if="photoMsg" class="text-sm" :class="photoMsg === 'Dodano!' ? 'text-green-400' : 'text-red-400'">{{ photoMsg }}</p>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div v-for="item in gallery.items" :key="item.id" class="group relative aspect-square rounded-xl overflow-hidden border border-[var(--color-border)]">
          <img :src="uploadUrl(item.filename)" :alt="item.caption" class="w-full h-full object-cover" />
          <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <button class="px-3 py-1 text-xs border border-red-500 text-red-400 hover:bg-red-600 hover:text-white rounded transition-colors" @click="deletePhoto(item.id)">Usuń</button>
          </div>
        </div>
      </div>
    </section>

    <!-- VIDEOS -->
    <section v-else>
      <h2 class="font-serif text-xl text-white mb-4">Wideo</h2>

      <div class="card mb-6 space-y-3">
        <h3 class="text-white font-medium">Dodaj film</h3>
        <input v-model="videoForm.title" type="text" class="input-field" placeholder="Tytuł" />
        <input v-model="videoForm.url" type="url" class="input-field" placeholder="Link YouTube" />
        <input v-model="videoForm.description" type="text" class="input-field" placeholder="Opis (opcjonalnie)" />
        <button class="btn-primary text-sm" @click="addVideo">Dodaj</button>
        <p v-if="videoMsg" class="text-sm" :class="videoMsg === 'Dodano!' ? 'text-green-400' : 'text-red-400'">{{ videoMsg }}</p>
      </div>

      <div class="space-y-3">
        <div v-for="video in videos.videos" :key="video.id" class="card flex items-center justify-between gap-4">
          <div class="min-w-0">
            <p class="text-white font-medium truncate">{{ video.title }}</p>
            <p class="text-[var(--color-muted)] text-sm truncate">{{ video.url }}</p>
          </div>
          <button class="px-3 py-1 text-xs border border-red-700 text-red-400 hover:bg-red-700 hover:text-white rounded-lg transition-colors shrink-0" @click="deleteVideo(video.id)">Usuń</button>
        </div>
      </div>
    </section>
  </div>
</template>
