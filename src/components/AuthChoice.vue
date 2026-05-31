<template>
  <div class="min-h-screen bg-slate-900 text-white flex items-center justify-center px-4">
    <div class="max-w-md w-full bg-slate-800 rounded-lg p-8">
      <h1 class="text-3xl font-bold text-center mb-2">Welcome to Emotion Mapper</h1>
      <p class="text-slate-300 text-center mb-8">Choose how you'd like to use the app</p>
      
      <div class="space-y-4">
        <!-- Guest Mode -->
        <button 
          @click="continueAsGuest"
          class="w-full bg-slate-700 hover:bg-slate-600 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-3"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
          </svg>
          <div class="text-left">
            <div class="font-semibold">Continue as Guest</div>
            <div class="text-sm text-slate-400">Local-only, no account required</div>
          </div>
        </button>
        
        <!-- Sign In -->
        <button 
          @click="signIn"
          :disabled="isSigningIn"
          class="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-3"
        >
          <svg v-if="!isSigningIn" class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          <svg v-else class="w-6 h-6 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <div class="text-left">
            <div class="font-semibold">{{ isSigningIn ? 'Signing in...' : 'Sign in with Google' }}</div>
            <div class="text-sm text-slate-300">Cloud backup & cross-device sync</div>
          </div>
        </button>
      </div>
      
      <div class="mt-8 pt-6 border-t border-slate-700">
        <h3 class="text-sm font-semibold mb-3 text-slate-400">What's the difference?</h3>
        <div class="space-y-2 text-sm text-slate-300">
          <div class="flex items-start gap-2">
            <span class="text-blue-400 mt-1">•</span>
            <span><strong>Guest:</strong> Data stays on this device only. Export to backup.</span>
          </div>
          <div class="flex items-start gap-2">
            <span class="text-blue-400 mt-1">•</span>
            <span><strong>Sign in:</strong> Data synced across devices, cloud backup, offline access.</span>
          </div>
        </div>
      </div>
      
      <p class="text-center text-slate-500 text-sm mt-6">
        You can upgrade to a cloud account later from the app
      </p>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'

const router = useRouter()
const { setGuestMode, signInWithGoogle, isSigningIn } = useAuth()

function continueAsGuest() {
  setGuestMode()
  router.push('/')
}

async function signIn() {
  await signInWithGoogle()
  // If sign-in successful, redirect to home
  // This will be handled by the signInWithGoogle function
}
</script>
