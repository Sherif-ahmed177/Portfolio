# Sherif's Portfolio

A modern, responsive portfolio website built with Astro and React, featuring a beautiful dark/light theme toggle and smooth animations.

## 🚀 Features

- **Modern Design**: Clean, professional design with smooth animations
- **Dark/Light Theme**: Toggle between dark and light modes with persistent preference
- **Responsive**: Fully responsive design that works on all devices
- **Fast Performance**: Built with Astro for optimal performance
- **Interactive Elements**: 
  - Animated background circles
  - Glitch text effects
  - Like button with animations
  - Skills showcase
- **SEO Optimized**: Proper meta tags, Open Graph, and Twitter Card support
- **Personal Branding**: Custom OG images and social media sharing

## 🛠️ Tech Stack

- **Framework**: [Astro](https://astro.build/) - Static site generator
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- **Interactive Components**: [React](https://reactjs.org/) - For dynamic components
- **TypeScript**: Type safety and better development experience
- **Fonts**: Montserrat from Google Fonts
- **Deployment**: Vercel (recommended)

## 📁 Project Structure

```
Portfolio/
├── public/                 # Static assets
│   ├── photo.png          # Personal photo for OG image
│   ├── favicon.png        # Site favicon
│   └── svg/              # Technology icons
├── src/
│   ├── components/        # Astro components
│   │   ├── contact.astro
│   │   ├── footer.astro
│   │   ├── home.astro
│   │   ├── logoWall.astro
│   │   ├── nav.astro
│   │   └── projects.astro
│   ├── React/            # React components
│   │   ├── LetterGlitch.tsx
│   │   ├── LikeButton.tsx
│   │   └── SkillsList.tsx
│   ├── layouts/
│   │   └── Layout.astro  # Main layout with meta tags
│   └── pages/
│       └── index.astro   # Home page
├── astro.config.mjs      # Astro configuration
├── tailwind.config.mjs   # Tailwind configuration
└── package.json          # Dependencies and scripts
```

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- pnpm (recommended) or npm

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd Portfolio
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Start the development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:4321` to see your portfolio

## 🎨 Customization

### Personal Information
- Update your name, title, and description in `src/layouts/Layout.astro`
- Replace `public/photo.png` with your personal photo
- Update the favicon in `public/favicon.png`

### Styling
- Colors and themes are defined in `src/layouts/Layout.astro` CSS variables
- Tailwind classes are used throughout for styling
- Custom animations are in the React components

### Content
- Edit `src/components/` files to update your content
- Modify `src/React/` components for interactive elements
- Update project information in `src/components/projects.astro`

## 📦 Build & Deploy

### Build for Production
```bash
pnpm build
# or
npm run build
```

### Preview Production Build
```bash
pnpm preview
# or
npm run preview
```

### Deploy to Vercel
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically on push

## 🔧 Configuration

### Astro Configuration
The project uses Astro with React integration. See `astro.config.mjs` for configuration details.

### Tailwind Configuration
Custom Tailwind settings are in `tailwind.config.mjs`, including custom colors and animations.

## 📱 Features Breakdown

### Theme Toggle
- Persistent theme preference using localStorage
- Smooth transitions between dark and light modes
- Custom theme icons

### Background Animation
- Dynamic circle generation with random colors and positions
- Blur effects for modern glassmorphism look
- Performance optimized with CSS transforms

### Interactive Components
- **LetterGlitch**: Text animation effect
- **LikeButton**: Interactive like button with animations
- **SkillsList**: Animated skills showcase

## 🎯 SEO & Social Media

The portfolio includes comprehensive SEO optimization:

- **Open Graph tags** for social media sharing
- **Twitter Card support** for Twitter sharing
- **Meta descriptions** and keywords
- **Personal photo** as OG image
- **Structured data** for better search engine understanding

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Astro](https://astro.build/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons from various SVG sources
- Fonts from [Google Fonts](https://fonts.google.com/)

## 📞 Contact

Sherif - [s.ahmed2268@nu.edu.eg]

Project Link: [https://github.com/Sherif-ahmed177/Portfolio](https://github.com/Sherif-ahmed177/Portfolio)

---

⭐ If you found this portfolio helpful, please give it a star!