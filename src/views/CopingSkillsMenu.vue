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
              <ul class="space-y-2">
                <li
                  v-for="skill in category.skills"
                  :key="skill"
                  class="flex items-start gap-2 text-sm text-[#e7edf2]"
                >
                  <span class="text-[#8faa98] mt-0.5 flex-shrink-0">•</span>
                  <span>{{ skill }}</span>
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
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Active category for hover/click highlight
const activeCategory = ref(null)

function setActive(id) {
  activeCategory.value = id
}

function toggleActive(id) {
  activeCategory.value = activeCategory.value === id ? null : id
}

// Coping Skills Menu Data — based on the "Coping Skills Menu" handout
const categories = [
  {
    id: 'quick-starters',
    icon: '⚡',
    name: 'Quick Starters',
    subtitle: '5-minute calming tools',
    skills: [
      'Box breathing (4-4-4-4)',
      'Grounding — name 5 things you see',
      'Shoulder roll / stretch',
      'Sip cold water slowly',
      'Change physical position'
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
      'Thought reframing',
      'Journaling',
      'Guided meditation',
      'Progressive muscle relaxation',
      'Mindful walking'
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
      'Cold water splash on face',
      '5-4-3-2-1 sensory grounding',
      'Slow breathing (4-7-8)',
      'Step away from triggers',
      'Repeat a safe phrase ("I am okay")'
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
      'Wrap in a weighted blanket',
      'Listen to calming music',
      'Light a candle',
      'Gentle self-touch (hand on heart)',
      'Warm drink (tea, cocoa)'
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
      'Regular sleep schedule',
      'Morning sunlight (10 min)',
      'Gratitude journaling',
      'Digital boundaries (no-scroll hours)',
      'Consistent movement (walk, stretch)'
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
