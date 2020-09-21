import type Client from "../Client.ts";
import Base from "../structures/Base.ts";

class BaseStore {
  protected client: Client;
  protected maxSize: number;
  protected cache: any;
  protected structure: any;

  public constructor(
    client: Client,
    maxSize: number = 0,
    structure: any = Base,
  ) {
    this.client = client;
    this.maxSize = maxSize;
    this.structure = structure;
    this.cache = new Map();
  }

  public set(data: any): boolean {
    if (this.cache.size >= this.maxSize) {
      return false;
    }
    let resolved = this.forceResolve(data);

    if (!resolved) {
      return false;
    } else {
      this.cache.set(resolved.id, resolved);
      return true;
    }
  }

  public has(idInstance: any | string): boolean {
    let id: string = this.resolveId(idInstance) || "_";
    return this.cache.has(id);
  }

  public resolve(idInstance: any | string) {
    if (idInstance instanceof this.structure) return idInstance;
    if (typeof idInstance === "string") {
      return this.cache.get(idInstance) || null;
    }
    return null;
  }

  protected forceResolve(idInstance: any | string) {
    if (idInstance instanceof this.structure) return idInstance;
    if (typeof idInstance === "string") {
      return this.cache.get(idInstance) || null;
    }
    return new this.structure(idInstance);
  }

  public resolveId(idInstance: any | string): string | null {
    if (idInstance instanceof this.structure) return idInstance.id;
    if (typeof idInstance === "string") {
      return this.cache.get(idInstance).id || null;
    }
    return null;
  }

  public getAll(): Map<string, Base> {
    return this.cache;
  }
}
export default BaseStore;
