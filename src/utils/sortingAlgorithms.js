// Action types for the queue system
export const ACTION_TYPES = {
  COMPARE: 'COMPARE',
  SWAP: 'SWAP',
  MERGE: 'MERGE',
  PIVOT: 'PIVOT',
  SORTED: 'SORTED',
  HIGHLIGHT: 'HIGHLIGHT',
  RESET: 'RESET'
};

// Generate random array
export const generateRandomArray = (size, min = 1, max = 100) => {
  return Array.from({ length: size }, () => 
    Math.floor(Math.random() * (max - min + 1)) + min
  );
};

// Bubble Sort
export const bubbleSort = (array) => {
  const actions = [];
  const arr = [...array];
  const n = arr.length;
  
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      actions.push({ type: ACTION_TYPES.COMPARE, indices: [j, j + 1] });
      
      if (arr[j] > arr[j + 1]) {
        actions.push({ type: ACTION_TYPES.SWAP, indices: [j, j + 1] });
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
    actions.push({ type: ACTION_TYPES.SORTED, indices: [n - i - 1] });
  }
  
  actions.push({ type: ACTION_TYPES.SORTED, indices: [0] });
  return actions;
};

// Selection Sort
export const selectionSort = (array) => {
  const actions = [];
  const arr = [...array];
  const n = arr.length;
  
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    
    for (let j = i + 1; j < n; j++) {
      actions.push({ type: ACTION_TYPES.COMPARE, indices: [minIdx, j] });
      
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    
    if (minIdx !== i) {
      actions.push({ type: ACTION_TYPES.SWAP, indices: [i, minIdx] });
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    }
    
    actions.push({ type: ACTION_TYPES.SORTED, indices: [i] });
  }
  
  actions.push({ type: ACTION_TYPES.SORTED, indices: [n - 1] });
  return actions;
};

// Insertion Sort
export const insertionSort = (array) => {
  const actions = [];
  const arr = [...array];
  const n = arr.length;
  
  for (let i = 1; i < n; i++) {
    const key = arr[i];
    let j = i - 1;
    
    actions.push({ type: ACTION_TYPES.HIGHLIGHT, indices: [i] });
    
    while (j >= 0 && arr[j] > key) {
      actions.push({ type: ACTION_TYPES.COMPARE, indices: [j, j + 1] });
      actions.push({ type: ACTION_TYPES.SWAP, indices: [j, j + 1] });
      arr[j + 1] = arr[j];
      j--;
    }
    
    arr[j + 1] = key;
    actions.push({ type: ACTION_TYPES.SORTED, indices: [j + 1] });
  }
  
  return actions;
};

// Merge Sort
export const mergeSort = (array) => {
  const actions = [];
  const arr = [...array];
  
  const merge = (left, mid, right) => {
    const leftArr = arr.slice(left, mid + 1);
    const rightArr = arr.slice(mid + 1, right + 1);
    
    let i = 0, j = 0, k = left;
    
    while (i < leftArr.length && j < rightArr.length) {
      actions.push({ type: ACTION_TYPES.COMPARE, indices: [left + i, mid + 1 + j] });
      
      if (leftArr[i] <= rightArr[j]) {
        arr[k] = leftArr[i];
        i++;
      } else {
        arr[k] = rightArr[j];
        j++;
      }
      
      actions.push({ type: ACTION_TYPES.MERGE, indices: [k], value: arr[k] });
      k++;
    }
    
    while (i < leftArr.length) {
      arr[k] = leftArr[i];
      actions.push({ type: ACTION_TYPES.MERGE, indices: [k], value: arr[k] });
      i++;
      k++;
    }
    
    while (j < rightArr.length) {
      arr[k] = rightArr[j];
      actions.push({ type: ACTION_TYPES.MERGE, indices: [k], value: arr[k] });
      j++;
      k++;
    }
  };
  
  const sort = (left, right) => {
    if (left < right) {
      const mid = Math.floor((left + right) / 2);
      sort(left, mid);
      sort(mid + 1, right);
      merge(left, mid, right);
    }
  };
  
  sort(0, arr.length - 1);
  
  // Mark all as sorted at the end
  for (let i = 0; i < arr.length; i++) {
    actions.push({ type: ACTION_TYPES.SORTED, indices: [i] });
  }
  
  return actions;
};

// Quick Sort
export const quickSort = (array) => {
  const actions = [];
  const arr = [...array];
  
  const partition = (low, high) => {
    const pivot = arr[high];
    let i = low - 1;
    
    actions.push({ type: ACTION_TYPES.PIVOT, indices: [high] });
    
    for (let j = low; j < high; j++) {
      actions.push({ type: ACTION_TYPES.COMPARE, indices: [j, high] });
      
      if (arr[j] < pivot) {
        i++;
        if (i !== j) {
          actions.push({ type: ACTION_TYPES.SWAP, indices: [i, j] });
          [arr[i], arr[j]] = [arr[j], arr[i]];
        }
      }
    }
    
    if (i + 1 !== high) {
      actions.push({ type: ACTION_TYPES.SWAP, indices: [i + 1, high] });
      [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    }
    
    return i + 1;
  };
  
  const sort = (low, high) => {
    if (low < high) {
      const pi = partition(low, high);
      sort(low, pi - 1);
      sort(pi + 1, high);
    }
  };
  
  sort(0, arr.length - 1);
  
  // Mark all as sorted at the end
  for (let i = 0; i < arr.length; i++) {
    actions.push({ type: ACTION_TYPES.SORTED, indices: [i] });
  }
  
  return actions;
};

// Heap Sort
export const heapSort = (array) => {
  const actions = [];
  const arr = [...array];
  const n = arr.length;
  
  const heapify = (n, i) => {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    
    if (left < n) {
      actions.push({ type: ACTION_TYPES.COMPARE, indices: [largest, left] });
      if (arr[left] > arr[largest]) {
        largest = left;
      }
    }
    
    if (right < n) {
      actions.push({ type: ACTION_TYPES.COMPARE, indices: [largest, right] });
      if (arr[right] > arr[largest]) {
        largest = right;
      }
    }
    
    if (largest !== i) {
      actions.push({ type: ACTION_TYPES.SWAP, indices: [i, largest] });
      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      heapify(n, largest);
    }
  };
  
  // Build heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(n, i);
  }
  
  // Extract elements from heap
  for (let i = n - 1; i > 0; i--) {
    actions.push({ type: ACTION_TYPES.SWAP, indices: [0, i] });
    [arr[0], arr[i]] = [arr[i], arr[0]];
    actions.push({ type: ACTION_TYPES.SORTED, indices: [i] });
    heapify(i, 0);
  }
  
  actions.push({ type: ACTION_TYPES.SORTED, indices: [0] });
  return actions;
};

// Shell Sort
export const shellSort = (array) => {
  const actions = [];
  const arr = [...array];
  const n = arr.length;
  
  for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
    for (let i = gap; i < n; i++) {
      const temp = arr[i];
      let j;
      
      actions.push({ type: ACTION_TYPES.HIGHLIGHT, indices: [i] });
      
      for (j = i; j >= gap && arr[j - gap] > temp; j -= gap) {
        actions.push({ type: ACTION_TYPES.COMPARE, indices: [j - gap, j] });
        actions.push({ type: ACTION_TYPES.SWAP, indices: [j, j - gap] });
        arr[j] = arr[j - gap];
      }
      
      arr[j] = temp;
    }
  }
  
  // Mark all as sorted at the end
  for (let i = 0; i < arr.length; i++) {
    actions.push({ type: ACTION_TYPES.SORTED, indices: [i] });
  }
  
  return actions;
};

// Radix Sort
export const radixSort = (array) => {
  const actions = [];
  const arr = [...array];
  const max = Math.max(...arr);
  
  const countingSort = (exp) => {
    const n = arr.length;
    const output = new Array(n);
    const count = new Array(10).fill(0);
    
    for (let i = 0; i < n; i++) {
      count[Math.floor(arr[i] / exp) % 10]++;
    }
    
    for (let i = 1; i < 10; i++) {
      count[i] += count[i - 1];
    }
    
    for (let i = n - 1; i >= 0; i--) {
      const digit = Math.floor(arr[i] / exp) % 10;
      output[count[digit] - 1] = arr[i];
      count[digit]--;
    }
    
    for (let i = 0; i < n; i++) {
      arr[i] = output[i];
      actions.push({ type: ACTION_TYPES.MERGE, indices: [i], value: arr[i] });
    }
  };
  
  for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
    countingSort(exp);
  }
  
  // Mark all as sorted at the end
  for (let i = 0; i < arr.length; i++) {
    actions.push({ type: ACTION_TYPES.SORTED, indices: [i] });
  }
  
  return actions;
};

// Algorithm metadata
export const ALGORITHMS = {
  bubbleSort: {
    name: 'Bubble Sort',
    description: 'A simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.',
    timeComplexity: {
      best: 'O(n)',
      average: 'O(n²)',
      worst: 'O(n²)'
    },
    spaceComplexity: 'O(1)',
    stable: true,
    inPlace: true,
    pseudocode: `function bubbleSort(array):
  n = length(array)
  for i from 0 to n-1:
    for j from 0 to n-i-1:
      if array[j] > array[j+1]:
        swap(array[j], array[j+1])`
  },
  selectionSort: {
    name: 'Selection Sort',
    description: 'An in-place comparison sorting algorithm that divides the input list into two parts: a sorted sublist and an unsorted sublist.',
    timeComplexity: {
      best: 'O(n²)',
      average: 'O(n²)',
      worst: 'O(n²)'
    },
    spaceComplexity: 'O(1)',
    stable: false,
    inPlace: true,
    pseudocode: `function selectionSort(array):
  n = length(array)
  for i from 0 to n-1:
    minIndex = i
    for j from i+1 to n:
      if array[j] < array[minIndex]:
        minIndex = j
    swap(array[i], array[minIndex])`
  },
  insertionSort: {
    name: 'Insertion Sort',
    description: 'A simple sorting algorithm that builds the final sorted array one item at a time by repeatedly inserting a new element into the sorted portion of the array.',
    timeComplexity: {
      best: 'O(n)',
      average: 'O(n²)',
      worst: 'O(n²)'
    },
    spaceComplexity: 'O(1)',
    stable: true,
    inPlace: true,
    pseudocode: `function insertionSort(array):
  for i from 1 to length(array):
    key = array[i]
    j = i - 1
    while j >= 0 and array[j] > key:
      array[j+1] = array[j]
      j = j - 1
    array[j+1] = key`
  },
  mergeSort: {
    name: 'Merge Sort',
    description: 'A divide-and-conquer algorithm that recursively breaks down a problem into two or more sub-problems until they become simple enough to solve directly.',
    timeComplexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n log n)'
    },
    spaceComplexity: 'O(n)',
    stable: true,
    inPlace: false,
    pseudocode: `function mergeSort(array):
  if length(array) <= 1:
    return array
  mid = length(array) / 2
  left = mergeSort(array[0:mid])
  right = mergeSort(array[mid:])
  return merge(left, right)`
  },
  quickSort: {
    name: 'Quick Sort',
    description: 'A highly efficient, comparison-based sorting algorithm that uses a divide-and-conquer strategy to sort elements.',
    timeComplexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n²)'
    },
    spaceComplexity: 'O(log n)',
    stable: false,
    inPlace: true,
    pseudocode: `function quickSort(array, low, high):
  if low < high:
    pi = partition(array, low, high)
    quickSort(array, low, pi-1)
    quickSort(array, pi+1, high)`
  },
  heapSort: {
    name: 'Heap Sort',
    description: 'A comparison-based sorting algorithm that uses a binary heap data structure to sort elements.',
    timeComplexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n log n)'
    },
    spaceComplexity: 'O(1)',
    stable: false,
    inPlace: true,
    pseudocode: `function heapSort(array):
  n = length(array)
  for i from n/2-1 down to 0:
    heapify(array, n, i)
  for i from n-1 down to 0:
    swap(array[0], array[i])
    heapify(array, i, 0)`
  },
  shellSort: {
    name: 'Shell Sort',
    description: 'An optimization of insertion sort that allows the exchange of items that are far apart, reducing the number of swaps required.',
    timeComplexity: {
      best: 'O(n log n)',
      average: 'O(n^1.3)',
      worst: 'O(n²)'
    },
    spaceComplexity: 'O(1)',
    stable: false,
    inPlace: true,
    pseudocode: `function shellSort(array):
  n = length(array)
  for gap = n/2; gap > 0; gap /= 2:
    for i = gap; i < n; i++:
      temp = array[i]
      for j = i; j >= gap and array[j-gap] > temp; j -= gap:
        array[j] = array[j-gap]
      array[j] = temp`
  },
  radixSort: {
    name: 'Radix Sort',
    description: 'A non-comparative integer sorting algorithm that sorts data with integer keys by grouping keys by the individual digits.',
    timeComplexity: {
      best: 'O(nk)',
      average: 'O(nk)',
      worst: 'O(nk)'
    },
    spaceComplexity: 'O(n+k)',
    stable: true,
    inPlace: false,
    pseudocode: `function radixSort(array):
  max = max(array)
  for exp = 1; max/exp > 0; exp *= 10:
    countingSort(array, exp)`
  }
}; 