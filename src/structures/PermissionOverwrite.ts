import Permission from "./Permission.ts";

class PermissionOverwite extends Permission {
    public id: string
    public type: 'member' | 'role'
    constructor(data: any) {
        super(data.allow, data.deny);
        this.id = data.id;
        this.type = data.type;
    }
}
export default PermissionOverwite;
