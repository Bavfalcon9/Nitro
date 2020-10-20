import type Client from "../Client.ts";
import type Payload from "./discord/interfaces/Payload.ts";
import ResumePacket from "./discord/packets/ResumePacket.ts";
import Endpoints from "../rest/Endpoints.ts";
import OPCodes from "./discord/interfaces/OPCodes.ts";
import HeartBeatPacket from "./discord/packets/HeartBeatPacket.ts";
import LoginPacket from "./discord/packets/LoginPacket.ts";
import ProtectedStore from "../data/ProtectedStore.ts";
import Logger from "../utils/misc/Logger.ts";
import EventPacket from "./discord/packets/EventPacket.ts";
import DataHandler from "../data/DataHandler.ts";
import Intents from "../utils/discord/Intents.ts";

class WebsocketManager {
    private ws!: WebSocket;
    private client!: Client;
    private logger: Logger;
    private lastSequence: number;
    private dataHandler: DataHandler;

    constructor() {
        this.logger = new Logger("Nitro-WebSocket");
        this.lastSequence = 0;
        this.dataHandler = new DataHandler();
    }

    public async init(client: Client, token: string): Promise<void> {
        this.client = client;
        this.logger.debug("Connecting...");
        this.ws = new WebSocket(Endpoints.GATEWAY);
        this.ws.onmessage = (message: MessageEvent) => {
            const payload: Payload = JSON.parse(message.data);
            let packet: EventPacket | HeartBeatPacket | ResumePacket;

            if (!payload) {
                // invalid payload.
                return;
            }
            switch (payload.op) {
                case OPCodes.HELLO:
                    // ready.
                    packet = HeartBeatPacket.fromPayload(payload);
                    this.client.initHeartbeat(packet.interval);
                    this.client.sendPacket(new LoginPacket(token, false, this.client.intents?.parse() || Intents.defaults().parse()));
                    break;
                case OPCodes.RECONNECT:
                    packet = new ResumePacket(
                        token,
                        this.client.sessionId,
                        this.lastSequence,
                    );
                    this.client.sendPacket(packet);
                    break;
                case OPCodes.DISPATCH:
                    // this is an event
                    packet = EventPacket.fromPayload(payload);
                    this.lastSequence = packet.sequence || this.lastSequence;

                    if (packet.event === "READY") {
                        this.client.sessionId = packet.data.session_id;
                    }

                    this.dataHandler.handlePacket(this.client, packet);
                    break;
                case OPCodes.HEARTBEAT_ACK:
                    this.client.lastACK = Date.now();
                    break;
                default:
                    // unknown packet
                    break;
            }
        };
        this.ws.onerror = (err) => {
            console.error(err);
        }
        // don't know if we should include errors.
    }

    /**
       * Sends a payload to a socket.
       * @param payload 
       */
    public async send(payload: Payload): Promise<void> {
        try {
            this.ws.send(JSON.stringify(payload));
            return;
        } catch (e) {
            return;
        }
    }

    public async terminate() {
        try {
            this.ws.close();
            this.logger.debug("Socket closed.");
        } catch (e) {
            this.logger.debug("Socket closed.");
        }
    }
}

export default WebsocketManager;
