type CompareResult = -1 | 0 | 1;

interface ExplicitComparable {
  compareTo: (other: Comparable) => CompareResult;
}

export type Comparable = ExplicitComparable | number;

export function lessThan(v: Comparable, w: Comparable): boolean {
  if (typeof v === 'number') {
    return v < w;
  }

  return v.compareTo(w) < 0;
}

export function exchange(arr: Array<Comparable>, i: number, j: number): void {
  const tmp = arr[i];
  arr[i] = arr[j];
  arr[j] = tmp;
}

export function isSorted(arr: Array<Comparable>): boolean {
  for (let i = 1; i < arr.length; i++) {
    if (lessThan(arr[i], arr[i - 1])) return false;
  }

  return true;
}
