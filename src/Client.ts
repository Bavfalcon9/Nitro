import { GenericFunction, WrappedFunction } from '../deps.ts';
import { EventEmitter } from '../deps.ts';
import CacheOptions from './cache/CacheOptions.ts';
import Intents from './constants/Intents.ts';
import Shard from './gateway/Shard.ts';
import Channel from './structures/channels/Channel.ts';
import Guild from './structures/Guild.ts';
import User from './structures/User.ts';
import Collection from './util/Collection.ts';
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
	},
	intents: ['guilds', 'guildMembers', 'guildMessages'],
};

type ClientEvent =
	| 'unknown'
	| 'ready'
	| 'resume'
	| 'reconnect'
	| 'disconnect'
	| 'channelCreate'
	| 'channelUpdate'
	| 'channelDelete'
	| 'pinUpdate'
	| 'guildCreate'
	| 'guildUpdate'
	| 'guildDelete'
	| 'banAdd'
	| 'banRemove'
	| 'emojisUpdate'
	| 'integrationsUpdate'
	| 'memberJoin'
	| 'memberRemove'
	| 'memberUpdate'
	| 'membersChunk'
	| 'roleCreate'
	| 'roleUpdate'
	| 'roleDelete'
	| 'inviteCreate'
	| 'inviteDelete'
	| 'message'
	| 'messageCreate'
	| 'messageUpdate'
	| 'messageDelete'
	| 'messageDeleteBulk'
	| 'reactionAdd'
	| 'reactionUpdate'
	| 'reactionRemove'
	| 'reactionRemoveAll'
	| 'reactionRemoveEmoji'
	| 'presenceUpdate'
	| 'typingStart'
	| 'userUpdate'
	| 'voiceStateUpdate'
	| 'voiceRegionUpdate'
	| 'webhookUpdate';

export default class Client extends EventEmitter {
	public protectedDataStore: ProtectedDataStore;

	public user!: User;

	public shard: Shard;
	public sessionID: string = '0';

	public opt: ClientOptions;

	public guilds: Collection<string, Guild>;
	public channels: Collection<string, Channel>;
	public users: Collection<string, User>;

	public constructor(token: string, opt: ClientOptions = DefaultOptions) {
		super();
		this.protectedDataStore = new ProtectedDataStore();
		this.protectedDataStore.set('TOKEN', token);
		this.shard = new Shard(this);
		this.opt = opt;
		this.configureOptions();

		this.guilds = new Collection(Guild, this.opt.cacheOptions.guilds.$max);
		this.channels = new Collection(
			Channel,
			this.opt.cacheOptions.channels.$max
		);
		this.users = new Collection(User, this.opt.cacheOptions.users.$max);
	}

	public on(
		event: ClientEvent,
		listener: GenericFunction | WrappedFunction
	): this {
		return super.on(event, listener);
	}

	public connect() {
		this.shard.connect();
	}

	private configureOptions() {
		let intents = 0;
		if (typeof this.opt.intents !== 'number') {
			for (const intent of this.opt.intents) {
				if (Intents[intent]) {
					intents |= Intents[intent];
				}
			}
			this.opt.intents = intents;
		}
	}
}
