const ds = require('../lib/DataStructures.js');

describe('Stack methods', () => {
  const Stack = ds.Stack;

  test('construction', () => {
    const s = new Stack();
    expect(s).toBeInstanceOf(ds.Stack);
    expect(s).toHaveProperty('top');
    expect(s.isEmpty()).toBe(true);
  });

  test('push/peek/pop', () => {
    const s = new Stack();
    s.push('foo');
    s.push('bar');
    expect(s.peek()).toBe('bar');

    const got = s.pop();
    expect(got).toBe('bar');
    expect(s.isEmpty()).toBe(false);

    s.pop();
    expect(s.isEmpty()).toBe(true);

    // empty
    expect(s.pop()).toBeNull();
  });

  test('iteration', () => {
    const s = new Stack();
    [1, 2, 3].forEach(n => s.push(n));
    expect(Array.from(s)).toEqual([3, 2, 1]);
  });
});

describe('Bag methods', () => {
  const Bag = ds.Bag;

  test('construction', () => {
    const b = new Bag();
    expect(b).toBeInstanceOf(Bag);
    expect(b).toHaveProperty('top');
    expect(b.isEmpty()).toBe(true);

    expect(b.push).not.toBeDefined();
    expect(b.pop).not.toBeDefined();
  });

  test('add and iterate', () => {
    const b = new Bag();
    [1, 2, 3].forEach(n => b.add(n));
    expect(Array.from(b)).toEqual(expect.arrayContaining([1, 2, 3]));
  });
});

describe('Queue methods', () => {
  const Queue = ds.Queue;

  test('construction', () => {
    const q = new Queue();
    expect(q).toBeInstanceOf(Queue);
    expect(q).toHaveProperty('first');
    expect(q).toHaveProperty('last');
    expect(q.isEmpty()).toBe(true);
  });

  test('enqueue/dequeue', () => {
    const q = new Queue();
    q.enqueue('foo');
    q.enqueue('bar');

    expect(q.first.item).toBe('foo');
    expect(q.last.item).toBe('bar');

    const got = q.dequeue();
    expect(got).toBe('foo');
    expect(q.isEmpty()).toBe(false);

    q.dequeue();
    expect(q.isEmpty()).toBe(true);

    // empty
    expect(q.dequeue()).toBeNull();
  });

  test('iteration', () => {
    const q = new Queue();
    [1, 2, 3].forEach(n => q.enqueue(n));
    expect(Array.from(q)).toEqual([1, 2, 3]);
  });
});
