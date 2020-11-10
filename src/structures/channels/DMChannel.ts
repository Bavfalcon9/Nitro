import Endpoints from '../../constants/Endpoints.ts';
import MessageContent from '../../constants/MessageContent.ts';
import REST from '../../rest/REST.ts';
import Embed from '../../util/Embed.ts';
import Message from '../Message.ts';
import Channel from './Channel.ts';

export default class DMChannel extends Channel {
	constructor(data: any) {
		super(data);
	}

	async send(content: string | MessageContent | Embed): Promise<void> {
		if (typeof content === 'string') {
			content = { content: content };
		}
		await REST.request(
			'POST',
			Endpoints.CHANNEL_MESSAGES(this.id),
			content
		); // I will fix this later
	}
}
