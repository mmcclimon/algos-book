type Cell<T> = {
  item: T;
  next: Cell<T> | null;
};

type DoubleCell<T> = {
  item: T;
  next: DoubleCell<T> | null;
  prev: DoubleCell<T> | null;
};

const makeIterator = function <T>(first: Cell<T>): Iterator<T> {
  let cur = first;

  return {
    next: function (): IteratorResult<T> {
      if (cur === null) return { done: true, value: null };

      const ret = cur.item;
      cur = cur.next;
      return { value: ret };
    },
  };
};

export class Stack<T> {
  top: Cell<T>;
  count: number;

  constructor() {
    this.top = null;
    this.count = 0;
  }

  isEmpty(): boolean {
    return this.top === null;
  }

  push(item: T): void {
    const old = this.top;
    this.top = { item: item, next: null };
    this.top.next = old;
    this.count++;
  }

  peek(): T {
    return this.top.item;
  }

  pop(): T {
    if (this.isEmpty()) return null;

    const ret = this.top;
    this.top = ret.next;
    this.count--;
    return ret.item;
  }

  [Symbol.iterator](): Iterator<T> {
    return makeIterator.call(this, this.top);
  }
}

export class Queue<T> {
  first: Cell<T> | null;
  last: Cell<T> | null;
  count: number;

  constructor() {
    this.first = null;
    this.last = null;
    this.count = 0;
  }

  isEmpty(): boolean {
    return this.first === null;
  }

  enqueue(item: T): void {
    const old = this.last;
    this.last = { item: item, next: null };
    if (this.isEmpty()) {
      this.first = this.last;
    } else {
      old.next = this.last;
    }
    this.count++;
  }

  dequeue(): T {
    if (this.isEmpty()) return null;

    const item = this.first.item;
    this.first = this.first.next;
    this.count--;

    if (this.isEmpty()) this.last = null;

    return item;
  }

  [Symbol.iterator](): Iterator<T> {
    return makeIterator.call(this, this.first);
  }
}

export class Bag<T> {
  private stack;
  constructor() {
    this.stack = new Stack<T>();
  }

  get top(): Cell<T> {
    return this.stack.top;
  }

  add(item): void {
    this.stack.push(item);
  }

  isEmpty(): boolean {
    return this.stack.isEmpty();
  }

  [Symbol.iterator](): Iterator<T> {
    return this.stack[Symbol.iterator]();
  }
}

// doubly linked list
export class Deque<T> {
  first: DoubleCell<T> | null;
  last: DoubleCell<T> | null;
  count: number;

  constructor() {
    this.first = null;
    this.last = null;
    this.count = 0;
  }

  isEmpty(): boolean {
    return this.first === null;
  }

  pushLeft(item): void {
    const old = this.first;
    this.first = { item: item, next: old, prev: null };

    if (old) {
      old.prev = this.first;
    } else {
      this.last = this.first;
    }
    this.count++;
  }

  pushRight(item): void {
    const old = this.last;
    this.last = { item: item, next: null, prev: old };

    if (old) {
      old.next = this.last;
    } else {
      this.first = this.last;
    }
    this.count++;
  }

  popLeft(): T {
    if (this.isEmpty()) return null;

    const item = this.first.item;
    this.first = this.first.next;

    if (this.isEmpty()) {
      this.last = null;
    } else {
      this.first.prev = null;
    }

    return item;
  }

  popRight(): T {
    if (this.isEmpty()) return null;

    const item = this.last.item;
    this.last = this.last.prev;

    if (this.last) {
      this.last.next = null;
    } else {
      this.first = this.last;
    }

    return item;
  }

  [Symbol.iterator](): Iterator<T> {
    return makeIterator.call(this, this.first);
  }
}
