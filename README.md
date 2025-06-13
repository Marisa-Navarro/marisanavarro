# Hairdresser Portfolio

A modern, responsive hairdresser portfolio website built with Next.js and optimized for Netlify deployment.

## Features

- 🎨 Modern, responsive design
- 📱 Mobile-friendly interface
- 🖼️ Gallery with image and video support
- 🌙 Dark/Light theme support
- ⚡ Optimized for fast loading
- 🚀 Static site generation for optimal performance

## Technologies Used

- **Next.js 15** - React framework for production
- **React 19** - UI library
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible UI components
- **TypeScript** - Type-safe JavaScript
- **Lucide React** - Beautiful icons

## Getting Started

### Development

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
```

This will generate static files in the `out` directory.

## Deployment to Netlify

### Method 1: Drag and Drop

1. Run `npm run build`
2. Go to [Netlify](https://netlify.com)
3. Drag and drop the `out` folder to deploy

### Method 2: Git Integration

1. Push your code to GitHub/GitLab
2. Connect your repository to Netlify
3. Set build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `out`
   - **Node version**: `20`

### Method 3: Netlify CLI

1. Install Netlify CLI: `npm install -g netlify-cli`
2. Build the project: `npm run build`
3. Deploy: `netlify deploy --prod --dir=out`

## Project Structure

```
├── app/                 # Next.js app directory
│   ├── page.tsx        # Main page component
│   ├── layout.tsx      # Root layout
│   └── globals.css     # Global styles
├── components/         # React components
│   ├── ui/            # UI components
│   ├── gallery-grid.tsx
│   ├── navbar.tsx
│   └── social-links.tsx
├── hooks/             # Custom React hooks
├── lib/               # Utility functions and mock data
├── styles/            # Additional stylesheets
├── out/               # Built static files (generated)
├── netlify.toml       # Netlify configuration
└── next.config.mjs    # Next.js configuration
```

## Customization

### Adding New Images/Videos

Edit `lib/mock-data.ts` to add new portfolio items:

```typescript
{
  id: 'unique-id',
  title: 'Your Title',
  category: 'Before & After' | 'Color' | 'Cut & Style',
  type: 'image' | 'video',
  imgurl: 'your-cloudinary-url',
},
```

### Styling

The project uses Tailwind CSS. Modify styles in:
- `styles/globals.css` for global styles
- Component files for component-specific styles

### Theme Colors

Update CSS variables in `styles/globals.css` under `:root` and `.dark` selectors.

## Performance Optimizations

✅ Unused dependencies removed  
✅ Unused UI components removed  
✅ Static site generation enabled  
✅ Images optimized for web  
✅ CSS optimized and minified  
✅ JavaScript bundled and minified  

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is private and proprietary.

## Support

For any issues or questions, please contact the development team.

# Next js portfolio website

*Automatically synced with your [v0.dev](https://v0.dev) deployments*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/praveens-projects-865c2331/v0-next-js-portfolio-website)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.dev-black?style=for-the-badge)](https://v0.dev/chat/projects/kavkCjSRhqW)

## Overview

This repository will stay in sync with your deployed chats on [v0.dev](https://v0.dev).
Any changes you make to your deployed app will be automatically pushed to this repository from [v0.dev](https://v0.dev).

## Deployment

Your project is live at:

**[https://vercel.com/praveens-projects-865c2331/v0-next-js-portfolio-website](https://vercel.com/praveens-projects-865c2331/v0-next-js-portfolio-website)**

## Build your app

Continue building your app on:

**[https://v0.dev/chat/projects/kavkCjSRhqW](https://v0.dev/chat/projects/kavkCjSRhqW)**

## How It Works

1. Create and modify your project using [v0.dev](https://v0.dev)
2. Deploy your chats from the v0 interface
3. Changes are automatically pushed to this repository
4. Vercel deploys the latest version from this repository
