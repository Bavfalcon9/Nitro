import { Buffer } from '../../deps.ts';
export function randomstring(n: number): string {
  let ret = '';
  let poss = 'abcdefghijklmnopqrstuvqxyzABCDEFGHIJKLMNOPQRSTUVQXYZ=_$%!';

  for (let i = 0; i < n; i++) {
    ret += poss[Math.floor(Math.random() * poss.length)];
  }
  return ret;
}
class ProtectedStore {
  #hashBase: string;
  #hashStore: Map<string, Uint8Array>;

  public constructor(hashBase: string = randomstring(10)) {
    this.#hashBase = hashBase;
    this.#hashStore = new Map();
  }

  /**
   * IT IS RESPONSIBLE FOR YOU, THE USER, TO REVERSE THESE
   * @param key 
   * @param value 
   */
  public set(key: string, value: any): Uint8Array {
    if (typeof value == "object") {
      value = JSON.stringify(value);
    }

    let valbuf = new TextEncoder().encode(value);
    let hbsBuf = new TextEncoder().encode(this.#hashBase);
    let retBuf = new Uint8Array(valbuf.length);

    for (let i = 0; i < valbuf.length; i++) {
      const byte = valbuf[i];
      for (let byteH of hbsBuf) {
        retBuf.set([byte + byteH], i);
      };
    }
    this.#hashStore.set(key, retBuf);
    return retBuf;
  }

  /**
   * Gets a hased value.
   * @param key 
   */
  public get(key: string): Uint8Array|null {
    return this.#hashStore.get(key) || null;
  }

  /**
   * Get a hashed value
   * @param key 
   */
  private getHashed(key: string): any|null {
    let valBuf = this.#hashStore.get(key) || null;
    if (valBuf === null) {
      return null;
    }
    let retBuf = new Uint8Array(valBuf.length);
    let hbsBuf = new TextEncoder().encode(this.#hashBase);
    for (let i = 0; i < valBuf.length; i++) {
      const byte = valBuf[i];
      for (let byteH of hbsBuf) {
        retBuf.set([ byte - byteH ], i);
      };
    }
    return new TextDecoder().decode(retBuf);
  }

  /**
   * Delete a hashed value
   * @param key 
   */
  public delete(key: string): boolean {
    return this.#hashStore.delete(key);
  }
}
export default ProtectedStore;
