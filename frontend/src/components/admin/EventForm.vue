<script setup>
import { reactive, watch } from 'vue'

const props = defineProps({
  initial: { type: Object, default: null },
})

const emit = defineEmits(['save', 'cancel'])

const form = reactive({
  title:       '',
  date:        '',
  venue:       '',
  city:        '',
  description: '',
})

watch(() => props.initial, (val) => {
  if (val) Object.assign(form, val)
  else Object.assign(form, { title: '', date: '', venue: '', city: '', description: '' })
}, { immediate: true })

function submit() {
  emit('save', { ...form })
}
</script>

<template>
  <div class="card space-y-3 border-primary-700">
    <h3 class="font-serif text-white text-lg">{{ initial ? 'Edytuj koncert' : 'Nowy koncert' }}</h3>

    <div class="grid md:grid-cols-2 gap-3">
      <div>
        <label class="block text-sm text-[var(--color-muted)] mb-1">Tytuł *</label>
        <input v-model="form.title" type="text" class="input-field" required />
      </div>
      <div>
        <label class="block text-sm text-[var(--color-muted)] mb-1">Data *</label>
        <input v-model="form.date" type="date" class="input-field" required />
      </div>
      <div>
        <label class="block text-sm text-[var(--color-muted)] mb-1">Miejsce *</label>
        <input v-model="form.venue" type="text" class="input-field" required placeholder="Filharmonia Narodowa" />
      </div>
      <div>
        <label class="block text-sm text-[var(--color-muted)] mb-1">Miasto</label>
        <input v-model="form.city" type="text" class="input-field" placeholder="Warszawa" />
      </div>
    </div>

    <div>
      <label class="block text-sm text-[var(--color-muted)] mb-1">Opis</label>
      <textarea v-model="form.description" class="input-field resize-none" rows="3"></textarea>
    </div>

    <div class="flex gap-3">
      <button class="btn-primary text-sm" @click="submit">Zapisz</button>
      <button class="btn-ghost text-sm" @click="emit('cancel')">Anuluj</button>
    </div>
  </div>
</template>
