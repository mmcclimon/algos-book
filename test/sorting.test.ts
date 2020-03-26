import './array-magic';
import { Selection } from '../src/sorting/selection';
import { assert, suite, test } from './util';

suite('selection sort', () => {
  [10, 25, 50, 100].forEach((n) => {
    test(`for ${n} elements`, () => {
      const a = Array.fillTo(n);
      a.shuffle();

      assert.isFalse(Selection.isSorted(a));

      Selection.sort(a);
      assert.isTrue(Selection.isSorted(a));
    });
  });
});
