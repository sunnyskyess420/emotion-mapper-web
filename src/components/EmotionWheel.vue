<template>
  <div>
    <!-- Trigger button -->
    <button
      @click="isOpen = true"
      class="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white text-left hover:bg-slate-600 transition-colors"
    >
      <span v-if="selectedEmotions.length === 0" class="text-slate-400">
        Click to select emotions...
      </span>
      <span v-else class="flex flex-wrap gap-2">
        <span
          v-for="emotion in selectedEmotions"
          :key="emotion"
          class="bg-blue-600 px-3 py-1 rounded-full text-sm"
        >
          {{ emotion }}
        </span>
      </span>
    </button>

    <!-- Popup modal -->
    <transition name="modal">
      <div v-if="isOpen" class="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
        <div class="bg-slate-800 rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-bold">Select Emotions</h2>
            <button
              @click="isOpen = false"
              class="text-slate-400 hover:text-white text-2xl"
            >
              ✕
            </button>
          </div>

          <div class="space-y-6">
            <!-- Core Emotions -->
            <div>
              <h3 class="text-lg font-semibold mb-3 text-blue-400">Core Emotions</h3>
              <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
                <button
                  v-for="emotion in coreEmotions"
                  :key="emotion"
                  @click="toggleEmotion(emotion)"
                  :class="[
                    'px-4 py-2 rounded-lg text-sm transition-all',
                    selectedEmotions.includes(emotion)
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  ]"
                >
                  {{ emotion }}
                </button>
              </div>
            </div>

            <!-- Positive Emotions -->
            <div>
              <h3 class="text-lg font-semibold mb-3 text-green-400">Positive</h3>
              <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
                <button
                  v-for="emotion in positiveEmotions"
                  :key="emotion"
                  @click="toggleEmotion(emotion)"
                  :class="[
                    'px-4 py-2 rounded-lg text-sm transition-all',
                    selectedEmotions.includes(emotion)
                      ? 'bg-green-600 text-white'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  ]"
                >
                  {{ emotion }}
                </button>
              </div>
            </div>

            <!-- Negative Emotions -->
            <div>
              <h3 class="text-lg font-semibold mb-3 text-red-400">Negative</h3>
              <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
                <button
                  v-for="emotion in negativeEmotions"
                  :key="emotion"
                  @click="toggleEmotion(emotion)"
                  :class="[
                    'px-4 py-2 rounded-lg text-sm transition-all',
                    selectedEmotions.includes(emotion)
                      ? 'bg-red-600 text-white'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  ]"
                >
                  {{ emotion }}
                </button>
              </div>
            </div>

            <!-- Neutral/Calm Emotions -->
            <div>
              <h3 class="text-lg font-semibold mb-3 text-purple-400">Calm/Neutral</h3>
              <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
                <button
                  v-for="emotion in calmEmotions"
                  :key="emotion"
                  @click="toggleEmotion(emotion)"
                  :class="[
                    'px-4 py-2 rounded-lg text-sm transition-all',
                    selectedEmotions.includes(emotion)
                      ? 'bg-purple-600 text-white'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  ]"
                >
                  {{ emotion }}
                </button>
              </div>
            </div>

            <!-- Energy/High Arousal -->
            <div>
              <h3 class="text-lg font-semibold mb-3 text-orange-400">High Energy</h3>
              <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
                <button
                  v-for="emotion in highEnergyEmotions"
                  :key="emotion"
                  @click="toggleEmotion(emotion)"
                  :class="[
                    'px-4 py-2 rounded-lg text-sm transition-all',
                    selectedEmotions.includes(emotion)
                      ? 'bg-orange-600 text-white'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  ]"
                >
                  {{ emotion }}
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
              class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Confirm ({{ selectedEmotions.length }})
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
const selectedEmotions = ref([...props.modelValue])

// Watch for external changes
watch(() => props.modelValue, (newVal) => {
  selectedEmotions.value = [...newVal]
})

const coreEmotions = [
  'Joy', 'Sadness', 'Fear', 'Anger', 'Disgust', 'Surprise'
]

const positiveEmotions = [
  'Happy', 'Excited', 'Grateful', 'Hopeful', 'Proud', 'Loved',
  'Confident', 'Optimistic', 'Content', 'Relieved', 'Inspired', 'Amused'
]

const negativeEmotions = [
  'Anxious', 'Depressed', 'Frustrated', 'Angry', 'Ashamed', 'Guilty',
  'Lonely', 'Overwhelmed', 'Disappointed', 'Jealous', 'Worried', 'Irritated'
]

const calmEmotions = [
  'Calm', 'Peaceful', 'Relaxed', 'Serene', 'Content', 'Balanced',
  'Thoughtful', 'Reflective', 'Meditative', 'Restful', 'Grounded', 'Steady'
]

const highEnergyEmotions = [
  'Excited', 'Energetic', 'Enthusiastic', 'Thrilled', 'Euphoric', 'Alert',
  'Motivated', 'Determined', 'Passionate', 'Intense', 'Hyper', 'Restless'
]

function toggleEmotion(emotion) {
  const index = selectedEmotions.value.indexOf(emotion)
  if (index > -1) {
    selectedEmotions.value.splice(index, 1)
  } else {
    selectedEmotions.value.push(emotion)
  }
}

function clearSelection() {
  selectedEmotions.value = []
}

function confirmSelection() {
  emit('update:modelValue', [...selectedEmotions.value])
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
