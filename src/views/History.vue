<template>
  <div class="min-h-screen zen-background text-[#e7edf2]">
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-4xl zen-heading text-center mb-8 bg-gradient-to-r from-[#a996c2] to-[#8faa98] bg-clip-text text-transparent">Emotion History</h1>
      
      <!-- Statistics Section -->
      <div class="max-w-4xl mx-auto mb-8">
        <div v-if="isLoading" class="zen-card p-6 text-center">
          <LoadingSpinner />
          <p class="text-[#b9c3cc] mt-2">Loading entries...</p>
        </div>
        <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="zen-card p-6">
            <h3 class="text-lg zen-heading mb-2">Total Entries</h3>
            <p class="text-3xl font-bold text-[#8faa98]">{{ entries ? entries.length : 0 }}</p>
          </div>
          <div class="zen-card p-6">
            <h3 class="text-lg zen-heading mb-2">Most Common Emotion</h3>
            <p class="text-3xl font-bold text-[#a996c2]">{{ mostCommonEmotion }}</p>
          </div>
          <div class="zen-card p-6">
            <h3 class="text-lg zen-heading mb-2">Average Intensity</h3>
            <p class="text-3xl font-bold text-[#7f99ad]">{{ averageIntensity }}/10</p>
          </div>
        </div>
      </div>

      <!-- Charts Section -->
      <div v-if="entries && entries.length > 0" class="max-w-4xl mx-auto mb-8">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="zen-card p-6">
            <h3 class="text-lg zen-heading mb-4">Intensity Trend</h3>
            <canvas ref="intensityChart"></canvas>
          </div>
          <div class="zen-card p-6">
            <h3 class="text-lg zen-heading mb-4">Emotion Distribution</h3>
            <canvas ref="emotionChart"></canvas>
          </div>
        </div>
      </div>

      <!-- Entries List -->
      <div class="max-w-4xl mx-auto">
        <div class="zen-card p-6">
          <div v-if="isLoading" class="text-center py-8">
            <LoadingSpinner />
            <p class="text-[#b9c3cc] mt-2">Loading entries...</p>
          </div>
          <div v-else>
            <div class="flex justify-between items-center mb-4">
              <h2 class="text-2xl zen-heading">All Entries</h2>
              <div v-if="entries && entries.length > 0" class="flex gap-2">
                <button 
                  @click="triggerFileInput"
                  class="zen-button text-sm px-3 py-1"
                >
                  Import JSON
                </button>
                <button 
                  @click="exportJSON"
                  class="zen-button-primary text-sm px-3 py-1"
                >
                  Export JSON
                </button>
                <button 
                  @click="exportCSV"
                  class="zen-button text-sm px-3 py-1"
                >
                  Export CSV
                </button>
              </div>
              <div v-else class="flex gap-2">
                <button 
                  @click="triggerFileInput"
                  class="zen-button text-sm px-3 py-1"
                >
                  Import JSON
                </button>
              </div>
            </div>
            <input 
              ref="fileInput"
              type="file"
              accept=".json"
              @change="handleFileImport"
              class="hidden"
            >

          <!-- Filters -->
          <div v-if="entries && entries.length > 0" class="mb-4 p-4 bg-[#24303a] rounded-lg">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label class="block text-sm font-medium mb-2">Search</label>
                <input 
                  v-model="searchQuery"
                  type="text"
                  placeholder="Search notes, emotions..."
                  class="w-full px-3 py-2 zen-input text-sm"
                >
              </div>
              <div>
                <label class="block text-sm font-medium mb-2">Emotion</label>
                <select 
                  v-model="selectedEmotion"
                  class="w-full px-3 py-2 zen-select text-sm"
                >
                  <option value="">All emotions</option>
                  <option v-for="emotion in uniqueEmotions" :key="emotion" :value="emotion">
                    {{ emotion }}
                  </option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium mb-2">Intensity</label>
                <select 
                  v-model="selectedIntensity"
                  class="w-full px-3 py-2 zen-select text-sm"
                >
                  <option value="">All intensities</option>
                  <option v-for="i in 10" :key="i" :value="i">{{ i }}/10</option>
                </select>
              </div>
            </div>
            <div v-if="hasActiveFilters" class="mt-3">
              <button 
                @click="clearFilters"
                class="text-sm text-[#a996c2] hover:text-[#8faa98]"
              >
                Clear filters
              </button>
            </div>
          </div>
          
          <div v-if="!entries || entries.length === 0" class="text-[#b9c3cc] text-center py-8">
            No entries yet. Start tracking your emotions!
          </div>
          
          <div v-else class="space-y-4">
            <div 
              v-for="entry in filteredEntries" 
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
                <span class="zen-tag px-3 py-1 text-sm">
                  Intensity: {{ entry.intensity }}/10
                </span>
              </div>
              <p class="text-[#b9c3cc] text-sm mb-2">{{ entry.note }}</p>
              
              <!-- Additional Details -->
              <div v-if="hasAdditionalDetails(entry)" class="mt-3 pt-3 border-t border-[#3a4652]">
                <div class="grid grid-cols-2 gap-2 text-xs">
                  <div v-if="getPhysicalSensations(entry).length > 0" class="text-[#b9c3cc]">
                    <span class="font-medium text-[#e7edf2]">Sensations:</span>
                    <div class="flex flex-wrap gap-1 mt-1">
                      <span
                        v-for="sensation in getPhysicalSensations(entry)"
                        :key="sensation"
                        class="zen-tag px-2 py-0.5 text-xs"
                      >
                        {{ sensation }}
                      </span>
                    </div>
                  </div>
                  <div v-if="entry.triggers" class="text-[#b9c3cc]">
                    <span class="font-medium text-[#e7edf2]">Triggers:</span> {{ entry.triggers }}
                  </div>
                  <div v-if="entry.location" class="text-[#b9c3cc]">
                    <span class="font-medium text-[#e7edf2]">Location:</span> {{ entry.location }}
                  </div>
                  <div v-if="entry.timeOfDay" class="text-[#b9c3cc]">
                    <span class="font-medium text-[#e7edf2]">Time:</span> {{ entry.timeOfDay }}
                  </div>
                  <div v-if="entry.duration" class="text-[#b9c3cc]">
                    <span class="font-medium text-[#e7edf2]">Duration:</span> {{ entry.duration }}
                  </div>
                  <div v-if="entry.socialContext" class="text-[#b9c3cc]">
                    <span class="font-medium text-[#e7edf2]">Context:</span> {{ entry.socialContext }}
                  </div>
                  <div v-if="entry.sleepQuality" class="text-[#b9c3cc]">
                    <span class="font-medium text-[#e7edf2]">Sleep:</span> {{ entry.sleepQuality }}
                  </div>
                  <div v-if="entry.energyLevel" class="text-[#b9c3cc]">
                    <span class="font-medium text-[#e7edf2]">Energy:</span> {{ entry.energyLevel }}
                  </div>
                </div>
                <div v-if="getCopingStrategies(entry).length > 0" class="text-[#b9c3cc] text-xs mt-2">
                  <span class="font-medium text-[#e7edf2]">Coping:</span>
                  <div class="flex flex-wrap gap-1 mt-1">
                    <span
                      v-for="strategy in getCopingStrategies(entry)"
                      :key="strategy"
                      class="zen-tag px-2 py-0.5 text-xs"
                    >
                      {{ strategy }}
                    </span>
                  </div>
                </div>
              </div>
              
              <p class="text-[#6b7a85] text-xs mb-3 mt-3">
                {{ formatDate(entry.createdAt) }}
              </p>
              <div class="flex gap-2">
                <button 
                  @click="editEntry(entry)"
                  class="zen-button text-sm px-3 py-1"
                >
                  Edit
                </button>
                <button 
                  @click="deleteEntry(entry.id)"
                  class="zen-button-danger text-sm px-3 py-1"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useEntriesStore } from '../stores/entries'
import Chart from 'chart.js/auto'
import LoadingSpinner from '../components/LoadingSpinner.vue'

const router = useRouter()
const entriesStore = useEntriesStore()
const { entries, isLoading } = storeToRefs(entriesStore)

// Chart refs
const intensityChart = ref(null)
const emotionChart = ref(null)

// Chart instances
let intensityChartInstance = null
let emotionChartInstance = null

// Filter state
const searchQuery = ref('')
const selectedEmotion = ref('')
const selectedIntensity = ref('')
const fileInput = ref(null)

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

// Get physical sensations from entry (handles both old string format and new array format)
function getPhysicalSensations(entry) {
  if (Array.isArray(entry.physicalSensations)) {
    return entry.physicalSensations
  }
  // Backward compatibility: if old entry has string, convert to array
  if (entry.physicalSensations) {
    return [entry.physicalSensations]
  }
  return []
}

// Get coping strategies from entry (handles both old string format and new array format)
function getCopingStrategies(entry) {
  if (Array.isArray(entry.copingStrategies)) {
    return entry.copingStrategies
  }
  // Backward compatibility: if old entry has string, convert to array
  if (entry.copingStrategies) {
    return [entry.copingStrategies]
  }
  return []
}

// Calculate most common emotion
const mostCommonEmotion = computed(() => {
  if (isLoading.value) return 'Loading...'
  if (!entries.value || !Array.isArray(entries.value) || entries.value.length === 0) return 'N/A'
  
  try {
    const emotionCounts = {}
    entries.value.forEach(entry => {
      const emotions = getEmotions(entry)
      if (Array.isArray(emotions)) {
        emotions.forEach(emotion => {
          emotionCounts[emotion] = (emotionCounts[emotion] || 0) + 1
        })
      }
    })
    
    const emotionEntries = Object.entries(emotionCounts)
    if (emotionEntries.length === 0) return 'N/A'
    return emotionEntries.sort((a, b) => b[1] - a[1])[0][0]
  } catch (error) {
    console.error('Error in mostCommonEmotion:', error)
    return 'N/A'
  }
})

// Calculate average intensity
const averageIntensity = computed(() => {
  if (!entries.value || entries.value.length === 0) return 0
  
  const total = entries.value.reduce((sum, entry) => sum + parseInt(entry.intensity || 0), 0)
  return (total / entries.value.length).toFixed(1)
})

// Get unique emotions for filter dropdown
const uniqueEmotions = computed(() => {
  try {
    if (!entries.value || !Array.isArray(entries.value)) return []
    const emotionSet = new Set()
    entries.value.forEach(entry => {
      const emotions = getEmotions(entry)
      if (Array.isArray(emotions)) {
        emotions.forEach(e => emotionSet.add(e))
      }
    })
    return Array.from(emotionSet).sort()
  } catch (error) {
    console.error('Error in uniqueEmotions:', error)
    return []
  }
})

// Filter entries based on search and filters
const filteredEntries = computed(() => {
  try {
    console.log('filteredEntries called, entries.value:', entries.value)
    console.log('entries.value length:', entries.value?.length)
    if (!entries.value || !Array.isArray(entries.value) || entries.value.length === 0) return []
    
    console.log('Processing', entries.value.length, 'entries')
    const filtered = entries.value.filter(entry => {
      const emotions = getEmotions(entry)
      const sensations = getPhysicalSensations(entry)
      const strategies = getCopingStrategies(entry)
      
      console.log('Filtering entry:', entry.id, 'emotions:', emotions, 'intensity:', entry.intensity)
      
      // Search filter
      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase()
        const matchesSearch = 
          (Array.isArray(emotions) && emotions.some(e => e.toLowerCase().includes(query))) ||
          entry.note.toLowerCase().includes(query) ||
          (Array.isArray(sensations) && sensations.some(s => s.toLowerCase().includes(query))) ||
          (Array.isArray(strategies) && strategies.some(s => s.toLowerCase().includes(query))) ||
          (entry.triggers && entry.triggers.toLowerCase().includes(query)) ||
          (entry.location && entry.location.toLowerCase().includes(query))
        if (!matchesSearch) {
          console.log('Entry filtered out by search:', entry.id)
          return false
        }
      }

      // Emotion filter
      if (selectedEmotion.value) {
        if (!Array.isArray(emotions) || !emotions.includes(selectedEmotion.value)) {
          console.log('Entry filtered out by emotion:', entry.id, 'selected:', selectedEmotion.value)
          return false
        }
      }

      // Intensity filter
      if (selectedIntensity.value) {
        const entryIntensity = parseInt(entry.intensity || 0)
        const selectedIntensityVal = parseInt(selectedIntensity.value)
        console.log('Intensity filter check:', entry.id, 'entryIntensity:', entryIntensity, 'selected:', selectedIntensityVal, 'match:', entryIntensity === selectedIntensityVal)
        if (entryIntensity !== selectedIntensityVal) {
          console.log('Entry filtered out by intensity:', entry.id, 'selected:', selectedIntensity.value)
          return false
        }
      }

      console.log('Entry passed filters:', entry.id)
      return true
    })
    
    console.log('Filtered entries count:', filtered.length)
    return filtered
  } catch (error) {
    console.error('Error in filteredEntries:', error)
    return []
  }
})

// Check if any filters are active
const hasActiveFilters = computed(() => {
  return searchQuery.value || selectedEmotion.value || selectedIntensity.value
})

// Clear all filters
function clearFilters() {
  searchQuery.value = ''
  selectedEmotion.value = ''
  selectedIntensity.value = ''
}

// Format date for display
function formatDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleString()
}

// Check if entry has additional details to display
function hasAdditionalDetails(entry) {
  return getPhysicalSensations(entry).length > 0 ||
         entry.triggers || 
         entry.location || 
         entry.timeOfDay || 
         getCopingStrategies(entry).length > 0 ||
         entry.duration || 
         entry.socialContext || 
         entry.sleepQuality || 
         entry.energyLevel
}

// Delete an entry
async function deleteEntry(id) {
  if (confirm('Are you sure you want to delete this entry?')) {
    try {
      await entriesStore.deleteEntry(id)
      window.showToast('Entry deleted successfully!')
    } catch (error) {
      window.showToast('Error deleting entry: ' + error.message, 'error')
    }
  }
}

// Edit an entry - navigate to emotion entry page with entry data
function editEntry(entry) {
  router.push({
    path: '/emotion-entry',
    query: { editId: entry.id }
  })
}

// Export data as JSON
function exportJSON() {
  const data = JSON.stringify(entries.value, null, 2)
  const blob = new Blob([data], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `emotion-mapper-export-${new Date().toISOString().split('T')[0]}.json`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

// Export data as CSV
function exportCSV() {
  console.log('exportCSV called, entries.value:', entries.value)
  
  if (!entries.value || entries.value.length === 0) {
    console.log('No entries to export')
    window.showToast('No entries to export', 'error')
    return
  }

  try {
    const headers = ['ID', 'Emotions', 'Intensity', 'Note', 'Physical Sensations', 'Triggers', 'Location', 'Time of Day', 'Coping Strategies', 'Duration', 'Social Context', 'Sleep Quality', 'Energy Level', 'Created At']
    const rows = entries.value.map(entry => [
      entry.id,
      getEmotions(entry).join('; '),
      entry.intensity,
      entry.note,
      getPhysicalSensations(entry).join('; '),
      entry.triggers || '',
      entry.location || '',
      entry.timeOfDay || '',
      getCopingStrategies(entry).join('; '),
      entry.duration || '',
      entry.socialContext || '',
      entry.sleepQuality || '',
      entry.energyLevel || '',
      entry.createdAt
    ])

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `emotion-mapper-export-${new Date().toISOString().split('T')[0]}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    
    console.log('CSV export completed')
  } catch (error) {
    console.error('Error exporting CSV:', error)
    window.showToast('Error exporting CSV: ' + error.message, 'error')
  }
}

// Trigger file input click
function triggerFileInput() {
  fileInput.value?.click()
}

// Handle file import
async function handleFileImport(event) {
  const file = event.target.files[0]
  if (!file) return

  try {
    const text = await file.text()
    const importedEntries = JSON.parse(text)
    
    if (!Array.isArray(importedEntries)) {
      throw new Error('Invalid JSON format: expected an array of entries')
    }

    const count = await entriesStore.importEntries(importedEntries)
    window.showToast(`Imported ${importedEntries.length} entries successfully!`)
  } catch (error) {
    console.error('Error importing JSON:', error)
    window.showToast('Error importing JSON: ' + error.message, 'error')
  } finally {
    // Reset file input
    event.target.value = ''
  }
}

// Initialize intensity trend chart
function initIntensityChart() {
  console.log('initIntensityChart called, intensityChart.value:', intensityChart.value, 'entries.value.length:', entries.value?.length)
  if (!intensityChart.value || entries.value.length === 0) {
    console.log('initIntensityChart returning early - no canvas or no entries')
    return
  }

  const sortedEntries = [...entries.value].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
  const labels = sortedEntries.map(entry => new Date(entry.createdAt).toLocaleDateString())
  const data = sortedEntries.map(entry => parseInt(entry.intensity || 0))

  console.log('Intensity chart data:', { labels, data })

  if (intensityChartInstance) {
    intensityChartInstance.destroy()
  }

  intensityChartInstance = new Chart(intensityChart.value, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Intensity',
        data: data,
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.1,
        fill: true
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          max: 10,
          grid: {
            color: 'rgba(148, 163, 184, 0.1)'
          },
          ticks: {
            color: 'rgb(148, 163, 184)'
          }
        },
        x: {
          grid: {
            color: 'rgba(148, 163, 184, 0.1)'
          },
          ticks: {
            color: 'rgb(148, 163, 184)'
          }
        }
      },
      plugins: {
        legend: {
          labels: {
            color: 'rgb(148, 163, 184)'
          }
        }
      }
    }
  })
}

// Initialize emotion distribution chart
function initEmotionChart() {
  console.log('initEmotionChart called, emotionChart.value:', emotionChart.value, 'entries.value.length:', entries.value?.length)
  if (!emotionChart.value || entries.value.length === 0) {
    console.log('initEmotionChart returning early - no canvas or no entries')
    return
  }

  const emotionCounts = {}
  entries.value.forEach(entry => {
    getEmotions(entry).forEach(emotion => {
      emotionCounts[emotion] = (emotionCounts[emotion] || 0) + 1
    })
  })

  const labels = Object.keys(emotionCounts)
  const data = Object.values(emotionCounts)

  console.log('Emotion chart data:', { labels, data, emotionCounts })

  const colors = [
    'rgb(143, 170, 152)',  // sage
    'rgb(169, 150, 194)',  // muted lavender
    'rgb(127, 153, 173)',  // mist blue
    'rgb(180, 160, 140)',  // muted tan
    'rgb(150, 140, 160)',  // muted purple-gray
    'rgb(140, 165, 155)',  // muted teal
    'rgb(175, 155, 130)',  // muted gold
    'rgb(160, 140, 145)'   // muted rose
  ]

  if (emotionChartInstance) {
    emotionChartInstance.destroy()
  }

  emotionChartInstance = new Chart(emotionChart.value, {
    type: 'doughnut',
    data: {
      labels: labels,
      datasets: [{
        data: data,
        backgroundColor: colors.slice(0, labels.length),
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            color: 'rgb(148, 163, 184)',
            padding: 20
          }
        }
      }
    }
  })
}

// Initialize charts on mount
onMounted(() => {
  nextTick(() => {
    if (entries.value && entries.value.length > 0) {
      initIntensityChart()
      initEmotionChart()
    }
  })
})

// Update charts when entries change
watch(entries, () => {
  nextTick(() => {
    if (entries.value && entries.value.length > 0) {
      initIntensityChart()
      initEmotionChart()
    }
  })
}, { deep: true })
</script>
