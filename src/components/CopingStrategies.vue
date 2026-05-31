<template>
  <div>
    <!-- Trigger button -->
    <button
      @click="isOpen = true"
      class="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white text-left hover:bg-slate-600 transition-colors"
    >
      <span v-if="selectedStrategies.length === 0" class="text-slate-400">
        Click to select coping strategies...
      </span>
      <span v-else class="flex flex-wrap gap-2">
        <span
          v-for="strategy in selectedStrategies"
          :key="strategy"
          class="bg-green-600 px-3 py-1 rounded-full text-sm"
        >
          {{ strategy }}
        </span>
      </span>
    </button>

    <!-- Popup modal -->
    <transition name="modal">
      <div v-if="isOpen" class="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
        <div class="bg-slate-800 rounded-xl p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-bold">DBT Coping Strategies</h2>
            <button
              @click="isOpen = false"
              class="text-slate-400 hover:text-white text-2xl"
            >
              ✕
            </button>
          </div>

          <div class="space-y-6">
            <!-- ACCEPTS -->
            <div>
              <h3 class="text-lg font-semibold mb-3 text-blue-400">ACCEPTS</h3>
              <p class="text-sm text-slate-400 mb-3">Crisis survival skills for tolerating pain</p>
              <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
                <button
                  v-for="strategy in acceptsStrategies"
                  :key="strategy"
                  @click="toggleStrategy(strategy)"
                  :class="[
                    'px-4 py-2 rounded-lg text-sm transition-all',
                    selectedStrategies.includes(strategy)
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  ]"
                >
                  {{ strategy }}
                </button>
              </div>
            </div>

            <!-- PLEASE -->
            <div>
              <h3 class="text-lg font-semibold mb-3 text-purple-400">PLEASE</h3>
              <p class="text-sm text-slate-400 mb-3">Body-focused skills to reduce vulnerability</p>
              <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
                <button
                  v-for="strategy in pleaseStrategies"
                  :key="strategy"
                  @click="toggleStrategy(strategy)"
                  :class="[
                    'px-4 py-2 rounded-lg text-sm transition-all',
                    selectedStrategies.includes(strategy)
                      ? 'bg-purple-600 text-white'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  ]"
                >
                  {{ strategy }}
                </button>
              </div>
            </div>

            <!-- TIPP -->
            <div>
              <h3 class="text-lg font-semibold mb-3 text-orange-400">TIPP</h3>
              <p class="text-sm text-slate-400 mb-3">Temperature, Intense exercise, Paused breathing, Paired muscle relaxation</p>
              <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
                <button
                  v-for="strategy in tippStrategies"
                  :key="strategy"
                  @click="toggleStrategy(strategy)"
                  :class="[
                    'px-4 py-2 rounded-lg text-sm transition-all',
                    selectedStrategies.includes(strategy)
                      ? 'bg-orange-600 text-white'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  ]"
                >
                  {{ strategy }}
                </button>
              </div>
            </div>

            <!-- IMPROVE -->
            <div>
              <h3 class="text-lg font-semibold mb-3 text-green-400">IMPROVE the Moment</h3>
              <p class="text-sm text-slate-400 mb-3">Imagery, Meaning, Prayer, Relaxation, One thing in the moment, Vacation, Encouragement</p>
              <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
                <button
                  v-for="strategy in improveStrategies"
                  :key="strategy"
                  @click="toggleStrategy(strategy)"
                  :class="[
                    'px-4 py-2 rounded-lg text-sm transition-all',
                    selectedStrategies.includes(strategy)
                      ? 'bg-green-600 text-white'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  ]"
                >
                  {{ strategy }}
                </button>
              </div>
            </div>

            <!-- Pros & Cons -->
            <div>
              <h3 class="text-lg font-semibold mb-3 text-cyan-400">Pros & Cons</h3>
              <p class="text-sm text-slate-400 mb-3">Weigh the pros and cons of tolerating vs not tolerating distress</p>
              <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
                <button
                  v-for="strategy in prosConsStrategies"
                  :key="strategy"
                  @click="toggleStrategy(strategy)"
                  :class="[
                    'px-4 py-2 rounded-lg text-sm transition-all',
                    selectedStrategies.includes(strategy)
                      ? 'bg-cyan-600 text-white'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  ]"
                >
                  {{ strategy }}
                </button>
              </div>
            </div>

            <!-- Radical Acceptance -->
            <div>
              <h3 class="text-lg font-semibold mb-3 text-pink-400">Radical Acceptance</h3>
              <p class="text-sm text-slate-400 mb-3">Accept reality as it is without judgment</p>
              <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
                <button
                  v-for="strategy in radicalAcceptanceStrategies"
                  :key="strategy"
                  @click="toggleStrategy(strategy)"
                  :class="[
                    'px-4 py-2 rounded-lg text-sm transition-all',
                    selectedStrategies.includes(strategy)
                      ? 'bg-pink-600 text-white'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  ]"
                >
                  {{ strategy }}
                </button>
              </div>
            </div>

            <!-- Mindfulness -->
            <div>
              <h3 class="text-lg font-semibold mb-3 text-yellow-400">Mindfulness Skills</h3>
              <p class="text-sm text-slate-400 mb-3">Observe, Describe, Participate - Non-judgmentally, One-mindfully, Effectively</p>
              <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
                <button
                  v-for="strategy in mindfulnessStrategies"
                  :key="strategy"
                  @click="toggleStrategy(strategy)"
                  :class="[
                    'px-4 py-2 rounded-lg text-sm transition-all',
                    selectedStrategies.includes(strategy)
                      ? 'bg-yellow-600 text-white'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  ]"
                >
                  {{ strategy }}
                </button>
              </div>
            </div>

            <!-- Self-Soothe -->
            <div>
              <h3 class="text-lg font-semibold mb-3 text-indigo-400">Self-Soothe</h3>
              <p class="text-sm text-slate-400 mb-3">Use your five senses to comfort yourself</p>
              <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
                <button
                  v-for="strategy in selfSootheStrategies"
                  :key="strategy"
                  @click="toggleStrategy(strategy)"
                  :class="[
                    'px-4 py-2 rounded-lg text-sm transition-all',
                    selectedStrategies.includes(strategy)
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  ]"
                >
                  {{ strategy }}
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
              class="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Confirm ({{ selectedStrategies.length }})
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
const selectedStrategies = ref([...props.modelValue])

// Watch for external changes
watch(() => props.modelValue, (newVal) => {
  selectedStrategies.value = [...newVal]
})

const acceptsStrategies = [
  'Activities', 'Contributing', 'Comparisons', 'Emotions', 'Push away', 'Thoughts', 'Sensations'
]

const pleaseStrategies = [
  'Treat Physical Illness', 'Eating balanced', 'Avoid mood-altering drugs', 'Sleep', 'Exercise'
]

const tippStrategies = [
  'Temperature change', 'Intense exercise', 'Paused breathing', 'Progressive muscle relaxation'
]

const improveStrategies = [
  'Imagery', 'Meaning', 'Prayer', 'Relaxation', 'One thing in the moment', 'Vacation', 'Encouragement'
]

const prosConsStrategies = [
  'List pros of tolerating', 'List cons of tolerating', 'List pros of not tolerating', 'List cons of not tolerating'
]

const radicalAcceptanceStrategies = [
  'Accept reality', 'Turn the mind', 'Willingness', 'Half-smile', 'Awareness hands'
]

const mindfulnessStrategies = [
  'Observe', 'Describe', 'Participate', 'Non-judgmental stance', 'One-mindfully', 'Effectively'
]

const selfSootheStrategies = [
  'Vision (look at nature, art)', 'Hearing (music, sounds)', 'Smell (scents, aromas)', 
  'Taste (favorite foods)', 'Touch (textures, comfort objects)'
]

function toggleStrategy(strategy) {
  const index = selectedStrategies.value.indexOf(strategy)
  if (index > -1) {
    selectedStrategies.value.splice(index, 1)
  } else {
    selectedStrategies.value.push(strategy)
  }
}

function clearSelection() {
  selectedStrategies.value = []
}

function confirmSelection() {
  emit('update:modelValue', [...selectedStrategies.value])
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
