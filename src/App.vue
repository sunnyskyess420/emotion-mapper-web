<template>
  <div class="min-h-screen zen-background text-[#e7edf2]">
    <nav class="zen-navbar fixed top-0 left-0 right-0 z-50">
      <div class="container mx-auto px-4">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center gap-8">
            <router-link to="/" class="nav-link font-semibold transition-colors duration-200">
              🎭 Home
            </router-link>
            <router-link to="/emotion-entry" class="nav-link font-semibold transition-colors duration-200">
              🎭 Emotion Entry
            </router-link>
            <router-link to="/history" class="nav-link font-semibold transition-colors duration-200">
              🎭 History
            </router-link>
            <router-link to="/about" class="nav-link font-semibold transition-colors duration-200">
              🎭 About
            </router-link>
          </div>
          <div class="flex items-center gap-4">
            <span class="text-[#b9c3cc] text-sm">Local Mode</span>
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
/* Global Background Image - Change this URL to swap the background image */
:root {
  --site-background-image: url('/images/site_bg.png');
}

/* Zen Theme Base Styles */
.zen-background {
  background-image: var(--site-background-image);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  color: #e7edf2;
}

.zen-navbar {
  background: rgba(31, 40, 49, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
}

@supports not (backdrop-filter: blur(12px)) {
  .zen-navbar {
    background: #1f2831;
  }
}

.nav-link {
  color: #b9c3cc;
  transition: color 0.2s ease;
  padding: 0.5rem 0.75rem;
  border-radius: 8px;
}

.nav-link:hover {
  color: #a996c2;
  background: rgba(169, 150, 194, 0.1);
}

.nav-link:focus-visible {
  outline: 2px solid #a996c2;
  outline-offset: 2px;
  background: rgba(169, 150, 194, 0.15);
}

/* Zen Card Style */
.zen-card {
  background: rgba(31, 40, 49, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 14px 40px rgba(0, 0, 0, 0.24);
  border-radius: 18px;
}

@supports not (backdrop-filter: blur(12px)) {
  .zen-card {
    background: #1f2831;
  }
}

/* Zen Button Style */
.zen-button {
  background: rgba(143, 170, 152, 0.25);
  border: 1px solid rgba(143, 170, 152, 0.4);
  color: #e7edf2;
  transition: all 0.2s ease;
  border-radius: 12px;
  padding: 0.5rem 1rem;
}

.zen-button:hover {
  background: rgba(143, 170, 152, 0.35);
  border-color: rgba(143, 170, 152, 0.6);
  transform: translateY(-1px);
}

.zen-button:active {
  transform: translateY(0);
}

.zen-button:focus-visible {
  outline: 2px solid #8faa98;
  outline-offset: 2px;
  box-shadow: 0 0 0 4px rgba(143, 170, 152, 0.2);
}

.zen-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

.zen-button-primary {
  background: rgba(169, 150, 194, 0.3);
  border: 1px solid rgba(169, 150, 194, 0.5);
}

.zen-button-primary:hover {
  background: rgba(169, 150, 194, 0.4);
  border-color: rgba(169, 150, 194, 0.7);
}

.zen-button-primary:focus-visible {
  outline: 2px solid #a996c2;
  outline-offset: 2px;
  box-shadow: 0 0 0 4px rgba(169, 150, 194, 0.2);
}

.zen-button-danger {
  background: rgba(239, 68, 68, 0.25);
  border: 1px solid rgba(239, 68, 68, 0.4);
}

.zen-button-danger:hover {
  background: rgba(239, 68, 68, 0.35);
  border-color: rgba(239, 68, 68, 0.6);
}

.zen-button-danger:focus-visible {
  outline: 2px solid #ef4444;
  outline-offset: 2px;
  box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.2);
}

/* Zen Input Style */
.zen-input {
  background: rgba(24, 30, 36, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #e7edf2;
  border-radius: 12px;
  transition: all 0.2s ease;
  padding: 0.5rem 0.75rem;
}

.zen-input:focus {
  outline: none;
  border-color: rgba(169, 150, 194, 0.5);
  box-shadow: 0 0 0 3px rgba(169, 150, 194, 0.15);
}

.zen-input:focus-visible {
  outline: 2px solid #a996c2;
  outline-offset: -2px;
  border-color: rgba(169, 150, 194, 0.6);
}

.zen-input::placeholder {
  color: #8b9ba5;
}

.zen-input:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Zen Select Style */
.zen-select {
  background: rgba(24, 30, 36, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #e7edf2;
  border-radius: 12px;
  transition: all 0.2s ease;
  padding: 0.5rem 0.75rem;
}

.zen-select:focus {
  outline: none;
  border-color: rgba(169, 150, 194, 0.5);
  box-shadow: 0 0 0 3px rgba(169, 150, 194, 0.15);
}

.zen-select:focus-visible {
  outline: 2px solid #a996c2;
  outline-offset: -2px;
  border-color: rgba(169, 150, 194, 0.6);
}

.zen-select option {
  background: #1d242b;
  color: #e7edf2;
}

.zen-select:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Zen Text Styles */
.zen-heading {
  font-weight: 500;
  letter-spacing: -0.02em;
}

.zen-subheading {
  font-weight: 400;
  color: #b9c3cc;
}

/* Zen Tag/Chip Style */
.zen-tag {
  background: rgba(127, 153, 173, 0.25);
  border: 1px solid rgba(127, 153, 173, 0.4);
  color: #e7edf2;
  border-radius: 8px;
  padding: 0.25rem 0.75rem;
}

/* Page transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Navigation hover effects */
a {
  transition: all 0.2s ease;
}

/* Button hover effects */
button {
  transition: all 0.2s ease;
}

button:hover {
  transform: scale(1.02);
}

button:active {
  transform: scale(0.98);
}

/* Card hover effects */
.bg-slate-800 {
  transition: all 0.2s ease;
}

.bg-slate-800:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}
</style>