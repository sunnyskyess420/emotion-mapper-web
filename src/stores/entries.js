import { defineStore } from 'pinia'
import { ref } from 'vue'
import db from '../db/database'

export const useEntriesStore = defineStore('entries', () => {
  // Store entries in a reactive array
  const entries = ref([])
  const isLoading = ref(true)

  // Function to load all entries from database
  async function loadEntries() {
    try {
      console.log('Loading entries...')
      isLoading.value = true
      const allEntries = await db.entries.toArray()
      console.log('Loaded entries:', allEntries)
      entries.value = allEntries.sort((a, b) => b.id - a.id) // Show newest first
      console.log('Sorted entries:', entries.value)
    } catch (error) {
      console.error('Error loading entries:', error)
      entries.value = [] // Set to empty array on error
    } finally {
      isLoading.value = false
      console.log('Loading complete, isLoading:', isLoading.value)
    }
  }

  // Function to save a new entry
  async function saveEntry(entryData) {
    try {
      const newEntry = {
        emotions: Array.isArray(entryData.emotions) ? JSON.parse(JSON.stringify(entryData.emotions)) : [],
        intensity: entryData.intensity,
        note: entryData.note,
        physicalSensations: Array.isArray(entryData.physicalSensations) ? JSON.parse(JSON.stringify(entryData.physicalSensations)) : [],
        triggers: entryData.triggers || '',
        location: entryData.location || '',
        timeOfDay: entryData.timeOfDay || '',
        copingStrategies: Array.isArray(entryData.copingStrategies) ? JSON.parse(JSON.stringify(entryData.copingStrategies)) : [],
        duration: entryData.duration || '',
        socialContext: entryData.socialContext || '',
        sleepQuality: entryData.sleepQuality || '',
        energyLevel: entryData.energyLevel || '',
        createdAt: new Date().toISOString()
      }
      console.log('Saving entry:', newEntry)
      const id = await db.entries.add(newEntry)
      console.log('Entry saved with ID:', id)
      await loadEntries() // Reload entries to show the new one
      return id
    } catch (error) {
      console.error('Error saving entry:', error)
      throw error
    }
  }

  // Function to delete an entry
  async function deleteEntry(id) {
    try {
      await db.entries.delete(id)
      await loadEntries() // Reload entries after deletion
    } catch (error) {
      console.error('Error deleting entry:', error)
      throw error
    }
  }

  // Function to update an existing entry
  async function updateEntry(id, entryData) {
    try {
      await db.entries.update(id, {
        emotions: Array.isArray(entryData.emotions) ? JSON.parse(JSON.stringify(entryData.emotions)) : [],
        intensity: entryData.intensity,
        note: entryData.note,
        physicalSensations: Array.isArray(entryData.physicalSensations) ? JSON.parse(JSON.stringify(entryData.physicalSensations)) : [],
        triggers: entryData.triggers || '',
        location: entryData.location || '',
        timeOfDay: entryData.timeOfDay || '',
        copingStrategies: Array.isArray(entryData.copingStrategies) ? JSON.parse(JSON.stringify(entryData.copingStrategies)) : [],
        duration: entryData.duration || '',
        socialContext: entryData.socialContext || '',
        sleepQuality: entryData.sleepQuality || '',
        energyLevel: entryData.energyLevel || ''
      })
      await loadEntries() // Reload entries after update
    } catch (error) {
      console.error('Error updating entry:', error)
      throw error
    }
  }

  // Load entries when store is created
  loadEntries()

  return {
    entries,
    isLoading,
    loadEntries,
    saveEntry,
    deleteEntry,
    updateEntry
  }
})
