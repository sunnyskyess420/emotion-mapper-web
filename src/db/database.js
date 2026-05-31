import Dexie from 'dexie'

// Create Dexie database
const db = new Dexie('emotionMapperDB')

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

export default db
