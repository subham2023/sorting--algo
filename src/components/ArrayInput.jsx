import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const ArrayInput = ({ onGenerateRandom, onSetCustomArray, currentArray }) => {
  const [arraySize, setArraySize] = useState(20);
  const [customInput, setCustomInput] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);

  const handleGenerateRandom = () => {
    onGenerateRandom(arraySize);
  };

  const handleCustomArraySubmit = (e) => {
    e.preventDefault();
    const numbers = customInput
      .split(',')
      .map(s => s.trim())
      .filter(s => s !== '')
      .map(s => parseInt(s))
      .filter(n => !isNaN(n));
    
    if (numbers.length > 0) {
      onSetCustomArray(numbers);
      setCustomInput('');
      setShowCustomInput(false);
    }
  };

  const handleSizeChange = (delta) => {
    const newSize = Math.max(5, Math.min(100, arraySize + delta));
    setArraySize(newSize);
  };

  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Array Configuration</h3>
      
      {/* Array Size Control */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Array Size: {arraySize}
        </label>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleSizeChange(-5)}
            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
            title="Decrease by 5"
          >
            <Minus size={16} />
          </button>
          <button
            onClick={() => handleSizeChange(-1)}
            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
            title="Decrease by 1"
          >
            <Minus size={16} />
          </button>
          <div className="flex-1 text-center text-sm text-gray-600">
            {arraySize} elements
          </div>
          <button
            onClick={() => handleSizeChange(1)}
            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
            title="Increase by 1"
          >
            <Plus size={16} />
          </button>
          <button
            onClick={() => handleSizeChange(5)}
            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
            title="Increase by 5"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>

      {/* Generate Random Array */}
      <div className="mb-6">
        <button
          onClick={handleGenerateRandom}
          className="w-full btn-primary"
        >
          Generate Random Array ({arraySize} elements)
        </button>
      </div>

      {/* Custom Array Input */}
      <div className="mb-4">
        <button
          onClick={() => setShowCustomInput(!showCustomInput)}
          className="w-full btn-secondary"
        >
          {showCustomInput ? 'Hide' : 'Show'} Custom Array Input
        </button>
      </div>

      {showCustomInput && (
        <form onSubmit={handleCustomArraySubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Enter numbers (comma-separated)
            </label>
            <input
              type="text"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              placeholder="e.g., 64, 34, 25, 12, 22, 11, 90"
              className="input-field"
            />
            <p className="text-xs text-gray-500 mt-1">
              Enter numbers separated by commas (e.g., 64, 34, 25, 12)
            </p>
          </div>
          <button
            type="submit"
            className="w-full btn-primary"
            disabled={!customInput.trim()}
          >
            Set Custom Array
          </button>
        </form>
      )}

      {/* Current Array Display */}
      {currentArray.length > 0 && (
        <div className="mt-6">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Current Array</h4>
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-600 font-mono break-all">
              [{currentArray.join(', ')}]
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Length: {currentArray.length} | 
              Min: {Math.min(...currentArray)} | 
              Max: {Math.max(...currentArray)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArrayInput; 