/**
 * Grid Component
 * 
 * Main grid container that:
 * - Manages the 3x3 grid state
 * - Handles cell clicks and applies ripple logic
 * - Renders all Cell components
 * - Provides reset functionality
 * - Displays rules in left sidebar
 */

'use client';

import { useState } from 'react';
import Cell from './Cell';
import { initializeGrid, handleCellClick } from '../utils/gridLogic';

export default function Grid() {
  const [grid, setGrid] = useState(initializeGrid());

  /**
   * Handle when a cell is clicked
   * Updates the grid with new values based on ripple rules
   */
  const handleClick = (row, col) => {
    const updatedGrid = handleCellClick(grid, row, col);
    setGrid(updatedGrid);
  };

  /**
   * Reset the grid to initial state (all cells 0, unlocked)
   */
  const resetGrid = () => {
    setGrid(initializeGrid());
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex overflow-hidden">
      {/* Left Sidebar - Rules */}
      <div className="w-96 bg-slate-950 border-r border-slate-700 p-8 overflow-y-auto shadow-2xl h-screen">
        <div className="sticky top-0">
          {/* Logo/Title */}
          <div className="mb-8 bg-gradient-to-br from-slate-800 to-slate-800/50 p-5 rounded-lg border border-cyan-500/30">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/50">
                <span className="text-white font-bold text-xl">R</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Recursive</h1>
                <p className="text-cyan-300 text-xs font-semibold">Grid Game</p>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-slate-700 to-transparent mb-8" />

          {/* Game Rules */}
          <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <span className="text-cyan-400">⚙️</span> Game Rules
          </h2>

          <div className="space-y-4">
            {/* Rule 1: Basic Action */}
            <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700 hover:border-cyan-500/50 transition-colors">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">1</span>
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm mb-1">Click to Increment</h3>
                  <p className="text-cyan-300 text-xs leading-relaxed">
                    Click any cell to increase its value by 1
                  </p>
                </div>
              </div>
            </div>

            {/* Rule 2: Rule A */}
            <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700 hover:border-purple-500/50 transition-colors">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">A</span>
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm mb-1">Divisible by 3</h3>
                  <p className="text-cyan-300 text-xs leading-relaxed">
                    Right neighbor decrements by 1 (if not locked)
                  </p>
                </div>
              </div>
            </div>

            {/* Rule 3: Rule B */}
            <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700 hover:border-orange-500/50 transition-colors">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">B</span>
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm mb-1">Divisible by 5</h3>
                  <p className="text-cyan-300 text-xs leading-relaxed">
                    Bottom neighbor increments by 2 (if not locked)
                  </p>
                </div>
              </div>
            </div>

            {/* Rule 4: Lock */}
            <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700 hover:border-red-500/50 transition-colors">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-red-400 to-rose-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">🔒</span>
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm mb-1">Locked at 15+</h3>
                  <p className="text-cyan-300 text-xs leading-relaxed">
                    Cells become red and cannot be modified
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-slate-700 to-transparent my-8" />

          {/* Color Legend */}
          <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
            <span className="text-emerald-400">🎨</span> Color Guide
          </h3>

          <div className="space-y-3">
            <div className="flex items-center gap-3 bg-slate-800/50 p-4 rounded-lg border-2 border-gray-400/30 hover:border-gray-400/70 transition-colors cursor-pointer">
              <div className="w-8 h-8 bg-gray-300 rounded border-2 border-gray-400 flex-shrink-0" />
              <div>
                <p className="text-white text-sm font-bold">Even Numbers</p>
                <p className="text-cyan-300 text-xs">0, 2, 4, 6, ...</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-slate-800/50 p-4 rounded-lg border-2 border-blue-700/30 hover:border-blue-700/70 transition-colors cursor-pointer">
              <div className="w-8 h-8 bg-blue-950 rounded border-2 border-blue-700 flex-shrink-0" />
              <div>
                <p className="text-white text-sm font-bold">Odd Numbers</p>
                <p className="text-cyan-300 text-xs">1, 3, 5, 7, ...</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-slate-800/50 p-4 rounded-lg border-2 border-red-500/30 hover:border-red-500/70 transition-colors cursor-pointer">
              <div className="w-8 h-8 bg-red-600 rounded border-2 border-red-500 flex-shrink-0" />
              <div>
                <p className="text-white text-sm font-bold">Locked (15+)</p>
                <p className="text-cyan-300 text-xs">Cannot be modified</p>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-slate-700 to-transparent my-8" />

          {/* Stats */}
          <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
            <span className="text-yellow-400">📊</span> Game Stats
          </h3>

          <div className="space-y-3">
            <div className="bg-gradient-to-br from-slate-800 to-slate-800/50 rounded-lg p-4 border-2 border-cyan-500/30 hover:border-cyan-500/60 transition-colors">
              <p className="text-cyan-300 text-xs font-semibold mb-2">Total Value</p>
              <p className="text-white text-2xl font-bold">
                {grid.flat().reduce((sum, cell) => sum + cell.value, 0)}
              </p>
            </div>
            <div className="bg-gradient-to-br from-slate-800 to-slate-800/50 rounded-lg p-4 border-2 border-purple-500/30 hover:border-purple-500/60 transition-colors">
              <p className="text-cyan-300 text-xs font-semibold mb-2">Locked Cells</p>
              <p className="text-white text-2xl font-bold">
                {grid.flat().filter(cell => cell.locked).length} <span className="text-base text-slate-400">/ 9</span>
              </p>
            </div>
            <div className="bg-gradient-to-br from-slate-800 to-slate-800/50 rounded-lg p-4 border-2 border-yellow-500/30 hover:border-yellow-500/60 transition-colors">
              <p className="text-cyan-300 text-xs font-semibold mb-2">Max Value</p>
              <p className="text-white text-2xl font-bold">
                {Math.max(...grid.flat().map(cell => cell.value))}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-center justify-center h-screen p-8 overflow-hidden">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-3">
            Recursive Grid
          </h1>
          <p className="text-slate-300 text-lg max-w-xl">
            Click cells to increment values. Watch the cascading ripple effects unfold.
          </p>
        </div>

        {/* Grid Container */}
        <div className="flex-1 flex items-center justify-center">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700 shadow-2xl">
            <div className="grid gap-5" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
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
            </div>
          </div>
        </div>

        {/* Reset Button */}
        <div className="mt-8">
          <button
            onClick={resetGrid}
            className={`
              px-8 py-3
              bg-gradient-to-r from-cyan-500 to-blue-600
              hover:from-cyan-400 hover:to-blue-500
              text-white
              font-semibold
              text-lg
              rounded-lg
              shadow-lg
              hover:shadow-cyan-500/50
              transition-all
              duration-200
              border border-cyan-400/30
              active:scale-95
              flex items-center gap-2
            `}
          >
            <span>🔄</span> Reset Game
          </button>
        </div>
      </div>
    </div>
  );
}
