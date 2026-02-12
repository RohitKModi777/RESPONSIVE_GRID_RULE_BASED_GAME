# Recursive Grid - Complete Setup & Deployment Guide

## Quick Start (5 minutes)

### 1. Install & Run Locally

```bash
cd recursive-grid
npm install
npm run dev
```

Open `http://localhost:3000` (or `3001` if 3000 is busy) and play!

### 2. Deploy to Vercel (2 minutes)

```bash
git add .
git commit -m "Initial commit: Recursive Grid"
git push origin main
```

Then:
- Visit https://vercel.com/new
- Import your GitHub repository
- Click "Deploy"
- Done! 🚀

---

## Complete Installation Guide

### System Requirements

- **Node.js**: 16.x or higher
- **npm**: 7.x or higher
- **Git**: for version control
- **Modern Browser**: Chrome, Firefox, Safari, or Edge

### Check Your Environment

```bash
node --version    # Should be v16.0.0 or higher
npm --version     # Should be 7.0.0 or higher
git --version     # Should be 2.30.0 or higher
```

### Step-by-Step Setup

#### Step 1: Navigate to Project

```bash
cd "path/to/CRED ASSIGNMENT/recursive-grid"
```

#### Step 2: Install Dependencies

```bash
npm install
```

This installs:
- Next.js 16+
- React 19+
- Tailwind CSS 3+
- ESLint for code quality

**Expected output**: "added XXX packages"

#### Step 3: Verify Installation

```bash
npm list next react tailwindcss
```

Should show versions of all three packages.

#### Step 4: Run Development Server

```bash
npm run dev
```

**Expected output**:
```
▲ Next.js 16.1.6

Local:        http://localhost:3000
```

#### Step 5: Open in Browser

Click the link or manually visit: `http://localhost:3000`

You should see:
- Title: "Recursive Grid"
- Description and rules
- 3x3 grid of gray boxes (all showing 0)
- "Reset Grid" button below

#### Step 6: Test the Game

1. Click any cell - it should turn odd (dark blue) and show 1
2. Click the same cell again - it should turn even (gray) and show 2
3. Click cell (0,0) 3 times until it shows 3 - watch cell (0,1) decrement (Rule A)
4. Keep clicking to reach 5 - watch cell (1,0) increment by 2 (Rule B)
5. Click "Reset Grid" to start over

---

## Development Workflow

### IDE Setup (Visual Studio Code)

1. Open the `recursive-grid` folder in VS Code
2. Recommended extensions:
   - **ES7+ React/Redux/React-Native snippets** (dsznajder.es7-react-js-snippets)
   - **JavaScript (ES6) code snippets** (xabikos.JavaScriptSnippets)
   - **Tailwind CSS IntelliSense** (bradlc.vscode-tailwindcss)

### File Structure Overview

```
app/
├── components/
│   ├── Grid.js              ← Main state & layout
│   └── Cell.js              ← Individual cell
├── utils/
│   └── gridLogic.js         ← Game engine
├── page.js                  ← Entry point
├── layout.js                ← HTML structure
└── globals.css              ← Global styles
```

### Common Development Tasks

#### Modify Game Rules

Edit `app/utils/gridLogic.js`:

```javascript
// Change lock threshold from 15 to 20
if (newValue >= 20) {
  updatedGrid[row][col].locked = true;
}

// Change Rule A from 3 to 6
if (newValue % 6 === 0) {
  // Decrement right neighbor
}

// Change Rule B multiplier from 2 to 3
belowCell.value = belowCell.value + 3;
```

#### Change Colors

Edit `app/utils/gridLogic.js` color functions:

```javascript
export const getBackgroundColor = (value, locked) => {
  if (locked) return 'bg-purple-600';        // Change lock color
  if (value % 2 === 0) return 'bg-yellow-300'; // Change even color
  return 'bg-green-900';                      // Change odd color
};
```

#### Modify Cell Size

Edit `app/components/Cell.js`:

```javascript
className={`
  w-24 h-24      /* Change from w-20 h-20 to larger */
  text-3xl       /* Change font size */
  /* ... rest of classes ... */
`}
```

#### Change Grid Gap

Edit `app/components/Grid.js`:

```javascript
<div className="grid gap-6" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
  {/* gap-6 instead of gap-4 for more spacing */}
</div>
```

### Build Process

#### Development Build (Auto-reload)

```bash
npm run dev
```

- Runs on http://localhost:3000
- Hot Module Replacement (HMR) enabled
- Changes reflect immediately without reload
- Source maps for debugging

#### Production Build (Optimized)

```bash
npm run build
```

- Creates `.next` directory
- Minifies code
- Tree shakes unused code
- Generates static pages where possible
- Analyzes bundle size

#### Production Server

```bash
npm start
```

Runs the optimized production version locally.

---

## Deployment Guides

### Option 1: Vercel (Recommended - 2 minutes)

**Why Vercel?**
- Created by Next.js authors
- Automatic deployments on git push
- Free tier with unlimited projects
- Instant preview URLs for PRs
- Global CDN
- Lambda functions support

**Steps:**

1. **Create GitHub Account** (if needed)
   - Visit https://github.com/signup

2. **Initialize Git** (if not already done)
   ```bash
   cd recursive-grid
   git init
   git add .
   git commit -m "Initial commit: Recursive Grid game"
   ```

3. **Push to GitHub**
   ```bash
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/recursive-grid.git
   git push -u origin main
   ```

4. **Create Vercel Account**
   - Visit https://vercel.com/signup
   - Sign up with GitHub

5. **Import Project**
   - Visit https://vercel.com/new
   - Click "Import Project"
   - Paste your GitHub repo URL
   - Click "Import"

6. **Configure**
   - Framework: **Next.js** (auto-detected)
   - Project Name: **recursive-grid**
   - Build Command: `npm run build` (default)
   - Environment Variables: (leave empty)

7. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes
   - Your app is live!

**Your URL** will be something like:
```
https://recursive-grid.vercel.app
```

**Automatic Deployments:**
- Every push to `main` triggers automatic redeploy
- Pull requests get preview URLs automatically
- Rollback with one click

### Option 2: Other Platform Alternatives

#### Netlify

```bash
npm run build
# Upload .next folder to Netlify
```

- Visit https://netlify.com
- Drag and drop `.next` folder
- Done!

**Pros:** Simple drag-and-drop  
**Cons:** Manual redeploys required

#### GitHub Pages

Note: Requires static export configuration

```bash
# Add to next.config.mjs:
// output: 'export'
npm run build
# Push 'out' folder to gh-pages branch
```

**Pros:** Free hosting  
**Cons:** Limited to static sites

#### Docker (Advanced)

Create `Dockerfile`:

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY .next ./
EXPOSE 3000
CMD ["npm", "start"]
```

Build and run:

```bash
docker build -t recursive-grid .
docker run -p 3000:3000 recursive-grid
```

---

## Environment Variables

This project requires **NO environment variables** by default.

However, if you want to add analytics, tracking, or API calls later:

1. Create `.env.local` in project root:
```
NEXT_PUBLIC_ANALYTICS_ID=your_id_here
NEXT_PUBLIC_API_URL=https://api.example.com
```

2. Access in code:
```javascript
const analyticsId = process.env.NEXT_PUBLIC_ANALYTICS_ID;
```

**Note**: Use `NEXT_PUBLIC_` prefix only for values that should be exposed to browser.

### Vercel Environment Variables

1. Visit your project on Vercel
2. Go to Settings → Environment Variables
3. Add variables
4. Click "Save and Redeploy"

---

## Monitoring & Troubleshooting

### Port Already in Use

If port 3000 is busy:

```bash
# Kill process on port 3000
npx kill-port 3000

# Or use different port
npm run dev -- -p 3001
```

### Clear Cache & Dependencies

```bash
# Remove node_modules
rm -rf node_modules

# Clear npm cache
npm cache clean --force

# Remove Next.js cache
rm -rf .next

# Reinstall everything
npm install

# Rebuild
npm run build
```

### Import/Module Errors

```javascript
// ❌ Wrong - relative path confusion
import Grid from '../Grid'

// ✅ Correct - from components folder
import Grid from './Grid'
```

### 'use client' Directive

Add to top of interactive components:

```javascript
'use client';  // ← Required for hooks like useState

import { useState } from 'react';

export default function MyComponent() {
  const [state, setState] = useState(0);
  // ...
}
```

### Build Errors

```bash
# Check for errors
npm run build

# View detailed error log
npm run build 2>&1 | tee build.log

# Check linting
npm run lint
```

### Performance Issues

```bash
# Analyze bundle size
npm run build
# Look at .next directory size

# Check page load time
# Use browser DevTools > Network tab
```

---

## Scaling & Expansion

### Add More Features

1. **Dark Mode**
   ```javascript
   // Add to layout.js
   const [darkMode, setDarkMode] = useState(false);
   
   // Toggle in Grid.js
   <button onClick={() => setDarkMode(!darkMode)}>
     🌙 Dark Mode
   </button>
   ```

2. **Undo/Redo**
   ```javascript
   const [history, setHistory] = useState([initialGrid]);
   
   const undo = () => {
     setGrid(history[history.length - 2]);
   };
   ```

3. **Statistics**
   ```javascript
   const [stats, setStats] = useState({
     moves: 0,
     lockedCells: 0,
     maxValue: 0
   });
   ```

4. **Custom Grid Size**
   ```javascript
   const [gridSize, setGridSize] = useState(3);
   // Modify initializeGrid() to use gridSize parameter
   ```

5. **Sound Effects**
   ```javascript
   const playSound = () => {
     new Audio('/click.mp3').play();
   };
   ```

### Database Integration (Future)

If you want to save game states:

```javascript
// Example with Supabase
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(url, key);

const saveGame = async (gridState) => {
  await supabase.from('games').insert([{ state: gridState }]);
};
```

---

## Production Checklist

Before deploying to production:

- [ ] All game rules working correctly
- [ ] No console errors
- [ ] Mobile responsive (test on phone)
- [ ] Reset button clears all cells
- [ ] Locked cells (red) cannot be clicked
- [ ] Ripple effects apply correctly
- [ ] Button styles consistent
- [ ] No broken imports
- [ ] Build succeeds: `npm run build`
- [ ] Start works: `npm start`

---

## Security Notes

### Not Needed for This Project

- API authentication (no backend)
- Environment secrets (no private data)
- CORS headers (static site)
- Rate limiting (client-side only)

### If Adding Backend Later

- Never store secrets in code
- Use `.env.local` for local development
- Use Vercel environment variables for production
- Validate all user input server-side
- Use HTTPS only for API calls

---

## Version Control (Git)

### Basic Git Workflow

```bash
# Check status
git status

# Stage changes
git add .

# Commit with message
git commit -m "Describe your changes"

# Push to GitHub
git push origin main

# Pull latest changes
git pull origin main
```

### Useful Git Commands

```bash
# View commit history
git log --oneline

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1

# Create new branch
git checkout -b feature/my-feature

# Switch branches
git checkout main

# Merge branch
git merge feature/my-feature
```

---

## Performance Optimization Tips

### Current Optimizations Already Implemented

✅ Next.js built-in optimizations  
✅ Tailwind CSS purging  
✅ Code splitting  
✅ Immutable state updates  
✅ Minimal dependencies  

### Further Optimizations (Future)

- Image optimization with `next/image`
- Font preloading
- Code lazy loading
- Service workers for offline support
- Caching strategies

---

## Support & Resources

### Official Documentation

- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Vercel Docs](https://vercel.com/docs)

### Debugging

1. **Browser Console** (F12 or Cmd+Option+I)
2. **Next.js Server** logs in terminal
3. **Source Maps** for production debugging
4. **React DevTools** browser extension

### Getting Help

1. Check error message carefully
2. Search error on Stack Overflow
3. Visit project GitHub discussions
4. Ask in React or Next.js communities

---

## Maintenance Schedule

### Daily (During Development)

```bash
npm run dev        # Start development
npm run lint       # Check code quality
```

### Before Deployment

```bash
npm run build      # Test production build
npm run lint       # Verify code quality
git push           # Deploy to Vercel
```

### Monthly

- Check for security updates: `npm audit`
- Update dependencies: `npm update`
- Review performance metrics

### Quarterly

- Update major packages
- Refactor old code
- Performance audit
- User feedback review

---

## License & Credits

- **Framework**: Next.js by Vercel
- **Styling**: Tailwind CSS
- **Runtime**: Node.js
- **Hosting**: Vercel (recommended)

This project is open source and free to use, modify, and distribute.

---

**Need help?** Check README.md for general info about the game or troubleshooting section above.
