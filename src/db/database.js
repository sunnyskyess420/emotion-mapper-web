import Dexie from 'dexie'

// Create Dexie database
const db = new Dexie('emotionMapperDB')

// Define database schema
// This creates a table called 'entries' with auto-incrementing ID
db.version(3).stores({
  entries: '++id, emotions, intensity, note, createdAt, physicalSensations, triggers, location, timeOfDay, copingStrategies, duration, socialContext, sleepQuality, energyLevel'
})

export default db
