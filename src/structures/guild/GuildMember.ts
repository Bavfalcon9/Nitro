import Base from "../Base.ts";
import User from "../User.ts";
import Guild from "./Guild.ts";
import Role from "./Role.ts";

class GuildMember extends Base {
    public user: User;
    public owner: boolean;
    public roles: Role[];
    public premiumSince: number;
    public guild: Guild;
    public nick: string;
    public mute: boolean;
    public joinedAt: number | Date;
    public hoistedRole: any;
    public deaf: boolean 

    constructor(data: any, guild: Guild) {
        super(data.user.id);
        this.guild = guild;
        this.user = data.user;
        this.owner = data.owner
        this.roles = data.roles;
        this.premiumSince = data.premium_since
        this.nick = data.nick
        this.mute = data.mute;
        this.joinedAt = data.joined_at
        this.hoistedRole = data.hoisted_role;
        this.deaf = data.deaf
    }
}

export default GuildMember;
