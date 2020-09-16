import Endpoints from "../rest/Endpoints.ts";
import Packet from "./discord/packets/Packet.ts";
import OPCodes from "./discord/interfaces/OPCodes.ts";
import HeartBeatPacket from "./discord/packets/HeartBeatPacket.ts";
import LoginPacket from "./discord/packets/LoginPacket.ts";
import ProtectedDataStore from "../stores/ProtectedDataStore.ts";
import Logger from "../utils/misc/Logger.ts";
import EventPacket from "./discord/packets/EventPacket.ts";
import ResumePacket from "./discord/packets/ResumePacket.ts";
import type Client from "../Client.ts";
import type Payload from "./discord/interfaces/Payload.ts";

class WebsocketManager {
  private ws!: WebSocket;
  private client!: Client;
  private logger: Logger;
  private lastSequence: number;

  constructor() {
    this.logger = new Logger("Nitro-WebSocket");
    this.lastSequence = 0;
  }

  public async init(client: Client): Promise<void> {
    this.client = client;
    this.logger.debug("Connecting...");
    this.ws = new WebSocket(Endpoints.GATEWAY);
    this.ws.onmessage = this.handleMessage;
    // don't know if we should include errors.
  }

  /**
     * Sends a payload to a socket.
     * @param payload 
     */
  public async send(payload: Payload): Promise<void> {
    try {
      this.ws.send(JSON.stringify(payload));
    } catch (e) {
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

  private handleMessage(message: MessageEvent): void {
    const payload: Payload = JSON.parse(message.data.toString());
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
        this.client.sendPacket(new LoginPacket(ProtectedDataStore.token));
        break;
      case OPCodes.RECONNECT:
        packet = new ResumePacket(
          ProtectedDataStore.token,
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
        // TO-DO handle event properly.
        break;
      case OPCodes.HEARTBEAT_ACK:
        this.client.lastACK = Date.now();
        break;
      default:
        // unknown packet
        break;
    }
  }
}

export default WebsocketManager;
