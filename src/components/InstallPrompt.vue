<template>
  <transition name="install-slide">
    <div
      v-if="visible"
      class="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 z-[60] zen-card p-4 shadow-2xl"
      role="dialog"
      aria-labelledby="install-prompt-title"
    >
      <div class="flex items-start gap-3">
        <div class="text-3xl flex-shrink-0">📱</div>
        <div class="flex-1 min-w-0">
          <h3 id="install-prompt-title" class="font-semibold text-[#e7edf2] mb-1">
            Install Emotion Mapper
          </h3>
          <p class="text-sm text-[#b9c3cc] mb-3 leading-snug">
            Add it to your home screen for quick access — works offline, opens full-screen like a native app.
          </p>
          <div class="flex gap-2">
            <button
              @click="install"
              class="zen-button-primary text-sm px-3 py-1.5 font-semibold"
            >
              Install
            </button>
            <button
              @click="dismiss"
              class="zen-button text-sm px-3 py-1.5"
            >
              Maybe later
            </button>
          </div>
        </div>
        <button
          @click="dismiss"
          class="text-[#b9c3cc] hover:text-white text-lg leading-none -mt-1 -mr-1 p-1"
          aria-label="Close install prompt"
        >
          ✕
        </button>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const visible = ref(false)
let deferredPrompt = null
const DISMISS_KEY = 'pwa-install-dismissed-at'
const DISMISS_COOLDOWN_MS = 7 * 24 * 60 * 60 * 1000 // 7 days

function onBeforeInstallPrompt(e) {
  // Prevent the mini-infobar from showing on mobile Chrome
  e.preventDefault()
  deferredPrompt = e

  // Respect the user's previous dismissal for 7 days
  const dismissedAt = parseInt(localStorage.getItem(DISMISS_KEY) || '0', 10)
  if (Date.now() - dismissedAt < DISMISS_COOLDOWN_MS) return

  // Show after a short delay so it doesn't pop up instantly on first load
  setTimeout(() => {
    visible.value = true
  }, 4000)
}

async function install() {
  if (!deferredPrompt) return
  visible.value = false
  deferredPrompt.prompt()
  const { outcome } = await deferredPrompt.userChoice
  console.log('PWA install prompt outcome:', outcome)
  deferredPrompt = null
  // If dismissed or accepted, hide for at least 30 days
  localStorage.setItem(DISMISS_KEY, String(Date.now()))
}

function dismiss() {
  visible.value = false
  localStorage.setItem(DISMISS_KEY, String(Date.now()))
}

onMounted(() => {
  window.addEventListener('beforeinstallprompt', onBeforeInstallPrompt)
})

onBeforeUnmount(() => {
  window.removeEventListener('beforeinstallprompt', onBeforeInstallPrompt)
})
</script>

<style scoped>
.install-slide-enter-active,
.install-slide-leave-active {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.install-slide-enter-from,
.install-slide-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>

