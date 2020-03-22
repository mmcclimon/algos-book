import { Rational } from '../../src/ch1/rational';
import { assert, suite, test } from '../util';

suite('Rational', function() {
  test('construction', function() {
    const r = new Rational(2, 3);
    assert.instanceOf(r, Rational);
    assert.strictEqual(r.numerator, 2);
    assert.strictEqual(r.denominator, 3);

    const m = new Rational(6, 9);
    assert.strictEqual(m.numerator, 2);
    assert.strictEqual(m.denominator, 3);

    assert.strictEqual(Number(r), 2 / 3);
    assert.strictEqual(Number(m), 6 / 9);
    assert.strictEqual(String(r), '2/3');
    assert.strictEqual(String(m), '2/3');

    // negatives
    const n1 = new Rational(-1, 3);
    assert.strictEqual(n1.numerator, -1, 'numerator is negative');
    assert.strictEqual(n1.denominator, 3, 'denominator is positive');

    const n2 = new Rational(1, -3);
    assert.strictEqual(n2.numerator, -1, 'numerator is negative');
    assert.strictEqual(n2.denominator, 3, 'denominator is positive');

    const n3 = new Rational(-1, -3);
    assert.strictEqual(n3.numerator, 1, 'numerator is positive');
    assert.strictEqual(n3.denominator, 3, 'denominator is positive');

    // integer
    assert.strictEqual(String(new Rational(4, 2)), '2');

    // bad values
    assert.throws(() => new Rational(5, 0), 'cannot divide by zero');
    assert.throws(() => new Rational(0.1, 1), /non-integer values/);
    assert.throws(() => new Rational(1, 0.1), /non-integer values/);
  });

  test('equality', function() {
    const a = new Rational(2, 3);
    const b = new Rational(2, 3);
    const c = new Rational(4, 6);
    const d = new Rational(9, 2);
    assert.isTrue(a.equals(b));
    assert.isTrue(b.equals(a));

    assert.isTrue(a.equals(c));
    assert.isTrue(c.equals(a));

    assert.isFalse(a.equals(d));
    assert.isFalse(d.equals(a));

    const two = new Rational(4, 2);
    assert.isTrue(two.equals(2));
    assert.strictEqual(String(two), '2');
  });

  test('addition', function() {
    const a = new Rational(1, 10);
    const b = new Rational(2, 10);

    // string comparison is silly, but works
    assert.strictEqual(a.plus(b).toString(), '3/10');
    assert.strictEqual(b.plus(a).toString(), '3/10');

    const c = new Rational(1, 3);
    const d = new Rational(2, 3);
    assert.strictEqual(c.plus(d).toString(), '1');
    assert.strictEqual(c.plus(d).toNumber(), 1);

    assert.strictEqual(c.plus(1).toString(), '4/3');
    assert.strictEqual(c.plus(2).toString(), '7/3');

    // with rationals, we can actually express not-stupid floats
    assert.strictEqual(a.plus(b).toNumber(), 0.3);
    assert.notEqual(a.plus(b).toNumber(), 0.1 + 0.2);
  });

  test('multiplication', function() {
    const a = new Rational(2, 10);
    const b = new Rational(3, 10);

    assert.strictEqual(a.times(b).toString(), '3/50');
    assert.strictEqual(b.times(a).toString(), '3/50');

    assert.strictEqual(b.times(1).toString(), '3/10');
    assert.strictEqual(b.times(2).toString(), '3/5');

    assert.strictEqual(b.times(-1).toString(), '-3/10');
    assert.strictEqual(b.times(-2).toString(), '-3/5');
  });

  test('subtraction', function() {
    const a = new Rational(1, 10);
    const b = new Rational(2, 10);

    assert.strictEqual(b.minus(a).toString(), '1/10');
    assert.strictEqual(a.minus(b).toString(), '-1/10');

    assert.strictEqual(a.minus(1).toString(), '-9/10');
    assert.strictEqual(a.minus(-1).toString(), '11/10');

    const c = new Rational(2, 3);
    const d = new Rational(1, 4);

    assert.strictEqual(c.minus(d).toString(), '5/12');
    assert.strictEqual(d.minus(c).toString(), '-5/12');
  });

  test('division', function() {
    const a = new Rational(1, 2);
    const b = new Rational(3, 4);

    assert.strictEqual(a.dividedBy(b).toString(), '2/3');
    assert.strictEqual(b.dividedBy(a).toString(), '3/2');
  });
});
