import Packet from "./Packet.ts";
import OPCodes from "../interfaces/OPCodes.ts";

class HeartBeatPacket extends Packet {
    public interval: number;
    constructor(interval: number) {
        super(OPCodes.HEARTBEAT);
        this.interval = interval;
    }

    protected encode(): void {
        this.data = this.interval;
    }
}

export default HeartBeatPacket;;