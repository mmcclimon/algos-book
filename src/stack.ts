const Node = class {
  constructor (item) {
    this.item = item;
    this.next = null;
  }
};

module.exports.Stack = class {
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
