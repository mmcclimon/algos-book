declare global {
  interface ArrayConstructor {
    fillTo: (n: number) => Array<number>;
  }

  interface Array<T> {
    shuffle: () => void;
    isSorted: () => boolean;
  }
}

// Fisher-Yates
Array.prototype.shuffle = function (): void {
  for (let i = this.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = this[i];
    this[i] = this[j];
    this[j] = tmp;
  }
};

Array.fillTo = function (n: number): Array<number> {
  return Array.from(Array(n).keys());
};

export {};