import Packet from "./Packet.ts";
import OPCodes from "../interfaces/OPCodes.ts";
import Payload from "../interfaces/Payload.ts";

class HeartBeatPacket extends Packet {
    public interval: number;

    public static fromPayload(data: Payload): HeartBeatPacket {
        return new this(data.d.heartbeat_interval || 45000);
    }
    
    constructor(interval: number) {
        super(OPCodes.HEARTBEAT);
        this.interval = interval;
    }

    protected encode(): void {
        this.data = this.interval;
    }
}

export default HeartBeatPacket;;