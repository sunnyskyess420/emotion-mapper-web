<template>
  <div class="min-h-screen zen-background text-[#e7edf2]">
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-4xl zen-heading text-center mb-8 bg-gradient-to-r from-[#8a7aa0] to-[#7a9a88] bg-clip-text text-transparent">Emotion History</h1>
      
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
        <!-- Time Range Controls -->
        <div class="zen-card p-4 mb-4">
          <div class="flex items-center gap-4 flex-wrap">
            <span class="text-sm font-medium">Time Range:</span>
            <div class="flex gap-2">
              <button
                v-for="range in ['30', '90', '180', 'all']"
                :key="range"
                @click="timeRange = range"
                :class="[
                  'px-3 py-1 text-sm rounded transition-all',
                  timeRange === range
                    ? 'zen-button-primary'
                    : 'zen-button'
                ]"
              >
                {{ range === 'all' ? 'All Time' : range + ' Days' }}
              </button>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-1 gap-4">
          <div class="zen-card p-6">
            <h3 class="text-lg zen-heading mb-4">Emotion Distribution</h3>
            <div class="relative" style="min-height: 300px;">
              <canvas ref="emotionChart"></canvas>
            </div>
          </div>
          <div class="zen-card p-6">
            <h3 class="text-lg zen-heading mb-4">Intensity Trend</h3>
            <div class="relative" style="min-height: 250px;">
              <canvas ref="intensityChart"></canvas>
            </div>
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
          
          <div v-else class="space-y-4 max-h-[600px] overflow-y-auto pr-2">
            <div 
              v-for="entry in filteredEntries" 
              :key="entry.id"
              class="bg-[#24303a] rounded-lg overflow-hidden"
            >
              <!-- Summary Section (Always Visible) -->
              <div class="p-4">
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
                <div class="flex justify-between items-center">
                  <p class="text-[#6b7a85] text-xs">
                    {{ formatDate(entry.createdAt) }}
                  </p>
                  <button
                    v-if="hasAdditionalDetails(entry)"
                    @click="toggleEntry(entry.id)"
                    class="flex items-center gap-1 text-sm text-[#a996c2] hover:text-[#8faa98] transition-colors focus:outline-none focus:ring-2 focus:ring-[#8faa98] focus:ring-offset-2 focus:ring-offset-[#24303a] rounded px-2 py-1"
                    :aria-expanded="isEntryExpanded(entry.id)"
                    :aria-controls="`details-${entry.id}`"
                  >
                    <span>{{ isEntryExpanded(entry.id) ? 'Hide details' : 'Show details' }}</span>
                    <svg
                      class="w-4 h-4 transition-transform duration-200"
                      :class="{ 'rotate-180': isEntryExpanded(entry.id) }"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
              </div>

              <!-- Collapsible Details Section -->
              <div
                v-if="hasAdditionalDetails(entry)"
                :id="`details-${entry.id}`"
                class="overflow-hidden transition-all duration-300 ease-in-out"
                :class="isEntryExpanded(entry.id) ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'"
              >
                <div class="px-4 pb-4 pt-0 border-t border-[#3a4652] mt-0">
                  <div class="grid grid-cols-2 gap-2 text-xs pt-3">
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
                  <div class="flex gap-2 mt-3">
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

// Color interpolation for intensity (green -> yellow -> red) - matches EmotionEntry
function getIntensityColor(value) {
  const intensity = value / 10 // Normalize to 0-1
  
  // Green (low) to Yellow (medium) to Red (high)
  if (intensity <= 0.5) {
    // Green to Yellow (0-5)
    const t = intensity * 2 // Normalize to 0-1
    const r = Math.round(76 + (255 - 76) * t) // 76 -> 255
    const g = Math.round(175 + (200 - 175) * t) // 175 -> 200
    const b = Math.round(80 + (0 - 80) * t) // 80 -> 0
    return `rgb(${r}, ${g}, ${b})`
  } else {
    // Yellow to Red (5-10)
    const t = (intensity - 0.5) * 2 // Normalize to 0-1
    const r = Math.round(255 + (239 - 255) * t) // 255 -> 239
    const g = Math.round(200 + (68 - 200) * t) // 200 -> 68
    const b = Math.round(0 + (68 - 0) * t) // 0 -> 68
    return `rgb(${r}, ${g}, ${b})`
  }
}

// Chart instances
let intensityChartInstance = null
let emotionChartInstance = null

// Filter state
const searchQuery = ref('')
const selectedEmotion = ref('')
const selectedIntensity = ref('')
const timeRange = ref('30') // 30, 90, 180, or 'all' days
const fileInput = ref(null)

// Expanded state for entry cards
const expandedEntries = ref(new Set())

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

// Filter entries by time range
const entriesByTimeRange = computed(() => {
  if (!entries.value || !Array.isArray(entries.value) || entries.value.length === 0) {
    return entries.value
  }
  
  if (timeRange.value === 'all') {
    return entries.value
  }
  
  const days = parseInt(timeRange.value)
  const cutoffDate = new Date()
  cutoffDate.setDate(cutoffDate.getDate() - days)
  
  return entries.value.filter(entry => {
    const entryDate = new Date(entry.createdAt)
    return entryDate >= cutoffDate
  })
})

// Filter entries based on search and filters
const filteredEntries = computed(() => {
  try {
    console.log('filteredEntries called, entriesByTimeRange.value:', entriesByTimeRange.value)
    console.log('entriesByTimeRange.value length:', entriesByTimeRange.value?.length)
    if (!entriesByTimeRange.value || !Array.isArray(entriesByTimeRange.value) || entriesByTimeRange.value.length === 0) return []
    
    console.log('Processing', entriesByTimeRange.value.length, 'entries')
    const filtered = entriesByTimeRange.value.filter(entry => {
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
  return searchQuery.value || selectedEmotion.value || selectedIntensity.value || timeRange.value !== '30'
})

// Clear all filters
function clearFilters() {
  searchQuery.value = ''
  selectedEmotion.value = ''
  selectedIntensity.value = ''
  timeRange.value = '30'
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

// Toggle entry expanded state
function toggleEntry(entryId) {
  if (expandedEntries.value.has(entryId)) {
    expandedEntries.value.delete(entryId)
  } else {
    expandedEntries.value.add(entryId)
  }
  // Force reactivity by creating a new Set
  expandedEntries.value = new Set(expandedEntries.value)
}

// Check if entry is expanded
function isEntryExpanded(entryId) {
  return expandedEntries.value.has(entryId)
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
  console.log('initIntensityChart called, intensityChart.value:', intensityChart.value, 'entriesByTimeRange.value.length:', entriesByTimeRange.value?.length)
  if (!intensityChart.value || !entriesByTimeRange.value || entriesByTimeRange.value.length === 0) {
    console.log('initIntensityChart returning early - no canvas or no entries')
    return
  }

  const sortedEntries = [...entriesByTimeRange.value].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
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
        borderColor: 'rgb(143, 170, 152)',
        backgroundColor: 'rgba(143, 170, 152, 0.1)',
        tension: 0.1,
        fill: true,
        pointBackgroundColor: function(context) {
          const value = context.raw
          return getIntensityColor(value)
        },
        pointBorderColor: function(context) {
          const value = context.raw
          return getIntensityColor(value)
        },
        pointRadius: 4,
        pointHoverRadius: 6
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
  console.log('initEmotionChart called, emotionChart.value:', emotionChart.value, 'entriesByTimeRange.value.length:', entriesByTimeRange.value?.length)
  if (!emotionChart.value || !entriesByTimeRange.value || entriesByTimeRange.value.length === 0) {
    console.log('initEmotionChart returning early - no canvas or no entries')
    return
  }

  const emotionCounts = {}
  entriesByTimeRange.value.forEach(entry => {
    getEmotions(entry).forEach(emotion => {
      emotionCounts[emotion] = (emotionCounts[emotion] || 0) + 1
    })
  })

  // Sort by frequency and take top 12
  const sortedEmotions = Object.entries(emotionCounts).sort((a, b) => b[1] - a[1])
  const topEmotions = sortedEmotions.slice(0, 12)
  const otherEmotions = sortedEmotions.slice(12)
  const otherCount = otherEmotions.reduce((sum, [, count]) => sum + count, 0)
  
  let labels = topEmotions.map(([emotion]) => emotion)
  let data = topEmotions.map(([, count]) => count)
  
  // Store other emotions data for tooltip
  const otherEmotionsData = otherEmotions.map(([emotion, count]) => ({ emotion, count }))
  
  if (otherCount > 0) {
    labels.push('Other')
    data.push(otherCount)
  }

  console.log('Emotion chart data:', { labels, data, emotionCounts, otherEmotionsData })

  const colors = [
    'rgb(143, 170, 152)',  // sage
    'rgb(169, 150, 194)',  // muted lavender
    'rgb(127, 153, 173)',  // mist blue
    'rgb(180, 160, 140)',  // muted tan
    'rgb(150, 140, 160)',  // muted purple-gray
    'rgb(140, 165, 155)',  // muted teal
    'rgb(175, 155, 130)',  // muted gold
    'rgb(160, 140, 145)',  // muted rose
    'rgb(145, 155, 165)',  // muted slate
    'rgb(165, 145, 155)',  // muted mauve
    'rgb(155, 165, 145)',  // muted olive
    'rgb(135, 150, 160)',  // muted steel
    'rgb(130, 130, 140)'   // muted gray (for Other)
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
      maintainAspectRatio: true,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            color: 'rgb(148, 163, 184)',
            padding: 12,
            boxWidth: 12,
            font: {
              size: 12
            },
            usePointStyle: true
          }
        },
        tooltip: {
          enabled: false,
          external: function(context) {
            // Tooltip Element
            let tooltipEl = document.getElementById('chartjs-tooltip')

            if (!tooltipEl) {
              tooltipEl = document.createElement('div')
              tooltipEl.id = 'chartjs-tooltip'
              tooltipEl.innerHTML = '<table></table>'
              document.body.appendChild(tooltipEl)
            }

            // Hide if no tooltip
            const tooltipModel = context.tooltip
            if (tooltipModel.opacity === 0) {
              tooltipEl.style.opacity = 0
              return
            }

            // Set Text
            if (tooltipModel.body) {
              const titleLines = tooltipModel.title || []
              const bodyLines = tooltipModel.body.map(b => b.lines)

              let innerHtml = '<thead>'

              titleLines.forEach(function(title) {
                innerHtml += '<tr><th style="text-align: left; padding: 4px 8px; background: #1f2831; color: #e7edf2; font-size: 12px;">' + title + '</th></tr>'
              })
              innerHtml += '</thead><tbody>'

              bodyLines.forEach(function(body, i) {
                const colors = tooltipModel.labelColors[i]
                let style = 'background: ' + colors.backgroundColor + ';'
                style += 'border-color: ' + colors.borderColor + ';'
                style += 'border-width: 2px;'
                const span = '<span style="' + style + '"></span>'

                innerHtml += '<tr><td style="text-align: left; padding: 4px 8px; color: #e7edf2; font-size: 12px; white-space: pre-wrap;">' + body + '</td></tr>'
              })

              innerHtml += '</tbody>'

              const tableRoot = tooltipEl.querySelector('table')
              tableRoot.innerHTML = innerHtml
            }

            const position = context.chart.canvas.getBoundingClientRect()

            // Display, position, and set styles for font
            tooltipEl.style.opacity = 1
            tooltipEl.style.position = 'absolute'
            tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX + 'px'
            tooltipEl.style.top = position.top + window.pageYOffset + tooltipModel.caretY + 'px'
            tooltipEl.style.fontFamily = tooltipModel._bodyFontFamily
            tooltipEl.style.fontSize = tooltipModel.bodyFontSize + 'px'
            tooltipEl.style.fontStyle = tooltipModel._bodyFontStyle
            tooltipEl.style.padding = tooltipModel.padding + 'px ' + tooltipModel.padding + 'px'
            tooltipEl.style.pointerEvents = 'none'
            tooltipEl.style.backgroundColor = 'rgba(31, 40, 49, 0.95)'
            tooltipEl.style.borderRadius = '8px'
            tooltipEl.style.border = '1px solid rgba(255, 255, 255, 0.12)'
            tooltipEl.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)'
            tooltipEl.style.maxWidth = '300px'
            tooltipEl.style.zIndex = '1000'
          },
          callbacks: {
            label: function(context) {
              const label = context.label || ''
              const value = context.raw || 0
              const total = context.dataset.data.reduce((a, b) => a + b, 0)
              const percentage = ((value / total) * 100).toFixed(1)
              
              // If it's the "Other" slice, show detailed breakdown with wrapping
              if (label === 'Other' && otherEmotionsData.length > 0) {
                const result = [`Other (${value}, ${percentage}%)`]
                otherEmotionsData.forEach(({ emotion, count }) => {
                  result.push(`  ${emotion}: ${count}`)
                })
                return result
              }
              
              return `${label}: ${value} (${percentage}%)`
            }
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
  
  // Handle window resize to trigger chart resize
  window.addEventListener('resize', () => {
    if (intensityChartInstance) {
      intensityChartInstance.resize()
    }
    if (emotionChartInstance) {
      emotionChartInstance.resize()
    }
  })
  
  // Add ResizeObserver for container resize
  const resizeObserver = new ResizeObserver(() => {
    if (intensityChartInstance) {
      intensityChartInstance.resize()
    }
    if (emotionChartInstance) {
      emotionChartInstance.resize()
    }
  })
  
  // Observe the chart containers
  if (intensityChart.value) {
    resizeObserver.observe(intensityChart.value.parentElement)
  }
  if (emotionChart.value) {
    resizeObserver.observe(emotionChart.value.parentElement)
  }
})

// Update charts when entries or time range changes
watch([entries, timeRange], () => {
  nextTick(() => {
    if (entriesByTimeRange.value && entriesByTimeRange.value.length > 0) {
      initIntensityChart()
      initEmotionChart()
    }
  })
}, { deep: true })
</script>
