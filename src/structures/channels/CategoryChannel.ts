import Guild from '../Guild.ts';
import GuildChannel from './GuildChannel.ts';

export default class CategoryChannel extends GuildChannel {
	constructor(data: any, guild: Guild) {
		super(data, guild);
	}

	get children(): GuildChannel[] {
		let channels: GuildChannel[] = [];
		if (this.guild && this.guild.channels) {
			for (const channel of this.guild.channels.toArray()) {
				if (channel.parentID === this.id) {
					channels.push(channel);
				}
			}
		}
		return channels;
	}
}
