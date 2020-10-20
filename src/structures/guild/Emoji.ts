import Base from "../Base.ts";

class Emoji extends Base {
    public roles: string[];
    public requireColons: boolean;
    public name: string;
    public managed: boolean;
    public available: boolean;
    public animated: boolean;

    constructor(data: any) {
        super(data.id);
        this.roles = data.roles;
        this.requireColons = data.require_colons;
        this.name = data.name;
        this.managed = data.managed;
        this.available = data.available;
        this.animated = data.animated;
    }
}
export default Emoji;
