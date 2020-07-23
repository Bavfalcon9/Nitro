import { EventEmitter } from 'https://deno.land/std/node/events.ts';
import HeartBeatPacket from "./network/discord/packets/HeartBeatPacket.ts";
import WebsocketManager from "./network/WebsocketManager.ts";
import ProtectedDataStore from "./stores/ProtectedDataStore.ts";
import ClientUser from './structures/ClientUser.ts'
import Packet from "./network/discord/packets/Packet.ts";
import EventHandler from "./events/EventHandler.ts";
import User from "./structures/User.ts";
import Message from "./structures/Message.ts";
import CacheManager from './cache/CacheManager.ts';
import RequestManager from './rest/RequestManager.ts';
import { CacheOptions, DefaultOptions } from './cache/CacheOptions.ts';
import Application from './structures/oauth2/Application.ts';
import { ApplicationInformation } from './network/discord/interfaces/ApplicationInformation.ts';

class Client extends EventEmitter {
    public application: Application|null;
    public user!: ClientUser;
    public _lastACK?: number;
    public _eventsHandle: EventHandler;
    public _cacheManager: CacheManager;
    private requestManager: RequestManager;
    private wsm?: WebsocketManager;
    private heartInterval?: number;

    constructor(cacheOptions: CacheOptions = DefaultOptions) {
        super();
        this.application = null;
        this._eventsHandle = new EventHandler(this);
        this._cacheManager = new CacheManager(this, cacheOptions);
        this.requestManager = new RequestManager(this);
    }

    public get users(): Map<string, User> {
        return this._cacheManager.users;
    }
    
    public connect(token: string): void {
        if (this.wsm !== undefined) {
            throw new Error('Client already connected! Please terminate the existing connection.');
        }

        ProtectedDataStore.token = token; // redo how this is handled
        this.wsm = new WebsocketManager();
        try {
            this.wsm.init(this);
            this.resolveApplication();
        } catch (err) {
            throw err;
        }
    }

    public initHeartbeat(interval: number): void {
        if (this.heartInterval) {
            throw new Error('Heartbeat already initialized');
        }
        this.heartInterval = setInterval(() => {
            this.sendPacket(new HeartBeatPacket(interval));
        }, interval);
    }

    public reconnect(): void {
        // to do
    }

    public disconnect(): void {
        if (this.wsm === undefined) throw 'Client already disconnected.';
        this.wsm?.terminate();
        this.wsm = undefined;
        clearInterval(this.heartInterval);
        this.heartInterval = undefined;
        // to do: options [reconnect?]
    }

    public async sendPacket(pk: Packet): Promise<void> {
        return await this.wsm?.send(pk.parsePacket());
    }

    private async resolveApplication(): Promise<void> {
        const res: ApplicationInformation|boolean = await RequestManager.getApplication();
        if (typeof res === 'boolean') {
            return;
        } else {
            this.application = new Application(res);
        }
    }
}
export default Client;