import Endpoints from '../../constants/Endpoints.ts';
import MessageContent from '../../constants/MessageContent.ts';
import REST from '../../rest/REST.ts';
import Embed from '../../util/Embed.ts';
import Guild from '../guild/Guild.ts';
import Message from '../Message.ts';
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

	public async send(content: string | MessageContent | Embed) {
		if (typeof content === 'string') {
			content = { content: content };
		}

		return new Message(
			await REST.request(
				'POST',
				Endpoints.CHANNEL_MESSAGES(this.id),
				content
			),
			this
		);
	}

	public async getMessage(id: string): Promise<Message> {
		return new Message(
			await REST.request('GET', Endpoints.CHANNEL_MESSAGE(this.id, id)),
			this
		);
	}
}
