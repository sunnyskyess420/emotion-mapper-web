<template>
  <div class="flex items-center justify-center">
    <div class="relative">
      <div class="w-12 h-12 border-4 border-slate-600 border-t-blue-500 rounded-full animate-spin"></div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>
