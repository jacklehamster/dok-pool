/**
  Dok-gamelib engine

  Description: Game engine for producing web games easily using JavaScript and WebGL
  Author: jacklehamster
  Sourcode: https://github.com/jacklehamster/dok-gamelib
  Year: 2020
 */

/**
 *	  class Pool
 */

class Pool<T> {
  readonly pool: T[] = [];
  readonly recycler: T[] = [];
  index: number = 0;

  constructor(private createCall: () => T, private initCall: (element: T) => void = () => { }) {
  }

  recycle(element: T, init?: boolean) {
    if (init) {
      this.initCall(element);
    }
    this.recycler.push(element);
  }

  get(init?: boolean): T {
    const recycled = this.recycler.pop();
    if (recycled) {
      if (init) {
        this.initCall(recycled);
      }
      return recycled;
    }

    if (this.index >= this.pool.length) {
      this.pool.push(this.createCall());
    }
    const value = this.pool[this.index];
    this.index++;
    if (init) {
      this.initCall(value);
    }
    return value;
  }

  reset() {
    this.index = 0;
    this.recycler.length = 0;
  }

  destory() {
    this.pool.length = 0;
    this.recycler.length = 0;
  }
}

export default {
  Pool,
};
