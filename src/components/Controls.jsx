import React from 'react';
import { Play, Pause, SkipBack, SkipForward, RotateCcw, Shuffle } from 'lucide-react';
import { ALGORITHMS } from '../utils/sortingAlgorithms';

const Controls = ({
  selectedAlgorithm,
  onAlgorithmChange,
  isPlaying,
  onTogglePlay,
  onStepForward,
  onStepBackward,
  onReset,
  onGenerateRandom,
  speed,
  onSpeedChange,
  currentStep,
  totalSteps,
  comparisons,
  swaps,
  isSorted
}) => {
  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Controls</h3>
      
      {/* Algorithm Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Sorting Algorithm
        </label>
        <select
          value={selectedAlgorithm}
          onChange={(e) => onAlgorithmChange(e.target.value)}
          className="input-field"
          disabled={isPlaying}
        >
          {Object.entries(ALGORITHMS).map(([key, algorithm]) => (
            <option key={key} value={key}>
              {algorithm.name}
            </option>
          ))}
        </select>
      </div>

      {/* Playback Controls */}
      <div className="mb-6">
        <div className="flex items-center justify-center gap-2 mb-4">
          <button
            onClick={onStepBackward}
            disabled={isPlaying || currentStep === 0}
            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            title="Step Backward"
          >
            <SkipBack size={20} />
          </button>
          
          <button
            onClick={onTogglePlay}
            className="p-3 rounded-lg bg-primary-600 hover:bg-primary-700 text-white transition-colors"
            title={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <Pause size={24} /> : <Play size={24} />}
          </button>
          
          <button
            onClick={onStepForward}
            disabled={isPlaying || currentStep >= totalSteps}
            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            title="Step Forward"
          >
            <SkipForward size={20} />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Step {currentStep} of {totalSteps}</span>
            <span>{totalSteps > 0 ? Math.round((currentStep / totalSteps) * 100) : 0}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-primary-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${totalSteps > 0 ? (currentStep / totalSteps) * 100 : 0}%` }}
            />
          </div>
        </div>

        {/* Speed Control */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Speed: {speed}%
          </label>
          <input
            type="range"
            min="1"
            max="100"
            value={speed}
            onChange={(e) => onSpeedChange(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            disabled={isPlaying}
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={onReset}
          disabled={isPlaying}
          className="flex-1 btn-secondary flex items-center justify-center gap-2"
        >
          <RotateCcw size={16} />
          Reset
        </button>
        <button
          onClick={onGenerateRandom}
          disabled={isPlaying}
          className="flex-1 btn-secondary flex items-center justify-center gap-2"
        >
          <Shuffle size={16} />
          Random Array
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">{comparisons}</div>
          <div className="text-sm text-gray-600">Comparisons</div>
        </div>
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <div className="text-2xl font-bold text-red-600">{swaps}</div>
          <div className="text-sm text-gray-600">Swaps</div>
        </div>
      </div>

      {/* Status */}
      {isSorted && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <div className="text-green-800 font-medium text-center">
            ✓ Array is sorted!
          </div>
        </div>
      )}
    </div>
  );
};

export default Controls; 