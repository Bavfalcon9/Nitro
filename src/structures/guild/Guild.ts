import type { Region } from "../../network/discord/interfaces/Region.ts";
import type Role from "./Role.ts";
import Base from "../Base.ts";
import User from "../User.ts";  
import GuildMember from "./GuildMember.ts";
import Emoji from "./Emoji.ts";
//import GuildChannel from '../channel/GuildChannel.ts';
import RequestManager from "../../rest/RequestManager.ts";
import GuildChannel from "../channel/GuildChannel.ts";

class Guild extends Base {
    public name: string;
    public icon?: string;
    public description?: string;
    public splash?: string;
    public owner: GuildMember | undefined;
    public ownerID: string;
    public permissions: any; // to do
    public region: Region;
    public afkChannel: GuildChannel;
    public afkTimeout: number;
    public widgetEnabled?: boolean;
    public widgetId?: string;
    public verificationLevel: number;
    public defaultNotifications: number;
    public explicitContent: number;
    public roles: Role[];
    public emojis?: Emoji[];
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
    public members?: GuildMember[];
    public channels: GuildChannel[]; //Channels[];
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
        this.ownerID = data.owner_id;
        this.owner = this.members?.find((m) => m.id === this.ownerID) || undefined; // rewrite in socket events or handle
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
        this.emojis = data.emojis?.map((e: any) => new Emoji(e)) || [];
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
        this.members = data.members?.map((m: any) => new GuildMember(m, this)) ||
            [];
        this.channels = data.channels?.map((c: any) => new GuildChannel(c)) || [];
        this.preferredLocale = data.preferred_locale;
        this.premiumTier = data.premium_tier;
        this.subscriptionCount = data.premium_subscription_count || 0;
    }

    public static dummyObject(): Guild {
        return new Guild({
            id: "0",
            name: "0",
            description: "0",
            splash: "0",
            owner: null,
            permissions: null,
            region: "0",
            afkChannel: null,
            afkTimeout: null,
        });
    }

    public get paritial(): boolean {
        return false;
    }

    /**
       * Guild Action Methods
       */
    public async ban(
        mid: string,
        deleteMessagesDays?: 1 | 2 | 3 | 4 | 5 | 6 | 7,
        reason?: string,
    ): Promise<void> {
        await RequestManager.banMember(this.id, mid, deleteMessagesDays, reason);
    }

    public async kick(mid: string, reason?: string): Promise<void> {
        await RequestManager.kickMember(this.id, mid, reason);
    }
}
export default Guild;
