import type Base from "./Base.ts"

type AnyStructure = <T extends Base>() => T;

class StructureManager {
  private structures: Map<string, any>;

  public constructor() {
    this.structures = new Map();
  }

  public getStructure(name: string): AnyStructure|null {
    if (!this.structures.has(name)) return null;
    return this.structures.get(name) as AnyStructure;
  }

  /**
   * To Do: Possible structure list
   * @param name 
   */
  public setStructure(name: string, structure: any): void {
    this.structures.set(name, structure);
  }
}
export default StructureManager;