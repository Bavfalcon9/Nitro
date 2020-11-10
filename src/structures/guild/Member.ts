import Collection from '../../util/Collection.ts';
import Base from '../Base.ts';
import Guild from './Guild.ts';
import Role from './Role.ts';
import User from '../User.ts';
import Permission from '../permissions/Permission.ts';
import Permissions from '../permissions/Permissions.ts';

export default class Member extends Base {
	public user: User;
	public owner: boolean;
	public roles: string[];
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
		this.owner = this.guild.ownerID === data.user.id;
		this.roles = data.roles;
		this.premiumSince = data.premium_since;
		this.nick = data.nick;
		this.mute = data.mute;
		this.joinedAt = data.joined_at;
		this.hoistedRole = data.hoisted_role;
		this.deaf = data.deaf;
	}

	get permissions() {
		if (this.id === this.guild.ownerID) {
			return new Permission(Permissions.all);
		} else {
			let permissions =
				this.guild.roles.find((r: Role) => r.id === this.guild.id)
					?.permissions.allow || 0;
			for (let role of this.roles) {
				let gRole = this.guild.roles.find((r: Role) => r.id === role);
				if (!gRole) {
					continue;
				}

				const { allow: perm } = gRole.permissions;
				if (perm & Permissions.administrator) {
					permissions = Permissions.all;
					break;
				} else {
					permissions |= perm;
				}
			}
			return new Permission(permissions);
		}
	}

	/**
	 * Method to kick the Member from the guild
	 */
	async kick(): Promise<void> {
		return await this.guild.kickMember(this.id);
	}

	/**
	 * Method to ban the Member from the guild
	 * @param o Ban options
	 */
	async ban(o?: {
		deleteMessageDays?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
		reason?: string;
	}): Promise<void> {
		return await this.guild.banMember(this.id, o);
	}

	/**
	 * Method used to add a role to the Member in the guild
	 * @param roleID ID of the role
	 */
	async addRole(roleID: string): Promise<void> {
		return await this.guild.addMemberRole(this.id, roleID);
	}

	/**
	 * Method used to remove a role from the Member in the guild
	 * @param roleID ID of the role
	 */
	async removeRole(roleID: string): Promise<void> {
		return await this.guild.removeMemberRole(this.id, roleID);
	}
}
