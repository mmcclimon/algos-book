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

module.exports.Bag = Bag;
module.exports.Stack = Stack;
module.exports.Queue = Queue;
