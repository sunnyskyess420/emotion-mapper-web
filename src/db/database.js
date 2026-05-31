import Dexie from 'dexie'

// Create Dexie database
const db = new Dexie('emotionMapperDB')

// Define database schema
// This creates a table called 'entries' with auto-incrementing ID
// Note: emotions, physicalSensations, and copingStrategies are not indexed because IndexedDB cannot index arrays
db.version(5).stores({
  entries: '++id, emotion, intensity, note, createdAt, triggers, location, timeOfDay, duration, socialContext, sleepQuality, energyLevel'
})

export default db
