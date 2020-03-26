const UF = class {
  constructor(n) {
    this.count = n;
    this.id = new Array(n);
    this.sz = new Array(n);

    for (let i = 0; i < n; i++) {
      this.id[i] = i;
      this.sz[i] = 1;
    }
  }

  union(p, q) {
    const i = this.find(p);
    const j = this.find(q);

    if (i === j) return;

    // always make smaller point to larger
    if (this.sz[i] < this.sz[j]) {
      this.id[i] = j;
      this.sz[j] += this.sz[i];
    } else {
      this.id[j] = i;
      this.sz[i] += this.sz[j];
    }
    this.count--;
  }

  find(p) {
    while (p !== this.id[p]) {
      p = this.id[p];
    }

    return p;
  }

  connected(p, q) {
    return this.find(p) === this.find(q);
  }
};

const sites = [
  [4, 3],
  [3, 8],
  [6, 5],
  [9, 4],
  [2, 1],
  [8, 9],
  [5, 0],
  [7, 2],
  [6, 1],
  [1, 0],
  [6, 7],
];

const uf = new UF(10);
for (const [p, q] of sites) {
  if (uf.connected(p, q)) {
    continue;
  }

  uf.union(p, q);
  console.log(`${p} ${q}`);
}

console.log(`${uf.count} components`);
