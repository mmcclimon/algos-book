import { assert, suite, test, timeThis } from './util';
import { SortingArray, SortFunction } from '../src/sorting';
import * as sorts from '../src/sorting';

const testWith = (sort: SortFunction): (() => void) => {
  /* eslint-disable no-invalid-this */
  return function (): void {
    [10, 25, 50, 100, 1000, 100_000].forEach((n) => {
      test(`for ${n} elements`, function () {
        this.timeout(Math.max(n, 2000));

        const a = SortingArray.fillRandom(n);
        assert.isFalse(a.isSorted()); // just in case...

        const elapsed = timeThis(() => sort(a));
        assert.isTrue(a.isSorted());

        this.test.title += ` (${elapsed} ms)`;
      });
    });
  };
};

suite('selection sort', testWith(sorts.selectionSort));

suite('insertion sort', testWith(sorts.insertionSort));

suite('shell sort', testWith(sorts.shellSort));

suite('merge sort', testWith(sorts.mergeSort));

suite('bottom-up merge sort', testWith(sorts.bottomUpMergeSort));
