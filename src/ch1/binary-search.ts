export class BinarySearch {
  // returning -1 here seems not idiomatic, but it's what the book does
  static indexOf(a: Array<number>, key: number): number {
    let low = 0;
    let high = a.length - 1;
    while (low <= high) {
      const mid = Math.floor(low + (high - low) / 2);

      if (key < a[mid]) {
        high = mid - 1;
      } else if (key > a[mid]) {
        low = mid + 1;
      } else {
        return mid;
      }
    }

    return -1;
  }

  // hilariously bad for large haystacks
  static filter(haystack: Array<number>, wl: Array<number>): Array<number> {
    return haystack.filter(key => this.indexOf(wl, key) === -1);
  }
}

export class Whitelist {
  private wl: Array<number>;

  constructor(list: Array<number>) {
    list.sort((a, b) => a - b);
    this.wl = list;
  }

  contains(key): boolean {
    return BinarySearch.indexOf(this.wl, key) !== -1;
  }
}
