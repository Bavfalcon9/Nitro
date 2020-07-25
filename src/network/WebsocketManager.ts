import { WebSocket as ws, connectWebSocket as cws, connectWebSocket, isWebSocketCloseEvent } from 'https://deno.land/std/ws/mod.ts';
import Client from '../Client.ts';
import Endpoints from '../rest/Endpoints.ts';
import Payload from './discord/interfaces/Payload.ts';
import Packet from './discord/packets/Packet.ts';
import OPCodes from './discord/interfaces/OPCodes.ts';
import HeartBeatPacket from './discord/packets/HeartBeatPacket.ts';
import LoginPacket from './discord/packets/LoginPacket.ts';
import ProtectedDataStore from '../stores/ProtectedDataStore.ts';
import Logger from '../utils/misc/Logger.ts';
import EventPacket from './discord/packets/EventPacket.ts';

class WebsocketManager {
    private _ws!: ws;
    private _client!: Client;
    private _logger: Logger;

    constructor() {
        this._logger = new Logger('Nitro-WebSocket');
    }

    public async init(client: Client): Promise<void> {
        this._client = client;
        try {
            this._logger.debug('Connecting...');
            this._ws = await connectWebSocket(Endpoints.GATEWAY);
            for await (const m of this._ws) {
                try {
                    if (isWebSocketCloseEvent(m)) {
                        throw (m.reason || m.code);
                    }
                    const payload: Payload = JSON.parse(m.toString());
                    this._client.emit('raw', payload);
                    if (payload.op === OPCodes.HELLO) {
                        this._logger.debug('Connected!');
                        const pk: HeartBeatPacket = HeartBeatPacket.fromPayload(payload);
                        this._client.initHeartbeat(pk.interval);
                        await this._client.sendPacket(new LoginPacket(ProtectedDataStore.token));
                    } else if (payload.op === OPCodes.RESUME) {
                        // todo https://discord.com/developers/docs/topics/gateway#resume-example-resume
                    } else if (payload.op === OPCodes.DISPATCH) {
                        const pk: EventPacket = EventPacket.fromPayload(payload);
                        this._client._eventsHandle.handleEvent(pk);
                    } else if (payload.op === OPCodes.HEARTBEAT_ACK) {
                        this._client._lastACK = Date.now();
                    } else {
                        this._logger.debug(`Unknown Packet! ${payload.op}`);
                    }
                } catch (err) {
                    this.terminate();
                    throw err;
                }
            }
        } catch (err) {
            throw err;
        }
    }

    public async send(payload: Payload): Promise<void> {
        try {
            await this._ws.send(JSON.stringify(payload));
        } catch (e) {

        }
    }

    public async terminate() {
        try {
            await this._ws.close();
            this._logger.debug('Socket closed.');
        } catch (e) {
            this._ws.closeForce();
            this._logger.debug("Socket closed.");
        }
    }
}

export default WebsocketManager;
