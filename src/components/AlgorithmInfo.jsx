import React from 'react';
import { ALGORITHMS } from '../utils/sortingAlgorithms';

const AlgorithmInfo = ({ selectedAlgorithm }) => {
  const algorithm = ALGORITHMS[selectedAlgorithm];

  if (!algorithm) {
    return (
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Algorithm Information</h3>
        <p className="text-gray-600">Select an algorithm to view information.</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Algorithm Information</h3>
      
      {/* Algorithm Name */}
      <div className="mb-4">
        <h4 className="text-xl font-bold text-primary-600">{algorithm.name}</h4>
      </div>

      {/* Description */}
      <div className="mb-6">
        <h5 className="text-sm font-semibold text-gray-700 mb-2">Description</h5>
        <p className="text-gray-600 text-sm leading-relaxed">{algorithm.description}</p>
      </div>

      {/* Time Complexity */}
      <div className="mb-6">
        <h5 className="text-sm font-semibold text-gray-700 mb-2">Time Complexity</h5>
        <div className="grid grid-cols-3 gap-2 text-sm">
          <div className="text-center p-2 bg-blue-50 rounded">
            <div className="font-semibold text-blue-800">Best</div>
            <div className="text-blue-600">{algorithm.timeComplexity.best}</div>
          </div>
          <div className="text-center p-2 bg-yellow-50 rounded">
            <div className="font-semibold text-yellow-800">Average</div>
            <div className="text-yellow-600">{algorithm.timeComplexity.average}</div>
          </div>
          <div className="text-center p-2 bg-red-50 rounded">
            <div className="font-semibold text-red-800">Worst</div>
            <div className="text-red-600">{algorithm.timeComplexity.worst}</div>
          </div>
        </div>
      </div>

      {/* Space Complexity */}
      <div className="mb-6">
        <h5 className="text-sm font-semibold text-gray-700 mb-2">Space Complexity</h5>
        <div className="p-2 bg-gray-50 rounded">
          <span className="text-gray-800 font-mono">{algorithm.spaceComplexity}</span>
        </div>
      </div>

      {/* Properties */}
      <div className="mb-6">
        <h5 className="text-sm font-semibold text-gray-700 mb-2">Properties</h5>
        <div className="flex gap-4 text-sm">
          <div className="flex items-center gap-1">
            <span className={`w-2 h-2 rounded-full ${algorithm.stable ? 'bg-green-500' : 'bg-red-500'}`}></span>
            <span className="text-gray-600">
              {algorithm.stable ? 'Stable' : 'Unstable'}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <span className={`w-2 h-2 rounded-full ${algorithm.inPlace ? 'bg-green-500' : 'bg-red-500'}`}></span>
            <span className="text-gray-600">
              {algorithm.inPlace ? 'In-place' : 'Not in-place'}
            </span>
          </div>
        </div>
      </div>

      {/* Pseudocode */}
      <div>
        <h5 className="text-sm font-semibold text-gray-700 mb-2">Pseudocode</h5>
        <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-xs overflow-x-auto">
          <code>{algorithm.pseudocode}</code>
        </pre>
      </div>
    </div>
  );
};

export default AlgorithmInfo; 