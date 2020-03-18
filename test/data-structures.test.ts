import { Stack, Bag, Queue, Deque } from '../src/data-structures';
import { assert } from 'chai';
import { suite, test } from 'mocha';

suite('Stack methods', () => {
  test('construction', () => {
    const s = new Stack<string>();
    assert.instanceOf(s, Stack, 'made a stack');
    assert.property(s, 'top', 'has a top');
    assert.isTrue(s.isEmpty(), 'starts empty');
  });

  test('push/peek/pop', () => {
    const s = new Stack();
    s.push('foo');
    s.push('bar');
    assert.equal(s.peek(), 'bar', 'peek gets top');

    const got = s.pop();
    assert.equal(got, 'bar');
    assert.isFalse(s.isEmpty(), 'popped, still have one');

    s.pop();
    assert.isTrue(s.isEmpty());

    // empty
    assert.isNull(s.pop());
  });

  test('iteration', () => {
    const s = new Stack<number>();
    [1, 2, 3].forEach(n => s.push(n));
    assert.deepEqual(Array.from(s), [3, 2, 1]);
  });
});

suite('Bag methods', () => {
  test('construction', () => {
    const b = new Bag<number>();
    assert.instanceOf(b, Bag, 'made a stack');
    assert.property(b, 'top', 'has a top');
    assert.isTrue(b.isEmpty(), 'starts empty');
  });

  test('add and iterate', () => {
    const b = new Bag<number>();
    [1, 2, 3].forEach(n => b.add(n));
    assert.sameMembers(Array.from(b), [1, 2, 3]);
  });
});

suite('Queue methods', () => {
  test('construction', () => {
    const q = new Queue();
    assert.instanceOf(q, Queue);
    assert.property(q, 'first');
    assert.property(q, 'last');
    assert.isTrue(q.isEmpty());
  });

  test('enqueue/dequeue', () => {
    const q = new Queue<string>();
    q.enqueue('foo');
    q.enqueue('bar');

    assert.strictEqual(q.first.item, 'foo');
    assert.strictEqual(q.last.item, 'bar');

    const got = q.dequeue();
    assert.strictEqual(got, 'foo', 'dequeue pulls off of front');
    assert.isFalse(q.isEmpty());

    q.dequeue();
    assert.isTrue(q.isEmpty());

    // empty
    assert.isNull(q.dequeue());
  });

  test('iteration', () => {
    const q = new Queue();
    [1, 2, 3].forEach(n => q.enqueue(n));
    assert.deepEqual(Array.from(q), [1, 2, 3]);
  });
});

suite('Deque methods', () => {
  test('construction', () => {
    const q = new Deque();
    assert.instanceOf(q, Deque);
    assert.property(q, 'first');
    assert.property(q, 'last');
    assert.isTrue(q.isEmpty());
  });

  test('push/pop', () => {
    const q = new Deque<string>();
    q.pushLeft('foo');
    q.pushRight('bar');
    q.pushLeft('baz');

    assert.strictEqual(q.first.item, 'baz');
    assert.strictEqual(q.last.item, 'bar');

    const got = q.popLeft();
    assert.strictEqual(got, 'baz');
    assert.isFalse(q.isEmpty());

    assert(q.popRight(), 'bar');

    q.popLeft();
    assert.isTrue(q.isEmpty());

    // empty
    assert.isNull(q.popLeft());
  });

  test('iteration', () => {
    const q = new Deque();
    [1, 2, 3].forEach(n => q.pushLeft(n));
    assert.deepEqual(Array.from(q), [3, 2, 1]);
  });
});
