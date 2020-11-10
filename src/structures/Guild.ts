import Collection from '../util/Collection.ts';
import Base from './Base.ts';
import CategoryChannel from './channels/CategoryChannel.ts';
import GuildChannel from './channels/GuildChannel.ts';
import TextChannel from './channels/TextChannel.ts';
import VoiceChannel from './channels/VoiceChannel.ts';
import Emoji from './Emoji.ts';
import Member from './Member.ts';
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
}
