# EAT CLEAN Frontend - Vercel Deployment

This is the frontend application for EAT CLEAN healthy meals delivery platform.

## Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/ThanhLuan0202/EatClean_FE)

### Quick Deploy Steps:

1. **Via GitHub Integration (Recommended)**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New" → "Project"
   - Import your GitHub repository: `ThanhLuan0202/EatClean_FE`
   - Root Directory: `frontend`
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Click "Deploy"

2. **Via Vercel CLI**
   ```bash
   # Install Vercel CLI
   npm install -g vercel

   # Login to Vercel
   vercel login

   # Deploy from frontend folder
   cd frontend
   vercel

   # For production
   vercel --prod
   ```

### Environment Variables (Optional for future backend integration)

Add these in Vercel Dashboard → Settings → Environment Variables:

```
VITE_API_URL=https://your-backend-url.com/api
```

### Project Settings in Vercel

- **Framework Preset:** Vite
- **Root Directory:** `frontend`
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`
- **Development Command:** `npm run dev`

### Features

✅ Mock data mode (works without backend)
✅ PWA ready
✅ SEO optimized
✅ Responsive design
✅ Multi-language (VI/EN)

### Post-Deployment

After deployment, your app will be available at:
- Production: `https://your-project.vercel.app`
- Preview: Auto-generated URL for each commit

### Note

Currently running in **MOCK_MODE** - no backend required. To connect real backend later, set `MOCK_MODE = false` in:
- `src/context/AuthContext.jsx`
- `src/context/CartContext.jsx`
- `src/pages/*.jsx`

And add `VITE_API_URL` environment variable.

---

**Live Demo:** Will be available after deployment
**Repository:** https://github.com/ThanhLuan0202/EatClean_FE
