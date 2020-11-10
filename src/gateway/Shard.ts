import { EventEmitter, Buffer } from '../../deps.ts';
import Client from '../Client.ts';
import Endpoints from '../constants/Endpoints.ts';
import OPCodes from '../constants/OPCodes.ts';
export default class Shard extends EventEmitter {
	private client: Client;
	private token: string;
	private ws: WebSocket;

	private heartbeatInterval: number = Infinity;
	public constructor(client: Client, token: string) {
		super();
		this.client = client;
		this.token = token;
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
				token: this.token,
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

	private onReady(data: any) {}
}
