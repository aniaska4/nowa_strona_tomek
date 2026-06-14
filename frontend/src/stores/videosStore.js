import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '@/services/api'

export const useVideosStore = defineStore('videos', () => {
  const videos  = ref([])
  const loading = ref(false)

  async function fetchVideos() {
    loading.value = true
    try {
      const { data } = await api.get('/videos')
      videos.value = data
    } finally {
      loading.value = false
    }
  }

  async function addVideo(payload) {
    const { data } = await api.post('/videos', payload)
    videos.value.unshift(data)
    return data
  }

  async function deleteVideo(id) {
    await api.delete(`/videos/${id}`)
    videos.value = videos.value.filter(v => v.id !== id)
  }

  return { videos, loading, fetchVideos, addVideo, deleteVideo }
})
