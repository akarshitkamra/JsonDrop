<script setup>
import { ref, computed } from 'vue'
import VueJsonPretty from 'vue-json-pretty'
import 'vue-json-pretty/lib/styles.css'

const inputJson = ref(`{
  "user": {
    "name": "Alice",
    "active": true,
    "roles": ["admin", "user"],
    "meta": { "age": 25, "city": "Paris" }
  },
  "list": [1, 2, 3]
}`)

const parseError = ref('')

// Parse JSON or show error
const parsedJson = computed(() => {
  try {
    parseError.value = ''
    return JSON.parse(inputJson.value)
  } catch {
    parseError.value = 'Invalid JSON'
    return {}
  }
})

// Simulate save state/handler
const isSaving = ref(false)
const saveError = ref('')
const shareLink = ref('')

async function saveJson() {
  saveError.value = ''
  if (!inputJson.value) {
    saveError.value = 'No JSON to save'
    return
  }
  // Optionally validate JSON
  try {
    JSON.parse(inputJson.value)
  } catch(e) {
    saveError.value = 'Invalid JSON: ' + e.message
    return
  }

  isSaving.value = true

  try {
    const response = await $fetch('/api/blob', {
      method: 'POST',
      body: { json: inputJson.value }
    })
    if (response.id) {
      shareLink.value = `${window.location.origin}/blob/${response.id}`
      // Optionally navigate or display this link
    } else {
      saveError.value = 'Failed to get blob ID from server'
    }
  } catch (err) {
    saveError.value = 'Save failed: ' + (err.message || err)
  } finally {
    isSaving.value = false
  }
}

</script>

<template>
  <div class="min-h-screen flex flex-col">
    <!-- Sticky header -->
    <header
      class="sticky top-0 z-50 bg-white shadow-md flex items-center justify-between px-6 h-14"
    >
      <div class="flex items-center space-x-3">
        <!-- <img src="/logo.svg" alt="JsonDrop Logo" class="h-8 w-8" /> -->
        <h1 class="text-lg font-semibold select-none">JsonDrop</h1>
      </div>
      <button
        @click="saveJson"
        :disabled="isSaving || !!parseError"
        class="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 disabled:opacity-50 transition"
      >
        <span v-if="isSaving">Saving...</span>
        <span v-else>Save</span>
      </button>
    </header>

    <!-- Main content area -->
    <main class="flex flex-1 p-6 gap-6 overflow-hidden max-h-[75dvh]">
      <!-- JSON Editor -->
      <section class="flex-1 flex flex-col">
        <label for="json-input" class="mb-1 font-medium">JSON Input</label>
        <textarea
          id="json-input"
          v-model="inputJson"
          spellcheck="false"
          rows="25"
          class="flex-grow bg-gray-50 border border-gray-300 rounded p-3 font-mono resize-none focus:outline-blue-500"
          placeholder="Paste or write your JSON here..."
        />
      </section>

      <!-- Collapsible JSON Viewer -->
      <section class="flex-1 flex flex-col">
        <h2 class="mb-1 font-medium">Formatted JSON Tree</h2>
        <div
          class="flex-grow overflow-auto border border-gray-300 rounded p-3 bg-white"
        >
          <vue-json-pretty
            :data="parsedJson"
            :deep="2"
            :showIcon="true"
            :showLength="true"
            :showLineNumber="false"
            :highlightSelectedNode="true"
          />
          <p v-if="parseError" class="mt-2 text-red-600 font-semibold">
            {{ parseError }}
          </p>
        </div>
      </section>
    </main>

    <!-- Optional share link display -->
    <footer v-if="shareLink" class="p-4 bg-blue-50 text-blue-800 text-center select-text">
      Shareable Link: <a :href="shareLink" target="_blank" class="underline">{{ shareLink }}</a>
    </footer>
  </div>
</template>

<style scoped>
/* Smooth scrollbar for tree view */
.section > div::-webkit-scrollbar {
  width: 8px;
}
.section > div::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.12);
  border-radius: 4px;
}
</style>
