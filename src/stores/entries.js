import { defineStore } from 'pinia'
import { ref } from 'vue'
import { initDatabase } from '../db/database'

export const useEntriesStore = defineStore('entries', () => {
  // Store entries in a reactive array
  const entries = ref([])
  const isLoading = ref(true)

  // Get current database instance
  async function getDb() {
    return await initDatabase(localStorage.getItem('authMode') || 'guest')
  }

  // Function to load all entries from database
  async function loadEntries() {
    try {
      console.log('Loading entries...')
      isLoading.value = true
      const db = await getDb()
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
      const db = await getDb()
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
      const db = await getDb()
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
      const db = await getDb()
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

  // Function to import entries from JSON backup
  async function importEntries(importedEntries) {
    try {
      const db = await getDb()
      console.log('Importing entries:', importedEntries)
      for (const entry of importedEntries) {
        // Check if entry already exists by ID
        const existing = await db.entries.get(entry.id)
        if (!existing) {
          await db.entries.add({
            id: entry.id,
            emotions: Array.isArray(entry.emotions) ? entry.emotions : [],
            intensity: entry.intensity,
            note: entry.note || '',
            physicalSensations: Array.isArray(entry.physicalSensations) ? entry.physicalSensations : [],
            triggers: entry.triggers || '',
            location: entry.location || '',
            timeOfDay: entry.timeOfDay || '',
            copingStrategies: Array.isArray(entry.copingStrategies) ? entry.copingStrategies : [],
            duration: entry.duration || '',
            socialContext: entry.socialContext || '',
            sleepQuality: entry.sleepQuality || '',
            energyLevel: entry.energyLevel || '',
            createdAt: entry.createdAt || new Date().toISOString()
          })
        }
      }
      await loadEntries() // Reload entries after import
      console.log('Import completed')
    } catch (error) {
      console.error('Error importing entries:', error)
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
    updateEntry,
    importEntries
  }
})
