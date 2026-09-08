import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '@/services/api'

const CATEGORY = 'pilatus_duo'

export const usePilatusStore = defineStore('pilatus', () => {
  const text    = ref('')
  const photos  = ref([])
  const videos  = ref([])
  const loading = ref(false)

  async function fetchAll() {
    loading.value = true
    try {
      const [contentRes, photosRes, videosRes] = await Promise.all([
        api.get(`/content/${CATEGORY}`),
        api.get('/gallery', { params: { category: CATEGORY } }),
        api.get('/videos',  { params: { category: CATEGORY } }),
      ])
      text.value   = contentRes.data.text || ''
      photos.value = photosRes.data
      videos.value = videosRes.data
    } finally {
      loading.value = false
    }
  }

  async function updateText(newText) {
    const { data } = await api.put(`/content/${CATEGORY}`, { text: newText })
    text.value = data.text
  }

  async function uploadPhoto(formData) {
    formData.append('category', CATEGORY)
    const { data } = await api.post('/gallery', formData)
    photos.value.unshift(data)
    return data
  }

  async function deletePhoto(id) {
    await api.delete(`/gallery/${id}`)
    photos.value = photos.value.filter((p) => p.id !== id)
  }

  async function addVideo(payload) {
    const { data } = await api.post('/videos', { ...payload, category: CATEGORY })
    videos.value.unshift(data)
    return data
  }

  async function deleteVideo(id) {
    await api.delete(`/videos/${id}`)
    videos.value = videos.value.filter((v) => v.id !== id)
  }

  return { text, photos, videos, loading, fetchAll, updateText, uploadPhoto, deletePhoto, addVideo, deleteVideo }
})
