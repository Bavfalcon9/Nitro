import Packet from "./Packet.ts";
import OPCodes from "../interfaces/OPCodes.ts";
import type Payload from "../interfaces/Payload.ts";

class ResumePacket extends Packet {
    public token?: string;
    public sessionId?: string;
    public lastSequence?: number;

    public static fromPayload(data: Payload): ResumePacket {
        return new this(data.d.token, data.d.session_id, data.d.seq);
    }

    constructor(token?: string, sessionId?: string, lastSequence?: number) {
        super(OPCodes.RESUME);
        this.token = token;
        this.sessionId = sessionId;
        this.lastSequence = lastSequence;
    }

    protected encode(): void {
        this.data = {
            token: this.token,
            session_id: this.sessionId,
            seq: this.lastSequence,
        };
    }
}

export default ResumePacket;
