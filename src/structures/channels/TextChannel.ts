import Guild from '../Guild.ts';
import GuildChannel from './GuildChannel.ts';

export default class TextChannel extends GuildChannel {
	public topic: string;
	public rateLimitPerUser: number;
	public lastMessageID: string;

	constructor(data: any, guild: Guild) {
		super(data, guild);
		this.topic = data.topic;
		this.rateLimitPerUser = data.rate_limit_per_user;
		this.lastMessageID = data.last_message_id;
	}
}
