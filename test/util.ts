import * as readline from 'readline';
import * as fs from 'fs';
import { performance } from 'perf_hooks';

// to re-export
import { assert } from 'chai';
import { suite, test } from 'mocha';

// this is effectively just a wrapper around readline and fs
export class FileReader {
  private rl;
  private buffer: Array<string>;
  private closed = false;
  private ready: Promise<boolean>;

  constructor(filename: string) {
    this.buffer = [];

    this.rl = readline.createInterface({
      input: fs.createReadStream(filename),
    });
  }

  async *lines(f?: Function): AsyncGenerator {
    for await (const line of this.rl) {
      yield f ? f(line) : line;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async readAll(f?: Function): Promise<Array<any>> {
    const ret = [];
    for await (const elem of this.lines(f)) {
      ret.push(elem);
    }
    return ret;
  }

  // eslint-disable-next-line require-await
  async readAllInts(): Promise<Array<number>> {
    return this.readAll(parseInt);
  }
}

// used inside of mocha tests. Runs fn() in a performance block and returns a
// string that's the time it took, in ms
export function timeThis(fn: () => void): string {
  const start = performance.now();

  fn();

  const elapsed = performance.now() - start;
  return elapsed.toFixed(3);
}

export { assert, suite, test };
