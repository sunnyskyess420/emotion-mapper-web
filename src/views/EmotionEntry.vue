<template>
  <div class="min-h-screen zen-background text-[#e7edf2]">
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-4xl zen-heading text-center mb-8 bg-gradient-to-r from-[#a996c2] to-[#8faa98] bg-clip-text text-transparent">Emotion Entry</h1>
      
      <!-- Form Section -->
      <div class="max-w-2xl mx-auto zen-card p-6 mb-8">
        <h2 class="text-2xl zen-heading mb-4">{{ isEditing ? 'Edit Entry' : 'Add New Entry' }}</h2>
        
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
            class="w-full px-4 py-2 zen-input resize-none"
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
          <select 
            v-if="!triggersCustomMode"
            v-model="form.triggers"
            @change="handleTriggersChange"
            class="w-full px-4 py-2 zen-select"
          >
            <option value="">Select trigger...</option>
            <option
              v-for="trigger in savedTriggers"
              :key="trigger.id"
              :value="trigger.value"
            >
              {{ trigger.value }}
            </option>
            <option value="__custom__">Custom...</option>
          </select>
          <input 
            v-else
            v-model="form.triggers"
            type="text"
            placeholder="Enter custom trigger..."
            class="w-full px-4 py-2 zen-input"
          >
          <div v-if="savedTriggers.length > 0" class="flex flex-wrap gap-2 mt-2">
            <span
              v-for="trigger in savedTriggers"
              :key="trigger.id"
              @click="selectTrigger(trigger.value)"
              class="zen-tag px-3 py-1 cursor-pointer flex items-center gap-1"
            >
              {{ trigger.value }}
              <button
                @click.stop="deleteTriggerSuggestion(trigger.id)"
                class="text-slate-400 hover:text-red-400 ml-1"
              >
                ×
              </button>
            </span>
          </div>
        </div>

        <!-- Location -->
        <div class="mb-4">
          <label class="block text-sm font-medium mb-2">Location</label>
          <select 
            v-if="!locationCustomMode"
            v-model="form.location"
            @change="handleLocationChange"
            class="w-full px-4 py-2 zen-select"
          >
            <option value="">Select location...</option>
            <option
              v-for="location in savedLocations"
              :key="location.id"
              :value="location.value"
            >
              {{ location.value }}
            </option>
            <option value="__custom__">Custom...</option>
          </select>
          <input 
            v-else
            v-model="form.location"
            type="text"
            placeholder="Enter custom location..."
            class="w-full px-4 py-2 zen-input"
          >
          <div v-if="savedLocations.length > 0" class="flex flex-wrap gap-2 mt-2">
            <span
              v-for="location in savedLocations"
              :key="location.id"
              @click="selectLocation(location.value)"
              class="zen-tag px-3 py-1 cursor-pointer flex items-center gap-1"
            >
              {{ location.value }}
              <button
                @click.stop="deleteLocationSuggestion(location.id)"
                class="text-slate-400 hover:text-red-400 ml-1"
              >
                ×
              </button>
            </span>
          </div>
        </div>

        <!-- Time of Day -->
        <div class="mb-4">
          <label class="block text-sm font-medium mb-2">Time of Day</label>
          <select 
            v-model="form.timeOfDay"
            class="w-full px-4 py-2 zen-select"
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
            class="w-full px-4 py-2 zen-select"
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
            class="w-full px-4 py-2 zen-select"
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
            class="w-full px-4 py-2 zen-select"
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
            class="w-full px-4 py-2 zen-select"
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
            class="flex-1 zen-button-primary font-semibold py-2 px-4"
          >
            {{ isEditing ? 'Update Entry' : 'Save Entry' }}
          </button>
          <button 
            v-if="isEditing"
            @click="cancelEdit"
            class="flex-1 zen-button font-semibold py-2 px-4"
          >
            Cancel
          </button>
        </div>
      </div>
      
      <!-- Saved Entries List -->
      <div class="max-w-2xl mx-auto zen-card p-6">
        <h2 class="text-2xl zen-heading mb-4">Saved Entries ({{ entries.length }})</h2>
        
        <div v-if="entries.length === 0" class="text-[#b9c3cc] text-center py-4">
          No entries yet. Add your first emotion above!
        </div>
        
        <div v-else class="space-y-3">
          <div 
            v-for="entry in entries" 
            :key="entry.id"
            class="bg-[#24303a] rounded-lg p-4"
          >
            <div class="flex justify-between items-start mb-2">
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="emotion in getEmotions(entry)"
                  :key="emotion"
                  class="zen-tag px-3 py-1 text-sm font-semibold"
                >
                  {{ emotion }}
                </span>
              </div>
              <span class="zen-tag px-2 py-1 text-sm">
                Intensity: {{ entry.intensity }}/10
              </span>
            </div>
            <p class="text-[#b9c3cc] text-sm mb-2">{{ entry.note }}</p>
            <p class="text-[#6b7a85] text-xs">
              {{ formatDate(entry.createdAt) }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useEntriesStore } from '../stores/entries'
import EmotionWheel from '../components/EmotionWheel.vue'
import PhysicalSensations from '../components/PhysicalSensations.vue'
import CopingStrategies from '../components/CopingStrategies.vue'
import {
  getTriggerSuggestions,
  getLocationSuggestions,
  deleteTriggerSuggestion as deleteTrigger,
  deleteLocationSuggestion as deleteLocation,
  saveTriggerSuggestion,
  saveLocationSuggestion,
  initDatabase
} from '../db/database'

const route = useRoute()
const router = useRouter()
const entriesStore = useEntriesStore()
const { entries } = storeToRefs(entriesStore)

// Saved suggestions
const savedTriggers = ref([])
const savedLocations = ref([])

// Custom input state
const triggersCustomMode = ref(false)
const locationCustomMode = ref(false)

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

// Check if we're in edit mode
const isEditing = computed(() => !!route.query.editId)

// Get emotions from entry (handles both old string format and new array format)
function getEmotions(entry) {
  if (Array.isArray(entry.emotions)) {
    return entry.emotions
  }
  // Backward compatibility: if old entry has emotion string, convert to array
  if (entry.emotion) {
    return [entry.emotion]
  }
  return []
}

// Load saved suggestions
async function loadSavedSuggestions() {
  const db = await initDatabase()
  savedTriggers.value = await getTriggerSuggestions()
  savedLocations.value = await getLocationSuggestions()
}

// Delete suggestion functions
async function deleteTriggerSuggestion(id) {
  await deleteTrigger(id)
  await loadSavedSuggestions()
}

async function deleteLocationSuggestion(id) {
  await deleteLocation(id)
  await loadSavedSuggestions()
}

// Handle dropdown changes
function handleTriggersChange(value) {
  if (value === '__custom__') {
    triggersCustomMode.value = true
    form.value.triggers = ''
  }
}

function handleLocationChange(value) {
  if (value === '__custom__') {
    locationCustomMode.value = true
    form.value.location = ''
  }
}

// Watch for custom selection
watch(() => form.value.triggers, (newValue) => {
  if (newValue === '__custom__') {
    triggersCustomMode.value = true
    form.value.triggers = ''
  }
})

watch(() => form.value.location, (newValue) => {
  if (newValue === '__custom__') {
    locationCustomMode.value = true
    form.value.location = ''
  }
})

// Select from saved suggestions
function selectTrigger(value) {
  form.value.triggers = value
  triggersCustomMode.value = false
}

function selectLocation(value) {
  form.value.location = value
  locationCustomMode.value = false
}

// Load entry data if editing
onMounted(async () => {
  await loadSavedSuggestions()
  
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
      
      // Check if current trigger/location is in saved suggestions
      const triggerExists = savedTriggers.value.some(t => t.value === entryToEdit.triggers)
      const locationExists = savedLocations.value.some(l => l.value === entryToEdit.location)
      
      triggersCustomMode.value = entryToEdit.triggers && !triggerExists
      locationCustomMode.value = entryToEdit.location && !locationExists
    }
  }
})

// Save entry function
async function saveEntry() {
  console.log('Saving entry, form.value.emotions:', form.value.emotions)
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
      console.log('Creating new entry with emotions:', form.value.emotions)
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
      
      // Save trigger and location suggestions
      if (form.value.triggers) {
        await saveTriggerSuggestion(form.value.triggers)
      }
      if (form.value.location) {
        await saveLocationSuggestion(form.value.location)
      }
      
      // Reload suggestions
      await loadSavedSuggestions()
      
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
      
      // Reset custom mode
      triggersCustomMode.value = false
      locationCustomMode.value = false
      
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
