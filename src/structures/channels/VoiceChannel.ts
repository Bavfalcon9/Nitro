import Guild from '../guild/Guild.ts';
import GuildChannel from './GuildChannel.ts';

export default class VoiceChannel extends GuildChannel {
	public bitrate: number;
	public userLimit: number;

	constructor(data: any, guild: Guild) {
		super(data, guild);
		this.bitrate = data.bitrate;
		this.userLimit = data.user_limit;
	}
}
