import { assert, suite, test } from './util';
import {
  SortingArray,
  selectionSort,
  insertionSort,
  SortFunction,
} from '../src/sorting';

const testWith = (sort: SortFunction): (() => void) => {
  return function (): void {
    [10, 25, 50, 100, 500, 1000].forEach((n) => {
      test(`for ${n} elements`, () => {
        const a = SortingArray.fillRandom(n);
        assert.isFalse(a.isSorted()); // just in case...

        sort(a);
        assert.isTrue(a.isSorted());
      });
    });
  };
};

suite('selection sort', testWith(selectionSort));

suite('insertion sort', testWith(insertionSort));
