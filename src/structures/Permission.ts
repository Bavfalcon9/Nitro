import Base from "./Base.ts";
import { Permissions } from "./Permissions.ts";

class Permission extends Base {
  public allow: number;
  public deny: number;
  public _json: object = {};
  constructor(allow: number, deny: number = 0) {
    super("");
    this.allow = allow;
    this.deny = deny;
  }
  get json() {
    if (!this._json) {
      this._json = {} as any;
      for (const perm of Object.keys(Permissions)) {
        if (!perm.startsWith("all")) {
          //@ts-ignore
          if (this.allow & Permissions[perm]) {
            //@ts-ignore
            this._json[perm] = true;
            //@ts-ignore
          } else if (this.deny & Permissions[perm]) {
            //@ts-ignore
            this._json[perm] = false;
          }
        }
      }
    }
    return this._json;
  }

  has(permission: string) {
    //@ts-ignore
    return !!(this.allow & Permissions[permission]);
  }

  toJSON(props = []) {
  }
}
export default Permission;
