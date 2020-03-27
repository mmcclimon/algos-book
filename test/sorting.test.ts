import './array-magic';
import { selectionSort } from '../src/sorting';
import { assert, suite, test } from './util';

suite('selection sort', () => {
  [10, 25, 50, 100].forEach((n) => {
    test(`for ${n} elements`, () => {
      const a = Array.fillTo(n);
      a.shuffle();

      assert.isFalse(a.isSorted());

      selectionSort(a);
      assert.isTrue(a.isSorted());
    });
  });
});
