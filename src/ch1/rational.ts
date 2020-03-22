type RatOrNum = Rational | number;

export class Rational {
  readonly numerator: number;
  readonly denominator: number;

  constructor(num: number, denom = 1) {
    if (denom === 0) {
      throw new Error('cannot divide by zero');
    }

    if (!Number.isInteger(num) || !Number.isInteger(denom)) {
      throw new Error('non-integer values passed to Rational constructor');
    }

    // we store them normalized
    const gcd = this.gcd(Math.abs(num), Math.abs(denom));

    if ((denom < 0 && num > 0) || (num < 0 && denom < 0)) {
      num *= -1;
      denom *= -1;
    }

    this.numerator = num / gcd;
    this.denominator = denom / gcd;
  }

  static from(thing: RatOrNum | string): Rational {
    if (thing instanceof Rational) {
      return thing;
    }

    if (typeof thing === 'number') {
      return new this(thing);
    }

    // crappy parser
    const [n, d] = thing.split('/');
    return new this(parseInt(n), parseInt(d));
  }

  reciprocal(): Rational {
    return new Rational(this.denominator, this.numerator);
  }

  private gcd(n: number, d: number): number {
    if (d === 0) return n;
    const rem = n % d;
    return this.gcd(d, rem);
  }

  toString(): string {
    const n = this.toNumber();

    if (Number.isInteger(n)) {
      return String(n);
    }

    return `${this.numerator}/${this.denominator}`;
  }

  toNumber(): number {
    return this.numerator / this.denominator;
  }

  // neat!
  [Symbol.toPrimitive](hint): number | string {
    if (hint === 'number') {
      return this.toNumber();
    }

    return this.toString();
  }

  equals(other: RatOrNum): boolean {
    const r = Rational.from(other);
    return this.numerator === r.numerator && this.denominator === r.denominator;
  }

  plus(other: RatOrNum): Rational {
    const r = Rational.from(other);

    // a/b + c/d = (ad + cb) / bd
    const ad = this.numerator * r.denominator;
    const cb = r.numerator * this.denominator;
    const bd = this.denominator * r.denominator;
    return new Rational(ad + cb, bd);
  }

  minus(other: RatOrNum): Rational {
    const r = Rational.from(other);
    return this.plus(r.times(-1));
  }

  times(other: RatOrNum): Rational {
    const r = Rational.from(other);
    return new Rational(
      this.numerator * r.numerator,
      this.denominator * r.denominator
    );
  }

  dividedBy(other: RatOrNum): Rational {
    const r = Rational.from(other);
    return this.times(r.reciprocal());
  }
}
