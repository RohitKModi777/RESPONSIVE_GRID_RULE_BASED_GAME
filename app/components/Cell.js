/**
 * Cell Component
 * 
 * Renders a single grid cell with:
 * - Proper color styling based on value and locked state
 * - Click handler for incrementing value
 * - Enhanced visual effects and animations
 * - Professional styling
 */

import { getBackgroundColor, getTextColor } from '../utils/gridLogic';

export default function Cell({ value, locked, onClick }) {
  const bgColor = getBackgroundColor(value, locked);
  const textColor = getTextColor(value, locked);
  const cursorClass = locked ? 'cursor-not-allowed opacity-75' : 'cursor-pointer hover:scale-105';

  return (
    <button
      onClick={onClick}
      disabled={locked}
      className={`
        w-24 h-24
        ${bgColor}
        ${textColor}
        rounded-xl
        font-bold
        text-4xl
        transition-all
        duration-200
        ${cursorClass}
        border-2 border-opacity-20
        flex
        items-center
        justify-center
        active:scale-95
        relative
        overflow-hidden
        group
        ${!locked ? 'hover:shadow-lg' : ''}
        shadow-md
        ${bgColor === 'bg-gray-300' ? 'border-gray-400' : bgColor === 'bg-blue-950' ? 'border-blue-700' : 'border-red-700'}
      `}
      aria-label={`Cell with value ${value}${locked ? ', locked' : ''}`}
    >
      {/* Animated background effect */}
      {!locked && (
        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
      )}

      {/* Value display */}
      <span className="relative z-10">{value}</span>

      {/* Lock indicator */}
      {locked && (
        <div className="absolute top-1 right-1 text-xs opacity-70">🔒</div>
      )}
    </button>
  );
}
