import * as util from './util';

type Comparable = util.Comparable;

export type SortFunction = (arr: Array<Comparable>) => void;

export function selectionSort(arr: Array<Comparable>): void {
  const n = arr.length;

  for (let i = 0; i < n; i++) {
    let min = i;

    for (let j = i + 1; j < n; j++) {
      if (util.lessThan(arr[j], arr[min])) {
        min = j;
      }
    }

    util.exchange(arr, i, min);
  }
}

export function insertionSort(arr: Array<Comparable>): void {
  const n = arr.length;

  for (let i = 0; i < n; i++) {
    for (let j = i; j > 0 && util.lessThan(arr[j], arr[j - 1]); j--) {
      util.exchange(arr, j, j - 1);
    }
  }
}
