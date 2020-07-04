import { Evt } from "https://deno.land/x/evt/mod.ts";
import HeartBeatPacket from "./network/discord/packets/HeartBeatPacket.ts";
import WebsocketManager from "./network/WebsocketManager.ts";
import ProtectedDataStore from "./stores/ProtectedDataStore.ts";
import ClientUser from './structures/ClientUser.ts'
import Packet from "./network/discord/packets/Packet.ts";
import EventHandler from "./events/EventHandler.ts";
import User from "./structures/User.ts";
import Message from "./structures/Message.ts";

class Client {

    public _user!: ClientUser;
    public _lastACK?: number;
    public _eventsHandle: EventHandler;
    public events?: Evt<User|Message>;
    private wsm?: WebsocketManager;
    private heartInterval?: number;

    constructor() {
        this._eventsHandle = new EventHandler();
        this.events = this._eventsHandle.init();
    }

    public connect(token: string): void {
        if (this.wsm !== undefined) {
            throw new Error('Client already connected! Please terminate the existing connection.');
        }

        ProtectedDataStore.token = token;
        this.wsm = new WebsocketManager();
        try {
            this.wsm.init(this);
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
        // to do: options
    }

    public async sendPacket(pk: Packet): Promise<void> {
        return await this.wsm?.send(pk.parsePacket());
    }


    set user(user: ClientUser) {
        this._user = user;
    }
    get user(): ClientUser {
        return this._user
    }
}
export default Client;
