import { BaseSort, Comparable } from '.';

export class Selection extends BaseSort {
  // sorts arr in place
  static sort(arr: Array<Comparable>): void {
    const n = arr.length;

    for (let i = 0; i < n; i++) {
      let min = i;

      for (let j = i + 1; j < n; j++) {
        if (this.less(arr[j], arr[min])) {
          min = j;
        }
      }

      this.exchange(arr, i, min);
    }
  }
}
