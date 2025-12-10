import React, { useState, useEffect, useRef, useCallback } from "react";
import "./SortingVisualizer.css";

class Tuple {
  constructor(first, second, operation) {
    this.first = first;
    this.second = second;
    this.operation = operation;
  }
}

function SortingVisualizer({ controllerData, visualizerDataHandler }) {
  const [arr, setArr] = useState([]);
  const [size, setSize] = useState("");
  const [speed, setSpeed] = useState("");
  const [barColor, setBarColor] = useState("");
  const [pointerColor, setPointerColor] = useState("");
  const [sortedColor, setSortedColor] = useState("");
  const [randomize, setRandomize] = useState(false);

  const sortedRef = useRef(false);
  const sortingInProgressRef = useRef(false);
  const widthRef = useRef(0);
  const heightRef = useRef(0);
  const barRefs = useRef([]);

  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const getSpeed = useCallback((speed) => {
    switch (speed) {
      case "Very Fast":
        return 25;
      case "Normal":
        return 250;
      case "Slow":
        return 500;
      case "Very Slow":
        return 1000;
      default:
        return 100;
    }
  }, []);

  const getColor = useCallback((colorName) => {
    switch (colorName) {
      case "Black":
        return "#000000";
      case "Cyan":
        return "#00e6e6";
      case "Green":
        return "#0af516";
      case "Pink":
        return "#e600e6";
      case "Red":
        return "#cc0000";
      case "Yellow":
        return "#EEEE00";
      default:
        return "#00008B";
    }
  }, []);

  const getBarHeight = useCallback(() => {
    let height =
      (heightRef.current - 140 - parseInt(size) * 5) / parseInt(size);
    return height;
  }, [size]);

  const getFontHeight = useCallback(() => {
    let fontHeight =
      (heightRef.current - 150 - parseInt(size) * 5) / parseInt(size);
    return fontHeight - 10;
  }, [size]);

  const getRandomElement = useCallback(() => {
    var max = 0;
    var min = 50;
    if (widthRef.current < 768) max = (widthRef.current * 8) / 10;
    else max = (widthRef.current * 6) / 10;
    return Math.floor(Math.random() * (max - min + 1) + min);
  }, []);

  // Initialize on mount
  useEffect(() => {
    widthRef.current = window.screen.width;
    heightRef.current = window.screen.height;

    let temp = new Set();
    while (temp.size !== parseInt(controllerData["size"])) {
      temp.add(getRandomElement());
    }
    temp = Array.from(temp);

    setArr(temp);
    setSize(controllerData["size"]);
    setSpeed(controllerData["speed"]);
    setBarColor(getColor(controllerData["barColor"]));
    setPointerColor(getColor(controllerData["pointerColor"]));
    setSortedColor(getColor(controllerData["sortedColor"]));
    setRandomize(controllerData["randomize"]);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const bubbleSort = useCallback(async () => {
    sortedRef.current = false;
    sortingInProgressRef.current = true;
    visualizerDataHandler(sortedRef.current);
    let bars = barRefs.current.filter(bar => bar !== null && bar !== undefined);
    if (bars.length === 0) {
      sortingInProgressRef.current = false;
      return;
    }
    let n = bars.length;
    let e, f, eIndex, fIndex;

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (!sortingInProgressRef.current) {
          // Reset colors if interrupted
          for (let k = 0; k < bars.length; k++) {
            bars[k].style.backgroundColor = barColor;
          }
          return;
        }

        bars[j].style.backgroundColor = pointerColor;
        bars[j + 1].style.backgroundColor = pointerColor;
        e = parseInt(bars[j].innerHTML);
        eIndex = j;
        f = parseInt(bars[j + 1].innerHTML);
        fIndex = j + 1;

        // Wait to show comparison
        await sleep(getSpeed(speed));

        if (!sortingInProgressRef.current) {
          bars[j].style.backgroundColor = barColor;
          bars[j + 1].style.backgroundColor = barColor;
          return;
        }

        if (e > f) {
          let gValue = bars[eIndex].innerHTML;
          let gWidth = bars[eIndex].style.width;
          bars[eIndex].innerHTML = bars[fIndex].innerHTML;
          bars[eIndex].style.width = bars[fIndex].style.width;
          bars[fIndex].innerHTML = gValue;
          bars[fIndex].style.width = gWidth;
        }

        bars[j].style.backgroundColor = barColor;
        bars[j + 1].style.backgroundColor = barColor;
      }
      bars[n - i - 1].style.backgroundColor = sortedColor;
    }
    bars[0].style.backgroundColor = sortedColor;
    sortedRef.current = true;
    sortingInProgressRef.current = false;
    visualizerDataHandler(sortedRef.current);
  }, [barColor, pointerColor, sortedColor, speed, visualizerDataHandler, getSpeed]);

  const cocktailSort = useCallback(async () => {
    sortedRef.current = false;
    sortingInProgressRef.current = true;
    visualizerDataHandler(sortedRef.current);
    let bars = barRefs.current.filter(bar => bar !== null && bar !== undefined);
    if (bars.length === 0) {
      sortingInProgressRef.current = false;
      return;
    }
    let n = bars.length;
    let swapped = true;
    let start = 0;
    let end = n - 1;
    let gValue, gWidth;

    while (swapped) {
      swapped = false;
      for (let i = start; i < end; ++i) {
        if (parseInt(bars[i].innerHTML) > parseInt(bars[i + 1].innerHTML)) {
          bars[i].style.backgroundColor = pointerColor;
          bars[i + 1].style.backgroundColor = pointerColor;
            await sleep(getSpeed(speed));
            bars[i].style.backgroundColor = barColor;
          bars[i + 1].style.backgroundColor = barColor;
          gValue = parseInt(bars[i].innerHTML);
          gWidth = bars[i].style.width;
          bars[i].innerHTML = parseInt(bars[i + 1].innerHTML);
          bars[i].style.width = bars[i + 1].style.width;
          bars[i + 1].innerHTML = gValue;
          bars[i + 1].style.width = gWidth;
          swapped = true;
        }
      }
      if (!swapped) break;
      swapped = false;
      bars[end].style.backgroundColor = sortedColor;
      --end;

      for (let i = end - 1; i >= start; --i) {
        if (parseInt(bars[i].innerHTML) > parseInt(bars[i + 1].innerHTML)) {
          bars[i].style.backgroundColor = pointerColor;
          bars[i + 1].style.backgroundColor = pointerColor;
            await sleep(getSpeed(speed));
            bars[i].style.backgroundColor = barColor;
          bars[i + 1].style.backgroundColor = barColor;
          gValue = parseInt(bars[i].innerHTML);
          gWidth = bars[i].style.width;
          bars[i].innerHTML = parseInt(bars[i + 1].innerHTML);
          bars[i].style.width = bars[i + 1].style.width;
          bars[i + 1].innerHTML = gValue;
          bars[i + 1].style.width = gWidth;
          swapped = true;
        }
      }
      bars[start].style.backgroundColor = sortedColor;
      ++start;
    }

    let i = start;
    let j = end;
    while (i <= j) {
      bars[j].style.backgroundColor = sortedColor;
      bars[i].style.backgroundColor = sortedColor;
      i++;
      j--;
    }
    sortedRef.current = true;
    sortingInProgressRef.current = false;
    visualizerDataHandler(sortedRef.current);
  }, [barColor, pointerColor, sortedColor, speed, visualizerDataHandler, getSpeed]);

  const heapSort = useCallback(async () => {
    sortedRef.current = false;
    sortingInProgressRef.current = true;
    visualizerDataHandler(sortedRef.current);
    let arr = barRefs.current.filter(bar => bar !== null && bar !== undefined);
    if (arr.length === 0) {
      sortingInProgressRef.current = false;
      return;
    }
    let temp, tempWidth;
    let leftIndex, rightIndex, x, y;
    let end;

    // Building heap
    for (let e = 1; e < arr.length; e++) {
      let i = e;
      while (i > 0) {
        if (
          parseInt(arr[i].innerHTML) >
          parseInt(arr[Math.floor((i - 1) / 2)].innerHTML)
        ) {
          x = i;
          y = Math.floor((i - 1) / 2);
          temp = arr[x].innerHTML;
          tempWidth = arr[x].style.width;
          arr[x].style.backgroundColor = pointerColor;
          arr[y].style.backgroundColor = pointerColor;
          arr[x].innerHTML = arr[y].innerHTML;
          arr[x].style.width = arr[y].style.width;
          arr[y].innerHTML = temp;
          arr[y].style.width = tempWidth;
          await sleep(getSpeed(speed));
          arr[x].style.backgroundColor = barColor;
          arr[y].style.backgroundColor = barColor;
          i = y;
        } else {
          break;
        }
      }
      await sleep(getSpeed(speed));
    }

    // Heapify
    for (let e = arr.length - 1; e > 0; e--) {
      arr[0].style.backgroundColor = pointerColor;
      arr[e].style.backgroundColor = pointerColor;
      temp = arr[0].innerHTML;
      tempWidth = arr[0].style.width;
      arr[0].innerHTML = arr[e].innerHTML;
      arr[0].style.width = arr[e].style.width;
      arr[e].innerHTML = temp;
      arr[e].style.width = tempWidth;
      await sleep(getSpeed(speed));
      arr[0].style.backgroundColor = barColor;
      arr[e].style.backgroundColor = barColor;
      end = e - 1;
      let i = 0;

      while (i <= end) {
        leftIndex = 2 * i + 1;
        if (leftIndex > end) break;
        rightIndex = 2 * i + 2;
        if (rightIndex > end) rightIndex = leftIndex;

        if (
          parseInt(arr[i].innerHTML) >=
          Math.max(
            parseInt(arr[leftIndex].innerHTML),
            parseInt(arr[rightIndex].innerHTML)
          )
        )
          break;

        if (
          parseInt(arr[leftIndex].innerHTML) >=
          parseInt(arr[rightIndex].innerHTML)
        ) {
          x = i;
          y = leftIndex;
          arr[x].style.backgroundColor = pointerColor;
          arr[y].style.backgroundColor = pointerColor;
          temp = arr[x].innerHTML;
          tempWidth = arr[x].style.width;
          arr[x].innerHTML = arr[y].innerHTML;
          arr[x].style.width = arr[y].style.width;
          arr[y].innerHTML = temp;
          arr[y].style.width = tempWidth;
          await sleep(getSpeed(speed));
          arr[x].style.backgroundColor = barColor;
          arr[y].style.backgroundColor = barColor;
          i = leftIndex;
        } else {
          x = i;
          y = rightIndex;
          arr[x].style.backgroundColor = pointerColor;
          arr[y].style.backgroundColor = pointerColor;
          temp = arr[x].innerHTML;
          tempWidth = arr[x].style.width;
          arr[x].innerHTML = arr[y].innerHTML;
          arr[x].style.width = arr[y].style.width;
          arr[y].innerHTML = temp;
          arr[y].style.width = tempWidth;
            await sleep(getSpeed(speed));
            arr[x].style.backgroundColor = barColor;
          arr[y].style.backgroundColor = barColor;
          i = rightIndex;
        }
      }
      await sleep(getSpeed(speed));
      arr[e].style.backgroundColor = sortedColor;
    }
    arr[0].style.backgroundColor = sortedColor;
    sortedRef.current = true;
    sortingInProgressRef.current = false;
    visualizerDataHandler(sortedRef.current);
  }, [barColor, pointerColor, sortedColor, speed, randomize, visualizerDataHandler, getSpeed]);

  const insertionSort = useCallback(async () => {
    sortedRef.current = false;
    sortingInProgressRef.current = true;
    visualizerDataHandler(sortedRef.current);
    let bars = barRefs.current.filter(bar => bar !== null && bar !== undefined);
    if (bars.length === 0) {
      sortingInProgressRef.current = false;
      return;
    }
    let n = bars.length;
    let p, g, gValue, gWidth, jValue, jWidth;

    for (let i = 1; i <= n - 1; i++) {
      p = i;
      bars[i].style.backgroundColor = pointerColor;
      gValue = parseInt(bars[p].innerHTML);
      gWidth = bars[p].style.width;

      for (let j = p - 1; j >= 0; j--, p--) {
        jValue = parseInt(bars[j].innerHTML);
        jWidth = bars[j].style.width;
        g = j;
        bars[g].style.backgroundColor = pointerColor;

        if (gValue >= jValue) {
            await sleep(getSpeed(speed));
            bars[g].style.backgroundColor = sortedColor;
          break;
        }
        bars[j + 1].innerHTML = jValue;
        bars[j + 1].style.width = jWidth;
        await sleep(getSpeed(speed));
        bars[g].style.backgroundColor = sortedColor;
      }
      bars[i].style.backgroundColor = sortedColor;
      bars[p].innerHTML = gValue;
      bars[p].style.width = gWidth;
    }
    sortedRef.current = true;
    sortingInProgressRef.current = false;
    visualizerDataHandler(sortedRef.current);
  }, [pointerColor, sortedColor, speed, randomize, visualizerDataHandler, getSpeed]);

  const linearSort = useCallback(async () => {
    sortedRef.current = false;
    sortingInProgressRef.current = true;
    visualizerDataHandler(sortedRef.current);
    let bars = barRefs.current.filter(bar => bar !== null && bar !== undefined);
    if (bars.length === 0) {
      sortingInProgressRef.current = false;
      return;
    }
    let n = bars.length;
    let i, j, gValue, gWidth;
    i = 0;

    while (i <= n - 2) {
      j = i + 1;
      while (j <= n - 1) {
        bars[i].style.backgroundColor = pointerColor;
        bars[j].style.backgroundColor = pointerColor;

        if (parseInt(bars[j].innerHTML) < parseInt(bars[i].innerHTML)) {
          bars[i].style.backgroundColor = pointerColor;
          bars[j].style.backgroundColor = pointerColor;
            await sleep(getSpeed(speed));
            bars[i].style.backgroundColor = barColor;
          bars[j].style.backgroundColor = barColor;
          gValue = parseInt(bars[i].innerHTML);
          gWidth = bars[i].style.width;
          bars[i].innerHTML = parseInt(bars[j].innerHTML);
          bars[i].style.width = bars[j].style.width;
          bars[j].innerHTML = gValue;
          bars[j].style.width = gWidth;
        }
        await sleep(getSpeed(speed));
        bars[j].style.backgroundColor = barColor;
        bars[i].style.backgroundColor = barColor;
        j++;
      }
      bars[i].style.backgroundColor = sortedColor;
      i++;
    }
    bars[n - 1].style.backgroundColor = sortedColor;
    sortedRef.current = true;
    sortingInProgressRef.current = false;
    visualizerDataHandler(sortedRef.current);
  }, [barColor, pointerColor, sortedColor, speed, randomize, visualizerDataHandler, getSpeed]);

  const mergeSort = useCallback((arr, low, high, graphics) => {
    if (low >= high) return;
    var middle = Math.floor((low + high) / 2);
    mergeSort(arr, low, middle, graphics);
    mergeSort(arr, middle + 1, high, graphics);
    merge(arr, low, high, graphics);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const merge = useCallback((arr, low, high, graphics) => {
    let middle = Math.floor((low + high) / 2);
    let temp = new Array(high - low + 1);
    let i = low;
    let j = middle + 1;
    let r = 0;

    while (i <= middle && j <= high) {
      graphics.push(new Tuple(i, j, "add"));
      graphics.push(new Tuple(i, j, "remove"));
      if (arr[i] <= arr[j]) {
        temp[r] = arr[i];
        r++;
        i++;
      } else {
        temp[r] = arr[j];
        r++;
        j++;
      }
    }

    while (i <= middle) {
      graphics.push(new Tuple(i, i, "add"));
      graphics.push(new Tuple(i, i, "remove"));
      temp[r] = arr[i];
      r++;
      i++;
    }

    while (j <= high) {
      graphics.push(new Tuple(j, j, "add"));
      graphics.push(new Tuple(j, j, "remove"));
      temp[r] = arr[j];
      r++;
      j++;
    }

    i = low;
    for (let k = 0; k < temp.length; ) {
      graphics.push(new Tuple(i, temp[k], "swap"));
      arr[i] = temp[k];
      i++;
      k++;
    }
  }, []);

  const mergeSortUtil = useCallback(async () => {
    sortedRef.current = false;
    sortingInProgressRef.current = true;
    visualizerDataHandler(sortedRef.current);
    let graphics = [];
    let arrCopy = arr.slice();
    let low = 0;
    let high = arrCopy.length - 1;
    mergeSort(arrCopy, low, high, graphics);
    let bars = barRefs.current.filter(bar => bar !== null && bar !== undefined);
    if (bars.length === 0) {
      sortingInProgressRef.current = false;
      return;
    }

    for (let i = 0; i < graphics.length; i++) {
      if (graphics[i].operation === "add") {
        bars[graphics[i].first].style.backgroundColor = pointerColor;
        bars[graphics[i].second].style.backgroundColor = pointerColor;
      }
      if (graphics[i].operation === "remove") {
        bars[graphics[i].first].style.backgroundColor = barColor;
        bars[graphics[i].second].style.backgroundColor = barColor;
      }
      if (graphics[i].operation === "swap") {
        bars[graphics[i].first].innerHTML = graphics[i].second;
        bars[graphics[i].first].style.width = graphics[i].second + "px";
        bars[graphics[i].first].style.backgroundColor = sortedColor;
      }
      await sleep(getSpeed(speed));
    }
    sortedRef.current = true;
    sortingInProgressRef.current = false;
    visualizerDataHandler(sortedRef.current);
  }, [arr, barColor, pointerColor, sortedColor, speed, randomize, visualizerDataHandler, mergeSort, getSpeed]);

  const partition = useCallback((arr, low, high, graphics, sorted) => {
    let g;
    let pivot = arr[high];
    let i = low - 1;
    graphics.push(new Tuple(high, high, "add"));

    for (let j = low; j <= high - 1; j++) {
      graphics.push(new Tuple(j, j, "add"));
      if (arr[j] < pivot) {
        i++;
        g = arr[i];
        arr[i] = arr[j];
        arr[j] = g;
        graphics.push(new Tuple(i, j, "add"));
        graphics.push(new Tuple(i, j, "remove"));
        graphics.push(new Tuple(i, j, "swap"));
      }
      graphics.push(new Tuple(j, j, "remove"));
    }

    g = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = g;
    graphics.push(new Tuple(i + 1, high, "add"));
    graphics.push(new Tuple(i + 1, high, "remove"));
    graphics.push(new Tuple(i + 1, high, "swap"));
    graphics.push(new Tuple(high, high, "remove"));

    for (let k = 0; k < arr.length; k++) {
      if (arr[k] === sorted[k]) {
        graphics.push(new Tuple(k, k, "fix"));
      }
    }
    graphics.push(new Tuple(i + 1, i + 1, "fix"));
    return i + 1;
  }, []);

  const quickSort = useCallback((arr, low, high, graphics, sorted) => {
    if (low < high) {
      let pi = partition(arr, low, high, graphics, sorted);
      quickSort(arr, low, pi - 1, graphics, sorted);
      quickSort(arr, pi + 1, high, graphics, sorted);
    }
  }, [partition]);

  const quickSortUtil = useCallback(async () => {
    sortedRef.current = false;
    sortingInProgressRef.current = true;
    visualizerDataHandler(sortedRef.current);
    let arrCopy = arr.slice();
    let low = 0;
    let high = arrCopy.length - 1;
    let graphics = [];
    let gValue, gWidth;
    let sorted = arr.slice().sort(function (a, b) {
      return a - b;
    });
    quickSort(arrCopy, low, high, graphics, sorted);
    let bars = barRefs.current.filter(bar => bar !== null && bar !== undefined);
    if (bars.length === 0) {
      sortingInProgressRef.current = false;
      return;
    }

    for (let i = 0; i < graphics.length; i++) {
      if (graphics[i].operation === "add") {
        bars[graphics[i].first].style.backgroundColor = pointerColor;
        bars[graphics[i].second].style.backgroundColor = pointerColor;
        await sleep(getSpeed(speed) / 2);
      }
      if (graphics[i].operation === "fix") {
        bars[graphics[i].first].style.backgroundColor = sortedColor;
        bars[graphics[i].second].style.backgroundColor = sortedColor;
      }
      if (graphics[i].operation === "remove") {
        bars[graphics[i].first].style.backgroundColor = barColor;
        bars[graphics[i].first].style.backgroundColor = barColor;
      }
      if (graphics[i].operation === "swap") {
        await sleep(getSpeed(speed) / 2);
        gValue = bars[graphics[i].first].innerHTML;
        gWidth = bars[graphics[i].first].style.width;
        bars[graphics[i].first].innerHTML = bars[graphics[i].second].innerHTML;
        bars[graphics[i].first].style.width = bars[graphics[i].second].style.width;
        bars[graphics[i].second].innerHTML = gValue;
        bars[graphics[i].second].style.width = gWidth;
        await sleep(getSpeed(speed) / 2);
      }
    }
    sortedRef.current = true;
    sortingInProgressRef.current = false;
    visualizerDataHandler(sortedRef.current);
  }, [arr, barColor, pointerColor, sortedColor, speed, randomize, visualizerDataHandler, quickSort, getSpeed]);

  const selectionSort = useCallback(async () => {
    sortedRef.current = false;
    sortingInProgressRef.current = true;
    visualizerDataHandler(sortedRef.current);
    let bars = barRefs.current.filter(bar => bar !== null && bar !== undefined);
    if (bars.length === 0) {
      sortingInProgressRef.current = false;
      return;
    }
    let n = bars.length;
    let m, r, gValue, gWidth;

    for (let i = 0; i < n - 1; i++) {
      m = i;
      for (let j = i + 1; j < n; j++) {
        r = m;
        bars[r].style.backgroundColor = pointerColor;
        bars[j].style.backgroundColor = pointerColor;
        if (parseInt(bars[j].innerHTML) < parseInt(bars[m].innerHTML)) {
          m = j;
        }
        await sleep(getSpeed(speed));
        bars[r].style.backgroundColor = barColor;
        bars[j].style.backgroundColor = barColor;
      }
      bars[i].style.backgroundColor = sortedColor;
      gWidth = bars[i].style.width;
      gValue = parseInt(bars[i].innerHTML);
      bars[i].innerHTML = parseInt(bars[m].innerHTML);
      bars[i].style.width = bars[m].style.width;
      bars[m].innerHTML = gValue;
      bars[m].style.width = gWidth;
    }
    bars[n - 1].style.backgroundColor = sortedColor;
    sortedRef.current = true;
    sortingInProgressRef.current = false;
    visualizerDataHandler(sortedRef.current);
  }, [barColor, pointerColor, sortedColor, speed, randomize, visualizerDataHandler, getSpeed]);

  // Handle controller data updates
  useEffect(() => {
    if (!controllerData) return;

    if (controllerData["sort"] === true) {
      setSize(controllerData["size"]);
      setSpeed(controllerData["speed"]);
      setBarColor(getColor(controllerData["barColor"]));
      setPointerColor(getColor(controllerData["pointerColor"]));
      setSortedColor(getColor(controllerData["sortedColor"]));
      setRandomize(controllerData["randomize"]);

      // Trigger sorting based on algorithm - wait for refs to be ready
      setTimeout(() => {
        // Ensure refs are ready
        const validBars = barRefs.current.filter(bar => bar !== null && bar !== undefined);
        if (validBars.length !== arr.length) {
          console.warn('Not all refs ready yet, waiting...');
          setTimeout(() => {
            triggerSort(controllerData.sortingAlgorithm);
          }, 100);
          return;
        }
        triggerSort(controllerData.sortingAlgorithm);
      }, 50);

      function triggerSort(algorithm) {
        switch (algorithm) {
          case "Cocktail Sort":
            cocktailSort();
            break;
          case "Heap Sort":
            heapSort();
            break;
          case "Insertion Sort":
            insertionSort();
            break;
          case "Linear Sort":
            linearSort();
            break;
          case "Merge Sort":
            mergeSortUtil();
            break;
          case "Quick Sort":
            quickSortUtil();
            break;
          case "Selection Sort":
            selectionSort();
            break;
          default:
            bubbleSort();
            break;
        }
      }
    } else {
      // Stop any ongoing sorting when not in sort mode
      sortingInProgressRef.current = false;

      let temp = new Set();
      if (parseInt(size) !== parseInt(controllerData["size"])) {
        setSize(parseInt(controllerData["size"]));
        setSpeed(controllerData["speed"]);
        setBarColor(getColor(controllerData["barColor"]));
        setPointerColor(getColor(controllerData["pointerColor"]));
        setSortedColor(getColor(controllerData["sortedColor"]));
        setRandomize(controllerData["randomize"]);

        while (temp.size !== parseInt(controllerData["size"])) {
          temp.add(getRandomElement());
        }
        temp = Array.from(temp);
        setArr(temp);
      } else {
        if (controllerData["randomize"] === true) {
          // Stop any ongoing sorting
          sortingInProgressRef.current = false;

          setSize(parseInt(controllerData["size"]));
          setSpeed(controllerData["speed"]);
          setBarColor(getColor(controllerData["barColor"]));
          setPointerColor(getColor(controllerData["pointerColor"]));
          setSortedColor(getColor(controllerData["sortedColor"]));
          setRandomize(controllerData["randomize"]);

          while (temp.size !== parseInt(controllerData["size"])) {
            temp.add(getRandomElement());
          }
          temp = Array.from(temp);
          setArr(temp);

          // Reset bar colors
          setTimeout(() => {
            barRefs.current.forEach(bar => {
              if (bar) bar.style.backgroundColor = getColor(controllerData["barColor"]);
            });
          }, 0);
        } else {
          setSize(parseInt(controllerData["size"]));
          setBarColor(getColor(controllerData["barColor"]));
          setPointerColor(getColor(controllerData["pointerColor"]));
          setSortedColor(getColor(controllerData["sortedColor"]));
          setSpeed(controllerData["speed"]);
        }
      }
    }
  }, [controllerData]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div id="sortingVisualizer">
      <div id="barView">
        {arr.map((value, idx) => (
          <div
            className="array-bar"
            key={idx}
            ref={(el) => (barRefs.current[idx] = el)}
            style={{
              width: `${value + 10}px`,
              backgroundColor: `${barColor}`,
              height: `${getBarHeight()}px`,
              fontSize: `${getFontHeight()}px`,
            }}
          >
            {value}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SortingVisualizer;
