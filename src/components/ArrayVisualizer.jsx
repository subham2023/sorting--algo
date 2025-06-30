import React from 'react';
import { motion } from 'framer-motion';

const ArrayVisualizer = ({ 
  array, 
  comparingIndices = [], 
  swappingIndices = [], 
  sortedIndices = [], 
  pivotIndex = null, 
  highlightedIndex = null 
}) => {
  const maxValue = Math.max(...array, 1);
  const containerHeight = 500;

  const getBarColor = (index) => {
    if (pivotIndex === index) return '#f59e0b'; // Amber for pivot
    if (highlightedIndex === index) return '#8b5cf6'; // Purple for highlighted
    if (swappingIndices.includes(index)) return '#ef4444'; // Red for swapping
    if (comparingIndices.includes(index)) return '#3b82f6'; // Blue for comparing
    if (sortedIndices.includes(index)) return '#10b981'; // Green for sorted
    return '#6b7280'; // Gray for default
  };

  const getBarHeight = (value) => {
    return Math.max((value / maxValue) * (containerHeight - 100), 12);
  };

  return (
    <div className="w-full bg-white rounded-xl shadow-lg border border-gray-200 p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Array Visualization</h3>
        <div className="flex gap-2 text-sm">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-gray-500 rounded"></div>
            <span>Default</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-blue-500 rounded"></div>
            <span>Comparing</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-red-500 rounded"></div>
            <span>Swapping</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-green-500 rounded"></div>
            <span>Sorted</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-amber-500 rounded"></div>
            <span>Pivot</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-purple-500 rounded"></div>
            <span>Highlighted</span>
          </div>
        </div>
      </div>
      
      <div 
        className="flex items-end justify-center gap-1 px-4"
        style={{ height: containerHeight }}
      >
        {array.map((value, index) => {
          const barHeight = getBarHeight(value);
          const barColor = getBarColor(index);
          
          return (
            <motion.div
              key={index}
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: 1, 
                y: 0
              }}
              transition={{ 
                duration: 0.3,
                type: "spring",
                stiffness: 300,
                damping: 30
              }}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.1 }
              }}
            >
              <motion.div
                className="w-8 rounded-t-lg shadow-md min-h-[8px]"
                style={{ 
                  backgroundColor: barColor,
                  height: `${barHeight}px`
                }}
                animate={{
                  backgroundColor: barColor,
                  height: `${barHeight}px`
                }}
                transition={{ 
                  duration: 0.2,
                  type: "spring",
                  stiffness: 400
                }}
              />
              <span className="text-xs font-medium text-gray-600 mt-1">
                {value}
              </span>
            </motion.div>
          );
        })}
      </div>
      
      <div className="mt-4 text-center text-sm text-gray-600">
        Array Length: {array.length} | Max Value: {maxValue}
      </div>
    </div>
  );
};

export default ArrayVisualizer; 