# PlanifyAI

**Plan, visualize, and track your content calendar — powered by AI.**

PlanifyAI is a modern, responsive web application designed for creators and marketers to plan, visualize, and track their social media content calendar. Built with a focus on sleek UI, strong UX, and impressive animations.

![PlanifyAI Dashboard](./screenshot.png)

## Features

### 📅 Content Calendar
- Interactive calendar view with drag & drop support
- Schedule posts across multiple platforms
- Visual status indicators (Draft, Scheduled, Published)
- Quick-add functionality for rapid content creation

### 🤖 AI Content Generator
- Generate creative content ideas based on topic, audience, and platform
- Get suggested posting times and hashtags
- Platform-specific content recommendations
- Easy integration point for real AI APIs (OpenAI, Claude, etc.)

### 📊 Analytics Dashboard
- Engagement metrics over time (line charts)
- Posts per platform distribution (bar charts)
- Content type breakdown (pie charts)
- Key performance indicators (KPIs)

### 📝 Content Backlog
- Kanban-style content management
- Filter by status (Idea, Draft, Approved, Scheduled, Published)
- Grid and list view options
- Quick scheduling from backlog to calendar

### 🎨 Design Features
- Dark/Light mode toggle
- Neon gradient accents with glassmorphism effects
- Smooth Framer Motion animations throughout
- Fully responsive design
- Modern SaaS-level UI polish

## Tech Stack

- **React** (v18) - UI Framework
- **TypeScript** - Type Safety
- **Vite** - Build Tool & Dev Server
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Recharts** - Data Visualization
- **Zustand** - State Management
- **Lucide React** - Icons
- **date-fns** - Date Utilities

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/planifyai.git

# Navigate to project directory
cd planifyai

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:8080`

### Build for Production

```bash
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── common/          # Reusable UI components
│   ├── layout/          # Layout components (Sidebar, Navbar)
│   ├── modals/          # Modal dialogs
│   └── ui/              # Base UI components (shadcn/ui)
├── data/                # Mock data generators
├── features/
│   ├── ai/              # AI suggestions panel
│   ├── analytics/       # Analytics dashboard
│   ├── calendar/        # Calendar view
│   └── content/         # Content backlog
├── services/            # API services
│   └── ai.ts            # AI service (plug in your API here)
├── store/               # Zustand state management
├── types/               # TypeScript type definitions
└── pages/               # Page components
```

## Connecting a Real AI API

The AI functionality is currently mocked. To connect a real AI API:

1. Create a `.env` file in the project root:
   ```
   VITE_AI_API_KEY=your_api_key_here
   ```

2. Update `src/services/ai.ts` with your API integration:
   ```typescript
   const response = await fetch('https://api.openai.com/v1/chat/completions', {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
       'Authorization': `Bearer ${import.meta.env.VITE_AI_API_KEY}`,
     },
     body: JSON.stringify({
       model: 'gpt-4',
       messages: [{ role: 'user', content: prompt }]
     }),
   });
   ```

## Customization

### Theme Colors

Edit `src/index.css` to customize the color scheme:

```css
:root {
  --neon-purple: 270 95% 65%;
  --neon-blue: 210 100% 60%;
  --neon-cyan: 185 100% 55%;
  /* ... other colors */
}
```

### Adding New Platforms

1. Add the platform to `src/types/index.ts`
2. Add platform colors in `src/data/analytics.ts`
3. Add platform icon in `src/components/common/PlatformIcon.tsx`

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for personal or commercial purposes.

---

Built with ❤️ for the creator community
