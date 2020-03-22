import * as readline from 'readline';
import * as fs from 'fs';

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
