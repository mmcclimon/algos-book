const makeIterator = function (first) {
  let cur = first;

  return {
    next: function() {
      if (cur === null) return { done: true };

      const ret = cur.item;
      cur = cur.next;
      return { value: ret };
    }
  };
}

const Stack = class {
  constructor () {
    this.top = null;
    this.count = 0;
  }

  isEmpty () {
    return this.top === null;
  }

  push (item) {
    const old = this.top;
    this.top = { item: item, next: null };
    this.top.next = old;
    this.count++;
  }

  pop () {
    if (this.isEmpty()) return null;

    const item = this.top.item;
    this.top = this.top.next;
    this.count--;
    return item;
  }

  peek () {
    return this.top.item;
  }

  [Symbol.iterator]() {
    return makeIterator.call(this, this.top);
  }
};

const Queue = class {
  constructor () {
    this.first = null;
    this.last = null;
    this.count = 0;
  }

  isEmpty () {
    return this.first === null;
  }

  enqueue (item) {
    const old = this.last;
    this.last = { item: item, next: null };
    if (this.isEmpty()) {
      this.first = this.last;
    } else {
      old.next = this.last;
    }
    this.count++;
  }

  dequeue () {
    if (this.isEmpty()) return null;

    const item = this.first.item;
    this.first = this.first.next;
    this.count--;

    if (this.isEmpty()) this.last = null;

    return item;
  }

  [Symbol.iterator]() {
    return makeIterator.call(this, this.first);
  }
};

const Bag = class extends Stack {
  constructor () {
    super();
  }

  // hack: remove some superclass methods
  get push () { return undefined };
  get pop  () { return undefined };

  add (item) {
    super.push(item)
  }
};

// doubly linked list
const Deque = class {
  constructor () {
    this.first = null;
    this.last = null;
    this.count = 0;
  }

  isEmpty() {
    return this.first === null;
  }

  pushLeft (item) {
    const old = this.first;
    this.first = { item: item, next: old, prev: null };

    if (old) {
      old.prev = this.first;
    } else {
      this.last = this.first
    }
    this.count++;
  }

  pushRight (item) {
    const old = this.last;
    this.last = { item: item, next: null, prev: old };

    if (old) {
      old.next = this.last;
    } else {
      this.first = this.last;
    }
    this.count++;
  }

  popLeft () {
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

  popRight() {
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

  [Symbol.iterator]() {
    return makeIterator.call(this, this.first);
  }
};

module.exports.Bag = Bag;
module.exports.Stack = Stack;
module.exports.Queue = Queue;
module.exports.Deque = Deque;
