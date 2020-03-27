type CompareResult = -1 | 0 | 1;

interface ExplicitComparable {
  compareTo: (other: Comparable) => CompareResult;
}

export type Comparable = ExplicitComparable | number;

export function pairIsOrdered(v: Comparable, w: Comparable): boolean {
  if (typeof v === 'number') return v < w;

  return v.compareTo(w) < 0;
}

export class SortingArray<T extends Comparable> extends Array<T> {
  static fillTo(n): SortingArray<number> {
    return SortingArray.from(Array(n).keys()) as SortingArray<number>;
  }

  exchange(i: number, j: number): void {
    [this[i], this[j]] = [this[j], this[i]];
  }

  shuffle(): void {
    for (let i = this.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      this.exchange(i, j);
    }
  }

  isSorted(): boolean {
    for (let i = 1; i < this.length; i++) {
      if (pairIsOrdered(this[i], this[i - 1])) return false;
    }

    return true;
  }
}
