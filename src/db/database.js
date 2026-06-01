import Dexie from 'dexie'
import dexieCloud from 'dexie-cloud-addon'

let db = null

// Initialize database based on auth mode
export async function initDatabase(authMode = 'guest') {
  // Close existing database if open
  if (db) {
    db.close()
  }

  // Use different database names for guest vs signed-in to prevent data mixing
  const dbName = authMode === 'signed-in' ? 'emotionMapperDB' : 'emotionMapperDB_guest'
  db = new Dexie(dbName)

  // Add Dexie Cloud addon only for signed-in mode
  if (authMode === 'signed-in') {
    const databaseUrl = import.meta.env.VITE_DEXIE_CLOUD_URL || 'https://your-app.dexie.cloud'
    console.log('Initializing Dexie Cloud with URL:', databaseUrl)
    
    // Open database first to ensure it's ready
    await db.open()
    
    db.use(dexieCloud, {
      databaseUrl: databaseUrl,
      requireAuth: true
    })
    
    console.log('Dexie Cloud initialized, db.cloud:', db.cloud)
  }

  // Define database schema with upgrade handler
  db.version(1).stores({
    entries: '++id, emotion, intensity, note, createdAt'
  })

  db.version(2).stores({
    entries: '++id, emotion, intensity, note, createdAt, physicalSensations, triggers, location, timeOfDay, copingStrategies, duration, socialContext, sleepQuality, energyLevel'
  })

  db.version(3).stores({
    entries: '++id, emotions, intensity, note, createdAt, physicalSensations, triggers, location, timeOfDay, copingStrategies, duration, socialContext, sleepQuality, energyLevel'
  })

  db.version(4).stores({
    entries: '++id, emotion, intensity, note, createdAt, physicalSensations, triggers, location, timeOfDay, copingStrategies, duration, socialContext, sleepQuality, energyLevel'
  })

  // Note: emotions, physicalSensations, and copingStrategies are not indexed because IndexedDB cannot index arrays
  db.version(5).stores({
    entries: '++id, emotion, intensity, note, createdAt, triggers, location, timeOfDay, duration, socialContext, sleepQuality, energyLevel'
  })

  // Add stores for saved triggers and locations
  db.version(6).stores({
    entries: '++id, emotion, intensity, note, createdAt, triggers, location, timeOfDay, duration, socialContext, sleepQuality, energyLevel',
    savedTriggers: '++id, value, createdAt',
    savedLocations: '++id, value, createdAt'
  })

  return db
}

// Initialize database on first load
const authMode = localStorage.getItem('authMode') || 'guest'
db = initDatabase(authMode)

// Helper functions for saved suggestions
export function normalizeReusableValue(value) {
  if (!value || typeof value !== 'string') return ''
  return value.trim().replace(/\s+/g, ' ')
}

export async function saveTriggerSuggestion(value) {
  const normalized = normalizeReusableValue(value)
  if (!normalized) return
  
  // Check if already exists (case-insensitive)
  const existing = await db.savedTriggers
    .where('value')
    .equalsIgnoreCase(normalized)
    .first()
  
  if (!existing) {
    await db.savedTriggers.add({
      value: normalized,
      createdAt: new Date().toISOString()
    })
  }
}

export async function saveLocationSuggestion(value) {
  const normalized = normalizeReusableValue(value)
  if (!normalized) return
  
  // Check if already exists (case-insensitive)
  const existing = await db.savedLocations
    .where('value')
    .equalsIgnoreCase(normalized)
    .first()
  
  if (!existing) {
    await db.savedLocations.add({
      value: normalized,
      createdAt: new Date().toISOString()
    })
  }
}

export async function getTriggerSuggestions(query = '') {
  let suggestions = await db.savedTriggers.toArray()
  
  if (query) {
    const normalizedQuery = normalizeReusableValue(query).toLowerCase()
    suggestions = suggestions.filter(s => 
      s.value.toLowerCase().includes(normalizedQuery)
    )
  }
  
  // Sort by most recently used
  return suggestions.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
}

export async function getLocationSuggestions(query = '') {
  let suggestions = await db.savedLocations.toArray()
  
  if (query) {
    const normalizedQuery = normalizeReusableValue(query).toLowerCase()
    suggestions = suggestions.filter(s => 
      s.value.toLowerCase().includes(normalizedQuery)
    )
  }
  
  // Sort by most recently used
  return suggestions.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
}

export async function deleteTriggerSuggestion(id) {
  await db.savedTriggers.delete(id)
}

export async function deleteLocationSuggestion(id) {
  await db.savedLocations.delete(id)
}

export default db
