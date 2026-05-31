# Emotion Mapper Web 🎭

A modern, privacy-focused emotion tracking web application built with Vue 3. Track your emotional patterns, identify triggers, and gain insights into your mental well-being.

## ✨ Features

- **Emotion Entry Form** - Log emotions with 12 detailed fields including intensity, physical sensations, triggers, location, time of day, coping strategies, and more
- **History & Analytics** - View all your entries with powerful search and filtering capabilities
- **Visual Analytics** - Interactive charts showing intensity trends over time and emotion distribution
- **Data Export** - Export your data as JSON or CSV for backup or analysis
- **Edit & Delete** - Full CRUD operations for managing your entries
- **Privacy First** - All data stored locally in your browser using IndexedDB
- **Dark Theme** - Beautiful dark mode interface
- **Responsive Design** - Works seamlessly on desktop and mobile devices
- **Toast Notifications** - Elegant feedback for user actions

## 🛠️ Tech Stack

- **Frontend**: Vue 3 (Composition API)
- **Build Tool**: Vite
- **State Management**: Pinia
- **Routing**: Vue Router (Hash Mode)
- **Storage**: Dexie.js (IndexedDB wrapper)
- **Styling**: Tailwind CSS
- **Charts**: Chart.js
- **Icons**: Lucide Icons

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm

### Local Development

1. Clone the repository:
```bash
git clone https://github.com/sunnyskyess420/emotion-mapper-web.git
cd emotion-mapper-web
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 🚀 Deployment

This project is deployed on GitHub Pages at:
https://sunnyskyess420.github.io/emotion-mapper-web/

### Deploy to GitHub Pages

1. Fork this repository
2. Enable GitHub Pages in repository settings
3. Set "Source" to "GitHub Actions"
4. Push your changes to the `main` branch
5. The GitHub Actions workflow will automatically deploy

## 📱 Usage

### Adding an Entry
1. Navigate to "Emotion Entry"
2. Fill in the emotion name and intensity
3. Optionally add details like physical sensations, triggers, location, etc.
4. Click "Save Entry"

### Viewing History
1. Navigate to "History"
2. View all your entries in reverse chronological order
3. Use search and filters to find specific entries
4. View analytics charts at the top

### Exporting Data
1. Navigate to "History"
2. Click "Export JSON" or "Export CSV"
3. The file will download automatically

### Editing/Deleting
1. Navigate to "History"
2. Click "Edit" on any entry to modify it
3. Click "Delete" to remove an entry (with confirmation)

## 🔒 Privacy

- All data is stored locally in your browser's IndexedDB
- No data is sent to any server
- Your entries never leave your device
- Export functionality allows you to backup your data

## 📊 Features in Detail

### Emotion Fields
- Emotion name
- Intensity (1-10 scale)
- Short note
- Physical sensations
- Triggers
- Location
- Time of day
- Coping strategies used
- Duration
- Social context
- Sleep quality
- Energy level

### Analytics
- Total entries count
- Most common emotion
- Average intensity
- Intensity trend chart (line chart)
- Emotion distribution chart (doughnut chart)

### Search & Filter
- Search across notes, emotions, sensations, triggers, and location
- Filter by specific emotion
- Filter by intensity level
- Clear all filters with one click

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

Built with modern web technologies to provide a simple, effective tool for emotional self-awareness and mental well-being tracking.

---

**Made with ❤️ using Vue 3**

