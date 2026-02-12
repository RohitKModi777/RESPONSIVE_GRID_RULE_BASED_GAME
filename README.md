# Recursive Grid - Interactive Number Grid Game

A complete Next.js (App Router) + Tailwind CSS project featuring an interactive 3x3 grid with ripple logic and locked states. Built with clean, modular code following React best practices.

## Project Overview

**Recursive Grid** is an interactive game where you click cells to increment their values. The grid features sophisticated ripple mechanics:

- **Rule A**: When a cell's value becomes divisible by 3, its right neighbor decrements by 1
- **Rule B**: When a cell's value becomes divisible by 5, the cell below increments by 2
- **Lock Rule**: Cells with values ≥ 15 become locked (turn red) and can't be modified

## Features

✅ **3x3 Interactive Grid** - Centered on the screen with 9 clickable cells  
✅ **Smart Color System** - Even numbers (gray), Odd numbers (dark blue), Locked cells (red)  
✅ **Ripple Logic** - Automatic cascading updates based on divisibility rules  
✅ **Immutable State Management** - Clean, predictable state updates  
✅ **Reset Button** - Clear the board and start fresh  
✅ **Responsive Design** - Works on all screen sizes  
✅ **Accessibility** - Proper ARIA labels and semantic HTML  
✅ **Production Quality** - Clean code, modular components, comprehensive comments  

## Project Structure

```
recursive-grid/
├── app/
│   ├── components/
│   │   ├── Grid.js          # Main grid container & state management
│   │   └── Cell.js          # Individual cell component
│   ├── utils/
│   │   └── gridLogic.js     # Core game logic & utilities
│   ├── page.js              # Home page
│   ├── layout.js            # Root layout
│   └── globals.css          # Global styles
├── public/                   # Static assets
├── package.json             # Dependencies & scripts
├── tailwind.config.js       # Tailwind CSS configuration
├── postcss.config.js        # PostCSS configuration
└── next.config.js           # Next.js configuration
```

## Technology Stack

- **Next.js 16+** - React framework with App Router
- **React 19+** - UI library with hooks
- **Tailwind CSS 3+** - Utility-first CSS framework
- **JavaScript** - Modern ES6+ syntax
- **ESLint** - Code linting

## Installation & Setup

### Prerequisites

- Node.js 16+ and npm installed on your system
- Git (for version control)

### Local Development

1. **Navigate to the project directory:**
   ```bash
   cd recursive-grid
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   Navigate to `http://localhost:3000` in your web browser

5. **Start playing!**
   - Click any cell to increment its value
   - Watch the ripple effects update neighboring cells
   - Reset the grid with the button below

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `.next` directory.

### Start Production Server

```bash
npm start
```

Runs the production-ready server on port 3000.

## How to Play

### Basic Rules

1. **Click a cell** to increment its value by 1
2. **Even numbers** display on a gray background (#e0e0e0) with black text
3. **Odd numbers** display on a dark blue background (#1a237e) with white text
4. **Locked cells** (value ≥ 15) turn red and cannot be clicked or modified

### Special Rules (Ripples)

**Rule A - Divisible by 3:**
- When a cell's new value is divisible by 3
- The RIGHT neighbor decrements by 1 (if not locked)
- Ignores cells in the last column

**Rule B - Divisible by 5:**
- When a cell's new value is divisible by 5
- The cell BELOW increments by 2 (if not locked)
- Ignores cells in the bottom row

### Lock Behavior

- Any cell reaching a value of 15 or higher automatically locks
- Locked cells turn red and cannot be clicked
- Locked cells cannot be modified by ripple effects
- Use the Reset button to unlock all cells

## Code Architecture

### Grid Component (`Grid.js`)

The main container component that:
- Manages the grid state using React hooks
- Handles cell click events
- Applies game logic via utility functions
- Renders all Cell components
- Provides reset functionality
- Displays game rules and instructions

**Key Functions:**
- `handleClick(row, col)` - Updates grid when cell is clicked
- `resetGrid()` - Reinitializes grid to empty state

### Cell Component (`Cell.js`)

Individual cell rendering with:
- Dynamic color styling based on value and locked state
- Click handlers with disabled state for locked cells
- Accessibility attributes
- Hover and active states with smooth transitions
- Shadow effect (2px 2px 0px black)
- Rounded corners (4px)

**Props:**
- `value: number` - Current cell value
- `locked: boolean` - Whether cell is locked
- `onClick: function` - Handler for cell clicks

### Grid Logic (`utils/gridLogic.js`)

Core game engine with:
- **`initializeGrid()`** - Creates empty 3x3 grid
- **`handleCellClick(grid, row, col)`** - Main logic function that:
  - Increments clicked cell
  - Checks lock conditions
  - Applies Rule A (divisible by 3)
  - Applies Rule B (divisible by 5)
  - Returns new immutable grid state
- **`getBackgroundColor(value, locked)`** - Determines cell background
- **`getTextColor(value, locked)`** - Determines text color
- **`cloneGrid(grid)`** - Deep clones grid for immutability

## State Management

The grid state is represented as a 2D array of cell objects:

```javascript
const cell = {
  value: number,      // 0-∞, increments with clicks
  locked: boolean     // true when value >= 15
}

const grid = [
  [cell, cell, cell],
  [cell, cell, cell],
  [cell, cell, cell]
]
```

All state updates are **immutable** - original grid is never modified, new grid is created each time.

## Styling Details

### Tailwind CSS Classes

- **Grid layout**: CSS Grid with 3 columns
- **Cell styling**: 
  - Size: 80px × 80px (w-20 h-20)
  - Font: Bold, 1.5rem (text-2xl)
  - Spacing: 1rem gap between cells
  - Rounded corners: 4px radius
  - Shadow: Custom 2px 2px 0px black
  - Transitions: Smooth opacity and transforms

- **Colors**:
  - Even: `bg-gray-300` (≈ #e0e0e0)
  - Odd: `bg-blue-950` (≈ #1a237e)
  - Locked: `bg-red-600`
  - Text: Dynamic based on value/locked state

- **Interactive states**:
  - Hover: 80% opacity for non-locked cells
  - Active: Inset shadow effect with slight translation
  - Disabled: Cursor not-allowed for locked cells

## Deployment on Vercel

### Prerequisites

- Vercel account (free at https://vercel.com)
- GitHub account with the code pushed to a repository

### Deployment Steps

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Initial commit: Recursive Grid game"
   git push origin main
   ```

2. **Connect to Vercel:**
   - Visit https://vercel.com/new
   - Click "Import Project"
   - Connect your GitHub account
   - Select the recursive-grid repository

3. **Configure project:**
   - Framework: Next.js
   - Root Directory: ./
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)
   - Environment Variables: (none needed for this project)

4. **Deploy:**
   - Click "Deploy"
   - Vercel will automatically build and deploy your project
   - You'll get a production URL like `https://recursive-grid-xxxxx.vercel.app`

5. **Automatic Deployments:**
   - Future pushes to your main branch automatically redeploy
   - Preview URLs generated for pull requests

### Environment Variables

This project has no required environment variables. All configuration is handled through Next.js default settings.

## Performance Considerations

- **Component Optimization**: Functional components with minimal re-renders
- **Immutable Updates**: Prevents React batching issues and ensures clean state flow
- **Grid Cloning**: Efficient deep copy only when needed
- **Tailwind Optimization**: Unused utilities automatically purged in production
- **Build Size**: Minimal dependencies keep bundle size small

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Requires JavaScript enabled

## Troubleshooting

### Port 3000 Already in Use

```bash
# Kill process on port 3000
npx kill-port 3000

# Or use a different port
npm run dev -- -p 3001
```

### Build Errors

```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
npm run build
```

### Import Errors

- Ensure all component files are in the correct directories
- Check that paths in imports match actual file locations
- Verify the components are using 'use client' directive for client-side features

## Code Quality

- ✅ ESLint configured for code consistency
- ✅ JSDoc comments on all major functions
- ✅ Clean, readable variable names
- ✅ Modular component architecture
- ✅ DRY (Don't Repeat Yourself) principles
- ✅ Immutable state updates
- ✅ No external UI library dependencies

## Future Enhancements

Possible additions for extending the game:

- **Undo/Redo** - Navigate through move history
- **Statistics** - Track moves, time, completion percentage
- **Difficulty Levels** - Different grid sizes (5x5, 7x7)
- **Sound Effects** - Audio feedback for clicks and ripples
- **Animations** - Smooth number transitions and ripple effects
- **Local Storage** - Persist game state between sessions
- **Multiplayer** - Real-time competitive gameplay via WebSocket
- **Custom Rules** - User-configurable ripple logic
- **Dark Mode** - System preference support

## Contributing

To contribute improvements:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/name`)
3. Commit changes (`git commit -m 'Add feature'`)
4. Push to branch (`git push origin feature/name`)
5. Open a Pull Request

## License

This project is open source and available under the MIT License.

## Author

Created as a demonstration of modern React + Next.js development practices.

## Support

For issues or questions:
- Check the browser console for errors
- Verify Node.js and npm versions are correct
- Clear browser cache and restart dev server
- Review the code comments for logic explanations

---

**Happy Playing! 🎮**

Built with ❤️ using Next.js and Tailwind CSS
