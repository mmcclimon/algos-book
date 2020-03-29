import { SortingArray, Comparable, pairIsOrdered } from './util';

// re-export
export { SortingArray };

export type SortFunction = (arr: SortingArray<Comparable>) => void;

export function selectionSort(arr: SortingArray<Comparable>): void {
  const n = arr.length;

  for (let i = 0; i < n; i++) {
    let min = i;

    for (let j = i + 1; j < n; j++) {
      if (pairIsOrdered(arr[j], arr[min])) {
        min = j;
      }
    }

    arr.exchange(i, min);
  }
}

export function insertionSort(
  arr: SortingArray<Comparable>,
  lowIndex = 0,
  highIndex = arr.length - 1
): void {
  for (let i = lowIndex; i <= highIndex; i++) {
    for (let j = i; j > lowIndex && pairIsOrdered(arr[j], arr[j - 1]); j--) {
      arr.exchange(j, j - 1);
    }
  }
}

export function shellSort(arr: SortingArray<Comparable>): void {
  const n = arr.length;

  const inc = [1];

  while (inc[0] < Math.floor(n / 3)) {
    inc.unshift(3 * inc[0] + 1);
  }

  for (const h of inc) {
    for (let i = h; i < n; i++) {
      for (let j = i; j >= h && pairIsOrdered(arr[j], arr[j - h]); j -= h) {
        arr.exchange(j, j - h);
      }
    }
  }
}

// merge arr[low..mid] with arr[mid+1..high]
// we pass aux here because .slice()ing the array every time is *super* slow.
const merge = function (
  arr: SortingArray<Comparable>,
  lowIndex: number,
  midIndex: number,
  highIndex: number,
  aux: Array<Comparable>
): void {
  // pointers into subarrays
  let leftPointer = lowIndex;
  let rightPointer = midIndex + 1;

  // copy to aux
  for (let k = 0; k <= highIndex; k++) {
    aux[k] = arr[k];
  }

  // fill the original
  for (let k = lowIndex; k <= highIndex; k++) {
    if (leftPointer > midIndex) {
      // left exhausted
      arr[k] = aux[rightPointer++];
    } else if (rightPointer > highIndex) {
      // right exhausted
      arr[k] = aux[leftPointer++];
    } else if (pairIsOrdered(aux[rightPointer], aux[leftPointer])) {
      // right < left; take right
      arr[k] = aux[rightPointer++];
    } else {
      // right >= left; take left
      arr[k] = aux[leftPointer++];
    }
  }
};

export function mergeSort(arr: SortingArray<Comparable>): void {
  const aux = new SortingArray<Comparable>(arr.length);

  const sort = function (a, lowIndex: number, highIndex: number): void {
    if (highIndex <= lowIndex) return;

    if (highIndex - lowIndex < 16) {
      insertionSort(a, lowIndex, highIndex);
      return;
    }

    const midIndex = Math.floor(lowIndex + (highIndex - lowIndex) / 2);
    sort(a, lowIndex, midIndex);
    sort(a, midIndex + 1, highIndex);
    merge(a, lowIndex, midIndex, highIndex, aux);
  };

  sort(arr, 0, arr.length - 1);
}

export function bottomUpMergeSort(arr: SortingArray<Comparable>): void {
  const aux = new SortingArray<Comparable>(arr.length);
  const n = arr.length;

  for (let len = 1; len < n; len *= 2) {
    for (let lowIndex = 0; lowIndex < n - len; lowIndex += len * 2) {
      merge(
        arr,
        lowIndex,
        lowIndex + len - 1,
        Math.min(lowIndex + len + len - 1, n - 1),
        aux
      );
    }
  }
}
