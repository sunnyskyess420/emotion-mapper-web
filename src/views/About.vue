<template>
  <div class="min-h-screen bg-slate-900 text-white">
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-4xl font-bold text-center mb-8">About Emotion Mapper</h1>
      <div class="max-w-2xl mx-auto bg-slate-800 rounded-lg p-6">
        <h2 class="text-2xl font-semibold mb-4">Privacy-First Emotional Tracking</h2>
        <p class="text-slate-300 mb-4">
          Emotion Mapper is a local-first application that stores all your data in your browser using IndexedDB.
        </p>
        <p class="text-slate-300 mb-4">
          Your data never leaves your device - no cloud storage, no accounts, no tracking.
        </p>
        
        <h3 class="text-xl font-semibold mb-3 mt-6">Features</h3>
        <ul class="list-disc list-inside text-slate-300 space-y-2 mb-4">
          <li><strong>Emotion Wheel Picker</strong> - Select from 50+ emotions organized by categories (Core, Positive, Negative, Calm, High Energy)</li>
          <li><strong>Physical Sensations Tracker</strong> - Categorized body signals including head & face, chest & heart, stomach & digestive, muscles & tension, breathing, skin & temperature, and energy & fatigue</li>
          <li><strong>DBT Coping Strategies</strong> - Evidence-based skills organized into four categories: Mindfulness (Wise Mind, "What" Skills, "How" Skills), Interpersonal Effectiveness (DEAR MAN, GIVE, FAST), Emotional Regulation (VITALS, ABC's, PLEASE, Check the facts, Act Opposite to Emotion), and Distress Tolerance (TIPP, STOP, ACCEPTS, IMPROVE, Thought Modification, Self-Soothe with the 5 Senses)</li>
          <li><strong>Rich Entry Details</strong> - Track intensity, triggers, location, time of day, duration, social context, sleep quality, and energy level</li>
          <li><strong>Visual Analytics</strong> - Interactive charts showing intensity trends over time and emotion distribution</li>
          <li><strong>Search & Filter</strong> - Find entries by emotion, note, sensations, triggers, or location</li>
          <li><strong>Edit & Delete</strong> - Full control over your entries</li>
          <li><strong>Data Export</strong> - Export as JSON or CSV for backup or therapist sharing</li>
          <li><strong>100% Offline</strong> - Works without internet connection</li>
        </ul>
        
        <h3 class="text-xl font-semibold mb-3 mt-6">Data Privacy</h3>
        <p class="text-slate-300 mb-4">
          All data is stored locally in your browser's IndexedDB. Your entries are never transmitted to any server. Clear your browser data to remove all entries.
        </p>
        <p class="text-slate-300">
          Export your data regularly to backup your entries.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
// About page component
</script>
