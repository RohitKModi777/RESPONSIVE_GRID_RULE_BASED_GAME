# Recursive Grid - Architecture & Code Documentation

## System Architecture

### Overview Diagram

```
┌─────────────────────────────────────────────────────┐
│                  Browser / Client                    │
│                                                     │
│  ┌────────────────────────────────────────────┐   │
│  │         app/page.js (Entry Point)          │   │
│  │         ↓ Renders                          │   │
│  │  ┌──────────────────────────────────────┐  │   │
│  │  │   Grid Component (Client-side)       │  │   │
│  │  │                                      │  │   │
│  │  │  State: grid[][] = {                │  │   │
│  │  │           value: number              │  │   │
│  │  │           locked: boolean            │  │   │
│  │  │         }                            │  │   │
│  │  │                                      │  │   │
│  │  │  ┌─────────────────────────────────┐ │  │   │
│  │  │  │  Cell Components (9 total)      │ │  │   │
│  │  │  │  [0,0] [0,1] [0,2]              │ │  │   │
│  │  │  │  [1,0] [1,1] [1,2]              │ │  │   │
│  │  │  │  [2,0] [2,1] [2,2]              │ │  │   │
│  │  │  └─────────────────────────────────┘ │  │   │
│  │  │                                      │  │   │
│  │  │  onClick → handleClick()              │  │   │
│  │  │      ↓                                │  │   │
│  │  │  gridLogic.handleCellClick()    →  setGrid() │  │
│  │  └──────────────────────────────────────┘  │   │
│  │                                            │   │
│  └────────────────────────────────────────────┘   │
│                   ↓ Styles via Tailwind CSS       │
│                   ↓ Renders to DOM                │
└─────────────────────────────────────────────────────┘

                        ↓ onClick listener

┌─────────────────────────────────────────────────────┐
│            app/utils/gridLogic.js                    │
│            (Pure Functions)                          │
│                                                     │
│  • initializeGrid()          → Create empty grid   │
│  • handleCellClick()         → Main game logic    │
│  • getBackgroundColor()      → Styling logic      │
│  • getTextColor()            → Styling logic      │
│  • cloneGrid()               → Immutability       │
└─────────────────────────────────────────────────────┘
```

### Data Flow

1. **User clicks cell** → Cell component calls `onClick` handler
2. **onClick passed down** → Grid component receives click coords
3. **Game logic executed** → `handleCellClick()` applies rules
4. **New grid created** → Via `setGrid()` (immutable update)
5. **React re-renders** → Only changed cells update
6. **Display updates** → Browser shows new grid state

---

## Component Architecture

### 1. Grid Component (`app/components/Grid.js`)

**Purpose**: State management container and grid orchestrator

**Responsibilities**:
- Manage `grid` state (3x3 array of objects)
- Handle cell click events
- Call game logic functions
- Render all 9 cell components
- Display reset button
- Show game rules

**Key Hooks**:
```javascript
const [grid, setGrid] = useState(initializeGrid());
```

**Methods**:

#### `handleClick(row, col)`
```javascript
const handleClick = (row, col) => {
  // Create new grid based on click
  const updatedGrid = handleCellClick(grid, row, col);
  // Update state (triggers re-render)
  setGrid(updatedGrid);
};
```

Flow:
1. Called when any cell button is clicked
2. Passes grid and cell coordinates to `handleCellClick()`
3. Receives new grid with all rules applied
4. Updates React state, triggering re-render

#### `resetGrid()`
```javascript
const resetGrid = () => {
  setGrid(initializeGrid());
};
```

Flow:
1. Called when reset button is clicked
2. Reinitializes grid to all zeros and unlocked
3. All cells return to starting state

**Rendering**:
```javascript
{grid.map((row, rowIndex) =>
  row.map((cell, colIndex) => (
    <Cell
      key={`${rowIndex}-${colIndex}`}
      value={cell.value}
      locked={cell.locked}
      onClick={() => handleClick(rowIndex, colIndex)}
    />
  ))
)}
```

Uses array `.map()` to iterate through 2D grid and render 9 Cell components.

---

### 2. Cell Component (`app/components/Cell.js`)

**Purpose**: Individual cell display and interaction

**Responsibilities**:
- Display cell value (number)
- Show appropriate colors based on value/state
- Handle click events
- Show locked state visually
- Provide accessibility

**Props**:
```javascript
{
  value: number,        // Current cell value (0+)
  locked: boolean,      // Whether cell is locked (value >= 15)
  onClick: function     // Click handler
}
```

**Styling Logic**:
```javascript
const bgColor = getBackgroundColor(value, locked);
const textColor = getTextColor(value, locked);
```

Uses utility functions to determine colors based on:
- `locked` state (→ red)
- `value % 2` (→ even/odd)

**Button Attributes**:
```javascript
<button
  onClick={onClick}
  disabled={locked}        // Disable if locked
  className={...}          // Dynamic classes
  aria-label={...}         // Accessibility
>
  {value}                  // Display value
</button>
```

**Styling Classes**:

| State | Background | Text | Cursor |
|-------|-----------|------|--------|
| Even (not locked) | `bg-gray-300` | `text-black` | `cursor-pointer` |
| Odd (not locked) | `bg-blue-950` | `text-white` | `cursor-pointer` |
| Locked (any value) | `bg-red-600` | `text-white` | `cursor-not-allowed` |

---

## Utility: Grid Logic (`app/utils/gridLogic.js`)

**Purpose**: Pure functions implementing the game mechanics

### Function: `initializeGrid()`

**What it does**: Creates a fresh 3x3 grid

**Returns**: 
```javascript
[
  [{ value: 0, locked: false }, ...],
  [...],
  [...]
]
```

**Code**:
```javascript
export const initializeGrid = () => {
  const grid = [];
  for (let row = 0; row < 3; row++) {
    const newRow = [];
    for (let col = 0; col < 3; col++) {
      newRow.push({
        value: 0,
        locked: false,
      });
    }
    grid.push(newRow);
  }
  return grid;
};
```

---

### Function: `handleCellClick(grid, row, col)`

**What it does**: Main game engine - handles one cell click and applies all rules

**Input**:
```javascript
grid       // Current 3x3 grid state
row        // 0-2: which row was clicked
col        // 0-2: which column was clicked
```

**Output**: New grid with all rules applied

**Step-by-step Logic**:

```javascript
1. Clone grid (immutability)
   → Create deep copy so original isn't modified

2. Check if locked
   → If locked, return unchanged grid immediately

3. Increment value
   → newValue = currentCell.value + 1

4. Check lock condition
   → If newValue >= 15, set locked = true

5. Apply Rule A (divisible by 3)
   → If newValue % 3 === 0:
      - Get right neighbor (col + 1)
      - If not locked, decrement by 1
      - If last column, do nothing

6. Apply Rule B (divisible by 5)
   → If newValue % 5 === 0:
      - Get below neighbor (row + 1)
      - If not locked, increment by 2
      - If bottom row, do nothing

7. Return new grid
```

**Code**:
```javascript
export const handleCellClick = (grid, row, col) => {
  const updatedGrid = cloneGrid(grid);
  const currentCell = updatedGrid[row][col];

  // Locked check
  if (currentCell.locked) {
    return updatedGrid;
  }

  // Increment
  const newValue = currentCell.value + 1;
  updatedGrid[row][col].value = newValue;

  // Lock check
  if (newValue >= 15) {
    updatedGrid[row][col].locked = true;
  }

  // Rule A: divisible by 3 → decrement right
  if (newValue % 3 === 0) {
    const rightCol = col + 1;
    if (rightCol < 3) {                         // Not last column
      const rightCell = updatedGrid[row][rightCol];
      if (!rightCell.locked) {                  // Not locked
        rightCell.value = Math.max(0, rightCell.value - 1);
      }
    }
  }

  // Rule B: divisible by 5 → increment below by 2
  if (newValue % 5 === 0) {
    const belowRow = row + 1;
    if (belowRow < 3) {                         // Not bottom row
      const belowCell = updatedGrid[belowRow][col];
      if (!belowCell.locked) {                  // Not locked
        belowCell.value = belowCell.value + 2;
      }
    }
  }

  return updatedGrid;
};
```

---

### Function: `getBackgroundColor(value, locked)`

**What it does**: Determines cell background color

**Logic**:
```
if locked     → red
else if even  → gray
else          → dark blue
```

**Implementation**:
```javascript
export const getBackgroundColor = (value, locked) => {
  if (locked) {
    return 'bg-red-600';        // Locked = red
  }

  if (value % 2 === 0) {
    return 'bg-gray-300';       // Even = gray (#e0e0e0)
  }

  return 'bg-blue-950';         // Odd = dark blue (#1a237e)
};
```

**Color Mapping**:
| State | Tailwind Class | Hex Code |
|-------|----------------|----------|
| Locked | `bg-red-600` | #dc2626 |
| Even | `bg-gray-300` | #d1d5db |
| Odd | `bg-blue-950` | #172554 |

---

### Function: `getTextColor(value, locked)`

**What it does**: Determines text color for readability

**Logic**:
```
if locked       → white
else if even    → black
else            → white
```

**Implementation**:
```javascript
export const getTextColor = (value, locked) => {
  if (locked) {
    return 'text-white';
  }

  if (value % 2 === 0) {
    return 'text-black';
  }

  return 'text-white';
};
```

---

### Function: `cloneGrid(grid)`

**What it does**: Creates a deep copy of the grid for immutability

**Why it's needed**: React state should never be mutated directly

**Implementation**:
```javascript
const cloneGrid = (grid) => {
  return grid.map((row) =>
    row.map((cell) => ({
      value: cell.value,
      locked: cell.locked,
    }))
  );
};
```

**Immutability Explanation**:
```javascript
❌ Wrong - Mutates original
grid[row][col].value = newValue;
setGrid(grid);

✅ Correct - Creates new object
const newGrid = cloneGrid(grid);
newGrid[row][col].value = newValue;
setGrid(newGrid);
```

---

## State Data Structure

### Grid Cell Object

```javascript
{
  value: number,    // Range: 0 to infinity
  locked: boolean   // true when value >= 15
}
```

### Full Grid Array

```javascript
const grid = [
  // Row 0
  [
    { value: 0, locked: false },  // [0, 0]
    { value: 1, locked: false },  // [0, 1]
    { value: 2, locked: false }   // [0, 2]
  ],
  // Row 1
  [
    { value: 5, locked: false },  // [1, 0]
    { value: 15, locked: true },  // [1, 1] - LOCKED!
    { value: 3, locked: false }   // [1, 2]
  ],
  // Row 2
  [
    { value: 0, locked: false },  // [2, 0]
    { value: 0, locked: false },  // [2, 1]
    { value: 7, locked: false }   // [2, 2]
  ]
];
```

### Accessing Grid Data

```javascript
// Get cell at row 0, col 1
const cell = grid[0][1];

// Get value
const value = grid[0][1].value;    // 1

// Get locked state
const isLocked = grid[0][1].locked; // false

// Iterate all cells
grid.forEach((row, rowIndex) => {
  row.forEach((cell, colIndex) => {
    console.log(`[${rowIndex}, ${colIndex}]: ${cell.value}`);
  });
});

// Get all locked cells
const lockedCells = grid
  .flatMap((row, rowIdx) => 
    row
      .map((cell, colIdx) => ({ cell, rowIdx, colIdx }))
      .filter(({ cell }) => cell.locked)
  );
```

---

## Component Lifecycle Flow

### Initial Load

```
1. Next.js loads page.js
2. page.js renders Grid component
3. Grid mounts with useState hook
4. initializeGrid() called → 3x3 grid created
5. Grid renders with 9 Cell components
6. Page displays on screen
```

### User Clicks Cell

```
1. User clicks a cell button
2. onClick handler fires
3. handleClick(row, col) called
4. handleCellClick(grid, row, col) executed
5. New grid returned with all rules applied
6. setGrid(newGrid) updates React state
7. React detects state change → triggers re-render
8. Grid component re-renders
9. Cell components receive new props
10. DOM updates with new colors/values
```

### Reset Button

```
1. User clicks reset button
2. resetGrid() called
3. initializeGrid() returns fresh grid
4. setGrid() updates state
5. All cells reset to 0 and unlocked
6. Page re-renders
```

---

## Performance Considerations

### Re-render Optimization

**Current approach**: Grid re-renders entire grid on each click

**Why it's fine**:
- Only 9 cells total
- Simple components (no heavy computation)
- User interactions are infrequent

**Could optimize with** (for larger grids):
```javascript
// React.memo to prevent unnecessary re-renders
export default React.memo(Cell, (prevProps, nextProps) => {
  return (
    prevProps.value === nextProps.value &&
    prevProps.locked === nextProps.locked
  );
});
```

### Memory Usage

**Grid cloning**: Creates new array on each click

```javascript
// One 3x3 grid = 9 objects
// Each object = ~50 bytes
// Per click overhead ≈ 450 bytes (negligible)
```

### Bundle Size

**Dependencies**:
- Next.js: ~50KB
- React: ~40KB
- Tailwind: ~15KB (purged)
- Game code: <5KB

**Total**: ~105KB (before gzip compression ~30KB)

---

## Code Examples

### Example 1: Add a "Special Cells" Feature

Create cells that multiply ripple effects:

```javascript
// In gridLogic.js - add special property
const cell = {
  value: number,
  locked: boolean,
  special: boolean  // ← new property
}

// Modify handleCellClick
if (currentCell.special && newValue % 3 === 0) {
  // Decrement right AND left neighbors
  if (rightCol < 3 && !rightCell.locked) {
    rightCell.value = Math.max(0, rightCell.value - 2); // -2 instead of -1
  }
}
```

### Example 2: Track Game Statistics

```javascript
// In Grid.js
const [stats, setStats] = useState({
  clicks: 0,
  maxValue: 0,
  lockedCells: 0
});

const handleClick = (row, col) => {
  const updatedGrid = handleCellClick(grid, row, col);
  
  // Update tracking
  const maxVal = Math.max(
    ...updatedGrid.flat().map(c => c.value)
  );
  const lockedCount = updatedGrid
    .flat()
    .filter(c => c.locked).length;
  
  setStats({
    clicks: stats.clicks + 1,
    maxValue: maxVal,
    lockedCells: lockedCount
  });
  
  setGrid(updatedGrid);
};
```

### Example 3: Add Custom Rules

```javascript
// Let user define rules
const applyCustomRules = (grid, row, col, newValue) => {
  // Rule: divisible by 7 → decrement all corners
  if (newValue % 7 === 0) {
    const corners = [[0,0], [0,2], [2,0], [2,2]];
    corners.forEach(([r, c]) => {
      if (!grid[r][c].locked) {
        grid[r][c].value = Math.max(0, grid[r][c].value - 1);
      }
    });
  }
  return grid;
};
```

---

## Testing Strategy

### Unit Tests (Example)

```javascript
// Test gridLogic.js
describe('gridLogic', () => {
  test('initializeGrid creates 3x3 grid of zeros', () => {
    const grid = initializeGrid();
    expect(grid.length).toBe(3);
    expect(grid[0]).toHaveLength(3);
    grid.forEach(row => {
      row.forEach(cell => {
        expect(cell.value).toBe(0);
        expect(cell.locked).toBe(false);
      });
    });
  });

  test('handleCellClick increments value', () => {
    const grid = initializeGrid();
    const newGrid = handleCellClick(grid, 0, 0);
    expect(newGrid[0][0].value).toBe(1);
  });

  test('Rule A: divisible by 3 decrements right', () => {
    const grid = initializeGrid();
    const newGrid = handleCellClick(grid, 0, 0);
    const grid2 = handleCellClick(newGrid, 0, 0);
    const grid3 = handleCellClick(grid2, 0, 0);
    // Value is 3, should trigger
    expect(grid3[0][1].value).toBe(-1); // was 0, decremented
  });
});
```

### Manual Testing Checklist

- [ ] Click cells and verify increment
- [ ] Check color changes (even/odd/locked)
- [ ] Verify Rule A effects
- [ ] Verify Rule B effects
- [ ] Test lock behavior
- [ ] Test reset button
- [ ] Test on mobile
- [ ] Test keyboard navigation (tab)
- [ ] Check console for errors

---

## Deployment Checklist

- [ ] All imports correct
- [ ] No console errors
- [ ] Build succeeds: `npm run build`
- [ ] Start works: `npm start`
- [ ] All rules tested
- [ ] Mobile responsive
- [ ] Accessibility features working
- [ ] README.md updated
- [ ] Code commented
- [ ] Git repo clean
- [ ] Environment variables documented

---

## Common Patterns

### Pattern 1: Immutable State Update

```javascript
// ❌ Mutation (wrong)
grid[row][col].value++;
setGrid(grid);

// ✅ Immutable (correct)
const newGrid = grid.map((r, rIdx) =>
  r.map((cell, cIdx) =>
    (rIdx === row && cIdx === col)
      ? { ...cell, value: cell.value + 1 }
      : cell
  )
);
setGrid(newGrid);
```

### Pattern 2: Accessing Nested State

```javascript
const cell = grid[0][1];        // Get cell at row 0, col 1
const value = cell.value;      // Get value property
const isLocked = cell.locked;  // Get locked property
```

### Pattern 3: Conditional Rendering

```javascript
{!locked && (
  <button>Click me</button>
)}

{locked && (
  <span>This cell is locked</span>
)}
```

---

## Glossary

| Term | Definition |
|------|-----------|
| Ripple | Automatic cascading effect triggered by cell increment |
| Lock | State where cell cannot be modified (value ≥ 15) |
| Clone | Deep copy of grid object for immutability |
| Immutable | Data that doesn't change; creates new copy instead |
| State | React variable that triggers re-render when changed |
| Hook | React function that adds features to components |
| Render | Process of converting component to DOM elements |
| Props | Input arguments passed to components |

---

## Further Reading

- [React Hooks Documentation](https://react.dev/reference/react)
- [Next.js App Router Guide](https://nextjs.org/docs/app)
- [Tailwind CSS Complete Guide](https://tailwindcss.com/docs)
- [JavaScript Array Methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)

---

**Last Updated**: February 2026  
**Version**: 1.0.0  
**Status**: Production Ready
