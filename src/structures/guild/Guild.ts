import Base from '../Base.ts';
import User from '../User.ts';
import Channel from '../channel/Channel.ts';
import { Region } from '../../network/discord/interfaces/Region.ts';

class Guild extends Base {
    public name: string;
    public icon?: string;
    public description?: string;
    public splash?: string;
    public owner: User;
    public permissions: any; // to do
    public region: Region;
    public afkChannel: Channel;
    public afkTimeout: number;
    public widgetEnabled?: boolean;
    public widgetId?: string;
    public verificationLevel: number;
    public defaultNotifications: number;
    public explicitContent: number;
    public roles: any; //Role[];
    public emojis: any;//Emoji[];
    public features: any;//GuildFeature[];
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
    public members?: any;//Member[];
    public channels?: any;//Channels[];
    public maxPresences?: number;
    public maxMembers?: number;
    public vanityUrl?: string;
    public banner?: string; // url
    public premiumTier: number;
    public subscriptionCount: number;
    public preferredLocale: string;

    constructor(data: any) {
        super(data.id);
        this.name = data.name;
        this.icon = data.icon;
        this.description = data.description;
        this.splash = data.splash;
        this.owner = data.owner; // rewrite in socket events or handle
        this.permissions = data.permissions;
        this.region = data.region;
        this.afkChannel = data.afk_channel_id;
        this.afkTimeout = data.afk_timeout;
        this.widgetEnabled = data.widget_enabled;
        this.widgetId = data.widget_channel_id;
        this.verificationLevel = data.verification_level;
        this.defaultNotifications = data.default_message_notifications;
        this.explicitContent = data.explicit_content_filter;
        this.roles = data.roles;
        this.emojis = data.emojis;
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
        this.members = data.members || [];
        this.channels = data.channels;
        this.preferredLocale = data.preferred_locale;
        this.premiumTier = data.premium_tier;
        this.subscriptionCount = data.premium_subscription_count || 0;
        // annnnnddddd i dont wanna do this right now :(
    }

    public get paritial(): boolean {
        return false;
    }
}
export default Guild;