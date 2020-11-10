import Endpoints from '../../constants/Endpoints.ts';
import REST from '../../rest/REST.ts';
import Collection from '../../util/Collection.ts';
import Base from '../Base.ts';
import CategoryChannel from '../channels/CategoryChannel.ts';
import GuildChannel from '../channels/GuildChannel.ts';
import TextChannel from '../channels/TextChannel.ts';
import VoiceChannel from '../channels/VoiceChannel.ts';
import Emoji from './Emoji.ts';
import Member from './Member.ts';
import ChannelOptions from '../options/ChannelOptions.ts';
import RoleOptions from '../options/RoleOptions.ts';
import Role from './Role.ts';

export default class Guild extends Base {
	public name: string;
	public icon?: string;
	public description?: string;
	public splash?: string;
	public ownerID: string;
	public permissions: any;
	public region: string;
	public afkChannel: GuildChannel;
	public afkTimeout: number;
	public widgetEnabled?: boolean;
	public widgetId?: string;
	public verificationLevel: number;
	public defaultNotifications: number;
	public explicitContent: number;
	public roles: Collection<string, Role>;
	public emojis: Collection<string, Emoji>;
	public features: any; //GuildFeature[];
	public mfaLevel: number;
	public applicationId?: string;
	public systemChannelId?: string;
	public systemChannelFlags: number;
	public rulesChannelId: string; // for large guilds
	public joinedAt: number; // date
	public large: boolean;
	public unavailable: boolean;
	public memberCount?: number;
	public voiceStates?: any;
	public members: Collection<string, Member>;
	public channels: Collection<string, GuildChannel>;
	public maxPresences?: number;
	public maxMembers?: number;
	public vanityURL?: string;
	public banner?: string;
	public premiumTier: number;
	public subscriptionCount: number;
	public preferredLocale: string;

	constructor(data: any) {
		super(data.id);
		this.name = data.name;
		this.icon = data.icon;
		this.description = data.description;
		this.splash = data.splash;
		this.ownerID = data.owner_id;
		this.permissions = data.permissions;
		this.region = data.region;
		this.afkChannel = data.afk_channel_id;
		this.afkTimeout = data.afk_timeout;
		this.widgetEnabled = data.widget_enabled;
		this.widgetId = data.widget_channel_id;
		this.verificationLevel = data.verification_level;
		this.defaultNotifications = data.default_message_notifications;
		this.explicitContent = data.explicit_content_filter;
		this.channels = new Collection(GuildChannel);
		if (data.channels) {
			for (let channelData of data.channels) {
				let channel: GuildChannel;
				switch (channelData.type) {
					case 0: {
						channel = new TextChannel(channelData, this);
						break;
					}
					case 2: {
						channel = new VoiceChannel(channelData, this);
						break;
					}
					case 4: {
						channel = new CategoryChannel(channelData, this);
						break;
					}
					default: {
						channel = new GuildChannel(channelData, this);
						break;
					}
				}
				this.channels.add(channel);
			}
		}
		this.members = new Collection(Member);
		if (data.members) {
			for (let memberData of data.members) {
				const member = new Member(memberData, this);
				this.members.add(member);
			}
		}
		this.roles = new Collection(Role);
		if (data.roles) {
			for (let roleData of data.roles) {
				const role = new Role(roleData, this);
				this.roles.add(role);
			}
		}
		this.emojis = new Collection(Emoji);
		if (data.emojis) {
			for (let emojiData of data.emojis) {
				const emoji = new Emoji(emojiData);
				this.emojis.add(emoji);
			}
		}
		this.features = data.features;
		this.mfaLevel = data.mfa_level;
		this.applicationId = data.application_id;
		this.systemChannelId = data.system_channel_id;
		this.systemChannelFlags = data.system_channel_flags;
		this.rulesChannelId = data.rules_channel_id;
		this.joinedAt = data.joined_at;
		this.large = data.large || false;
		this.unavailable = data.unavailable || false;
		this.memberCount = data.member_count || -1;
		this.voiceStates = data.voiceStates || [];

		this.preferredLocale = data.preferred_locale;
		this.premiumTier = data.premium_tier;
		this.subscriptionCount = data.premium_subscription_count || 0;
	}

	get highestRole(): Role {
		let roles = this.roles.toArray();
		return roles.sort((a, b) => a.position - b.position)[roles.length - 1];
	}

	/**
	 * Get all the TextChannels of a guild
	 */
	get textChannels(): TextChannel[] {
		return <TextChannel[]>(
			this.channels.filter((ch: GuildChannel) => ch.type === 0)
		);
	}

	/**
	 * Get all the VoiceChannels of a guild
	 */
	get voiceChannels(): VoiceChannel[] {
		return <VoiceChannel[]>(
			this.channels.filter((ch: GuildChannel) => ch.type === 2)
		);
	}

	/**
	 * Get all the CategoryChannels of a guild
	 */

	get categoryChannels(): CategoryChannel[] {
		return <CategoryChannel[]>(
			this.channels.filter((ch: GuildChannel) => ch.type === 4)
		);
	}

	/**
	 * Method used to create a new GuildChannel in guild
	 * @param o Channel create options
	 */
	async createChannel(o: ChannelOptions): Promise<GuildChannel> {
		return new GuildChannel(
			await REST.request('POST', Endpoints.GUILD_CHANNELS(this.id), {
				name: o.name,
				type: o.type,
				topic: o.topic,
				bitrate: o.bitrate,
				user_limit: o.userLimit,
				rate_limit_per_user: o.rateLimitPerUser,
				position: o.position,
				permission_overwrites: o.permissionOverwrites,
				parent_id: o.parentID,
				nsfw: o.nsfw,
			}),
			this
		);
	}

	/**
	 * Method used to edit an existing GuildChannel in the guild
	 * @param id ID of the GuildChannel
	 * @param o Channel edit options
	 */
	async editChannel(id: string, o: ChannelOptions): Promise<GuildChannel> {
		return new GuildChannel(
			await REST.request('PATCH', Endpoints.CHANNEL(id), {
				name: o.name,
				type: o.type,
				topic: o.topic,
				bitrate: o.bitrate,
				user_limit: o.userLimit,
				rate_limit_per_user: o.rateLimitPerUser,
				position: o.position,
				permission_overwrites: o.permissionOverwrites,
				parent_id: o.parentID,
				nsfw: o.nsfw,
			}),
			this
		);
	}

	/**
	 * Method to delete an existing GuildChannel in the guild
	 * @param id ID of the channel
	 */
	async deleteChannel(id: string): Promise<GuildChannel> {
		return new GuildChannel(
			await REST.request('DELETE', Endpoints.CHANNEL(id)),
			this
		);
	}

	/**
	 * Method to create a new Role in the server
	 * @param o Role create options
	 */
	async createRole(o: RoleOptions): Promise<Role> {
		return new Role(
			await REST.request('POST', Endpoints.GUILD_ROLES(this.id), o),
			this
		);
	}

	/**
	 * Method to edit an existing Role in the guild
	 * @param id ID of the role
	 * @param o Role edit options
	 */
	async editRole(id: string, o: RoleOptions): Promise<Role> {
		return new Role(
			await REST.request('PATCH', Endpoints.GUILD_ROLE(this.id, id), o),
			this
		);
	}

	/**
	 * Method to delete an existing Role in the guild
	 * @param id ID of the role
	 */
	async deleteRole(id: string): Promise<void> {
		await REST.request('DELETE', Endpoints.GUILD_ROLE(this.id, id));
	}

	/**
	 * Method to mutate the nickname of a member of the guild
	 * @param id ID of the member
	 * @param nick New nick
	 */
	async editMemberNickname(id: string, nick: string): Promise<void> {
		return await REST.request(
			'PATCH',
			Endpoints.GUILD_MEMBER(this.id, id),
			{ nick }
		);
	}

	/**
	 * Method to give a member a role in guild
	 * @param memberID ID of the member
	 * @param roleID ID of the role
	 */
	async addMemberRole(memberID: string, roleID: string): Promise<void> {
		return await REST.request(
			'PUT',
			Endpoints.GUILD_MEMBER_ROLE(this.id, memberID, roleID)
		);
	}

	/**
	 * Method to remove a role from a member in guild
	 * @param memberID ID of the member
	 * @param roleID ID of the role
	 */

	async removeMemberRole(memberID: string, roleID: string): Promise<void> {
		return await REST.request(
			'DELETE',
			Endpoints.GUILD_MEMBER_ROLE(this.id, memberID, roleID)
		);
	}

	/**
	 * Method used to kick a member from the guild
	 * @param id ID of the member
	 */
	async kickMember(id: string): Promise<void> {
		return await REST.request(
			'DELETE',
			Endpoints.GUILD_MEMBER(this.id, id)
		);
	}

	/**
	 * Method used to ban a member from the guild
	 * @param id ID of the member
	 * @param o Ban options
	 */
	async banMember(
		id: string,
		o?: {
			deleteMessageDays?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
			reason?: string;
		}
	): Promise<void> {
		return await REST.request('PUT', Endpoints.GUILD_BAN(this.id, id), {
			delete_message_days: o?.deleteMessageDays,
			reason: o?.reason,
		});
	}

	/**
	 * Method used to unban a member from the guild
	 * @param id ID of the member
	 */
	async unbanMember(id: string): Promise<void> {
		return await REST.request('DELETE', Endpoints.GUILD_BAN(this.id, id));
	}
}
