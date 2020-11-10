import Embed from '../util/Embed.ts';

export default interface MessageContent {
	tts?: boolean;
	type?: number;
	pinned?: boolean;
	embeds?: any[];
	content: string | Embed;
	attachments?: any[];
}
