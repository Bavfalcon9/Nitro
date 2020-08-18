import Base from "../Base.ts";

class Role extends Base {
    public name: string;
    public permissions: any;
    public color: string;
    public hoist: boolean;
    public mentionable: boolean;

    constructor(data: any) {
        super(data.id);
        this.name = data.name;
        this.permissions = data.permissions;
        this.color = data.color;
        this.hoist = data.hoist;
        this.mentionable = data.mentionable;
    }
}
export default Role;
