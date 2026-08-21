import type { NextFunction, Request, Response } from "express";

class Semaphore {
  private active = 0;
  private readonly waiters: Array<() => void> = [];

  constructor(private readonly capacity: number) {}

  acquire(): Promise<() => void> {
    return new Promise(resolve => {
      const grant = () => {
        this.active += 1;
        let released = false;
        resolve(() => {
          if (released) return;
          released = true;
          this.active -= 1;
          const next = this.waiters.shift();
          if (next) next();
        });
      };

      if (this.active < this.capacity) {
        grant();
      } else {
        this.waiters.push(grant);
      }
    });
  }
}

export function limitConcurrency(capacity: number) {
  const semaphore = new Semaphore(capacity);

  return async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    const release = await semaphore.acquire();
    let released = false;
    const releaseOnce = () => {
      if (released) return;
      released = true;
      release();
    };

    res.once("finish", releaseOnce);
    res.once("close", releaseOnce);
    next();
  };
}
