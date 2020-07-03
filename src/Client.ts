import { EventEmitter } from "https://deno.land/std/node/events.ts";
import ProtectedDataStore from "./stores/ProtectedDataStore.ts";
import WebsocketManager from "./network/WebsocketManager.ts";
import HeartBeatPacket from "./discord/packets/HeartBeatPacket.ts";
import Packet from "./discord/packets/Packet.ts";

class Client extends EventEmitter {
    private wsm?: WebsocketManager;
    private heartInterval?: number;

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

    public async sendPacket(pk: Packet): Promise<void> {
        return await this.wsm?.send(pk.parsePacket());
    }
}
export default Client;