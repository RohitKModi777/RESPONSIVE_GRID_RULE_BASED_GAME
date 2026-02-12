/**
 * Grid Logic Utility
 * 
 * Handles all immutable state updates for the recursive grid game.
 * Implements ripple rules, lock rules, and cell increment behavior.
 */

/**
 * Initialize a 3x3 grid with all cells set to 0 and unlocked
 * @returns {Array<Array<Object>>} 2D array of cell objects
 */
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

/**
 * Deep clone the grid to ensure immutability
 * @param {Array<Array<Object>>} grid - The grid to clone
 * @returns {Array<Array<Object>>} A deep copy of the grid
 */
const cloneGrid = (grid) => {
  return grid.map((row) =>
    row.map((cell) => ({
      value: cell.value,
      locked: cell.locked,
    }))
  );
};

/**
 * Handle a cell click and apply ripple logic
 * 
 * @param {Array<Array<Object>>} grid - Current grid state
 * @param {number} row - Row index of clicked cell
 * @param {number} col - Column index of clicked cell
 * @returns {Array<Array<Object>>} Updated grid with applied rules
 */
export const handleCellClick = (grid, row, col) => {
  const updatedGrid = cloneGrid(grid);
  const currentCell = updatedGrid[row][col];

  // Rule: If cell is locked, do nothing
  if (currentCell.locked) {
    return updatedGrid;
  }

  // Increment the clicked cell
  const newValue = currentCell.value + 1;
  updatedGrid[row][col].value = newValue;

  // Check if cell should be locked (value >= 15)
  if (newValue >= 15) {
    updatedGrid[row][col].locked = true;
  }

  // Apply Ripple Rule A: If divisible by 3, decrement right neighbor
  if (newValue % 3 === 0) {
    const rightCol = col + 1;
    if (rightCol < 3) {
      const rightCell = updatedGrid[row][rightCol];
      // Only modify if not locked
      if (!rightCell.locked) {
        rightCell.value = Math.max(0, rightCell.value - 1);
      }
    }
  }

  // Apply Ripple Rule B: If divisible by 5, increment below neighbor by 2
  if (newValue % 5 === 0) {
    const belowRow = row + 1;
    if (belowRow < 3) {
      const belowCell = updatedGrid[belowRow][col];
      // Only modify if not locked
      if (!belowCell.locked) {
        belowCell.value = belowCell.value + 2;
      }
    }
  }

  return updatedGrid;
};

/**
 * Get the background color for a cell based on its value and locked state
 * 
 * @param {number} value - Cell value
 * @param {boolean} locked - Whether cell is locked
 * @returns {string} Tailwind CSS background color class
 */
export const getBackgroundColor = (value, locked) => {
  if (locked) {
    return 'bg-[#dc2626]'; // Red-600
  }

  if (value % 2 === 0) {
    return 'bg-[#e0e0e0]'; // Light Gray
  }

  return 'bg-[#1a237e]'; // Navy Blue
};

/**
 * Get the text color for a cell based on its value and locked state
 * 
 * @param {number} value - Cell value
 * @param {boolean} locked - Whether cell is locked
 * @returns {string} Tailwind CSS text color class
 */
export const getTextColor = (value, locked) => {
  if (locked) {
    return 'text-white';
  }

  if (value % 2 === 0) {
    return 'text-black';
  }

  return 'text-white';
};
