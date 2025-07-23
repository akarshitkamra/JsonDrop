<script setup>
import { ref } from 'vue'
const input = ref('')
const output = ref('')
const error = ref('')
function formatJson() {
    try {
        output.value = JSON.stringify(JSON.parse(input.value), null, 2)
        error.value = ''
    } catch (e) {
        error.value = 'Invalid JSON'
        output.value = ''
    }
}
</script>
<template>
    <div>
        <textarea v-model="input" rows="10" cols="40" placeholder="Paste your JSON here..."></textarea>
        <button @click="formatJson">Format</button>
        <div v-if="error" style="color:red;">{{ error }}</div>
        <pre v-if="output">{{ output }}</pre>
    </div>
</template>
