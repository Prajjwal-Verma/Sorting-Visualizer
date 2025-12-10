/**
 * Tests for sorting algorithm implementations
 * These tests verify that each sorting algorithm correctly sorts arrays
 */

// Helper sorting functions extracted from the visualizer logic
// These are pure implementations without DOM manipulation for testing

function bubbleSortPure(arr) {
  const sorted = [...arr];
  const n = sorted.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (sorted[j] > sorted[j + 1]) {
        [sorted[j], sorted[j + 1]] = [sorted[j + 1], sorted[j]];
      }
    }
  }
  return sorted;
}

function cocktailSortPure(arr) {
  const sorted = [...arr];
  let swapped = true;
  let start = 0;
  let end = sorted.length - 1;

  while (swapped) {
    swapped = false;
    for (let i = start; i < end; ++i) {
      if (sorted[i] > sorted[i + 1]) {
        [sorted[i], sorted[i + 1]] = [sorted[i + 1], sorted[i]];
        swapped = true;
      }
    }
    if (!swapped) break;
    swapped = false;
    --end;

    for (let i = end - 1; i >= start; --i) {
      if (sorted[i] > sorted[i + 1]) {
        [sorted[i], sorted[i + 1]] = [sorted[i + 1], sorted[i]];
        swapped = true;
      }
    }
    ++start;
  }
  return sorted;
}

function heapSortPure(arr) {
  const sorted = [...arr];

  // Build heap
  for (let e = 1; e < sorted.length; e++) {
    let i = e;
    while (i > 0) {
      const parentIdx = Math.floor((i - 1) / 2);
      if (sorted[i] > sorted[parentIdx]) {
        [sorted[i], sorted[parentIdx]] = [sorted[parentIdx], sorted[i]];
        i = parentIdx;
      } else {
        break;
      }
    }
  }

  // Heapify
  for (let e = sorted.length - 1; e > 0; e--) {
    [sorted[0], sorted[e]] = [sorted[e], sorted[0]];
    const end = e - 1;
    let i = 0;

    while (i <= end) {
      const leftIndex = 2 * i + 1;
      if (leftIndex > end) break;
      let rightIndex = 2 * i + 2;
      if (rightIndex > end) rightIndex = leftIndex;

      if (sorted[i] >= Math.max(sorted[leftIndex], sorted[rightIndex])) break;

      if (sorted[leftIndex] >= sorted[rightIndex]) {
        [sorted[i], sorted[leftIndex]] = [sorted[leftIndex], sorted[i]];
        i = leftIndex;
      } else {
        [sorted[i], sorted[rightIndex]] = [sorted[rightIndex], sorted[i]];
        i = rightIndex;
      }
    }
  }
  return sorted;
}

function insertionSortPure(arr) {
  const sorted = [...arr];
  const n = sorted.length;

  for (let i = 1; i <= n - 1; i++) {
    let p = i;
    const gValue = sorted[p];

    for (let j = p - 1; j >= 0; j--, p--) {
      const jValue = sorted[j];
      if (gValue >= jValue) {
        break;
      }
      sorted[j + 1] = jValue;
    }
    sorted[p] = gValue;
  }
  return sorted;
}

function linearSortPure(arr) {
  const sorted = [...arr];
  const n = sorted.length;

  for (let i = 0; i <= n - 2; i++) {
    for (let j = i + 1; j <= n - 1; j++) {
      if (sorted[j] < sorted[i]) {
        [sorted[i], sorted[j]] = [sorted[j], sorted[i]];
      }
    }
  }
  return sorted;
}

function mergeSortPure(arr) {
  if (arr.length <= 1) return arr;

  function merge(left, right) {
    const result = [];
    let i = 0, j = 0;

    while (i < left.length && j < right.length) {
      if (left[i] <= right[j]) {
        result.push(left[i]);
        i++;
      } else {
        result.push(right[j]);
        j++;
      }
    }

    return result.concat(left.slice(i)).concat(right.slice(j));
  }

  function sort(array) {
    if (array.length <= 1) return array;
    const middle = Math.floor(array.length / 2);
    const left = sort(array.slice(0, middle));
    const right = sort(array.slice(middle));
    return merge(left, right);
  }

  return sort(arr);
}

function quickSortPure(arr) {
  if (arr.length <= 1) return arr;

  const pivot = arr[arr.length - 1];
  const left = [];
  const right = [];

  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }

  return [...quickSortPure(left), pivot, ...quickSortPure(right)];
}

function selectionSortPure(arr) {
  const sorted = [...arr];
  const n = sorted.length;

  for (let i = 0; i < n - 1; i++) {
    let m = i;
    for (let j = i + 1; j < n; j++) {
      if (sorted[j] < sorted[m]) {
        m = j;
      }
    }
    [sorted[i], sorted[m]] = [sorted[m], sorted[i]];
  }
  return sorted;
}

// Test data
const testCases = [
  {
    name: 'empty array',
    input: [],
    expected: []
  },
  {
    name: 'single element',
    input: [5],
    expected: [5]
  },
  {
    name: 'already sorted',
    input: [1, 2, 3, 4, 5],
    expected: [1, 2, 3, 4, 5]
  },
  {
    name: 'reverse sorted',
    input: [5, 4, 3, 2, 1],
    expected: [1, 2, 3, 4, 5]
  },
  {
    name: 'random order',
    input: [3, 1, 4, 1, 5, 9, 2, 6],
    expected: [1, 1, 2, 3, 4, 5, 6, 9]
  },
  {
    name: 'duplicates',
    input: [5, 2, 8, 2, 9, 1, 5, 5],
    expected: [1, 2, 2, 5, 5, 5, 8, 9]
  },
  {
    name: 'all same elements',
    input: [7, 7, 7, 7, 7],
    expected: [7, 7, 7, 7, 7]
  },
  {
    name: 'negative numbers',
    input: [-3, 5, -1, 0, 2, -7],
    expected: [-7, -3, -1, 0, 2, 5]
  }
];

const algorithms = [
  { name: 'Bubble Sort', fn: bubbleSortPure },
  { name: 'Cocktail Sort', fn: cocktailSortPure },
  { name: 'Heap Sort', fn: heapSortPure },
  { name: 'Insertion Sort', fn: insertionSortPure },
  { name: 'Linear Sort', fn: linearSortPure },
  { name: 'Merge Sort', fn: mergeSortPure },
  { name: 'Quick Sort', fn: quickSortPure },
  { name: 'Selection Sort', fn: selectionSortPure }
];

// Generate tests for all algorithms
algorithms.forEach(algorithm => {
  describe(algorithm.name, () => {
    testCases.forEach(testCase => {
      test(`should correctly sort ${testCase.name}`, () => {
        const result = algorithm.fn(testCase.input);
        expect(result).toEqual(testCase.expected);
      });
    });

    test('should not mutate original array', () => {
      const original = [3, 1, 4, 1, 5];
      const copy = [...original];
      algorithm.fn(original);
      expect(original).toEqual(copy);
    });
  });
});

// Performance comparison test (optional)
describe('Performance comparison', () => {
  test('all algorithms should handle medium-sized arrays', () => {
    const arr = Array.from({ length: 100 }, () => Math.floor(Math.random() * 1000));
    const expected = [...arr].sort((a, b) => a - b);

    algorithms.forEach(algorithm => {
      const result = algorithm.fn(arr);
      expect(result).toEqual(expected);
    });
  });
});
