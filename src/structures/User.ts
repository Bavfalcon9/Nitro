import Base from "./Base.ts";

class User extends Base {
    private bot: boolean;
    private username: string;
    private discriminator: string;
    private avatar: string;

    constructor(data: any) {
        super(data.id);
        this.bot = data.bot;
        this.username = data.username;
        this.discriminator = data.username;
        this.avatar = data.username;
    }

    public get tag(): string {
        return this.username + '#' + this.discriminator;
    }
    
    // to do, more functions
}

export default User;