import { WebSocket as ws, connectWebSocket as cws, connectWebSocket } from 'https://deno.land/std/ws/mod.ts';
import Constants from '../discord/Constants.ts';
import Client from '../Client.ts';
import Payload from '../discord/interfaces/Payload.ts';
import Packet from '../discord/packets/Packet.ts';
import OPCodes from '../discord/interfaces/OPCodes.ts';
import HeartBeatPacket from '../discord/packets/HeartBeatPacket.ts';

class WebsocketManager {
    private _ws!: ws;
    private _client!: Client;

    constructor() {

    }

    public async init(client: Client): Promise<void> {
        this._client = client;
        try {
            this._ws = await connectWebSocket(Constants.GATEWAY);

            for await (const m of this._ws) {
                try {
                    const payload: Payload = JSON.parse(m.toString());
                    if (payload.op === OPCodes.HELLO) {
                        const pk: HeartBeatPacket = new HeartBeatPacket(payload.d.heartbeat_interval || 0);
                        this._client.initHeartbeat(pk.interval);
                        return;
                    }
                    if (payload.op === OPCodes.RESUME) {
                        // todo
                    }
                } catch (err) {
                    this._ws.closeForce();
                    throw 'WS error: ' + err;
                }
            }
        } catch (err) {

        }
    }

    public send(payload: Payload) {
        this._ws.send(JSON.stringify(payload));
    }
}

export default WebsocketManager;