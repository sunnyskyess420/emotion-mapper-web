# Emotion Mapper Web 🎭

A modern, privacy-focused emotion tracking web application. Track your emotional patterns, identify triggers, and gain insights into your mental well-being with evidence-based DBT coping strategies.

**Live Demo:** https://sunnyskyess420.github.io/emotion-mapper-web/

## ✨ Features

- **Emotion Wheel Picker** - Interactive popup with 50+ emotions organized by categories (Core, Positive, Negative, Calm, High Energy). Select multiple emotions at once for comprehensive tracking
- **Physical Sensations Tracker** - Categorized body signals including:
  - Head & Face (headache, jaw clenching, teeth grinding, forehead tension, eye strain)
  - Chest & Heart (tight chest, heart pounding, chest pressure, rapid heartbeat)
  - Stomach & Digestive (butterflies, nausea, stomach pain, digestive issues)
  - Muscles & Tension (tight shoulders, neck tension, back pain, clenched fists, muscle tension)
  - Breathing (shortness of breath, shallow breathing, rapid breathing, paused breathing)
  - Skin & Temperature (sweating, hot flashes, cold chills, skin sensitivity)
  - Energy & Fatigue (shaking, trembling, weakness, fatigue, restlessness)
- **DBT Coping Strategies** - Evidence-based skills organized into four categories:
  - **Mindfulness** - Wise Mind, "What" Skills (Observe, Describe, Participate), "How" Skills (One-mindfully, Non-judgmentally, Effectively)
  - **Interpersonal Effectiveness** - DEAR MAN (Describe, Express, Assert, Reinforce, Mindful, Appear confident, Negotiate), GIVE (Gentle, Interested, Validate, Easy manner), FAST (Fair, Apologies only if necessary, Stick to values, Truthful)
  - **Emotional Regulation** - VITALS to success (Validate yourself, Imagine success, Take small steps, Applaud yourself, Lighten the load, Sweeten the pot), The ABC's of DBT (Accumulate positive experiences, Build mastery, Cope for emotional events), PLEASE (Treat physical illness, Eating balanced, Avoid alternative drugs, Sleep balanced, Exercise consistently), Check the facts, Act Opposite to Emotion, Experience emotions as waves, Thoughts/feelings/emotions are not facts
  - **Distress Tolerance** - TIPP (Tip the temperature, Intense exercise, Paced breathing, Progressive muscle relaxation), STOP (Stop, Take a step back, Observe, Proceed mindfully), ACCEPTS (Activities, Contributions, Comparison, Emotion opposites, Pushing away, Thoughts, Sensations), IMPROVE (Imagery, Meaning, Prayer, Relaxation, One thing at a time, Vacation, Encouragement), Thought Modification (Radical acceptance, Turn the mind to acceptance, Pain + non-acceptance = suffering), Self-Soothe with the 5 Senses (Vision, Touch, Hearing, Smell, Taste), Pros/Cons, Half smile/willing hands, Observe the breath
- **Emotion Entry Form** - Log emotions with 12 detailed fields including intensity, triggers, location, time of day, coping strategies, and more
- **History & Analytics** - View all your entries with powerful search and filtering capabilities
- **Visual Analytics** - Interactive charts showing intensity trends over time and emotion distribution
- **Data Export** - Export your data as JSON or CSV for backup or analysis
- **Edit & Delete** - Full CRUD operations for managing your entries
- **Privacy First** - All data stored locally in your browser using IndexedDB (100% offline, no cloud sync)
- **Dark Theme** - Beautiful dark mode interface with gradient backgrounds and smooth animations
- **Responsive Design** - Works seamlessly on desktop and mobile devices
- **Toast Notifications** - Elegant feedback for user actions with backdrop blur effects

## � Getting Started

### Using the App

1. **Visit the App**
   - Go to: https://sunnyskyess420.github.io/emotion-mapper-web/
   - No installation required - it works directly in your browser

2. **Add Your First Entry**
   - Click "Emotion Entry" in the navigation
   - Click the "Emotions" field to open the Emotion Wheel Picker
   - Select one or more emotions from the organized categories:
     - Core Emotions (Joy, Sadness, Fear, Anger, Disgust, Surprise)
     - Positive (Happy, Excited, Grateful, Hopeful, and more)
     - Negative (Anxious, Depressed, Frustrated, Angry, and more)
     - Calm/Neutral (Calm, Peaceful, Relaxed, Serene, and more)
     - High Energy (Excited, Energetic, Enthusiastic, and more)
   - Click "Confirm" to save your emotion selection
   - Set the intensity level (1-10)
   - Add a short note about how you're feeling
   - Optionally fill in additional details:
     - **Physical Sensations** - Click to select from categorized body signals (head & face, chest & heart, stomach & digestive, muscles & tension, breathing, skin & temperature, energy & fatigue)
     - **Triggers** (e.g., "work deadline", "family gathering")
     - **Location** (e.g., "home", "office", "coffee shop")
     - **Time of day** (e.g., "morning", "afternoon", "evening")
     - **Coping Strategies** - Click to select DBT skills organized into four categories: Mindfulness (Wise Mind, "What" Skills, "How" Skills), Interpersonal Effectiveness (DEAR MAN, GIVE, FAST), Emotional Regulation (VITALS, ABC's, PLEASE, Check the facts, Act Opposite to Emotion), and Distress Tolerance (TIPP, STOP, ACCEPTS, IMPROVE, Thought Modification, Self-Soothe with the 5 Senses)
     - **Duration** of the emotion
     - **Social context** (e.g., "alone", "with friends")
     - **Sleep quality**
     - **Energy level**
   - Click "Save Entry"

3. **View Your History**
   - Click "History" in the navigation
   - See all your entries in reverse chronological order
   - View statistics at the top:
     - Total entries count
     - Most common emotion
     - Average intensity
   - View interactive charts:
     - Intensity trend over time (line chart)
     - Emotion distribution (doughnut chart)

4. **Search & Filter**
   - Use the search box to find entries by emotion, note, sensations, triggers, or location
   - Filter by specific emotion
   - Filter by intensity level
   - Click "Clear filters" to reset

5. **Edit or Delete Entries**
   - Click "Edit" on any entry to modify it
   - Click "Delete" to remove an entry (with confirmation)

6. **Export Your Data**
   - Click "Export JSON" to download all entries as a JSON file
   - Click "Export CSV" to download as a CSV spreadsheet
   - Use exports to backup your data or analyze it elsewhere

## 🔒 Privacy & Data

- **Local Storage Only** - All data is stored in your browser's IndexedDB
- **No Server** - Your data never leaves your device
- **No Account Required** - Use the app without signing up
- **Export Your Data** - Download your entries anytime for backup
- **Clear Data** - Clear your browser data to remove all entries

**Important:** Since data is stored locally, clearing your browser cache or using incognito mode will delete your entries. Export your data regularly if you want to keep it.

## 📱 Browser Compatibility

Works on all modern browsers:
- Chrome/Edge (recommended)
- Firefox
- Safari
- Opera

**Mobile Support:** Fully responsive design works on smartphones and tablets.

## 💡 Tips for Better Tracking

1. **Be Consistent** - Log entries at regular times (morning, evening, or when emotions change)
2. **Be Specific** - Use detailed notes to remember context
3. **Track Triggers** - Note what caused the emotion to identify patterns
4. **Monitor Intensity** - Use the 1-10 scale to track emotion strength
5. **Review Weekly** - Check your analytics to spot trends
6. **Export Regularly** - Backup your data to prevent loss

## 🤝 Support

If you encounter any issues:
- Check that you're using a modern browser
- Ensure JavaScript is enabled
- Try refreshing the page
- Clear your browser cache if the app behaves unexpectedly

## 📊 Understanding Your Analytics

**Intensity Trend Chart:**
- Shows how your emotion intensity changes over time
- Look for patterns in high/low intensity periods
- Identify when you typically feel most intense emotions

**Emotion Distribution Chart:**
- Shows which emotions you experience most frequently
- Helps identify your emotional baseline
- Reveals which emotions dominate your experience

## 🎯 Use Cases

- **Mental Health Tracking** - Monitor mood patterns for therapy or self-awareness
- **Stress Management** - Identify stress triggers and coping strategies
- **Journaling** - Quick emotion logging with rich detail
- **Self-Improvement** - Track progress in emotional regulation
- **Mindfulness** - Develop awareness of emotional states

---

**Made with ❤️ for emotional self-awareness**

