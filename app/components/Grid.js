'use client';

import { useState } from 'react';
import Cell from './Cell';
import { initializeGrid, handleCellClick } from '../utils/gridLogic';
import "../rule.css"

export default function Grid() {
  const [grid, setGrid] = useState(initializeGrid());
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleClick = (row, col) => {
    const updatedGrid = handleCellClick(grid, row, col);
    setGrid(updatedGrid);
  };

  const resetGrid = () => {
    setGrid(initializeGrid());
  };

  return (
    <div className="min-h-screen flex md:flex-row flex-col bg-slate-900 text-white">

      {/* ================= MOBILE HEADER ================= */}
      <div className="md:hidden flex items-center justify-between px-4 h-16 bg-slate-950 border-b border-slate-800 sticky top-0 z-50">
        <div class="head">
          <h1 className="text-lg font-bold">Recursive</h1>
          <p className="text-xs text-cyan-400">Grid Game</p>
        </div>

        <button class="head"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-lg cursor-pointer transition" 
        >
          ☰
        </button>
      </div>

      {/* ================= SIDEBAR ================= */}
      <aside
        className={`
          fixed md:sticky top-0 left-0
          h-screen w-80 md:w-96
          bg-slate-950 border-r border-slate-800
          overflow-y-auto
          transform transition-transform duration-300
          z-40
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0
        `}
      >
        <div className="p-8 flex flex-col gap-10">

          {/* Sidebar Header */}
          <div >
            <h1 className="text-2xl font-bold">Recursive</h1>
            <p className="text-cyan-400 text-sm">GRID GAME</p>
          </div>

          {/* HOW TO PLAY */}
          <section>
            <h2 class="play" className="text-xs uppercase tracking-widest text-slate-400 ">
              How to Play
            </h2>
         
            <RuleCard
              title="Click to Increment"
              desc="Tap a cell to increase its value by 1"/>
            <RuleCard
              title="Row Ripple"
              desc="If divisible by 3 → right cell -1"
            />
            <RuleCard 
              title="Column Ripple"
              desc="If divisible by 5 → bottom cell +2" 
            />
            <RuleCard
              title="Lock State"
              desc="Value 15+ locks cell"
            />
          </section>

          {/* COLOR GUIDE */}
          <section class="play ruleCard" className="space-y-4" >
            <h2 className="text-xs uppercase tracking-widest text-slate-400" >
              Color Guide
            </h2>

            <div className="flex flex-wrap gap-3" class="ruleCard">
              <Legend color="bg-gray-300" label="Even"/>
              <Legend color="bg-blue-800" label="Odd" />
              <Legend color="bg-red-600" label="Locked" />
            </div>
          </section>

          {/* STATS */}
          <section className="space-y-4" >
            <h2 class="statsui" className="text-xs uppercase tracking-widest text-slate-400" >
              Live Stats
            </h2>

            <div class="stat" className="grid grid-cols-2 gap-4" >
              <StatCard 
                label="Total Value"
                value={grid.flat().reduce((s, c) => s + c.value, 0)} 
              />
              <StatCard
                label="Locked Cells"
                value={`${grid.flat().filter(c => c.locked).length}/9`} 
              />
            </div>
          </section>

        </div>
      </aside>

      {/* OVERLAY */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 md:hidden z-30"
        />
      )}

      {/* ================= MAIN CONTENT ================= */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 md:px-12 py-10">

        {/* DESKTOP HEADER */}
        <div className="text-center mb-10 hidden md:block">
          <h1 className="text-6xl font-bold mb-3">
            Recursive Grid
          </h1>
          <p className="text-slate-400">
            Click cells to increment values and trigger ripple effects
          </p>
        </div>

        {/* MOBILE SUBTITLE */}
        <div className="text-center mb-6 md:hidden">
          <p className="text-slate-400 text-sm">
            Tap cells to interact with the grid
          </p>
        </div>

        {/* GRID CONTAINER */}
        <div className="bg-slate-900 p-10 rounded-3xl border border-slate-700 shadow-2xl">

          <div
            className="grid gap-6 justify-center"
            style={{ gridTemplateColumns: 'repeat(3, 90px)' }}
          >
            {grid.map((row, r) =>
              row.map((cell, c) => (
                <Cell
                  key={`${r}-${c}`}
                  value={cell.value}
                  locked={cell.locked}
                  onClick={() => handleClick(r, c)}
                />
              ))
            )}
          </div>

          {/* RESET BUTTON */}
          <div class="resetbtn"className="mt-10 flex justify-center">
            <button 
              onClick={resetGrid}
              className="px-8 py-5 bg-slate-800 hover:bg-slate-700 rounded-xl text-lg font-semibold transition"
            >
              🔄️ Reset Game
            </button>
          </div>

        </div>
      </main>
    </div>
  );
}

/* ================= SMALL COMPONENTS ================= */

function RuleCard({ title, desc }) {
  return (
    <div class="ruleCard" className="bg-slate-900">
      <p className="font-semibold p-5">{title}</p>
      <p className="text-sm text-slate-400">{desc}</p>
    </div>
  );
}

function Legend({ color, label }) {
  return (
    <div className="flex items-center gap-2 bg-slate-900 px-3 py-2 rounded-lg border border-slate-800">
      <div className={`w-3 h-3 rounded-full ${color}`} />
      <span className="text-sm text-slate-300">{label}</span>
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 text-center" class="stat">
      <p className="text-xs text-slate-400 mb-1">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}
