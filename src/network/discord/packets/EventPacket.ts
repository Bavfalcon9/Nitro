import Packet from "./Packet.ts";
import OPCodes from "../interfaces/OPCodes.ts";
import type Payload from "../interfaces/Payload.ts";

class EventPacket extends Packet {
    public event: string;
    public data: any;
    public sequence?: number;

    public static fromPayload(data: Payload): EventPacket {
        return new this(data.t, data.d, data.s);
    }

    constructor(event: string | undefined, data: any, sequence?: number) {
        super(OPCodes.DISPATCH);
        this.event = event || "unknown";
        this.data = data;
        this.sequence = sequence;
    }

    protected encode(): void {
        // you cant send events
    }
}

export default EventPacket;
