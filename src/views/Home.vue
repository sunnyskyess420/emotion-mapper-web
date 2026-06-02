<template>
  <div class="min-h-screen zen-background text-[#e7edf2]">
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-4xl zen-heading text-center mb-8 bg-gradient-to-r from-[#8a7aa0] to-[#7a9a88] bg-clip-text text-transparent">Emotion Mapper</h1>
      
      <div class="max-w-2xl mx-auto zen-card p-6 mb-8">
        <p class="text-lg text-[#b9c3cc] mb-6 leading-relaxed">
          Emotion Mapper helps you track emotions, body sensations, triggers, and coping tools so you can notice patterns over time. Start by adding an entry, then use History to review what shows up most often.
        </p>
        
        <div class="flex flex-col sm:flex-row gap-4 mb-8">
          <router-link to="/emotion-entry" class="zen-button-primary text-center py-3 px-6 font-semibold">
            Start an Entry
          </router-link>
          <router-link to="/history" class="zen-button text-center py-3 px-6 font-semibold">
            Review History
          </router-link>
        </div>
      </div>
      
      <div class="max-w-2xl mx-auto zen-card p-6 mb-8">
        <h2 class="text-2xl zen-heading mb-4">How to Use It</h2>
        <ul class="list-disc list-inside text-[#b9c3cc] space-y-2">
          <li>Add an entry when you notice an emotion</li>
          <li>Review your history to see patterns</li>
          <li>Notice which coping tools help most</li>
        </ul>
      </div>
      
      <div class="max-w-2xl mx-auto zen-card p-6 mb-8">
        <h2 class="text-2xl zen-heading mb-4">Key Features</h2>
        <ul class="list-disc list-inside text-[#b9c3cc] space-y-2">
          <li>Pick emotions from the wheel</li>
          <li>Track body sensations and triggers</li>
          <li>Log coping skills you used</li>
          <li>Review patterns in History</li>
          <li>Keep your data private on your device</li>
        </ul>
      </div>
      
      <div class="max-w-2xl mx-auto zen-card p-6">
        <h2 class="text-2xl zen-heading mb-4">Privacy</h2>
        <p class="text-[#b9c3cc]">
          Your data stays on your device. No account, no cloud, no tracking. Export your entries anytime to back them up.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>
