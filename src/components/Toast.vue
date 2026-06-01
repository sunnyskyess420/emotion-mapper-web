<template>
  <transition name="toast">
    <div
      v-if="show"
      :class="[
        'fixed bottom-4 right-4 px-6 py-3 rounded-lg shadow-lg z-50 max-w-sm',
        type === 'success' ? 'bg-[#1d242b] border border-[#8faa98]/30' : 'bg-[#1d242b] border border-red-500/30'
      ]"
    >
      <div class="flex items-center gap-3">
        <span class="text-xl">{{ type === 'success' ? '✓' : '✕' }}</span>
        <span class="font-medium text-[#e7edf2]">{{ message }}</span>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  message: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'success',
    validator: (value) => ['success', 'error'].includes(value)
  },
  duration: {
    type: Number,
    default: 3000
  }
})

const show = ref(false)
let timeoutId = null

watch(() => props.message, (newMessage) => {
  if (newMessage) {
    show.value = true
    
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    
    timeoutId = setTimeout(() => {
      show.value = false
    }, props.duration)
  }
}, { immediate: true })
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(100%) scale(0.9);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(100%) scale(0.9);
}

.fixed.bottom-4.right-4 {
  backdrop-filter: blur(12px);
  box-shadow: 0 14px 40px rgba(0, 0, 0, 0.24);
}
</style>
