import { EventEmitter } from '../deps.ts';
import CacheOptions from './cache/CacheOptions.ts';
import Intents from './constants/Intents.ts';
import Shard from './gateway/Shard.ts';
import User from './structures/User.ts';
import ProtectedDataStore from './util/ProtectedDataStore.ts';

interface ClientOptions {
	cacheOptions: CacheOptions;
	intents: (keyof typeof Intents)[] | number; // Not sure why this doesn't work
}

const DefaultOptions: ClientOptions = {
	cacheOptions: {
		guilds: {
			$enabled: true,
			$max: Infinity,
		},
		channels: {
			$enabled: true,
			$max: Infinity,
		},
		users: {
			$enabled: true,
			$max: Infinity,
		},
		messages: {
			$enabled: false,
			$max: 0,
		},
	},
	intents: ['guilds', 'guildMembers', 'guildMessages'],
};

export default class Client extends EventEmitter {
	// public protectedDataStore: ProtectedDataStore; I WILL WORK ON THIS, it's unstable

	public user!: User;

	public shard: Shard;
	public sessionID: string = '0';

	public opt: ClientOptions;

	private token: string;

	public constructor(token: string, opt: ClientOptions = DefaultOptions) {
		super();
		// this.protectedDataStore = new ProtectedDataStore();
		// this.protectedDataStore.set('TOKEN', token);
		this.token = token;
		this.shard = new Shard(this, token);
		let intents = 0;
		if (typeof opt.intents !== 'number') {
			for (const intent of opt.intents) {
				if (Intents[intent]) {
					intents |= Intents[intent];
				}
			}
			opt.intents = intents;
		}
		this.opt = opt;
	}

	public connect() {
		this.shard.connect();
	}
}
