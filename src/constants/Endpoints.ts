export default class Endpoints {
	public static REST_VERSION: string = '8';
	public static BASE_URL = '/api/v' + Endpoints.REST_VERSION;
	public static CDN_URL = 'https://cdn.discordapp.com';
	public static GATEWAY_URL = `wss://gateway.discord.gg/?v=8&encoding=json`;

	public static CHANNEL = (chanID: string) => `/channels/${chanID}`;
	public static CHANNEL_BULK_DELETE = (chanID: string) =>
		`/channels/${chanID}/messages/bulk-delete`;
	public static CHANNEL_CALL_RING = (chanID: string) =>
		`/channels/${chanID}/call/ring`;
	public static CHANNEL_CROSSPOST = (chanID: string, msgID: string) =>
		`/channels/${chanID}/messages/${msgID}/crosspost`;
	public static CHANNEL_FOLLOW = (chanID: string) =>
		`/channels/${chanID}/followers`;
	public static CHANNEL_INVITES = (chanID: string) =>
		`/channels/${chanID}/invites`;
	public static CHANNEL_MESSAGE_REACTION = (
		chanID: string,
		msgID: string,
		reaction: string
	) => `/channels/${chanID}/messages/${msgID}/reactions/${reaction}`;
	public static CHANNEL_MESSAGE_REACTION_USER = (
		chanID: string,
		msgID: string,
		reaction: string,
		userID: string
	) =>
		`/channels/${chanID}/messages/${msgID}/reactions/${reaction}/${userID}`;
	public static CHANNEL_MESSAGE_REACTIONS = (chanID: string, msgID: string) =>
		`/channels/${chanID}/messages/${msgID}/reactions`;
	public static CHANNEL_MESSAGE = (chanID: string, msgID: string) =>
		`/channels/${chanID}/messages/${msgID}`;
	public static CHANNEL_MESSAGES = (chanID: string) =>
		`/channels/${chanID}/messages`;
	public static CHANNEL_MESSAGES_SEARCH = (chanID: string) =>
		`/channels/${chanID}/messages/search`;
	public static CHANNEL_PERMISSION = (chanID: string, overID: string) =>
		`/channels/${chanID}/permissions/${overID}`;
	public static CHANNEL_PERMISSIONS = (chanID: string) =>
		`/channels/${chanID}/permissions`;
	public static CHANNEL_PIN = (chanID: string, msgID: string) =>
		`/channels/${chanID}/pins/${msgID}`;
	public static CHANNEL_PINS = (chanID: string) => `/channels/${chanID}/pins`;
	public static CHANNEL_RECIPIENT = (groupID: string, userID: string) =>
		`/channels/${groupID}/recipients/${userID}`;
	public static CHANNEL_TYPING = (chanID: string) =>
		`/channels/${chanID}/typing`;
	public static CHANNEL_WEBHOOKS = (chanID: string) =>
		`/channels/${chanID}/webhooks`;
	public static CHANNELS = '/channels';
	public static GATEWAY = '/gateway';
	public static GATEWAY_BOT = '/gateway/bot';
	public static GUILD = (guildID: string) => `/guilds/${guildID}`;
	public static GUILD_AUDIT_LOGS = (guildID: string) =>
		`/guilds/${guildID}/audit-logs`;
	public static GUILD_BAN = (guildID: string, memberID: string) =>
		`/guilds/${guildID}/bans/${memberID}`;
	public static GUILD_BANS = (guildID: string) => `/guilds/${guildID}/bans`;
	public static GUILD_CHANNELS = (guildID: string) =>
		`/guilds/${guildID}/channels`;
	public static GUILD_EMBED = (guildID: string) => `/guilds/${guildID}/embed`;
	public static GUILD_EMOJI = (guildID: string, emojiID: string) =>
		`/guilds/${guildID}/emojis/${emojiID}`;
	public static GUILD_EMOJIS = (guildID: string) =>
		`/guilds/${guildID}/emojis`;
	public static GUILD_INTEGRATION = (guildID: string, inteID: string) =>
		`/guilds/${guildID}/integrations/${inteID}`;
	public static GUILD_INTEGRATION_SYNC = (guildID: string, inteID: string) =>
		`/guilds/${guildID}/integrations/${inteID}/sync`;
	public static GUILD_INTEGRATIONS = (guildID: string) =>
		`/guilds/${guildID}/integrations`;
	public static GUILD_INVITES = (guildID: string) =>
		`/guilds/${guildID}/invites`;
	public static GUILD_VANITY_URL = (guildID: string) =>
		`/guilds/${guildID}/vanity-url`;
	public static GUILD_MEMBER = (guildID: string, memberID: string) =>
		`/guilds/${guildID}/members/${memberID}`;
	public static GUILD_MEMBER_NICK = (guildID: string, memberID: string) =>
		`/guilds/${guildID}/members/${memberID}/nick`;
	public static GUILD_MEMBER_ROLE = (
		guildID: string,
		memberID: string,
		roleID: string
	) => `/guilds/${guildID}/members/${memberID}/roles/${roleID}`;
	public static GUILD_MEMBERS = (guildID: string) =>
		`/guilds/${guildID}/members`;
	public static GUILD_MEMBERS_SEARCH = (guildID: string) =>
		`/guilds/${guildID}/members/search`;
	public static GUILD_MESSAGES_SEARCH = (guildID: string) =>
		`/guilds/${guildID}/messages/search`;
	public static GUILD_PREVIEW = (guildID: string) =>
		`/guilds/${guildID}/preview`;
	public static GUILD_PRUNE = (guildID: string) => `/guilds/${guildID}/prune`;
	public static GUILD_ROLE = (guildID: string, roleID: string) =>
		`/guilds/${guildID}/roles/${roleID}`;
	public static GUILD_ROLES = (guildID: string) => `/guilds/${guildID}/roles`;
	public static GUILD_VOICE_REGIONS = (guildID: string) =>
		`/guilds/${guildID}/regions`;
	public static GUILD_WEBHOOKS = (guildID: string) =>
		`/guilds/${guildID}/webhooks`;
	public static GUILD_WIDGET = (guildID: string) =>
		`/guilds/${guildID}/widget`;
	public static GUILDS = '/guilds';
	public static INVITE = (inviteID: string) => `/invite/${inviteID}`;
	public static OAUTH2_APPLICATION = (appID: string) =>
		`/oauth2/applications/${appID}`;
	public static USER = (userID: string) => `/users/${userID}`;
	public static USER_BILLING = (userID: string) => `/users/${userID}/billing`;
	public static USER_BILLING_PAYMENTS = (userID: string) =>
		`/users/${userID}/billing/payments`;
	public static USER_BILLING_PREMIUM_SUBSCRIPTION = (userID: string) =>
		`/users/${userID}/billing/premium-subscription`;
	public static USER_CHANNELS = (userID: string) =>
		`/users/${userID}/channels`;
	public static USER_CONNECTIONS = (userID: string) =>
		`/users/${userID}/connections`;
	public static USER_CONNECTION_PLATFORM = (
		userID: string,
		platform: string,
		id: string
	) => `/users/${userID}/connections/${platform}/${id}`;
	public static USER_GUILD = (userID: string, guildID: string) =>
		`/users/${userID}/guilds/${guildID}`;
	public static USER_GUILDS = (userID: string) => `/users/${userID}/guilds`;
	public static USER_MFA_CODES = (userID: string) =>
		`/users/${userID}/mfa/codes`;
	public static USER_MFA_TOTP_DISABLE = (userID: string) =>
		`/users/${userID}/mfa/totp/disable`;
	public static USER_MFA_TOTP_ENABLE = (userID: string) =>
		`/users/${userID}/mfa/totp/enable`;
	public static USER_NOTE = (userID: string, targetID: string) =>
		`/users/${userID}/note/${targetID}`;
	public static USER_PROFILE = (userID: string) => `/users/${userID}/profile`;
	public static USER_RELATIONSHIP = (userID: string, relID: string) =>
		`/users/${userID}/relationships/${relID}`;
	public static USER_SETTINGS = (userID: string) =>
		`/users/${userID}/settings`;
	public static USERS = '/users';
	public static VOICE_REGIONS = '/voice/regions';
	public static WEBHOOK = (hookID: string) => `/webhooks/${hookID}`;
	public static WEBHOOK_SLACK = (hookID: string) =>
		`/webhooks/${hookID}/slack`;
	public static WEBHOOK_TOKEN = (hookID: string, token: string) =>
		`/webhooks/${hookID}/${token}`;
	public static WEBHOOK_TOKEN_SLACK = (hookID: string, token: string) =>
		`/webhooks/${hookID}/${token}/slack`;

	// CDN Endpoints
	public static CHANNEL_ICON = (chanID: string, chanIcon: string) =>
		`/channel-icons/${chanID}/${chanIcon}`;
	public static CUSTOM_EMOJI = (emojiID: string) => `/emojis/${emojiID}`;
	public static DEFAULT_USER_AVATAR = (userDiscriminator: string) =>
		`/embed/avatars/${userDiscriminator}`;
	public static GUILD_BANNER = (guildID: string, guildBanner: string) =>
		`/banners/${guildID}/${guildBanner}`;
	public static GUILD_ICON = (guildID: string, guildIcon: string) =>
		`/icons/${guildID}/${guildIcon}`;
	public static GUILD_SPLASH = (guildID: string, guildSplash: string) =>
		`/splashes/${guildID}/${guildSplash}`;
	public static USER_AVATAR = (userID: string, userAvatar: string) =>
		`/avatars/${userID}/${userAvatar}`;
}
