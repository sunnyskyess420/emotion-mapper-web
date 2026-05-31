<template>
  <div class="min-h-screen bg-slate-900 text-white">
    <nav class="bg-slate-800 border-b border-slate-700 fixed top-0 left-0 right-0 z-50">
      <div class="container mx-auto px-4">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center gap-8">
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
          <div class="flex items-center gap-4">
            <span v-if="isGuest" class="text-slate-400 text-sm">Guest Mode</span>
            <span v-else-if="isSignedIn" class="text-slate-400 text-sm">{{ userEmail }}</span>
            <button 
              v-if="isGuest"
              @click="goToAuth"
              class="bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1 rounded transition-colors"
            >
              Sign In
            </button>
            <button 
              v-else-if="isSignedIn"
              @click="signOut"
              class="bg-slate-600 hover:bg-slate-700 text-white text-sm px-3 py-1 rounded transition-colors"
            >
              Sign Out
            </button>
          </div>
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
import { useRouter } from 'vue-router'
import Toast from './components/Toast.vue'
import { useAuth } from './composables/useAuth'

const router = useRouter()
const { isGuest, isSignedIn, userEmail, signOut } = useAuth()

const toastMessage = ref('')
const toastType = ref('success')

// Make toast available globally via window
window.showToast = (message, type = 'success') => {
  toastMessage.value = message
  toastType.value = type
}

function goToAuth() {
  router.push('/auth')
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