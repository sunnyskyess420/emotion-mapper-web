<template>
  <transition name="pacer-fade">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-[70] flex items-center justify-center pacer-backdrop"
      @click.self="close"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pacer-title"
    >
      <!-- Close button (subtle, top-right) -->
      <button
        @click="close"
        class="absolute top-4 right-4 text-white/60 hover:text-white text-2xl p-2 z-10 transition-colors"
        aria-label="Close breathing pacer"
      >
        ✕
      </button>

      <!-- Settings button (top-left) -->
      <button
        v-if="!isRunning"
        @click="cyclePattern"
        class="absolute top-4 left-4 text-white/60 hover:text-white text-sm p-2 z-10 transition-colors zen-button text-xs"
      >
        {{ currentPattern.label }} ↻
      </button>

      <div class="flex flex-col items-center justify-center text-center px-6">
        <!-- Pattern name / hint -->
        <h2 id="pacer-title" class="text-white/70 text-sm uppercase tracking-widest mb-2">
          {{ isRunning ? currentPattern.label : 'Breathing Pacer' }}
        </h2>
        <p v-if="!isRunning" class="text-white/50 text-xs mb-8 max-w-sm">
          {{ currentPattern.description }}
        </p>

        <!-- Animated breathing circle -->
        <div class="pacer-circle-wrap mb-10">
          <div
            class="pacer-circle"
            :class="circleClass"
            :style="{ transitionDuration: transitionDuration }"
          >
            <div class="pacer-inner-glow"></div>
          </div>
          <div class="pacer-label">
            <div class="pacer-phase">{{ phaseLabel }}</div>
            <div v-if="isRunning" class="pacer-countdown">{{ secondsLeft }}</div>
          </div>
        </div>

        <!-- Controls -->
        <div class="flex flex-col items-center gap-4">
          <div v-if="isRunning" class="text-white/50 text-xs">
            Cycle {{ cycleCount + 1 }} · {{ completedCycles }} completed
          </div>
          <div v-if="!isRunning && cycleCount > 0" class="text-white/60 text-sm">
            Completed {{ completedCycles }} {{ completedCycles === 1 ? 'cycle' : 'cycles' }}.
            Great work. 🌿
          </div>
          <div class="flex gap-3">
            <button
              v-if="!isRunning"
              @click="start"
              class="px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/30 text-white rounded-full font-semibold transition-all backdrop-blur-sm"
            >
              Begin
            </button>
            <button
              v-else
              @click="stop"
              class="px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/30 text-white rounded-full font-semibold transition-all backdrop-blur-sm"
            >
              Pause
            </button>
            <button
              v-if="cycleCount > 0 && !isRunning"
              @click="reset"
              class="px-6 py-3 bg-transparent hover:bg-white/10 border border-white/20 text-white/80 rounded-full font-semibold transition-all backdrop-blur-sm"
            >
              Reset
            </button>
          </div>
          <p class="text-white/40 text-xs mt-2 max-w-md">
            Follow the circle: it grows as you inhale, holds, shrinks as you exhale.
          </p>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, computed, onBeforeUnmount, watch } from 'vue'

const props = defineProps({
  isOpen: { type: Boolean, default: false },
  // 'box' (4-4-4-4) or '478' (4-7-8) — controls which pattern is active when opened
  pattern: { type: String, default: 'box' }
})

const emit = defineEmits(['close'])

// Patterns: each is an array of { phase, seconds } phases that loop
const PATTERNS = {
  box: {
    key: 'box',
    label: 'Box Breathing · 4-4-4-4',
    description: 'Used by Navy SEALs to calm the nervous system under pressure. Equal inhale, hold, exhale, hold.',
    phases: [
      { phase: 'Inhale', seconds: 4 },
      { phase: 'Hold',   seconds: 4 },
      { phase: 'Exhale', seconds: 4 },
      { phase: 'Hold',   seconds: 4 }
    ]
  },
  '478': {
    key: '478',
    label: '4-7-8 Relaxing Breath',
    description: 'Dr. Andrew Weil\'s technique for falling asleep and reducing anxiety. Exhale longer than inhale.',
    phases: [
      { phase: 'Inhale', seconds: 4 },
      { phase: 'Hold',   seconds: 7 },
      { phase: 'Exhale', seconds: 8 }
    ]
  }
}

const PATTERN_ORDER = ['box', '478']

const currentPatternKey = ref(props.pattern || 'box')
const currentPattern = computed(() => PATTERNS[currentPatternKey.value] || PATTERNS.box)

const isRunning = ref(false)
const phaseIndex = ref(0)
const secondsLeft = ref(0)
const cycleCount = ref(0)
const completedCycles = ref(0)

let timer = null

const currentPhase = computed(() => currentPattern.value.phases[phaseIndex.value])
const phaseLabel = computed(() => isRunning.value ? currentPhase.value.phase : 'Ready')

// Circle scales based on phase:
//   Inhale -> grows to 1.0 (large)
//   Hold (after inhale) -> stays at 1.0
//   Exhale -> shrinks to 0.35 (small)
//   Hold (after exhale) -> stays at 0.35
const circleClass = computed(() => {
  if (!isRunning.value) return 'pacer-idle'
  const phase = currentPhase.value.phase
  if (phase === 'Inhale') return 'pacer-grow'
  if (phase === 'Hold' && phaseIndex.value === 1) return 'pacer-large'
  if (phase === 'Exhale') return 'pacer-shrink'
  if (phase === 'Hold' && phaseIndex.value === 3) return 'pacer-small'
  return 'pacer-idle'
})

// CSS transition duration should match the phase length so the animation
// smoothly completes over the full phase duration
const transitionDuration = computed(() => {
  if (!isRunning.value) return '1s'
  return `${currentPhase.value.seconds}s`
})

function start() {
  if (isRunning.value) return
  // If we just stopped and are resuming, don't reset
  if (cycleCount.value === 0 && secondsLeft.value === 0) {
    phaseIndex.value = 0
    secondsLeft.value = currentPattern.value.phases[0].seconds
  }
  isRunning.value = true
  tick()
}

function stop() {
  isRunning.value = false
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

function reset() {
  stop()
  phaseIndex.value = 0
  secondsLeft.value = 0
  cycleCount.value = 0
  completedCycles.value = 0
}

function tick() {
  if (timer) clearInterval(timer)
  timer = setInterval(() => {
    if (!isRunning.value) return
    secondsLeft.value -= 1
    if (secondsLeft.value <= 0) {
      // Advance to next phase
      phaseIndex.value = (phaseIndex.value + 1) % currentPattern.value.phases.length
      // Completed a full cycle when we wrap back to phase 0
      if (phaseIndex.value === 0) {
        completedCycles.value += 1
        cycleCount.value = completedCycles.value
        // Auto-pause after 4 cycles so user doesn't have to remember to stop
        if (completedCycles.value >= 4) {
          stop()
          // Reset to allow a fresh start next time
          phaseIndex.value = 0
          secondsLeft.value = 0
        } else {
          secondsLeft.value = currentPattern.value.phases[0].seconds
        }
      } else {
        secondsLeft.value = currentPhase.value.seconds
      }
    }
  }, 1000)
}

function cyclePattern() {
  const idx = PATTERN_ORDER.indexOf(currentPatternKey.value)
  const next = PATTERN_ORDER[(idx + 1) % PATTERN_ORDER.length]
  switchPattern(next)
}

function switchPattern(key) {
  if (!PATTERNS[key]) return
  stop()
  currentPatternKey.value = key
  phaseIndex.value = 0
  secondsLeft.value = 0
  cycleCount.value = 0
  completedCycles.value = 0
}

function close() {
  stop()
  reset()
  emit('close')
}

// When the modal opens, sync the pattern from props
watch(() => props.isOpen, (open) => {
  if (open) {
    switchPattern(props.pattern)
  } else {
    stop()
  }
})

watch(() => props.pattern, (newPattern) => {
  if (props.isOpen) {
    switchPattern(newPattern)
  }
})

onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
})
</script>

<style scoped>
.pacer-backdrop {
  background: radial-gradient(circle at center, #1a232c 0%, #0a0f15 100%);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}

.pacer-circle-wrap {
  position: relative;
  width: 320px;
  height: 320px;
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (max-width: 380px) {
  .pacer-circle-wrap {
    width: 260px;
    height: 260px;
  }
}

.pacer-circle {
  width: 320px;
  height: 320px;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, rgba(169, 150, 194, 0.35), rgba(143, 170, 152, 0.15) 60%, rgba(127, 153, 173, 0.05) 100%);
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow:
    0 0 80px rgba(169, 150, 194, 0.25),
    0 0 30px rgba(143, 170, 152, 0.2),
    inset 0 0 40px rgba(255, 255, 255, 0.05);
  transition-property: transform, background, box-shadow;
  transition-timing-function: cubic-bezier(0.45, 0.05, 0.55, 0.95);
  transform: scale(0.55);
}

@media (max-width: 380px) {
  .pacer-circle {
    width: 260px;
    height: 260px;
  }
}

/* Phase states */
.pacer-idle {
  transform: scale(0.55);
}

.pacer-grow {
  transform: scale(1);
  background: radial-gradient(circle at 30% 30%, rgba(143, 170, 152, 0.5), rgba(127, 153, 173, 0.2) 60%, rgba(169, 150, 194, 0.1) 100%);
  box-shadow:
    0 0 120px rgba(143, 170, 152, 0.4),
    0 0 40px rgba(143, 170, 152, 0.3),
    inset 0 0 60px rgba(255, 255, 255, 0.08);
}

.pacer-large {
  transform: scale(1);
  background: radial-gradient(circle at 30% 30%, rgba(143, 170, 152, 0.45), rgba(127, 153, 173, 0.18) 60%, rgba(169, 150, 194, 0.08) 100%);
  box-shadow:
    0 0 100px rgba(143, 170, 152, 0.35),
    0 0 40px rgba(143, 170, 152, 0.25);
}

.pacer-shrink {
  transform: scale(0.35);
  background: radial-gradient(circle at 30% 30%, rgba(169, 150, 194, 0.4), rgba(143, 170, 152, 0.15) 60%, rgba(127, 153, 173, 0.05) 100%);
  box-shadow:
    0 0 60px rgba(169, 150, 194, 0.3),
    0 0 20px rgba(169, 150, 194, 0.2);
}

.pacer-small {
  transform: scale(0.35);
  background: radial-gradient(circle at 30% 30%, rgba(169, 150, 194, 0.35), rgba(143, 170, 152, 0.12) 60%, rgba(127, 153, 173, 0.05) 100%);
  box-shadow:
    0 0 50px rgba(169, 150, 194, 0.25),
    0 0 15px rgba(169, 150, 194, 0.15);
}

.pacer-inner-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 60%;
  height: 60%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  background: radial-gradient(circle at center, rgba(255, 255, 255, 0.12), transparent 70%);
  pointer-events: none;
}

.pacer-label {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  pointer-events: none;
  color: white;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
}

.pacer-phase {
  font-size: 1.5rem;
  font-weight: 300;
  letter-spacing: 0.05em;
  opacity: 0.9;
}

.pacer-countdown {
  font-size: 3.5rem;
  font-weight: 100;
  margin-top: 0.25rem;
  opacity: 0.75;
  font-variant-numeric: tabular-nums;
}

.pacer-fade-enter-active,
.pacer-fade-leave-active {
  transition: opacity 0.3s ease;
}

.pacer-fade-enter-from,
.pacer-fade-leave-to {
  opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
  .pacer-circle {
    transition: none !important;
  }
}
</style>

