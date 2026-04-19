# Deployment Guide

## Prerequisites

```bash
# Build the project first
npm run build
```

This creates a `dist/` folder with optimized production files.

## Deployment Options

### 1. Vercel (Recommended)

**Via CLI:**
```bash
npm install -g vercel
vercel
```

**Via GitHub:**
1. Push code to GitHub
2. Import project in Vercel dashboard
3. Auto-deploy on every push

### 2. Netlify

**Via CLI:**
```bash
npm install -g netlify-cli
netlify deploy --prod
```

**Via Drag & Drop:**
1. Go to https://app.netlify.com/drop
2. Drag the `dist/` folder
3. Site is live!

### 3. GitHub Pages

```bash
# Install gh-pages
npm install -g gh-pages

# Deploy
gh-pages -d dist
```

Add to `package.json`:
```json
{
  "scripts": {
    "deploy": "gh-pages -d dist"
  }
}
```

### 4. AWS S3 + CloudFront

```bash
# Upload to S3
aws s3 sync dist/ s3://your-bucket-name

# Configure as static website
# Create CloudFront distribution
# Point to S3 bucket
```

### 5. Any Static Host

Simply upload the contents of `dist/` to your web server:
- Apache
- Nginx
- Any CDN

## Post-Deployment Checklist

- [ ] Test all sections load correctly
- [ ] Verify smooth scrolling works
- [ ] Check mobile responsiveness
- [ ] Test contact form (if connected)
- [ ] Verify all animations play
- [ ] Check console for errors
- [ ] Test on multiple browsers
- [ ] Verify SEO meta tags
- [ ] Check page load speed
- [ ] Test on actual mobile devices

## Environment Variables

If you need to add environment variables:

Create `.env` file:
```env
VITE_API_URL=your-api-url
VITE_CONTACT_EMAIL=hello@nameagency.rs
VITE_FORMSPREE_FORM_ID=xwvabjvr
```

Access in code:
```typescript
const apiUrl = import.meta.env.VITE_API_URL;
```

## Custom Domain

### Vercel
1. Go to project settings
2. Add custom domain
3. Update DNS records

### Netlify
1. Domain settings
2. Add custom domain
3. Configure DNS

## Performance Optimization

Already optimized, but you can enhance:

1. **Image Optimization**
   - Use WebP format
   - Lazy load images
   - Use responsive images

2. **Caching**
   - Configure cache headers on your host
   - Set long cache times for assets

3. **CDN**
   - Use Cloudflare or similar
   - Edge caching

## Monitoring

Consider adding:
- Google Analytics
- Sentry for error tracking
- PageSpeed Insights monitoring
- Uptime monitoring

## SSL Certificate

Most modern hosts provide free SSL (Let's Encrypt). Make sure HTTPS is enabled.

---

**Ready to Deploy!** 🚀

Choose your preferred platform and deploy in minutes.
