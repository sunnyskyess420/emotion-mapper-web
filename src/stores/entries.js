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
      isLoading.value = true
      const allEntries = await db.entries.toArray()
      entries.value = allEntries.sort((a, b) => b.id - a.id) // Show newest first
    } catch (error) {
      console.error('Error loading entries:', error)
    } finally {
      isLoading.value = false
    }
  }

  // Function to save a new entry
  async function saveEntry(entryData) {
    try {
      const newEntry = {
        emotions: entryData.emotions || [],
        intensity: entryData.intensity,
        note: entryData.note,
        physicalSensations: entryData.physicalSensations || '',
        triggers: entryData.triggers || '',
        location: entryData.location || '',
        timeOfDay: entryData.timeOfDay || '',
        copingStrategies: entryData.copingStrategies || '',
        duration: entryData.duration || '',
        socialContext: entryData.socialContext || '',
        sleepQuality: entryData.sleepQuality || '',
        energyLevel: entryData.energyLevel || '',
        createdAt: new Date().toISOString()
      }
      const id = await db.entries.add(newEntry)
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
        emotions: entryData.emotions || [],
        intensity: entryData.intensity,
        note: entryData.note,
        physicalSensations: entryData.physicalSensations || '',
        triggers: entryData.triggers || '',
        location: entryData.location || '',
        timeOfDay: entryData.timeOfDay || '',
        copingStrategies: entryData.copingStrategies || '',
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
