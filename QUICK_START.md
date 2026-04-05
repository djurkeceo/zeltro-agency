# Quick Start Guide

## Get Started in 3 Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

The site will be available at `http://localhost:5173` (or next available port).

### 3. View the Site
Open your browser and navigate to the local URL displayed in the terminal.

## What You'll See

✨ **8 Beautiful Sections**:
- Hero with animated gradient orbs
- About with story and code visual
- Services with 3 cards
- Projects grid with 6 showcases
- Custom pricing section
- 3 Client testimonials
- Contact form with info cards
- Complete footer

🎨 **Design Highlights**:
- Dark theme with electric blue accent
- Smooth scroll animations
- Glassmorphism effects
- Fully responsive
- Sticky navbar with blur

## Making Changes

### Update Content
Edit the component files in `src/components/`:
- `Hero.tsx` - Main headline and hero content
- `About.tsx` - Agency story and values
- `Services.tsx` - Service offerings
- `Projects.tsx` - Project showcases
- `Contact.tsx` - Contact form and info

### Update Colors
Edit `src/styles/variables.css`:
```css
--color-accent: #00e5ff;  /* Change this to your color */
```

### Update Fonts
Edit `index.html` Google Fonts import and update variables in `src/styles/variables.css`.

## Build for Production

```bash
npm run build
```

Output will be in `dist/` folder - ready to deploy!

## Need Help?

Check the main README.md for detailed documentation.

---

**Development Server Running**: http://localhost:5175
