<template>
  <div>
    <!-- Trigger button -->
    <button
      @click="isOpen = true"
      class="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white text-left hover:bg-slate-600 transition-colors"
    >
      <span v-if="selectedSensations.length === 0" class="text-slate-400">
        Click to select physical sensations...
      </span>
      <span v-else class="flex flex-wrap gap-2">
        <span
          v-for="sensation in selectedSensations"
          :key="sensation"
          class="bg-purple-600 px-3 py-1 rounded-full text-sm"
        >
          {{ sensation }}
        </span>
      </span>
    </button>

    <!-- Popup modal -->
    <transition name="modal">
      <div v-if="isOpen" class="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
        <div class="bg-slate-800 rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-bold">Physical Sensations</h2>
            <button
              @click="isOpen = false"
              class="text-slate-400 hover:text-white text-2xl"
            >
              ✕
            </button>
          </div>

          <div class="space-y-6">
            <!-- Head & Face -->
            <div>
              <h3 class="text-lg font-semibold mb-3 text-purple-400">Head & Face</h3>
              <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
                <button
                  v-for="sensation in headSensations"
                  :key="sensation"
                  @click="toggleSensation(sensation)"
                  :class="[
                    'px-4 py-2 rounded-lg text-sm transition-all',
                    selectedSensations.includes(sensation)
                      ? 'bg-purple-600 text-white'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  ]"
                >
                  {{ sensation }}
                </button>
              </div>
            </div>

            <!-- Chest & Heart -->
            <div>
              <h3 class="text-lg font-semibold mb-3 text-red-400">Chest & Heart</h3>
              <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
                <button
                  v-for="sensation in chestSensations"
                  :key="sensation"
                  @click="toggleSensation(sensation)"
                  :class="[
                    'px-4 py-2 rounded-lg text-sm transition-all',
                    selectedSensations.includes(sensation)
                      ? 'bg-red-600 text-white'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  ]"
                >
                  {{ sensation }}
                </button>
              </div>
            </div>

            <!-- Stomach & Digestive -->
            <div>
              <h3 class="text-lg font-semibold mb-3 text-orange-400">Stomach & Digestive</h3>
              <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
                <button
                  v-for="sensation in stomachSensations"
                  :key="sensation"
                  @click="toggleSensation(sensation)"
                  :class="[
                    'px-4 py-2 rounded-lg text-sm transition-all',
                    selectedSensations.includes(sensation)
                      ? 'bg-orange-600 text-white'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  ]"
                >
                  {{ sensation }}
                </button>
              </div>
            </div>

            <!-- Muscles & Tension -->
            <div>
              <h3 class="text-lg font-semibold mb-3 text-blue-400">Muscles & Tension</h3>
              <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
                <button
                  v-for="sensation in muscleSensations"
                  :key="sensation"
                  @click="toggleSensation(sensation)"
                  :class="[
                    'px-4 py-2 rounded-lg text-sm transition-all',
                    selectedSensations.includes(sensation)
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  ]"
                >
                  {{ sensation }}
                </button>
              </div>
            </div>

            <!-- Breathing -->
            <div>
              <h3 class="text-lg font-semibold mb-3 text-cyan-400">Breathing</h3>
              <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
                <button
                  v-for="sensation in breathingSensations"
                  :key="sensation"
                  @click="toggleSensation(sensation)"
                  :class="[
                    'px-4 py-2 rounded-lg text-sm transition-all',
                    selectedSensations.includes(sensation)
                      ? 'bg-cyan-600 text-white'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  ]"
                >
                  {{ sensation }}
                </button>
              </div>
            </div>

            <!-- Skin & Temperature -->
            <div>
              <h3 class="text-lg font-semibold mb-3 text-pink-400">Skin & Temperature</h3>
              <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
                <button
                  v-for="sensation in skinSensations"
                  :key="sensation"
                  @click="toggleSensation(sensation)"
                  :class="[
                    'px-4 py-2 rounded-lg text-sm transition-all',
                    selectedSensations.includes(sensation)
                      ? 'bg-pink-600 text-white'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  ]"
                >
                  {{ sensation }}
                </button>
              </div>
            </div>

            <!-- Energy & Fatigue -->
            <div>
              <h3 class="text-lg font-semibold mb-3 text-yellow-400">Energy & Fatigue</h3>
              <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
                <button
                  v-for="sensation in energySensations"
                  :key="sensation"
                  @click="toggleSensation(sensation)"
                  :class="[
                    'px-4 py-2 rounded-lg text-sm transition-all',
                    selectedSensations.includes(sensation)
                      ? 'bg-yellow-600 text-white'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  ]"
                >
                  {{ sensation }}
                </button>
              </div>
            </div>
          </div>

          <!-- Footer actions -->
          <div class="flex justify-between items-center mt-6 pt-4 border-t border-slate-700">
            <button
              @click="clearSelection"
              class="text-slate-400 hover:text-white text-sm"
            >
              Clear all
            </button>
            <button
              @click="confirmSelection"
              class="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Confirm ({{ selectedSensations.length }})
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['update:modelValue'])

const isOpen = ref(false)
const selectedSensations = ref([...props.modelValue])

// Watch for external changes
watch(() => props.modelValue, (newVal) => {
  selectedSensations.value = [...newVal]
})

const headSensations = [
  'Headache', 'Tension headache', 'Migraine', 'Jaw clenching', 'Teeth grinding',
  'Forehead tension', 'Eye strain', 'Blurred vision', 'Dizziness', 'Lightheadedness'
]

const chestSensations = [
  'Tight chest', 'Heart racing', 'Heart pounding', 'Chest pain', 'Shortness of breath',
  'Difficulty breathing', 'Palpitations', 'Heaviness in chest', 'Pressure in chest'
]

const stomachSensations = [
  'Nausea', 'Stomach pain', 'Butterflies', 'Knots in stomach', 'Loss of appetite',
  'Overeating', 'Indigestion', 'Bloating', 'Cramping', 'Diarrhea'
]

const muscleSensations = [
  'Tight shoulders', 'Neck tension', 'Back pain', 'Muscle tension', 'Clenched fists',
  'Restless legs', 'Trembling', 'Shaking', 'Weakness', 'Stiffness'
]

const breathingSensations = [
  'Shallow breathing', 'Rapid breathing', 'Holding breath', 'Difficulty breathing',
  'Short of breath', 'Hyperventilating', 'Sighing', 'Yawning frequently'
]

const skinSensations = [
  'Sweating', 'Cold sweats', 'Hot flashes', 'Chills', 'Goosebumps',
  'Numbness', 'Tingling', 'Flushed skin', 'Pale skin', 'Itching'
]

const energySensations = [
  'Fatigue', 'Exhaustion', 'Restlessness', 'Hyperactive', 'Lethargic',
  'Weak', 'Tired', 'Drained', 'Sluggish', 'Wired'
]

function toggleSensation(sensation) {
  const index = selectedSensations.value.indexOf(sensation)
  if (index > -1) {
    selectedSensations.value.splice(index, 1)
  } else {
    selectedSensations.value.push(sensation)
  }
}

function clearSelection() {
  selectedSensations.value = []
}

function confirmSelection() {
  emit('update:modelValue', [...selectedSensations.value])
  isOpen.value = false
}
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active > div,
.modal-leave-active > div {
  transition: transform 0.2s ease;
}

.modal-enter-from > div,
.modal-leave-to > div {
  transform: scale(0.95);
}
</style>
