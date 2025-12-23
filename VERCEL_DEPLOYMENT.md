# 🚀 Vercel Deployment Guide for AMovie

This document explains all the changes made to fix Vercel deployment issues and provides step-by-step deployment instructions.

## 🔍 Issues Identified and Fixed

### 1. **Hardcoded API Key**
- **Problem**: API key was hardcoded in `frontend/src/services/api.js`
- **Fix**: Changed to use environment variable `VITE_TMDB_API_KEY`
- **File**: `frontend/src/services/api.js`

### 2. **Incorrect Base Path**
- **Problem**: `vite.config.js` had `base: "/AMovie"` which causes routing issues
- **Fix**: Changed to `base: "/"` for root domain deployment
- **File**: `frontend/vite.config.js`

### 3. **Missing Vercel Configuration**
- **Problem**: No `vercel.json` to configure build settings and SPA routing
- **Fix**: Created `vercel.json` with:
  - Root directory pointing to `frontend/`
  - Proper build commands
  - SPA rewrite rules for React Router
- **File**: `vercel.json` (root level)

### 4. **Missing Environment Variable Template**
- **Problem**: No `.env.example` file for reference
- **Fix**: Created `frontend/.env.example` with API key placeholder
- **File**: `frontend/.env.example`

### 5. **Missing Node.js Version Specification**
- **Problem**: No engine specification in `package.json`
- **Fix**: Added `engines` field specifying Node.js >= 18.0.0
- **File**: `frontend/package.json`

### 6. **SPA Routing Configuration**
- **Problem**: React Router (BrowserRouter) requires server-side rewrites for client-side routing
- **Fix**: Added rewrite rules in `vercel.json` to redirect all routes to `index.html`

## 📁 Updated Project Structure

```
AMovie/
├── frontend/
│   ├── .env.example          # NEW: Environment variable template
│   ├── .gitignore            # UPDATED: Added .env files
│   ├── dist/                 # Build output (gitignored)
│   ├── node_modules/         # Dependencies (gitignored)
│   ├── package.json          # UPDATED: Added engines field
│   ├── vite.config.js        # UPDATED: Fixed base path
│   ├── src/
│   │   └── services/
│   │       └── api.js        # UPDATED: Uses env variables
│   └── ...
├── vercel.json               # NEW: Vercel configuration
├── .gitignore               # NEW: Root-level gitignore
└── README.md
```

## 🔧 Configuration Files

### `vercel.json` (Root Level)
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "vite",
  "rootDirectory": "frontend",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

**Key Settings:**
- `rootDirectory: "frontend"` - Tells Vercel where your app is located
- `outputDirectory: "dist"` - Vite's default build output
- `rewrites` - Ensures all routes serve `index.html` for SPA routing

### `frontend/package.json` (Updated)
Added engines specification:
```json
"engines": {
  "node": ">=18.0.0",
  "npm": ">=9.0.0"
}
```

### `frontend/vite.config.js` (Updated)
Changed base path:
```javascript
export default defineConfig({
  plugins: [react()],
  base: '/',  // Changed from "/AMovie"
})
```

### `frontend/src/services/api.js` (Updated)
Now uses environment variables:
```javascript
const API_KEY = import.meta.env.VITE_TMDB_API_KEY || "";
```

## 📋 Step-by-Step Deployment Instructions

### Prerequisites
1. A Vercel account (sign up at [vercel.com](https://vercel.com))
2. A GitHub/GitLab/Bitbucket account (or use Vercel CLI)
3. TMDB API key (get from [themoviedb.org](https://www.themoviedb.org/settings/api))

### Method 1: Deploy via Vercel Dashboard (Recommended)

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Fix Vercel deployment configuration"
   git push origin main
   ```

2. **Import Project on Vercel**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Click "Import Git Repository"
   - Select your repository
   - Vercel will auto-detect settings from `vercel.json`

3. **Configure Environment Variables**
   - In Vercel dashboard, go to your project → Settings → Environment Variables
   - Add a new variable:
     - **Name**: `VITE_TMDB_API_KEY`
     - **Value**: Your TMDB API key
     - **Environment**: Production, Preview, Development (select all)
   - Click "Save"

4. **Deploy**
   - Click "Deploy" button
   - Vercel will:
     - Install dependencies (`npm install` in `frontend/`)
     - Build the project (`npm run build`)
     - Deploy to production

5. **Verify Deployment**
   - Wait for build to complete (usually 1-2 minutes)
   - Click "Visit" to open your deployed app
   - Test navigation: `/` and `/favorites` should work

### Method 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Navigate to project root**
   ```bash
   cd C:\Users\HP\OneDrive\Desktop\AMovie
   ```

4. **Deploy**
   ```bash
   vercel
   ```
   - Follow prompts:
     - Link to existing project or create new
     - Confirm settings (should auto-detect from `vercel.json`)

5. **Set Environment Variables**
   ```bash
   vercel env add VITE_TMDB_API_KEY
   ```
   - Enter your API key when prompted
   - Select environments (Production, Preview, Development)

6. **Deploy to Production**
   ```bash
   vercel --prod
   ```

## ✅ Verification Checklist

After deployment, verify:

- [ ] Build completes without errors
- [ ] Home page (`/`) loads correctly
- [ ] Favorites page (`/favorites`) loads correctly
- [ ] Direct URL access works (e.g., `/favorites` in new tab)
- [ ] API calls work (movies load on home page)
- [ ] Search functionality works
- [ ] Movie details modal opens
- [ ] Favorites functionality works

## 🐛 Troubleshooting

### Build Fails: "Command not found"
- **Solution**: Ensure `vercel.json` has correct `rootDirectory` set to `frontend`

### 404 Errors on Routes
- **Solution**: Verify `rewrites` in `vercel.json` redirects all routes to `/index.html`

### API Calls Fail: "API Error"
- **Solution**: 
  1. Check environment variable `VITE_TMDB_API_KEY` is set in Vercel dashboard
  2. Ensure variable name starts with `VITE_` (required for Vite)
  3. Redeploy after adding environment variables

### Build Succeeds but App Shows Blank Page
- **Solution**: 
  1. Check browser console for errors
  2. Verify `outputDirectory` in `vercel.json` matches Vite's output (`dist`)
  3. Check that `index.html` exists in `frontend/dist/` after build

### Environment Variables Not Working
- **Solution**: 
  1. Variables must start with `VITE_` to be exposed to client
  2. Redeploy after adding/changing environment variables
  3. Check Vercel logs for build errors

## 📝 Important Notes

1. **Environment Variables**: 
   - Must be prefixed with `VITE_` for Vite to expose them
   - Set in Vercel dashboard → Settings → Environment Variables
   - Changes require redeployment

2. **Build Output**: 
   - Vite builds to `frontend/dist/` by default
   - `vercel.json` correctly points to this directory

3. **SPA Routing**: 
   - React Router uses client-side routing
   - `vercel.json` rewrites ensure all routes serve `index.html`

4. **API Key Security**: 
   - Never commit `.env` files (already in `.gitignore`)
   - Use Vercel's environment variables for production
   - The API key is exposed to the client (this is normal for TMDB API)

## 🎉 Success!

Your app should now deploy successfully on Vercel. The configuration follows Vercel best practices for:
- ✅ Vite/React applications
- ✅ Single Page Applications (SPA)
- ✅ Environment variable management
- ✅ Client-side routing

For more help, visit [Vercel Documentation](https://vercel.com/docs) or check your project's build logs in the Vercel dashboard.

