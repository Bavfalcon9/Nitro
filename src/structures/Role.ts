import Base from './Base.ts';
import Guild from './Guild.ts';

export default class Role extends Base {
	public guild: Guild;
	public name: string;
	public permissions: any;
	public color: string;
	public hoist: boolean;
	public mentionable: boolean;

	constructor(data: any, guild: Guild) {
		super(data.id);
		this.guild = guild;
		this.name = data.name;
		this.permissions = data.permissions;
		this.color = data.color;
		this.hoist = data.hoist;
		this.mentionable = data.mentionable;
	}
}
