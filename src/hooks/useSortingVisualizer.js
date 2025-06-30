import { useState, useRef, useCallback } from 'react';
import {
  bubbleSort,
  selectionSort,
  insertionSort,
  mergeSort,
  quickSort,
  heapSort,
  shellSort,
  radixSort,
  generateRandomArray,
  ACTION_TYPES
} from '../utils/sortingAlgorithms';

const SORTING_FUNCTIONS = {
  bubbleSort,
  selectionSort,
  insertionSort,
  mergeSort,
  quickSort,
  heapSort,
  shellSort,
  radixSort
};

export const useSortingVisualizer = () => {
  const [array, setArray] = useState([]);
  const [actionQueue, setActionQueue] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(100);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('bubbleSort');
  const [isSorted, setIsSorted] = useState(false);
  const [comparisons, setComparisons] = useState(0);
  const [swaps, setSwaps] = useState(0);
  
  const intervalRef = useRef(null);
  const currentArrayRef = useRef([]);
  const sortedIndicesRef = useRef(new Set());
  const comparingIndicesRef = useRef([]);
  const swappingIndicesRef = useRef([]);
  const pivotIndexRef = useRef(null);
  const highlightedIndexRef = useRef(null);

  // Initialize with random array
  const initializeArray = useCallback((size = 20) => {
    const newArray = generateRandomArray(size);
    setArray(newArray);
    currentArrayRef.current = [...newArray];
    setActionQueue([]);
    setCurrentStep(0);
    setIsPlaying(false);
    setIsSorted(false);
    setComparisons(0);
    setSwaps(0);
    sortedIndicesRef.current.clear();
    comparingIndicesRef.current = [];
    swappingIndicesRef.current = [];
    pivotIndexRef.current = null;
    highlightedIndexRef.current = null;
    
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // Set custom array
  const setCustomArray = useCallback((customArray) => {
    if (Array.isArray(customArray) && customArray.length > 0) {
      setArray(customArray);
      currentArrayRef.current = [...customArray];
      setActionQueue([]);
      setCurrentStep(0);
      setIsPlaying(false);
      setIsSorted(false);
      setComparisons(0);
      setSwaps(0);
      sortedIndicesRef.current.clear();
      comparingIndicesRef.current = [];
      swappingIndicesRef.current = [];
      pivotIndexRef.current = null;
      highlightedIndexRef.current = null;
      
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
  }, []);

  // Generate sorting actions
  const generateSortingActions = useCallback(() => {
    if (array.length === 0) return;
    
    const sortingFunction = SORTING_FUNCTIONS[selectedAlgorithm];
    if (!sortingFunction) return;
    
    const actions = sortingFunction([...array]);
    setActionQueue(actions);
    setCurrentStep(0);
    setIsSorted(false);
    setComparisons(0);
    setSwaps(0);
    sortedIndicesRef.current.clear();
    comparingIndicesRef.current = [];
    swappingIndicesRef.current = [];
    pivotIndexRef.current = null;
    highlightedIndexRef.current = null;
  }, [array, selectedAlgorithm]);

  // Execute next action
  const executeNextAction = useCallback(() => {
    if (currentStep >= actionQueue.length) {
      setIsPlaying(false);
      setIsSorted(true);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      // Clamp currentStep to totalSteps
      setCurrentStep(actionQueue.length);
      // Clear all highlight states at the end
      comparingIndicesRef.current = [];
      swappingIndicesRef.current = [];
      pivotIndexRef.current = null;
      highlightedIndexRef.current = null;
      return;
    }

    const action = actionQueue[currentStep];
    const newArray = [...currentArrayRef.current];

    switch (action.type) {
      case ACTION_TYPES.COMPARE:
        comparingIndicesRef.current = action.indices;
        setComparisons(prev => prev + 1);
        break;
        
      case ACTION_TYPES.SWAP: {
        const [i, j] = action.indices;
        swappingIndicesRef.current = action.indices;
        // Always create a new array to avoid mutation issues
        const swappedArray = [...newArray];
        [swappedArray[i], swappedArray[j]] = [swappedArray[j], swappedArray[i]];
        setSwaps(prev => prev + 1);
        currentArrayRef.current = swappedArray;
        setArray(swappedArray);
        break;
      }
        
      case ACTION_TYPES.MERGE:
        const [index] = action.indices;
        newArray[index] = action.value;
        break;
        
      case ACTION_TYPES.PIVOT:
        pivotIndexRef.current = action.indices[0];
        break;
        
      case ACTION_TYPES.SORTED:
        action.indices.forEach(index => {
          sortedIndicesRef.current.add(index);
        });
        break;
        
      case ACTION_TYPES.HIGHLIGHT:
        highlightedIndexRef.current = action.indices[0];
        break;
        
      case ACTION_TYPES.RESET:
        comparingIndicesRef.current = [];
        swappingIndicesRef.current = [];
        pivotIndexRef.current = null;
        highlightedIndexRef.current = null;
        break;
    }

    currentArrayRef.current = newArray;
    setArray(newArray);
    // Only increment if not at the end
    if (currentStep + 1 <= actionQueue.length) {
      setCurrentStep(prev => prev + 1);
    }
  }, [currentStep, actionQueue]);

  // Play/pause functionality
  const togglePlay = useCallback(() => {
    if (actionQueue.length === 0) {
      generateSortingActions();
      return;
    }

    if (isPlaying) {
      setIsPlaying(false);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    } else {
      setIsPlaying(true);
      intervalRef.current = setInterval(() => {
        executeNextAction();
      }, 1000 - speed * 8); // Convert speed (0-100) to delay (20-1000ms)
    }
  }, [isPlaying, actionQueue.length, generateSortingActions, executeNextAction, speed]);

  // Step forward/backward
  const stepForward = useCallback(() => {
    if (actionQueue.length === 0) {
      generateSortingActions();
      return;
    }
    
    if (currentStep < actionQueue.length) {
      executeNextAction();
    }
  }, [actionQueue.length, generateSortingActions, currentStep, executeNextAction]);

  const stepBackward = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      // Reset to initial state and replay up to current step - 1
      const newArray = [...array];
      currentArrayRef.current = newArray;
      setArray(newArray);
      setComparisons(0);
      setSwaps(0);
      sortedIndicesRef.current.clear();
      comparingIndicesRef.current = [];
      swappingIndicesRef.current = [];
      pivotIndexRef.current = null;
      highlightedIndexRef.current = null;
      
      // Replay actions up to current step - 1
      for (let i = 0; i < currentStep - 1; i++) {
        const action = actionQueue[i];
        const tempArray = [...currentArrayRef.current];
        
        switch (action.type) {
          case ACTION_TYPES.SWAP:
            const [i, j] = action.indices;
            [tempArray[i], tempArray[j]] = [tempArray[j], tempArray[i]];
            setSwaps(prev => prev + 1);
            break;
          case ACTION_TYPES.MERGE:
            const [index] = action.indices;
            tempArray[index] = action.value;
            break;
          case ACTION_TYPES.COMPARE:
            setComparisons(prev => prev + 1);
            break;
          case ACTION_TYPES.SORTED:
            action.indices.forEach(index => {
              sortedIndicesRef.current.add(index);
            });
            break;
        }
        
        currentArrayRef.current = tempArray;
      }
      
      setArray(currentArrayRef.current);
    }
  }, [currentStep, actionQueue, array]);

  // Reset visualization
  const reset = useCallback(() => {
    setActionQueue([]);
    setCurrentStep(0);
    setIsPlaying(false);
    setIsSorted(false);
    setComparisons(0);
    setSwaps(0);
    sortedIndicesRef.current.clear();
    comparingIndicesRef.current = [];
    swappingIndicesRef.current = [];
    pivotIndexRef.current = null;
    highlightedIndexRef.current = null;
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // Get current state for visualization
  const getVisualizationState = useCallback(() => ({
    array: currentArrayRef.current,
    comparingIndices: comparingIndicesRef.current,
    swappingIndices: swappingIndicesRef.current,
    sortedIndices: Array.from(sortedIndicesRef.current),
    pivotIndex: pivotIndexRef.current,
    highlightedIndex: highlightedIndexRef.current,
    currentStep: Math.min(currentStep, actionQueue.length),
    totalSteps: actionQueue.length,
    isPlaying,
    isSorted,
    comparisons,
    swaps
  }), [currentStep, actionQueue.length, isPlaying, isSorted, comparisons, swaps]);

  return {
    // State
    array,
    selectedAlgorithm,
    speed,
    isPlaying,
    isSorted,
    comparisons,
    swaps,
    
    // Actions
    initializeArray,
    setCustomArray,
    setSelectedAlgorithm,
    setSpeed,
    generateSortingActions,
    togglePlay,
    stepForward,
    stepBackward,
    reset,
    
    // Visualization state
    getVisualizationState
  };
}; 