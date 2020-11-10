import Collection from '../util/Collection.ts';
import Base from './Base.ts';
import Guild from './Guild.ts';
import Role from './Role.ts';
import User from './User.ts';

export default class Member extends Base {
	public user: User;
	public owner: boolean;
	public roles: Collection<string, Role>;
	public premiumSince: number;
	public guild: Guild;
	public nick: string;
	public mute: boolean;
	public joinedAt: number | Date;
	public hoistedRole: any;
	public deaf: boolean;

	constructor(data: any, guild: Guild) {
		super(data.user.id);
		this.guild = guild;
		this.user = data.user;
		this.owner = data.owner;
		this.roles = data.roles;
		this.premiumSince = data.premium_since;
		this.nick = data.nick;
		this.mute = data.mute;
		this.joinedAt = data.joined_at;
		this.hoistedRole = data.hoisted_role;
		this.deaf = data.deaf;
	}
}
