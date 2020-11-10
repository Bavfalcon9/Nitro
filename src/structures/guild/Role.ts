import Base from '../Base.ts';
import Permission from '../permissions/Permission.ts';
import Guild from './Guild.ts';

export default class Role extends Base {
	public guild: Guild;
	public name: string;
	public permissions: Permission;
	public position: number;
	public color: string;
	public hoist: boolean;
	public mentionable: boolean;

	constructor(data: any, guild: Guild) {
		super(data.id);
		this.guild = guild;
		this.name = data.name;
		this.permissions = new Permission(data.permissions);
		this.position = data.position;
		this.color = data.color;
		this.hoist = data.hoist;
		this.mentionable = data.mentionable;
	}

	/**
	 * Method used to delete the Role from the guild
	 */
	public async delete(): Promise<void> {
		return await this.guild.deleteRole(this.id);
	}

	/**
	 * Method used to edit the Role in the guild
	 * @param o Role edit options
	 */
	public async edit(o: {
		name: string;
		permissions?: number;
		color: number;
		hoist: boolean;
		mentionable: boolean;
	}): Promise<Role> {
		return await this.guild.editRole(this.id, o);
	}
}
