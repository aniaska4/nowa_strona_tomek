import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '@/services/api'

export const useEventsStore = defineStore('events', () => {
  const upcoming = ref([])
  const archive  = ref([])
  const loading  = ref(false)

  async function fetchUpcoming() {
    loading.value = true
    try {
      const { data } = await api.get('/events?type=upcoming')
      upcoming.value = data
    } finally {
      loading.value = false
    }
  }

  async function fetchArchive() {
    loading.value = true
    try {
      const { data } = await api.get('/events?type=archive')
      archive.value = data
    } finally {
      loading.value = false
    }
  }

  async function createEvent(payload) {
    const { data } = await api.post('/events', payload)
    upcoming.value.unshift(data)
    return data
  }

  async function updateEvent(id, payload) {
    const { data } = await api.put(`/events/${id}`, payload)
    const idx = upcoming.value.findIndex(e => e.id === id)
    if (idx !== -1) upcoming.value[idx] = data
    return data
  }

  async function deleteEvent(id) {
    await api.delete(`/events/${id}`)
    upcoming.value = upcoming.value.filter(e => e.id !== id)
    archive.value  = archive.value.filter(e => e.id !== id)
  }

  return { upcoming, archive, loading, fetchUpcoming, fetchArchive, createEvent, updateEvent, deleteEvent }
})
