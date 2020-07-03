import { WebSocket as ws, connectWebSocket as cws, connectWebSocket, isWebSocketCloseEvent } from 'https://deno.land/std/ws/mod.ts';
import Constants from '../discord/Constants.ts';
import Client from '../Client.ts';
import Payload from '../discord/interfaces/Payload.ts';
import Packet from '../discord/packets/Packet.ts';
import OPCodes from '../discord/interfaces/OPCodes.ts';
import HeartBeatPacket from '../discord/packets/HeartBeatPacket.ts';
import LoginPacket from '../discord/packets/LoginPacket.ts';
import ProtectedDataStore from '../stores/ProtectedDataStore.ts';
import EventHandler from '../events/EventHandler.ts';

class WebsocketManager {
    private _ws!: ws;
    private _client!: Client;

    constructor() {

    }

    public async init(client: Client): Promise<void> {
        this._client = client;
        try {
            console.log('Connecting to socket...');
            this._ws = await connectWebSocket(Constants.GATEWAY);
            for await (const m of this._ws) {
                try {
                    if (isWebSocketCloseEvent(m)) {
                        // to do handle bad connections properly
                        throw m.code;
                    }
                    const payload: Payload = JSON.parse(m.toString());
                    switch (payload.op) {
                        case OPCodes.HELLO:
                            const pk: HeartBeatPacket = new HeartBeatPacket(payload.d.heartbeat_interval || 0);
                            this._client.initHeartbeat(pk.interval);
                            await this._client.sendPacket(new LoginPacket(ProtectedDataStore.token));
                            break;
                        case OPCodes.RESUME: 
                            // todo https://discord.com/developers/docs/topics/gateway#resume-example-resume
                            break;
                        case OPCodes.DISPATCH: // This means an event has occured (i.e READY, GUILDCREATE)
                            if(payload) {
                                const e = new EventHandler(payload, client);
                                e.handleEvent();
                            }
                        default:
                            console.log(`Unknown Packet! ${payload.op}`);
                            // console.log(JSON.parse(m.toString()));
                            break;
                    }
                } catch (err) {
                    this._ws.closeForce();
                    throw err;
                }
            }
        } catch (err) {
            throw err;
        }
    }

    public async send(payload: Payload): Promise<void> {
        return await this._ws.send(JSON.stringify(payload));
    }
}

export default WebsocketManager;
