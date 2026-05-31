<template>
  <div class="min-h-screen bg-slate-900 text-white">
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-4xl font-bold text-center mb-8">Emotion Entry</h1>
      
      <!-- Form Section -->
      <div class="max-w-2xl mx-auto bg-slate-800 rounded-lg p-6 mb-8">
        <h2 class="text-2xl font-semibold mb-4">{{ isEditing ? 'Edit Entry' : 'Add New Entry' }}</h2>
        
        <!-- Emotion Name -->
        <div class="mb-4">
          <label class="block text-sm font-medium mb-2">Emotions</label>
          <EmotionWheel v-model="form.emotions" />
        </div>
        
        <!-- Intensity Slider -->
        <div class="mb-4">
          <label class="block text-sm font-medium mb-2">
            Intensity: {{ form.intensity }}/10
          </label>
          <input 
            v-model="form.intensity"
            type="range"
            min="1"
            max="10"
            class="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
          >
        </div>
        
        <!-- Note -->
        <div class="mb-4">
          <label class="block text-sm font-medium mb-2">Short Note</label>
          <textarea 
            v-model="form.note"
            placeholder="What happened? How do you feel?"
            rows="3"
            class="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white resize-none"
          ></textarea>
        </div>

        <!-- Physical Sensations -->
        <div class="mb-4">
          <label class="block text-sm font-medium mb-2">Physical Sensations</label>
          <PhysicalSensations v-model="form.physicalSensations" />
        </div>

        <!-- Triggers -->
        <div class="mb-4">
          <label class="block text-sm font-medium mb-2">Triggers</label>
          <input 
            v-model="form.triggers"
            type="text"
            placeholder="What caused this emotion?"
            class="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
          >
        </div>

        <!-- Location -->
        <div class="mb-4">
          <label class="block text-sm font-medium mb-2">Location</label>
          <input 
            v-model="form.location"
            type="text"
            placeholder="Where are you?"
            class="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
          >
        </div>

        <!-- Time of Day -->
        <div class="mb-4">
          <label class="block text-sm font-medium mb-2">Time of Day</label>
          <select 
            v-model="form.timeOfDay"
            class="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
          >
            <option value="">Select time...</option>
            <option value="Morning">Morning</option>
            <option value="Afternoon">Afternoon</option>
            <option value="Evening">Evening</option>
            <option value="Night">Night</option>
          </select>
        </div>

        <!-- Coping Strategies -->
        <div class="mb-4">
          <label class="block text-sm font-medium mb-2">Coping Strategies Used</label>
          <CopingStrategies v-model="form.copingStrategies" />
        </div>

        <!-- Duration -->
        <div class="mb-4">
          <label class="block text-sm font-medium mb-2">Duration</label>
          <select 
            v-model="form.duration"
            class="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
          >
            <option value="">Select duration...</option>
            <option value="Minutes">Minutes</option>
            <option value="Hours">Hours</option>
            <option value="All Day">All Day</option>
            <option value="Multiple Days">Multiple Days</option>
          </select>
        </div>

        <!-- Social Context -->
        <div class="mb-4">
          <label class="block text-sm font-medium mb-2">Social Context</label>
          <select 
            v-model="form.socialContext"
            class="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
          >
            <option value="">Select context...</option>
            <option value="Alone">Alone</option>
            <option value="With Family">With Family</option>
            <option value="With Friends">With Friends</option>
            <option value="With Coworkers">With Coworkers</option>
            <option value="With Partner">With Partner</option>
            <option value="Public Setting">Public Setting</option>
          </select>
        </div>

        <!-- Sleep Quality -->
        <div class="mb-4">
          <label class="block text-sm font-medium mb-2">Sleep Quality Last Night</label>
          <select 
            v-model="form.sleepQuality"
            class="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
          >
            <option value="">Select quality...</option>
            <option value="Very Poor">Very Poor</option>
            <option value="Poor">Poor</option>
            <option value="Fair">Fair</option>
            <option value="Good">Good</option>
            <option value="Excellent">Excellent</option>
          </select>
        </div>

        <!-- Energy Level -->
        <div class="mb-4">
          <label class="block text-sm font-medium mb-2">Energy Level</label>
          <select 
            v-model="form.energyLevel"
            class="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
          >
            <option value="">Select level...</option>
            <option value="Very Low">Very Low</option>
            <option value="Low">Low</option>
            <option value="Moderate">Moderate</option>
            <option value="High">High</option>
            <option value="Very High">Very High</option>
          </select>
        </div>
        
        <!-- Save Button -->
        <div class="flex gap-2">
          <button 
            @click="saveEntry"
            class="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            {{ isEditing ? 'Update Entry' : 'Save Entry' }}
          </button>
          <button 
            v-if="isEditing"
            @click="cancelEdit"
            class="flex-1 bg-slate-600 hover:bg-slate-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
      
      <!-- Saved Entries List -->
      <div class="max-w-2xl mx-auto bg-slate-800 rounded-lg p-6">
        <h2 class="text-2xl font-semibold mb-4">Saved Entries ({{ entries.length }})</h2>
        
        <div v-if="entries.length === 0" class="text-slate-400 text-center py-4">
          No entries yet. Add your first emotion above!
        </div>
        
        <div v-else class="space-y-3">
          <div 
            v-for="entry in entries" 
            :key="entry.id"
            class="bg-slate-700 rounded-lg p-4"
          >
            <div class="flex justify-between items-start mb-2">
              <h3 class="font-semibold text-lg">{{ entry.emotion }}</h3>
              <span class="bg-blue-600 px-2 py-1 rounded text-sm">
                Intensity: {{ entry.intensity }}/10
              </span>
            </div>
            <p class="text-slate-300 text-sm mb-2">{{ entry.note }}</p>
            <p class="text-slate-500 text-xs">
              {{ formatDate(entry.createdAt) }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useEntriesStore } from '../stores/entries'
import EmotionWheel from '../components/EmotionWheel.vue'
import PhysicalSensations from '../components/PhysicalSensations.vue'
import CopingStrategies from '../components/CopingStrategies.vue'

const route = useRoute()
const router = useRouter()
const entriesStore = useEntriesStore()

// Form data
const form = ref({
  emotions: [],
  intensity: 5,
  note: '',
  physicalSensations: [],
  triggers: '',
  location: '',
  timeOfDay: '',
  copingStrategies: [],
  duration: '',
  socialContext: '',
  sleepQuality: '',
  energyLevel: ''
})

// Get entries from store
const entries = entriesStore.entries

// Check if we're in edit mode
const isEditing = computed(() => !!route.query.editId)

// Load entry data if editing
onMounted(() => {
  if (isEditing.value) {
    const entryToEdit = entries.value?.find(e => e.id === parseInt(route.query.editId))
    if (entryToEdit) {
      form.value = {
        emotions: Array.isArray(entryToEdit.emotions) ? entryToEdit.emotions : (entryToEdit.emotion ? [entryToEdit.emotion] : []),
        intensity: entryToEdit.intensity,
        note: entryToEdit.note,
        physicalSensations: Array.isArray(entryToEdit.physicalSensations) ? entryToEdit.physicalSensations : (entryToEdit.physicalSensations ? [entryToEdit.physicalSensations] : []),
        triggers: entryToEdit.triggers || '',
        location: entryToEdit.location || '',
        timeOfDay: entryToEdit.timeOfDay || '',
        copingStrategies: Array.isArray(entryToEdit.copingStrategies) ? entryToEdit.copingStrategies : (entryToEdit.copingStrategies ? [entryToEdit.copingStrategies] : []),
        duration: entryToEdit.duration || '',
        socialContext: entryToEdit.socialContext || '',
        sleepQuality: entryToEdit.sleepQuality || '',
        energyLevel: entryToEdit.energyLevel || ''
      }
    }
  }
})

// Save entry function
async function saveEntry() {
  if (!form.value.emotions || form.value.emotions.length === 0) {
    window.showToast('Please select at least one emotion', 'error')
    return
  }
  
  try {
    if (isEditing.value) {
      // Update existing entry
      await entriesStore.updateEntry(parseInt(route.query.editId), {
        emotions: form.value.emotions,
        intensity: form.value.intensity,
        note: form.value.note,
        physicalSensations: form.value.physicalSensations,
        triggers: form.value.triggers,
        location: form.value.location,
        timeOfDay: form.value.timeOfDay,
        copingStrategies: form.value.copingStrategies,
        duration: form.value.duration,
        socialContext: form.value.socialContext,
        sleepQuality: form.value.sleepQuality,
        energyLevel: form.value.energyLevel
      })
      window.showToast('Entry updated successfully!')
      router.push('/history')
    } else {
      // Create new entry
      await entriesStore.saveEntry({
        emotions: form.value.emotions,
        intensity: form.value.intensity,
        note: form.value.note,
        physicalSensations: form.value.physicalSensations,
        triggers: form.value.triggers,
        location: form.value.location,
        timeOfDay: form.value.timeOfDay,
        copingStrategies: form.value.copingStrategies,
        duration: form.value.duration,
        socialContext: form.value.socialContext,
        sleepQuality: form.value.sleepQuality,
        energyLevel: form.value.energyLevel
      })
      
      // Clear form after saving
      form.value = {
        emotions: [],
        intensity: 5,
        note: '',
        physicalSensations: [],
        triggers: '',
        location: '',
        timeOfDay: '',
        copingStrategies: [],
        duration: '',
        socialContext: '',
        sleepQuality: '',
        energyLevel: ''
      }
      
      window.showToast('Entry saved successfully!')
    }
  } catch (error) {
    window.showToast('Error saving entry: ' + error.message, 'error')
  }
}

// Cancel edit and go back to history
function cancelEdit() {
  router.push('/history')
}

// Format date for display
function formatDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleString()
}
</script>
