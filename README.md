# NAME - Boutique Web Agency Landing Page

A breathtaking, modern landing website for NAME, a boutique web agency specializing in custom websites, blogs, and WordPress solutions.

## 🎨 Design Features

- **Dark Theme**: Deep blacks with electric blue accents (#00e5ff)
- **Custom Typography**: Archivo Black (display) + Space Grotesk (body)
- **Heavy Animations**: Powered by Framer Motion with scroll-triggered reveals
- **Glassmorphism**: Backdrop blur effects on cards and overlays
- **Gradient Meshes**: Animated background orbs and gradients
- **Fully Responsive**: Mobile-first design with tablet and desktop optimization

## 🚀 Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety with strict mode
- **Vite 8** - Lightning-fast build tool
- **Framer Motion 12** - Advanced animations
- **CSS Variables** - Theme management
- **Google Fonts** - Archivo Black & Space Grotesk

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🎯 Sections

1. **Hero Section** - Bold headline with animated gradient orbs, CTAs, and stats
2. **About Section** - Split layout with story and code snippet visual
3. **Services Section** - Three service cards with hover animations
4. **Projects Section** - Grid of 6 fictional project showcases
5. **Pricing Section** - Custom pricing approach with consultation CTA
6. **Testimonials Section** - Client reviews with ratings
7. **Contact Section** - Form with contact information cards
8. **Footer** - Full footer with navigation, social links, and back-to-top

## 🎭 Key Components

```
src/
├── components/
│   ├── Navbar.tsx/css      # Sticky navbar with scroll effects
│   ├── Hero.tsx/css        # Hero with animated background
│   ├── About.tsx/css       # Story section with code visual
│   ├── Services.tsx/css    # Service cards with hover effects
│   ├── Projects.tsx/css    # Project grid with overlays
│   ├── Pricing.tsx/css     # Custom pricing section
│   ├── Testimonials.tsx/css # Client testimonials
│   ├── Contact.tsx/css     # Contact form and info
│   └── Footer.tsx/css      # Footer with social links
├── styles/
│   └── variables.css       # CSS custom properties
├── App.tsx                 # Main app component
├── main.tsx               # Entry point
└── index.css              # Global styles
```

## 🎨 Color Palette

```css
--color-bg-primary: #0a0a0f       /* Deep black */
--color-bg-secondary: #13131a     /* Dark navy */
--color-accent: #00e5ff           /* Electric blue */
--color-text-primary: #ffffff     /* White */
--color-text-secondary: #b4b4c8   /* Light gray */
```

## ✨ Animation Features

- Scroll-triggered section reveals using Framer Motion `useInView`
- Staggered children animations for sequential reveals
- Hover effects on cards, buttons, and links
- Animated gradient orbs in hero section
- Smooth page scrolling between sections
- Mobile menu slide-in animation

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 968px
- **Desktop**: > 968px

## 🌐 Navigation

- Smooth scroll to sections
- Sticky navbar with blur effect on scroll
- Mobile hamburger menu
- Progress indicator at the top

## 📄 License

All rights reserved © 2026 NAME Agency

## 🎯 Development

The site uses TypeScript strict mode with no `any` types allowed. All components are strongly typed for maximum type safety.

### Available Scripts

- `npm run dev` - Start development server (with HMR)
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🚀 Deployment

The build output is in the `dist/` folder. Deploy to any static hosting service:

- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront
- Any static web server

## 🎨 Customization

1. **Colors**: Edit `src/styles/variables.css`
2. **Fonts**: Update `index.html` and variables
3. **Content**: Modify component files in `src/components/`
4. **Animations**: Adjust Framer Motion variants in components

---

Built with ❤️ using React + TypeScript + Framer Motion
