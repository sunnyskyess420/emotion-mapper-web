<template>
  <div class="min-h-screen zen-background text-[#e7edf2]">
    <div class="container mx-auto px-4 py-8">
      <!-- Title Section -->
      <div class="max-w-6xl mx-auto text-center mb-10">
        <h1 class="text-4xl md:text-5xl zen-heading mb-3 bg-gradient-to-r from-[#8a7aa0] to-[#7a9a88] bg-clip-text text-transparent">
          Coping Skills Menu
        </h1>
        <p class="text-lg text-[#b9c3cc] italic">Choose What You Need in the Moment</p>
      </div>

      <!-- Three-Column Layout: Recipes | Skills | How It Helps -->
      <div class="max-w-6xl mx-auto mb-10">
        <!-- Column Headers -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <h2 class="text-xl zen-heading text-center text-[#a996c2] md:col-span-1">
            Regulation Recipes
          </h2>
          <h2 class="text-xl zen-heading text-center text-[#8faa98] md:col-span-1">
            Coping Skills
          </h2>
          <h2 class="text-xl zen-heading text-center text-[#7f99ad] md:col-span-1">
            How It Helps
          </h2>
        </div>

        <!-- Rows: One row per category, three columns each -->
        <div class="space-y-4">
          <div
            v-for="(category, index) in categories"
            :key="category.id"
            class="grid grid-cols-1 md:grid-cols-3 gap-4 transition-all duration-300"
            :class="activeCategory === category.id ? 'scale-[1.005]' : ''"
            @mouseenter="setActive(category.id)"
            @mouseleave="setActive(null)"
          >
            <!-- LEFT: Regulation Recipe -->
            <div
              class="zen-card p-5 flex items-start gap-4 transition-all duration-300 cursor-pointer"
              :class="activeCategory === category.id ? 'ring-2 ring-[#a996c2]/60 shadow-lg' : 'opacity-90'"
              @click="toggleActive(category.id)"
            >
              <div class="text-4xl flex-shrink-0 mt-1">{{ category.icon }}</div>
              <div class="flex-1">
                <h3 class="text-lg font-semibold text-[#a996c2] mb-1">{{ category.name }}</h3>
                <p class="text-sm text-[#b9c3cc]">{{ category.subtitle }}</p>
              </div>
            </div>

            <!-- CENTER: Coping Skills (specific techniques) -->
            <div
              class="zen-card p-5 transition-all duration-300"
              :class="activeCategory === category.id ? 'ring-2 ring-[#8faa98]/60 shadow-lg' : 'opacity-90'"
            >
              <ul class="space-y-3">
                <li
                  v-for="skill in category.skills"
                  :key="skill.label"
                  class="flex items-start gap-2 text-sm"
                >
                  <span class="text-[#8faa98] mt-0.5 flex-shrink-0">•</span>
                  <div class="flex-1 min-w-0">
                    <div class="flex items-center gap-2 flex-wrap">
                      <span class="text-[#e7edf2]">{{ skill.label }}</span>
                      <!-- Breathing pacer button for breathing skills -->
                      <button
                        v-if="skill.breathing"
                        @click.stop="openBreather(skill.breathing)"
                        class="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#8faa98]/20 border border-[#8faa98]/40 text-[#8faa98] hover:bg-[#8faa98]/30 transition-colors"
                        :title="`Start ${skill.breathing === 'box' ? 'Box Breathing' : '4-7-8'} pacer`"
                      >
                        ▶ Pacer
                      </button>
                    </div>
                    <!-- Recently used badge -->
                    <div v-if="skillUsage[skill.label]" class="mt-1 flex items-center gap-2 text-[11px] text-[#8b9ba5]">
                      <span class="inline-flex items-center gap-1">
                        <span class="text-[#a996c2]">✓</span>
                        Used {{ skillUsage[skill.label].count }}×
                      </span>
                      <span v-if="skillUsage[skill.label].avgIntensity !== null" class="text-[#7f99ad]">
                        · avg intensity {{ skillUsage[skill.label].avgIntensity }}/10
                      </span>
                    </div>
                    <!-- Use this skill button -->
                    <button
                      @click.stop="useSkill(skill.label)"
                      class="mt-1.5 text-[11px] text-[#a996c2] hover:text-[#8faa98] transition-colors inline-flex items-center gap-1"
                    >
                      Use this skill
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                  </div>
                </li>
              </ul>
            </div>

            <!-- RIGHT: How It Helps -->
            <div
              class="zen-card p-5 transition-all duration-300"
              :class="activeCategory === category.id ? 'ring-2 ring-[#7f99ad]/60 shadow-lg' : 'opacity-90'"
            >
              <p class="text-sm text-[#b9c3cc] leading-relaxed mb-2">
                <span class="font-semibold text-[#7f99ad]">{{ category.howHelpsTitle }}:</span>
                {{ category.howHelpsDesc }}
              </p>
              <p class="text-xs text-[#8b9ba5] italic">
                When: {{ category.whenToUse }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom: Two-Column Layout -->
      <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- How to Use This Menu -->
        <div class="zen-card p-6">
          <h2 class="text-xl zen-heading mb-4 text-[#a996c2]">How to Use This Menu (Quick Guide)</h2>
          <ol class="space-y-3">
            <li v-for="(step, idx) in howToSteps" :key="idx" class="flex items-start gap-3">
              <span
                class="flex-shrink-0 w-7 h-7 rounded-full bg-[#a996c2]/30 border border-[#a996c2]/50 flex items-center justify-center text-sm font-semibold text-[#a996c2]"
              >
                {{ idx + 1 }}
              </span>
              <p class="text-sm text-[#e7edf2] leading-relaxed pt-0.5">{{ step }}</p>
            </li>
          </ol>
        </div>

        <!-- Choose Based on Energy Level -->
        <div class="zen-card p-6">
          <h2 class="text-xl zen-heading mb-4 text-[#8faa98]">Choose Based on Energy Level</h2>
          <ul class="space-y-2 mb-4">
            <li
              v-for="item in energyLevels"
              :key="item.label"
              class="flex items-start gap-2 text-sm"
            >
              <span class="text-[#8faa98] mt-0.5 flex-shrink-0 font-semibold">→</span>
              <p class="text-[#e7edf2]">
                <span class="font-semibold text-[#8faa98]">{{ item.label }}:</span>
                {{ item.value }}
              </p>
            </li>
          </ul>
          <p class="text-xs text-[#8b9ba5] italic border-t border-white/10 pt-3">
            Note: Avoid overthinking—pick a skill intuitively.
          </p>
        </div>
      </div>

      <!-- Action: Start an Entry with Coping Skills -->
      <div class="max-w-6xl mx-auto mt-8 text-center">
        <router-link
          to="/emotion-entry"
          class="zen-button-primary inline-block font-semibold py-3 px-8"
        >
          Log an Emotion Entry
        </router-link>
        <p class="text-xs text-[#8b9ba5] mt-3">
          Use this menu as a reference, then track what works in your emotion journal.
        </p>
      </div>
    </div>

    <!-- Breathing Pacer Modal -->
    <BreathingPacer
      :is-open="breatherOpen"
      :pattern="breatherPattern"
      @close="breatherOpen = false"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useEntriesStore } from '../stores/entries'
import BreathingPacer from '../components/BreathingPacer.vue'

const router = useRouter()
const entriesStore = useEntriesStore()
const { entries } = storeToRefs(entriesStore)

// Active category for hover/click highlight
const activeCategory = ref(null)

function setActive(id) {
  activeCategory.value = id
}

function toggleActive(id) {
  activeCategory.value = activeCategory.value === id ? null : id
}

// ----- Breathing pacer state -----
const breatherOpen = ref(false)
const breatherPattern = ref('box')

function openBreather(pattern) {
  breatherPattern.value = pattern
  breatherOpen.value = true
}

// ----- "Use this skill" → jump to Emotion Entry with that skill pre-selected -----
function useSkill(skillLabel) {
  router.push({
    path: '/emotion-entry',
    query: { skill: skillLabel }
  })
}

// ----- Recently-used badges: compute usage count + avg intensity per skill -----
// Normalize a stored coping strategy string to match a menu skill label.
// Stored strategies from the DBT picker have formats like "P: Paced breathing",
// "T: Tip the temperature" — these won't match the menu labels, so we only
// surface counts for skills whose exact label appears in entry.copingStrategies.
function getEntryCoping(entry) {
  if (Array.isArray(entry.copingStrategies)) return entry.copingStrategies
  if (typeof entry.copingStrategies === 'string') return [entry.copingStrategies]
  return []
}

const skillUsage = computed(() => {
  const map = {} // label -> { count, intensitySum }
  if (!entries.value || !Array.isArray(entries.value)) return map

  // Build a flat list of all menu skill labels
  const allLabels = []
  categories.forEach(cat => cat.skills.forEach(s => allLabels.push(s.label)))

  entries.value.forEach(entry => {
    const strategies = getEntryCoping(entry)
    strategies.forEach(strat => {
      // Direct match
      if (allLabels.includes(strat)) {
        if (!map[strat]) map[strat] = { count: 0, intensitySum: 0 }
        map[strat].count += 1
        map[strat].intensitySum += parseInt(entry.intensity || 0, 10)
      }
    })
  })

  // Compute averages
  Object.keys(map).forEach(label => {
    const v = map[label]
    map[label] = {
      count: v.count,
      avgIntensity: v.count > 0 ? (v.intensitySum / v.count).toFixed(1) : null
    }
  })

  return map
})

// Coping Skills Menu Data — based on the "Coping Skills Menu" handout
// `breathing` field marks skills that have a guided breathing pacer
const categories = [
  {
    id: 'quick-starters',
    icon: '⚡',
    name: 'Quick Starters',
    subtitle: '5-minute calming tools',
    skills: [
      { label: 'Box breathing (4-4-4-4)', breathing: 'box' },
      { label: 'Grounding — name 5 things you see' },
      { label: 'Shoulder roll / stretch' },
      { label: 'Sip cold water slowly' },
      { label: 'Change physical position' }
    ],
    howHelpsTitle: 'Immediate Stress Reduction',
    howHelpsDesc: 'Tools that calm the nervous system in the moment, bringing you back to baseline quickly.',
    whenToUse: 'you feel mildly overwhelmed or need a fast reset.'
  },
  {
    id: 'main-regulation',
    icon: '🧘',
    name: 'Main Regulation Tools',
    subtitle: 'Deep coping strategies',
    skills: [
      { label: 'Thought reframing' },
      { label: 'Journaling' },
      { label: 'Guided meditation' },
      { label: 'Progressive muscle relaxation' },
      { label: 'Mindful walking' }
    ],
    howHelpsTitle: 'Deeper Emotional Regulation',
    howHelpsDesc: 'Practices that help you understand and manage emotions long-term, building self-awareness.',
    whenToUse: 'stress persists or patterns keep recurring.'
  },
  {
    id: 'emergency-reset',
    icon: '🆘',
    name: 'Emergency Reset',
    subtitle: 'For panic / overwhelm',
    skills: [
      { label: 'Cold water splash on face' },
      { label: '5-4-3-2-1 sensory grounding' },
      { label: 'Slow breathing (4-7-8)', breathing: '478' },
      { label: 'Step away from triggers' },
      { label: 'Repeat a safe phrase ("I am okay")' }
    ],
    howHelpsTitle: 'Safety & Grounding',
    howHelpsDesc: 'Strategies that re-engage the nervous system when emotions feel too big to handle.',
    whenToUse: 'anxiety spikes or you feel flooded.'
  },
  {
    id: 'comfort-picks',
    icon: '🫖',
    name: 'Comfort Picks',
    subtitle: 'Gentle self-soothing ideas',
    skills: [
      { label: 'Wrap in a weighted blanket' },
      { label: 'Listen to calming music' },
      { label: 'Light a candle' },
      { label: 'Gentle self-touch (hand on heart)' },
      { label: 'Warm drink (tea, cocoa)' }
    ],
    howHelpsTitle: 'Comfort & Reassurance',
    howHelpsDesc: 'Gentle self-soothing practices that reduce overwhelm by signaling safety to your body.',
    whenToUse: 'you feel ungrounded or emotionally tender.'
  },
  {
    id: 'daily-maintenance',
    icon: '🌱',
    name: 'Daily Maintenance',
    subtitle: 'Preventive habits',
    skills: [
      { label: 'Regular sleep schedule' },
      { label: 'Morning sunlight (10 min)' },
      { label: 'Gratitude journaling' },
      { label: 'Digital boundaries (no-scroll hours)' },
      { label: 'Consistent movement (walk, stretch)' }
    ],
    howHelpsTitle: 'Preventive Coping',
    howHelpsDesc: 'Daily habits that build emotional resilience, so future stressors feel more manageable.',
    whenToUse: 'daily — prevention is the practice.'
  }
]

// How to Use This Menu
const howToSteps = [
  'Pause and notice your feelings — name them without judgment.',
  'Choose a section that matches your emotional state (e.g., "Quick Starters" for mild stress, "Emergency Reset" for overwhelm).',
  'Try one skill, notice what changes, and repeat or adjust as needed. Track what works in your Emotion Entry.'
]

// Energy Level Guide
const energyLevels = [
  { label: 'Low Energy', value: 'Comfort Picks, Daily Maintenance' },
  { label: 'Medium Energy', value: 'Main Regulation Tools' },
  { label: 'High Emotional Intensity', value: 'Emergency Reset' },
  { label: 'Need Quick Relief', value: 'Quick Starters' }
]

// Ensure entries are loaded so we can compute usage badges
onMounted(() => {
  if (!entries.value || entries.value.length === 0) {
    entriesStore.loadEntries()
  }
})
</script>

<style scoped>
/* Subtle ring highlight for active category cards */
.zen-card {
  transition: all 0.3s ease;
}

.zen-card:hover {
  transform: translateY(-2px);
}
</style>

