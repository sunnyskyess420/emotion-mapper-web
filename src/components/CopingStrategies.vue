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
            <!-- Mindfulness -->
            <div>
              <h3 class="text-lg font-semibold mb-3 text-blue-400">Mindfulness</h3>
              <div class="space-y-3">
                <div class="bg-slate-700 rounded p-3">
                  <h4 class="font-semibold text-sm mb-2">Core Skills</h4>
                  <div class="grid grid-cols-3 gap-2">
                    <button
                      v-for="strategy in mindfulnessSkills"
                      :key="strategy"
                      @click="toggleStrategy(strategy)"
                      :class="[
                        'px-3 py-1 rounded text-xs transition-all',
                        selectedStrategies.includes(strategy)
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-600 text-slate-300 hover:bg-slate-500'
                      ]"
                    >
                      {{ strategy }}
                    </button>
                  </div>
                </div>
                <div class="bg-slate-700 rounded p-3">
                  <h4 class="font-semibold text-sm mb-2">"What" Skills</h4>
                  <div class="grid grid-cols-3 gap-2">
                    <button
                      v-for="strategy in whatSkills"
                      :key="strategy"
                      @click="toggleStrategy(strategy)"
                      :class="[
                        'px-3 py-1 rounded text-xs transition-all',
                        selectedStrategies.includes(strategy)
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-600 text-slate-300 hover:bg-slate-500'
                      ]"
                    >
                      {{ strategy }}
                    </button>
                  </div>
                </div>
                <div class="bg-slate-700 rounded p-3">
                  <h4 class="font-semibold text-sm mb-2">"How" Skills</h4>
                  <div class="grid grid-cols-3 gap-2">
                    <button
                      v-for="strategy in howSkills"
                      :key="strategy"
                      @click="toggleStrategy(strategy)"
                      :class="[
                        'px-3 py-1 rounded text-xs transition-all',
                        selectedStrategies.includes(strategy)
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-600 text-slate-300 hover:bg-slate-500'
                      ]"
                    >
                      {{ strategy }}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Interpersonal Effectiveness -->
            <div>
              <h3 class="text-lg font-semibold mb-3 text-purple-400">Interpersonal Effectiveness</h3>
              <div class="space-y-3">
                <div class="bg-slate-700 rounded p-3">
                  <h4 class="font-semibold text-sm mb-2">DEAR MAN</h4>
                  <div class="grid grid-cols-2 gap-2">
                    <button
                      v-for="strategy in dearManStrategies"
                      :key="strategy"
                      @click="toggleStrategy(strategy)"
                      :class="[
                        'px-3 py-1 rounded text-xs transition-all',
                        selectedStrategies.includes(strategy)
                          ? 'bg-purple-600 text-white'
                          : 'bg-slate-600 text-slate-300 hover:bg-slate-500'
                      ]"
                    >
                      {{ strategy }}
                    </button>
                  </div>
                </div>
                <div class="bg-slate-700 rounded p-3">
                  <h4 class="font-semibold text-sm mb-2">GIVE</h4>
                  <div class="grid grid-cols-2 gap-2">
                    <button
                      v-for="strategy in giveStrategies"
                      :key="strategy"
                      @click="toggleStrategy(strategy)"
                      :class="[
                        'px-3 py-1 rounded text-xs transition-all',
                        selectedStrategies.includes(strategy)
                          ? 'bg-purple-600 text-white'
                          : 'bg-slate-600 text-slate-300 hover:bg-slate-500'
                      ]"
                    >
                      {{ strategy }}
                    </button>
                  </div>
                </div>
                <div class="bg-slate-700 rounded p-3">
                  <h4 class="font-semibold text-sm mb-2">FAST</h4>
                  <div class="grid grid-cols-2 gap-2">
                    <button
                      v-for="strategy in fastStrategies"
                      :key="strategy"
                      @click="toggleStrategy(strategy)"
                      :class="[
                        'px-3 py-1 rounded text-xs transition-all',
                        selectedStrategies.includes(strategy)
                          ? 'bg-purple-600 text-white'
                          : 'bg-slate-600 text-slate-300 hover:bg-slate-500'
                      ]"
                    >
                      {{ strategy }}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Emotional Regulation -->
            <div>
              <h3 class="text-lg font-semibold mb-3 text-orange-400">Emotional Regulation</h3>
              <div class="space-y-3">
                <div class="bg-slate-700 rounded p-3">
                  <h4 class="font-semibold text-sm mb-2">VITALS to success</h4>
                  <div class="grid grid-cols-2 gap-2">
                    <button
                      v-for="strategy in vitalsStrategies"
                      :key="strategy"
                      @click="toggleStrategy(strategy)"
                      :class="[
                        'px-3 py-1 rounded text-xs transition-all',
                        selectedStrategies.includes(strategy)
                          ? 'bg-orange-600 text-white'
                          : 'bg-slate-600 text-slate-300 hover:bg-slate-500'
                      ]"
                    >
                      {{ strategy }}
                    </button>
                  </div>
                </div>
                <div class="bg-slate-700 rounded p-3">
                  <h4 class="font-semibold text-sm mb-2">The ABC's of DBT</h4>
                  <div class="grid grid-cols-3 gap-2">
                    <button
                      v-for="strategy in abcStrategies"
                      :key="strategy"
                      @click="toggleStrategy(strategy)"
                      :class="[
                        'px-3 py-1 rounded text-xs transition-all',
                        selectedStrategies.includes(strategy)
                          ? 'bg-orange-600 text-white'
                          : 'bg-slate-600 text-slate-300 hover:bg-slate-500'
                      ]"
                    >
                      {{ strategy }}
                    </button>
                  </div>
                </div>
                <div class="bg-slate-700 rounded p-3">
                  <h4 class="font-semibold text-sm mb-2">PLEASE</h4>
                  <div class="grid grid-cols-2 gap-2">
                    <button
                      v-for="strategy in pleaseStrategies"
                      :key="strategy"
                      @click="toggleStrategy(strategy)"
                      :class="[
                        'px-3 py-1 rounded text-xs transition-all',
                        selectedStrategies.includes(strategy)
                          ? 'bg-orange-600 text-white'
                          : 'bg-slate-600 text-slate-300 hover:bg-slate-500'
                      ]"
                    >
                      {{ strategy }}
                    </button>
                  </div>
                </div>
                <div class="bg-slate-700 rounded p-3">
                  <h4 class="font-semibold text-sm mb-2">Other Skills</h4>
                  <div class="grid grid-cols-2 gap-2">
                    <button
                      v-for="strategy in otherEmotionStrategies"
                      :key="strategy"
                      @click="toggleStrategy(strategy)"
                      :class="[
                        'px-3 py-1 rounded text-xs transition-all',
                        selectedStrategies.includes(strategy)
                          ? 'bg-orange-600 text-white'
                          : 'bg-slate-600 text-slate-300 hover:bg-slate-500'
                      ]"
                    >
                      {{ strategy }}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Distress Tolerance -->
            <div>
              <h3 class="text-lg font-semibold mb-3 text-green-400">Distress Tolerance</h3>
              <div class="space-y-3">
                <div class="bg-slate-700 rounded p-3">
                  <h4 class="font-semibold text-sm mb-2">TIPP</h4>
                  <div class="grid grid-cols-2 gap-2">
                    <button
                      v-for="strategy in tippStrategies"
                      :key="strategy"
                      @click="toggleStrategy(strategy)"
                      :class="[
                        'px-3 py-1 rounded text-xs transition-all',
                        selectedStrategies.includes(strategy)
                          ? 'bg-green-600 text-white'
                          : 'bg-slate-600 text-slate-300 hover:bg-slate-500'
                      ]"
                    >
                      {{ strategy }}
                    </button>
                  </div>
                </div>
                <div class="bg-slate-700 rounded p-3">
                  <h4 class="font-semibold text-sm mb-2">STOP</h4>
                  <div class="grid grid-cols-2 gap-2">
                    <button
                      v-for="strategy in stopStrategies"
                      :key="strategy"
                      @click="toggleStrategy(strategy)"
                      :class="[
                        'px-3 py-1 rounded text-xs transition-all',
                        selectedStrategies.includes(strategy)
                          ? 'bg-green-600 text-white'
                          : 'bg-slate-600 text-slate-300 hover:bg-slate-500'
                      ]"
                    >
                      {{ strategy }}
                    </button>
                  </div>
                </div>
                <div class="bg-slate-700 rounded p-3">
                  <h4 class="font-semibold text-sm mb-2">ACCEPTS</h4>
                  <div class="grid grid-cols-2 gap-2">
                    <button
                      v-for="strategy in acceptsStrategies"
                      :key="strategy"
                      @click="toggleStrategy(strategy)"
                      :class="[
                        'px-3 py-1 rounded text-xs transition-all',
                        selectedStrategies.includes(strategy)
                          ? 'bg-green-600 text-white'
                          : 'bg-slate-600 text-slate-300 hover:bg-slate-500'
                      ]"
                    >
                      {{ strategy }}
                    </button>
                  </div>
                </div>
                <div class="bg-slate-700 rounded p-3">
                  <h4 class="font-semibold text-sm mb-2">IMPROVE</h4>
                  <div class="grid grid-cols-2 gap-2">
                    <button
                      v-for="strategy in improveStrategies"
                      :key="strategy"
                      @click="toggleStrategy(strategy)"
                      :class="[
                        'px-3 py-1 rounded text-xs transition-all',
                        selectedStrategies.includes(strategy)
                          ? 'bg-green-600 text-white'
                          : 'bg-slate-600 text-slate-300 hover:bg-slate-500'
                      ]"
                    >
                      {{ strategy }}
                    </button>
                  </div>
                </div>
                <div class="bg-slate-700 rounded p-3">
                  <h4 class="font-semibold text-sm mb-2">Thought Modification</h4>
                  <div class="grid grid-cols-2 gap-2">
                    <button
                      v-for="strategy in thoughtModificationStrategies"
                      :key="strategy"
                      @click="toggleStrategy(strategy)"
                      :class="[
                        'px-3 py-1 rounded text-xs transition-all',
                        selectedStrategies.includes(strategy)
                          ? 'bg-green-600 text-white'
                          : 'bg-slate-600 text-slate-300 hover:bg-slate-500'
                      ]"
                    >
                      {{ strategy }}
                    </button>
                  </div>
                </div>
                <div class="bg-slate-700 rounded p-3">
                  <h4 class="font-semibold text-sm mb-2">Self-Soothe with the 5 Senses</h4>
                  <div class="grid grid-cols-3 gap-2">
                    <button
                      v-for="strategy in selfSootheStrategies"
                      :key="strategy"
                      @click="toggleStrategy(strategy)"
                      :class="[
                        'px-3 py-1 rounded text-xs transition-all',
                        selectedStrategies.includes(strategy)
                          ? 'bg-green-600 text-white'
                          : 'bg-slate-600 text-slate-300 hover:bg-slate-500'
                      ]"
                    >
                      {{ strategy }}
                    </button>
                  </div>
                </div>
                <div class="bg-slate-700 rounded p-3">
                  <h4 class="font-semibold text-sm mb-2">Other Skills</h4>
                  <div class="grid grid-cols-2 gap-2">
                    <button
                      v-for="strategy in otherDistressStrategies"
                      :key="strategy"
                      @click="toggleStrategy(strategy)"
                      :class="[
                        'px-3 py-1 rounded text-xs transition-all',
                        selectedStrategies.includes(strategy)
                          ? 'bg-green-600 text-white'
                          : 'bg-slate-600 text-slate-300 hover:bg-slate-500'
                      ]"
                    >
                      {{ strategy }}
                    </button>
                  </div>
                </div>
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

// Mindfulness
const mindfulnessSkills = [
  'Wise Mind'
]

const whatSkills = [
  'Observe', 'Describe', 'Participate'
]

const howSkills = [
  'One-mindfully', 'Non-judgmentally', 'Effectively'
]

// Interpersonal Effectiveness
const dearManStrategies = [
  'D: Describe the situation', 'E: Express your feelings', 'A: Assert yourself', 'R: Reinforce the person', 'M: Mindful, focus on goals', 'A: Appear confident', 'N: Negotiate, give to get'
]

const giveStrategies = [
  'G: Gentle, be nice', 'I: Interested, listen', 'V: Validate, be understanding', 'E: Easy manner, use humor'
]

const fastStrategies = [
  'F: Fair, to yourself and others', 'A: Apologies, only if necessary', 'S: Stick to your values', 'T: Truthful'
]

// Emotional Regulation
const vitalsStrategies = [
  'V: Validate yourself', 'I: Imagine success', 'T: Take small steps', 'A: Applaud yourself', 'L: Lighten the load', 'S: Sweeten the pot'
]

const abcStrategies = [
  'A: Accumulate positive experiences', 'B: Build mastery', 'C: Cope for emotional events'
]

const pleaseStrategies = [
  'P – Treat Physical Illness',
  'LE – Balanced Eating',
  'A – Avoid Mood-altering Substances',
  'S – Sleep Enough',
  'E – Exercise regularly'
]

const otherEmotionStrategies = [
  'Check the facts', 'Act Opposite to Emotion', 'Experience your emotions and urges as waves', 'Thoughts, feelings, and emotions are not facts', 'Loving emotions: experience, don\'t judge, accept'
]

// Distress Tolerance
const tippStrategies = [
  'T: Tip the temperature', 'I: Intense exercise', 'P: Paced breathing', 'P: Progressive muscle relaxation'
]

const stopStrategies = [
  'S: Stop what you\'re doing', 'T: Take a step back', 'O: Observe', 'P: Proceed mindfully'
]

const acceptsStrategies = [
  'A: Activities', 'C: Contributions', 'C: Comparison', 'E: Emotion opposites', 'P: Pushing away', 'T: Thoughts', 'S: Sensations'
]

const improveStrategies = [
  'I: Imagery', 'M: Meaning', 'P: Prayer', 'R: Relaxation', 'O: One thing at a time', 'V: Vacation', 'E: Encouragement'
]

const thoughtModificationStrategies = [
  'Radical acceptance', 'Turn the mind to acceptance', 'Pain + non-acceptance = suffering'
]

const selfSootheStrategies = [
  'Vision', 'Touch', 'Hearing', 'Smell', 'Taste'
]

const otherDistressStrategies = [
  'Pros/Cons', 'Half smile / willing hands', 'Observe the breath'
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
