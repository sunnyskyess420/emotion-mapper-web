<template>
  <div class="min-h-screen bg-slate-900 text-white">
    <nav class="bg-slate-800 border-b border-slate-700 fixed top-0 left-0 right-0 z-50">
      <div class="container mx-auto px-4">
        <div class="flex items-center gap-8 h-16">
          <router-link to="/" class="hover:text-blue-400 font-semibold transition-colors duration-200">
            Home
          </router-link>
          <router-link to="/emotion-entry" class="hover:text-blue-400 font-semibold transition-colors duration-200">
            Emotion Entry
          </router-link>
          <router-link to="/history" class="hover:text-blue-400 font-semibold transition-colors duration-200">
            History
          </router-link>
          <router-link to="/about" class="hover:text-blue-400 font-semibold transition-colors duration-200">
            About
          </router-link>
        </div>
      </div>
    </nav>

    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" class="pt-16" />
      </transition>
    </router-view>
    
    <Toast :message="toastMessage" :type="toastType" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Toast from './components/Toast.vue'

const toastMessage = ref('')
const toastType = ref('success')

// Make toast available globally via window
window.showToast = (message, type = 'success') => {
  toastMessage.value = message
  toastType.value = type
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>