/* eslint-disable no-invalid-this */

import { Whitelist } from '../../src/ch1/binary-search';
import { FileReader, assert, suite, test } from '../util';

suite('binary search', function() {
  test('tiny list', async function() {
    const wlFile = new FileReader('test/corpus/tinyW.txt');
    const wl = new Whitelist(await wlFile.readAllInts());

    const stdin = new FileReader('test/corpus/tinyT.txt');

    const got = [];

    for await (const key of stdin.lines(parseInt)) {
      if (!wl.contains(key)) got.push(key);
    }

    assert.sameMembers(got, [50, 99, 13]);
  });

  test('big list', async function() {
    if (!process.env.LONG_TESTS) {
      this.skip();
      return;
    }

    this.timeout(0);

    // Here, we test this slightly differently. We'll make a Set() of the
    // whitelist. As we go, we will assert that our binary search did the
    // correct thing.

    const wlInts = await new FileReader('test/corpus/largeW.txt').readAllInts();
    const wl = new Whitelist(wlInts);
    const wlSet = new Set(wlInts);

    const stdin = new FileReader('test/corpus/largeT.txt');

    const got = [];

    for await (const key of stdin.lines(parseInt)) {
      const wlContains = wl.contains(key);

      if (wlContains !== wlSet.has(key as number)) {
        assert.fail(`whitelist and Set() disagree! Key: ${key}`);
      }

      if (!wlContains) got.push(key);
    }

    assert.equal(got.length, 367966);
  });
});
