<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const jsonString = ref('')
const error = ref('')
const loading = ref(true)

async function fetchBlob(id) {
  try {
    const res = await $fetch(`/api/blob/${id}`)
    jsonString.value = JSON.stringify(JSON.parse(res.json), null, 2)
    error.value = ''
  } catch {
    error.value = 'Blob not found or invalid JSON.'
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  await fetchBlob(route.params.id)
})
</script>

<template>
  <section class="max-w-4xl mx-auto p-6">
    <h2 class="text-2xl font-semibold mb-4">JsonDrop — Shared JSON Blob</h2>

    <div v-if="loading" class="italic">Loading...</div>
    <div v-else-if="error" class="text-red-600 font-bold">{{ error }}</div>
    <pre v-else class="bg-gray-100 p-4 rounded font-mono whitespace-pre-wrap text-sm shadow-inner">{{ jsonString }}</pre>

    <button @click="router.push('/')" class="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
      Format Your Own JSON
    </button>
  </section>
</template>

<style scoped></style>
