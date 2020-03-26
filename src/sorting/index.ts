type CompareResult = -1 | 0 | 1;

interface ExplicitComparable {
  compareTo: (other: Comparable) => CompareResult;
}

export type Comparable = ExplicitComparable | number;

export abstract class BaseSort {
  protected static less(v: Comparable, w: Comparable): boolean {
    if (typeof v === 'number') {
      return v < w;
    }

    return v.compareTo(w) < 0;
  }

  protected static exchange(
    arr: Array<Comparable>,
    i: number,
    j: number
  ): void {
    const tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  }

  static isSorted(arr: Array<Comparable>): boolean {
    for (let i = 1; i < arr.length; i++) {
      if (this.less(arr[i], arr[i - 1])) return false;
    }

    return true;
  }
}
