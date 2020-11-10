import Base from './Base.ts';
import TextChannel from './channels/TextChannel.ts';
import Member from './guild/Member.ts';
import User from './User.ts';

export default class Message extends Base {
	public type: number;
	public tts: boolean;
	public timestamp: number;
	public pinned: boolean;
	public nonce: string | number;
	public member?: Member;
	public mentions: User[];
	public flags: 0;
	public embeds: any[];
	public guildID: string;
	public content: string;
	public channel: TextChannel;
	public author: User;
	public attachments: any[]; // Leave as any for now
	public args: string[];

	constructor(data: any, channel: TextChannel) {
		super(data.id);
		// probably should add something that autoconstrcuts payloads based on data.
		// To Do: Restructure.
		this.type = data.type;
		this.tts = data.tts || false;
		this.timestamp = Date.parse(data.timestamp) || Date.now();
		this.pinned = data.pinned || false;
		this.nonce = data.nonce || null;
		this.mentions = data.mentions;
		this.flags = data.flags;
		this.embeds = data.embeds;
		this.guildID = data.guild_id;
		this.content = data.content;
		this.channel = channel;
		this.author = new User(data.author);
		this.member = this.channel.guild.members.get(this.author.id);
		this.attachments = data.attachments;
		this.args = [];
	}

	public getCommand(prefix: string = '!'): string | null {
		if (this.content && this.content.indexOf(prefix) === 0) {
			this.args = this.content.slice(prefix.length).trim().split(/ +/g);
			return this.args.shift()?.toLowerCase() || '';
		}
		return null;
	}
}
