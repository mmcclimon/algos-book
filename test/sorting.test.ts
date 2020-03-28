import { assert, suite, test, timeThis } from './util';
import {
  SortingArray,
  selectionSort,
  insertionSort,
  SortFunction,
} from '../src/sorting';

const testWith = (sort: SortFunction): (() => void) => {
  /* eslint-disable no-invalid-this */
  return function (): void {
    [10, 25, 50, 100, 1000, 50000].forEach((n) => {
      test(`for ${n} elements`, function () {
        this.timeout(n);

        const a = SortingArray.fillRandom(n);
        assert.isFalse(a.isSorted()); // just in case...

        const elapsed = timeThis(() => sort(a));
        assert.isTrue(a.isSorted());

        this.test.title += ` (${elapsed} ms)`;
      });
    });
  };
};

suite('selection sort', testWith(selectionSort));

suite('insertion sort', testWith(insertionSort));
