import React, { useEffect } from 'react';
import { useSortingVisualizer } from './hooks/useSortingVisualizer';
import ArrayVisualizer from './components/ArrayVisualizer';
import Controls from './components/Controls';
import AlgorithmInfo from './components/AlgorithmInfo';
import ArrayInput from './components/ArrayInput';

function App() {
  const {
    array,
    selectedAlgorithm,
    speed,
    isPlaying,
    isSorted,
    comparisons,
    swaps,
    initializeArray,
    setCustomArray,
    setSelectedAlgorithm,
    setSpeed,
    generateSortingActions,
    togglePlay,
    stepForward,
    stepBackward,
    reset,
    getVisualizationState
  } = useSortingVisualizer();

  // Initialize with a random array on component mount
  useEffect(() => {
    initializeArray(20);
  }, [initializeArray]);

  // Get current visualization state
  const visualizationState = getVisualizationState();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Sorting Algorithm Visualizer
              </h1>
              <p className="text-gray-600 mt-1">
                Interactive visualization of sorting algorithms with step-by-step animations
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">
                Built with React, Tailwind CSS & Framer Motion
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar - Controls and Input */}
          <div className="lg:col-span-1 space-y-6">
            <ArrayInput
              onGenerateRandom={initializeArray}
              onSetCustomArray={setCustomArray}
              currentArray={array}
            />
            
            <Controls
              selectedAlgorithm={selectedAlgorithm}
              onAlgorithmChange={setSelectedAlgorithm}
              isPlaying={isPlaying}
              onTogglePlay={togglePlay}
              onStepForward={stepForward}
              onStepBackward={stepBackward}
              onReset={reset}
              onGenerateRandom={() => initializeArray(20)}
              speed={speed}
              onSpeedChange={setSpeed}
              currentStep={visualizationState.currentStep}
              totalSteps={visualizationState.totalSteps}
              comparisons={comparisons}
              swaps={swaps}
              isSorted={isSorted}
            />
          </div>

          {/* Center - Array Visualization */}
          <div className="lg:col-span-2">
            <ArrayVisualizer
              array={visualizationState.array}
              comparingIndices={visualizationState.comparingIndices}
              swappingIndices={visualizationState.swappingIndices}
              sortedIndices={visualizationState.sortedIndices}
              pivotIndex={visualizationState.pivotIndex}
              highlightedIndex={visualizationState.highlightedIndex}
            />
          </div>

          {/* Right Sidebar - Algorithm Information */}
          <div className="lg:col-span-1">
            <AlgorithmInfo selectedAlgorithm={selectedAlgorithm} />
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-gray-200">
          <div className="text-center text-gray-500 text-sm">
            <p>
              This visualizer demonstrates 8 different sorting algorithms with real-time animations.
              Use the controls to step through each algorithm and observe how they work.
            </p>
            <p className="mt-2">
              Algorithms included: Bubble Sort, Selection Sort, Insertion Sort, Merge Sort, 
              Quick Sort, Heap Sort, Shell Sort, and Radix Sort.
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default App; 