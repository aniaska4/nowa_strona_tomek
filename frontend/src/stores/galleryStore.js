import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '@/services/api'

export const useGalleryStore = defineStore('gallery', () => {
  const items   = ref([])
  const loading = ref(false)

  async function fetchGallery() {
    loading.value = true
    try {
      const { data } = await api.get('/gallery')
      items.value = data
    } finally {
      loading.value = false
    }
  }

  async function uploadPhoto(formData) {
    const { data } = await api.post('/gallery', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    items.value.unshift(data)
    return data
  }

  async function deletePhoto(id) {
    await api.delete(`/gallery/${id}`)
    items.value = items.value.filter(i => i.id !== id)
  }

  return { items, loading, fetchGallery, uploadPhoto, deletePhoto }
})
