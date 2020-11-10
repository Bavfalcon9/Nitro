import { EventEmitter, Buffer } from '../../deps.ts';
import Client from '../Client.ts';
import Endpoints from '../constants/Endpoints.ts';
import OPCodes from '../constants/OPCodes.ts';
import CategoryChannel from '../structures/channels/CategoryChannel.ts';
import Channel from '../structures/channels/Channel.ts';
import GuildChannel from '../structures/channels/GuildChannel.ts';
import TextChannel from '../structures/channels/TextChannel.ts';
import VoiceChannel from '../structures/channels/VoiceChannel.ts';
import ClientUser from '../structures/ClientUser.ts';
import Guild from '../structures/Guild.ts';

export default class Shard extends EventEmitter {
	private client: Client;
	private ws: WebSocket;

	private heartbeatInterval: number = Infinity;
	public constructor(client: Client) {
		super();
		this.client = client;
		this.ws = new WebSocket(Endpoints.GATEWAY_URL);
	}

	public connect() {
		this.ws.onmessage = (ev: MessageEvent) => {
			const data = JSON.parse(ev.data);

			switch (data.op) {
				case OPCodes.HELLO: {
					this.heartbeat(data.d.heartbeat_interval);
					this.identify();
					break;
				}
				case OPCodes.EVENT: {
					const func =
						'on' +
						data.t
							.toLowerCase()
							.split('_')
							.map(
								(e: string) =>
									e.charAt(0).toUpperCase() + e.substr(1)
							)
							.join('');
					if ((this as any)[func] !== undefined) {
						(this as any)[func](data.d);
					}
					break;
				}
			}
		};
	}

	public send(data: object) {
		return this.ws.send(JSON.stringify(data));
	}

	private identify() {
		return this.send({
			op: OPCodes.IDENTIFY,
			d: {
				token: this.client.protectedDataStore.getHashed('TOKEN'),
				intents: this.client.opt.intents,
				properties: {
					$os: Deno.build.os,
					$browser: 'Nitro (Deno)',
					$device: 'Nitro (Deno)',
				},
			},
		});
	}

	private heartbeat(ms: number) {
		this.heartbeatInterval = ms;
		setInterval(() => {
			this.send({ op: OPCodes.HEARTBEAT, d: null });
		}, this.heartbeatInterval);
	}

	private onReady(data: any) {
		this.client.user = new ClientUser(data.user);
		this.client.sessionID = data.session_id;
		this.client.emit('ready', this.client.sessionID);
	}

	private onGuildCreate(data: any) {
		const guild = new Guild(data);
		if (this.client.opt.cacheOptions.guilds.$enabled) {
			this.client.guilds.add(guild);
		}

		for (let channel of data.channels) {
			channel.guild_id = guild.id;
			this.onChannelCreate(channel);
		}

		this.client.emit('guildCreate', guild);
	}

	private onChannelUpdate(data: any) {
		this.onChannelCreate(data);
	}

	private onChannelCreate(data: any) {
		let channel: Channel;
		let guild =
			this.client.guilds.get(data.guild_id) ||
			new Guild({
				id: '0',
				name: '0',
				description: '0',
				splash: '0',
				owner: null,
				permissions: null,
				region: '0',
				afkChannel: null,
				afkTimeout: null,
			});
		switch (data.type) {
			case 0:
				channel = new TextChannel(data, guild);
				break;
			case 2:
				channel = new VoiceChannel(data, guild);
				break;
			case 4:
				channel = new CategoryChannel(data, guild);
				break;
			default:
				if (data.guild_id) {
					channel = new GuildChannel(data, guild);
				} else {
					channel = new Channel(data);
				}
		}

		if (this.client.opt.cacheOptions.channels.$enabled) {
			this.client.channels.add(channel);
		}

		this.client.emit('channelCreate', channel);
	}
}
