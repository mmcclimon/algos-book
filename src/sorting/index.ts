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

export function insertionSort(arr: SortingArray<Comparable>): void {
  const n = arr.length;

  for (let i = 0; i < n; i++) {
    for (let j = i; j > 0 && pairIsOrdered(arr[j], arr[j - 1]); j--) {
      arr.exchange(j, j - 1);
    }
  }
}

export function shellSort(arr: SortingArray<Comparable>): void {
  const n = arr.length;

  let h = 1;
  while (h < Math.floor(n / 3)) {
    h = 3 * h + 1;
  }

  while (h >= 1) {
    for (let i = h; i < n; i++) {
      for (let j = i; j >= h && pairIsOrdered(arr[j], arr[j - h]); j -= h) {
        arr.exchange(j, j - h);
      }
    }

    h = Math.floor(h / 3);
  }
}
